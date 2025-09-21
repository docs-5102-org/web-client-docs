---
title: Gulp教程
category:
  - 工具集
tag:
  - Gulp
---


# Gulp教程

## 🌐 官网链接

[Gulp 官方网站](https://gulpjs.com/) ([Gulp][1])
[GitHub 仓库](https://github.com/gulpjs/gulp) ([GitHub][2])

---

## 📖 Gulp 是什么？

Gulp（全称 Gulp.js）是一个基于 Node.js 的前端构建工具 / 自动化工作流工具包（toolkit），用于简化和自动化 Web 开发中重复、耗时的任务。 ([维基百科][3])

主要特点包括：

* **使用代码优于配置**：你通过编写 JavaScript 文件（`gulpfile.js`）定义任务，而不是繁琐的配置文件。 ([Gulp][4])
* **流（stream）机制**：Gulp 利用 Node.js 的流（stream）处理文件，中间转换可以在内存中完成，而不需要把中间结果写入磁盘，从而速度快、效率高。 ([Gulp][1])
* **插件生态丰富**：Gulp 有大量插件，当你需要做文件压缩、合并、图片优化、Sass/LESS 编译、JavaScript 混淆等任务时，都可以找到对应插件。 ([维基百科][3])

---

## 🛠 快速使用 /基本流程

下面是一个简单的 Gulp 使用流程示例：

1. 安装 Gulp CLI 工具（全局）

```bash
npm install --global gulp-cli
```

2. 在项目中安装 Gulp 本身（devDependencies）

```bash
npm install --save-dev gulp
```

3. 创建 `gulpfile.js`，定义任务，例如：

```js
const { src, dest, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');

function compileSass() {
   return src('src/scss/**/*.scss')
      .pipe(sass())
      .pipe(cleanCSS())
      .pipe(dest('dist/css'));
}

function minJs() {
   return src('src/js/**/*.js')
      .pipe(uglify())
      .pipe(dest('dist/js'));
}

exports.default = series(compileSass, minJs);
```

4. 在项目根目录运行 `gulp` 或 `gulp default` 来执行默认任务。 ([Gulp][5])

---

## ⚠ 注意事项 /限制

* 虽然 Gulp 性能好、灵活，但对于非常大型项目或极端优化场景，有时可能比 Webpack 等打包工具 +其他构建工具整合方式稍微复杂。
* 有些现代前端框架（如 Vue、React 等）往往内置构建系统（例如使用 webpack / Vite），这些可能取代部分 Gulp 的作用。
* 插件兼容性要注意：有的旧插件可能不支持最新版本的 Node.js 或 Gulp 版本。

---

[1]: https://gulpjs.com/?utm_source=chatgpt.com "gulp.js"
[2]: https://github.com/gulpjs/gulp?utm_source=chatgpt.com "gulpjs/gulp: A toolkit to automate & enhance your workflow"
[3]: https://en.wikipedia.org/wiki/Gulp.js?utm_source=chatgpt.com "Gulp.js"
[4]: https://gulpjs.com/docs/en/getting-started/javascript-and-gulpfiles/?utm_source=chatgpt.com "JavaScript and Gulpfiles"
[5]: https://gulpjs.com/docs/en/getting-started/quick-start/?utm_source=chatgpt.com "Quick Start"
