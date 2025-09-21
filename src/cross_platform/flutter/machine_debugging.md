---
title: 真机调试
category:
  - 跨平台框架
tag:
  - flutter
order: 3
---

# Flutter Android/iOS 手机真机调试完整指南

## 一、真机投屏控制工具

### 1. Vysor（推荐）

**官网：** https://www.vysor.io/

**特点优势：**
- 极强的跨平台性能，支持 Mac、Windows、Linux 系统
- 免费使用
- 无需 Android 系统 Root 即可实现电脑控制 Android 设备
- 支持局域网和数据线连接

**使用方法：**

#### 方法一：Windows 客户端（推荐）
- 直接下载 Windows 客户端安装包
- 安装后运行，界面简洁易用
- 可通过局域网或数据线连接 Android 设备实现投屏控制

#### 方法二：Chrome 浏览器
- 方式1：访问官网 Download 页面，点击 Browser 直接跳转到浏览器操作界面
- 方式2：在 Chrome 网上应用店搜索 Vysor 安装插件（需要科学上网）
- Chrome 插件地址：https://chrome.google.com/webstore/detail/vysor/gidgenkbbabolejbgbpnhbimgjbffefm

### 2. scrcpy（开源推荐）

**官网：** https://github.com/Genymobile/scrcpy/releases

**特点优势：**
- 完全开源免费
- 性能优秀，延迟低
- 支持多种操作系统
- 功能强大，支持录屏、文件传输等

**参考教程：** https://blog.csdn.net/was172/article/details/99705855

### 3. Total Control

**官网：** http://tc.sigma-rt.com.cn/

**特点：**
- 国产软件
- 免费使用
- 界面中文化

### 4. 其他工具
- **360助手**：功能全面的手机管理工具
- **迅捷助手**：轻量级手机助手

## 二、Android 模拟器调试

### 1. Flutter 模拟器运行注意事项

#### 夜神模拟器配置
Flutter 项目在第三方模拟器上可能遇到兼容性问题，解决方案：

**参考教程：**
- 问题解决：https://blog.csdn.net/aha_jasper/article/details/107309188
- 配置教程：https://www.cnblogs.com/ishoulgodo/p/14829651.html

**连接示例：**
```bash
# 连接到模拟器
adb connect 127.0.0.1:7555
```

### 2. 常用模拟器默认端口号

| 模拟器名称 | 默认端口号 | 连接命令示例 |
|-----------|-----------|-------------|
| Genymotion模拟器 | 5555 | `adb connect 127.0.0.1:5555` |
| 夜神模拟器 | 62001/52001 | `adb connect 127.0.0.1:62001` |
| MuMu模拟器 | 7555 | `adb connect 127.0.0.1:7555` |
| 海马玩模拟器 | 26944 | `adb connect 127.0.0.1:26944` |
| 天天模拟器 | 6555 | `adb connect 127.0.0.1:6555` |
| 逍遥安卓模拟器 | 21503 | `adb connect 127.0.0.1:21503` |
| BlueStacks 蓝叠3 | 5555 | `adb connect 127.0.0.1:5555` |
| 雷神安卓模拟器 | 5555 | `adb connect 127.0.0.1:5555` |
| 腾讯手游助手 | 5555 | `adb connect 127.0.0.1:5555` |

### 3. 模拟器推荐

**详细对比参考：** https://blog.csdn.net/csdnxia/article/details/120656206

**推荐排序：**
1. **Android Studio 自带模拟器**：官方支持，兼容性最佳
2. **Genymotion**：专业开发者首选
3. **MuMu模拟器**：国产优秀，性能稳定
4. **夜神模拟器**：游戏测试友好

## 三、Flutter 调试工具

### UME 调试工具

**介绍文章：** https://toutiao.io/posts/92iqb9j/preview

UME (Ultimate Mobile Enhancement) 是字节跳动开源的移动端调试工具集，提供丰富的调试功能。

**主要功能：**
- 性能监控
- 网络请求查看
- 设备信息展示
- 日志查看
- UI 检查器

## 四、最佳实践建议

### 1. 开发环境配置
- 确保 Android SDK 和相关工具已正确安装
- 配置好 ADB 环境变量
- 开启手机开发者模式和 USB 调试

### 2. 调试流程建议
1. **真机调试优先**：真实设备上的表现最接近用户体验
2. **多设备测试**：使用不同分辨率和系统版本的设备
3. **性能监控**：使用 UME 等工具监控应用性能
4. **日志记录**：充分利用 Flutter 的调试日志功能

### 3. 常见问题解决
- **设备识别问题**：检查驱动安装和 USB 调试权限
- **连接超时**：尝试重新连接或更换 USB 端口
- **应用安装失败**：清理设备存储空间，检查包名冲突

---

> **提示：** 本文档会持续更新，建议收藏以获取最新的调试技巧和工具推荐。