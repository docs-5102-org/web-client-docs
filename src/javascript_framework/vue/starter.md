---
title: Vue 3.0 教程
category:
  - vue
date: 2025-09-20
order: 1
---

# Vue 3.0 教程

## 📖 官方文档链接

- **Vue 3.0 官方教程**: [https://cn.vuejs.org/guide/introduction](https://cn.vuejs.org/guide/introduction)
- **迁移指南教程**: [https://v3-migration.vuejs.org/](https://v3-migration.vuejs.org/)
- **Vue 3.0 英文官网**: [https://vuejs.org/](https://vuejs.org/)
- **Vue 2.0 教程**: [https://v2.cn.vuejs.org/](https://v2.cn.vuejs.org/)

## 🚀 项目创建

### 使用 Vite 创建项目（推荐）

```bash
# 使用 npm（npm 6.x）
$ npm init vite@latest <project-name> --template vue

# 使用 npm（npm 7+，需要加上额外的双短横线）
$ npm init vite@latest <project-name> -- --template vue

# 进入项目目录并安装依赖
$ cd <project-name>
$ npm install
$ npm run dev

# 或者使用 yarn
$ yarn create vite <project-name> --template vue
$ cd <project-name>
$ yarn
$ yarn dev
```

### 使用 Vue CLI 创建项目

```bash
$ npm install -g @vue/cli # 安装脚手架
$ vue create projectname  # 项目名
$ npm run serve
$ vue -V  # 查看版本
```

## 🆕 Vue 3.0 新特性与语法

### 1. Composition API

Vue 3.0 最重要的新特性是 Composition API，它提供了更灵活的组件逻辑复用方式。

```javascript
<template>
  <div>
    <h1>{{ count }}</h1>
    <button @click="increment">增加</button>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'

export default {
  setup() {
    // 响应式数据
    const count = ref(0)
    const state = reactive({
      name: '张三',
      age: 18
    })

    // 计算属性
    const doubleCount = computed(() => count.value * 2)

    // 方法
    const increment = () => {
      count.value++
    }

    // 生命周期
    onMounted(() => {
      console.log('组件已挂载')
    })

    return {
      count,
      state,
      doubleCount,
      increment
    }
  }
}
</script>
```

### 2. 多根节点支持（Fragment）

Vue 3.0 支持多个根节点，不再需要单一根元素包裹：

```vue
<template>
  <header>头部</header>
  <main>主要内容</main>
  <footer>底部</footer>
</template>
```

### 3. Teleport 传送门

可以将组件的 HTML 渲染到 DOM 中的任何位置：

```vue
<template>
  <teleport to="body">
    <div class="modal">
      <p>模态框内容</p>
    </div>
  </teleport>
</template>
```

### 4. Suspense 异步组件

处理异步组件的加载状态：

```vue
<template>
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <div>加载中...</div>
    </template>
  </Suspense>
</template>
```

## 🔄 Vue 2.0 vs Vue 3.0 主要区别

### 创建应用实例

**Vue 2.0:**
```javascript
import Vue from 'vue'
import App from './App.vue'

new Vue({
  render: h => h(App)
}).$mount('#app')
```

**Vue 3.0:**
```javascript
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
```

### 全局配置

**Vue 2.0:**
```javascript
Vue.config.globalProperties.$http = http
Vue.prototype.$message = message
```

**Vue 3.0:**
```javascript
const app = createApp(App)

app.use(store)
app.use(router)
app.use(Antd)

// 配置全局属性
app.config.globalProperties.$message = message
app.config.globalProperties.$http = http
app.config.globalProperties.$api = api

app.mount('#app')
```

### 生命周期钩子

| Vue 2.0 | Vue 3.0 Composition API |
|---------|-------------------------|
| beforeCreate | setup() |
| created | setup() |
| beforeMount | onBeforeMount |
| mounted | onMounted |
| beforeUpdate | onBeforeUpdate |
| updated | onUpdated |
| beforeDestroy | onBeforeUnmount |
| destroyed | onUnmounted |
| errorCaptured | onErrorCaptured |

### 响应式数据

**Vue 2.0:**
```javascript
export default {
  data() {
    return {
      count: 0,
      user: {
        name: '张三'
      }
    }
  }
}
```

**Vue 3.0:**
```javascript
import { ref, reactive } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const user = reactive({
      name: '张三'
    })

    return { count, user }
  }
}
```

## ⬆️ 版本升级注意事项

### 1. 依赖版本同步

升级 Vue 时，需要同步升级相关依赖，特别是 `vue-template-compiler`：

```bash
# 查看当前版本
$ vue -V

# 升级 Vue 和模板编译器（版本需要同步）
$ npm update vue -S
$ npm update vue-template-compiler -D

# 或者指定具体版本
$ npm update vue@3.3.4 -S
$ npm update @vue/compiler-sfc@3.3.4 -D  # Vue 3.0 中替代了 vue-template-compiler

# 安装依赖
$ npm install
```

### 2. 包管理参数说明

- `-S` 等于 `--save`（生产环境依赖）
- `-D` 等于 `--save-dev`（开发环境依赖）

### 3. 升级步骤

1. **修改 package.json**：先在配置文件中修改指定版本号
2. **更新依赖**：运行相应的 npm 或 yarn 命令
3. **安装依赖**：执行 `npm install` 或 `yarn install`
4. **测试验证**：确保项目能够正常运行

### 4. 破坏性变更

升级到 Vue 3.0 需要注意以下破坏性变更：

- **全局 API 变更**：`Vue.xxx` → `app.xxx`
- **v-model 变更**：自定义组件的 v-model 语法变化
- **过滤器移除**：Filters 功能被移除
- **$children 移除**：不再支持 `$children` 访问子组件
- **事件 API 变更**：`$on`, `$off`, `$once` 被移除

## 🌐 解决浏览器缓存问题

### 1. 构建配置

在 `vite.config.js` 中配置文件名哈希：

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        // 为每个 chunk 生成哈希文件名
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
      }
    }
  }
})
```

### 2. HTTP 头部设置

在服务器配置中设置适当的缓存策略：

```nginx
# nginx 配置示例
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location /index.html {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

### 3. Meta 标签

在 `index.html` 中添加缓存控制：

```html
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```

### 4. 版本控制策略

```javascript
// 在应用中添加版本信息
const app = createApp(App)
app.config.globalProperties.$version = process.env.VUE_APP_VERSION || '1.0.0'
```

## 📚 学习建议

1. **渐进式学习**：先掌握基础概念，再学习高级特性
2. **实践为主**：通过项目实践加深理解
3. **社区资源**：关注 Vue 官方文档和社区最佳实践
4. **工具配合**：熟练使用 Vue DevTools 等开发工具
5. **持续更新**：关注 Vue 生态系统的最新发展

## 🔗 相关链接

- [Vue 3.0 RFC](https://github.com/vuejs/rfcs)
- [Vue 3.0 迁移构建版本](https://v3-migration.vuejs.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [Vue Router 4.x](https://router.vuejs.org/)
- [Pinia 状态管理](https://pinia.vuejs.org/)
