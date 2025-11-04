---
title: Next.js 快速入门指南
category:
  - react
  - Next.js
order:
  - 2
---

# Next.js 快速入门安装指南

## 简介

Next.js 是一个基于 React 的全栈框架，提供了服务端渲染（SSR）、静态站点生成（SSG）、API 路由等功能，是构建现代 Web 应用的理想选择。

**官方网站**: [https://nextjs.org](https://nextjs.org/)

## 环境要求

在开始之前，请确保您的系统满足以下要求：

- **Node.js**: 版本 18.17 或更高版本
- **操作系统**: macOS、Windows 或 Linux

## 安装 pnpm(已安装忽略)

pnpm 是一个快速、节省磁盘空间的包管理器，推荐用于 Next.js 项目。

### 全局安装 pnpm

```bash
# 使用 npm 安装
npm install -g pnpm

# 或使用 corepack（Node.js 16.13+）
corepack enable
corepack prepare pnpm@latest --activate
```

### 验证安装

```bash
pnpm --version
```

## 创建 Next.js 项目

### 方法一：使用 pnpm create（推荐）

```bash
# 创建新项目
pnpm create next-app@latest my-next-app

# 进入项目目录
cd my-next-app
```

### 方法二：使用 pnpm dlx


```bash
# 使用 dlx 创建项目（推荐用于一次性执行）
pnpm dlx create-next-app@latest test-app

# 进入项目目录
cd test-app

```

> **注意**: 
> `pnpm dlx` 相当于 `npx`，用于执行远程包而无需全局安装。这是创建 Next.js 项目的另一种推荐方式。
> 官网安装方法：[npx](https://nextjs.org/docs/app/getting-started/installation)

创建过程中，您会看到以下配置选项：

```
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like to use `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to customize the default import alias (@/*)? … No / Yes
```
> 说明：
> * Next.js 内置 Tailwind CSS 支持，免去手动安装的过程
> * 动态安装UI
> * `npx shadcn-ui@latest add button `


### 方法三：手动创建

```bash
# 创建项目目录
mkdir my-next-app
cd my-next-app

# 初始化 package.json
pnpm init

# 安装 Next.js 和依赖
pnpm add next@latest react@latest react-dom@latest

# 安装开发依赖（可选）
pnpm add -D typescript @types/node @types/react @types/react-dom eslint eslint-config-next
```

## 项目结构

使用 create-next-app 创建的项目结构如下：

```
my-next-app/
├── app/                 # App Router 目录（Next.js 13+）
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/              # 静态资源
├── next.config.js       # Next.js 配置文件
├── package.json
├── pnpm-lock.yaml       # pnpm 锁定文件
└── tsconfig.json        # TypeScript 配置
```

## 配置 package.json 脚本

确保您的 `package.json` 包含以下脚本：

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

## 启动开发服务器

```bash
# 启动开发服务器
pnpm run dev/ pnpm dev

# 或指定端口
pnpm dev -- -p 3001
```

开发服务器启动后，在浏览器中访问 [http://localhost:3000](http://localhost:3000/) 查看您的应用。

## 构建和部署

```bash
# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start
```

## 项目中动态添加 UI 组件


### 1. 初始化 shadcn/ui

**npx 命令：**

```bash
npx shadcn-ui@latest init
```

**pnpm 命令：**

```bash
pnpm dlx shadcn@latest init
```

初始化会自动创建组件配置`components.json`

```json
{
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### 2. 添加shadcn/ui 组件

**npx 命令：**

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add form
```

**pnpm 命令：**

```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add form
```
> 注意：
> 添加组件时，如果项目中没有 `components.json` 文件，`shadcn/ui` 会**自动提示并进行初始化**。

### 3. 批量添加组件

**npx 命令：**

```bash
npx shadcn@latest add button card dialog form input label
```

**pnpm 命令：**

```bash
pnpm dlx shadcn@latest add button card dialog form input label
```

## 4. 其他 UI 库的安装

**Tailwind CSS：**

```bash
# npx
npx tailwindcss init -p

# pnpm
pnpm dlx tailwindcss init -p
```

**Storybook：**

```bash
# npx
npx storybook@latest init

# pnpm
pnpm dlx storybook@latest init
```

## 5. 常用的 shadcn/ui 组件命令

```bash
# 表单相关
pnpm dlx shadcn-ui@latest add form input label button

# 布局相关
pnpm dlx shadcn-ui@latest add card sheet dialog

# 数据展示
pnpm dlx shadcn-ui@latest add table badge avatar

# 导航相关
pnpm dlx shadcn-ui@latest add navigation-menu breadcrumb

# 反馈相关
pnpm dlx shadcn-ui@latest add toast alert-dialog
```

## 6. 查看可用组件

```bash
# npx
npx shadcn-ui@latest add

# pnpm
pnpm dlx shadcn-ui@latest add
```

## 关键区别

- **npx**: 使用 npm 的包执行器
- **pnpm dlx**: pnpm 的包执行器，相当于 npx
- 使用 `pnpm dlx` 可以保持项目包管理器的一致性
- 两者功能完全相同，只是使用不同的包管理器

推荐在 pnpm 项目中统一使用 `pnpm dlx` 命令。


## 常用 pnpm 命令

```bash
# 安装依赖
pnpm install

# 添加依赖
pnpm add package-name

# 添加开发依赖
pnpm add -D package-name

# 移除依赖
pnpm remove package-name

# 更新依赖
pnpm update

# 查看依赖树
pnpm list

# 使用 dlx 执行远程包（相当于 npx）
pnpm dlx <package-name>

# 清理缓存
pnpm store prune
```
## 注意事项

1. 当从一个项目当中，手动移植（复制粘贴的方式）到一个新项目中，时必须执行一个手动安装默认组件的命令，否则无法识别 默认组件的模块位置，会报：

```bash
# 可以是任意的组件
pnpm dlx shadcn@latest add collapsible
```


## 参考资源

- **Next.js 官方文档**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Next.js 学习教程**: [https://nextjs.org/learn](https://nextjs.org/learn)
- **pnpm 官方文档**: [https://pnpm.io](https://pnpm.io/)
- **Next.js GitHub 仓库**: [https://github.com/vercel/next.js](https://github.com/vercel/next.js)
- **Next.js 示例**: [https://github.com/vercel/next.js/tree/canary/examples](https://github.com/vercel/next.js/tree/canary/examples)
