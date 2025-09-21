---
title: React教程
category:
  - react
date: 2025-09-20
---

# React教程

React 是由 Facebook（现 Meta）开发的用于构建用户界面的 JavaScript 库。它采用组件化开发模式，使用虚拟 DOM 提高性能，是目前最流行的前端框架之一。

## 📚 学习路线

### 基础阶段
1. **JavaScript 基础**：ES6+、异步编程、模块化
2. **React 核心概念**：组件、JSX、Props、State
3. **事件处理**：事件绑定、表单处理
4. **生命周期**：类组件生命周期、函数组件 Hooks

### 进阶阶段
1. **状态管理**：Context API、Redux、Zustand
2. **路由管理**：React Router
3. **性能优化**：memo、useMemo、useCallback
4. **测试**：Jest、React Testing Library

### 实战阶段
1. **项目构建**：Create React App、Vite
2. **UI 框架**：Ant Design、Material-UI、Chakra UI
3. **数据请求**：Axios、SWR、React Query
4. **部署发布**：Netlify、Vercel、GitHub Pages

## 📖 文档资源

### 官方文档
- [React 官方文档（中文）](https://zh-hans.react.dev/) - 最新版本文档
- [React 官方文档（英文）](https://react.dev/) - 英文版本，更新最及时
- [React 版本历史](https://zh-hans.react.dev/versions) - 查看不同版本特性
- [React DevTools](https://react.dev/learn/react-developer-tools) - 浏览器调试工具
- React进阶之高阶组件
  - https://zh-hans.reactjs.org/docs/higher-order-components.html#gatsby-focus-wrapper
  - https://www.cnblogs.com/libin-1/p/7087605.html


### 第三方教程
- [菜鸟教程 - React](https://www.runoob.com/react/react-tutorial.html) - 适合初学者入门
- [MDN - React 入门](https://developer.mozilla.org/zh-CN/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started) - Mozilla 官方教程
- [React 技术栈系列教程](https://www.ruanyifeng.com/blog/2016/09/react-technology-stack.html) - 阮一峰的技术博客

### 视频教程
- [B站 - 尚硅谷 React 全家桶（经典版）](https://www.bilibili.com/video/BV184411x7F9/?spm_id_from=333.999.0.0&vd_source=19bcb091b0112d6028dc150c1edfa43a)
  - [配套文档](./file/尚硅谷-React全家桶.docx) - 详细的学习笔记
  - 注意：部分内容可能已过时，建议结合最新文档学习
- [B站 - React18 新特性详解](https://www.bilibili.com/video/BV1bK4y1u7J6/) - React 18 新功能
- [YouTube - React Official Channel](https://www.youtube.com/channel/UCz5vTaEhvh7dOHEyd1efcaQ) - 官方视频教程

## 🛠️ 开发环境

### 快速开始
```bash
# 使用 Create React App（传统方式）
npx create-react-app my-app
cd my-app
npm start

# 使用 Vite（推荐，更快）
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev

# 使用 Next.js（全栈框架）
npx create-next-app@latest my-app
cd my-app
npm run dev
```

### 推荐工具
- **代码编辑器**：VS Code
- **浏览器插件**：React Developer Tools
- **包管理器**：npm、yarn、pnpm
- **代码格式化**：Prettier、ESLint

## 📦 生态系统

### 状态管理
- **Redux**：最流行的状态管理库
- **Zustand**：轻量级状态管理
- **Jotai**：原子化状态管理
- **Context API**：React 内置状态管理

### 路由
- **React Router**：官方推荐的路由库
- **Reach Router**：已合并到 React Router
- **Next.js Router**：Next.js 内置路由

### UI 组件库
- **Ant Design**：企业级 UI 设计语言
- **Material-UI (MUI)**：Google Material Design
- **Chakra UI**：模块化和易用的组件库
- **React Bootstrap**：基于 Bootstrap 的组件

### 数据获取
- **React Query (TanStack Query)**：强大的数据同步库
- **SWR**：用于数据获取的 React Hooks
- **Apollo Client**：GraphQL 客户端
- **Axios**：HTTP 客户端库

## 🎯 核心概念速览

### 组件定义
```jsx
// 函数组件（推荐）
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// 箭头函数组件
const Welcome = ({ name }) => <h1>Hello, {name}!</h1>;

// 类组件（传统方式）
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

### Hooks 使用
```jsx
import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## 📋 学习检查清单

### 基础知识
- [ ] 理解 JSX 语法
- [ ] 掌握组件的定义和使用
- [ ] 理解 Props 和 State 的区别
- [ ] 熟悉事件处理机制
- [ ] 掌握条件渲染和列表渲染

### 进阶知识
- [ ] 熟练使用 Hooks（useState、useEffect、useContext 等）
- [ ] 理解组件生命周期
- [ ] 掌握表单处理和受控组件
- [ ] 理解 React 性能优化技巧
- [ ] 熟悉状态管理模式

### 实践技能
- [ ] 能够搭建完整的 React 项目
- [ ] 集成第三方库和组件
- [ ] 实现路由和页面导航
- [ ] 处理异步数据和 API 调用
- [ ] 编写组件测试

## 🔗 社区资源

### 官方资源
- [React GitHub](https://github.com/facebook/react) - 源码和问题追踪
- [React RFC](https://github.com/reactjs/rfcs) - 功能提案和讨论
- [React Blog](https://react.dev/blog) - 官方博客和更新

### 社区网站
- [React 中文社区](https://react-china.org/) - 中文用户交流平台
- [Stack Overflow - React](https://stackoverflow.com/questions/tagged/reactjs) - 问题解答
- [Reddit - r/reactjs](https://www.reddit.com/r/reactjs/) - 社区讨论

### 实用工具
- [React Snippets for VS Code](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets) - 代码片段
- [Storybook](https://storybook.js.org/) - 组件开发和测试
- [React Hook Form](https://react-hook-form.com/) - 高性能表单处理

