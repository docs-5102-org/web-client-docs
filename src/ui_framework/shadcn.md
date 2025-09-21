---
title: shadcn/ui 安装与使用指南
category:
  - ui framework
tag:
  - shadcn
---

# shadcn/ui 安装与使用指南

shadcn/ui 是现代 React 生态系统中备受推崇的 UI 组件解决方案，它革新了传统组件库的使用方式，为开发者提供了一种全新的、更加灵活的组件管理方法。

## 什么是 shadcn/ui？

shadcn/ui 不是传统意义上的 npm 包组件库，而是一个**"复制即用"（Copy & Paste）**的组件集合。它提供了经过精心设计的组件代码，开发者可以直接复制到项目中，并完全拥有和控制这些代码。

### 核心设计理念

- **完全拥有权**：复制的代码属于你的项目，可以任意修改和定制
- **零依赖负担**：不增加额外的 npm 包依赖
- **设计一致性**：基于统一的设计系统构建
- **开发者友好**：提供完整的 TypeScript 支持

## 技术架构特性

### 🎨 基于 Tailwind CSS
- 所有组件使用 Tailwind CSS 进行样式设计
- 确保视觉一致性和高度可定制性
- 响应式设计开箱即用
- 支持主题切换和深度样式定制

### 📘 完整的 TypeScript 支持
- 所有组件都用 TypeScript 编写
- 提供完整的类型定义和 IntelliSense 支持
- 在编译时捕获类型错误
- 更好的开发体验和代码维护性

### ♿ Radix UI 基础
- 底层基于 Radix UI 的无头组件（Headless Components）
- 确保优秀的可访问性（a11y）标准
- 提供完整的键盘导航支持
- 遵循 WAI-ARIA 规范

### 🔧 高度可定制性
- 完全拥有组件源代码
- 可以根据项目需求随意修改
- 支持品牌色彩和设计语言定制
- 灵活的主题配置系统

## 快速开始

### 1. 环境要求
```bash
# 确保项目已安装以下依赖
npm install react react-dom
npm install tailwindcss
npm install @types/react @types/react-dom  # TypeScript 项目
```

### 2. 初始化 shadcn/ui
```bash
npx shadcn-ui@latest init
```

### 3. 添加组件
```bash
# 添加单个组件
npx shadcn-ui@latest add button

# 添加多个组件
npx shadcn-ui@latest add button card dialog

# 查看所有可用组件
npx shadcn-ui@latest add
```

### 4. 使用组件
```tsx
import { Button } from "@/components/ui/button"

export default function App() {
  return (
    <div className="p-8">
      <Button variant="default" size="lg">
        开始使用 shadcn/ui
      </Button>
    </div>
  )
}
```

## 主要优势

### ✅ 设计优秀
- 现代化的视觉设计
- 遵循最新的 UI/UX 设计趋势
- 专业的组件交互效果
- 细致入微的动画和过渡效果

### ✅ 性能卓越
- 不增加额外的 bundle 大小
- 按需使用，只包含实际用到的代码
- 基于现代 React 最佳实践
- 优化的渲染性能

### ✅ 开发体验
- 完整的 TypeScript 支持
- 详细的文档和示例
- 活跃的社区支持
- 持续的更新和维护

### ✅ 框架兼容性
- **Next.js**：完美集成，支持 App Router 和 Pages Router
- **Vite**：快速开发和构建体验
- **Create React App**：开箱即用
- **Remix**：SSR 友好
- 其他 React 框架均可兼容

## 社区资源

### 官方资源
| 资源类型 | 链接 | 描述 |
|---------|------|------|
| 官方网站 | [ui.shadcn.com](https://ui.shadcn.com/) | 完整文档和组件展示 |
| GitHub 仓库 | [shadcn-ui/ui](https://github.com/shadcn-ui/ui) | 源代码，87.4k+ stars |
| Discord 社区 | [加入讨论](https://discord.gg/shadcn) | 实时交流和技术支持 |

### 社区生态
| 项目 | 链接 | 描述 |
|------|------|------|
| Awesome Collection | [awesome-shadcn-ui](https://awesome-shadcn-ui.vercel.app/) | 社区模板和扩展集合 |
| Turborepo 模板 | [turborepo-shadcn-ui](https://github.com/dan5py/turborepo-shadcn-ui) | Monorepo 项目模板 |
| 主题生成器 | [shadcn/ui themes](https://ui.shadcn.com/themes) | 在线主题定制工具 |

## 最佳实践

### 📁 项目结构
```
src/
├── components/
│   ├── ui/           # shadcn/ui 组件
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── dialog.tsx
│   └── custom/       # 自定义业务组件
├── lib/
│   └── utils.ts      # 工具函数
└── styles/
    └── globals.css   # 全局样式
```

### 🎨 主题定制
```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // 更多主题配置...
      },
    },
  },
}
```

### 🔄 组件定制示例
```tsx
// 扩展 Button 组件
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CustomButtonProps extends React.ComponentProps<typeof Button> {
  gradient?: boolean
}

export function CustomButton({ gradient, className, ...props }: CustomButtonProps) {
  return (
    <Button
      className={cn(
        gradient && "bg-gradient-to-r from-purple-500 to-pink-500",
        className
      )}
      {...props}
    />
  )
}
```

## 总结

shadcn/ui 已经成为 React 生态系统中不可或缺的 UI 解决方案。它独特的"复制即用"理念，结合现代化的设计和强大的技术栈，为开发者提供了一种全新的组件库使用方式。

无论你是在构建企业级应用、商业产品，还是个人项目，shadcn/ui 都能帮助你快速搭建出专业、美观、可访问的用户界面。

立即访问 [ui.shadcn.com](https://ui.shadcn.com/) 开始你的 shadcn/ui 之旅吧！