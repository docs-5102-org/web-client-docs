---
title: Vue3+TypeScript 微信小程序分享功能完整教程
category:
  - vue
date: 2025-09-20
---

# Vue3+TypeScript 微信小程序分享功能完整教程

## 📖 概述

本教程详细介绍如何在 Vue3 + TypeScript 微信小程序中实现一套完整、灵活的分享功能系统，支持全局分享配置、页面级分享定制以及朋友圈分享等多种场景。

## ✨ 功能特性

- **🛡️ 类型安全**：完整的 TypeScript 类型定义
- **🌍 全局配置**：支持应用级默认分享设置
- **📄 页面定制**：支持页面级分享内容覆盖
- **📱 多种分享**：支持分享给朋友和朋友圈
- **⚡ 动态参数**：支持动态查询参数构建
- **🎯 Vue3 组合式**：基于 Composition API 设计

## 🔧 核心代码实现

### useShare.ts

```typescript
// =================类型定义=================
export interface ShareData {
  title?: string;
  path?: string;
  imgUrl?: string;
  query?: string;
}

interface PageInstance {
  $vm: {
    shareData?: ShareData;
  };
}

interface WxShareConfig {
  title: string;
  des?: string;
  imgUrl: string;
  link?: string;
}

export interface WxShareInfo {
  title?: string;       // 分享标题
  path?: string;        // 分享路径
  query?: string;       // 分享参数
  imageUrl?: string;    // 分享图片
}

// =================默认配置=================
declare function getCurrentPages(): PageInstance[];
import { ref, onMounted, onActivated } from 'vue';

const defaultShare: WxShareInfo = {
  title: '我的小程序',
  path: '/pages/index/index',
  query: 'from=share',
  imageUrl: '/static/logo.png',
}

// 全局分享数据
const globalShareData = ref<ShareData>({
  title: defaultShare?.title,
  path: defaultShare?.path,
  imgUrl: defaultShare?.imageUrl,
  query: defaultShare?.query,
});

// =================工具函数=================

/**
 * 设置全局分享数据
 */
export const setGlobalShareData = (data: ShareData): void => {
  globalShareData.value = { ...globalShareData.value, ...data };
};

/**
 * 获取全局分享数据
 */
export const getGlobalShareData = (): ShareData => {
  return globalShareData.value;
};

/**
 * 获取当前页面的分享数据
 */
export const getCurrentShareData = (): ShareData => {
  const pages = getCurrentPages();
  const currentPage = pages.at(-1);
  return currentPage?.$vm?.shareData || globalShareData.value || {};
};

/**
 * 构建查询字符串
 */
export const buildQueryString = (queryObj?: Record<string, any>): string => {
  if (!queryObj || typeof queryObj !== 'object') return '';
  
  return Object.entries(queryObj)
    .filter(([_, value]) => value != null)
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join('&');
};

// =================分享方法=================

const onShareAppMessage = (shareInfo: WxShareInfo = {}) => {
  const defaultData = getCurrentShareData();
  const targetShareInfo = { ...defaultData, ...shareInfo }
  return {
    title: targetShareInfo.title,
    path: targetShareInfo.path,
    imageUrl: targetShareInfo.imageUrl,
  };
}

const onShareTimeline = (shareInfo: WxShareInfo = {}) => {
  const defaultData = getCurrentShareData();
  const targetShareInfo = { ...defaultData, ...shareInfo }
  return {
    title: targetShareInfo.title,
    query: `from=timeline`,
    imageUrl: targetShareInfo.imageUrl,
  };
}

/**
 * 页面级分享 Hook
 * @param shareInfo 分享信息，不传递则使用当前页面的分享数据
 */
export const useShareUsePage = (shareInfo: WxShareInfo = {}) => {
  const defaultData = getCurrentShareData();
  const targetShareInfo = { ...defaultData, ...shareInfo }
  console.log('useShare options:', targetShareInfo);
  
  // 兼容Vue3组合式函数，页面需要用 defineOptions({}) 进行包裹
  return {
    onShareAppMessage: () => onShareAppMessage(targetShareInfo),
    onShareTimeline: () => onShareTimeline(targetShareInfo),
  }
}

/**
 * 全局分享 Hook
 * @param app 全局应用实例
 * @param shareInfo 分享信息，不传递则使用当前页面的分享数据
 */
export function useShareUseGlobal(app: any, shareInfo: WxShareInfo = {}) {
  const defaultData = getCurrentShareData();
  const targetShareInfo = { ...defaultData, ...shareInfo }
  
  // 全局注册分享方法
  app.mixin({
    onShareAppMessage() {
      return {
        title: targetShareInfo.title,
        path: targetShareInfo.path,
        imageUrl: targetShareInfo.imageUrl,
      }
    },
    onShareTimeline() {
      return {
        title: targetShareInfo.title,
        query: 'from=timeline',
        imageUrl: targetShareInfo.imageUrl,
      }
    },
  })
}
```

## 🚀 使用方式

### 方式一：全局注册（推荐）

在应用入口文件中进行全局配置：

```typescript
// main.ts 或 app.ts
import { createSSRApp } from 'vue'
import App from './App.vue'
import { useShareUseGlobal } from '@/hooks/useShare'

export function createApp() {
  const app = createSSRApp(App);

  // 设置全局默认分享配置
  useShareUseGlobal(app, {
    title: '🔥 超好用的小程序',
    imageUrl: '/static/share.png',
    // path: '/pages/index/index',  // 不设置则使用默认值
  });

  return {
    app,
  };
}
```

### 方式二：页面级使用

在具体页面中进行个性化分享配置：

```vue
<script setup lang="ts">
import { useShareUsePage } from '@/hooks/useShare'

// 页面级分享配置（会覆盖全局配置）
defineOptions({
  ...useShareUsePage({
    title: '万能工具箱 - 集成上百种实用小工具',
    imageUrl: '/static/tools-share.png',
    query: 'source=tools&version=2.0'
  })
})
</script>

<template>
  <view class="page">
    <!-- 页面内容 -->
  </view>
</template>
```

### 方式三：动态分享数据

在页面中动态设置分享数据：

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useShareUsePage } from '@/hooks/useShare'

const product = ref({
  id: '',
  name: '',
  image: '',
  price: 0
})

onMounted(async () => {
  // 获取商品信息
  const productData = await getProductDetail()
  product.value = productData
})

// 动态商品分享配置
defineOptions({
  ...useShareUsePage({
    get title() {
      return `${product.value.name} - 仅售¥${product.value.price}`
    },
    get imageUrl() {
      return product.value.image
    },
    query: `productId=${product.value.id}&source=share`
  })
})
</script>
```

## 📝 其他使用方式

### 方式四：直接在 setup 中使用

```vue
<script setup lang="ts">
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app"

onLoad(() => {
  // 延迟注册分享逻辑, 避免可能出现“页面注册的比全局早，全局覆盖了页面的”的情况。（或者直接使用settimeout）
  // 直接在 script setup 中使用 onShareAppMessage
onShareAppMessage((res) => {
  console.log('用户点击了分享按钮', res)
  
  return {
    title: '🔥 超好用的小程序',
    path: '/pages/index/index?invite=123',
    imageUrl: '/static/share.png'
  }
})

// 直接使用 onShareTimeline
onShareTimeline(() => {
  console.log('用户分享到朋友圈')
  
  return {
    title: '🔥 超好用的小程序',
    query: 'from=timeline&invite=123',
    imageUrl: '/static/share.png'
  }
})
})    

</script>

<template>
  <view>
    <button open-type="share">分享给好友</button>
    <view class="content">
      <text>页面内容</text>
    </view>
  </view>
</template>
```

### 方式五：使用 Options API

```vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  // 直接在组件选项中定义
  onShareAppMessage(res) {
    console.log('分享事件', res)
    return {
      title: '我的小程序',
      path: '/pages/index/index',
      imageUrl: '/static/logo.png'
    }
  },
  
  onShareTimeline() {
    return {
      title: '我的小程序',
      query: 'from=timeline',
      imageUrl: '/static/logo.png'
    }
  },
  
  setup() {
    // 其他逻辑
    return {}
  }
})
</script>
```

### 方式六：使用 defineOptions（Vue 3.3+）

```vue
<script setup lang="ts">
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app"

// 使用 defineOptions 直接定义分享方法
defineOptions({
  onShareAppMessage(res) {
    console.log('分享事件', res)
    return {
      title: '通过 defineOptions 分享',
      path: '/pages/index/index',
      imageUrl: '/static/logo.png'
    }
  },
  
  onShareTimeline() {
    return {
      title: '通过 defineOptions 分享到朋友圈',
      query: 'from=timeline',
      imageUrl: '/static/logo.png'
    }
  }
})

// 注意：如果同时在 setup 中定义，setup 中的会覆盖 defineOptions 中的
onShareAppMessage((res) => {
  console.log('setup 中的分享', res)
  return {
    title: 'setup 中的分享',
    path: '/pages/index/index',
    imageUrl: '/static/logo.png'
  }
})
</script>
```

## 💡 最佳实践

1. **全局配置优先**：建议使用全局注册方式，保证所有页面都有默认分享功能
2. **页面定制化**：在特殊页面使用页面级配置覆盖全局设置
3. **动态数据处理**：对于商品详情等动态内容，使用 getter 函数获取最新数据
4. **错误处理**：在分享方法中添加适当的错误处理逻辑
5. **图片优化**：确保分享图片尺寸适合各个平台显示

## 🎉 总结

通过本教程，你已经掌握了在 Vue3 + TypeScript 微信小程序中实现完整分享功能的方法。这套方案具有以下优势：

- **🛡️ 类型安全**：完整的 TypeScript 支持
- **⚙️ 灵活配置**：支持全局和页面级配置
- **🔧 易于维护**：清晰的架构和代码组织
- **🚀 扩展性强**：可根据需求轻松扩展功能

现在你可以在项目中使用这套分享系统，为用户提供更好的分享体验！