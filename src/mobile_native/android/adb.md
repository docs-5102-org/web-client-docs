---
title: ADB使用指南
category:
  - 移动端原生开发
tag:
  - Android
---

# ADB (Android Debug Bridge) 使用指南

## 📖 目录

- [🚀 快速开始](#-快速开始)
- [📱 设备连接与管理](#-设备连接与管理)
- [📦 应用管理](#-应用管理)
- [📁 文件操作](#-文件操作)
- [⚙️ 系统操作](#️-系统操作)
- [🔍 调试与监控](#-调试与监控)
- [📋 应用信息获取](#-应用信息获取)
- [🔗 URL Schemes](#-url-schemes)
- [🛠️ 高级功能](#️-高级功能)
- [❗ 常见问题](#-常见问题)
- [📚 参考资源](#-参考资源)

## 🚀 快速开始

### 什么是 ADB？

ADB（Android Debug Bridge）是 Android SDK 中的一个命令行工具，它是 Android 开发者和高级用户的必备工具。通过 ADB，你可以：

- 🔧 调试 Android 应用
- 📱 管理设备和模拟器
- 📦 安装/卸载应用
- 📁 传输文件
- 🖥️ 控制设备系统

### 安装与配置

1. **下载 Android SDK Platform Tools**
   - 访问 [Android Developer 官网](https://developer.android.com/studio/releases/platform-tools)
   - 下载适合你操作系统的版本

2. **配置环境变量**（可选但推荐）
   ```bash
   # Windows
   set PATH=%PATH%;C:\path\to\platform-tools
   
   # macOS/Linux
   export PATH=$PATH:/path/to/platform-tools
   ```

3. **验证安装**
   ```bash
   adb version
   ```

## 📱 设备连接与管理

### 基础连接命令

| 命令 | 功能 | 示例 |
|------|------|------|
| `adb devices` | 列出所有连接的设备 | 显示设备列表及状态 |
| `adb devices -l` | 详细设备信息 | 包含设备型号、传输协议等 |
| `adb connect <IP:端口>` | 通过网络连接设备 | `adb connect 192.168.1.100:5555` |
| `adb disconnect <IP:端口>` | 断开指定设备 | `adb disconnect 192.168.1.100:5555` |
| `adb -s <设备ID>` | 指定操作设备 | 多设备环境下必需 |

### 服务管理

```bash
# 服务控制
adb kill-server          # 终止 ADB 服务
adb start-server         # 启动 ADB 服务
adb reconnect            # 重新连接设备

# 设备重启
adb reboot              # 重启到系统
adb reboot bootloader   # 重启到 Bootloader
adb reboot recovery     # 重启到 Recovery 模式
```

### Root 权限操作

```bash
adb root                # 以 root 权限重启 ADB
adb unroot              # 退出 root 权限
adb remount             # 重新挂载系统分区为可写
```

> ⚠️ **注意：** Root 操作需要设备已获取 root 权限，操作有风险，请谨慎使用。

## 📦 应用管理

### 应用安装

```bash
# 基础安装
adb install app.apk                    # 安装应用
adb install -r app.apk                 # 替换安装（保留数据）
adb install -g app.apk                 # 安装时授予所有权限
adb install -d app.apk                 # 允许降级安装

# 多设备环境
adb -s <设备ID> install app.apk        # 在指定设备上安装

# 高级选项
adb install -t app.apk                 # 允许安装测试包
adb install --abi armeabi-v7a app.apk  # 指定 ABI 架构
```

### 应用卸载

```bash
# 普通卸载
adb uninstall <包名>                   # 卸载应用
adb uninstall -k <包名>                # 卸载但保留数据

# 示例
adb uninstall com.example.app         # 卸载指定应用
```

### 系统应用管理

```bash
# 禁用系统应用（无需 root）
adb shell pm disable-user --user 0 <包名>

# 启用系统应用
adb shell pm enable <包名>

# 隐藏应用
adb shell pm hide <包名>

# 显示应用
adb shell pm unhide <包名>
```

### 强制删除系统应用（需要 root）

```bash
# 方法一：通过 shell
adb root
adb remount
adb shell
rm /system/app/应用名/应用.apk
rm -rf /data/data/包名

# 方法二：直接删除
adb shell rm /system/app/应用名/应用.apk
adb shell rm -rf /data/data/包名
```

## 📁 文件操作

### 文件传输

```bash
# 上传文件到设备
adb push <本地路径> <设备路径>
adb push file.txt /sdcard/
adb push folder/ /sdcard/folder/

# 从设备下载文件
adb pull <设备路径> <本地路径>
adb pull /sdcard/file.txt ./
adb pull /sdcard/folder/ ./folder/

# 批量传输
adb push *.jpg /sdcard/Pictures/
```

### 常用目录

| 目录 | 用途 | 权限要求 |
|------|------|----------|
| `/sdcard/` | 外部存储（用户可访问） | 普通 |
| `/data/data/` | 应用私有数据 | Root |
| `/system/app/` | 系统应用 | Root |
| `/data/app/` | 用户安装应用 | Root |
| `/data/local/tmp/` | 临时文件 | 普通 |

## ⚙️ 系统操作

### Activity 管理

```bash
# 启动 Activity
adb shell am start -n <包名>/<Activity名>
adb shell am start -n com.example.app/.MainActivity

# 带参数启动
adb shell am start -n <包名>/<Activity名> \
  --ei <int_key> <int_value> \
  --es <string_key> "<string_value>" \
  --ez <boolean_key> <boolean_value>

# 示例
adb shell am start -n com.example.app/.MainActivity \
  --ei age 25 \
  --es name "张三" \
  --ez debug true
```

### Service 管理

```bash
# 启动服务
adb shell am startservice -n <包名>/<Service名>

# 带参数启动服务
adb shell am startservice -n <包名>/<Service名> \
  --es action "start_sync"

# 停止服务
adb shell am stopservice -n <包名>/<Service名>
```

### 广播发送

```bash
# 发送广播
adb shell am broadcast -a <action>
adb shell am broadcast -a android.intent.action.BOOT_COMPLETED

# 带参数广播
adb shell am broadcast -a <action> \
  --es <key> "<value>"

# 示例
adb shell am broadcast -a com.example.CUSTOM_ACTION \
  --es message "Hello World"
```

### 应用控制

```bash
# 强制停止应用
adb shell am force-stop <包名>

# 清除应用数据
adb shell pm clear <包名>

# 启动应用主界面
adb shell monkey -p <包名> 1
```

## 🔍 调试与监控

### 屏幕操作

```bash
# 屏幕信息
adb shell wm size                    # 获取屏幕分辨率
adb shell wm density                 # 获取屏幕密度
adb shell dumpsys display           # 详细显示信息

# 截图
adb shell screencap /sdcard/screenshot.png
adb pull /sdcard/screenshot.png ./

# 录屏（Android 4.4+）
adb shell screenrecord /sdcard/video.mp4
adb shell screenrecord --size 1280x720 --bit-rate 6000000 /sdcard/video.mp4
```

### 系统监控

```bash
# CPU 监控
adb shell top -m 10 -d 1            # 显示前10个进程，每秒刷新
adb shell dumpsys cpuinfo           # CPU 使用详情

# 内存监控
adb shell dumpsys meminfo           # 系统内存信息
adb shell dumpsys meminfo <包名>     # 应用内存详情
adb shell cat /proc/meminfo         # 内存统计

# 电池信息
adb shell dumpsys battery           # 电池状态
adb shell dumpsys batterystats      # 电池统计
```

### 日志查看

```bash
# 实时日志
adb logcat                          # 查看所有日志
adb logcat -v time                  # 带时间戳
adb logcat *:E                      # 只显示错误级别
adb logcat -s MyTag                 # 过滤特定标签

# 应用日志
adb logcat | grep <包名>
adb logcat --pid=$(adb shell pidof <包名>)

# 保存日志
adb logcat > log.txt
adb logcat -d > log_dump.txt        # 转储当前日志并退出
```

## 📋 应用信息获取

### 包名获取

```bash
# 获取当前前台应用
## Windows
adb shell dumpsys window w | findstr \/ | findstr name=

## macOS/Linux  
adb shell dumpsys window w | grep \/ | grep name=

# 更简洁的方法
adb shell dumpsys activity activities | grep mResumedActivity

# 列出所有应用包名
adb shell pm list packages           # 所有应用
adb shell pm list packages -s        # 系统应用  
adb shell pm list packages -3        # 第三方应用
adb shell pm list packages -f        # 显示应用路径
adb shell pm list packages | grep <关键词>  # 搜索特定应用
```

### 应用详细信息

```bash
# 应用基本信息
adb shell dumpsys package <包名>

# 应用版本信息
adb shell dumpsys package <包名> | grep version

# 应用权限
adb shell dumpsys package <包名> | grep permission

# 应用组件信息
adb shell dumpsys package <包名> | grep -A 5 "Activity\|Service\|Receiver"

# 应用安装位置
adb shell pm path <包名>
```

### Activity 信息

```bash
# 当前运行的 Activity
adb shell dumpsys activity activities | grep "Run #"

# Activity 堆栈
adb shell dumpsys activity activities

# 应用所有 Activity
adb shell dumpsys package <包名> | grep "Activity"
```

## 🔗 URL Schemes

URL Schemes 允许应用通过自定义 URL 协议进行深度链接和应用间跳转。

### 查找 URL Schemes

```bash
# 方法一：查看应用清单中的 schemes
adb shell dumpsys package <包名> | grep -A 10 "schemes"

# 方法二：查看 Intent Filter
adb shell dumpsys package <包名> | grep -A 20 "intent filter"

# 方法三：反编译 APK 查看 AndroidManifest.xml
adb pull $(adb shell pm path <包名> | cut -d':' -f2) app.apk
```

### 测试 URL Schemes

```bash
# 测试自定义 scheme
adb shell am start -a android.intent.action.VIEW -d "scheme://path"

# 测试网页链接
adb shell am start -a android.intent.action.VIEW -d "https://example.com"

# 带参数的 scheme
adb shell am start -a android.intent.action.VIEW \
  -d "myapp://action?param1=value1&param2=value2"
```

### 常用应用 URL Schemes

| 应用 | URL Scheme | 示例 |
|------|------------|------|
| 微信 | `weixin://` | `weixin://dl/scan` (扫一扫) |
| 支付宝 | `alipays://` | `alipays://platformapi/startapp?saId=10000007` (转账) |
| 淘宝 | `taobao://` | `taobao://item.taobao.com/item.htm?id=123456` |
| 京东 | `openapp.jdmobile://` | `openapp.jdmobile://virtual?params={}` |
| 抖音 | `snssdk1128://` | `snssdk1128://user/profile/123456` |
| 拼多多 | `pinduoduo://` | `pinduoduo://com.xunmeng.pinduoduo/goods.html?goods_id=123` |

## 🛠️ 高级功能

### 输入模拟

```bash
# 文本输入
adb shell input text "Hello World"

# 按键模拟
adb shell input keyevent 3          # Home 键
adb shell input keyevent 4          # Back 键  
adb shell input keyevent 26         # 电源键
adb shell input keyevent 82         # 菜单键

# 触摸模拟
adb shell input tap 500 1000        # 点击坐标 (500, 1000)
adb shell input swipe 300 500 800 1000 1000  # 滑动手势
```

### 网络操作

```bash
# WiFi 相关
adb shell svc wifi enable           # 开启 WiFi
adb shell svc wifi disable          # 关闭 WiFi

# 数据网络
adb shell svc data enable           # 开启移动数据
adb shell svc data disable          # 关闭移动数据

# 网络信息
adb shell dumpsys wifi              # WiFi 详细信息
adb shell ip addr show              # 网络接口信息
```

### 系统设置

```bash
# 设置系统属性
adb shell setprop <属性名> <值>

# 获取系统属性  
adb shell getprop <属性名>
adb shell getprop                   # 列出所有属性

# 常用属性
adb shell getprop ro.build.version.release    # Android 版本
adb shell getprop ro.product.model           # 设备型号
adb shell getprop ro.serialno               # 序列号
```

## ❗ 常见问题

### 连接问题

**问题：设备显示 offline 或 unauthorized**
```bash
# 解决方案
1. 确认设备开启了开发者选项和 USB 调试
2. 在设备上授权计算机的 RSA 密钥指纹
3. 重启 ADB 服务
adb kill-server
adb start-server
```

**问题：找不到设备**
```bash
# 检查驱动（Windows）
1. 设备管理器中确认设备驱动正常
2. 尝试不同的 USB 端口和数据线
3. 重新安装 USB 驱动程序

# 检查连接模式
确保设备 USB 连接模式为 "文件传输" 或 "MTP"
```

### 权限问题

**问题：没有权限执行某些操作**
```bash
# 检查是否需要 root
adb root
adb remount

# 使用 su 命令
adb shell su -c "your_command"
```

**问题：应用安装失败**
```bash
# 常见错误码及解决方案
INSTALL_FAILED_INSUFFICIENT_STORAGE  # 存储空间不足
INSTALL_FAILED_ALREADY_EXISTS        # 使用 -r 参数重新安装
INSTALL_FAILED_INVALID_APK          # APK 文件损坏或不兼容
INSTALL_FAILED_CONFLICTING_PROVIDER  # 卸载冲突应用后重新安装
```

### 模拟器问题

**夜神模拟器连接**
```bash
# 夜神模拟器默认端口
adb connect 127.0.0.1:62001

# 如果端口冲突，修改模拟器 ADB 端口
```

**其他模拟器端口**
```bash
BlueStacks: 127.0.0.1:5555
MEmu: 127.0.0.1:21503  
LDPlayer: 127.0.0.1:5555
```

## 📚 参考资源

### 官方文档
- [Android Debug Bridge (adb) - 官方文档](https://developer.android.com/studio/command-line/adb)
- [Android Studio 用户指南](https://developer.android.com/studio/intro)

### 社区资源
- [awesome-adb](https://github.com/mzlogin/awesome-adb) - 最全面的 ADB 命令集合
- [ADB Shell](https://adbshell.com/) - 在线 ADB 命令参考

### 实用工具
- [Scrcpy](https://github.com/Genymobile/scrcpy) - 高性能的 Android 屏幕镜像和控制工具
- [ADB Plugin for VSCode](https://marketplace.visualstudio.com/items?itemName=yume-chan.adb) - VS Code 的 ADB 插件
- [JADX](https://github.com/skylot/jadx) - Android APK 反编译工具

### 学习资源
- [Android 开发者官网](https://developer.android.com/)
- [Android 调试技巧](https://developer.android.com/studio/debug)

---

> 💡 **提示：** 本指南涵盖了 ADB 的主要功能，更多高级用法请参考官方文档。在使用 root 权限相关功能时请谨慎操作，避免造成设备损坏。

**最后更新：** 2025年9月
**标签：** `android` `adb` `调试工具` `开发` `移动端测试`