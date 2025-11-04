---
title: Next.js 路由教程
category:
  - react
  - Next.js
---


# Next.js 路由教程

## 📂 `[[...sign-in]]` 路由语法解析

### 基础概念

这是 **Next.js App Router** 中的 **可选 Catch-All 路由（Optional Catch-All Routes）** 语法。

### 📖 命名规则对比

| 语法 | 名称 | 匹配规则 | 示例 |
|------|------|----------|------|
| `sign-in/page.tsx` | 普通路由 | 只匹配 `/sign-in` | `/sign-in` ✅<br>`/sign-in/callback` ❌ |
| `[slug]/page.tsx` | 动态路由 | 匹配单层动态参数 | `/abc` ✅<br>`/123` ✅<br>`/abc/def` ❌ |
| `[...slug]/page.tsx` | Catch-All 路由（必需） | 匹配所有子路径，**至少一层** | `/sign-in` ✅<br>`/sign-in/callback` ✅<br>`/sign-in/sso/google` ✅<br>但 `/` ❌（不匹配根路径） |
| `[[...slug]]/page.tsx` | 可选 Catch-All 路由 | 匹配所有子路径，**包括零层** | `/` ✅<br>`/sign-in` ✅<br>`/sign-in/callback` ✅<br>`/sign-in/sso/google` ✅ |

### 🎯 `[[...sign-in]]` 的具体含义

```
src/app/auth/sign-in/[[...sign-in]]/page.tsx
```

这个路由可以匹配：

```
✅ /auth/sign-in
✅ /auth/sign-in/
✅ /auth/sign-in/callback
✅ /auth/sign-in/sso-callback
✅ /auth/sign-in/verify
✅ /auth/sign-in/factor-one
✅ /auth/sign-in/factor-two
✅ /auth/sign-in/any/nested/path
```

### 🔍 为什么 Clerk 需要这种路由？

Clerk 的认证组件内部会处理多个不同的子路径：

```
/auth/sign-in                    # 主登录页
/auth/sign-in/sso-callback       # SSO 回调
/auth/sign-in/verify             # 验证页面
/auth/sign-in/factor-one         # 双因素认证第一步
/auth/sign-in/factor-two         # 双因素认证第二步
/auth/sign-in/choose-strategy    # 选择登录方式
```

**如果使用普通路由：**
```typescript
// ❌ 只能匹配 /auth/sign-in
src/app/auth/sign-in/page.tsx

// 访问 /auth/sign-in/callback 会 404
```

**使用 Catch-All 路由：**
```typescript
// ✅ 可以匹配所有 /auth/sign-in/* 路径
src/app/auth/sign-in/[[...sign-in]]/page.tsx
```

### 📝 在组件中获取路径参数

如果你需要知道具体访问的是哪个子路径：

```typescript
// src/app/auth/sign-in/[[...sign-in]]/page.tsx

export default function SignInPage({ 
  params 
}: { 
  params: { 'sign-in': string[] } 
}) {
  console.log(params);
  
  // 访问 /auth/sign-in
  // params = { 'sign-in': undefined }
  
  // 访问 /auth/sign-in/callback
  // params = { 'sign-in': ['callback'] }
  
  // 访问 /auth/sign-in/sso/google
  // params = { 'sign-in': ['sso', 'google'] }
  
  return <SignIn />;
}
```

### 🔄 其他路由语法示例

#### 1. 动态路由 `[id]`
```
src/app/product/[id]/page.tsx

匹配:
✅ /product/123
✅ /product/abc
❌ /product/123/edit  (不匹配子路径)
```

#### 2. 必需的 Catch-All `[...slug]`
```
src/app/blog/[...slug]/page.tsx

匹配:
✅ /blog/2024
✅ /blog/2024/10
✅ /blog/2024/10/07/my-post
❌ /blog  (必须至少有一层)
```

#### 3. 可选的 Catch-All `[[...slug]]`
```
src/app/docs/[[...slug]]/page.tsx

匹配:
✅ /docs  (空路径也匹配)
✅ /docs/getting-started
✅ /docs/api/reference/auth
```

### 🎨 实际应用场景

#### 场景 1: 文档系统
```
src/app/docs/[[...slug]]/page.tsx

可以处理:
/docs                    # 文档首页
/docs/introduction       # 介绍
/docs/api/auth          # API 文档
/docs/guides/setup/db   # 指南
```

#### 场景 2: 多语言路由
```
src/app/[locale]/[[...slug]]/page.tsx

可以处理:
/en                     # 英文首页
/en/about              # 英文关于页
/zh                    # 中文首页
/zh/about              # 中文关于页
```

#### 场景 3: 商品分类
```
src/app/shop/[[...category]]/page.tsx

可以处理:
/shop                          # 所有商品
/shop/electronics             # 电子产品
/shop/electronics/phones      # 手机
/shop/electronics/phones/iphone  # iPhone
```

### 💡 快速记忆

```
[]          → 单层动态       [id]
[...]       → 多层必需       [...path]  (至少1层)
[[...]]     → 多层可选       [[...path]]  (0层或多层)
```

### ⚠️ 注意事项

1. **文件夹名称中的参数名可以自定义**
   ```
   [[...sign-in]]   ✅
   [[...slug]]      ✅
   [[...params]]    ✅
   ```

2. **参数名会作为 props 的 key**
   ```typescript
   // [[...sign-in]]/page.tsx
   params: { 'sign-in': string[] }
   
   // [[...slug]]/page.tsx
   params: { slug: string[] }
   ```

3. **可选的 Catch-All 会匹配父路径**
   ```
   [[...slug]]/page.tsx  会匹配父目录本身
   [...slug]/page.tsx    不会匹配父目录
   ```

### 📚 相关文档

- [Next.js Routing - Optional Catch-all Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#optional-catch-all-segments)
- [Clerk Next.js 路由配置](https://clerk.com/docs/quickstarts/nextjs)

---

**总结：**
- `[[...sign-in]]` = "可选的捕获所有子路径"
- 这样 Clerk 可以在一个页面组件中处理所有认证相关的路径
- 不需要为每个子路径创建单独的页面文件


## Next.js 目前**强烈推荐使用 App Router**（`app` 目录），这是 Next.js 13+ 引入的新架构。三种方式对比

### 1. **App Router (`app` 目录)** ⭐ 推荐
```
app/
├── page.tsx          # 首页
├── layout.tsx        # 根布局
├── dashboard/
│   └── page.tsx      # /dashboard 页面
└── blog/
    └── [slug]/
        └── page.tsx  # /blog/[slug] 动态路由
```

**优势：**
- ✅ React Server Components（服务端组件）
- ✅ 流式渲染和 Suspense
- ✅ 更好的数据获取方式
- ✅ 内置 loading.tsx、error.tsx
- ✅ 更灵活的布局系统
- ✅ 这是未来的方向

### 2. **Pages Router (`pages` 目录)** 🔧 传统方式
```
pages/
├── index.tsx         # 首页
├── _app.tsx          # 全局 App
├── dashboard.tsx     # /dashboard 页面
└── blog/
    └── [slug].tsx    # /blog/[slug] 动态路由
```

**特点：**
- 📦 Next.js 12 及之前的默认方式
- 📦 仍然被支持，但不会有新功能
- 📦 适合旧项目维护

### 3. **混合使用** ⚠️ 过渡期
可以同时使用 `app` 和 `pages`，但：
- `app` 路由优先级更高
- 不推荐长期混用
- 仅适合逐步迁移场景

## 官方推荐

Next.js 官方明确推荐：

> **新项目直接使用 App Router**

- 文档首页默认展示 App Router
- 所有新特性只在 App Router 中提供
- Pages Router 进入维护模式

## 我的建议

| 场景 | 推荐方案 |
|------|---------|
| 🆕 新项目 | **App Router** - 毫无疑问 |
| 🔄 现有项目（Pages Router） | 暂时保持，根据需要逐步迁移 |
| 📚 学习 Next.js | **优先学习 App Router** |
| 🏢 生产环境 | App Router 已经稳定可用（Next.js 14+） |

## 快速示例对比

**App Router 写法：**
```tsx
// app/dashboard/page.tsx
export default async function DashboardPage() {
  const data = await fetch('...'); // 直接在组件中获取数据
  return <div>Dashboard</div>;
}
```

**Pages Router 写法：**
```tsx
// pages/dashboard.tsx
export async function getServerSideProps() {
  const data = await fetch('...');
  return { props: { data } };
}

export default function DashboardPage({ data }) {
  return <div>Dashboard</div>;
}
```

**结论：直接用 `app` 目录的 App Router！** 🚀