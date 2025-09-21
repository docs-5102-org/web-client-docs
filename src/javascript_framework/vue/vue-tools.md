---
title: 工具生态
category:
  - vue
date: 2025-09-20
order: 3
---

# 工具生态

## 二维码

### vue 二维码组件 vue-qr

**官网：** https://www.npmjs.com/package/vue-qr

**安装**

```bash
npm install vue-qr --save
```

**使用**

```vue
import vueQr from 'vue-qr'

components: {
  CircularPageLoading,
  Reviews,
  NavHeader,
  vueQr,
},

// logoSrc为logo的url地址(使用require的方式)；text为需要转换为二维码的内容
<vue-qr :logoSrc="imageUrl" text="xxx" :size="200"></vue-qr>
<script>
    export default {
        name: "qecode",
        data() {
            return {
                imageUrl: require("../assets/logo.png"),
            }
        },
        components: {
            vueQr
        },
    },
}
</script>
```

### 二维码、条码

- https://meet-ui.com/#/

### 二维码组件 qrcode qrcodejs2

**官网：****<https://www.npmjs.com/package/qrcode>**

**安装**

```bash
npm install --save qrcodejs2
```

**使用**

```vue
import QRCode from 'qrcodejs2'

<div class="qrcode" ref="qrCodeUrl"></div>
<script>
methods: {
    creatQrCode() {
        var qrcode = new QRCode(this.$refs.qrCodeUrl, {
            text: 'xxxx', // 需要转换为二维码的内容
            width: 100,
            height: 100,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        })
    },
},
mounted() {
    this.creatQrCode();
},
</script>
```

## vConsole控制台调试

- https://www.npmjs.com/package/vconsole
- https://www.pianshen.com/article/1287158965/

## 集成flexible

你说的 **flexible** 一般是指 **手淘团队的 lib-flexible**，主要用于移动端适配（把设计稿 px 转换成 rem 单位）。

不过要注意：

* **lib-flexible 已经不再维护**，官方推荐使用 **postcss-pxtorem**、`viewport` 适配等方案。
* 但很多旧项目还在用 flexible，所以文档还有参考价值。

---

## 📌 lib-flexible 官方资源

* **GitHub 仓库（手淘官方开源）**
  👉 [https://github.com/amfe/lib-flexible](https://github.com/amfe/lib-flexible)

* **NPM 包**
  👉 [https://www.npmjs.com/package/lib-flexible](https://www.npmjs.com/package/lib-flexible)

---

### 🚀 使用方法简要

```html
<script src="https://cdn.bootcdn.net/ajax/libs/lib-flexible/0.3.2/flexible.min.js"></script>
```

原理：

* 会根据设备的 `dpr` 和 `viewport` 宽度，动态设置 `html { font-size: ... }`。
* 然后页面用 `rem` 单位来写样式，实现自适配。

---

⚠️ **注意**

* lib-flexible 只适合旧方案，新项目推荐 **`postcss-pxtorem` + viewport 配合**，兼容性更好。
* Vue/uni-app 等框架一般已经内置了更好的适配方式。

## vue3-touch 手势工具库

| 库 名称                  | 适用环境              | 特点                                                                   |
| --------------------- | ----------------- | -------------------------------------------------------------------- |
| **vue3-touch-events** | Vue 3             | 支持 tap、swipe、touch、hold 等常用手势事件，使用简单。 ([npm][1])                     |
| **vue3-touch-hammer** | Vue 3 + Hammer.js | 基于 Hammer.js，支持更全面的手势识别（例如滑动、双指缩放等）。 ([GitHub][2])                   |
| **vue3-hand-mobile**  | Vue 2 / Vue 3     | 一个轻量插件，支持手势事件指令 `v-touch:*`，比较适合移动端交互需求不复杂的场景。 ([npm][3])            |
| **Hammer.js**         | 无框架依赖（可与 Vue 配合）  | 手势库本身，非常成熟；支持自定义各种识别器（pan, swipe, pinch, rotate 等）。 ([Hammer.js][4]) |

[1]: https://www.npmjs.com/package/vue3-touch-events?utm_source=chatgpt.com "vue3-touch-events"
[2]: https://github.com/maryasov/vue3-touch-hammer?utm_source=chatgpt.com "maryasov/vue3-touch-hammer"
[3]: https://www.npmjs.com/package/vue3-hand-mobile?utm_source=chatgpt.com "vue3-hand-mobile"
[4]: https://hammerjs.github.io/?utm_source=chatgpt.com "Hammer.JS - Hammer.js"

## better-scroll滚动组件

- https://better-scroll.github.io/docs/zh-CN
- https://blog.csdn.net/weixin_43334673/article/details/110130720

## vue-clipboard2 安装与使用指南

- [教程](./vue-clipboard2.md)
- [开源项目clipboard-polyfill](https://github.com/lgarron/clipboard-polyfill)

## vue下载文件的几种实现方式

- [Vue文件下载实现指南](./dowload-file.md)

## vue 开源移动小说/小说翻页/仿真翻页功能

### 相关资源1
- https://github.com/zgsnbtl/vue-guapi
- https://github.com/Tmfree/vue-fiction
- https://gitee.com/hc2000/zhixiao-vue-webapp?_from=gitee_search
- https://www.jianshu.com/p/c8e3527a5c46
- https://www.gushiciku.cn/pl/gH2G
- https://github.com/YIXINSHUWU/Fakin-Reader
- https://github.com/lazybo-code/lazybo-reader-book

### 相关资源2

#### 1. jQuery + TweenMax 翻页动画示例

- **描述**：jQuery TweenMax 翻页动画示例，支持 WebStorm 直接运行
- **文件**：`jqueryTweenMax翻页动画.rar`
- **预览地址**：http://www.bootstrapmb.com/item/8664/preview

#### 2. Turn.js

- **官网**：http://turnjs.com/
- **描述**：官方提供示例下载，支持 WebStorm 直接运行
- **特点**：专业的翻页动画库

#### 3. 基于现代框架的翻页动画组件

**Vue 版本**
- **项目地址**：https://github.com/harrietjia/vue-flip-page
- **源码分析文章**：http://www.qiutianaimeili.com/html/page/2021/02/20305jtdizqv03b.html

**React + Vue 通用版本**
- **项目地址**：https://github.com/Nodlik/StPageFlip
- **特点**：同时支持 React 和 Vue 框架

#### 4. CSS 翻页特效集合

- **资源地址**：http://www.bootstrapmb.com/tag/fanye
- **描述**：纯 CSS 实现的各种翻页特效

#### 5. Vue 简单翻书动画

- **教程地址**：https://www.jb51.net/article/243711.htm
- **特点**：轻量级 Vue 翻书动画实现方案

#### 6. 扩展资源

- **海量插件模板网站**：http://www.bootstrapmb.com/
- **描述**：丰富的前端插件和模板资源库

## vue 集成 epub.js 电子书

- github官网: https://github.com/futurepress/epub.jsEpub
- 在线电子书格式转换: http://www.online-convert.com/
- https://blog.csdn.net/weixin_30741653/article/details/96260965
- https://www.cnblogs.com/xiaozhaoqi/p/7819086.html

## vue 虚拟数据列表滚动实现

- 官方插件 
  - [https://www.npmjs.com/package/](https://www.npmjs.com/package/vue-virtual-scroller)
  - [vue-virtual-scroller](https://www.npmjs.com/package/vue-virtual-scroller)
- gitHub：<https://github.com/tangbc/vue-virtual-scroll-list>
- 哔哩哔哩视频：<https://www.bilibili.com/video/BV1ab4y127Hp>
- 第三方使用教程：<https://www.cnblogs.com/jiajia-hjj/p/15388319.html>
- 通过编写代码利用scrollTop实现虚拟滚动示例：https://www.cnblogs.com/luckknock/p/14736542.html

## 开源导航组件

- https://github.com/WebStackPage/WebStackPage.github.io