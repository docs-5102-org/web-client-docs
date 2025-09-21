---
title: tsx、ts-node教程以及使用区别
category:
  - 开发依赖
tag:
  - ts-node
  - tsx
---

# tsx、ts-node教程以及使用区别

## 🧰 ts-node

### ✅ 特点

* **类型检查**：默认执行完整的 TypeScript 类型检查，确保代码的类型安全。

* **兼容性**：支持 CommonJS 和 ESM 模块，**但在 ESM 模式下需要额外配置**，如在 `package.json` 中设置 `"type": "module"`，并在导入路径中包含文件扩展名。
* **配置依赖**：依赖 `tsconfig.json` 的配置，适合需要严格类型检查的项目。

### 🚀 使用场景

* 需要严格类型检查的项目。[Reddit+3Reddit+3Reddit+3](https://www.reddit.com/r/node/comments/16qnlhy/have_you_used_tsx_as_an_alternative_to_tsnode_to/?tl=zh-hans&utm_source=chatgpt.com)
* 使用 CommonJS 模块的传统项目。
* 对启动性能要求不高的开发环境。

* * *

## ⚡ tsx

### ✅ 特点

* **高性能**：基于 `esbuild` 构建，编译速度快，适合大型项目和频繁重启的开发服务器。[掘金+1掘金+1](https://juejin.cn/post/7446676531626000425?utm_source=chatgpt.com)
* **内置监听模式**：支持文件变更监听，自动重启服务，无需额外工具。[Reddit+1掘金+1](https://www.reddit.com/r/node/comments/16qnlhy/have_you_used_tsx_as_an_alternative_to_tsnode_to/?utm_source=chatgpt.com)
* **模块支持**：原生支持 ESM 和 CommonJS 模块，配置简单。
* **类型检查**：默认不执行类型检查，需依赖 IDE 或其他工具进行类型验证。[cn.x-cmd.com+2Reddit+2Reddit+2](https://www.reddit.com/r/node/comments/16qnlhy/have_you_used_tsx_as_an_alternative_to_tsnode_to/?tl=zh-hans&utm_source=chatgpt.com)

### 🚀 使用场景

* 对启动性能要求高的项目。
* 使用 ESM 模块的新项目。
* 需要快速迭代和热重载的开发环境。

## 📦 安装 `ts-node`

### ✅ 1. 安装 TypeScript 和 ts-node

**局部安装（推荐）**：

在项目目录中运行以下命令，将 `typescript` 和 `ts-node` 安装为开发依赖：

```bash
npm install --save-dev typescript ts-node
``` 

**全局安装**：

如果您希望在全局范围内使用 `ts-node`，可以运行：

```bash
npm install -g typescript ts-node
``` 

全局安装后，您可能需要将安装路径添加到系统的环境变量中，以便在命令行中直接使用 `ts-node` 命令。

### ✅ 2. 初始化 TypeScript 配置

在项目根目录下运行以下命令，生成 `tsconfig.json` 文件：

```bash
npx tsc --init
```

这将创建一个默认的 TypeScript 配置文件，您可以根据项目需求进行修改。

### ✅ 3. 运行 TypeScript 文件

使用 `ts-node` 直接运行 `.ts` 文件：

```bash
npx ts-node src/index.ts
```

## ⚡ 安装 `tsx`

### ✅ 1. 安装 tsx

**局部安装（推荐）**：

在项目目录中运行以下命令，将 `tsx` 安装为开发依赖：

```bash
npm install --save-dev tsx
```   

**全局安装**：

如果您希望在全局范围内使用 `tsx`，可以运行：

```bash
npm install --global tsx
```

### ✅ 2. 运行 TypeScript 文件

使用 `tsx` 直接运行 `.ts` 文件：

```bash
npx tsx src/index.ts
```

`tsx` 支持 ESM 模块和 TypeScript，无需额外配置，适合快速开发和原型设计。

* * *

## 📝 小贴士

* **使用 `npx`**：如果您不想全局安装 `ts-node` 或 `tsx`，可以使用 `npx` 临时运行它们，如上所示。
* **配置 `tsconfig.json`**：确保您的 `tsconfig.json` 文件正确配置，以满足项目需求。例如，设置合适的 `target` 和 `module` 选项。
* **模块类型**：如果您使用 ESM 模块，确保在 `package.json` 中设置 `"type": "module"`，并在导入本地模块时包含文件扩展名。

通过上述步骤，您可以根据项目需求选择合适的工具来运行 TypeScript 文件。如果您有其他问题或需要进一步的帮助，请随时提问！

## 对比总结

| 特性  | ts-node | tsx |
| --- | --- | --- |
| 类型检查 | ✅ 默认启用 | ❌ 默认关闭，需额外配置 |
| 编译性能 | ⏳ 较慢 | ⚡ 快速 |
| 模块支持 | ✅ 支持 CommonJS 和 ESM（需配置） | ✅ 原生支持 ESM 和 CommonJS |
| 文件监听 | ❌ 需配合其他工具 | ✅ 内置支持 |
| 使用复杂度 | ⚠️ 需配置 `tsconfig.json` | ✅ 开箱即用 |
| 适合场景 | 严格类型检查的项目 | 快速开发和原型设计 |

## 常见错误

### TypeError \[ERR\_UNKNOWN\_FILE\_EXTENSION\]: Unknown file extension ".ts"

#### 🧩 问题原因

当您的项目的 `package.json` 文件中包含 `"type": "module"` 时，Node.js 会将项目视为使用 ES 模块。这要求：

* 导入语句必须包含文件扩展名，例如：

      import { something } from './module.ts';
    

* 使用 `.ts` 文件时，Node.js 无法直接识别其类型，导致 `ts-node` 报错。

而 `tsx` 使用 `esbuild` 进行编译，内置支持 ESM，无需额外配置。

#### ✅ 解决方案

**方法一：使用 `ts-node` 的 ESM 模式**

在命令中添加 `--esm` 参数：

    npx ts-node --esm ./client.ts
    

或者在 `tsconfig.json` 中添加以下配置：[CSDN博客](https://blog.csdn.net/qq_34793381/article/details/136248419?utm_source=chatgpt.com)

    {
      "ts-node": {
        "esm": true
      }
    }
    

**方法二：移除 ESM 设置（有效）**

如果您不需要使用 ES 模块，可以从 `package.json` 中移除 `"type": "module"`，并确保 `tsconfig.json` 中的 `module` 设置为 `CommonJS`：

    {
      "compilerOptions": {
        "module": "CommonJS"
      }
    }
    

\*\*方法三：使用 `tsx`（有效） \*\*

由于 `tsx` 内置支持 ESM 和 TypeScript，您可以直接运行：

    npx tsx ./client.ts
    

这通常是最简单的解决方案，尤其是在使用 ES 模块的项目中。

* * *

## 📝 建议选择

* 如果您的项目需要严格的类型检查，且对启动性能要求不高，推荐使用 `ts-node`。
* 如果您追求快速的开发体验，使用 ESM 模块，且希望简化配置，推荐使用 `tsx`。

请根据您的项目需求选择合适的工具，以提升开发效率和代码质量。

%23%23%20%F0%9F%A7%B0%20ts-node%0A%0A%23%23%23%20%E2%9C%85%20%E7%89%B9%E7%82%B9%0A%0A-%20\*\*%E7%B1%BB%E5%9E%8B%E6%A3%80%E6%9F%A5\*\*%EF%BC%9A%E9%BB%98%E8%AE%A4%E6%89%A7%E8%A1%8C%E5%AE%8C%E6%95%B4%E7%9A%84%20TypeScript%20%E7%B1%BB%E5%9E%8B%E6%A3%80%E6%9F%A5%EF%BC%8C%E7%A1%AE%E4%BF%9D%E4%BB%A3%E7%A0%81%E7%9A%84%E7%B1%BB%E5%9E%8B%E5%AE%89%E5%85%A8%E3%80%82%0A-%20\*\*%E5%85%BC%E5%AE%B9%E6%80%A7\*\*%EF%BC%9A%E6%94%AF%E6%8C%81%20CommonJS%20%E5%92%8C%20ESM%20%E6%A8%A1%E5%9D%97%EF%BC%8C\*\*%E4%BD%86%E5%9C%A8%20ESM%20%E6%A8%A1%E5%BC%8F%E4%B8%8B%E9%9C%80%E8%A6%81%E9%A2%9D%E5%A4%96%E9%85%8D%E7%BD%AE\*\*%EF%BC%8C%E5%A6%82%E5%9C%A8%20%60package.json%60%20%E4%B8%AD%E8%AE%BE%E7%BD%AE%20%60%22type%22%3A%20%22module%22%60%EF%BC%8C%E5%B9%B6%E5%9C%A8%E5%AF%BC%E5%85%A5%E8%B7%AF%E5%BE%84%E4%B8%AD%E5%8C%85%E5%90%AB%E6%96%87%E4%BB%B6%E6%89%A9%E5%B1%95%E5%90%8D%E3%80%82%0A-%20\*\*%E9%85%8D%E7%BD%AE%E4%BE%9D%E8%B5%96\*\*%EF%BC%9A%E4%BE%9D%E8%B5%96%20%60tsconfig.json%60%20%E7%9A%84%E9%85%8D%E7%BD%AE%EF%BC%8C%E9%80%82%E5%90%88%E9%9C%80%E8%A6%81%E4%B8%A5%E6%A0%BC%E7%B1%BB%E5%9E%8B%E6%A3%80%E6%9F%A5%E7%9A%84%E9%A1%B9%E7%9B%AE%E3%80%82%0A%0A%23%23%23%20%F0%9F%9A%80%20%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF%0A%0A-%20%E9%9C%80%E8%A6%81%E4%B8%A5%E6%A0%BC%E7%B1%BB%E5%9E%8B%E6%A3%80%E6%9F%A5%E7%9A%84%E9%A1%B9%E7%9B%AE%E3%80%82%5BReddit%2B3Reddit%2B3Reddit%2B3%5D(https%3A%2F%2Fwww.reddit.com%2Fr%2Fnode%2Fcomments%2F16qnlhy%2Fhave\_you\_used\_tsx\_as\_an\_alternative\_to\_tsnode\_to%2F%3Ftl%3Dzh-hans%26utm\_source%3Dchatgpt.com)%0A-%20%E4%BD%BF%E7%94%A8%20CommonJS%20%E6%A8%A1%E5%9D%97%E7%9A%84%E4%BC%A0%E7%BB%9F%E9%A1%B9%E7%9B%AE%E3%80%82%0A-%20%E5%AF%B9%E5%90%AF%E5%8A%A8%E6%80%A7%E8%83%BD%E8%A6%81%E6%B1%82%E4%B8%8D%E9%AB%98%E7%9A%84%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83%E3%80%82%0A%0A------%0A%0A%23%23%20%E2%9A%A1%20tsx%0A%0A%23%23%23%20%E2%9C%85%20%E7%89%B9%E7%82%B9%0A%0A-%20\*\*%E9%AB%98%E6%80%A7%E8%83%BD\*\*%EF%BC%9A%E5%9F%BA%E4%BA%8E%20%60esbuild%60%20%E6%9E%84%E5%BB%BA%EF%BC%8C%E7%BC%96%E8%AF%91%E9%80%9F%E5%BA%A6%E5%BF%AB%EF%BC%8C%E9%80%82%E5%90%88%E5%A4%A7%E5%9E%8B%E9%A1%B9%E7%9B%AE%E5%92%8C%E9%A2%91%E7%B9%81%E9%87%8D%E5%90%AF%E7%9A%84%E5%BC%80%E5%8F%91%E6%9C%8D%E5%8A%A1%E5%99%A8%E3%80%82%5B%E6%8E%98%E9%87%91%2B1%E6%8E%98%E9%87%91%2B1%5D(https%3A%2F%2Fjuejin.cn%2Fpost%2F7446676531626000425%3Futm\_source%3Dchatgpt.com)%0A-%20\*\*%E5%86%85%E7%BD%AE%E7%9B%91%E5%90%AC%E6%A8%A1%E5%BC%8F\*\*%EF%BC%9A%E6%94%AF%E6%8C%81%E6%96%87%E4%BB%B6%E5%8F%98%E6%9B%B4%E7%9B%91%E5%90%AC%EF%BC%8C%E8%87%AA%E5%8A%A8%E9%87%8D%E5%90%AF%E6%9C%8D%E5%8A%A1%EF%BC%8C%E6%97%A0%E9%9C%80%E9%A2%9D%E5%A4%96%E5%B7%A5%E5%85%B7%E3%80%82%5BReddit%2B1%E6%8E%98%E9%87%91%2B1%5D(https%3A%2F%2Fwww.reddit.com%2Fr%2Fnode%2Fcomments%2F16qnlhy%2Fhave\_you\_used\_tsx\_as\_an\_alternative\_to\_tsnode\_to%2F%3Futm\_source%3Dchatgpt.com)%0A-%20\*\*%E6%A8%A1%E5%9D%97%E6%94%AF%E6%8C%81\*\*%EF%BC%9A%E5%8E%9F%E7%94%9F%E6%94%AF%E6%8C%81%20ESM%20%E5%92%8C%20CommonJS%20%E6%A8%A1%E5%9D%97%EF%BC%8C%E9%85%8D%E7%BD%AE%E7%AE%80%E5%8D%95%E3%80%82%0A-%20\*\*%E7%B1%BB%E5%9E%8B%E6%A3%80%E6%9F%A5\*\*%EF%BC%9A%E9%BB%98%E8%AE%A4%E4%B8%8D%E6%89%A7%E8%A1%8C%E7%B1%BB%E5%9E%8B%E6%A3%80%E6%9F%A5%EF%BC%8C%E9%9C%80%E4%BE%9D%E8%B5%96%20IDE%20%E6%88%96%E5%85%B6%E4%BB%96%E5%B7%A5%E5%85%B7%E8%BF%9B%E8%A1%8C%E7%B1%BB%E5%9E%8B%E9%AA%8C%E8%AF%81%E3%80%82%5Bcn.x-cmd.com%2B2Reddit%2B2Reddit%2B2%5D(https%3A%2F%2Fwww.reddit.com%2Fr%2Fnode%2Fcomments%2F16qnlhy%2Fhave\_you\_used\_tsx\_as\_an\_alternative\_to\_tsnode\_to%2F%3Ftl%3Dzh-hans%26utm\_source%3Dchatgpt.com)%0A%0A%23%23%23%20%F0%9F%9A%80%20%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF%0A%0A-%20%E5%AF%B9%E5%90%AF%E5%8A%A8%E6%80%A7%E8%83%BD%E8%A6%81%E6%B1%82%E9%AB%98%E7%9A%84%E9%A1%B9%E7%9B%AE%E3%80%82%0A-%20%E4%BD%BF%E7%94%A8%20ESM%20%E6%A8%A1%E5%9D%97%E7%9A%84%E6%96%B0%E9%A1%B9%E7%9B%AE%E3%80%82%0A-%20%E9%9C%80%E8%A6%81%E5%BF%AB%E9%80%9F%E8%BF%AD%E4%BB%A3%E5%92%8C%E7%83%AD%E9%87%8D%E8%BD%BD%E7%9A%84%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83%E3%80%82%0A%0A%0A%0A%23%23%20%F0%9F%93%A6%20%E5%AE%89%E8%A3%85%20%60ts-node%60%0A%0A%23%23%23%20%E2%9C%85%201.%20%E5%AE%89%E8%A3%85%20TypeScript%20%E5%92%8C%20ts-node%0A%0A\*\*%E5%B1%80%E9%83%A8%E5%AE%89%E8%A3%85%EF%BC%88%E6%8E%A8%E8%8D%90%EF%BC%89\*\*%EF%BC%9A%0A%0A%E5%9C%A8%E9%A1%B9%E7%9B%AE%E7%9B%AE%E5%BD%95%E4%B8%AD%E8%BF%90%E8%A1%8C%E4%BB%A5%E4%B8%8B%E5%91%BD%E4%BB%A4%EF%BC%8C%E5%B0%86%20%60typescript%60%20%E5%92%8C%20%60ts-node%60%20%E5%AE%89%E8%A3%85%E4%B8%BA%E5%BC%80%E5%8F%91%E4%BE%9D%E8%B5%96%EF%BC%9A%0A%0A%60%60%60bash%0Anpm%20install%20--save-dev%20typescript%20ts-node%0A%60%60%60%0A%0A\*\*%E5%85%A8%E5%B1%80%E5%AE%89%E8%A3%85\*\*%EF%BC%9A%0A%0A%E5%A6%82%E6%9E%9C%E6%82%A8%E5%B8%8C%E6%9C%9B%E5%9C%A8%E5%85%A8%E5%B1%80%E8%8C%83%E5%9B%B4%E5%86%85%E4%BD%BF%E7%94%A8%20%60ts-node%60%EF%BC%8C%E5%8F%AF%E4%BB%A5%E8%BF%90%E8%A1%8C%EF%BC%9A%0A%0A%60%60%60bash%0Anpm%20install%20-g%20typescript%20ts-node%0A%60%60%60%0A%0A%E5%85%A8%E5%B1%80%E5%AE%89%E8%A3%85%E5%90%8E%EF%BC%8C%E6%82%A8%E5%8F%AF%E8%83%BD%E9%9C%80%E8%A6%81%E5%B0%86%E5%AE%89%E8%A3%85%E8%B7%AF%E5%BE%84%E6%B7%BB%E5%8A%A0%E5%88%B0%E7%B3%BB%E7%BB%9F%E7%9A%84%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F%E4%B8%AD%EF%BC%8C%E4%BB%A5%E4%BE%BF%E5%9C%A8%E5%91%BD%E4%BB%A4%E8%A1%8C%E4%B8%AD%E7%9B%B4%E6%8E%A5%E4%BD%BF%E7%94%A8%20%60ts-node%60%20%E5%91%BD%E4%BB%A4%E3%80%82%0A%0A%23%23%23%20%E2%9C%85%202.%20%E5%88%9D%E5%A7%8B%E5%8C%96%20TypeScript%20%E9%85%8D%E7%BD%AE%0A%0A%E5%9C%A8%E9%A1%B9%E7%9B%AE%E6%A0%B9%E7%9B%AE%E5%BD%95%E4%B8%8B%E8%BF%90%E8%A1%8C%E4%BB%A5%E4%B8%8B%E5%91%BD%E4%BB%A4%EF%BC%8C%E7%94%9F%E6%88%90%20%60tsconfig.json%60%20%E6%96%87%E4%BB%B6%EF%BC%9A%0A%0A%60%60%60bash%0Anpx%20tsc%20--init%0A%60%60%60%0A%0A%E8%BF%99%E5%B0%86%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E9%BB%98%E8%AE%A4%E7%9A%84%20TypeScript%20%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%60tsconfig.ts%60%EF%BC%8C%E6%82%A8%E5%8F%AF%E4%BB%A5%E6%A0%B9%E6%8D%AE%E9%A1%B9%E7%9B%AE%E9%9C%80%E6%B1%82%E8%BF%9B%E8%A1%8C%E4%BF%AE%E6%94%B9%E3%80%82%0A%0A%60%60%60%0A%7B%0A%20%20%22compilerOptions%22%3A%20%7B%0A%20%20%20%20%22target%22%3A%20%22esnext%22%2C%0A%20%20%20%20%22module%22%3A%20%22commonjs%22%2C%20%3C!--%20%E8%8B%A5%E9%9C%80%E6%94%AF%E6%8C%81ESM%EF%BC%8C%E5%8F%AF%E6%94%B9%E4%B8%BA%20%22esnext%22%20%E5%B9%B6%E5%8F%82%E8%80%83%E6%96%87%E6%A1%A3%20--%3E%0A%20%20%20%20%22outDir%22%3A%20%22.%2Fdist%22%2C%20%3C!--%20%E8%BE%93%E5%87%BA%E7%9B%AE%E5%BD%95%EF%BC%8C%E6%8C%89%E9%9C%80%E8%AE%BE%E7%BD%AE%20--%3E%0A%20%20%20%20%22sourceMap%22%3A%20true%2C%0A%20%20%20%20%22esModuleInterop%22%3A%20true%0A%20%20%7D%2C%0A%20%20%22include%22%3A%20%5B%22src%2F\*\*%2F\*%22%5D%2C%20%3C!--%20%E6%8C%87%E5%AE%9A%E8%A6%81%E7%BC%96%E8%AF%91%E7%9A%84%E6%96%87%E4%BB%B6%E5%A4%B9%20--%3E%0A%20%20%22exclude%22%3A%20%5B%22node\_modules%22%5D%2C%20%3C!--%20%E6%8E%92%E9%99%A4%E4%B8%8D%E9%9C%80%E8%A6%81%E7%BC%96%E8%AF%91%E7%9A%84%E7%9B%AE%E5%BD%95%20--%3E%0A%20%20%22ts-node%22%3A%20%7B%20%3C!--%20%E5%8F%AF%E9%80%89%EF%BC%8C%E7%9B%B4%E6%8E%A5%E5%9C%A8%E8%BF%99%E9%87%8C%E9%85%8D%E7%BD%AEts-node%E8%A1%8C%E4%B8%BA%20--%3E%0A%20%20%20%20%22transpileOnly%22%3A%20true%0A%20%20%7D%0A%7D%0A%60%60%60%0A%0A%23%23%23%20%E2%9C%85%203.%20%E8%BF%90%E8%A1%8C%20TypeScript%20%E6%96%87%E4%BB%B6%0A%0A%E4%BD%BF%E7%94%A8%20%60ts-node%60%20%E7%9B%B4%E6%8E%A5%E8%BF%90%E8%A1%8C%20%60.ts%60%20%E6%96%87%E4%BB%B6%EF%BC%9A%0A%0A%60%60%60bash%0Anpx%20ts-node%20src%2Findex.ts%0A%60%60%60%0A%0A%0A%0A%23%23%20%E2%9A%A1%20%E5%AE%89%E8%A3%85%20%60tsx%60%0A%0A%23%23%23%20%E2%9C%85%201.%20%E5%AE%89%E8%A3%85%20tsx%0A%0A\*\*%E5%B1%80%E9%83%A8%E5%AE%89%E8%A3%85%EF%BC%88%E6%8E%A8%E8%8D%90%EF%BC%89\*\*%EF%BC%9A%0A%0A%E5%9C%A8%E9%A1%B9%E7%9B%AE%E7%9B%AE%E5%BD%95%E4%B8%AD%E8%BF%90%E8%A1%8C%E4%BB%A5%E4%B8%8B%E5%91%BD%E4%BB%A4%EF%BC%8C%E5%B0%86%20%60tsx%60%20%E5%AE%89%E8%A3%85%E4%B8%BA%E5%BC%80%E5%8F%91%E4%BE%9D%E8%B5%96%EF%BC%9A%0A%0A%60%60%60bash%0Anpm%20install%20--save-dev%20tsx%0A%60%60%60%0A%0A\*\*%E5%85%A8%E5%B1%80%E5%AE%89%E8%A3%85\*\*%EF%BC%9A%0A%0A%E5%A6%82%E6%9E%9C%E6%82%A8%E5%B8%8C%E6%9C%9B%E5%9C%A8%E5%85%A8%E5%B1%80%E8%8C%83%E5%9B%B4%E5%86%85%E4%BD%BF%E7%94%A8%20%60tsx%60%EF%BC%8C%E5%8F%AF%E4%BB%A5%E8%BF%90%E8%A1%8C%EF%BC%9A%0A%0A%60%60%60tsx%0Anpm%20install%20--global%20tsx%0A%60%60%60%0A%0A%0A%0A%23%23%23%20%E2%9C%85%202.%20%E8%BF%90%E8%A1%8C%20TypeScript%20%E6%96%87%E4%BB%B6%0A%0A%E4%BD%BF%E7%94%A8%20%60tsx%60%20%E7%9B%B4%E6%8E%A5%E8%BF%90%E8%A1%8C%20%60.ts%60%20%E6%96%87%E4%BB%B6%EF%BC%9A%0A%0A%60%60%60tsx%0Anpx%20tsx%20src%2Findex.ts%0A%60%60%60%0A%0A%0A%0A%60tsx%60%20%E6%94%AF%E6%8C%81%20ESM%20%E6%A8%A1%E5%9D%97%E5%92%8C%20TypeScript%EF%BC%8C%E6%97%A0%E9%9C%80%E9%A2%9D%E5%A4%96%E9%85%8D%E7%BD%AE%EF%BC%8C%E9%80%82%E5%90%88%E5%BF%AB%E9%80%9F%E5%BC%80%E5%8F%91%E5%92%8C%E5%8E%9F%E5%9E%8B%E8%AE%BE%E8%AE%A1%E3%80%82%0A%0A------%0A%0A%23%23%20%F0%9F%93%9D%20%E5%B0%8F%E8%B4%B4%E5%A3%AB%0A%0A-%20\*\*%E4%BD%BF%E7%94%A8%20%60npx%60\*\*%EF%BC%9A%E5%A6%82%E6%9E%9C%E6%82%A8%E4%B8%8D%E6%83%B3%E5%85%A8%E5%B1%80%E5%AE%89%E8%A3%85%20%60ts-node%60%20%E6%88%96%20%60tsx%60%EF%BC%8C%E5%8F%AF%E4%BB%A5%E4%BD%BF%E7%94%A8%20%60npx%60%20%E4%B8%B4%E6%97%B6%E8%BF%90%E8%A1%8C%E5%AE%83%E4%BB%AC%EF%BC%8C%E5%A6%82%E4%B8%8A%E6%89%80%E7%A4%BA%E3%80%82%0A-%20\*\*%E9%85%8D%E7%BD%AE%20%60tsconfig.json%60\*\*%EF%BC%9A%E7%A1%AE%E4%BF%9D%E6%82%A8%E7%9A%84%20%60tsconfig.json%60%20%E6%96%87%E4%BB%B6%E6%AD%A3%E7%A1%AE%E9%85%8D%E7%BD%AE%EF%BC%8C%E4%BB%A5%E6%BB%A1%E8%B6%B3%E9%A1%B9%E7%9B%AE%E9%9C%80%E6%B1%82%E3%80%82%E4%BE%8B%E5%A6%82%EF%BC%8C%E8%AE%BE%E7%BD%AE%E5%90%88%E9%80%82%E7%9A%84%20%60target%60%20%E5%92%8C%20%60module%60%20%E9%80%89%E9%A1%B9%E3%80%82%0A-%20\*\*%E6%A8%A1%E5%9D%97%E7%B1%BB%E5%9E%8B\*\*%EF%BC%9A%E5%A6%82%E6%9E%9C%E6%82%A8%E4%BD%BF%E7%94%A8%20ESM%20%E6%A8%A1%E5%9D%97%EF%BC%8C%E7%A1%AE%E4%BF%9D%E5%9C%A8%20%60package.json%60%20%E4%B8%AD%E8%AE%BE%E7%BD%AE%20%60%22type%22%3A%20%22module%22%60%EF%BC%8C%E5%B9%B6%E5%9C%A8%E5%AF%BC%E5%85%A5%E6%9C%AC%E5%9C%B0%E6%A8%A1%E5%9D%97%E6%97%B6%E5%8C%85%E5%90%AB%E6%96%87%E4%BB%B6%E6%89%A9%E5%B1%95%E5%90%8D%E3%80%82%0A%0A%E9%80%9A%E8%BF%87%E4%B8%8A%E8%BF%B0%E6%AD%A5%E9%AA%A4%EF%BC%8C%E6%82%A8%E5%8F%AF%E4%BB%A5%E6%A0%B9%E6%8D%AE%E9%A1%B9%E7%9B%AE%E9%9C%80%E6%B1%82%E9%80%89%E6%8B%A9%E5%90%88%E9%80%82%E7%9A%84%E5%B7%A5%E5%85%B7%E6%9D%A5%E8%BF%90%E8%A1%8C%20TypeScript%20%E6%96%87%E4%BB%B6%E3%80%82%E5%A6%82%E6%9E%9C%E6%82%A8%E6%9C%89%E5%85%B6%E4%BB%96%E9%97%AE%E9%A2%98%E6%88%96%E9%9C%80%E8%A6%81%E8%BF%9B%E4%B8%80%E6%AD%A5%E7%9A%84%E5%B8%AE%E5%8A%A9%EF%BC%8C%E8%AF%B7%E9%9A%8F%E6%97%B6%E6%8F%90%E9%97%AE%EF%BC%81%0A%0A%0A%0A%23%23%20%20%E5%AF%B9%E6%AF%94%E6%80%BB%E7%BB%93%0A%0A%7C%20%E7%89%B9%E6%80%A7%20%20%20%20%20%20%20%7C%20ts-node%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%20tsx%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%0A%7C%20----------%20%7C%20--------------------------------%20%7C%20--------------------------%20%7C%0A%7C%20%E7%B1%BB%E5%9E%8B%E6%A3%80%E6%9F%A5%20%20%20%7C%20%E2%9C%85%20%E9%BB%98%E8%AE%A4%E5%90%AF%E7%94%A8%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%20%E2%9D%8C%20%E9%BB%98%E8%AE%A4%E5%85%B3%E9%97%AD%EF%BC%8C%E9%9C%80%E9%A2%9D%E5%A4%96%E9%85%8D%E7%BD%AE%20%20%20%20%20%7C%0A%7C%20%E7%BC%96%E8%AF%91%E6%80%A7%E8%83%BD%20%20%20%7C%20%E2%8F%B3%20%E8%BE%83%E6%85%A2%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%20%E2%9A%A1%20%E5%BF%AB%E9%80%9F%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%0A%7C%20%E6%A8%A1%E5%9D%97%E6%94%AF%E6%8C%81%20%20%20%7C%20%E2%9C%85%20%E6%94%AF%E6%8C%81%20CommonJS%20%E5%92%8C%20ESM%EF%BC%88%E9%9C%80%E9%85%8D%E7%BD%AE%EF%BC%89%20%7C%20%E2%9C%85%20%E5%8E%9F%E7%94%9F%E6%94%AF%E6%8C%81%20ESM%20%E5%92%8C%20CommonJS%20%7C%0A%7C%20%E6%96%87%E4%BB%B6%E7%9B%91%E5%90%AC%20%20%20%7C%20%E2%9D%8C%20%E9%9C%80%E9%85%8D%E5%90%88%E5%85%B6%E4%BB%96%E5%B7%A5%E5%85%B7%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%20%E2%9C%85%20%E5%86%85%E7%BD%AE%E6%94%AF%E6%8C%81%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%0A%7C%20%E4%BD%BF%E7%94%A8%E5%A4%8D%E6%9D%82%E5%BA%A6%20%7C%20%E2%9A%A0%EF%B8%8F%20%E9%9C%80%E9%85%8D%E7%BD%AE%20%60tsconfig.json%60%20%20%20%20%20%20%20%20%20%7C%20%E2%9C%85%20%E5%BC%80%E7%AE%B1%E5%8D%B3%E7%94%A8%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%0A%7C%20%E9%80%82%E5%90%88%E5%9C%BA%E6%99%AF%20%20%20%7C%20%E4%B8%A5%E6%A0%BC%E7%B1%BB%E5%9E%8B%E6%A3%80%E6%9F%A5%E7%9A%84%E9%A1%B9%E7%9B%AE%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%20%E5%BF%AB%E9%80%9F%E5%BC%80%E5%8F%91%E5%92%8C%E5%8E%9F%E5%9E%8B%E8%AE%BE%E8%AE%A1%20%20%20%20%20%20%20%20%20%7C%0A%0A%0A%23%23%20%E5%B8%B8%E8%A7%81%E9%94%99%E8%AF%AF%0A%0A%23%23%23%20TypeError%20%5BERR\_UNKNOWN\_FILE\_EXTENSION%5D%3A%20Unknown%20file%20extension%20%22.ts%22%0A%0A%23%23%23%23%20%F0%9F%A7%A9%20%E9%97%AE%E9%A2%98%E5%8E%9F%E5%9B%A0%0A%0A%E5%BD%93%E6%82%A8%E7%9A%84%E9%A1%B9%E7%9B%AE%E7%9A%84%20%60package.json%60%20%E6%96%87%E4%BB%B6%E4%B8%AD%E5%8C%85%E5%90%AB%20%60%22type%22%3A%20%22module%22%60%20%E6%97%B6%EF%BC%8CNode.js%20%E4%BC%9A%E5%B0%86%E9%A1%B9%E7%9B%AE%E8%A7%86%E4%B8%BA%E4%BD%BF%E7%94%A8%20ES%20%E6%A8%A1%E5%9D%97%E3%80%82%E8%BF%99%E8%A6%81%E6%B1%82%EF%BC%9A%0A%0A-%20%E5%AF%BC%E5%85%A5%E8%AF%AD%E5%8F%A5%E5%BF%85%E9%A1%BB%E5%8C%85%E5%90%AB%E6%96%87%E4%BB%B6%E6%89%A9%E5%B1%95%E5%90%8D%EF%BC%8C%E4%BE%8B%E5%A6%82%EF%BC%9A%0A%0A%60%60%60ts%0A%20%20import%20%7B%20something%20%7D%20from%20'.%2Fmodule.ts'%3B%0A%60%60%60%0A%0A-%20%E4%BD%BF%E7%94%A8%20%60.ts%60%20%E6%96%87%E4%BB%B6%E6%97%B6%EF%BC%8CNode.js%20%E9%BB%98%E8%AE%A4%E6%97%A0%E6%B3%95%E7%9B%B4%E6%8E%A5%E8%AF%86%E5%88%AB%E5%85%B6%E7%B1%BB%E5%9E%8B%EF%BC%8C%E5%AF%BC%E8%87%B4%20%60ts-node%60%20%E6%8A%A5%E9%94%99%E3%80%82%0A%0A%E8%80%8C%20%60tsx%60%20%E4%BD%BF%E7%94%A8%20%60esbuild%60%20%E8%BF%9B%E8%A1%8C%E7%BC%96%E8%AF%91%EF%BC%8C%E5%86%85%E7%BD%AE%E6%94%AF%E6%8C%81%20ESM%EF%BC%8C%E6%97%A0%E9%9C%80%E9%A2%9D%E5%A4%96%E9%85%8D%E7%BD%AE%E3%80%82%0A%0A%0A%23%23%23%23%20%E2%9C%85%20%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88%0A%0A\*\*%E6%96%B9%E6%B3%95%E4%B8%80%EF%BC%9A%E4%BD%BF%E7%94%A8%20%60ts-node%60%20%E7%9A%84%20ESM%20%E6%A8%A1%E5%BC%8F\*\*%0A%0A1.%E5%9C%A8%E5%91%BD%E4%BB%A4%E4%B8%AD%E6%B7%BB%E5%8A%A0%20%60--esm%60%20%E5%8F%82%E6%95%B0%EF%BC%9A%0A%0A%60%60%60bash%0Anpx%20ts-node%20--esm%20.%2Fclient.ts%0A%60%60%60%0A%E6%88%96%E8%80%85%E5%9C%A8%20%60tsconfig.json%60%20%E4%B8%AD%E6%B7%BB%E5%8A%A0%E4%BB%A5%E4%B8%8B%E9%85%8D%E7%BD%AE%EF%BC%9A%5BCSDN%E5%8D%9A%E5%AE%A2%5D(https%3A%2F%2Fblog.csdn.net%2Fqq\_34793381%2Farticle%2Fdetails%2F136248419%3Futm\_source%3Dchatgpt.com)%0A%0A%60%60%60json%0A%7B%0A%20%20%22ts-node%22%3A%20%7B%0A%20%20%20%20%22esm%22%3A%20true%0A%20%20%7D%0A%7D%0A%60%60%60%0A2.%E5%A6%82%E6%9E%9C%E4%B8%8A%E9%9D%A2%E5%91%BD%E4%BB%A4%E5%8F%82%E6%95%B0%E6%97%A0%E6%95%88%E6%9E%9C%EF%BC%8C%E5%9C%A8%20Node.js%20%E4%B8%AD%EF%BC%8C%E6%82%A8%E5%8F%AF%E4%BB%A5%E9%80%9A%E8%BF%87%20--loader%20%E5%8F%82%E6%95%B0%E6%8C%87%E5%AE%9A%E4%BD%BF%E7%94%A8%20ts-node%20%E7%9A%84%20ESM%20%E5%8A%A0%E8%BD%BD%E5%99%A8%E6%9D%A5%E8%BF%90%E8%A1%8C%20TypeScript%20%E6%96%87%E4%BB%B6%EF%BC%9A%0A%0A%60%60%60%0Anode%20--loader%20ts-node%2Fesm%20demo.ts%0A%60%60%60%0A%0A%3E%20%E8%BF%99%E7%A7%8D%E6%96%B9%E5%BC%8F%E9%80%82%E7%94%A8%E4%BA%8E%E9%9C%80%E8%A6%81%E5%8E%9F%E7%94%9F%20ESM%20%E6%94%AF%E6%8C%81%E7%9A%84%E9%A1%B9%E7%9B%AE%EF%BC%8C%E7%89%B9%E5%88%AB%E6%98%AF%E5%BD%93%20package.json%20%E4%B8%AD%E8%AE%BE%E7%BD%AE%E4%BA%86%20%22type%22%3A%20%22module%22%20%E6%97%B6%E3%80%82%0A%0A%0A%0A\*\*%E6%96%B9%E6%B3%95%E4%BA%8C%EF%BC%9A%E7%A7%BB%E9%99%A4%20ESM%20%E8%AE%BE%E7%BD%AE%EF%BC%88%E6%9C%89%E6%95%88%EF%BC%89\*\*%0A%0A%E5%A6%82%E6%9E%9C%E6%82%A8%E4%B8%8D%E9%9C%80%E8%A6%81%E4%BD%BF%E7%94%A8%20ES%20%E6%A8%A1%E5%9D%97%EF%BC%8C%E5%8F%AF%E4%BB%A5%E4%BB%8E%20%60package.json%60%20%E4%B8%AD%E7%A7%BB%E9%99%A4%20%60%22type%22%3A%20%22module%22%60%EF%BC%8C%E5%B9%B6%E7%A1%AE%E4%BF%9D%20%60tsconfig.json%60%20%E4%B8%AD%E7%9A%84%20%60module%60%20%E8%AE%BE%E7%BD%AE%E4%B8%BA%20%60CommonJS%60%EF%BC%9A%0A%0A%60%60%60json%0A%7B%0A%20%20%22compilerOptions%22%3A%20%7B%0A%20%20%20%20%22module%22%3A%20%22CommonJS%22%0A%20%20%7D%0A%7D%0A%60%60%60%0A%0A%0A\*\*%E6%96%B9%E6%B3%95%E4%B8%89%EF%BC%9A%E4%BD%BF%E7%94%A8%20%60tsx%60%EF%BC%88%E6%9C%89%E6%95%88%EF%BC%89%20\*\*%0A%0A%E7%94%B1%E4%BA%8E%20%60tsx%60%20%E5%86%85%E7%BD%AE%E6%94%AF%E6%8C%81%20ESM%20%E5%92%8C%20TypeScript%EF%BC%8C%E6%82%A8%E5%8F%AF%E4%BB%A5%E7%9B%B4%E6%8E%A5%E8%BF%90%E8%A1%8C%EF%BC%9A%0A%0A%60%60%60bash%0Anpx%20tsx%20.%2Fclient.ts%0A%60%60%60%0A%0A%0A%0A%E8%BF%99%E9%80%9A%E5%B8%B8%E6%98%AF%E6%9C%80%E7%AE%80%E5%8D%95%E7%9A%84%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88%EF%BC%8C%E5%B0%A4%E5%85%B6%E6%98%AF%E5%9C%A8%E4%BD%BF%E7%94%A8%20ES%20%E6%A8%A1%E5%9D%97%E7%9A%84%E9%A1%B9%E7%9B%AE%E4%B8%AD%E3%80%82%0A%0A%0A%0A%0A------%0A%0A%23%23%20%F0%9F%93%9D%20%E5%BB%BA%E8%AE%AE%E9%80%89%E6%8B%A9%0A%0A-%20%E5%A6%82%E6%9E%9C%E6%82%A8%E7%9A%84%E9%A1%B9%E7%9B%AE%E9%9C%80%E8%A6%81%E4%B8%A5%E6%A0%BC%E7%9A%84%E7%B1%BB%E5%9E%8B%E6%A3%80%E6%9F%A5%EF%BC%8C%E4%B8%94%E5%AF%B9%E5%90%AF%E5%8A%A8%E6%80%A7%E8%83%BD%E8%A6%81%E6%B1%82%E4%B8%8D%E9%AB%98%EF%BC%8C%E6%8E%A8%E8%8D%90%E4%BD%BF%E7%94%A8%20%60ts-node%60%E3%80%82%0A-%20%E5%A6%82%E6%9E%9C%E6%82%A8%E8%BF%BD%E6%B1%82%E5%BF%AB%E9%80%9F%E7%9A%84%E5%BC%80%E5%8F%91%E4%BD%93%E9%AA%8C%EF%BC%8C%E4%BD%BF%E7%94%A8%20ESM%20%E6%A8%A1%E5%9D%97%EF%BC%8C%E4%B8%94%E5%B8%8C%E6%9C%9B%E7%AE%80%E5%8C%96%E9%85%8D%E7%BD%AE%EF%BC%8C%E6%8E%A8%E8%8D%90%E4%BD%BF%E7%94%A8%20%60tsx%60%E3%80%82%0A%0A%E8%AF%B7%E6%A0%B9%E6%8D%AE%E6%82%A8%E7%9A%84%E9%A1%B9%E7%9B%AE%E9%9C%80%E6%B1%82%E9%80%89%E6%8B%A9%E5%90%88%E9%80%82%E7%9A%84%E5%B7%A5%E5%85%B7%EF%BC%8C%E4%BB%A5%E6%8F%90%E5%8D%87%E5%BC%80%E5%8F%91%E6%95%88%E7%8E%87%E5%92%8C%E4%BB%A3%E7%A0%81%E8%B4%A8%E9%87%8F%E3%80%82
