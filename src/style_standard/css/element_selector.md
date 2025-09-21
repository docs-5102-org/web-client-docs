---
title: 元素选择器
category:
  - css
---

# CSS 元素选择器教程

CSS选择器是CSS的核心概念，用于选择HTML文档中的元素并为其应用样式。本教程将重点介绍几种常用的元素选择器。

## 官方参考文档

- [W3School CSS 选择器](https://www.w3school.com.cn/css/css_selector_type.asp)
- [菜鸟教程 CSS 选择器参考手册](https://www.runoob.com/cssref/css-selectors.html)

## 兄弟选择器类型

### 1. 通用兄弟选择器 (~)

通用兄弟选择器使用波浪号 `~` 符号，用于选择指定元素后面的所有兄弟元素。

**语法：**
```css
element1 ~ element2 {
    /* 样式规则 */
}
```

**示例：**
```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>兄弟选择器</title>
    <style type="text/css">
        h1~p{
            color:red;
        }
    </style>
</head>
<body>
    <p>Hello word!</p>
    <p>Hello word!</p>
    <h1>Hello word!</h1>
    <p>Hello word!</p>
    <p>Hello word!</p>
    <p>Hello word!</p>
    <p>Hello word!</p>
</body>
</html>
```

**效果说明：**
- 只有 `<h1>` 元素后面的所有 `<p>` 元素会变成红色
- `<h1>` 前面的 `<p>` 元素不受影响

### 2. 相邻兄弟选择器 (+)

相邻兄弟选择器使用加号 `+` 符号，用于选择紧跟在指定元素后面的第一个兄弟元素。

**语法：**
```css
element1 + element2 {
    /* 样式规则 */
}
```

**示例：**
```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>相邻兄弟选择器</title>
    <style type="text/css">
        h1+p{
            color:red;
        }
    </style>
</head>
<body>
    <p>Hello word!</p>
    <p>Hello word!</p>
    <h1>Hello word!</h1>
    <p>Hello word!</p>
    <p>Hello word!</p>
    <p>Hello word!</p>
    <p>Hello word!</p>
</body>
</html>
```

**效果说明：**
- 只有紧跟在 `<h1>` 后面的第一个 `<p>` 元素会变成红色
- 其他的 `<p>` 元素不受影响

### 3. 类选择器结合兄弟选择器

您还可以将类选择器与兄弟选择器结合使用，实现更精确的选择。

**示例：**
```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>获取同级元素所有元素</title>
    <style type="text/css">
        .first~tr{
            color:red;
        }
    </style>
</head>
<body>
<table>
    <tr class="first"><td>第一行</td></tr>
    <tr><td>第二行</td></tr>
    <tr><td>第三行</td></tr>
    <tr><td>第四行</td></tr>
    <tr><td>第五行</td></tr>
</table>
</body>
</html>
```

**效果说明：**
- 所有在 `.first` 类元素后面的 `<tr>` 元素都会变成红色
- 具有 `.first` 类的元素本身不受影响

## 选择器对比

| 选择器 | 符号 | 作用范围 | 选择对象 |
|--------|------|----------|----------|
| 通用兄弟选择器 | `~` | 所有后续兄弟元素 | 指定元素后面的所有匹配兄弟元素 |
| 相邻兄弟选择器 | `+` | 紧邻的兄弟元素 | 指定元素后面紧邻的第一个匹配兄弟元素 |

## 实用技巧

1. **兄弟选择器的层级关系**：兄弟选择器只在同一父元素下的兄弟元素间起作用
2. **选择顺序**：兄弟选择器只能选择后面的元素，不能选择前面的元素
3. **组合使用**：可以与其他选择器（如类选择器、ID选择器）组合使用

## 浏览器支持

现代浏览器都完全支持这些兄弟选择器，包括：
- Chrome
- Firefox
- Safari
- Edge
- IE9+

## 总结

兄弟选择器是CSS中非常实用的选择器，能够帮助我们精确地选择DOM结构中的特定元素。通过合理使用通用兄弟选择器(`~`)和相邻兄弟选择器(`+`)，可以实现复杂的样式布局效果，提高CSS代码的灵活性和可维护性。