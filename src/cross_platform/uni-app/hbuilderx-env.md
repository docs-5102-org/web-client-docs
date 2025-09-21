---
title: v2、v3环境变量配置
category:
  - 跨平台框架
tag:
  - uni-app
order: 7
---

# uni-app 基于 HBuilderX 多环境变量配置完整指南

> 基于 HBuilderX，兼容 Vue 2.0 和 Vue 3.0 的多环境配置方案

## 📋 目录结构

```
project-root/
├── .env.js              # 环境配置入口文件
├── .env.dev.js         # 开发环境配置
├── .env.test.js        # 测试环境配置
├── .env.prod.js        # 生产环境配置
├── common/
│   └── constants.js    # 全局常量文件
├── main.js             # 应用入口文件
└── package.json        # 项目配置文件
```

## 🔧 配置文件详解

### 1. 环境配置文件

#### 开发环境 `.env.dev.js`
```javascript
const config = {
    baseUrl: 'https://dev-api.example.com',
    apiTimeout: 10000,
    debug: true,
    version: '1.0.0-dev'
}

export default config;
```

#### 测试环境 `.env.test.js`
```javascript
const config = {
    baseUrl: 'https://test-api.example.com',
    apiTimeout: 8000,
    debug: false,
    version: '1.0.0-test'
}

export default config;
```

#### 生产环境 `.env.prod.js`
```javascript
const config = {
    baseUrl: 'https://api.example.com',
    apiTimeout: 5000,
    debug: false,
    version: '1.0.0'
}

export default config;
```

### 2. 环境判断核心文件 `.env.js`

```javascript
import dev from './env.dev.js';
import test from './env.test.js';
import prod from './env.prod.js';

// 环境类型枚举
const EnvChannel = {
    DEVELOPMENT: 'development',  // 开发环境
    TEST: 'test',               // 测试环境
    PRODUCTION: 'production'    // 生产环境
}

/**
 * 获取当前环境配置
 * 方式一：手动切换环境（调试时使用）
 * const ENV_CHANNEL = EnvChannel.TEST;
 * 
 * 方式二：通过 NODE_ENV 自动判断（推荐）
 */
const APP_ENV = process.env.NODE_ENV || EnvChannel.DEVELOPMENT;

// 根据环境加载对应配置
let ENV_CONFIG = {};

switch(APP_ENV) {
    case EnvChannel.DEVELOPMENT:
        ENV_CONFIG = { ...dev };
        break;
    case EnvChannel.TEST:
        ENV_CONFIG = { ...test };
        break;
    case EnvChannel.PRODUCTION:
        ENV_CONFIG = { ...prod };
        break;
    default:
        console.warn(`未知环境: ${APP_ENV}，使用开发环境配置`);
        ENV_CONFIG = { ...dev };
}

// 将配置挂载到 uni-app 全局环境变量
if (ENV_CONFIG) {
    process.uniEnv = process.uniEnv || {};
    
    // 合并环境配置到全局变量
    Object.assign(process.uniEnv, ENV_CONFIG);
    
    // 添加当前环境标识
    process.uniEnv.NODE_ENV = APP_ENV;
    
    console.log(`当前环境: ${APP_ENV}`, ENV_CONFIG);
}

export default ENV_CONFIG;
```

## 🚀 应用入口配置

### Vue 2.0 配置 `main.js`

```javascript
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import './env.js' // 引入环境变量配置

Vue.config.productionTip = false

// 全局过滤器配置
Vue.prototype.$filters = {
    // 货币格式化
    currencyUSD(value) {
        if (!value && value !== 0) return '--'
        return '$' + Number(value).toFixed(2)
    },
    
    // 时间格式化
    formatDate(timestamp) {
        if (!timestamp) return '--'
        return new Date(timestamp).toLocaleDateString()
    }
}

// 全局方法配置
Vue.prototype.$utils = {
    // 获取环境变量
    getEnv(key) {
        return process.uniEnv?.[key] || ''
    }
}

App.mpType = 'app'

const app = new Vue({
    ...App
})

app.$mount()
// #endif
```

### Vue 3.0 配置 `main.js`

```javascript
// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import './env.js' // 引入环境变量配置

export function createApp() {
    const app = createSSRApp(App)
    
    // 全局属性配置
    app.config.globalProperties.$filters = {
        // 货币格式化
        currencyUSD(value) {
            if (!value && value !== 0) return '--'
            return '$' + Number(value).toFixed(2)
        },
        
        // 时间格式化
        formatDate(timestamp) {
            if (!timestamp) return '--'
            return new Date(timestamp).toLocaleDateString()
        }
    }
    
    // 全局方法配置
    app.config.globalProperties.$utils = {
        // 获取环境变量
        getEnv(key) {
            return process.uniEnv?.[key] || ''
        }
    }
    
    return { app }
}
// #endif
```

## 📦 打包配置 `package.json`

```json
{
    "name": "uni-app-multi-env",
    "version": "1.0.0",
    "scripts": {
        "dev": "uni-app cli dev",
        "build": "uni-app cli build"
    },
    "uni-app": {
        "scripts": {
            "h5:dev": {
                "title": "H5开发环境",
                "env": {
                    "UNI_PLATFORM": "h5",
                    "NODE_ENV": "development"
                },
                "define": {
                    "process.env.NODE_ENV": "development"
                }
            },
            "h5:test": {
                "title": "H5测试环境", 
                "env": {
                    "UNI_PLATFORM": "h5",
                    "NODE_ENV": "test"
                },
                "define": {
                    "process.env.NODE_ENV": "test"
                }
            },
            "h5:prod": {
                "title": "H5生产环境",
                "env": {
                    "UNI_PLATFORM": "h5", 
                    "NODE_ENV": "production"
                },
                "define": {
                    "process.env.NODE_ENV": "production"
                }
            },
            "mp-weixin:dev": {
                "title": "微信小程序开发环境",
                "env": {
                    "UNI_PLATFORM": "mp-weixin",
                    "NODE_ENV": "development"
                }
            },
            "mp-weixin:prod": {
                "title": "微信小程序生产环境", 
                "env": {
                    "UNI_PLATFORM": "mp-weixin",
                    "NODE_ENV": "production"
                }
            }
        }
    }
}
```

## 🔨 工具类封装 `common/constants.js`

```javascript
/**
 * 全局常量和工具方法
 */

// 环境变量常量
const Constants = {
    // API 配置
    baseUrl: process.uniEnv?.baseUrl || '',
    apiTimeout: process.uniEnv?.apiTimeout || 5000,
    
    // 平台信息
    platform: process.uniEnv?.UNI_PLATFORM || '',
    
    // 环境信息
    isDev: process.uniEnv?.NODE_ENV === 'development',
    isTest: process.uniEnv?.NODE_ENV === 'test',
    isProd: process.uniEnv?.NODE_ENV === 'production',
    
    // 版本信息
    version: process.uniEnv?.version || '1.0.0'
}

// 网站配置
const websiteConfig = {
    name: 'uni-app 多环境配置',
    url: 'https://uniapp.dcloud.io',
    author: 'Developer'
}

// 工具方法
const utils = {
    // 当前时间戳
    now: Date.now || function() {
        return new Date().getTime()
    },
    
    // 数组判断
    isArray: Array.isArray || function(obj) {
        return obj instanceof Array
    },
    
    // 调试日志
    log: function(message, data = null) {
        if (Constants.isDev || Constants.isTest) {
            console.log(`[${Constants.version}] ${message}`, data || '')
        }
    },
    
    // 错误日志
    error: function(message, error = null) {
        console.error(`[${Constants.version}] ${message}`, error || '')
    },
    
    // 获取完整API地址
    getApiUrl: function(path) {
        if (!path) return Constants.baseUrl
        return Constants.baseUrl + (path.startsWith('/') ? path : '/' + path)
    }
}

export default {
    Constants,
    websiteConfig,
    utils
}

// 也可以分别导出
export {
    Constants,
    websiteConfig, 
    utils
}
```

## 📱 页面使用示例

### Vue 2.0 页面示例

```vue
<template>
    <view class="container">
        <view class="header">
            <text class="title">{{ websiteConfig.name }}</text>
            <text class="subtitle">环境配置演示</text>
        </view>
        
        <!-- 环境信息展示 -->
        <view class="env-info">
            <view class="info-item">
                <text class="label">当前环境：</text>
                <text class="value" :class="envClass">{{ envText }}</text>
            </view>
            <view class="info-item">
                <text class="label">API地址：</text>
                <text class="value">{{ Constants.baseUrl }}</text>
            </view>
            <view class="info-item">
                <text class="label">版本号：</text>
                <text class="value">{{ Constants.version }}</text>
            </view>
            <view class="info-item">
                <text class="label">平台：</text>
                <text class="value">{{ Constants.platform }}</text>
            </view>
        </view>
        
        <!-- 功能演示 -->
        <view class="demo-section">
            <view class="demo-item">
                <text class="demo-label">过滤器演示：</text>
                <text class="demo-value">{{ $filters.currencyUSD(99.99) }}</text>
            </view>
            
            <view class="demo-item">
                <text class="demo-label">时间格式化：</text>
                <text class="demo-value">{{ $filters.formatDate(Date.now()) }}</text>
            </view>
        </view>
        
        <!-- 操作按钮 -->
        <view class="actions">
            <button 
                type="primary" 
                size="mini" 
                @click="testApi"
                :disabled="loading">
                {{ loading ? '请求中...' : '测试API' }}
            </button>
            
            <button 
                type="default" 
                size="mini" 
                @click="showEnvInfo">
                查看环境信息
            </button>
        </view>
        
        <!-- 请求结果 -->
        <view class="result" v-if="apiResult">
            <text class="result-title">API请求结果：</text>
            <text class="result-content">{{ apiResult }}</text>
        </view>
        
        <uni-link :href="websiteConfig.url" :text="websiteConfig.url"></uni-link>
    </view>
</template>

<script>
import { Constants, websiteConfig, utils } from '@/common/constants.js'

export default {
    name: 'HomePage',
    data() {
        return {
            Constants,
            websiteConfig,
            loading: false,
            apiResult: ''
        }
    },
    
    computed: {
        envText() {
            if (this.Constants.isDev) return '开发环境'
            if (this.Constants.isTest) return '测试环境'
            if (this.Constants.isProd) return '生产环境'
            return '未知环境'
        },
        
        envClass() {
            if (this.Constants.isDev) return 'env-dev'
            if (this.Constants.isTest) return 'env-test'
            if (this.Constants.isProd) return 'env-prod'
            return ''
        }
    },
    
    mounted() {
        utils.log('页面加载完成', {
            env: process.env.NODE_ENV,
            config: this.Constants
        })
    },
    
    methods: {
        // 测试API请求
        async testApi() {
            this.loading = true
            this.apiResult = ''
            
            try {
                const url = utils.getApiUrl('/api/test')
                utils.log('发起API请求', url)
                
                // 模拟API请求
                const response = await uni.request({
                    url,
                    method: 'GET',
                    timeout: this.Constants.apiTimeout
                })
                
                this.apiResult = `请求成功: ${JSON.stringify(response.data)}`
                utils.log('API请求成功', response)
                
            } catch (error) {
                this.apiResult = `请求失败: ${error.message || '未知错误'}`
                utils.error('API请求失败', error)
                
                uni.showToast({
                    title: '请求失败',
                    icon: 'none'
                })
            } finally {
                this.loading = false
            }
        },
        
        // 显示环境信息
        showEnvInfo() {
            const info = {
                环境: this.envText,
                API: this.Constants.baseUrl,
                版本: this.Constants.version,
                平台: this.Constants.platform,
                调试模式: this.Constants.isDev ? '开启' : '关闭'
            }
            
            uni.showModal({
                title: '环境信息',
                content: Object.entries(info)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join('\n'),
                showCancel: false
            })
        }
    }
}
</script>

<style scoped>
.container {
    padding: 20px;
    background-color: #f8f8f8;
    min-height: 100vh;
}

.header {
    text-align: center;
    margin-bottom: 30px;
}

.title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
}

.subtitle {
    font-size: 14px;
    color: #666;
    margin-top: 5px;
}

.env-info, .demo-section {
    background: white;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.info-item, .demo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #f0f0f0;
}

.info-item:last-child, .demo-item:last-child {
    border-bottom: none;
}

.label, .demo-label {
    color: #666;
    font-size: 14px;
}

.value, .demo-value {
    color: #333;
    font-size: 14px;
    font-weight: 500;
}

.env-dev { color: #67C23A; }
.env-test { color: #E6A23C; }
.env-prod { color: #F56C6C; }

.actions {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.result {
    background: white;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
}

.result-title {
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
}

.result-content {
    color: #666;
    font-size: 14px;
    word-break: break-all;
}
</style>
```

## 🎯 使用指南

### 1. HBuilderX 中切换环境

1. 打开 HBuilderX
2. 选择项目根目录
3. 点击运行 → 运行到浏览器 → 选择对应环境配置
4. 或者点击发行 → 网站-H5手机版 → 选择对应环境配置

### 2. 命令行使用

```bash
# 开发环境
npm run dev:h5

# 测试环境  
npm run build:test

# 生产环境
npm run build:prod
```

### 3. 环境验证

在页面中可以通过以下方式验证当前环境：

```javascript
// 获取环境变量
console.log('当前环境:', process.env.NODE_ENV)
console.log('API地址:', process.uniEnv.baseUrl)
console.log('是否为开发环境:', Constants.isDev)

// 条件编译
// #ifdef H5
    console.log('H5平台特有代码')
// #endif

// #ifdef MP-WEIXIN  
    console.log('微信小程序特有代码')
// #endif
```

## ⚠️ 注意事项

1. **文件命名**: 环境配置文件必须以 `.env` 开头
2. **导入方式**: Vue 3.0 中必须使用 ES6 的 `import/export` 语法
3. **全局变量**: `process.uniEnv` 是 uni-app 专有的全局环境变量
4. **平台差异**: 不同平台可能需要不同的配置参数
5. **构建缓存**: 切换环境后建议清理构建缓存

## 🔍 调试技巧

1. **环境检查**: 在 `main.js` 中添加环境日志输出
2. **配置验证**: 使用 `console.log` 验证配置是否正确加载
3. **条件编译**: 利用 uni-app 的条件编译处理平台差异
4. **错误处理**: 添加环境配置加载失败的容错机制

这样配置后，你就可以在不同环境下灵活切换配置，提高开发效率和部署的可靠性。