---
title:  window.open 非法链接请求和静态资源加载问题
category:
  - JS
---

# 解决 window.open 非法链接请求和静态资源加载问题

## 问题背景

在 Web 开发中，当使用 `window.open()` 打开新窗口或访问外部资源时，服务端可能会通过检测 HTTP 请求头中的 `Referer` 字段来判断请求是否合法。如果检测到非预期的来源，服务端可能会拒绝请求，导致页面无法正常加载或静态资源（如图片）加载失败。

## 解决方案

### 1. HTML 标签方案

#### 1.1 使用 `rel="noreferrer"` 属性

在 `<a>` 标签中添加 `rel="noreferrer"` 属性可以阻止浏览器发送 Referer 信息：

```html
<!-- 推荐写法（兼容 IE7+） -->
<a href="https://example.com" rel="noreferrer" target="_blank">打开链接</a>

<!-- 等效写法 -->
<a href="https://example.com" rel="noreferrer noopener" target="_blank">打开链接</a>
```

#### 1.2 全局 Meta 标签控制

通过 `<meta>` 标签全局控制 Referer 发送行为：

```html
<!-- 完全不发送 Referer -->
<meta name="referrer" content="never">

<!-- 或使用更现代的语法 -->
<meta name="referrer" content="no-referrer">
```

#### 1.3 使用 referrerpolicy 属性

在相关标签中添加 `referrerpolicy` 属性：

```html
<a href="https://example.com" referrerpolicy="no-referrer" target="_blank">打开链接</a>
<img src="https://example.com/image.jpg" referrerpolicy="no-referrer" alt="图片">
<iframe src="https://example.com" referrerpolicy="no-referrer"></iframe>
```

### 2. JavaScript 方案（适用于 Vue/React/移动端）

#### 2.1 window.open() 基础方案（推荐）

使用 `window.open()` 的第三个参数指定 `noreferrer`：

```javascript
// 方案一：推荐使用
window.open("https://example.com", "_blank", "noreferrer");

// 更完整的配置
window.open("https://example.com", "_blank", "noreferrer,noopener");
```

#### 2.2 JavaScript 重定向方案

通过创建临时窗口并使用 JavaScript 重定向：

```javascript
// 方案二：适用于特殊场景
window.open(
  'javascript:window.name;', 
  '<script>location.replace("https://example.com")<\/script>'
);
```

#### 2.3 封装全局方法

创建一个可复用的窗口管理方法：

```javascript
let windowObjectReference = null;
let previousURL = null;

/**
 * 打开单一的外部窗口
 * @param {string} url - 要打开的URL
 * @param {string} windowName - 窗口名称（可选）
 */
function openExternalWindow(url, windowName = "ExternalWindow") {
  if (windowObjectReference === null || windowObjectReference.closed) {
    // 创建新窗口
    windowObjectReference = window.open(url, windowName, "noreferrer,noopener");
  } else if (previousURL !== url) {
    // 在已有窗口中加载新URL
    windowObjectReference.location.href = url;
    windowObjectReference.focus();
  } else {
    // 聚焦到已有窗口
    windowObjectReference.focus();
  }
  
  previousURL = url;
}

// 使用示例
openExternalWindow("https://example.com");
```

#### 2.4 批量处理链接

为页面中的所有外部链接添加事件处理：

```javascript
// 自动处理所有标记为外部的链接
function initExternalLinks() {
  const externalLinks = document.querySelectorAll("a[data-external='true']");
  
  externalLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openExternalWindow(link.href);
    });
  });
}

// 页面加载后初始化
document.addEventListener("DOMContentLoaded", initExternalLinks);
```

### 3. 现代框架中的使用

#### 3.1 React 组件示例

```jsx
import React from 'react';

const ExternalLink = ({ href, children, className = "" }) => {
  const handleClick = (e) => {
    e.preventDefault();
    window.open(href, "_blank", "noreferrer,noopener");
  };

  return (
    <a 
      href={href} 
      onClick={handleClick}
      className={className}
      rel="noreferrer noopener"
    >
      {children}
    </a>
  );
};

export default ExternalLink;
```

#### 3.2 Vue 组件示例

```vue
<template>
  <a 
    :href="href" 
    @click="handleClick"
    :class="className"
    rel="noreferrer noopener"
  >
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: 'ExternalLink',
  props: {
    href: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick(e) {
      e.preventDefault();
      window.open(this.href, "_blank", "noreferrer,noopener");
    }
  }
}
</script>
```

## Referrer Policy 详解

### 可选值说明

| 值 | 说明 |
|---|---|
| `no-referrer` | 不发送 Referer 信息 |
| `no-referrer-when-downgrade` | 当从 HTTPS 跳转到 HTTP 时不发送 Referer |
| `origin` | 只发送源信息（协议、域名、端口） |
| `origin-when-cross-origin` | 同源时发送完整 URL，跨源时只发送源信息 |
| `same-origin` | 只在同源请求时发送 Referer |
| `strict-origin` | 只发送源信息，HTTPS 到 HTTP 时不发送 |
| `strict-origin-when-cross-origin` | 同源时发送完整 URL，跨源时发送源信息，HTTPS 到 HTTP 时不发送 |
| `unsafe-url` | 总是发送完整 URL（不推荐） |

### 浏览器兼容性

- `rel="noreferrer"`：IE 7+ 支持
- `referrerpolicy` 属性：现代浏览器支持
- `window.open()` 的 `noreferrer` 参数：大部分现代浏览器支持

## 安全考虑

### Referrer 的安全作用

许多网站（如 CSDN、抖音等）使用 Referer 检查来：

1. **防止盗链**：确保用户是从合法页面访问资源
2. **访问控制**：验证用户的访问路径是否合规
3. **统计分析**：了解流量来源

### 最佳实践

1. **优先使用 `noreferrer`**：在不需要发送 Referer 时主动移除
2. **结合 `noopener`**：防止新窗口访问原窗口的 `window.opener`
3. **合理设置 Meta 标签**：根据需求选择合适的 Referrer Policy
4. **测试兼容性**：确保在目标浏览器中正常工作

## 参考资料

- [MDN - Window.open()](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)
- [MDN - Referrer Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)
- [简书 - Referrer Policy 详解](https://www.jianshu.com/p/7a5be2fb7197)
- [屈屈 - Referrer Policy 介绍](https://imququ.com/post/referrer-policy.html)