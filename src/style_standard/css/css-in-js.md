---
title: css-in-js教程
category:
  - css

---


# CSS-IN-JS 完整指南

## 什么是 CSS-IN-JS

CSS-IN-JS 是 WEB 项目中将 CSS 代码捆绑在 JavaScript 代码中的解决方案。这种方案旨在解决传统 CSS 的局限性，例如缺乏动态功能、作用域和可移植性。

通过 CSS-IN-JS，开发者可以在 JavaScript 文件中直接编写样式代码，实现样式与组件的紧密结合，从而构建更加模块化和可维护的应用程序。

## CSS-IN-JS 的优点

### 1. 独立的作用域
CSS-IN-JS 让 CSS 代码拥有独立的作用域，能够有效阻止 CSS 代码泄露到组件外部，从根本上防止样式冲突问题。每个组件的样式都被封装在自己的作用域内，确保样式的隔离性。

### 2. 增强组件可移植性
让组件更具可移植性，实现真正的开箱即用。开发者可以轻松创建松耦合的应用程序，组件可以独立存在而不依赖外部样式文件。

### 3. 提高组件可重用性
让组件更具可重用性，遵循"编写一次，随处运行"的原则。不仅可以在同一应用程序中重用组件，而且可以在使用相同框架构建的其他应用程序中重用组件，大大提高了开发效率。

### 4. 动态样式功能
让样式具有动态功能，可以将复杂的逻辑应用于样式规则。如果要创建需要动态功能的复杂UI，CSS-IN-JS 是理想的解决方案，能够根据组件状态、用户交互等条件动态调整样式。

## CSS-IN-JS 的缺点

### 1. 增加项目复杂性
为项目增加了额外的复杂性，开发者需要学习新的语法和概念，同时需要处理 JavaScript 和 CSS 的结合方式。

### 2. 降低代码可读性
自动生成的选择器大大降低了代码的可读性，调试时可能会遇到困难，特别是在浏览器开发者工具中查看生成的样式时。

## Emotion 库介绍

### 概述
Emotion 是一个旨在使用 JavaScript 编写 CSS 样式的库，是目前最流行的 CSS-IN-JS 解决方案之一。

**官网：** https://emotion.sh/docs/introduction

### 安装
```bash
npm install @emotion/core @emotion/styled
```

### 基本用法示例

```javascript
import {css} from "@emotion/css";

<div className={css`
  cursor: pointer;
  display: inline-block;
  padding: 8px 16px;
  background-color: #f0f0f0;
  color: #000;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
`} onClick={() => setOpen(true)}>
  <Flex justify={'space-between'}>
    <Space>
      <Text>{selectSongText()}</Text>
    </Space>
    <RightOutlined style={{fontSize: `16px`}}/>
  </Flex>
</div>
```

### 高级特性

Emotion 支持多种高级特性，包括：

- **嵌套选择器**：支持类似 Sass 的嵌套语法
- **伪类和伪元素**：可以直接在样式中使用 `:hover`、`:active` 等伪类
- **媒体查询**：支持响应式设计
- **动画**：内置动画支持
- **主题**：提供主题系统，方便统一管理样式变量

## 适用场景

CSS-IN-JS 特别适合以下场景：

1. **React 应用**：与 React 组件化开发理念高度契合
2. **大型项目**：需要良好的样式隔离和组件化管理
3. **动态样式**：需要根据状态动态改变样式的场景
4. **组件库开发**：构建可重用的 UI 组件库
5. **单页应用**：需要模块化样式管理的 SPA 应用


## 总结

CSS-IN-JS 是现代前端开发中的重要技术方案，它解决了传统 CSS 的许多痛点，为组件化开发提供了强有力的样式解决方案。虽然增加了一定的学习成本和项目复杂性，但在合适的场景下，其带来的收益远大于成本。

选择 CSS-IN-JS 方案时，建议根据项目的具体需求、团队的技术栈和开发经验来综合考虑，确保选择最适合的解决方案。
