---
title: React 消息订阅发布机制（pubsub）
category:
  - react
  - pubsub
date: 2025-09-20
---

# React PubSub 消息订阅发布机制完整指南

## 概述

PubSub（发布-订阅）模式是一种消息传递模式，允许组件之间进行松耦合的通信。在 React 应用中，pubsub-js 是一个轻量级且功能强大的发布订阅库，特别适合处理跨组件通信的场景。

官网：https://www.npmjs.com/package/pubsub-js

## 安装

```bash
npm install pubsub-js
```

或者使用 yarn：

```bash
yarn add pubsub-js
```

## 基本概念

- **发布者（Publisher）**: 发布消息的组件
- **订阅者（Subscriber）**: 订阅并处理消息的组件
- **主题（Topic）**: 消息的标识符，用于区分不同类型的消息

## 基本用法

### 1. 导入 pubsub-js

```javascript
import PubSub from 'pubsub-js';
// 或者
const PubSub = require('pubsub-js');
```

### 2. 订阅消息

```javascript
import React, { useEffect } from 'react';
import PubSub from 'pubsub-js';

const SubscriberComponent = () => {
  useEffect(() => {
    // 订阅消息
    const token = PubSub.subscribe('MESSAGE_TOPIC', (msg, data) => {
      console.log('接收到消息:', msg, data);
      // 处理接收到的数据
    });

    // 清理函数：组件卸载时取消订阅
    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);

  return <div>订阅者组件</div>;
};
```

### 3. 发布消息

```javascript
import React from 'react';
import PubSub from 'pubsub-js';

const PublisherComponent = () => {
  const handleClick = () => {
    // 发布消息
    PubSub.publish('MESSAGE_TOPIC', { message: 'Hello from publisher!' });
  };

  return (
    <div>
      <button onClick={handleClick}>发送消息</button>
    </div>
  );
};
```

## 进阶用法

### 1. 带参数的消息传递

```javascript
// 发布者
const sendUserData = () => {
  const userData = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com'
  };
  PubSub.publish('USER_DATA_UPDATED', userData);
};

// 订阅者
useEffect(() => {
  const token = PubSub.subscribe('USER_DATA_UPDATED', (msg, userData) => {
    console.log('用户数据更新:', userData);
    setUser(userData);
  });

  return () => PubSub.unsubscribe(token);
}, []);
```

### 2. 异步消息处理

```javascript
// 订阅者处理异步操作
useEffect(() => {
  const token = PubSub.subscribe('ASYNC_OPERATION', async (msg, data) => {
    try {
      setLoading(true);
      const result = await fetchData(data.url);
      setData(result);
    } catch (error) {
      console.error('异步操作失败:', error);
    } finally {
      setLoading(false);
    }
  });

  return () => PubSub.unsubscribe(token);
}, []);
```

### 3. 条件订阅

```javascript
useEffect(() => {
  let token = null;
  
  // 只有在特定条件下才订阅
  if (shouldSubscribe) {
    token = PubSub.subscribe('CONDITIONAL_MESSAGE', (msg, data) => {
      handleConditionalMessage(data);
    });
  }

  return () => {
    if (token) {
      PubSub.unsubscribe(token);
    }
  };
}, [shouldSubscribe]);
```

## 常见应用场景

### 1. 跨组件状态同步

```javascript
// 购物车组件
const CartComponent = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const token = PubSub.subscribe('CART_UPDATED', (msg, newCount) => {
      setCartCount(newCount);
    });
    return () => PubSub.unsubscribe(token);
  }, []);

  return <div>购物车商品数量: {cartCount}</div>;
};

// 商品列表组件
const ProductList = () => {
  const addToCart = (product) => {
    // 添加到购物车逻辑
    const newCount = getCurrentCartCount() + 1;
    PubSub.publish('CART_UPDATED', newCount);
  };

  return (
    <div>
      {products.map(product => (
        <button key={product.id} onClick={() => addToCart(product)}>
          添加到购物车
        </button>
      ))}
    </div>
  );
};
```

### 2. 全局通知系统

```javascript
// 通知组件
const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const token = PubSub.subscribe('SHOW_NOTIFICATION', (msg, notification) => {
      setNotifications(prev => [...prev, notification]);
      
      // 3秒后自动移除通知
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 3000);
    });

    return () => PubSub.unsubscribe(token);
  }, []);

  return (
    <div className="notifications">
      {notifications.map(notification => (
        <div key={notification.id} className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      ))}
    </div>
  );
};

// 在任何组件中触发通知
const showSuccessMessage = (message) => {
  PubSub.publish('SHOW_NOTIFICATION', {
    id: Date.now(),
    type: 'success',
    message
  });
};
```

### 3. 模态框控制

```javascript
// 模态框组件
const ModalComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const showToken = PubSub.subscribe('SHOW_MODAL', (msg, content) => {
      setModalContent(content);
      setIsVisible(true);
    });

    const hideToken = PubSub.subscribe('HIDE_MODAL', () => {
      setIsVisible(false);
    });

    return () => {
      PubSub.unsubscribe(showToken);
      PubSub.unsubscribe(hideToken);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {modalContent}
        <button onClick={() => PubSub.publish('HIDE_MODAL')}>
          关闭
        </button>
      </div>
    </div>
  );
};
```

## 最佳实践

### 1. 使用常量定义主题名称

```javascript
// constants/pubsubTopics.js
export const PUBSUB_TOPICS = {
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGOUT: 'USER_LOGOUT',
  CART_UPDATED: 'CART_UPDATED',
  NOTIFICATION_SHOW: 'NOTIFICATION_SHOW',
  MODAL_SHOW: 'MODAL_SHOW',
  MODAL_HIDE: 'MODAL_HIDE'
};

// 使用时
import { PUBSUB_TOPICS } from './constants/pubsubTopics';
PubSub.publish(PUBSUB_TOPICS.USER_LOGIN, userData);
```

### 2. 创建自定义 Hook

```javascript
// hooks/usePubSub.js
import { useEffect } from 'react';
import PubSub from 'pubsub-js';

export const usePubSub = (topic, callback, deps = []) => {
  useEffect(() => {
    const token = PubSub.subscribe(topic, callback);
    return () => PubSub.unsubscribe(token);
  }, deps);
};

export const usePublish = () => {
  return (topic, data) => PubSub.publish(topic, data);
};

// 使用示例
const MyComponent = () => {
  const publish = usePublish();
  
  usePubSub('MY_TOPIC', (msg, data) => {
    console.log('收到消息:', data);
  });

  const handleClick = () => {
    publish('MY_TOPIC', { message: 'Hello' });
  };

  return <button onClick={handleClick}>发送消息</button>;
};
```

### 3. 错误处理

```javascript
useEffect(() => {
  const token = PubSub.subscribe('RISKY_OPERATION', (msg, data) => {
    try {
      performRiskyOperation(data);
    } catch (error) {
      console.error('处理消息时发生错误:', error);
      PubSub.publish('ERROR_OCCURRED', {
        source: 'RISKY_OPERATION',
        error: error.message
      });
    }
  });

  return () => PubSub.unsubscribe(token);
}, []);
```

## 注意事项

### 1. 防止内存泄漏

始终在组件卸载时取消订阅：

```javascript
useEffect(() => {
  const token = PubSub.subscribe('SOME_TOPIC', handler);
  
  // 重要：必须取消订阅
  return () => PubSub.unsubscribe(token);
}, []);
```

### 2. 避免重复订阅

```javascript
useEffect(() => {
  // 正确：依赖数组确保不会重复订阅
  const token = PubSub.subscribe('TOPIC', handler);
  return () => PubSub.unsubscribe(token);
}, []); // 空依赖数组

// 错误：没有依赖数组会导致每次渲染都重新订阅
useEffect(() => {
  const token = PubSub.subscribe('TOPIC', handler);
  return () => PubSub.unsubscribe(token);
}); // 缺少依赖数组
```

### 3. 调试技巧

```javascript
// 开发环境下启用调试模式
if (process.env.NODE_ENV === 'development') {
  PubSub.subscribe('*', (msg, data) => {
    console.log('PubSub 消息:', msg, data);
  });
}
```

## 总结

PubSub 模式在 React 应用中是一个强大的工具，特别适合：

- 跨组件通信
- 全局状态管理的轻量级替代方案
- 事件驱动的架构
- 解耦组件间的依赖关系

合理使用 pubsub-js 可以让你的 React 应用更加灵活和可维护，但也要注意避免过度使用，对于简单的父子组件通信，props 和 callback 可能是更好的选择。