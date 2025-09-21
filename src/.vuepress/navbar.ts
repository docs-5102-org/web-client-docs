import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "📱 移动端原生开发",
    children: [
      {
        text: "Android",
        icon: "android",
        link: "/mobile_native/android/",
      },
      {
        text: "iOS",
        icon: "apple",
        link: "/mobile_native/ios/",
      },
      {
        text: "html5plus",
        icon: "apple",
        link: "/mobile_native/html5plus",
      },
    ]
  },
  {
    text: "📦 跨平台框架",
    children: [
      {
        text: "electron",
        link: "/cross_platform/electron/guide",
      },
      {
        text: "flutter",
        link: "/cross_platform/flutter/guide",
      },
      {
        text: "uni-app",
        link: "/cross_platform/uni-app/guide",
      },
    ]
  },
  {
    text: "🌐 Web框架",
    children: [
      {
        text: "CSS Framework",
        children: [
          {
            text: "🌊 Tailwind CSS",
            link: "/css_framework/tailwind",
          },
          {
            text: "🅱️ Bootstrap",
            link: "/css_framework/bootstrap",
          },
        ]
      },
      {
        text: "Javascript Framework",
        link: "/javascript_framework/vue/guide",
        children: [
          {
            text: "✨ JS",
            link: "/javascript_framework/js/",
          },
          {
            text: "Vue",
            icon: 'https://cn.vuejs.org/logo.svg',
            link: "/javascript_framework/vue/starter",
          },
          {
            text: "⚛️ React",
            link: "/javascript_framework/react/",
          },
        ]
      },
      {
        text: "UI Framework",
        children: [
          {
            text: "🅂 Shadcn",
            link: "/ui_framework/shadcn",
          },
        ]
      },
    ]
  },
  {
    text: "🌈 样式体系",
    children: [
      {
        text: "css",
        link: "/style_standard/css/starter",
      },
      {
        text: "sass",
        link: "/style_standard/sass/starter",
      },
    ]
  },
  {
    text: '📦 ​​资源工具箱​​',
    link: '/resource_tools/'
  },
  {
    text: '📘 专项文档',
    children: [
      {
        text: '📑 博客文档',
        link: '/article/',
      },
      { text: '🐧 Linux', link: 'https://devops.dzspace.top/linux/' },
      { text: 'Docker', icon: 'skill-icons:docker', link: 'https://github.com/tuonioooo/docker' },
      {
        text: '📜 AI智能化文档',
        link: 'https://notion.dzspace.top',
      },
      { text: '💻 服务端技术栈', link: 'https://coding.dzspace.top/' },
    ]
  }
]);
