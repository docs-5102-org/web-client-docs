---
title: Next.js 教程
category:
  - react
  - Next.js
order:
  - 1
---

# Next.js 教程

Next.js 是一个基于 React 的开源框架，由 Vercel 公司开发和维护，旨在简化 React 应用的开发流程，同时提供强大的性能优化和开发体验。[菜鸟教程](https://www.runoob.com/nextjs/nextjs-tutorial.html?utm_source=chatgpt.com "Next.js 教程 - 菜鸟教程")

#### 学习教程

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

### 快速开发脚手架

https://gitee.com/fast-template-org/fast-next-dashboard-starter.git

---

## 🔧 Next.js 的主要特性

### 1. **混合渲染模式**

Next.js 支持多种渲染方式，包括：([菜鸟教程](https://www.runoob.com/nextjs/nextjs-tutorial.html?utm_source=chatgpt.com "Next.js 教程 - 菜鸟教程"))

- **静态生成（SSG）**：在构建时生成静态 HTML 页面，适用于内容不频繁变化的页面。([菜鸟教程](https://www.runoob.com/nextjs/nextjs-tutorial.html?utm_source=chatgpt.com "Next.js 教程 - 菜鸟教程"))
    
- **服务器端渲染（SSR）**：每次请求时在服务器上渲染页面，适用于需要动态获取数据的页面。([CSDN博客](https://blog.csdn.net/Likestarr/article/details/139320502?utm_source=chatgpt.com "走近Next.js：全栈框架的简介与应用原创 - CSDN博客"))
    
- **客户端渲染（CSR）**：在浏览器中渲染页面，适用于用户交互频繁的部分。
    

这种混合渲染模式使得开发者可以根据具体需求选择最合适的渲染方式，从而优化性能和用户体验。

### 2. **文件系统路由**

Next.js 使用文件系统来自动化路由的创建。在 `pages` 目录下创建的每个文件都会自动映射为相应的路由，无需额外的路由配置。([菜鸟教程](https://www.runoob.com/nextjs/nextjs-tutorial.html?utm_source=chatgpt.com "Next.js 教程 - 菜鸟教程"))

### 3. **API 路由**

Next.js 允许在 `pages/api` 目录下创建 API 路由，处理后端逻辑，方便构建全栈应用。([菜鸟教程](https://www.runoob.com/nextjs/nextjs-tutorial.html?utm_source=chatgpt.com "Next.js 教程 - 菜鸟教程"))

### 4. **自动代码拆分**

Next.js 会自动对每个页面进行代码拆分，只加载当前页面所需的 JavaScript 代码，减少页面的加载时间。([CSDN博客](https://blog.csdn.net/Likestarr/article/details/139320502?utm_source=chatgpt.com "走近Next.js：全栈框架的简介与应用原创 - CSDN博客"))

### 5. **内置优化功能**

Next.js 提供了多种优化功能，包括：([菜鸟教程](https://www.runoob.com/nextjs/nextjs-tutorial.html?utm_source=chatgpt.com "Next.js 教程 - 菜鸟教程"))

- **图像优化**：使用 `next/image` 组件自动为图像选择最佳格式、压缩、懒加载等。([菜鸟教程](https://www.runoob.com/nextjs/nextjs-tutorial.html?utm_source=chatgpt.com "Next.js 教程 - 菜鸟教程"))
    
- **字体优化**：自动优化字体加载，提升页面性能。
    
- **脚本优化**：自动优化脚本加载顺序，减少阻塞。
    

### 6. **TypeScript 支持**

Next.js 默认支持 TypeScript，提供更强的类型检查和更高效的编译，提升开发体验。([菜鸟教程](https://www.runoob.com/nextjs/nextjs-tutorial.html?utm_source=chatgpt.com "Next.js 教程 - 菜鸟教程"))

### 7. **国际化支持**

Next.js 提供内置的国际化支持，方便构建多语言网站。

---

## 🚀 快速上手

[Next.js 快速入门安装指南](Next.js%20快速入门安装指南.md)

---

## 📚 适用场景

Next.js 适用于多种应用场景，包括：

- **内容驱动的网站**：如博客、文档站点等，利用静态生成提高加载速度和 SEO。([菜鸟教程](https://www.runoob.com/nextjs/nextjs-tutorial.html?utm_source=chatgpt.com "Next.js 教程 - 菜鸟教程"))
    
- **电商平台**：结合服务器端渲染和 API 路由，构建高性能的电商网站。([菜鸟教程](https://www.runoob.com/nextjs/nextjs-tutorial.html?utm_source=chatgpt.com "Next.js 教程 - 菜鸟教程"))
    
- **企业级应用**：构建复杂的企业级应用，利用 Next.js 提供的优化功能提升性能。([菜鸟教程](https://www.runoob.com/nextjs/nextjs-tutorial.html?utm_source=chatgpt.com "Next.js 教程 - 菜鸟教程"))
    
- **多语言网站**：利用内置的国际化支持，轻松构建多语言网站。
    

---

## 🔗 相关资源

- 官方网站：[https://nextjs.org/](https://nextjs.org/)
    
- 中文文档：[https://nextjs.cn/](https://nextjs.cn/)
    
- GitHub 仓库：[https://github.com/vercel/next.js](https://github.com/vercel/next.js)
    

---

Next.js 提供了丰富的功能和优化，适合构建各种类型的 Web 应用。如果您有兴趣深入了解某个特性或需要示例代码，欢迎继续提问。([Next.js 中文文档](https://nextjscn.org/docs?utm_source=chatgpt.com "简介 - Next.js 中文文档"))