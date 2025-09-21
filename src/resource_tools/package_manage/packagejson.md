---
title: package.json配置指南
category:
  - 包管理器
tag:
  - package.json
---

# package.json配置指南

package.json 是 Node.js 项目的核心配置文件，它包含了项目的元数据、依赖管理、脚本命令等重要信息。本文将详细介绍 package.json 的各个字段及其使用方法。

## 什么是 package.json？

package.json 是一个 JSON 格式的文件，位于 Node.js 项目的根目录中。它主要用来：
- 定义项目的基本信息和依赖
- 指定项目运行的脚本命令
- 管理模块的版本、许可证和作者等信息
- 控制包的分发和发布

## 创建 package.json

可以通过以下命令快速创建 package.json 文件：

```bash
# 使用 npm 初始化项目，会提示输入相关信息
npm init

# 快速创建，使用默认值
npm init -y
```

执行后会生成一个包含基本信息的 package.json 文件。

## 基本字段说明

### 必需字段

```json
{
  "name": "your-project-name",
  "version": "1.0.0"
}
```

- **name**: 项目名称，必须是小写字母、数字和连字符(-)的组合，不能有空格
- **version**: 项目版本号，遵循语义化版本规范 (major.minor.patch)

### 描述信息字段

```json
{
  "description": "项目的描述信息",
  "keywords": ["关键词1", "关键词2", "关键词3"],
  "author": "作者名 <邮箱> (网址)",
  "contributors": ["贡献者1", "贡献者2"],
  "license": "MIT",
  "homepage": "https://your-project-homepage.com",
  "repository": {
    "type": "git",
    "url": "https://github.com/username/repository.git"
  },
  "bugs": {
    "url": "https://github.com/username/repository/issues"
  }
}
```

## 依赖管理

package.json 中的依赖分为几种类型：

### 生产环境依赖 (dependencies)

```json
{
  "dependencies": {
    "lodash": "^4.17.21",
    "react": "17.0.2"
  }
}
```

这些是项目运行所必需的包，通过以下命令安装：

```bash
npm install package-name --save
# 或简写
npm i package-name
```

### 开发环境依赖 (devDependencies)

```json
{
  "devDependencies": {
    "webpack": "^5.70.0",
    "eslint": "^8.12.0"
  }
}
```

这些是开发过程中需要的工具包，不会随项目发布，通过以下命令安装：

```bash
npm install package-name --save-dev
# 或简写
npm i package-name -D
```

### 对等依赖 (peerDependencies)

```json
{
  "peerDependencies": {
    "react": ">=16.8.0"
  }
}
```

表示你的包需要宿主环境提供这些依赖，常用于插件开发。

### 可选依赖 (optionalDependencies)

```json
{
  "optionalDependencies": {
    "fsevents": "^2.3.2"
  }
}
```

这些依赖即使安装失败也不会导致 npm 安装过程失败。

### 捆绑依赖 (bundledDependencies)

```json
{
  "bundledDependencies": ["package1", "package2"]
}
```

发布包时会将这些依赖一起打包。

## 版本管理

npm 使用语义化版本控制（SemVer），版本号格式为 `major.minor.patch`：

- **major**: 主版本号，做了不兼容的 API 修改
- **minor**: 次版本号，做了向下兼容的功能性新增
- **patch**: 修订号，做了向下兼容的问题修正

版本号前可以添加前缀来指定版本范围：

| 前缀     | 含义                             | 示例            |
|----------|----------------------------------|-----------------|
| `^`      | 兼容某个版本，更新到最新 minor 版本 | `^1.2.3` → `1.x.x` |
| `~`      | 只更新补丁版本                   | `~1.2.3` → `1.2.x` |
| 无前缀   | 精确版本                         | `1.2.3` → `1.2.3` |
| `>`      | 大于某个版本                     | `>1.2.3`         |
| `>=`     | 大于等于某个版本                 | `>=1.2.3`        |
| `<`      | 小于某个版本                     | `<1.2.3`         |
| `<=`     | 小于等于某个版本                 | `<=1.2.3`        |
| `*`      | 最新版本                         | `*`              |
| `-`      | 版本范围                         | `1.2.3 - 2.3.4`  |
| `||`     | 多个版本范围                     | `^1.2.3 || ^2.0.0` |

## 脚本命令 (scripts)

scripts 字段允许你定义可以通过 `npm run` 执行的脚本命令：

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "build": "webpack --mode production",
    "lint": "eslint src/**/*.js",
    "prepublishOnly": "npm test && npm run lint"
  }
}
```

常用内置脚本命令：

- `npm start`: 启动应用
- `npm test`: 运行测试
- `npm run dev`: 运行开发环境（自定义命令）

生命周期脚本（钩子）：
- `prepublish`: 在包发布前运行
- `prepare`: 在包发布前和本地 npm install 时运行
- `prepublishOnly`: 只在包发布前运行
- `prepack`: 在打包前运行
- `postpack`: 在打包后运行

## 配置相关字段

```json
{
  "config": {
    "port": 8080,
    "api_url": "https://api.example.com"
  },
  "engines": {
    "node": ">=14.0.0",
    "npm": ">=6.0.0"
  },
  "os": ["darwin", "linux"],
  "cpu": ["x64", "ia32"],
  "private": true,
  "publishConfig": {
    "registry": "https://registry.npmjs.org/"
  }
}
```

- **config**: 设置用于脚本使用的配置参数
- **engines**: 指定项目运行的 Node.js 和 npm 版本
- **os/cpu**: 限制包运行的操作系统和 CPU 架构
- **private**: 设置为 true 可防止意外发布到 npm
- **publishConfig**: 发布时的配置选项

## 入口点

```json
{
  "main": "lib/index.js",
  "browser": "browser/index.js",
  "module": "esm/index.js",
  "bin": {
    "my-cli": "./bin/cli.js"
  }
}
```

- **main**: 指定包的入口文件（CommonJS 模块）
- **browser**: 浏览器环境下的入口文件
- **module**: ES6 模块的入口文件
- **bin**: 可执行文件，安装包时会链接到全局或本地 node_modules/.bin 目录

## 文件相关

```json
{
  "files": [
    "lib/",
    "bin/",
    "README.md"
  ],
  "directories": {
    "lib": "src",
    "bin": "bin",
    "man": "man",
    "doc": "doc",
    "example": "examples"
  }
}
```

- **files**: 指定包含在发布包中的文件和目录
- **directories**: 指示包目录结构的提示信息

## 最佳实践

1. **使用明确的版本号**：在生产环境中避免使用 `*`、`^` 或 `~`，使用精确版本或锁定文件 (package-lock.json)
2. **合理分类依赖**：区分 dependencies 和 devDependencies
3. **利用脚本命令**：自动化常见任务
4. **设置 engines 字段**：明确项目支持的 Node.js 版本
5. **使用 files 字段**：控制发布包的大小，只包含必要文件
6. **保持更新**：定期使用 `npm outdated` 和 `npm update` 检查并更新依赖

## 常用命令总结

```bash
# 安装依赖
npm install
npm install package-name
npm install package-name --save-dev

# 更新依赖
npm update
npm update package-name

# 查看过时依赖
npm outdated

# 运行脚本
npm run script-name
npm test
npm start

# 安全审计
npm audit
npm audit fix
```

## 参考资料

* 官网文档：http://caibaojian.com/npm/files/package.json.html
* 第三方文档
  * https://blog.csdn.net/Heartbroken_man/article/details/123236879
  * https://blog.csdn.net/Lyrelion/article/details/120776755

## 总结

package.json 是 Node.js 开发中不可或缺的配置文件，合理使用它可以提高开发效率、确保项目的一致性和可维护性。掌握 package.json 的各个字段含义和使用方法，对于任何 Node.js 开发者来说都是必备技能。

通过本文的介绍，你应该对 package.json 有了全面的了解。在实际开发中，建议多查阅 http://caibaojian.com/npm/files/package.json.html 以获取最新信息和详细说明。