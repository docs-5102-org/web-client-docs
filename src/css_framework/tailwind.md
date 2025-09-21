---
title: Tailwind CSS 安装与使用指南
category:
  - css framework
tag:
  - Tailwind
---

# Tailwind CSS 安装与使用指南

Tailwind CSS 是一个功能优先的 CSS 框架，通过组合原子化的工具类来快速构建自定义 UI 界面。它提供了高度的设计灵活性，让开发者能够在不离开 HTML 的情况下完成样式设计。

## 🔗 快速链接

- **官方文档**: [tailwindcss.com](https://tailwindcss.com/docs/installation/using-vite)
- **在线试玩**: [play.tailwindcss.com](https://play.tailwindcss.com/)
- **中文文档**: [tailwind.org.cn](https://tailwind.org.cn/)

---

## 🚀 使用 Vite 快速上手

### 步骤 1: 创建项目

```bash
# 创建新的 Vite 项目
npm create vite@latest my-project --template vanilla
cd my-project

# 安装依赖
npm install
```

### 步骤 2: 安装 Tailwind CSS

```bash
# 安装 Tailwind CSS 及其 Vite 插件
npm install -D tailwindcss @tailwindcss/vite
```

### 步骤 3: 配置 Vite

创建或修改 `vite.config.js`：

```javascript
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
})
```

### 步骤 4: 引入 Tailwind

在 `src/style.css` 中添加：

```css
@import "tailwindcss";
```

### 步骤 5: 开始使用

更新 `index.html`：

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind CSS + Vite</title>
</head>
<body class="bg-gray-100 min-h-screen flex items-center justify-center">
  <div class="bg-white p-8 rounded-lg shadow-md">
    <h1 class="text-3xl font-bold text-gray-900 mb-4">
      Hello Tailwind! 👋
    </h1>
    <p class="text-gray-600 mb-6">
      开始你的 Tailwind CSS 之旅
    </p>
    <button class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors">
      开始探索
    </button>
  </div>
</body>
</html>
```

### 步骤 6: 启动开发

```bash
npm run dev
```

---

## ⚙️ 高级配置

### 自定义配置文件

创建 `tailwind.config.js` 进行深度定制：

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### 推荐的 VS Code 扩展

- **Tailwind CSS IntelliSense**: 提供智能提示和语法高亮
- **Headwind**: 自动排序 Tailwind 类名

---

## 🎯 其他安装方式

### 方式 1: Tailwind CLI

```bash
# 全局安装
npm install -g @tailwindcss/cli

# 初始化配置
tailwindcss init

# 监听构建
tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

### 方式 2: CDN 引入 (仅用于原型设计)

```html
<script src="https://cdn.tailwindcss.com"></script>
```

### 方式 3: PostCSS 集成

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## 💡 开发技巧

### 响应式设计
```html
<div class="w-full md:w-1/2 lg:w-1/3">
  响应式容器
</div>
```

### 状态变体
```html
<button class="bg-blue-500 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300">
  交互按钮
</button>
```

### 自定义工具类
```css
@layer utilities {
  .text-gradient {
    background: linear-gradient(to right, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
```

---

## 🔧 生产环境优化

### 构建优化
```bash
# 生产构建
npm run build

# 预览构建结果
npm run preview
```

### 去除未使用的样式
Tailwind CSS 4.0+ 自动包含 JIT (Just-In-Time) 模式，确保只生成实际使用的 CSS，显著减少文件大小。

---

## 📖 学习资源

- **官方文档**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **组件库**: [headlessui.com](https://headlessui.com/) | [tailwindui.com](https://tailwindui.com/)
- **社区资源**: [tailwindcomponents.com](https://tailwindcomponents.com/)
- **视频教程**: [Tailwind Labs YouTube](https://www.youtube.com/c/TailwindLabs)

---

## ⚡ 为什么选择 Vite + Tailwind？

- **极速开发**: Vite 的 HMR + Tailwind 的 JIT = 毫秒级更新
- **优化构建**: 生产环境自动移除未使用的样式
- **现代工具链**: ESM、TypeScript 开箱即用
- **插件生态**: 丰富的 Vite 插件支持

开始你的 Tailwind CSS 之旅，体验原子化 CSS 的强大魅力！ 🎨