import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
  ],
  "/article/": false, // 隐藏侧边栏
  //移动端开发
  "/mobile_native/": [
    {
      text: "Android", // 分组
      prefix: "android/", // 前缀
      collapsible: true, // 是否可折叠
      children: "structure", // 结构
    },
    {
      text: "iOS", // 分组
      prefix: "ios/", // 前缀
      collapsible: true, // 是否可折叠
      children: "structure", // 结构 
    },
  ],
  // 跨平台框架
  "/cross_platform/": [
    {
      text: "electron", // 分组
      prefix: "electron/", // 前缀
      collapsible: true, // 是否可折叠
      children: "structure", // 结构
    },
    {
      text: "flutter", // 分组
      prefix: "flutter/", // 前缀
      collapsible: true, // 是否可折叠
      children: "structure", // 结构 
    },
    {
      text: "uni-app", // 分组
      prefix: "uni-app/", // 前缀
      collapsible: true, // 是否可折叠
      children: "structure", // 结构 
    },
  ],

  // 前端框架
  // CSS 框架
  "/css_framework/": [
    {
      text: "tailwind",
      link: "/css_framework/tailwind",
    },
  ],
  // JavaScript 框架
  "/javascript_framework/react/": [
    {
      text: "Next.js",
      prefix: "nextjs/",
      icon: "https://nextjs.org/favicon.ico",
      collapsible: true,
      children: [
        "starter",
        "guide",
        "templates",
        "tools",
      ],
    },
    {
      text: "Ant Design Pro",
      prefix: "antd/",
      icon: "https://pro.ant.design/favicon.png",
      collapsible: true,
      children: [
        "ant-design-pro",
        "ant-design-pro-env",
      ],
    },
    {
      text: "⚛️ 核心教程",
      collapsible: true,
      children: [
        {
          text: "入门指南",
          link: "/javascript_framework/react/starter"
        },
        {
          text: "常见问题",
          link: "/javascript_framework/react/problem"
        },
        {
          text: "Redux教程",
          link: "/javascript_framework/react/redux"
        }
      ]
    },
    {
      text: "🛠 工具生态",
      collapsible: true,
      children: [
        {
          text: "开发工具集",
          link: "/javascript_framework/react/tools"
        },
        {
          text: "dumi文档工具",
          link: "/javascript_framework/react/dumi"
        },
        {
          text: "Dva框架",
          link: "/javascript_framework/react/dvajs"
        }
      ]
    },
    {
      text: "🧩 组件与功能",
      collapsible: true,
      children: [
        {
          text: "全屏组件",
          link: "/javascript_framework/react/full-screen"
        },
        {
          text: "发布订阅",
          link: "/javascript_framework/react/pubsub"
        },
        {
          text: "Konva画布",
          link: "/javascript_framework/react/react-konva"
        },
        {
          text: "富文本编辑器",
          link: "/javascript_framework/react/react-quill"
        },
        {
          text: "WebSocket",
          link: "/javascript_framework/react/react-websocket"
        }
      ]
    }
  ],
  "/javascript_framework/js/": "structure",
  "/javascript_framework/vue/": "structure",
  // UI 框架
  "/ui_framework/": "structure",
  "/style_standard/": [
    {
      text: "css",
      prefix: "css/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "sass",
      prefix: "sass/",
      collapsible: true,
      children: "structure",
    },
  ],
  "/resource_tools/": [
    {
      text: "常用工具",
      collapsible: true,
      children: [
        "wordpress",
        "html2canvas",
        "icons",
        "fonts",
        "rimraf",
        "prompts"
      ],
    },
    {
      text: "打包工具",
      prefix: "build_tool/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "包管理器",
      prefix: "package_manage/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "开发工具",
      prefix: "develop_tools/",
      collapsible: true,
      children: "structure",
    },
  ]
});
