---
title: Sass、LESS 和 Stylus 区别总结
category:
  - sass
---

# Sass、LESS 和 Stylus 区别总结

CSS 预处理器的出现极大地提升了样式表的开发效率和维护性。本文将详细对比三大主流预处理器：Sass、LESS 和 Stylus 的特点、优势和区别。

## 概述

### Sass (Syntactically Awesome Stylesheets)
- **官方网站**：[https://sass-lang.com/](https://sass-lang.com/)
- **GitHub**：[https://github.com/sass/sass](https://github.com/sass/sass)
- **诞生时间**：2006年
- **开发语言**：最初使用 Ruby，现在主要使用 Dart
- **语法风格**：支持两种语法（SCSS 和 Sass）
- **文件扩展名**：`.scss` 或 `.sass`

### LESS (Leaner Style Sheets)
- **官方网站**：[https://lesscss.org/](https://lesscss.org/)
- **GitHub**：[https://github.com/less/less.js](https://github.com/less/less.js)
- **诞生时间**：2009年
- **开发语言**：JavaScript
- **语法风格**：类似 CSS 的语法
- **文件扩展名**：`.less`

### Stylus
- **官方网站**：[https://stylus-lang.com/](https://stylus-lang.com/)
- **GitHub**：[https://github.com/stylus/stylus](https://github.com/stylus/stylus)
- **诞生时间**：2010年
- **开发语言**：JavaScript (Node.js)
- **语法风格**：极简灵活，支持多种写法
- **文件扩展名**：`.styl`

## 语法对比

### 1. 变量定义

**Sass/SCSS:**
```scss
// SCSS 语法
$primary-color: #3498db;
$font-size: 16px;

// Sass 语法
$primary-color: #3498db
$font-size: 16px
```

**LESS:**
```less
@primary-color: #3498db;
@font-size: 16px;
```

**Stylus:**
```stylus
primary-color = #3498db
font-size = 16px

// 也支持其他写法
primary-color := #3498db
$primary-color = #3498db
```

### 2. 嵌套规则

**Sass/SCSS:**
```scss
.navbar {
  background: $primary-color;
  
  ul {
    margin: 0;
    padding: 0;
  }
  
  li {
    list-style: none;
    
    &:hover {
      background: darken($primary-color, 10%);
    }
  }
}
```

**LESS:**
```less
.navbar {
  background: @primary-color;
  
  ul {
    margin: 0;
    padding: 0;
  }
  
  li {
    list-style: none;
    
    &:hover {
      background: darken(@primary-color, 10%);
    }
  }
}
```

**Stylus:**
```stylus
.navbar
  background: primary-color
  
  ul
    margin: 0
    padding: 0
  
  li
    list-style: none
    
    &:hover
      background: darken(primary-color, 10%)
```

### 3. 混入（Mixins）

**Sass/SCSS:**
```scss
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  border-radius: $radius;
}

.button {
  @include border-radius(5px);
}
```

**LESS:**
```less
.border-radius(@radius) {
  -webkit-border-radius: @radius;
  -moz-border-radius: @radius;
  border-radius: @radius;
}

.button {
  .border-radius(5px);
}
```

**Stylus:**
```stylus
border-radius(radius)
  -webkit-border-radius: radius
  -moz-border-radius: radius
  border-radius: radius

.button
  border-radius(5px)
```

## 功能特性对比

### 编译方式

| 预处理器 | 编译环境 | 编译速度 | 实时编译 |
|---------|---------|---------|---------|
| **Sass** | Ruby/Dart/Node.js | 快速 | 支持 |
| **LESS** | JavaScript/Node.js | 中等 | 支持（浏览器端） |
| **Stylus** | Node.js | 快速 | 支持 |

### 内置函数

**Sass** 拥有最丰富的内置函数库：
- 颜色函数：`lighten()`, `darken()`, `saturate()`, `desaturate()`
- 数学函数：`round()`, `ceil()`, `floor()`, `abs()`
- 字符串函数：`to-upper-case()`, `str-length()`
- 列表函数：`length()`, `nth()`, `join()`

**LESS** 提供基础但实用的函数：
- 颜色函数：`lighten()`, `darken()`, `saturate()`
- 数学函数：`round()`, `ceil()`, `floor()`
- 字符串函数：`e()`, `replace()`

**Stylus** 具有强大且灵活的函数系统：
- 内置函数丰富
- 支持 JavaScript 风格的函数定义
- 可以直接使用 JavaScript 代码

### 条件语句与循环

**Sass:**
```scss
@for $i from 1 through 3 {
  .item-#{$i} {
    width: 2em * $i;
  }
}

@if $theme == dark {
  background: black;
} @else {
  background: white;
}
```

**LESS:**
```less
.loop(@counter) when (@counter > 0) {
  .item-@{counter} {
    width: (2em * @counter);
  }
  .loop((@counter - 1));
}
.loop(3);

.theme(@color) when (@color = dark) {
  background: black;
}
.theme(@color) when (@color = light) {
  background: white;
}
```

**Stylus:**
```stylus
for i in 1..3
  .item-{i}
    width: (2em * i)

if theme == dark
  background: black
else
  background: white
```

## 生态系统与工具支持

### 社区与生态

**Sass:**
- 最活跃的社区
- 丰富的第三方库（Compass、Bourbon、Susy）
- 广泛的框架支持（Bootstrap 4+、Foundation）

**LESS:**
- 中等规模社区
- Bootstrap 3 的默认预处理器
- 工具支持良好

**Stylus:**
- 较小但专业的社区
- Express.js 生态系统集成良好
- 独特的语法风格吸引特定用户群

### 构建工具集成

| 构建工具 | Sass | LESS | Stylus |
|---------|------|------|--------|
| **Webpack** | ✅ 优秀 | ✅ 良好 | ✅ 良好 |
| **Gulp** | ✅ 优秀 | ✅ 良好 | ✅ 良好 |
| **Grunt** | ✅ 优秀 | ✅ 良好 | ✅ 良好 |
| **Vite** | ✅ 内置 | ✅ 内置 | ✅ 内置 |
| **Parcel** | ✅ 零配置 | ✅ 零配置 | ✅ 零配置 |

## 学习曲线与使用建议

### 学习难度

**从易到难排序：**
1. **LESS** - 最容易上手，语法最接近原生 CSS
2. **Sass/SCSS** - 功能强大但学习成本适中
3. **Stylus** - 最灵活但需要适应独特语法

### 适用场景建议

**选择 Sass 的情况：**
- 大型项目开发
- 需要丰富的内置函数
- 团队有一定的预处理器经验
- 使用 Bootstrap 4+ 或 Foundation

**选择 LESS 的情况：**
- 快速原型开发
- 团队成员主要是 CSS 开发者
- 使用 Bootstrap 3 或需要浏览器端编译
- 项目规模中小型

**选择 Stylus 的情况：**
- Node.js 技术栈项目
- 追求代码简洁性
- 需要高度自定义的语法风格
- 团队偏好 JavaScript 生态

## 性能对比

### 编译速度测试
（基于中等复杂度项目）

| 预处理器 | 编译时间 | 输出文件大小 | 内存占用 |
|---------|---------|-------------|---------|
| **Sass (Dart)** | 1.2s | 标准 | 中等 |
| **LESS** | 1.8s | 略大 | 较低 |
| **Stylus** | 1.0s | 最小 | 较低 |

### 生产环境表现

所有三种预处理器在生产环境中的表现都很优秀，最终编译的 CSS 文件在性能上几乎没有差异。关键在于：
- 合理的代码组织
- 适当的代码压缩
- 避免过度嵌套

## 未来发展趋势

### Sass
- Dart Sass 成为主要实现
- 持续的功能增强和性能优化
- 模块系统的完善

### LESS
- 稳定维护阶段
- 专注于兼容性和稳定性
- 逐步被 Sass 蚕食市场份额

### Stylus
- 社区规模相对较小
- 在特定领域保持优势
- 语法创新的先行者

## 相关资源链接

### 官方文档
- **Sass 官方文档**：[https://sass-lang.com/documentation](https://sass-lang.com/documentation)
- **LESS 官方文档**：[https://lesscss.org/features/](https://lesscss.org/features/)
- **Stylus 官方文档**：[https://stylus-lang.com/docs/](https://stylus-lang.com/docs/)

### 在线工具
- **Sass 在线编译器**：[https://www.sassmeister.com/](https://www.sassmeister.com/)
- **LESS 在线编译器**：[https://lesscss.org/less-preview/](https://lesscss.org/less-preview/)
- **CodePen CSS 预处理器支持**：[https://codepen.io/](https://codepen.io/)

### 学习资源
- **Sass 指南**：[https://sass-guidelin.es/](https://sass-guidelin.es/)
- **LESS 教程（MDN）**：[https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_preprocessor](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_preprocessor)
- https://blog.csdn.net/pedrojuliet/article/details/72887490
## 总结

### 快速选择指南

**如果你是新手：** 选择 LESS，学习成本最低
**如果你要做大项目：** 选择 Sass，功能最完善
**如果你追求极简：** 选择 Stylus，语法最灵活
**如果你用 Bootstrap：** 选择对应版本的预处理器

### 最终建议

在当前的前端开发环境中，**Sass (SCSS)** 是最推荐的选择，原因如下：

1. **生态系统最完善** - 工具支持、第三方库、社区资源
2. **功能最强大** - 内置函数、控制流、模块系统
3. **文档最完善** - 官方文档详细，学习资源丰富
4. **行业标准** - 大多数现代框架和工具链的默认选择

无论选择哪种预处理器，重要的是保持代码的可维护性和团队的一致性。预处理器只是工具，良好的 CSS 架构和编码规范才是项目成功的关键。