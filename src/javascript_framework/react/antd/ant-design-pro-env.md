---
title: Ant Design Pro 环境变量配置指南
category:
  - Ant Design
  - Ant Design Pro
date: 2025-09-20
---

# Ant Design Pro 环境变量配置指南

## 概述

Ant Design Pro 基于 UmiJS 构建，支持多环境配置管理。通过合理配置环境变量，可以在不同的开发、测试、生产环境中使用不同的配置参数。

## 官方文档链接

- [Ant Design Pro 环境管理](https://pro.ant.design/zh-CN/docs/environment-manage)
- [UmiJS 配置文档](https://umijs.org/docs/guides/env-variables)
- [UmiJS 多环境配置](https://umijs.org/docs/guides/directory-structure#config)

## 配置结构

### 1. 主配置文件 `config/config.ts`

主配置文件用于定义全局配置和环境变量入口：

```typescript
/**
* @description config/config.ts 还是 .umirc.ts 同理
* @see https://pro.ant.design/zh-CN/docs/environment-manage/#%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F
*      https://v3.umijs.org/zh-CN/docs/config
*      https://umijs.org/docs/guides/env-variables#umi_env
*/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  // 公共环境变量入口
  define: {
    REACT_APP_ENV: REACT_APP_ENV || 'local', // 默认本地环境
    TITLE: defaultSettings.title, // 系统标题
  },
  
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  
  // 布局配置
  layout: {
    locale: false,
    siderWidth: 208,
    ...defaultSettings,
  },
  
  // 动态导入配置
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  
  // 浏览器兼容
  targets: {
    ie: 11,
  },
  
  // 路由配置
  routes,
  
  // 权限配置
  access: {},
  
  // 主题配置
  theme: {
    'root-entry-name': 'variable',
  },
  
  // 构建工具
  esbuild: {},
  
  title: false,
  ignoreMomentLocale: true,
  
  // 代理配置，根据环境变量选择不同的代理
  proxy: proxy[REACT_APP_ENV || 'local'],
  
  manifest: {
    basePath: '/',
  },
  
  // 热更新
  fastRefresh: {},
  
  // OpenAPI 配置
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  
  nodeModulesTransform: {
    type: 'none',
  },
  
  mfsu: {},
  webpack5: {},
  exportStatic: {},
  
  // 支持音频文件
  chainWebpack(memo) {
    memo.module
      .rule('media')
      .test(/\.(mp3|mp4)$/)
      .use('file-loader')
      .loader(require.resolve('file-loader'))
  },
});
```

### 2. 环境特定配置文件

#### 本地环境配置 `config/config.local.ts`

```typescript
/**
 * @description 本地环境变量配置 REACT_APP_ENV=local
 * @note .local.ts 文件应添加到 .gitignore 中，不要提交到 git 仓库
 * @note .local.ts 配置优先级最高，会覆盖其他同名环境变量
 */
import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    WEB_SOCKET_URL: 'localhost:9330',
    QR_CODE_URL: 'http://192.168.122.104:8001',
  },
});
```

#### 开发环境配置 `config/config.dev.ts`

```typescript
/**
 * @description 开发环境变量配置 REACT_APP_ENV=dev
 */
import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    WEB_SOCKET_URL: '114.115.218.225:9330',
    QR_CODE_URL: 'http://114.115.218.225:97',
  },
  
  plugins: [
    // React 开发调试工具
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
});
```

#### 生产环境配置 `config/config.prod.ts`

```typescript
/**
 * @description 生产环境变量配置 REACT_APP_ENV=prod
 */
import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    WEB_SOCKET_URL: 'production.example.com:9330',
    QR_CODE_URL: 'https://production.example.com/api',
  },
  
  // 生产环境可以移除开发工具
  plugins: [],
});
```

### 3. 测试环境配置 `config/config.test.ts`

```typescript
/**
 * @description 测试环境变量配置 REACT_APP_ENV=test
 */
import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    WEB_SOCKET_URL: 'test.example.com:9330',
    QR_CODE_URL: 'http://test.example.com/api',
  },
});
```

## Package.json 脚本配置

### 安装依赖

首先安装 `cross-env` 用于跨平台环境变量设置：

```bash
npm install --save-dev cross-env
```

### 脚本配置

```json
{
  "scripts": {
    "analyze": "cross-env ANALYZE=1 umi build",
    "build": "umi build",
    "build:local": "cross-env REACT_APP_ENV=local UMI_ENV=local umi build",
    "build:dev": "cross-env REACT_APP_ENV=dev UMI_ENV=dev umi build",
    "build:test": "cross-env REACT_APP_ENV=test UMI_ENV=test umi build",
    "build:prod": "cross-env REACT_APP_ENV=prod UMI_ENV=prod umi build",
    
    "start": "cross-env UMI_ENV=local umi dev --port=8010",
    "start:local": "cross-env REACT_APP_ENV=local UMI_ENV=local MOCK=none umi dev --port=8010",
    "start:dev": "cross-env REACT_APP_ENV=dev UMI_ENV=dev MOCK=none umi dev --port=8010",
    "start:test": "cross-env REACT_APP_ENV=test UMI_ENV=test MOCK=none umi dev --port=8010",
    "start:no-mock": "cross-env REACT_APP_ENV=dev UMI_ENV=dev MOCK=none umi dev",
    "start:no-ui": "cross-env REACT_APP_ENV=dev UMI_ENV=dev UMI_UI=none umi dev",
    "start:pre": "cross-env REACT_APP_ENV=pre UMI_ENV=pre umi dev"
  }
}
```

## 使用方法

### 开发模式

```bash
# 使用默认本地环境（等同于 start:local）
npm start

# 使用本地环境配置
npm run start:local

# 使用开发环境配置
npm run start:dev

# 使用测试环境配置
npm run start:test
```

### 构建部署

```bash
# 构建本地环境版本
npm run build:local

# 构建开发环境版本
npm run build:dev

# 构建测试环境版本
npm run build:test

# 构建生产环境版本
npm run build:prod
```

## 环境变量优先级

1. **最高优先级**：`.local.ts` 文件中的配置
2. **中等优先级**：通过 `UMI_ENV` 指定的环境配置文件
3. **最低优先级**：`config.ts` 中的默认配置

## 代码中使用环境变量

在 React 组件中使用定义的环境变量：

```typescript
// 在组件中使用
const MyComponent = () => {
  const socketUrl = WEB_SOCKET_URL; // 直接使用，无需 process.env
  const qrCodeUrl = QR_CODE_URL;
  
  return (
    <div>
      <p>WebSocket URL: {socketUrl}</p>
      <p>QR Code URL: {qrCodeUrl}</p>
    </div>
  );
};
```

## 项目目录结构

```
├── config/
│   ├── config.ts           # 主配置文件
│   ├── config.local.ts     # 本地环境配置（不提交到git）
│   ├── config.dev.ts       # 开发环境配置
│   ├── config.test.ts      # 测试环境配置
│   ├── config.prod.ts      # 生产环境配置
│   ├── defaultSettings.ts  # 默认设置
│   ├── proxy.ts           # 代理配置
│   └── routes.ts          # 路由配置
├── package.json
└── .gitignore             # 记得添加 config.local.ts
```

## 最佳实践

1. **安全性**：将 `config.local.ts` 添加到 `.gitignore`，避免提交敏感信息
2. **环境隔离**：为不同环境使用不同的 API 端点和配置
3. **命名规范**：使用统一的环境变量命名规范，如 `API_BASE_URL`、`WEB_SOCKET_URL` 等
4. **文档维护**：及时更新环境变量文档，确保团队成员了解各环境的配置

## 常见问题

### Q: 为什么我的环境变量没有生效？
A: 检查以下几点：
- 确保安装了 `cross-env`
- 检查 `define` 配置是否正确
- 验证环境变量名称是否一致
- 确认当前使用的命令和环境配置文件

### Q: 如何在生产环境中动态更改配置？
A: 建议使用运行时配置或将配置存储在后端，通过 API 获取，而不是在构建时写死。

## 参考资源

- Ant Design Pro 官方文档
  - https://pro.ant.design/
  - https://pro.ant.design/zh-CN/docs/environment-manage#%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F
- [UmiJS 官方文档](https://umijs.org/)
- [环境变量最佳实践](https://12factor.net/config)