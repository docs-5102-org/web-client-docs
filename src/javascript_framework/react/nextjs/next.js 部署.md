---
title: Next.js 部署
category:
  - react
  - Next.js
---

# Next.js 部署


## Next.js 的三种运行模式

| 模式   | 命令                          | 是否需要 `.next` | 说明                   |
| ---- | --------------------------- | ------------ | -------------------- |
| 开发模式 | `npm run dev`               | ❌ 不需要        | 实时编译，源码直接运行，热更新      |
| 构建模式 | `npm run build`             | ✅ 生成 `.next` | 把源码编译、打包到 `.next`    |
| 生产模式 | `npm start`（或 `next start`） | ✅ 使用 `.next` | **运行的是编译产物，而不是源码文件** |


### 运行原理

如果你执行的是：

```bash
npm run dev
```

那确实是直接运行源码。它不会用 `.next`。

当你执行：

```bash
npm run build
npm start
```

Next.js 做了两步：

#### **1️⃣ build 阶段**

执行 `next build` 时：

* 你的 `pages/` 或 `app/` 目录会被编译；
* React 组件转为服务器可执行的 JS 模块；
* 生成静态 HTML 文件（SSG）；
* 打包输出放在 `.next/` 目录中。

也就是说：

```
.next/
 ├── server/      ← 服务端渲染生成的模块
 ├── static/      ← 前端静态资源
 ├── build-manifest.json
 ├── routes-manifest.json
 └── ...
```

---

#### **2️⃣ start 阶段**

当你执行：

```bash
npm start
```

实际上是调用：

```bash
next start
```

Next.js 启动一个 **轻量的 Node.js 服务器**（基于 Express-like 机制），它会：

* 读取 `.next/server` 中的编译结果；
* 根据路由表（`routes-manifest.json`）匹配请求；
* 如果页面是 SSR（Server Side Rendering），动态调用 `.next/server/app/xxx.js`；
* 如果是 SSG（静态生成），直接返回 `.next/static` 中的 HTML；
* 如果是 API Route，则执行 `.next/server/pages/api/...js`。

✅ **所以生产模式下的运行逻辑完全基于 `.next` 文件夹，不再直接使用源码。**


## 📦 Next.js 服务端打包输出

### 默认构建模式

执行 `npm build 或 pnpm build` 后，`.next/` 目录结构：

```bash
.next/
├── cache/                              # 构建缓存目录
│   ├── webpack/                        # Webpack 缓存
│   └── swc/                            # SWC 编译器缓存
│
├── server/                             # 服务端代码 ⭐ 核心
│   ├── app/                            # App Router 服务端代码
│   │   ├── page.js                     # 首页服务端组件
│   │   ├── layout.js                   # 根布局服务端组件
│   │   ├── dashboard/                  # Dashboard 路由
│   │   └── api/                        # API 路由处理器
│   ├── chunks/                         # 服务端代码分块
│   │   └── [hash].js                   # 共享代码块
│   └── pages/                          # Pages Router 代码（如果使用）
│       └── _app.js
│
├── static/                             # 静态资源 ⭐ 核心
│   ├── chunks/                         # JavaScript 代码块
│   │   ├── app/                        # App Router 客户端代码
│   │   ├── pages/                      # Pages Router 客户端代码
│   │   ├── webpack-[hash].js           # Webpack 运行时
│   │   └── main-[hash].js              # 主入口文件
│   ├── css/                            # 编译后的 CSS
│   │   └── [hash].css                  # 样式文件（带内容哈希）
│   ├── media/                          # 媒体资源
│   │   ├── [hash].woff2                # 字体文件
│   │   └── [hash].png                  # 图片文件
│   └── [BUILD_ID]/                     # 构建 ID 目录
│       └── _buildManifest.js
│
├── types/                              # TypeScript 类型定义
│   ├── app-route.d.ts                  # App Router 路由类型
│   ├── link.d.ts                       # Link 组件类型
│   └── package.json
│
├── trace                               # OpenTelemetry 追踪文件
│
├── app-build-manifest.json             # App Router 构建清单
├── app-path-routes-manifest.json       # App Router 路径映射
├── BUILD_ID                            # 构建唯一标识符
├── build-manifest.json                 # Pages Router 构建清单
├── export-marker.json                  # 静态导出标记
├── images-manifest.json                # 图片优化配置
├── next-minimal-server.js.nft.json     # 最小服务器文件追踪
├── next-server.js.nft.json             # 完整服务器文件追踪
├── package.json                        # 模块类型声明
├── prerender-manifest.json             # 预渲染清单（SSG/ISR）
├── react-loadable-manifest.json        # React 动态加载清单
├── required-server-files.json          # 服务器必需文件列表
└── routes-manifest.json                # 路由配置总清单
```

**⚠️ 注意：** 默认模式下**没有** `server.js`，需要使用 `pnpm start` 启动，它会调用 Next.js 编译后的内置服务器。

------

## 🎯 Standalone 模式（推荐生产环境）

### 启用 Standalone 输出

要生成 `server.js`，需要在配置中启用：

```javascript
// next.config.js
module.exports = {
  output: 'standalone', // 👈 关键配置
}
```

### 打包后的输出结构

```bash
.next/
├── standalone/               # 🎯 独立运行包
│   ├── server.js            # ✅ 服务器入口文件
│   ├── package.json
│   ├── node_modules/        # 只包含必需的依赖
│   └── .next/               # 精简的构建输出
│       ├── server/
│       └── package.json
└── static/                   # 静态资源（需手动复制）
    ├── _next/
    └── media/
```

------

## 🚀 Standalone 模式部署流程

### 1️⃣ 完整部署步骤

```bash
# === 本地构建 ===
pnpm build

# === 准备部署文件 ===
# 需要上传到服务器的文件：
# 1. .next/standalone/          （包含 server.js）
# 2. .next/static/              （静态资源）
# 3. public/                    （公共资源）

# === 在服务器上 ===
# 目录结构应该是：
# /app/
# ├── server.js
# ├── .next/
# │   ├── static/       # 从 .next/static/ 复制
# │   └── server/
# ├── public/           # 从项目根目录复制
# └── node_modules/
```

需要额外的复制项目根目录下的 `public`、`.next/static`静态目录到`.next/standalone`文件夹中，具体如下：
```bash
cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/
```

> [官网说明](https://nextjs.org/docs/app/api-reference/config/next-config-js/output#automatically-copying-traced-files)

### 2️⃣ 启动服务器

```bash
# 方式 1：直接运行
node server.js

# 方式 2：指定端口
PORT=3000 node server.js

# 方式 3：使用环境变量
NODE_ENV=production PORT=8080 node server.js
```

### 3️⃣ 使用 PM2 管理进程

```bash
# 安装 PM2
npm install -g pm2

# 启动应用
pm2 start server.js --name "my-app"

# 或使用配置文件
# ecosystem.config.js
module.exports = {
  apps: [{
    name: 'my-nextjs-app',
    script: './server.js',
    instances: 'max',      // 使用所有 CPU 核心
    exec_mode: 'cluster',  // 集群模式
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}

# 启动
pm2 start ecosystem.config.js --env production
```

------

## 🐳 Docker 部署（Standalone 模式）

### Dockerfile 示例

```dockerfile
# 精简镜像需要额外的安装工具包
# FROM node:20-alpine AS base
# 建议使用这个镜像提前拉取方便部署
FROM node:22-bookworm AS base

# 仅在需要时安装依赖项
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# node:20-alpine 镜像下需要额外安装的工具包-较慢
# RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 在这里修复 better-sqlite3, 需要额外的安装依赖包[可选]
RUN if [ -f pnpm-lock.yaml ]; then \
      cd node_modules/.pnpm/better-sqlite3@12.4.1/node_modules/better-sqlite3 \
      && pnpm install \
      && cd ../../../../; \
    fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  universal-toolbox-web:
    build:
      context: .
      dockerfile: Dockerfile
      target: runner # 使用构建阶段 'runner'
    container_name: universal-toolbox-web
    restart: unless-stopped
    ports:
      - "3001:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - HOSTNAME=0.0.0.0
      # 添加其他环境变量
      # - DATABASE_URL=postgresql://user:password@db:5432/dbname
      # - NEXT_PUBLIC_API_URL=http://localhost:3000/api
    # volumes:
      # 如果需要持久化数据，可以添加卷映射
      # - ./data:/app/data
    networks:
      - 1panel-network
    # depends_on:
      # 如果有数据库等依赖服务
      # - db

  # 可选：添加数据库服务
  # db:
  #   image: postgres:15-alpine
  #   container_name: postgres-db
  #   restart: unless-stopped
  #   environment:
  #     - POSTGRES_USER=user
  #     - POSTGRES_PASSWORD=password
  #     - POSTGRES_DB=dbname
  #   ports:
  #     - "5432:5432"
  #   volumes:
  #     - postgres-data:/var/lib/postgresql/data
  #   networks:
  #     - app-network

  # 可选：添加 Redis 服务
  # redis:
  #   image: redis:7-alpine
  #   container_name: redis-cache
  #   restart: unless-stopped
  #   ports:
  #     - "6379:6379"
  #   volumes:
  #     - redis-data:/data
  #   networks:
  #     - 1panel-network

networks:
  1panel-network:
    external: true

# volumes:
  # postgres-data:
  # redis-data:
```

> [官方Docker部署模版](https://github.com/vercel/next.js/tree/canary/examples/with-docker)

------

## 🔄 两种模式对比

| 特性       | 默认模式          | Standalone 模式      |
| ---------- | ----------------- | -------------------- |
| 启动命令   | `npm start`       | `node server.js`     |
| 依赖大小   | 完整 node_modules | 只包含必需依赖       |
| 部署复杂度 | 需要完整项目结构  | 只需 standalone 目录 |
| 镜像大小   | 较大（~500MB+）   | 较小（~100-200MB）   |
| 推荐场景   | 开发测试          | **生产环境** ✅       |

------

## ⚙️ 针对项目（SQLite）的特殊配置

### 确保数据库文件正确打包

```javascript
// next.config.js
module.exports = {
  output: 'standalone',
  
  // 如果 SQLite 文件在项目目录
  experimental: {
    outputFileTracingIncludes: {
      '/': ['./database.sqlite', './data/**/*'],
    },
  },
}
```

### 部署时的数据库路径

```javascript
// lib/database.ts
import path from 'path';

// 生产环境使用绝对路径
const dbPath = process.env.NODE_ENV === 'production'
  ? path.join(process.cwd(), 'data', 'database.sqlite')
  : './database.sqlite';

const db = new Database(dbPath);
```

### Docker 中持久化 SQLite

```yaml
# docker-compose.yml
volumes:
  - ./data:/app/data           # 数据库文件
  - ./uploads:/app/public/uploads  # 上传文件（如果有）
```

------

## 📋 部署检查清单

```bash
# ✅ 1. 启用 standalone 模式
# next.config.js 中设置 output: 'standalone'

# ✅ 2. 构建项目
pnpm build

# ✅ 3. 准备部署文件
cp -r .next/standalone/* /deploy/
cp -r .next/static /deploy/.next/
cp -r public /deploy/

# ✅ 4. 测试 server.js
cd /deploy
node server.js

# ✅ 5. 访问测试
curl http://localhost:3000

# ✅ 6. 配置进程管理
pm2 start server.js --name my-app

# ✅ 7. 配置反向代理（Nginx）
# 见之前的 Nginx 配置
```

------

## 项目部署的完整配置

```ts
import type { NextConfig } from 'next';

// Define the base Next.js configuration
const baseConfig: NextConfig = {
  // 独立运行的输出模式
  output: 'standalone',
  // # ESLint 在构建时忽略错误
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 在生产环境中移除 console 语句，保留 error 和 warn
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'], // 保留 console.error 和 console.warn
    } : false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.slingacademy.com',
        port: ''
      }
    ]
  },
  transpilePackages: ['geist'],
  // 添加代理配置
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:9100/api/:path*',
      },
       {
        source: '/m/api/:path*',
        destination: 'http://localhost:8000/api/:path*',
      },
    ];
  }
};

const nextConfig = baseConfig;
export default nextConfig;

```

---

## 🎯 总结

1. **默认模式**：没有 `server.js`，使用 `npm start` 启动
2. **Standalone 模式**（推荐）：生成独立的 `server.js`，包含所有必需依赖
3. **配置方式**：在 `next.config.js` 中设置 `output: 'standalone'`
4. **部署优势**：镜像更小、依赖更少、启动更快
5. **SQLite 项目**：注意数据库文件路径和持久化配置

**强烈建议使用 Standalone 模式 + Docker 部署**，这样可以确保 SQLite 数据库文件的正确管理和持久化！