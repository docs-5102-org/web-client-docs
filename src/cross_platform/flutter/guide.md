---
title: 入门教程
category:
  - 跨平台框架
tag:
  - flutter
order: 1
---

# Flutter 入门教程

## 学习资源

### 官方文档与工具
- **官方文档**：https://flutter.cn/docs
- **pub包管理工具**：https://pub-web.flutter-io.cn/
- **Flutter实战教程第二版**：https://book.flutterchina.club/

### 教学视频
- **百度网盘链接**：https://pan.baidu.com/s/1W4THpHtCFntIWLyjciwdKA?pwd=ex2i
- **提取码**：ex2i

### 开发环境配置
- **IntelliJ IDEA配置Flutter**：https://blog.csdn.net/qq_51397468/article/details/126344539

## Flutter开发基础概念

### Hot Reload 与 Hot Restart 区别

#### Hot Reload（热重载）
- 用于在不改变当前状态的情况下加载新代码
- 适用于在顶层 `build` 函数内的修改
- 不会重新执行 `main` 函数
- 速度更快，保持应用状态

#### Hot Restart（热重启）
- 重新加载代码到 Dart VM 并重启整个应用
- 适用于涉及应用状态修改的情况
- 会重新执行 `main` 函数
- 重构 Widget Tree 时必须使用

## 多环境配置

### 使用 --dart-define 配置多环境

[](./file/unknown_filename.png)

#### 1. 运行时配置
```bash
# 单个参数
flutter run --dart-define=active_profile=local

# 多个参数
flutter run --dart-define=active_profile=local --dart-define=host=112.112.112.113
```

#### 2. 获取环境变量
```dart
static const appEnv = String.fromEnvironment(
  DartDefineConfig.activeProfile, 
  defaultValue: EnvChannel.local
);
```

#### 3. 完整配置示例

**env.dart**
```dart
/// 环境变量配置
import 'env_dev.dart';
import 'env_local.dart';
import 'env_prod.dart';

class DartDefineConfig {
  static const activeProfile = 'active_profile';
}

class EnvChannel {
  static const dev = 'dev';
  static const local = 'local';
  static const prod = 'prod';
}

class EnvConfig {
  static const appEnv = String.fromEnvironment(
    DartDefineConfig.activeProfile, 
    defaultValue: EnvChannel.local
  );

  static Map envConfig = _getEnvConfig();

  static _getEnvConfig() {
    switch (appEnv) {
      case EnvChannel.dev:
        return EnvDevConfig.config;
      case EnvChannel.local:
        return EnvLocalConfig.config;
      case EnvChannel.prod:
        return EnvProdConfig.config;
      default:
        return EnvLocalConfig.config;
    }
  }
}
```

**env_local.dart**
```dart
class EnvLocalConfig {
  static const ip = '192.168.1.100';
  
  static const config = {
    'BASE_URL': 'http://$ip:9220/',
    'STATIC_HOST': 'http://$ip:8001',
  };
}
```

> flutter run debug、flutter run release、flutter build apk 都需要加上 --dart-define=active_profile=local 达到想要的效果

## 推荐开发库

### 核心开发库

| 库名 | 功能 | 推荐指数 | 地址 |
|------|------|----------|------|
| dio | 网络请求 | ⭐⭐⭐⭐⭐ | https://pub-web.flutter-io.cn/packages/dio |
| get | 状态管理、路由管理 | ⭐⭐⭐⭐⭐ | https://pub-web.flutter-io.cn/packages/get |
| provider | 状态管理 | ⭐⭐⭐⭐ | https://pub-web.flutter-io.cn/packages/provider |

### UI组件库

| 库名 | 功能 | 推荐指数 | 地址 |
|------|------|----------|------|
| custom_pop_up_menu | 自定义弹出菜单 | ⭐⭐⭐ | https://pub-web.flutter-io.cn/packages/custom_pop_up_menu |
| flutter_calendar | 官方日历组件 | ⭐⭐⭐⭐⭐ | https://pub.dev/packages/flutter_calendar |
| platform_aware | 屏幕适配 | ⭐⭐⭐ | https://pub.dev/packages/platform_aware |
| flutter_villains | 页面切换动画 | ⭐⭐⭐ | https://pub.dev/packages/flutter_villains |

### 数据存储与处理

| 库名 | 功能 | 推荐指数 | 地址 |
|------|------|----------|------|
| sqflite | SQLite数据库 | ⭐⭐⭐⭐ | https://pub.dartlang.org/packages/sqflite |
| file_cache | 项目缓存Json、Buffer、FileCacheImage | ⭐⭐⭐ | https://pub.dartlang.org/packages/file_cache |

### 编码解码与加密

| 库名 | 功能 | 推荐指数 | 地址 |
|------|------|----------|------|
| ninja | AES和RSA加密解密算法 | ⭐⭐⭐⭐ | https://pub.dartlang.org/packages/ninja |
| archive | 各种存档压缩格式编解码器（zip、tar、bzip2、gzip、zlib） | ⭐⭐⭐⭐ | https://pub.dartlang.org/packages/archive |

### 更多资源

- **第三方开源库介绍**：https://blog.csdn.net/sinat_17775997/article/details/106723930

## 图标资源

- **Flutter Icon（国内镜像）**：https://www.fluttericon.cn/
- **Material Icons（官方）**：https://fonts.google.com/icons

## 实用技巧

### IconFont使用技巧
- **一键生成Dart类教程**：https://www.bilibili.com/read/cv10406553/

## 开发注意事项

1. **新增依赖后必须重启**：添加新的类或文件引用时需要重启应用
2. **热重载限制**：新增插件依赖时必须完全重启，热重载无效
3. **存储空间**：模拟器安装失败通常是存储空间不足，清理即可
4. **环境切换**：所有构建命令都需要添加环境参数才能生效

## 相关资源

- **Flutter开发技巧Wiki**：https://wiki.ducafecat.tech/
- **第三方库介绍**：https://blog.csdn.net/sinat_17775997/article/details/106723930