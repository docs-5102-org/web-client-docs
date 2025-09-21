---
title: 将 Node.js 应用打包为可执行文件
category:
  - 包管理器
tag:
  - PKG
---

# PKG 指南：将 Node.js 应用打包为可执行文件

## 什么是 PKG？

PKG 是一个强大的命令行工具，可以将 Node.js 项目打包成可执行文件，支持 Windows、macOS 和 Linux 系统。无需在目标机器安装 Node.js 环境即可运行你的应用。

## 核心特性

- 🚀 **零依赖部署**：生成独立的可执行文件
- 🌐 **跨平台支持**：Windows (exe), Linux (可执行文件), macOS (可执行文件)
- 🔒 **代码保护**：源代码被编译为字节码
- ⚡ **快速启动**：比传统 Node.js 应用启动更快

## 安装 PKG

### 全局安装（推荐）
```bash
npm install -g pkg
```

### 项目内安装
```bash
npm install pkg --save-dev
```

## 基本使用方法

### 打包命令格式
```bash
pkg [入口文件] [选项]
```

### 常用打包示例

```bash
# 打包为 Windows exe 文件
pkg app.js -t win -o app.exe

# 打包为 Linux 可执行文件  
pkg app.js -t linux -o app

# 打包为 macOS 可执行文件
pkg app.js -t macos -o app

# 指定 Node.js 版本
pkg app.js -t node14-win-x64 -o app.exe

# 打包整个项目（自动识别 package.json 中的入口）
pkg .
```

## 目标平台配置

### 目标格式说明
```
-t, --targets 指定目标平台
格式: node{版本}-{平台}-{架构}

示例:
node14-win-x64    # Windows 64位, Node.js 14
node16-linux-x64  # Linux 64位, Node.js 16  
node18-macos-x64  # macOS 64位, Node.js 18
```

### 常用目标组合
```bash
# Windows
-t node18-win-x64
-t win-x64        # 简写形式

# Linux
-t node18-linux-x64  
-t linux-x64      # 简写形式

# macOS
-t node18-macos-x64
-t macos-x64      # 简写形式
```

## 配置文件设置

### package.json 配置示例
```json
{
  "name": "my-app",
  "version": "1.0.0",
  "bin": "app.js",
  "scripts": {
    "build:win": "pkg . -t win-x64 -o dist/my-app.exe",
    "build:linux": "pkg . -t linux-x64 -o dist/my-app",
    "build:mac": "pkg . -t macos-x64 -o dist/my-app",
    "build:all": "npm run build:win && npm run build:linux && npm run build:mac"
  },
  "pkg": {
    "assets": [
      "views/**/*",
      "public/**/*",
      "config/*.json"
    ],
    "targets": [
      "node18-win-x64",
      "node18-linux-x64"
    ]
  }
}
```

## 资源文件处理

### 静态资源打包
```json
{
  "pkg": {
    "assets": [
      "public/**/*",      # 所有 public 目录下的文件
      "views/**/*.ejs",   # 所有 EJS 模板文件
      "config/**/*.json", # 配置文件
      "locales/**/*"      # 本地化文件
    ]
  }
}
```

### 运行时资源访问
```javascript
// 正确访问资源文件的方式
const path = require('path');
const fs = require('fs');

// 获取资源文件路径
function getAssetPath(relativePath) {
  // 开发环境
  if (!process.pkg) {
    return path.join(__dirname, relativePath);
  }
  // 打包环境
  return path.join(process.cwd(), relativePath);
}

// 读取配置文件
const configPath = getAssetPath('config/app.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
```

## 高级配置

### 环境变量配置
```javascript
// 设置环境特定的配置
if (process.pkg) {
  // 打包环境配置
  process.env.NODE_ENV = 'production';
  process.env.APP_ROOT = process.cwd();
} else {
  // 开发环境配置
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
}
```

### 外部配置文件
创建 `pkg.config.js`：
```javascript
module.exports = {
  assets: ['views/**/*', 'public/**/*'],
  targets: ['node18-win-x64', 'node18-linux-x64'],
  outputPath: 'dist'
};
```

## 缓存管理

### 缓存目录位置
```
Windows: C:\Users\[用户名]\.pkg-cache
Linux/Mac: ~/.pkg-cache
```

### 手动管理缓存
```bash
# 查看缓存内容
ls ~/.pkg-cache

# 清理缓存
pkg --clean-cache

# 指定缓存目录
pkg app.js --cache-path ./my-cache
```

### 手动下载预编译二进制文件
如果网络问题无法自动下载，可以手动下载：

1. 访问 https://github.com/vercel/pkg-fetch/releases
2. 下载对应版本的文件（如 `fetched-v18.0.0-win-x64`）
3. 放置到缓存目录：`~/.pkg-cache/v3.4/`

## 实战示例

### Express 应用打包
```json
{
  "name": "express-app",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "build": "pkg . -t node18-win-x64,node18-linux-x64 -o dist/express-app"
  },
  "pkg": {
    "assets": [
      "views/**/*",
      "public/**/*",
      "package.json"
    ]
  }
}
```

### CLI 工具打包
```json
{
  "name": "my-cli",
  "version": "1.0.0",
  "bin": {
    "my-cli": "./cli.js"
  },
  "scripts": {
    "build": "pkg . -t node18-win-x64 -o dist/my-cli.exe"
  }
}
```

## 常见问题解决

### 1. 文件路径问题
```javascript
// 解决方案：使用动态路径检测
const isPacked = !!process.pkg;
const rootDir = isPacked ? process.cwd() : __dirname;
```

### 2. 原生模块支持
```bash
# 确保原生模块与目标 Node.js 版本兼容
npm rebuild --target=18.0.0 --arch=x64
```

### 3. 文件大小优化
```bash
# 使用压缩选项
pkg app.js --compress GZip -o app
```

### 4. 调试打包应用
```bash
# 启用调试模式
pkg app.js --debug -o app

# 运行时可查看详细日志
./app --debug
```

## 最佳实践

1. **测试所有平台**：在打包前测试所有目标平台
2. **处理路径正确**：使用动态路径处理资源文件
3. **管理依赖**：确保所有依赖都包含在 package.json 中
4. **版本控制**：将 pkg 配置加入版本控制
5. **持续集成**：在 CI/CD 流程中集成打包过程

## 自动化脚本示例

### build.js 自动化脚本
```javascript
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const platforms = [
  { name: 'windows', target: 'win-x64', ext: '.exe' },
  { name: 'linux', target: 'linux-x64', ext: '' },
  { name: 'macos', target: 'macos-x64', ext: '' }
];

console.log('开始打包...');

platforms.forEach(({ name, target, ext }) => {
  console.log(`打包 ${name} 平台...`);
  try {
    execSync(`pkg . -t ${target} -o dist/app-${name}${ext}`);
    console.log(`✅ ${name} 平台打包成功`);
  } catch (error) {
    console.error(`❌ ${name} 平台打包失败:`, error.message);
  }
});

console.log('打包完成！');
```

## 总结

PKG 是一个强大的 Node.js 应用打包工具，通过合理的配置和使用，可以：

- ✅ 生成跨平台的可执行文件
- ✅ 保护源代码安全
- ✅ 简化部署流程
- ✅ 减少环境依赖问题

建议在实际项目中使用前，充分测试各种场景，确保打包后的应用能够正常运行。