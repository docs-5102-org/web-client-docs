---
title: 自定义滚动条
category:
  - css
---

# CSS3 自定义滚动条样式教程

## 前言

在现代Web开发中，自定义滚动条已成为提升用户体验的重要手段。通过CSS3的`::-webkit-scrollbar`伪元素，我们可以为支持Webkit内核的浏览器（如Chrome、Safari、Edge等）创建美观的自定义滚动条样式。

本教程将详细介绍如何使用`-webkit-scrollbar`来自定义滚动条样式，适用于拥有`overflow`属性的区域、列表框、下拉菜单、textarea等元素。

## 浏览器兼容性

⚠️ **注意**：目前兼容所有浏览器的滚动条样式方案并不存在。`-webkit-scrollbar`主要支持：
- Chrome
- Safari  
- 新版Edge（基于Chromium）
- 其他基于Webkit/Blink内核的浏览器

Firefox使用不同的CSS属性来自定义滚动条。

## 滚动条组成部分

在开始自定义之前，我们需要了解滚动条的各个组成部分：

| 伪元素 | 描述 |
|--------|------|
| `::-webkit-scrollbar` | 滚动条整体部分 |
| `::-webkit-scrollbar-thumb` | 滚动条里面的小方块，能向上向下移动（或往左往右移动） |
| `::-webkit-scrollbar-track` | 滚动条的轨道（里面装有Thumb） |
| `::-webkit-scrollbar-button` | 滚动条轨道两端的按钮，允许通过点击微调小方块的位置 |
| `::-webkit-scrollbar-track-piece` | 内层轨道，滚动条中间部分 |
| `::-webkit-scrollbar-corner` | 边角，即两个滚动条的交汇处 |
| `::-webkit-resizer` | 两个滚动条交汇处上用于拖动调整元素大小的小控件 |

## 基础用法

### 基本滚动条样式

下面是一个基本的自定义滚动条样式：

```css
/* 定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸 */
::-webkit-scrollbar {
    width: 16px;
    height: 16px;
    background-color: #F5F5F5;
}

/* 定义滚动条轨道 内阴影+圆角 */
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
}

/* 定义滑块 内阴影+圆角 */
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
}
```

## 实战案例

### 案例一：简约风格滚动条

创建一个简洁的深色滚动条：

```html
<div class="scrollable-content">
    <div class="content">
        <!-- 这里放置内容，高度超过容器以产生滚动条 -->
        <p>这里是很长的内容...</p>
    </div>
</div>
```

```css
.scrollable-content {
    width: 300px;
    height: 200px;
    overflow: auto;
    border: 1px solid #ccc;
    padding: 10px;
}

.content {
    height: 400px; /* 超过容器高度以产生滚动 */
}

/* 自定义滚动条样式 */
.scrollable-content::-webkit-scrollbar {
    /* 滚动条整体样式 */
    width: 10px; /* 高宽分别对应横竖滚动条的尺寸 */
    height: 1px;
}

.scrollable-content::-webkit-scrollbar-thumb {
    /* 滚动条里面小方块 */
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #535353;
}

.scrollable-content::-webkit-scrollbar-track {
    /* 滚动条里面轨道 */
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #ededed;
}
```

### 案例二：渐变条纹滚动条

创建一个带有条纹渐变效果的滚动条：

```css
.fancy-scrollbar::-webkit-scrollbar {
    /* 滚动条整体样式 */
    width: 10px; /* 高宽分别对应横竖滚动条的尺寸 */
    height: 1px;
}

.fancy-scrollbar::-webkit-scrollbar-thumb {
    /* 滚动条里面小方块 */
    border-radius: 10px;
    background-color: skyblue;
    background-image: -webkit-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent
    );
}

.fancy-scrollbar::-webkit-scrollbar-track {
    /* 滚动条里面轨道 */
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #ededed;
    border-radius: 10px;
}
```

## 全局滚动条样式

如果您想为整个页面设置统一的滚动条样式，可以省略类名选择器：

```css
/* 全局滚动条样式 */
::-webkit-scrollbar {
    width: 12px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 6px;
}

::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
    background: #555;
}
```

## 高级技巧

### 1. 隐藏滚动条但保持滚动功能

```css
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}

/* 对于Firefox */
.hide-scrollbar {
    scrollbar-width: none;
}
```

### 2. 不同状态的滚动条样式

```css
::-webkit-scrollbar-thumb:hover {
    background: #666;
}

::-webkit-scrollbar-thumb:active {
    background: #333;
}
```

### 3. 水平滚动条特定样式

```css
::-webkit-scrollbar:horizontal {
    height: 8px;
}

::-webkit-scrollbar-thumb:horizontal {
    background: linear-gradient(to right, #ff6b6b, #4ecdc4);
}
```

## 最佳实践

1. **保持简洁**：避免过于复杂的设计，确保滚动条易于识别和使用
2. **考虑对比度**：确保滚动条与背景有足够的对比度
3. **响应式设计**：在移动设备上考虑滚动条的可用性
4. **测试兼容性**：在不支持的浏览器中提供备选方案
5. **性能考虑**：避免过多的阴影和复杂渐变，可能影响滚动性能

## 注意事项

- 自定义滚动条可能会影响可访问性，确保提供足够的视觉对比度
- 移动设备上的滚动条行为可能与桌面不同
- 考虑为不支持`-webkit-scrollbar`的浏览器提供备选样式


