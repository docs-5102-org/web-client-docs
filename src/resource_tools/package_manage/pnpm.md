---
title: pnpm 极简上手
category:
  - 包管理器
tag:
  - pnpm
---

# pnpm 极简上手

官方文档：<https://www.pnpm.cn>

---

## 1. 全局存储目录

pnpm 会把所有下载过的包**硬链接**到同一处全局仓库，默认放在 **当前盘根目录下的 `.pnpm-store`**，C 盘爆红患者建议立即迁移：

```bash
# 把仓库搬到 D 盘，以后任何项目都复用这份存储
pnpm config set store-dir D:/SoftWare/node-pro --global
```

