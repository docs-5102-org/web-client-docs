---
title: CommonJS vs ESM
category:
  - 包管理器
tag:
  - NodeJS
---

# CommonJS和ESM区别

在 JavaScript 和 Node.js 中，模块化是组织代码的重要方式。两种主要的模块系统是 **CommonJS（CJS）** 和 **ECMAScript 模块（ESM）**。它们在语法、加载方式、使用场景等方面存在显著差异。

------

### 1. 语法差异

#### **CommonJS（CJS）**

- **导入模块**：使用 `require` 函数。

```javascript
const moduleName = require('module');
```
- **导出模块**：通过 `module.exports` 或 `exports` 对象。

```javascript
module.exports = {
    functionName: function() { /* code */ }
};

```

#### **ECMAScript 模块（ESM）**

- **导入模块**：使用 `import` 语法。

```javascript
import { functionName } from 'module';
```

- **导出模块**：使用 `export` 语法。

```javascript
export function functionName() { /* code */ }
```

------
  
### 2. 加载方式

#### **CommonJS**
同步加载模块，适用于服务器端的文件系统操作。[阿里云开发者社区-云计算社区-阿里云+3Tianhe Gao | 高天贺+3GitHub+3](https://tianheg.co/posts/js-commonjs-vs-es-modules-node-js/?utm_source=chatgpt.com)

#### **ESM**

异步加载模块，支持浏览器和现代 Node.js 环境。[SegmentFault+3Tianhe Gao | 高天贺+3阿里云开发者社区-云计算社区-阿里云+3](https://tianheg.co/posts/js-commonjs-vs-es-modules-node-js/?utm_source=chatgpt.com)

------

### 3. 使用场景

#### **CommonJS**

- 主要用于 Node.js 环境，特别是在文件系统操作和服务器端开发中。
- 由于其同步加载特性，适合需要阻塞执行的场景。[SegmentFault+4阿里云开发者社区-云计算社区-阿里云+4Tianhe Gao | 高天贺+4](https://developer.aliyun.com/article/1195517?utm_source=chatgpt.com)

#### **ESM**

- 广泛应用于浏览器端开发，支持静态分析和优化。[阿里云开发者社区-云计算社区-阿里云](https://developer.aliyun.com/article/1534010?utm_source=chatgpt.com)
- 在 Node.js 中，ESM 的支持从版本 13.2 开始引入，需要在 `package.json` 中设置 `"type": "module"`。[GitHub+1King Mui+1](https://github.com/HXWfromDJTU/blog/issues/6?utm_source=chatgpt.com)

------

### 4. `package.json` 配置

#### **CommonJS**

- 默认情况下，Node.js 将 `.js` 文件视为 CommonJS 模块。无需在 `package.json` 中进行特殊配置。

#### **ESM**

- 在 `package.json` 中添加 `"type": "module"`，使 Node.js 将 `.js` 文件视为 ESM 模块。

```json
{
    "type": "module"
}
```
- 如果需要同时支持 CommonJS 和 ESM，可以使用 `.cjs` 和 `.mjs` 后缀分别表示，他们不受type设置的影响

------

### 5. 其他差异

- **模块缓存**：

  - CommonJS 模块在首次加载后会缓存，后续引用直接使用缓存。[SegmentFault](https://segmentfault.com/a/1190000041396029?utm_source=chatgpt.com)

  - ESM 模块在每次导入时都会执行，但导出的值是引用类型。
- **顶层 `await`**：

  - ESM 模块支持在顶层使用 `await`，而 CommonJS 模块需要将异步代码包装在函数中。[阿里云开发者社区-云计算社区-阿里云](https://developer.aliyun.com/article/1534010?utm_source=chatgpt.com)

### 6. 总结对比


| 特性                    | CommonJS（CJS）                | ECMAScript 模块（ESM）                          |
| --------------------- | ---------------------------- | ------------------------------------------- |
| **语法**                | `require` / `module.exports` | `import` / `export`                         |
| **加载方式**              | 同步加载                         | 异步加载                                        |
| **使用场景**              | Node.js 服务器端开发，文件系统操作        | 浏览器端开发，现代 Node.js 开发（需配置）                   |
| **`package.json` 配置** | 默认，无需配置；可使用 `.cjs` 后缀        | 设置 `"type": "module"`；使用 `.mjs` 后缀表示 ESM 模块 |
| **模块缓存**              | 加载一次后缓存，后续引用使用缓存             | 每次导入时执行，导出的值为引用类型                           |
| **顶层 `await`**        | 不支持顶层 `await`，需在异步函数中使用      | 支持顶层 `await`，方便编写异步初始化代码                    |
  

------

  

了解 CommonJS 和 ESM 的区别有助于在不同的开发环境和项目需求中做出适当的选择。