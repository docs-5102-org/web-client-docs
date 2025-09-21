---
title: 语音引擎工具合集
category:
  - 移动端原生开发
tag:
  - Android
---

# Android TTS语音引擎完整指南

## 概述

Android文字转语音(Text-to-Speech, TTS)技术允许设备将文本内容转换为语音输出。由于国内Android系统自带的语音引擎（包括华为、小米等品牌）通常不支持中文语音功能，因此需要安装第三方TTS引擎来实现中文语音合成。

## 主流TTS引擎对比

### 商业引擎

| 引擎名称 | 包名 | 系统要求 | 大小 | 中文支持 | 特点 |
|---------|------|----------|------|----------|------|
| 谷歌文字转语音 | com.google.android.tts | Android 5.0+ | 17.98MB | ✅ | 音质较好，支持多语言 |
| 科大讯飞3.0 | com.iflytek.speechcloud | Android 4.0+ | 27.27MB | ✅ | 中文效果佳，语音自然 |
| 新版科大讯飞 | com.iflytek.speechsuite | Android 6.0+ | ~30MB | ✅ | 2018年后新机内置 |
| 度秘语音引擎 | com.baidu.duersdk.opensdk | Android 5.0+ | 11.95MB | ✅ | 百度出品，体积小巧 |
| 科大讯飞语音合成(旧版) | com.iflytek.tts | Android 4.0-6.0 | 9MB | ✅ | 兼容性较差 |

### 系统自带引擎

| 引擎名称 | 包名 | 中文支持 | 说明 |
|---------|------|----------|------|
| Pico TTS | com.svox.pico | ❌ | Android系统默认引擎 |
| SVOX Classic | com.svox.classic | ❌ | 经典TTS引擎 |

## 开源TTS引擎推荐

[开源tts工具合集](./tts-tools.md)