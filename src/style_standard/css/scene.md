---
title: 常见问题
category:
  - css
---

# CSS 使用常见问题

## 解决上面div背景色和下面div背景色之间的0.5px的间隙

中间会有一道白线，大概0.5px 换成背景图也会有，发现改下元素高度为偶数即可。

最终方案如下：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        .test {
            height: 100px;
            background-color: #FFA892;
        }
        .test2 {
            height: 100px;
            background-size: 100% 100%;
            background-color: #FFA892;

        }
    </style>
</head>

<body>
    <div class="test"></div>
    <div class="test2"></div>
</body>

</html>
```

## CSS文本省略号效果演示（单行、多行设置）

<iframe src="/html/ellipsis.html" width="100%" height="800"></iframe>

## flex 布局先关问题

### Flex 布局中固定列宽的方法

在使用 **Flex 布局** 时，如果想要某一栏保持固定宽度，很多人第一反应是直接用 `width`。
但其实还有一种更灵活、推荐的写法：

```css
flex: 0 0 200px;
```

这段代码的含义是：

* **第一个 0（flex-grow）**：不放大，不会随着容器变宽而拉伸
* **第二个 0（flex-shrink）**：不缩小，不会随着容器变窄而压缩
* **200px（flex-basis）**：初始宽度为 200px

这样就能实现一个**固定宽度 200px** 的列，而不会受 Flex 容器其他元素的影响。

💡 小技巧：
如果想让某栏固定宽度，而其他栏自动适配剩余空间，可以给其他栏设置：

```css
flex: 1;
```

这样就能轻松实现 **固定 + 自适应** 的经典两栏或多栏布局。

### 两栏布局示例（左侧固定宽度，右侧自适应）

```html
<div class="container">
  <div class="sidebar">左侧固定 200px</div>
  <div class="content">右侧自适应</div>
</div>
```

```css
.container {
  display: flex;
}

.sidebar {
  flex: 0 0 200px; /* 固定宽度 200px */
  background: #4a5568;
  color: #fff;
  padding: 16px;
}

.content {
  flex: 1; /* 占满剩余空间 */
  background: #edf2f7;
  padding: 16px;
}
```

效果：左侧宽度固定为 200px，右侧自动填充剩余空间。

### 利用flex布局横向滚动用CSS实现横向滚动条

<iframe src="/html/css_scroller.html" width="100%" height="800"></iframe>

参考：
* https://www.cnblogs.com/ranyonsue/p/13704453.html
* https://www.cnblogs.com/yuanjunjundebo/p/11828094.html

## CSS水平垂直居中的几种实现方式

[水平垂直居中的几种实现方式](./center.md)

## border边框影响布局的解决方案

[解决方案](https://mp.weixin.qq.com/s?__biz=MzI4MDQ5MTUzMg==&mid=2247496839&idx=2&sn=eff69a1f28d6fea5bb56e329b8d1023c&chksm=ebb517e4dcc29ef2bc1d84dad7e27067a6fbaefede76dc3fb8517cbdc06a3d04bf23d0d19544&token=1734660309&lang=zh_CN#rd)

## 如何制作平滑的“box-shadow”盒子阴影动画效果

http://www.htmleaf.com/ziliaoku/qianduanjiaocheng/animate-box-shadow.html

https://www.jianshu.com/p/afadf7e83949

## CSS几种常见的文字动态效果

https://blog.csdn.net/m0_67840539/article/details/130928211