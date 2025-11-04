---
title: Next.js 环境变量配置完整指南
category:
  - react
  - Next.js
---

# Next.js 环境变量配置完整指南

## 📋 目录

1. [环境变量文件类型](#环境变量文件类型)
2. [加载优先级](#加载优先级)
3. [环境变量类型](#环境变量类型)
4. [使用方法](#使用方法)
5. [最佳实践](#最佳实践)
6. [常见场景](#常见场景)

---

## 环境变量文件类型

Next.js 支持以下环境变量文件：

| 文件名 | 说明 | 是否提交到 Git |
|--------|------|----------------|
| `.env` | 所有环境的默认配置 | ✅ 可以提交 |
| `.env.local` | 本地覆盖配置（所有环境） | ❌ 不提交 |
| `.env.development` | 开发环境专用 | ✅ 可以提交 |
| `.env.development.local` | 开发环境本地覆盖 | ❌ 不提交 |
| `.env.production` | 生产环境专用 | ✅ 可以提交 |
| `.env.production.local` | 生产环境本地覆盖 | ❌ 不提交 |
| `.env.test` | 测试环境专用 | ✅ 可以提交 |
| `.env.test.local` | 测试环境本地覆盖 | ❌ 不提交 |

---

## 加载优先级

Next.js 按以下顺序加载环境变量（**优先级从高到低**）：

```
1. process.env（系统环境变量）
2. .env.$(NODE_ENV).local
3. .env.local（当 NODE_ENV=test 时不加载）
4. .env.$(NODE_ENV)
5. .env
```

### 示例说明

假设 `NODE_ENV=development`，同一个变量 `API_URL` 在多个文件中定义：

```bash
# .env
API_URL=https://api.example.com

# .env.development
API_URL=https://dev-api.example.com

# .env.development.local
API_URL=http://localhost:8000
```

**最终使用的值**：`http://localhost:8000`（来自 `.env.development.local`）

---

## 环境变量类型

### 1. 服务端环境变量

**默认情况**，所有环境变量只在服务端可用：

```bash
# .env
DATABASE_URL=postgresql://user:pass@localhost:5432/db
API_SECRET=my-secret-key
```

```typescript
// ✅ 服务端可用
export async function getServerSideProps() {
  const dbUrl = process.env.DATABASE_URL; // ✅ 有值
  return { props: {} };
}

// ❌ 客户端不可用
export default function Page() {
  console.log(process.env.DATABASE_URL); // ❌ undefined
}
```

### 2. 客户端环境变量

使用 `NEXT_PUBLIC_` 前缀暴露给浏览器：

```bash
# .env
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

```typescript
// ✅ 服务端和客户端都可用
export default function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // ✅ 有值
  
  return <div>API: {apiUrl}</div>;
}
```

⚠️ **重要提示**：
- `NEXT_PUBLIC_` 变量会被内联到 JavaScript bundle 中
- 构建时确定，运行时无法修改
- 不要在其中放置敏感信息！

---

## 使用方法

### 在代码中使用

```typescript
// app/page.tsx 或 pages/index.tsx

// 服务端组件 (App Router)
export default async function Page() {
  const secret = process.env.API_SECRET;          // 仅服务端
  const publicUrl = process.env.NEXT_PUBLIC_URL;  // 服务端+客户端
  
  return <div>...</div>;
}

// 客户端组件
'use client'
export default function ClientComponent() {
  // ❌ 无法访问普通环境变量
  const secret = process.env.API_SECRET;  // undefined
  
  // ✅ 可以访问 NEXT_PUBLIC_ 变量
  const url = process.env.NEXT_PUBLIC_URL;  // 有值
}
```

### 在 API Routes 中使用

```typescript
// app/api/data/route.ts
export async function GET() {
  const dbUrl = process.env.DATABASE_URL;  // ✅ 可用
  
  // 连接数据库...
  
  return Response.json({ data: [] });
}
```

### 在配置文件中使用

```typescript
// next.config.ts
const nextConfig = {
  env: {
    // 显式暴露变量（不推荐，使用 NEXT_PUBLIC_ 更好）
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // 服务端运行时配置
  serverRuntimeConfig: {
    apiSecret: process.env.API_SECRET,
  },
  
  // 公共运行时配置
  publicRuntimeConfig: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
```

---

## 最佳实践

### 1. 文件组织建议

```plaintext
项目根目录/
├── .env                      # 默认配置（提交）
├── .env.local               # 本地覆盖（不提交）
├── .env.example             # 配置模板（提交）
└── .gitignore               # 忽略 *.local 文件
```

**`.env.example` 示例**：
```bash
# 数据库配置
DATABASE_URL=postgresql://user:pass@localhost:5432/db

# API 配置
API_SECRET=your-secret-here
NEXT_PUBLIC_API_URL=https://api.example.com

# 第三方服务
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
```

### 2. .gitignore 配置

```gitignore
# 环境变量
.env*.local
.env.local

# 不要忽略这些
!.env.example
```

### 3. 命名规范

```bash
# ✅ 推荐
DATABASE_URL=...
NEXT_PUBLIC_API_URL=...
STRIPE_SECRET_KEY=...

# ❌ 不推荐
databaseUrl=...              # 应该用大写
NEXT_PUBLIC_secret=...      # 敏感信息不要用 NEXT_PUBLIC_
```

### 4. 类型安全（TypeScript）

创建 `env.d.ts`：

```typescript
// env.d.ts
namespace NodeJS {
  interface ProcessEnv {
    // 服务端变量
    DATABASE_URL: string;
    API_SECRET: string;
    
    // 客户端变量
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_GA_ID: string;
    
    // Node.js 内置
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
```

使用 Zod 验证：

```typescript
// lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  API_SECRET: z.string().min(32),
  NEXT_PUBLIC_API_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
```

---

## 常见场景

### 场景 1：多环境 API 配置

```bash
# .env.development
NEXT_PUBLIC_API_URL=http://localhost:8000
DATABASE_URL=postgresql://localhost:5432/dev_db

# .env.production
NEXT_PUBLIC_API_URL=https://api.production.com
DATABASE_URL=postgresql://prod-server:5432/prod_db

# .env.test
NEXT_PUBLIC_API_URL=http://localhost:8000
DATABASE_URL=postgresql://localhost:5432/test_db
```

### 场景 2：本地开发覆盖

```bash
# .env.local（不提交到 Git）
DATABASE_URL=postgresql://localhost:5432/my_local_db
API_SECRET=local-development-secret
NEXT_PUBLIC_DEBUG=true
```

### 场景 3：Docker 部署

```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

# 复制环境变量模板
COPY .env.example .env

# 构建时可以传入变量
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

CMD ["node", "server.js"]
```

```bash
# 构建时传入变量
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://api.production.com \
  -t myapp .

# 运行时传入变量
docker run \
  -e DATABASE_URL=postgresql://... \
  -e API_SECRET=... \
  myapp
```

### 场景 4：Vercel 部署

在 Vercel 仪表板中设置：

1. 进入项目 Settings → Environment Variables
2. 添加变量：
   - `DATABASE_URL` → Production
   - `API_SECRET` → Production
   - `NEXT_PUBLIC_API_URL` → Production

或使用 `vercel.json`：

```json
{
  "env": {
    "NEXT_PUBLIC_API_URL": "https://api.example.com"
  }
}
```

### 场景 5：动态运行时配置

对于需要运行时修改的配置（不推荐用于敏感信息）：

```typescript
// app/api/config/route.ts
export async function GET() {
  return Response.json({
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    version: process.env.APP_VERSION,
  });
}

// 客户端
const config = await fetch('/api/config').then(r => r.json());
```

---

## 常见问题

### Q1: 为什么我的环境变量是 undefined？

**原因**：
- 忘记加 `NEXT_PUBLIC_` 前缀（客户端使用）
- 没有重启开发服务器
- 环境变量文件拼写错误

**解决**：
```bash
# 1. 检查前缀
NEXT_PUBLIC_API_URL=...  # 客户端需要

# 2. 重启开发服务器
npm run dev

# 3. 检查文件名
.env.development  # ✅
.env.dev          # ❌ 错误
```

### Q2: 构建后环境变量不生效？

`NEXT_PUBLIC_` 变量在**构建时**内联，运行时无法修改。

```bash
# ❌ 错误：构建后再改变量
npm run build
NEXT_PUBLIC_API_URL=new-url npm start  # 不生效！

# ✅ 正确：构建前设置
NEXT_PUBLIC_API_URL=new-url npm run build
npm start
```

### Q3: 如何在 standalone 模式中使用环境变量？

```bash
# 构建
npm run build

# 运行时传入变量
cd .next/standalone
DATABASE_URL=... API_SECRET=... node server.js
```

---

## 安全检查清单

- [ ] 敏感信息不使用 `NEXT_PUBLIC_` 前缀
- [ ] `.env*.local` 文件已加入 `.gitignore`
- [ ] 提供了 `.env.example` 作为模板
- [ ] 生产环境变量通过 CI/CD 或平台管理
- [ ] API 密钥、数据库密码等不提交到代码库
- [ ] 使用 TypeScript 类型检查环境变量

---

## 参考资源

- [Next.js 官方文档 - Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Vercel 环境变量指南](https://vercel.com/docs/concepts/projects/environment-variables)
- [dotenv 文档](https://github.com/motdotla/dotenv)