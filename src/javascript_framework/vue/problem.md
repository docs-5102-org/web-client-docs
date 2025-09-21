---
title: 常见问题
category:
  - vue
date: 2025-09-20
---

# 常见问题

## ios上input的focus()、autofocus无效处理方法

- https://www.jianshu.com/p/ea0b447c781e

## 关闭 Eslint 检查

### 🔹 Vue 2.x（Vue CLI 2 / 3 / 4）

Vue2 项目一般是 **Vue CLI 搭建**的，默认集成 ESLint。

#### 方法 1：彻底关闭 ESLint

1. 打开 `vue.config.js`（如果没有就新建一个）。
2. 添加配置：

```js
module.exports = {
  lintOnSave: false
}
```

这样在 `npm run serve` 或 `npm run build` 时不会进行 ESLint 检查。

---

#### 方法 2：仅关闭保存时校验

找到 `package.json`：

```json
"eslintConfig": {
  "root": true,
  "rules": {}
}
```

把里面的规则删掉或改成 `"off"`，比如：

```json
"no-console": "off",
"no-unused-vars": "off"
```

---

### 🔹 Vue 3.x（Vue CLI 5 或 Vite）

Vue3 有两种主流脚手架：

#### 1. **Vue CLI 5 + ESLint 插件**

和 Vue2 一样，在 `vue.config.js` 里设置：

```js
module.exports = {
  lintOnSave: false
}
```

#### 2. **Vite + ESLint 插件**

如果你用 Vite + `vite-plugin-eslint`，只要在 `vite.config.js` 里注释/删除 `eslint` 插件即可：

```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import eslintPlugin from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [
    vue(),
    // eslintPlugin() // 👈 注释掉即可
  ]
})
```

---

### 📌 总结

* **Vue2 / Vue3 (Vue CLI)**：`vue.config.js` 里 `lintOnSave: false`
* **Vue3 (Vite)**：去掉 `vite-plugin-eslint` 插件
* **更灵活**：修改 `eslintrc.js` / `.eslintrc.json` 把规则改为 `"off"`


## vue h5转换uni-app指南（vue转uni、h5转uni）

- https://ask.dcloud.net.cn/article/36174

## 路由传参后，刷新会失去参数的问题

- https://blog.csdn.net/qq_44722972/article/details/106643096


## 使用vue-cli搭建的项目如何在index.html里引入静态css和js

在使用 vue-cli 搭建的项目中，有几种方式可以在 index.html 中引入静态的 CSS 和 JS 文件：

### 方法一：放在 public 目录下（推荐）

1. **将静态文件放在 `public` 目录下**
   ```
   public/
   ├── css/
   │   └── custom.css
   ├── js/
   │   └── custom.js
   └── index.html
   ```

2. **在 `public/index.html` 中引入**
   ```html
   <!DOCTYPE html>
   <html lang="">
   <head>
     <meta charset="utf-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width,initial-scale=1.0">
     <link rel="icon" href="<%= BASE_URL %>favicon.ico">
     
     <!-- 引入静态 CSS -->
     <link rel="stylesheet" href="<%= BASE_URL %>css/custom.css">
     
     <title><%= htmlWebpackPlugin.options.title %></title>
   </head>
   <body>
     <div id="app"></div>
     
     <!-- 引入静态 JS -->
     <script src="<%= BASE_URL %>js/custom.js"></script>
   </body>
   </html>
   ```

### 方法二：使用 CDN 链接

```html
<!DOCTYPE html>
<html lang="">
<head>
  <!-- 引入 CDN CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
</head>
<body>
  <div id="app"></div>
  
  <!-- 引入 CDN JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

### 方法三：通过 vue.config.js 配置

如果需要更复杂的配置，可以在 `vue.config.js` 中进行设置：

```javascript
module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '你的项目标题'
        // 可以在这里添加更多的模板变量
        return args
      })
  },
  
  // 配置静态资源的路径
  publicPath: process.env.NODE_ENV === 'production' ? '/your-app/' : '/'
}
```

### 重要注意事项

1. **使用 `<%= BASE_URL %>`**: 这是 Vue CLI 提供的模板变量，确保在不同环境下路径正确
2. **文件放置位置**: 放在 `public` 目录下的文件会被直接复制到输出目录，不会经过 webpack 处理
3. **加载顺序**: CSS 通常放在 `<head>` 中，JS 放在 `</body>` 标签前
4. **缓存考虑**: 对于经常变化的文件，考虑添加版本号或使用构建工具的哈希功能

这种方式引入的静态文件不会被 webpack 处理，适合第三方库或不需要模块化处理的代码。

## Vue中非生产环境打包出的文件没css的原因

- https://www.cnblogs.com/cjh1996/p/12913157.html

## vue 部分 ios机型上vuex刷新丢失问题，不支持localStorage以及beforeunload事件失效问题

原因：IOS是卸载了onunload和beforeunload事件，改为pagehide代替

- https://blog.csdn.net/sxl131415/article/details/108333584

## 移动端设备监听手指触摸事件时发现有时候无法触发touchend事件，因此在监听touchend事件时通过 阻止页面默认事件 event.preventDefault()来实现事件监听，但是发现页面的滚动事件也被阻止了。怎么样既不会阻止页面滚动又可以监听手指抬起事件？

通过查看资料发现元素上绑定了touchcancel和touchend两个事件：
1、长按后不移动直接抬起手指，触发的是touchcancel；
2、长按后轻轻移动一下再抬起手指，触发的是touchend；
针对这细微的变化实际上用户很难去辨别，因此给元素这两个事件绑定同一个方法，此时不再需要阻止页面默认事件也可以触发手指抬起动作：

```html
<div
    class="chat"
    id="chat"    
    @touchcancel="handleTouchEnd"
    @touchend="handleTouchEnd"
  ></div>
```

## vue 修改对象属性 没有渲染页面_vue修改对象属性页面不渲染解决方法

1. $forceUpdate() - 强制重新渲染页面
2. 使用Vue.$set()

## 移动端软键盘弹出时底部固定元素处理方案

- [处理方案](./ydjj.md)

## iOS移动端下focus()失效的问题

- https://www.jianshu.com/p/d4a043344d57

## v-show/v-if 出现闪烁和延迟加载的问题

- https://blog.csdn.net/anny_mei/article/details/108140337