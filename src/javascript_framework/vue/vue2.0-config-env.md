---
title: Vue 2.0 配置环境变量
category:
  - vue
date: 2025-09-20
---

# Vue 2.0 配置环境变量

## 简介

在Vue 2.0项目开发过程中，我们经常需要为不同的环境（开发、测试、生产）配置不同的环境变量。Vue CLI提供了便捷的方式来管理这些环境变量，让我们能够轻松地在不同环境间切换配置。

## 环境变量配置步骤

### 1. 创建环境变量文件

在项目根目录下创建对应的环境变量文件：

- `.env` - 默认环境变量（所有环境都会加载）
- `.env.development` - 开发环境变量
- `.env.production` - 生产环境变量
- `.env.test` - 测试环境变量

### 2. 环境变量文件格式

在环境变量文件中，按照以下格式配置变量：

```bash
# 开发环境 (.env.development)
NODE_ENV=development
VUE_APP_BASE_URL=http://localhost:3000/api
VUE_APP_TITLE=Vue开发环境

# 生产环境 (.env.production)
NODE_ENV=production
VUE_APP_BASE_URL=https://api.example.com
VUE_APP_TITLE=Vue生产环境
```

**注意：** 只有以 `VUE_APP_` 开头的变量才会被webpack的DefinePlugin静态嵌入到客户端侧的包中。

### 3. package.json 脚本配置

在`package.json`文件中配置对应的构建脚本：

```json
{
  "scripts": {
    "serve": "vue-cli-service serve",
    "serve:dev": "vue-cli-service serve --mode development",
    "serve:test": "cross-env NODE_ENV=test vue-cli-service serve",
    "build": "vue-cli-service build",
    "build:dev": "vue-cli-service build --mode development",
    "build:test": "cross-env NODE_ENV=test vue-cli-service build",
    "build:prod": "vue-cli-service build --mode production"
  }
}
```

### 4. 在代码中使用环境变量

在Vue组件或JavaScript文件中使用环境变量：

```javascript
// 在组件中使用
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      title: process.env.VUE_APP_TITLE
    }
  },
  mounted() {
    console.log('当前环境：', process.env.NODE_ENV)
    console.log('API地址：', process.env.VUE_APP_BASE_URL)
  }
}
```

## 依赖安装

为了确保环境变量在不同操作系统中都能正常工作，建议安装`cross-env`：

```bash
npm install --save-dev cross-env
# 或者
npm i cross-env
```

## 环境变量的优先级

Vue CLI会按照以下优先级加载环境变量：

1. `.env.[mode].local` - 本地环境文件（会被git忽略）
2. `.env.local` - 本地环境文件（会被git忽略）
3. `.env.[mode]` - 指定模式的环境文件
4. `.env` - 默认环境文件

## 实际应用示例

```javascript
// api/config.js
const config = {
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
}

export default config
```

```javascript
// main.js
import axios from 'axios'
import config from './api/config'

// 配置axios
axios.defaults.baseURL = config.baseURL
axios.defaults.timeout = config.timeout

console.log(`应用运行在${process.env.NODE_ENV}环境`)
```

## 注意事项

1. 环境变量文件应该被提交到版本控制系统中（除了`.local`文件）
2. 敏感信息不应该放在环境变量文件中，应该使用`.env.local`文件或服务器环境变量
3. 环境变量的值都是字符串类型
4. 修改环境变量后需要重启开发服务器

## 参考链接

- [Vue CLI官方文档 - 模式和环境变量](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E5%9C%A8%E5%AE%A2%E6%88%B7%E7%AB%AF%E4%BE%A7%E4%BB%A3%E7%A0%81%E4%B8%AD%E4%BD%BF%E7%94%A8%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F)
- [第三方参考文档](https://www.cnblogs.com/sese/p/11905402.html)

---

通过合理配置环境变量，我们可以让Vue 2.0项目在不同环境下灵活切换配置，提高开发效率和部署便利性。