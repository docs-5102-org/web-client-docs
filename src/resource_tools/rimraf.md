---
title: Rimraf
category:
  - 资源库
---

## Rimraf 工具介绍

**Rimraf** 是一个强大的 Node.js 模块，用于在 Node.js 环境中快速删除文件和文件夹。它的名字来源于 UNIX 命令 `rm -rf`，其中 `rm` 表示删除，`-rf` 表示递归删除文件夹和其内容。

### 工作原理

Rimraf 通过递归遍历目标文件夹，删除所有文件和子文件夹。当遇到一个文件夹时，它会先遍历并删除该文件夹的所有内容，然后再删除文件夹本身。该工具使用异步 API 进行操作，不会阻塞 Node.js 的事件循环，因此在处理大型文件系统结构时能保持高性能。

### 安装方式

**全局安装：**
```bash
npm install rimraf -g
```

**项目依赖安装：**
```bash
npm install rimraf --save-dev
```

### 使用方法

**在 Node.js 脚本中：**
```javascript
var rimraf = require('rimraf');
rimraf('/path/to/directory', function (err) {
  if (err) throw err;
});
```

**在 npm 脚本中（package.json）：**
```json
{
  "scripts": {
    "clean": "rimraf dist"
  }
}
```

### 典型应用场景

Rimraf 在删除大型文件夹（如 `node_modules`）时特别有用，因为传统的文件系统 API 删除这些包含大量子文件夹和文件的目录可能会非常慢。

**快速删除示例：**
- 全局安装后：`rimraf node_modules`
- 项目依赖安装后：`npx rimraf node_modules`

### 注意事项

- ⚠️ Rimraf 会递归删除指定的文件、文件夹及其所有内容，使用时需谨慎，避免误删重要文件
- 建议始终提供回调函数来处理可能出现的错误

---

**官方链接：**
- **npm 官网**: https://www.npmjs.com/package/rimraf
- **GitHub 仓库**: https://github.com/isaacs/rimraf