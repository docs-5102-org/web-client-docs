---
title: 单位介绍
category:
  - css
tag:
  - rem
  - rpx
  - px
---

# CSS 单位完整指南

CSS 中有多种单位类型，每种单位都有其特定的使用场景和特点。本文将详细介绍各种 CSS 单位的特性、使用方法以及它们之间的对比。

## 1. 绝对单位

### 1.1 px（像素）
- **定义**：像素是CSS中最常用的绝对单位
- **特点**：固定大小，不随父元素或视口变化
- **使用场景**：边框、阴影、精确定位等需要固定尺寸的场合
- **示例**：`width: 300px; border: 1px solid #000;`

### 1.2 其他绝对单位
- **pt（点）**：1pt = 1/72英寸，主要用于打印
- **pc（派卡）**：1pc = 12pt
- **in（英寸）**：物理英寸单位
- **cm（厘米）**：物理厘米单位
- **mm（毫米）**：物理毫米单位

## 2. 相对单位

### 2.1 em
- **定义**：相对于当前元素的字体大小
- **计算方式**：1em = 当前元素的 font-size 值
- **特点**：会继承父元素的字体大小影响
- **使用场景**：需要与字体大小成比例的元素
- **示例**：
  ```css
  .parent { font-size: 16px; }
  .child { 
    font-size: 1.2em; /* 19.2px */
    margin: 1em;      /* 19.2px */
  }
  ```

### 2.2 rem
- **定义**：相对于根元素（html）的字体大小
- **计算方式**：1rem = 根元素的 font-size 值
- **特点**：不受父元素字体大小影响，更可预测
- **使用场景**：响应式设计中的主要单位选择
- **示例**：
  ```css
  html { font-size: 16px; }
  .element { 
    width: 10rem;     /* 160px */
    padding: 1.5rem;  /* 24px */
  }
  ```

### 2.3 %（百分比）
- **定义**：相对于父元素对应属性的百分比
- **特点**：不同属性参考的父元素属性不同
- **使用场景**：流式布局、响应式设计
- **示例**：
  ```css
  .container { width: 800px; }
  .child { 
    width: 50%;       /* 400px */
    margin-top: 10%;  /* 相对于父元素width的10% = 80px */
  }
  ```

## 3. 视口单位

### 3.1 vw（视口宽度）
- **定义**：1vw = 视口宽度的1%
- **使用场景**：需要相对于视口宽度的元素

### 3.2 vh（视口高度）
- **定义**：1vh = 视口高度的1%
- **使用场景**：全屏布局、hero区域

### 3.3 vmin 和 vmax
- **vmin**：取 vw 和 vh 中的较小值
- **vmax**：取 vw 和 vh 中的较大值
- **使用场景**：需要适应不同屏幕方向的设计

### 3.4 示例
```css
.full-screen { height: 100vh; }
.half-width { width: 50vw; }
.square { 
  width: 50vmin;  /* 在不同屏幕方向保持正方形 */
  height: 50vmin; 
}
```

## 4. 小程序专用单位

### 4.1 rpx（响应式像素）
- **定义**：微信小程序中的CSS尺寸单位
- **规范**：规定屏幕宽为750rpx
- **自适应原理**：可根据屏幕宽度进行自适应
- **换算关系**：
  - iPhone6：屏幕宽度375px = 750rpx
  - 1rpx = 0.5px = 1物理像素（在iPhone6上）
- **与rem的关系**：
  - 规定屏幕宽度为20rem
  - 1rem = (750/20)rpx = 37.5rpx
- **使用建议**：
  - 设计稿使用750px宽度，1rpx = 1px
  - 设计图上的px尺寸可直接转换为rpx

### 4.2 rpx 使用示例
```css
/* 微信小程序样式 */
.container {
  width: 750rpx;        /* 占满屏幕宽度 */
  height: 200rpx;       /* 高度200rpx */
  font-size: 32rpx;     /* 字体大小 */
}
```

## 5. 单位对比

### 5.1 响应式设计对比

| 单位类型 | 响应特性 | 适用场景 | 优势 | 劣势 |
|---------|---------|---------|------|------|
| px | 固定不变 | 边框、精确定位 | 精确控制 | 不响应 |
| em | 相对当前字体 | 组件内部比例 | 灵活性好 | 嵌套复杂 |
| rem | 相对根字体 | 整体缩放 | 可预测性 | 需要设置根字体 |
| % | 相对父元素 | 流式布局 | 自适应强 | 计算复杂 |
| vw/vh | 相对视口 | 全屏设计 | 真正响应式 | 兼容性问题 |
| rpx | 小程序自适应 | 微信小程序 | 开发便捷 | 仅限小程序 |

### 5.2 使用建议

1. **桌面端网页**：主要使用 rem + px
2. **移动端网页**：rem + vw/vh + px
3. **微信小程序**：rpx + px
4. **响应式网站**：rem + % + vw/vh

## 6. 最佳实践

### 6.1 字体大小
```css
/* 推荐做法 */
html { font-size: 16px; }  /* 基准字体 */
h1 { font-size: 2rem; }    /* 32px */
p { font-size: 1rem; }     /* 16px */
small { font-size: 0.875rem; } /* 14px */
```

### 6.2 间距系统
```css
/* 基于 rem 的间距系统 */
.space-xs { margin: 0.25rem; }  /* 4px */
.space-sm { margin: 0.5rem; }   /* 8px */
.space-md { margin: 1rem; }     /* 16px */
.space-lg { margin: 1.5rem; }   /* 24px */
.space-xl { margin: 2rem; }     /* 32px */
```

### 6.3 媒体查询配合
```css
/* 结合媒体查询的响应式设计 */
.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

@media (min-width: 768px) {
  html { font-size: 18px; }
  .container { padding: 2rem; }
}
```

## 7. 参考链接

- [MDN - CSS单位](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Values_and_Units)
- [W3C CSS Values and Units](https://www.w3.org/TR/css-values-4/)
- [微信小程序官方文档 - rpx](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html)
- [Can I Use - CSS单位兼容性](https://caniuse.com/)

## 8. 总结

选择合适的CSS单位对于创建响应式、可维护的样式至关重要。在实际开发中，应该根据具体需求和平台特性选择最合适的单位组合，而不是单一使用某种单位。记住，没有万能的单位，只有最适合当前场景的单位。