---
title: vue-cli + postcss + autoprefixer 实现自适应和自动添加前缀教程
category:
  - 跨平台框架
tag:
  - uni-app
  - vue-cli
order: 3
---

# vue-cli + postcss + autoprefixer 实现自适应和自动添加前缀教程

## 概述

PostCSS 是一个用 JavaScript 插件转换 CSS 代码的工具，类似于 Babel 对 JavaScript 的处理。它可以帮助我们：

- 自动添加浏览器前缀(autoprefixer)
- 使用下一代 CSS 语法
- 自动将 px 转换为 rem(pstcss-pxtorem)/vw(postcss-px-to-viewport) 等响应式单位
- 压缩 CSS 代码

**官方资源**
- [官网](https://postcss.org/)
- [GitHub](https://github.com/postcss/postcss)

---

## 核心插件

### 1. autoprefixer - 自动前缀

自动为 CSS 属性添加浏览器前缀，基于 Can I Use 数据库，被 Google 推荐并在 Twitter、阿里巴巴等公司使用。

#### 安装
```bash
npm install postcss autoprefixer -D
# 或
yarn add postcss autoprefixer -D
```

#### 配置示例

**Vue 2 项目-示例1**
```js
// 根目录新建 postcss.config.js
module.exports = {
    plugins: [
    require('autoprefixer')
    ]
}
```

**Vue 2 项目-示例2**
```javascript
// postcss.config.js
module.exports = {
  plugins: {
    'autoprefixer': {
      overrideBrowserslist: [
        "Android >= 4", 
        "iOS >= 8",
        "Chrome > 31",
        "Firefox > 31",
        "IE >= 8"
      ],
      remove: process.env.UNI_PLATFORM !== 'h5'
    }
  }
}
```

**Vue 3 项目 (Vite)**
```js
// vite.config.js
import { defineConfig } from "vite"
import uni from "@dcloudio/vite-plugin-uni"
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [uni()],
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: [
            "Android 4.1",
            "iOS 7.1", 
            "Chrome > 31",
            "Firefox > 31",
            "IE >= 8"
          ]
        })
      ]
    }
  }
})
```

---

### 2. postcss-pxtorem - px 转 rem

将 px 单位自动转换为 rem 单位，实现响应式布局。

#### 安装
```bash
npm install postcss-pxtorem -D
# 或
yarn add postcss-pxtorem -D
```

#### 配置参数说明

| 参数                | 类型    | 默认值 | 描述                              |
| ------------------- | ------- | ------ | --------------------------------- |
| `rootValue`         | number  | 16     | 根元素字体大小，用于计算 rem      |
| `unitPrecision`     | number  | 5      | rem 值的小数点精度                |
| `propList`          | array   | ['*']  | 需要转换的 CSS 属性，`*` 表示全部 |
| `selectorBlackList` | array   | []     | 不转换的选择器                    |
| `replace`           | boolean | true   | 是否替换原值                      |
| `mediaQuery`        | boolean | false  | 是否转换媒体查询中的 px           |
| `minPixelValue`     | number  | 0      | 小于此值的 px 不转换              |

#### 配置示例

**Vue 2 项目**
```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 16,           // 基准字体大小
      unitPrecision: 5,        // 保留小数位数
      propList: ['*'],         // 转换所有属性
      selectorBlackList: ['.ignore', '.no-rem'], // 忽略的类名
      replace: true,
      mediaQuery: false,
      minPixelValue: 1         // 1px 以下不转换
    }
  }
}
```

**Vue 3 项目 (Vite)**
```ts
// vite.config.ts
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
//@ts-ignore
import postCssPxToRem from 'postcss-pxtorem';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [uni()],
    css: {
        postcss: {
            plugins: [
                //https://github.com/cuth/postcss-pxtorem
                postCssPxToRem({
                    rootValue: 16,      // html节点设的font-size大小，由于chrome最小12px，所以基值要设置大写
                    unitPrecision: 5,   // 转rem精确到小数点多少位
                    propList: ['*'],    // 指定转换成rem的属性，eg: ['font','font-size','line-height','letter-spacing'], * 代表全支持
                    selectorBlackList: ['.ignore'], // str或reg ，指定不转换的选择器，str时包含字段即匹配
                    replace: true,
                    mediaQuery: false, 
                    minPixelValue: 0 // 媒体查询内的px是否转换minPixelValue:0// 小于指定数值的px不转换
                })
            ]
        },
    }
});
```

---

### 3. postcss-px-to-viewport - px 转视口单位

将 px 转换为视口单位（vw, vh, vmin, vmax），更适合移动端响应式设计。

#### 安装
```bash
npm install postcss-px-to-viewport -D
# 或  
yarn add postcss-px-to-viewport -D
```

#### 默认选项

```
{
    unitToConvert: 'px',
    viewportWidth: 320,
    unitPrecision: 5,
    propList: ['*'],
    viewportUnit: 'vw',
    fontViewportUnit: 'vw',
    selectorBlackList: [],
    minPixelValue: 1,
    mediaQuery: false,
    replace: true,
    exclude: undefined,
    include: undefined,
    landscape: false,
    landscapeUnit: 'vw',
    landscapeWidth: 568
}
```

#### 配置参数说明

| 参数                | 类型         | 默认值    | 描述                   |
| ------------------- | ------------ | --------- | ---------------------- |
| `unitToConvert`     | string       | 'px'      | 要转换的单位           |
| `viewportWidth`     | number       | 320       | 设计稿宽度，通常为 750 |
| `viewportHeight`    | number       | 568       | 设计稿高度             |
| `unitPrecision`     | number       | 5         | 转换精度               |
| `propList`          | array        | ['*']     | 要转换的属性           |
| `viewportUnit`      | string       | 'vw'      | 转换后的视口单位       |
| `fontViewportUnit`  | string       | 'vw'      | 字体转换后的单位       |
| `selectorBlackList` | array        | []        | 不转换的选择器         |
| `minPixelValue`     | number       | 1         | 最小转换值             |
| `mediaQuery`        | boolean      | false     | 是否转换媒体查询       |
| `exclude`           | array/regexp | undefined | 忽略的文件             |

#### 配置示例

**Vue 2 项目 - 示例1**
```js
//vue2 根目录新建 postcss.config.js
const path = require('path')
module.exports = {
    parser: 'postcss-comment',
    plugins: {
        'postcss-import': {
            resolve(id, basedir, importOptions) {
                if (id.startsWith('~@/')) {
                    return path.resolve(process.env.UNI_INPUT_DIR, id.substr(3))
                } else if (id.startsWith('@/')) {
                    return path.resolve(process.env.UNI_INPUT_DIR, id.substr(2))
                } else if (id.startsWith('/') && !id.startsWith('//')) {
                    return path.resolve(process.env.UNI_INPUT_DIR, id.substr(1))
                }
                return id
            }
        },
        'autoprefixer': {
            overrideBrowserslist: ["Android >= 4", "ios >= 8"],
            remove: process.env.UNI_PLATFORM !== 'h5'
        },
        //示例1
        'postcss-px-to-viewport': {
            unitToConvert:'px',//要转换的单位，默认是'px'
            viewportWidth: 750,// 视窗的宽度，对应的是我们设计稿的宽度，一般是750，默认是320
            viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
            unitPrecision: 3,// 指定`px`转换为视窗单位值的小数位数，默认是5
            propList: ['*'], //指定可以转换的css属性，默认是['*']，代表全部属性进行转换
            viewportUnit: "vw", //指定需要转换成的视窗单位，建议使用vw
            fontViewportUnit: 'vw', //指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: ['.ignore'],// 指定不转换为视窗单位的类，可以自定义，可以无限添加，建议定义一至两个通用的类名
            minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
            mediaQuery: false, // 允许在媒体查询中转换`px`
            replace: true,
            exclude: [],//设置忽略文件，如node_modules
        }
    }
}

```

**Vue 2 项目 - 示例2**
```js
const path = require('path')
module.exports = {
    parser: 'postcss-comment',
    plugins: {
        'postcss-import': {
            resolve(id, basedir, importOptions) {
                if (id.startsWith('~@/')) {
                    return path.resolve(process.env.UNI_INPUT_DIR, id.substr(3))
                } else if (id.startsWith('@/')) {
                    return path.resolve(process.env.UNI_INPUT_DIR, id.substr(2))
                } else if (id.startsWith('/') && !id.startsWith('//')) {
                    return path.resolve(process.env.UNI_INPUT_DIR, id.substr(1))
                }
                return id
            }
        },
        'autoprefixer': {
            overrideBrowserslist: ["Android >= 4", "ios >= 8"],
            remove: process.env.UNI_PLATFORM !== 'h5'
        },
        // 借助postcss-px-to-viewport插件，实现rpx转px，文档：https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md
        // 以下配置，可以将rpx转换为1/2的px，如20rpx=10px，如果要调整比例，可以调整 viewportWidth 来实现
        'postcss-px-to-viewport': {
            unitToConvert: 'rpx',
            viewportWidth: 200,
            unitPrecision: 5,
            propList: ['*'],
            viewportUnit: 'px',
            fontViewportUnit: 'px',
            selectorBlackList: [],
            minPixelValue: 1,
            mediaQuery: false,
            replace: true,
            exclude: undefined,
            include: undefined,
            landscape: false
        },
        '@dcloudio/vue-cli-plugin-uni/packages/postcss': {}
    }
}
```

**Vue 3 项目 (Vite) - uni-app 适配**
```js
// vite.config.js
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
//@ts-ignore
import postCssPxToViewPort from 'postcss-px-to-viewport';
import autoprefixer from 'autoprefixer'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [uni()],
    css: {
    postcss: {
        plugins: [
        autoprefixer({ // 自动添加前缀
                overrideBrowserslist: [
                    "Android 4.1",
                    "iOS 7.1",
                    "Chrome > 31",
                    "ff > 31",
                    "ie >= 8"
                ],
        }),
        postCssPxToViewPort({ // 自适应，px>rem转换
            // 要转化的单位
            unitToConvert: 'rpx',
            // UI设计稿的大小
            viewportWidth: 750,
            // 转换后的精度
            unitPrecision: 6,
            // 转换后的单位
            viewportUnit: 'px',
            // 字体转换后的单位
            fontViewportUnit: 'px',
            // 能转换的属性，*表示所有属性，!border表示border不转
            propList: ['*'],
            // 指定不转换为视窗单位的类名，
            selectorBlackList: ['ignore-'],
            // 最小转换的值，小于等于1不转
            minPixelValue: 1,
            // 是否在媒体查询的css代码中也进行转换，默认false
            mediaQuery: false,
            // 是否转换后直接更换属性值
            replace: true,
            // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
            exclude: [],
            // 包含那些文件或者特定文件
            include: [],
            // 是否处理横屏情况
            landscape: false
        }),
        ]
    },
    }
});

```

---

## 插件对比

### postcss-px-to-viewport vs postcss-pxtorem

| 特性               | postcss-px-to-viewport                     | postcss-pxtorem                                  |
| ------------------ | ------------------------------------------ | ------------------------------------------------ |
| **用途**           | 将 px 转换为视口单位（vw, vh, vmin, vmax） | 将 px 转换为 rem                                 |
| **转换单位**       | 视口单位（vw, vh, vmin, vmax）             | rem                                              |
| **视口设置**       | 需要配置视口宽度和高度                     | 不需要视口设置                                   |
| **响应式设计**     | 更适合响应式设计，根据视口大小调整元素尺寸 | 适用于使用 rem 单位的响应式设计                  |
| **根元素字体大小** | 不受影响                                   | 需要设置根元素的字体大小（html { font-size: x }) |
| **典型用例**       | 移动端网页设计                             | 使用 rem 进行响应式布局                          |
| **兼容性**         | 支持所有现代浏览器                         | 支持所有现代浏览器                               |
| **配置复杂度**     | 需要配置视口单位、选择器忽略等             | 需要配置转换基准、选择器忽略等                   |
| **常见问题**       | 可能导致视口单位计算不准确                 | 需要确保所有设计元素基于 rem 单位                |

**选择建议：**
- 移动端项目：推荐 `postcss-px-to-viewport`
- 桌面端或需要更好兼容性：推荐 `postcss-pxtorem`
- uni-app 项目：根据平台选择，H5 用 viewport，小程序用 pxtorem

---


## 使用注意事项

### 1. 忽略转换的方法
```css
/* 方法 1：使用忽略类名 */
.ignore {
  width: 100px; /* 不会被转换 */
}

/* 方法 2：使用注释 */
.example {
  width: 100px; /* px-to-viewport-ignore */
  height: 50px; /* 正常转换 */
}

/* 方法 3：使用 PX 大写 */
.example {
  width: 100PX; /* 不会被转换 */
  height: 50px; /* 正常转换 */
}
```

### 2. 常见问题

**rem 方案需要设置根字体**
```css
/* 在 HTML 中设置基准字体大小 */
html {
  font-size: 16px; /* 与 rootValue 保持一致 */
}
```

**第三方组件库兼容**
```javascript
// 忽略第三方组件库
selectorBlackList: ['.el-', '.van-', '.weui-']
```

**不同环境使用不同配置**
```javascript
const config = {
  plugins: {
    'postcss-px-to-viewport': process.env.UNI_PLATFORM === 'h5' ? {
      // H5 配置
      viewportWidth: 750,
      viewportUnit: 'vw'
    } : {
      // 小程序配置  
      viewportWidth: 750,
      viewportUnit: 'rpx'
    }
  }
}
```

---

## 参考链接

- [PostCSS 官网](https://postcss.org/)
- [autoprefixer](https://github.com/postcss/autoprefixer)
- [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 
- [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport)
