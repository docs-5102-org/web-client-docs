---
title: React WebSocket 集成教程
category:
  - react
date: 2025-09-20
---

# React WebSocket 集成完整教程

## 概述

WebSocket 是一种在客户端和服务器之间建立持久连接的协议，支持全双工通信。在React应用中集成WebSocket可以实现实时数据更新、在线聊天、推送通知等功能。

## 官方文档链接

- **WebSocket API 官方文档**: https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket
- **React 官方文档**: https://react.dev/
- **SockJS 文档**: https://github.com/sockjs/sockjs-client
- **实战项目-参考miliqk-manage-web**

## 教程目标

本教程将教您如何：
- 创建可复用的WebSocket封装组件
- 在React应用中集成WebSocket连接
- 实现自动重连机制
- 处理连接状态和错误情况
- 实现心跳检测机制

## 步骤一：创建WebSocket封装类

首先，我们需要创建一个通用的WebSocket封装类，用于处理连接、消息发送、错误处理等功能。

创建文件 `utils/WebSocketManager.js`：

```javascript
/**
 * WebSocket 封装类
 * @param {Object} param - 配置参数
 * @param {string} param.socketUrl - WebSocket服务器地址
 * @param {number} param.timeout - 连接超时时间（毫秒）
 * @param {Function} param.socketOpen - 连接成功回调
 * @param {Function} param.socketClose - 连接关闭回调
 * @param {Function} param.socketMessage - 接收消息回调
 * @param {Function} param.socketError - 连接错误回调
 */
class WebSocketManager {
    constructor(param = {}) {
        this.param = param;
        this.reconnectCount = 0;
        this.socket = null;
        this.taskRemindInterval = null;
        this.isSuccess = true;
    }

    // 建立WebSocket连接
    connection = () => {
        const { socketUrl, timeout = 0 } = this.param;
        
        // 检测浏览器支持的WebSocket类型
        if ('WebSocket' in window) {
            console.log('使用标准WebSocket');
            this.socket = new WebSocket(socketUrl);
        } else if ('MozWebSocket' in window) {
            console.log('使用Firefox WebSocket');
            this.socket = new MozWebSocket(socketUrl);
        } else {
            console.log('使用SockJS');
            this.socket = new SockJS(socketUrl);
        }

        // 绑定事件处理器
        this.socket.onopen = this.onopen;
        this.socket.onmessage = this.onmessage;
        this.socket.onclose = this.onclose;
        this.socket.onerror = this.onerror;

        // 添加自定义方法
        this.socket.sendMessage = this.sendMessage;
        this.socket.closeSocket = this.closeSocket;

        // 连接超时检测
        if (timeout) {
            const timer = setTimeout(() => {
                if (this.socket && this.socket.readyState !== 1) {
                    this.socket.close();
                }
                clearTimeout(timer);
            }, timeout);
        }
    };

    // 连接成功事件处理
    onopen = () => {
        const { socketOpen } = this.param;
        this.isSuccess = false; // 连接成功标识
        this.reconnectCount = 0; // 重置重连次数
        console.log('WebSocket连接已建立');
        socketOpen && socketOpen();
    };

    // 接收消息事件处理
    onmessage = (msg) => {
        const { socketMessage } = this.param;
        socketMessage && socketMessage(msg);
        console.log('收到服务器消息:', msg.data);
    };

    // 连接关闭事件处理
    onclose = (e) => {
        this.isSuccess = true; // 设置为断开状态
        console.log('WebSocket连接已关闭:', e);
        
        const { socketClose } = this.param;
        socketClose && socketClose(e);

        // 根据关闭状态码决定是否重连
        if (e.code === 4500) {
            // 服务器主动关闭，不重连
            this.socket.close();
        } else {
            // 异常关闭，启动重连机制
            this.startReconnect();
        }
    };

    // 连接错误事件处理
    onerror = (e) => {
        console.error('WebSocket连接错误:', e);
        const { socketError } = this.param;
        this.socket = null;
        socketError && socketError(e);
    };

    // 发送消息
    sendMessage = (data) => {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        } else {
            console.warn('WebSocket未连接，无法发送消息');
        }
    };

    // 关闭连接
    closeSocket = () => {
        if (this.socket) {
            this.socket.close();
        }
        if (this.taskRemindInterval) {
            clearInterval(this.taskRemindInterval);
        }
    };

    // 启动重连机制
    startReconnect = () => {
        if (this.taskRemindInterval) {
            clearInterval(this.taskRemindInterval);
        }
        
        this.taskRemindInterval = setInterval(() => {
            if (this.isSuccess && this.reconnectCount < 5) {
                console.log(`尝试重连第${this.reconnectCount + 1}次`);
                this.reconnectCount++;
                this.connection();
            } else if (this.reconnectCount >= 5) {
                console.error('重连次数超限，停止重连');
                clearInterval(this.taskRemindInterval);
            } else {
                clearInterval(this.taskRemindInterval);
            }
        }, 20000); // 20秒重连一次
    };
}

export default WebSocketManager;
```

## 步骤二：在React组件中使用WebSocket

创建一个React组件来使用我们封装的WebSocket类：

```javascript
import React, { Component } from 'react';
import WebSocketManager from '../utils/WebSocketManager';

class WebSocketComponent extends Component {
    constructor(props) {
        super(props);
        this.socket = null;
        this.heartbeatInterval = null;
        
        this.state = {
            connectionStatus: '未连接',
            messages: [],
            inputMessage: ''
        };
    }

    componentDidMount() {
        this.initWebSocket();
    }

    componentWillUnmount() {
        // 组件卸载时清理资源
        this.cleanupWebSocket();
    }

    // 初始化WebSocket连接
    initWebSocket = () => {
        this.socket = new WebSocketManager({
            socketUrl: 'ws://localhost:8080/websocket', // 替换为您的WebSocket服务器地址
            timeout: 5000,
            
            // 连接成功回调
            socketOpen: () => {
                console.log('WebSocket连接建立成功');
                this.setState({ connectionStatus: '已连接' });
                this.startHeartbeat(); // 启动心跳检测
            },
            
            // 接收消息回调
            socketMessage: (event) => {
                try {
                    const message = JSON.parse(event.data);
                    this.setState(prevState => ({
                        messages: [...prevState.messages, message]
                    }));
                } catch (error) {
                    console.error('解析消息失败:', error);
                }
            },
            
            // 连接关闭回调
            socketClose: (event) => {
                console.log('WebSocket连接已关闭:', event);
                this.setState({ connectionStatus: '已断开' });
                this.stopHeartbeat();
            },
            
            // 连接错误回调
            socketError: (error) => {
                console.error('WebSocket连接错误:', error);
                this.setState({ connectionStatus: '连接错误' });
            }
        });

        // 建立连接
        try {
            this.socket.connection();
        } catch (error) {
            console.error('WebSocket连接异常:', error);
        }
    };

    // 启动心跳检测
    startHeartbeat = () => {
        this.heartbeatInterval = setInterval(() => {
            this.socket.sendMessage({ 
                type: 'heartbeat', 
                timestamp: Date.now() 
            });
        }, 30000); // 30秒发送一次心跳
    };

    // 停止心跳检测
    stopHeartbeat = () => {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }
    };

    // 清理WebSocket资源
    cleanupWebSocket = () => {
        this.stopHeartbeat();
        if (this.socket) {
            this.socket.closeSocket();
        }
    };

    // 发送消息
    sendMessage = () => {
        const { inputMessage } = this.state;
        if (inputMessage.trim()) {
            this.socket.sendMessage({
                type: 'message',
                content: inputMessage,
                timestamp: Date.now()
            });
            this.setState({ inputMessage: '' });
        }
    };

    render() {
        const { connectionStatus, messages, inputMessage } = this.state;

        return (
            <div className="websocket-container">
                <h2>WebSocket 实时通信</h2>
                
                <div className="status">
                    连接状态: <span className={connectionStatus === '已连接' ? 'connected' : 'disconnected'}>
                        {connectionStatus}
                    </span>
                </div>

                <div className="messages">
                    <h3>消息列表:</h3>
                    <div className="message-list">
                        {messages.map((msg, index) => (
                            <div key={index} className="message-item">
                                [{new Date(msg.timestamp).toLocaleTimeString()}] {msg.content}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="input-area">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => this.setState({ inputMessage: e.target.value })}
                        onKeyPress={(e) => e.key === 'Enter' && this.sendMessage()}
                        placeholder="输入消息..."
                    />
                    <button onClick={this.sendMessage}>发送</button>
                </div>
            </div>
        );
    }
}

export default WebSocketComponent;
```

## 步骤三：使用React Hooks的函数式组件版本

如果您更喜欢使用函数式组件和Hooks，这里是对应的实现：

```javascript
import React, { useState, useEffect, useRef, useCallback } from 'react';
import WebSocketManager from '../utils/WebSocketManager';

const WebSocketHookComponent = () => {
    const [connectionStatus, setConnectionStatus] = useState('未连接');
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    
    const socketRef = useRef(null);
    const heartbeatRef = useRef(null);

    // 启动心跳检测
    const startHeartbeat = useCallback(() => {
        heartbeatRef.current = setInterval(() => {
            if (socketRef.current) {
                socketRef.current.sendMessage({ 
                    type: 'heartbeat', 
                    timestamp: Date.now() 
                });
            }
        }, 30000);
    }, []);

    // 停止心跳检测
    const stopHeartbeat = useCallback(() => {
        if (heartbeatRef.current) {
            clearInterval(heartbeatRef.current);
            heartbeatRef.current = null;
        }
    }, []);

    // 初始化WebSocket
    useEffect(() => {
        const initWebSocket = () => {
            socketRef.current = new WebSocketManager({
                socketUrl: 'ws://localhost:8080/websocket',
                timeout: 5000,
                
                socketOpen: () => {
                    console.log('WebSocket连接建立成功');
                    setConnectionStatus('已连接');
                    startHeartbeat();
                },
                
                socketMessage: (event) => {
                    try {
                        const message = JSON.parse(event.data);
                        setMessages(prev => [...prev, message]);
                    } catch (error) {
                        console.error('解析消息失败:', error);
                    }
                },
                
                socketClose: (event) => {
                    console.log('WebSocket连接已关闭:', event);
                    setConnectionStatus('已断开');
                    stopHeartbeat();
                },
                
                socketError: (error) => {
                    console.error('WebSocket连接错误:', error);
                    setConnectionStatus('连接错误');
                }
            });

            try {
                socketRef.current.connection();
            } catch (error) {
                console.error('WebSocket连接异常:', error);
            }
        };

        initWebSocket();

        // 清理函数
        return () => {
            stopHeartbeat();
            if (socketRef.current) {
                socketRef.current.closeSocket();
            }
        };
    }, [startHeartbeat, stopHeartbeat]);

    // 发送消息
    const sendMessage = useCallback(() => {
        if (inputMessage.trim() && socketRef.current) {
            socketRef.current.sendMessage({
                type: 'message',
                content: inputMessage,
                timestamp: Date.now()
            });
            setInputMessage('');
        }
    }, [inputMessage]);

    return (
        <div className="websocket-container">
            <h2>WebSocket 实时通信 (Hooks版本)</h2>
            
            <div className="status">
                连接状态: <span className={connectionStatus === '已连接' ? 'connected' : 'disconnected'}>
                    {connectionStatus}
                </span>
            </div>

            <div className="messages">
                <h3>消息列表:</h3>
                <div className="message-list">
                    {messages.map((msg, index) => (
                        <div key={index} className="message-item">
                            [{new Date(msg.timestamp).toLocaleTimeString()}] {msg.content}
                        </div>
                    ))}
                </div>
            </div>

            <div className="input-area">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="输入消息..."
                />
                <button onClick={sendMessage}>发送</button>
            </div>
        </div>
    );
};

export default WebSocketHookComponent;
```

## 步骤四：添加样式

创建 `styles/websocket.css` 文件：

```css
.websocket-container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-family: Arial, sans-serif;
}

.status {
    margin-bottom: 20px;
    font-weight: bold;
}

.connected {
    color: green;
}

.disconnected {
    color: red;
}

.messages {
    margin-bottom: 20px;
}

.message-list {
    height: 300px;
    overflow-y: auto;
    border: 1px solid #eee;
    padding: 10px;
    background-color: #f9f9f9;
}

.message-item {
    margin-bottom: 5px;
    padding: 5px;
    background-color: white;
    border-radius: 3px;
}

.input-area {
    display: flex;
    gap: 10px;
}

.input-area input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.input-area button {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.input-area button:hover {
    background-color: #0056b3;
}
```

## 高级特性

### 1. 连接状态管理

```javascript
const CONNECTION_STATES = {
    CONNECTING: 'connecting',
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected',
    ERROR: 'error'
};
```

### 2. 消息类型处理

```javascript
const MESSAGE_TYPES = {
    HEARTBEAT: 'heartbeat',
    CHAT: 'chat',
    NOTIFICATION: 'notification',
    ERROR: 'error'
};
```

### 3. 错误处理和重试机制

- 自动重连机制（最多5次）
- 指数退避重连策略
- 网络状态检测

## 最佳实践

1. **资源清理**: 在组件卸载时务必关闭WebSocket连接和清理定时器
2. **错误处理**: 始终包装WebSocket操作在try-catch块中
3. **心跳检测**: 实现心跳机制保持连接活跃
4. **状态管理**: 合理管理连接状态和消息状态
5. **安全考虑**: 在生产环境中使用WSS（加密连接）

## 注意事项

- WebSocket连接会受到网络环境影响，需要处理各种异常情况
- 移动端应用需要考虑后台运行时的连接管理
- 服务器需要支持WebSocket协议
- 考虑使用WebSocket库如Socket.IO来简化开发
