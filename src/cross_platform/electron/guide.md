---
title: 入门教程
category:
  - 跨平台框架
tag:
  - electron
---

# Electron入门教程

## 什么是Electron？

Electron是一个开源的跨平台桌面应用程序开发框架，它允许开发者使用JavaScript、HTML和CSS等前端技术来构建原生的桌面应用程序。通过Electron，你可以将Web应用程序打包成可在Windows、macOS和Linux上运行的桌面应用。

**官网地址：** [https://www.electronjs.org/](https://www.electronjs.org/)

## 核心概念

### 主进程与渲染进程
- **主进程 (Main Process)**: 负责管理应用程序的生命周期和创建渲染进程
- **渲染进程 (Renderer Process)**: 运行Web页面，每个BrowserWindow实例都运行在独立的渲染进程中

### 架构特点
- 基于Chromium和Node.js
- 主进程可以调用Node.js API
- 渲染进程运行Web页面，默认情况下无法直接访问Node.js API

## 快速开始

### 1. 环境准备
```bash
# 确保已安装Node.js (推荐12.0+版本)
node --version
npm --version
```

### 2. 初始化项目
```bash
# 创建项目目录
mkdir my-electron-app
cd my-electron-app

# 初始化npm项目
npm init -y

# 安装Electron
npm install electron --save-dev
```

### 3. 创建基本文件结构
```
my-electron-app/
├── package.json
├── main.js          # 主进程入口文件
├── index.html       # 应用界面
└── renderer.js      # 渲染进程脚本（可选）
```

### 4. 编写主进程代码 (main.js)
```javascript
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js') // 可选的预加载脚本
    }
  })

  // 加载应用的HTML文件
  mainWindow.loadFile('index.html')

  // 打开开发者工具（可选）
  // mainWindow.webContents.openDevTools()
}

// 当Electron完成初始化并准备创建浏览器窗口时调用此方法
app.whenReady().then(createWindow)

// 当所有窗口都关闭时退出应用 (macOS除外)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标且没有其他窗口打开时，重新创建窗口
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```

### 5. 创建界面文件 (index.html)
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>我的第一个Electron应用</title>
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline';">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      margin: 40px;
      color: #333;
    }
    h1 {
      color: #2196F3;
    }
    .info {
      background: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <h1>欢迎使用Electron！</h1>
  <div class="info">
    <p>🎉 恭喜！你已经成功创建了第一个Electron应用程序。</p>
    <p>Node.js 版本: <span id="node-version"></span></p>
    <p>Chromium 版本: <span id="chrome-version"></span></p>
    <p>Electron 版本: <span id="electron-version"></span></p>
  </div>

  <script>
    // 显示版本信息
    document.getElementById('node-version').innerText = process.versions.node
    document.getElementById('chrome-version').innerText = process.versions.chrome
    document.getElementById('electron-version').innerText = process.versions.electron
  </script>
</body>
</html>
```

### 6. 修改package.json
```json
{
  "name": "my-electron-app",
  "version": "1.0.0",
  "description": "我的第一个Electron应用",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["electron"],
  "author": "您的姓名",
  "license": "MIT",
  "devDependencies": {
    "electron": "^latest"
  }
}
```

### 7. 运行应用
```bash
npm start
```

## 常见开发问题解决方案

### 问题一：User-Agent和Referer伪造

在访问某些外部资源时，可能会遇到403错误，这通常是因为目标服务器检查了User-Agent或Referer。

**解决方案一：使用webRequest API拦截请求头（推荐）**

```javascript
const { app, session } = require('electron')

app.whenReady().then(() => {
  // 定义需要拦截的URL过滤器
  const filter = {
    urls: ["https://example.com/*", "http://*.target-site.com/*"]
  }

  // 拦截并修改请求头
  session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
    details.requestHeaders = {
      ...details.requestHeaders,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36',
      'Referer': 'https://www.google.com/'
    }
    
    console.log('修改后的请求头:', details.requestHeaders)
    callback({ requestHeaders: details.requestHeaders })
  })
})
```

**解决方案二：在loadURL时指定User-Agent**

```javascript
function createWindow() {
  const mainWindow = new BrowserWindow({ /* ... */ })
  
  // 加载URL时指定User-Agent和Referer
  mainWindow.loadURL('https://target-site.com', {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36',
    httpReferrer: 'https://www.google.com/'
  })
}
```

### 问题二：开启开发者工具(打开调试窗口)

**方法一：快捷键**
- Windows/Linux: `Ctrl + Shift + I`
- macOS: `Cmd + Option + I`

**方法二：程序控制**
```javascript
// 自动打开开发者工具
mainWindow.webContents.openDevTools()

// 或者创建菜单项
const { Menu } = require('electron')
const template = [
  {
    label: '开发',
    submenu: [
      {
        label: '切换开发者工具',
        accelerator: 'F12',
        click: () => {
          mainWindow.webContents.toggleDevTools()
        }
      }
    ]
  }
]
Menu.setApplicationMenu(Menu.buildFromTemplate(template))
```

### 问题三：绕过debugger调试中断

当网页包含`debugger`语句时，会强制中断调试，影响开发体验。

**解决方案一：开发者工具设置**
1. 打开开发者工具 (F12)
2. 点击"继续执行脚本"按钮
3. 右击"Sources"标签页中的"Pause on exceptions"按钮，选择"停用断点"

**解决方案二：右键跳过特定断点**
1. 在Sources面板中找到包含`debugger`的行
2. 右击行号
3. 选择"Never pause here"

**解决方案三：程序化禁用（在渲染进程中）**
```javascript
// 重写console.log方法来忽略debugger
if (process.env.NODE_ENV === 'development') {
  const originalLog = console.log
  console.log = function(...args) {
    if (!args.some(arg => typeof arg === 'string' && arg.includes('debugger'))) {
      originalLog.apply(console, args)
    }
  }
}
```

## 进阶功能

### 进程间通信 (IPC)

**主进程到渲染进程通信**
```javascript
// main.js
const { ipcMain } = require('electron')

ipcMain.handle('get-app-version', () => {
  return app.getVersion()
})

// renderer.js
const { ipcRenderer } = require('electron')

async function getAppVersion() {
  const version = await ipcRenderer.invoke('get-app-version')
  console.log('应用版本:', version)
}
```

### 原生菜单
```javascript
const { Menu } = require('electron')

const template = [
  {
    label: '文件',
    submenu: [
      {
        label: '新建',
        accelerator: 'CmdOrCtrl+N',
        click: () => {
          // 处理新建操作
        }
      },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```

### 系统托盘
```javascript
const { Tray, nativeImage } = require('electron')

let tray = null

app.whenReady().then(() => {
  const icon = nativeImage.createFromPath('path/to/icon.png')
  tray = new Tray(icon)
  
  const contextMenu = Menu.buildFromTemplate([
    { label: '显示窗口', click: () => mainWindow.show() },
    { label: '退出', click: () => app.quit() }
  ])
  
  tray.setContextMenu(contextMenu)
})
```

## 打包发布

### 使用electron-builder

```bash
# 安装electron-builder
npm install electron-builder --save-dev
```

**配置package.json**
```json
{
  "build": {
    "appId": "com.example.myapp",
    "productName": "我的应用",
    "directories": {
      "output": "dist"
    },
    "files": [
      "main.js",
      "index.html",
      "package.json"
    ],
    "win": {
      "target": "nsis",
      "icon": "icon.ico"
    },
    "mac": {
      "target": "dmg",
      "icon": "icon.icns"
    },
    "linux": {
      "target": "AppImage",
      "icon": "icon.png"
    }
  },
  "scripts": {
    "dist": "electron-builder",
    "dist:win": "electron-builder --win",
    "dist:mac": "electron-builder --mac",
    "dist:linux": "electron-builder --linux"
  }
}
```

**执行打包**
```bash
npm run dist
```

## 最佳实践

### 1. 安全性考虑
```javascript
// 推荐的安全配置
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,        // 禁用Node集成
    contextIsolation: true,        // 启用上下文隔离
    preload: path.join(__dirname, 'preload.js'), // 使用预加载脚本
    webSecurity: true              // 启用网络安全
  }
})
```

### 2. 预加载脚本 (preload.js)
```javascript
const { contextBridge, ipcRenderer } = require('electron')

// 安全地暴露API给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  onMenuClick: (callback) => ipcRenderer.on('menu-click', callback)
})
```

### 3. 错误处理
```javascript
// 全局错误处理
process.on('uncaughtException', (error) => {
  console.error('未捕获的异常:', error)
})

app.on('render-process-gone', (event, webContents, details) => {
  console.error('渲染进程崩溃:', details)
})
```

## 学习资源

- **官方文档**: [https://www.electronjs.org/docs](https://www.electronjs.org/docs)
- **示例项目**: [https://github.com/electron/electron-quick-start](https://github.com/electron/electron-quick-start)
- **API参考**: [https://www.electronjs.org/docs/api](https://www.electronjs.org/docs/api)

## 结语

Electron为前端开发者提供了一个强大的桌面应用开发平台。通过本教程，你应该已经掌握了Electron的基础概念和开发流程。随着实践的深入，你可以探索更多高级功能，如自动更新、原生模块集成等，构建出功能丰富的桌面应用程序。

记住，优秀的Electron应用不仅要功能完善，还要注重性能优化和用户体验。持续学习和实践是成为Electron开发专家的关键。
