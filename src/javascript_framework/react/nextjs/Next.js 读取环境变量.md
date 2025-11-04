---
title: Next.js 读取环境变量完整指南
category:
  - react
  - Next.js
---

# Next.js 读取环境变量完整指南

## 📋 环境变量类型

Next.js 中的环境变量分为两类：

### 1. **服务端环境变量** （默认）
```typescript
// 只能在服务端（Server Components、API Routes）访问
process.env.DATABASE_URL
process.env.CLERK_SECRET_KEY
process.env.API_SECRET
```

### 2. **客户端环境变量**（需要 `NEXT_PUBLIC_` 前缀）
```typescript
// 可以在浏览器端访问
process.env.NEXT_PUBLIC_APP_NAME
process.env.NEXT_PUBLIC_API_KEY
process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
```

## 📁 环境变量文件

Next.js 按优先级读取以下文件：

```bash
.env.local          # 本地开发（不提交到 Git，优先级最高）
.env.development    # 开发环境
.env.production     # 生产环境
.env                # 所有环境的默认值
.env.example        # 示例模板（不会被读取）
```

**推荐配置：**
```bash
# .env.example - 提交到 Git 作为示例
NEXT_PUBLIC_APP_NAME=My Dashboard
NEXT_PUBLIC_API_URL=http://localhost:3000
DATABASE_URL=./data/app.db

# .env.local - 不提交，包含真实密钥
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx
CLERK_SECRET_KEY=sk_live_xxxxx
```

## 🔧 使用方法

### 1️⃣ **在 Server Components 中**（推荐）

```typescript
// src/app/page.tsx
export default function HomePage() {
  // ✅ 可以读取所有环境变量
  const dbUrl = process.env.DATABASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  
  return <div>App: {process.env.NEXT_PUBLIC_APP_NAME}</div>;
}
```

### 2️⃣ **在 Client Components 中**

```typescript
// src/components/my-component.tsx
'use client';

export default function MyComponent() {
  // ✅ 只能读取 NEXT_PUBLIC_ 开头的
  const appName = process.env.NEXT_PUBLIC_APP_NAME;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  // ❌ 客户端无法访问（返回 undefined）
  const secretKey = process.env.CLERK_SECRET_KEY;
  
  return <div>{appName}</div>;
}
```

### 3️⃣ **在 API Routes 中**

```typescript
// src/app/api/users/route.ts
export async function GET() {
  // ✅ 可以读取所有环境变量
  const dbUrl = process.env.DATABASE_URL;
  const secretKey = process.env.API_SECRET;
  
  return Response.json({ data: [] });
}
```

### 4️⃣ **在工具函数中（如您的项目）**

从您的项目代码 `src/lib/request.ts` 可以看到：

```typescript:61:61:src/lib/request.ts
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
```

**使用场景：**
```typescript
// src/lib/request.ts
class RequestClient {
  private requestInterceptor(url: string, config: RequestConfig) {
    const token = localStorage.getItem('token');
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;  // ✅ 客户端可访问
    
    const headers = new Headers(config.headers);
    if (apiKey) {
      headers.set('X-API-KEY', apiKey);
    }
    
    return { ...config, headers };
  }
}
```

## 🎯 项目实际示例

根据您的项目配置 `bin/config-handler.js`，生成的 `.env.example`：

```env
# 应用配置（客户端可见）
NEXT_PUBLIC_APP_NAME=Fast Dashboard
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Clerk 认证配置
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
CLERK_SECRET_KEY=your_secret_key_here  # ⚠️ 仅服务端
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/sign-in
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard

# 数据库配置（仅服务端）
DATABASE_URL=./data/app.db
```

## ⚠️ 重要注意事项

### 1. **构建时绑定**
```typescript
// ❌ 错误：动态拼接不会工作
const key = process.env[`NEXT_PUBLIC_${dynamicName}`];

// ✅ 正确：直接引用
const key = process.env.NEXT_PUBLIC_API_KEY;
```

### 2. **客户端暴露风险**
```env
# ❌ 危险：密钥暴露给浏览器
NEXT_PUBLIC_SECRET_KEY=sk_live_xxxxx

# ✅ 安全：密钥只在服务端
SECRET_KEY=sk_live_xxxxx
```

### 3. **需要重启开发服务器**
```bash
# 修改 .env.local 后必须重启
pnpm dev
```

### 4. **TypeScript 类型定义**（可选）

```typescript
// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_APP_NAME: string;
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
    CLERK_SECRET_KEY: string;
    DATABASE_URL: string;
  }
}
```

## 📊 环境变量访问权限表

| 位置 | 服务端变量 | NEXT_PUBLIC_ 变量 |
|------|-----------|-------------------|
| Server Components | ✅ | ✅ |
| Client Components | ❌ | ✅ |
| API Routes | ✅ | ✅ |
| Middleware | ✅ | ✅ |
| next.config.ts | ✅ | ✅ |

## 🔍 调试技巧

```typescript
// 开发环境打印所有 NEXT_PUBLIC_ 变量
if (process.env.NODE_ENV === 'development') {
  console.log('环境变量：', {
    appName: process.env.NEXT_PUBLIC_APP_NAME,
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
  });
}
```

## 📚 相关文档

- 您的项目配置：`bin/config-handler.js` (第 59-92 行)
- Clerk 配置示例：`docs/auth/clerk.md`
- 官方文档：https://nextjs.org/docs/app/building-your-application/configuring/environment-variables

