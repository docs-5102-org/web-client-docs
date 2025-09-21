---
title: dvajs教程
category:
  - react
  - dvajs
date: 2025-09-20
---

# dvajs 教程

## 什么是 dva？

dva 是一个基于 Redux、Redux-saga 和 React-router 的轻量级前端框架，旨在解决组件间的状态共享问题。它通过引入 Model 的概念，将 state、reducers、effects 以及 subscriptions 封装在一起，简化了 Redux 的使用方式。

**官网**: [https://dvajs.com/](https://dvajs.com/)

## 核心概念

### Model
Model 是 dva 中最重要的概念，包含：
- **namespace**: 当前 Model 的名称
- **state**: 初始值
- **reducers**: 处理同步操作，用于修改 state
- **effects**: 处理异步操作，基于 Redux-saga
- **subscriptions**: 订阅数据源

### 基本结构
```javascript
export default {
  namespace: 'example',
  state: {},
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    *fetch(action, { call, put }) {
      // 异步操作
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // 初始化操作
    },
  },
};
```

## 快速开始

### 安装
```bash
npm install dva
# 或
yarn add dva
```

### 创建应用
```javascript
import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
```

## 常见问题与解决方案

### 1. 切换 history 为 browserHistory

官网提供的示例在某些环境下可能不工作，推荐的解决方案：

**步骤1：安装 history 依赖**
```bash
npm install history
```

**步骤2：修改 index.js 文件**
```javascript
import dva from 'dva';
import { createBrowserHistory as createHistory } from 'history';

const app = dva({
  history: createHistory()
});
```

**其他 history 类型：**

* **Hash History（开发环境推荐）**
```javascript
import { createHashHistory as createHistory } from 'history';
const app = dva({
  history: createHistory()
});
```

* **Memory History（服务端渲染）**
```javascript
import { createMemoryHistory as createHistory } from 'history';
const app = dva({
  history: createHistory()
});
```

**验证方法：**
可以通过切换不同的 history 类型，刷新页面观察浏览器地址栏的变化来验证配置是否生效。

### 2. dva dispatch 回调与 effects 返回值

**问题描述：**
在使用 dva 时，经常需要在 dispatch 后获取异步操作的结果，或者需要 effects 返回数据给调用方。

**解决方案：**

#### 方法1：Promise 方式
```javascript
// Model 中的 effect
effects: {
  *fetchData(action, { call, put }) {
    try {
      const response = yield call(api.getData, action.payload);
      yield put({ type: 'save', payload: response });
      return response; // 返回数据
    } catch (error) {
      throw error; // 抛出错误
    }
  },
}

// 组件中调用
const handleFetch = async () => {
  try {
    const result = await dispatch({
      type: 'model/fetchData',
      payload: { id: 1 }
    });
    console.log('获取到数据:', result);
  } catch (error) {
    console.error('请求失败:', error);
  }
};
```

#### 方法2：回调函数方式
```javascript
// Model 中的 effect
effects: {
  *fetchData(action, { call, put }) {
    const { payload, callback } = action;
    try {
      const response = yield call(api.getData, payload);
      yield put({ type: 'save', payload: response });
      if (callback && typeof callback === 'function') {
        callback(null, response);
      }
    } catch (error) {
      if (callback && typeof callback === 'function') {
        callback(error);
      }
    }
  },
}

// 组件中调用
const handleFetch = () => {
  dispatch({
    type: 'model/fetchData',
    payload: { id: 1 },
    callback: (error, data) => {
      if (error) {
        console.error('请求失败:', error);
      } else {
        console.log('获取到数据:', data);
      }
    }
  });
};
```

## 最佳实践

### 1. Model 组织结构
```javascript
// models/user.js
export default {
  namespace: 'user',
  
  state: {
    currentUser: null,
    loading: false,
  },
  
  effects: {
    *fetchCurrent(_, { call, put }) {
      yield put({ type: 'changeLoading', payload: true });
      try {
        const response = yield call(userService.getCurrent);
        yield put({ type: 'saveCurrentUser', payload: response });
      } finally {
        yield put({ type: 'changeLoading', payload: false });
      }
    },
  },
  
  reducers: {
    saveCurrentUser(state, { payload }) {
      return { ...state, currentUser: payload };
    },
    changeLoading(state, { payload }) {
      return { ...state, loading: payload };
    },
  },
};
```

### 2. 在组件中使用
```javascript
import { connect } from 'dva';

const UserProfile = ({ user, dispatch }) => {
  const { currentUser, loading } = user;
  
  useEffect(() => {
    dispatch({ type: 'user/fetchCurrent' });
  }, []);
  
  return (
    <div>
      {loading ? '加载中...' : currentUser?.name}
    </div>
  );
};

export default connect(({ user }) => ({ user }))(UserProfile);
```

### 3. 错误处理
```javascript
// 全局错误处理
const app = dva({
  onError(error) {
    console.error('应用错误:', error);
    // 可以添加错误上报逻辑
  },
});

// Model 中的错误处理
effects: {
  *fetchData(action, { call, put }) {
    try {
      const response = yield call(api.getData);
      yield put({ type: 'saveData', payload: response });
    } catch (error) {
      yield put({ type: 'saveError', payload: error.message });
    }
  },
},
```

## 相关资源

- **官方文档**: [https://dvajs.com/](https://dvajs.com/)
- **API 参考**: [https://dvajs.com/api/](https://dvajs.com/api/)
- **知识图谱**: [https://dvajs.com/knowledgemap/](https://dvajs.com/knowledgemap/)
- **GitHub 仓库**: [https://github.com/dvajs/dva](https://github.com/dvajs/dva)

## 注意事项

1. **版本兼容性**: 确保使用的 dva 版本与 React 版本兼容
2. **性能优化**: 合理使用 connect，避免不必要的重渲染
3. **状态设计**: 保持 state 结构的扁平化，避免深层嵌套
4. **异步操作**: 统一在 effects 中处理异步逻辑，保持 reducers 的纯函数特性