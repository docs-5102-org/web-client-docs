---
title: iOS URL Schemes 指南
category:
  - 移动端原生开发
tag:
  - iOS
---

# iOS URL Schemes 指南

URL Schemes 是 iOS 系统中用于在应用程序之间进行通信和启动特定功能的机制。通过使用特定的 URL 格式，您可以直接打开系统应用或第三方应用的特定页面。

## 系统设置 (Settings)

### 通用设置
- **打开设置**: `prefs:root`
- **通用**: `prefs:root=General`
- **关于本机**: `prefs:root=General&path=About`
- **软件更新**: `prefs:root=General&path=SOFTWARE_UPDATE_LINK`
- **存储空间**: `prefs:root=General&path=USAGE`
- **还原**: `prefs:root=General&path=Reset`

### 网络与连接
- **Wi-Fi**: `prefs:root=WIFI`
- **蜂窝网络**: `prefs:root=MOBILE_DATA_SETTINGS_ID`
- **蓝牙**: `prefs:root=General&path=Bluetooth`
- **VPN**: `prefs:root=General&path=Network/VPN`
- **网络**: `prefs:root=General&path=Network`
- **个人热点**: `prefs:root=INTERNET_TETHERING`

### 显示与声音
- **显示与亮度**: `prefs:root=DISPLAY`
- **亮度**: `prefs:root=Brightness`
- **自动锁定**: `prefs:root=DISPLAY&path=AUTOLOCK`
- **文字大小**: `prefs:root=DISPLAY&path=TEXT_SIZE`
- **声音与触觉**: `prefs:root=Sounds`
- **铃声**: `prefs:root=Sounds&path=Ringtone`
- **墙纸**: `prefs:root=Wallpaper`

### 用户界面与交互
- **控制中心**: `prefs:root=ControlCenter`
- **通知中心**: `prefs:root=NOTIFICATIONS_ID`
- **勿扰模式**: `prefs:root=DO_NOT_DISTURB`
- **键盘设置**: `prefs:root=General&path=Keyboard`
- **辅助功能**: `prefs:root=General&path=ACCESSIBILITY`

### 安全与隐私
- **Face ID 与密码**: `prefs:root=PASSCODE`
- **隐私**: `prefs:root=Privacy`
- **定位服务**: `prefs:root=Privacy&path=LOCATION`
- **紧急联络**: `prefs:root=EMERGENCY_SOS`

#### 隐私子选项
- **联系人**: `prefs:root=Privacy&path=CONTACTS`
- **日历**: `prefs:root=Privacy&path=CALENDARS`
- **提醒事项**: `prefs:root=Privacy&path=REMINDERS`
- **照片**: `prefs:root=Privacy&path=PHOTOS`
- **麦克风**: `prefs:root=Privacy&path=MICROPHONE`
- **相机**: `prefs:root=Privacy&path=CAMERA`
- **语音识别**: `prefs:root=Privacy&path=SPEECH_RECOGNITION`

### 屏幕使用时间
- **屏幕使用时间**: `prefs:root=SCREEN_TIME`
- **停用时间**: `prefs:root=SCREEN_TIME&path=DOWNTIME`
- **App 限制**: `prefs:root=SCREEN_TIME&path=APP_LIMITS`
- **通讯限制**: `prefs:root=SCREEN_TIME&path=COMMUNICATION_LIMITS`
- **永远允许**: `prefs:root=SCREEN_TIME&path=ALWAYS_ALLOWED`
- **内容与隐私访问限制**: `prefs:root=SCREEN_TIME&path=CONTENT_PRIVACY`

### 账户与云服务
- **Apple ID**: `prefs:root=APPLE_ACCOUNT`
- **iCloud**: `prefs:root=CASTLE`
- **媒体与购买项目**: `prefs:root=STORE`
- **查找**: `prefs:root=FINDMY`

### 语言与地区
- **语言与地区**: `prefs:root=General&path=INTERNATIONAL`
- **词典**: `prefs:root=General&path=DICTIONARY`
- **日期与时间**: `prefs:root=General&path=DATE_AND_TIME`

## 系统应用

### App Store
- **打开 App Store**: `itms-apps://itunes.apple.com/`
- **账户设置**: `itms-ui://`
- **打开特定 App**: `itms-apps://itunes.apple.com/app/` + AppID
- **搜索应用**: `itms-apps://search.itunes.apple.com/WebObjects/MZSearch.woa/wa/search?media=software&term=` + 应用名称
- **排行榜**: `itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/viewTop?genreId=36&popId=30`

### 通讯应用

#### 电话
- **打开电话**: `mobilephone://`
- **拨打电话**: `tel://` + 电话号码
- **拨打电话(确认)**: `telprompt://` + 电话号码
- **常用联系人**: `mobilephone-favorites://`
- **最近通话**: `mobilephone-recents://`
- **语音信箱**: `vmshow://`

#### 信息
- **打开信息**: `sms://`
- **发送信息**: `sms://` + 电话号码
- **发送私密信息**: `sms-private://` + 电话号码

#### FaceTime
- **语音通话**: `facetime-audio://` + 电话号码
- **语音通话(确认)**: `facetime-audio-prompt://` + 电话号码
- **视频通话**: `facetime://` + 电话号码
- **视频通话(确认)**: `facetime-prompt://` + 电话号码

#### 邮件
- **打开邮件**: `message://`
- **新建邮件**: `mailto://` + 收件人邮箱
- **抄送邮件**: `mailto:` + 收件人 + `?cc=` + 抄送邮箱
- **密送邮件**: `mailto:` + 收件人 + `?bcc=` + 密送邮箱
- **带主题邮件**: `mailto:` + 收件人 + `&subject=` + 主题
- **带内容邮件**: `mailto:` + 收件人 + `&body=` + 内容

### 生产力应用

#### 日历
- **打开日历**: `calshow://`
- **日历事件**: `x-apple-calevent://`
- **订阅日历**: `webcal://` + 日历链接

#### 提醒事项
- **打开提醒事项**: `x-apple-reminder://`
- **提醒事项工具包**: `x-apple-reminderkit://`

#### 备忘录
- **打开备忘录**: `mobilenotes://`

#### 联系人
- **打开联系人**: `contact://`

### 多媒体应用

#### 音乐
- **打开音乐**: `music://`
- **音乐播放器**: `audio-player-event://`

#### 照片
- **打开照片**: `photos-redirect://`

#### 相机
- **打开相机**: 系统相机无直接 URL Scheme

#### 播客
- **打开播客**: `podcasts://`
- **添加播客**: `podcast://` + 播客链接
- **浏览播客**: `pcast://`
- **iTunes 播客**: `itms-podcast://`

#### Apple TV
- **打开 TV**: `videos://`

#### 语音备忘录
- **打开语音备忘录**: `voicememos://`

### 工具应用

#### 时钟
- **闹钟**: `clock-alarm://`
- **睡眠闹钟**: `clock-sleep-alarm://`
- **秒表**: `clock-stopwatch://`
- **计时器**: `clock-timer://`
- **世界时钟**: `clock-worldclock://`

#### 计算器
- **打开计算器**: `calc://`

#### 地图
- **打开地图**: `maps://`
- **地图项目**: `mapitem://`

#### 查找
- **查找我的**: `fmip1://`

#### 指南针
- **打开指南针**: 系统指南针无直接 URL Scheme

#### 测距仪
- **打开测距仪**: 系统测距仪无直接 URL Scheme

### 健康与健身
- **健康**: `x-apple-health://`

### 其他系统应用

#### Safari 浏览器
- **网页搜索**: `x-web-search://`
- **HTTP 网站**: `http://` + 网址
- **HTTPS 网站**: `https://` + 网址

#### 文件
- **打开文件**: `shareddocuments://`
- **连接服务器**: `smb://`

#### 钱包
- **打开钱包**: `shoebox://`

#### 快捷指令
- **打开快捷指令**: `shortcuts://`
- **新建快捷指令**: `shortcuts://create-shortcut/`
- **快捷指令库**: `shortcuts://gallery/`
- **打开指定快捷指令**: `shortcuts://open-shortcut?name=` + 快捷指令名称
- **运行快捷指令**: `shortcuts://run-shortcut?name=` + 快捷指令名称
- **运行快捷指令(文本输入)**: `shortcuts://run-shortcut?name=` + 快捷指令名称 + `&input=text&text=` + 输入文本
- **运行快捷指令(剪贴板)**: `shortcuts://run-shortcut?name=` + 快捷指令名称 + `&input=clipboard`

#### 股市
- **打开股市**: `stocks://`

#### 家庭
- **打开家庭**: `x-hm://`

#### Apple Watch
- **Watch 应用**: `itms-watch://`

#### 遥控器
- **Apple TV 遥控器**: `remote://`

## 使用说明

### 基本语法
大部分 URL Scheme 遵循以下格式：
```
应用标识符://参数路径?查询参数
```

### 参数说明
- **设置应用**: 使用 `prefs:root=` 前缀
- **路径参数**: 使用 `&path=` 连接子路径
- **查询参数**: 使用 `?` 和 `&` 连接多个参数

### 注意事项
1. 某些 URL Scheme 可能在不同 iOS 版本中有所变化
2. 第三方应用需要在 Info.plist 中声明其 URL Scheme
3. 使用前建议先测试 URL Scheme 的有效性
4. 部分系统应用可能没有公开的 URL Scheme

### 在代码中使用
**Swift 示例**:
```swift
if let url = URL(string: "prefs:root=WIFI") {
    UIApplication.shared.open(url)
}
```

**Objective-C 示例**:
```objc
NSURL *url = [NSURL URLWithString:@"prefs:root=WIFI"];
[[UIApplication sharedApplication] openURL:url];
```

---

*此文档基于 iOS 系统整理，具体可用性可能因设备和系统版本而异。*