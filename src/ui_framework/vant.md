---
title: Vant UI 安装与使用指南
category:
  - ui framework
tag:
  - vant
---

# Vant UI 安装与使用指南

## 📚 官方文档

- **Vant 4 (Vue 3)**: [https://vant-contrib.gitee.io/vant/#/zh-CN](https://vant-contrib.gitee.io/vant/#/zh-CN)
- **Vant 2 (Vue 2)**: [https://youzan.github.io/vant/v2/#/zh-CN](https://youzan.github.io/vant/v2/#/zh-CN)
- **GitHub 仓库**: [https://github.com/youzan/vant](https://github.com/youzan/vant)

## 🚀 安装方式

### Vue 3 项目安装 Vant 4

```bash
# 通过 npm 安装
npm install vant

# 通过 yarn 安装
yarn add vant

# 通过 pnpm 安装
pnpm add vant
```

### Vue 2 项目安装 Vant 2

```bash
# 通过 npm 安装
npm install vant@latest-v2

# 通过 yarn 安装
yarn add vant@latest-v2
```

## 📦 引入方式

### 1. 全量引入

**Vue 3 + Vant 4:**
```javascript
import { createApp } from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'

const app = createApp()
app.use(Vant)
```

**Vue 2 + Vant 2:**
```javascript
import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
```

### 2. 按需引入（推荐）

#### 安装插件

```bash
# Vue 3
npm install unplugin-vue-components -D

# Vue 2
npm install babel-plugin-import -D
```

#### 配置

**Vite 配置 (Vue 3):**
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
})
```

**Babel 配置 (Vue 2):**
```javascript
// babel.config.js
module.exports = {
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
```

#### 使用方式

配置完成后，可以直接在模板中使用，无需手动引入：

```vue
<template>
  <van-button type="primary">主要按钮</van-button>
  <van-cell title="单元格" value="内容" />
</template>
```

### 3. 手动按需引入

```javascript
import { Button, Cell } from 'vant'
import 'vant/lib/button/style'
import 'vant/lib/cell/style'

export default {
  components: {
    VanButton: Button,
    VanCell: Cell,
  },
}
```

## 🧭 导航栏组件详解

### van-nav-bar 基础用法

**官方文档**: [https://youzan.github.io/vant/#/zh-CN/nav-bar](https://youzan.github.io/vant/#/zh-CN/nav-bar)

```vue
<template>
  <!-- 基础用法 -->
  <van-nav-bar title="标题" left-text="返回" right-text="按钮" />

  <!-- 自定义导航栏 -->
  <van-nav-bar left-text="醉阅小说" fixed border="false">
    <template #right>
      <div class="iconItem">
        <van-icon name="search" size="18" color="white"/>
        <span>搜索</span>
      </div>
    </template>
  </van-nav-bar>
</template>
```

### 导航栏样式自定义

```vue
<style>
/* 自定义背景色 */
.van-nav-bar {
  background: #b93321;
}

/* 自定义导航字体的颜色和大小 */
.van-nav-bar__text {
  color: white;
  font-size: 16px;
}

/* 去掉导航栏下边的边框 */
.van-hairline--bottom:after {
  border-bottom-width: 0;
}

/* 自定义右侧图标样式 */
.iconItem {
  display: flex;
  align-items: center;
  gap: 4px;
  color: white;
  font-size: 14px;
}
</style>
```

### 导航栏事件处理

```vue
<template>
  <van-nav-bar
    title="标题"
    left-text="返回"
    right-text="按钮"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.go(-1) // 返回上一页
    },
    onClickRight() {
      // 右侧按钮点击事件
      console.log('右侧按钮被点击')
    }
  }
}
</script>
```

## 🎯 常用组件示例

### 1. 按钮组件

```vue
<template>
  <div class="button-demo">
    <!-- 按钮类型 -->
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="success">成功按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>

    <!-- 按钮尺寸 -->
    <van-button size="large">大号按钮</van-button>
    <van-button size="normal">普通按钮</van-button>
    <van-button size="small">小型按钮</van-button>
    <van-button size="mini">迷你按钮</van-button>

    <!-- 禁用状态 -->
    <van-button disabled type="primary">禁用状态</van-button>

    <!-- 加载状态 -->
    <van-button loading type="primary" />
    <van-button loading loading-text="加载中..." type="primary" />
  </div>
</template>
```

### 2. 单元格组件

```vue
<template>
  <div class="cell-demo">
    <!-- 基础用法 -->
    <van-cell title="单元格" value="内容" />
    <van-cell title="单元格" value="内容" label="描述信息" />

    <!-- 只设置 value -->
    <van-cell value="内容" />

    <!-- 展示图标 -->
    <van-cell title="单元格" icon="location-o" />

    <!-- 只展示箭头 -->
    <van-cell title="单元格" is-link />

    <!-- 展示箭头并开启点击反馈 -->
    <van-cell title="单元格" is-link @click="onClick" />

    <!-- 分组标题 -->
    <van-cell-group title="分组1">
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" />
    </van-cell-group>
  </div>
</template>
```

### 3. 表单组件

```vue
<template>
  <van-form @submit="onSubmit">
    <!-- 输入框 -->
    <van-field
      v-model="username"
      name="用户名"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />

    <!-- 密码输入框 -->
    <van-field
      v-model="password"
      type="password"
      name="密码"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />

    <!-- 选择器 -->
    <van-field
      readonly
      clickable
      name="picker"
      :value="value"
      label="选择器"
      placeholder="点击选择选项"
      @click="showPicker = true"
    />
    <van-popup v-model:show="showPicker" position="bottom">
      <van-picker
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>

    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      value: '',
      showPicker: false,
      columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华'],
    }
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
    },
    onConfirm(value) {
      this.value = value
      this.showPicker = false
    },
  },
}
</script>
```

## 🎨 主题定制

### CSS 变量定制

```css
:root {
  --van-primary-color: #1989fa;
  --van-success-color: #07c160;
  --van-danger-color: #ee0a24;
  --van-warning-color: #ff976a;
  --van-text-color: #323233;
  --van-background-color: #f7f8fa;
}
```

### Less 变量定制

```less
// 安装 less 和 less-loader
npm install less less-loader -D

// 在 vue.config.js 中配置
module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#1989fa',
            'button-primary-background-color': '#1989fa',
          },
        },
      },
    },
  },
}
```

## 📱 移动端适配

### Viewport 设置

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">
  <title>移动端页面</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

### rem 适配

```bash
# 安装 postcss-pxtorem
npm install postcss-pxtorem -D
```

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5, // Vant 官方根字体大小是 37.5
      propList: ['*'],
    },
  },
}
```

## 🔧 常见问题与解决方案

### 1. 样式不生效

确保正确引入了样式文件：

```javascript
import 'vant/lib/index.css'
```

### 2. 按需引入后样式丢失

检查 babel 配置或 unplugin-vue-components 配置：

```javascript
// 确保 style: true
['import', {
  libraryName: 'vant',
  libraryDirectory: 'es',
  style: true // 这里必须为 true
}, 'vant']
```

### 3. TypeScript 支持

```bash
# 安装类型定义
npm install @types/vant -D
```

```typescript
// 在 main.ts 中
import { createApp } from 'vue'
import { Button, Cell } from 'vant'

const app = createApp()
app.use(Button).use(Cell)
```

### 4. 自定义主题色不生效

检查 CSS 变量的作用域和优先级：

```css
/* 使用更高的权重 */
.van-button--primary {
  background-color: #1989fa !important;
}

/* 或使用深度选择器 */
::v-deep .van-button--primary {
  background-color: #1989fa;
}
```

## 📖 最佳实践

1. **按需引入**：使用自动按需引入插件，减少打包体积
2. **主题一致性**：统一配置主题变量，保持视觉一致性
3. **响应式设计**：合理使用 rem 和 viewport 进行移动端适配
4. **组件封装**：对常用的 Vant 组件进行二次封装，提高复用性
5. **性能优化**：合理使用懒加载和虚拟滚动等性能优化手段

## 🔗 相关链接

- [Vant 官方文档](https://vant-contrib.gitee.io/vant/#/zh-CN)
- [Vant Weapp 小程序版本](https://youzan.github.io/vant-weapp/#/home)
- [Vue 3 官方文档](https://vuejs.org/)
- [移动端适配方案](https://github.com/amfe/lib-flexible)

---

> 本指南涵盖了 Vant UI 的核心功能和使用方法，建议结合官方文档进行深入学习和实践。