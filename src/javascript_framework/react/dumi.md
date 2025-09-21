---
title: dumi教程
category:
  - react
  - dumi
date: 2025-09-20
---

# dumi 教程

## 什么是 dumi？

dumi 是一款为组件开发场景而生的文档工具，与组件开发工具 father 一起为开发者提供一站式的组件开发体验。它基于 `react-docgen` 解析组件的元数据（Markdown 文档等），能够自动生成美观的文档网站。

## 快速开始

### 安装过程

1. **创建项目目录**
```bash
mkdir dumi-test
cd dumi-test
```

2. **使用脚手架创建项目**
```bash
npx create-dumi
```

3. **选择模板类型**
创建过程中会提示选择模板类型：
- **Static Site**: 用于构建静态网站
- **React Library**: 用于构建组件库，包含组件示例
- **Theme Package**: 主题包开发脚手架，用于开发主题包

4. **安装依赖并启动**
```bash
# 安装依赖
npm install
# 或者
yarn install

# 启动开发服务器
npm start
# 或者
yarn start
```

## 核心特性

### 基于 react-docgen 的元数据解析
dumi 能够自动解析 React 组件的 TypeScript 类型定义、JSDoc 注释等信息，自动生成 API 文档。

### 丰富的主题系统
- **默认主题**: [查看源码](https://github.com/umijs/dumi/tree/master/src/client/theme-default)
- **自定义主题**: 支持完全自定义主题样式
- **主题市场**: 提供丰富的社区主题选择

## 配置与环境变量

### 环境变量设置

dumi 支持通过环境变量进行配置，不同操作系统的设置方式：

**macOS / Linux:**
```bash
PORT=3000 dumi dev
```

**Windows (cmd.exe):**
```bash
set PORT=3000&&dumi dev
```

### 跨平台环境变量管理

为了在不同操作系统中统一使用环境变量，推荐使用 `cross-env` 工具：

```bash
# 安装 cross-env
yarn add cross-env -D

# 使用 cross-env
cross-env PORT=3000 dumi dev
```

### package.json 配置示例

**Windows 原生方式:**
```json
{
  "scripts": {
    "dev": "set APP_ROOT=example dumi dev",
    "build": "father build",
    "prepare": "husky install && father link-dev-theme && set APP_ROOT=example dumi setup",
    "lint": "npm run lint:es && npm run lint:css",
    "lint:css": "stylelint \"{src,test}/**/*.{css,less}\"",
    "lint:es": "eslint \"{src,test}/**/*.{js,jsx,ts,tsx}\"",
    "prepublishOnly": "father doctor && npm run build"
  }
}
```

**跨平台方式 (推荐):**
```json
{
  "scripts": {
    "build": "father build",
    "build:docs": "cross-env APP_ROOT=example dumi build",
    "build:site": "cross-env APP_ROOT=example DEPLOY_SITE=local dumi build",
    "site": "node app.js",
    "dev": "father dev",
    "docs": "cross-env APP_ROOT=example dumi dev",
    "lint": "pnpm run lint:es && pnpm run lint:css",
    "lint:css": "stylelint \"{src,test}/**/*.{css,less}\"",
    "lint:es": "eslint \"{src,test}/**/*.{js,jsx,ts,tsx}\" --fix",
    "prepare": "husky install && father link-dev-theme && cross-env APP_ROOT=example dumi setup",
    "prepublishOnly": "father doctor && pnpm run build"
  }
}
```

## 主题开发

### dumi setup 命令作用

在执行 `yarn install` 后，`prepare` 脚本会自动运行 `dumi setup` 命令，该命令会：
- 在 example 目录下生成 `.dumi` 文件夹
- 创建 theme 主题文件夹
- 将 src 目录下的文件和文件夹打包到主题目录中

## 插件开发

### 创建插件
dumi 支持插件机制来扩展功能。创建新插件的详细指南可参考：
[dumi 插件开发文档](https://d.umijs.org/plugin/new)

### father 插件开发与发布
如果需要开发更复杂的插件并发布到 NPM，可以参考：
[father 插件开发指南](https://github.com/umijs/father/blob/master/docs/guide/dev.md)

## 相关资源

- **官网**: [https://d.umijs.org/](https://d.umijs.org/)
- **完整教程**: [https://d.umijs.org/guide](https://d.umijs.org/guide)
- **自定义主题文档**: [https://d.umijs.org/theme](https://d.umijs.org/theme)
- **主题市场**: [https://d.umijs.org/theme/market](https://d.umijs.org/theme/market)
- **升级指南**: [https://umijs.org/docs/introduce/upgrade-to-umi-4](https://umijs.org/docs/introduce/upgrade-to-umi-4)

## 最佳实践

1. **项目结构**: 保持清晰的项目结构，将组件、文档、示例分开管理
2. **环境配置**: 使用 `cross-env` 确保跨平台兼容性
3. **主题定制**: 根据项目需求选择合适的主题或进行自定义开发
4. **插件使用**: 合理使用插件来扩展 dumi 的功能
5. **文档维护**: 保持文档与代码的同步更新

通过本教程，您应该能够快速上手 dumi，构建出专业的组件文档网站。