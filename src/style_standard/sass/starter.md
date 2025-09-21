---
title: sass教程
category:
  - sass
---

# Sass 完整教程

## 目录
1. [什么是Sass](#什么是sass)
2. [安装和设置](#安装和设置)
3. [语法格式](#语法格式)
4. [变量](#变量)
5. [嵌套规则](#嵌套规则)
6. [混合器 (Mixins)](#混合器-mixins)
7. [继承](#继承)
8. [导入](#导入)
9. [函数](#函数)
10. [控制指令](#控制指令)
11. [高级特性](#高级特性)
12. [最佳实践](#最佳实践)
13. [sass与scss区别](#sass-与-scss区别)

## 什么是Sass

Sass（Syntactically Awesome Style Sheets）是CSS的预处理器，它扩展了CSS的功能，让样式表的编写更加高效和有组织性。

官网：https://www.sass.hk/

### 主要优势：
- **变量支持** - 定义和重用值
- **嵌套规则** - 更直观的层级结构
- **混合器** - 代码复用
- **继承** - 样式继承
- **函数和运算** - 动态计算
- **模块化** - 文件组织

## 安装和设置

### 1. 使用npm安装
```bash
npm install -g sass
```

### 2. 使用Yarn安装
```bash
yarn global add sass
```

### 3. 编译Sass文件
```bash
# 单次编译
sass input.scss output.css

# 监听模式
sass --watch input.scss:output.css

# 监听整个目录
sass --watch scss:css
```

### 4. 编译选项
```bash
# 压缩输出
sass --style=compressed input.scss output.css

# 保留源映射
sass --source-map input.scss output.css
```

## 语法格式

Sass支持两种语法格式：

### SCSS语法（推荐）
```scss
$primary-color: #3498db;

.header {
  background-color: $primary-color;
  
  h1 {
    color: white;
    font-size: 2rem;
  }
}
```

### Sass缩进语法
```sass
$primary-color: #3498db

.header
  background-color: $primary-color
  
  h1
    color: white
    font-size: 2rem
```

## 变量

### 基本用法
```scss
// 定义变量
$primary-color: #3498db;
$font-size: 16px;
$margin: 20px;

// 使用变量
.button {
  background-color: $primary-color;
  font-size: $font-size;
  margin: $margin;
}
```

### 变量作用域
```scss
$global-color: #333; // 全局变量

.component {
  $local-color: #666; // 局部变量
  color: $local-color;
  
  .nested {
    color: $global-color; // 可以访问全局变量
    // color: $local-color; // 也可以访问外层局部变量
  }
}
```

### 默认值
```scss
$primary-color: #3498db !default;

// 如果之前未定义，则使用默认值
$secondary-color: #e74c3c !default;
```

### 变量插值
```scss
$property: margin;
$side: top;

.box {
  #{$property}-#{$side}: 10px; // 输出：margin-top: 10px;
}
```

## 嵌套规则

### 基本嵌套
```scss
.navigation {
  background: #333;
  
  ul {
    margin: 0;
    padding: 0;
    
    li {
      list-style: none;
      
      a {
        color: white;
        text-decoration: none;
        
        &:hover {
          color: #ccc;
        }
      }
    }
  }
}
```

### 父选择器引用 (&)
```scss
.button {
  background: #3498db;
  color: white;
  
  // 伪类
  &:hover {
    background: #2980b9;
  }
  
  // 修饰符类
  &.large {
    font-size: 1.5rem;
  }
  
  // 子元素
  &__icon {
    margin-right: 5px;
  }
  
  // 前缀
  .no-js & {
    display: none;
  }
}
```

### 属性嵌套
```scss
.box {
  font: {
    family: Arial, sans-serif;
    size: 16px;
    weight: bold;
  }
  
  margin: {
    top: 10px;
    bottom: 20px;
  }
}
```

## 混合器 (Mixins)

### 定义和使用混合器
```scss
// 定义混合器
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  border-radius: $radius;
}

// 使用混合器
.button {
  @include border-radius(5px);
}
```

### 带默认参数的混合器
```scss
@mixin transition($property: all, $duration: 0.3s, $timing: ease) {
  -webkit-transition: $property $duration $timing;
  transition: $property $duration $timing;
}

.button {
  @include transition(); // 使用默认参数
  @include transition(background, 0.5s, ease-in-out); // 自定义参数
}
```

### 可变参数
```scss
@mixin box-shadow($shadows...) {
  -webkit-box-shadow: $shadows;
  box-shadow: $shadows;
}

.card {
  @include box-shadow(0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1));
}
```

### 内容块 (@content)
```scss
@mixin mobile {
  @media (max-width: 768px) {
    @content;
  }
}

.header {
  font-size: 2rem;
  
  @include mobile {
    font-size: 1.5rem;
  }
}
```

## 继承

### 基本继承
```scss
.message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  @extend .message;
  border-color: #4CAF50;
  background-color: #dff0d8;
}

.error {
  @extend .message;
  border-color: #f44336;
  background-color: #f2dede;
}
```

### 占位符选择器
```scss
// 占位符不会生成CSS，只能被继承
%button-base {
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  text-align: center;
}

.primary-button {
  @extend %button-base;
  background-color: #3498db;
  color: white;
}

.secondary-button {
  @extend %button-base;
  background-color: #95a5a6;
  color: white;
}
```

## 导入

### 基本导入
```scss
// _variables.scss
$primary-color: #3498db;
$font-size: 16px;

// _mixins.scss
@mixin center {
  display: flex;
  justify-content: center;
  align-items: center;
}

// main.scss
@import 'variables';
@import 'mixins';

.header {
  background-color: $primary-color;
  @include center;
}
```

### 部分文件 (Partials)
以下划线开头的文件是部分文件，不会单独编译：
```
scss/
  _variables.scss
  _mixins.scss
  _base.scss
  main.scss
```

### 模块系统 (@use)
```scss
// _variables.scss
$primary-color: #3498db !default;

// main.scss
@use 'variables' as vars;
@use 'variables'; // 使用默认命名空间

.header {
  background-color: vars.$primary-color;
  // 或者
  background-color: variables.$primary-color;
}
```

## 函数

### 内置函数
```scss
// 颜色函数
$base-color: #3498db;

.element {
  background-color: lighten($base-color, 20%);
  border-color: darken($base-color, 10%);
  color: complement($base-color);
}

// 数学函数
.box {
  width: percentage(5/8); // 62.5%
  margin: round(10.7px); // 11px
  padding: abs(-15px); // 15px
}

// 字符串函数
.element {
  content: quote(Hello World); // "Hello World"
  font-family: unquote("Arial Black"); // Arial Black
}
```

### 自定义函数
```scss
@function calculate-rem($size) {
  $rem-size: $size / 16px;
  @return $rem-size * 1rem;
}

@function power($base, $exponent) {
  $result: 1;
  @for $i from 1 through $exponent {
    $result: $result * $base;
  }
  @return $result;
}

.title {
  font-size: calculate-rem(24px); // 1.5rem
  line-height: power(1.2, 3); // 1.728
}
```

## 控制指令

### @if 条件判断
```scss
$theme: dark;

.header {
  @if $theme == dark {
    background-color: #333;
    color: white;
  } @else if $theme == light {
    background-color: #fff;
    color: #333;
  } @else {
    background-color: #ccc;
    color: #666;
  }
}
```

### @for 循环
```scss
// 从1到3
@for $i from 1 through 3 {
  .col-#{$i} {
    width: percentage($i / 12);
  }
}

// 从1到2（不包含3）
@for $i from 1 to 3 {
  .item-#{$i} {
    z-index: $i;
  }
}
```

### @each 遍历
```scss
// 遍历列表
$colors: red, green, blue;

@each $color in $colors {
  .text-#{$color} {
    color: $color;
  }
}

// 遍历映射
$breakpoints: (
  small: 480px,
  medium: 768px,
  large: 1024px
);

@each $name, $size in $breakpoints {
  @media (min-width: $size) {
    .hide-#{$name} {
      display: none;
    }
  }
}
```

### @while 循环
```scss
$i: 6;
@while $i > 0 {
  .item-#{$i} {
    width: 2em * $i;
  }
  $i: $i - 2;
}
```

## 高级特性

### 映射 (Maps)
```scss
$font-weights: (
  light: 300,
  normal: 400,
  bold: 700,
  extra-bold: 800
);

.title {
  font-weight: map-get($font-weights, bold); // 700
}

// 遍历映射
@each $name, $weight in $font-weights {
  .font-#{$name} {
    font-weight: $weight;
  }
}
```

### 列表操作
```scss
$fonts: Arial, Helvetica, sans-serif;
$margins: 10px 15px 20px 25px;

.element {
  font-family: nth($fonts, 1); // Arial
  margin-top: nth($margins, 1); // 10px
  font-count: length($fonts); // 3
}

// 添加到列表
$new-fonts: append($fonts, Georgia);
$joined-list: join($fonts, (Times, serif));
```

### 字符串插值
```scss
$prefix: 'app';
$property: 'margin';

.#{$prefix}-component {
  #{$property}-top: 10px;
  background-image: url('images/#{$prefix}-logo.png');
}
```

## 最佳实践

### 1. 文件组织结构
```
scss/
├── abstracts/
│   ├── _variables.scss
│   ├── _mixins.scss
│   └── _functions.scss
├── base/
│   ├── _reset.scss
│   ├── _typography.scss
│   └── _base.scss
├── components/
│   ├── _buttons.scss
│   ├── _forms.scss
│   └── _navigation.scss
├── layout/
│   ├── _header.scss
│   ├── _footer.scss
│   └── _grid.scss
├── pages/
│   ├── _home.scss
│   └── _about.scss
└── main.scss
```

### 2. 命名规范
```scss
// 使用BEM命名法
.block {
  &__element {
    // 元素样式
    
    &--modifier {
      // 修饰符样式
    }
  }
}

// 变量命名
$color-primary: #3498db;
$font-size-large: 1.5rem;
$breakpoint-mobile: 768px;
```

### 3. 性能优化
```scss
// 避免过深的嵌套（不超过3层）
.nav {
  ul {
    li {
      // 最多3层嵌套
    }
  }
}

// 合理使用继承
%clearfix {
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}
```

### 4. 响应式设计
```scss
// 定义断点
$breakpoints: (
  mobile: 480px,
  tablet: 768px,
  desktop: 1024px,
  wide: 1200px
);

@mixin respond-to($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (min-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  }
}

.container {
  width: 100%;
  
  @include respond-to(tablet) {
    max-width: 750px;
  }
  
  @include respond-to(desktop) {
    max-width: 970px;
  }
}
```

### 5. 代码注释
```scss
/**
 * 主要按钮组件
 * 用于表单提交和重要操作
 */
.btn-primary {
  // 基础样式
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  
  // 颜色和状态
  background-color: $color-primary;
  color: white;
  
  // 交互效果
  &:hover {
    background-color: darken($color-primary, 10%);
  }
}
```

## sass 与 scss区别 

| 特性       | Sass（缩进式语法）                                           | SCSS（CSS 拓展语法）                                                 |
| -------- | ----------------------------------------------------- | -------------------------------------------------------------- |
| **文件后缀** | `.sass`                                               | `.scss`                                                        |
| **语法风格** | 缩进表示层级，不需要 `{}` 和 `;`                                 | 与 CSS 一致，使用 `{}` 和 `;`                                         |
| **兼容性**  | 不兼容原生 CSS                                             | 完全兼容原生 CSS                                                     |
| **可读性**  | 简洁、代码量少，但缩进要求严格                                       | 更直观，CSS 程序员上手快                                                 |
| **学习成本** | 略高，需要适应缩进语法                                           | 较低，只需会 CSS 就能写                                                 |
| **流行度**  | 早期常用，现在逐渐被 SCSS 替代                                    | 主流选择，现代前端几乎都用 SCSS                                             |
| **示例**   | `sass<br>$primary: #333<br>body<br>  color: $primary` | `scss<br>$primary: #333;<br>body {<br>  color: $primary;<br>}` |


## 总结

Sass是一个强大的CSS预处理器，它通过变量、嵌套、混合器、继承等特性，让CSS的编写更加高效和可维护。掌握这些特性并遵循最佳实践，可以大大提高样式表的开发效率和代码质量。

开始使用Sass时，建议从基本的变量和嵌套开始，逐步学习更高级的特性。记住，好的代码组织和命名规范是成功使用Sass的关键。