---
title: 常用工具集合集
category:
  - react
date: 2025-09-20
---

# 常用工具集合集

## 前端生成二维码

**1.安装**

```
npm install qrcode.react --save　　
```

**2.使用**

```
import QRCode  from'qrcode.react';
<QRCode
      value={this.state.qrUrl} //value参数为生成二维码的链接
      size={200}//二维码的宽高尺寸
      fgColor="#000000"  //二维码的颜色
/>
```

## 解析apk 组件

```
const AppInfoParser = require('app-info-parser')const parser = new AppInfoParser('../packages/test.apk') // or xxx.ipaparser.parse().then(result => {
  console.log('app info ----> ', result)
  console.log('icon base64 ----> ', result.icon)}).catch(err => {
  console.log('err ----> ', err)})
```

> 来源：https://github.com/chenquincy/app-info-parser

## 音乐播放器(audio)开发资源整理（网易云音乐）

实战项目可以参考- jasper-org、miliqk-org 里面封装了一套audio播放器组件

### React音乐播放器项目

#### 1. React Music v2.0
- **项目地址**: https://github.com/chenjun1127/react-music-v2.0
- **项目描述**: 基于React开发的音乐播放器项目
- **技术栈**: React
- **特色功能**: 
  - 完整的音乐播放器界面
  - 支持歌单管理
  - 响应式设计
- **适用场景**: 学习React音乐播放器开发的完整示例

### 🔌 音乐API接口

#### 1. NeteaseCloudMusicApi(网易云音乐API)
- **GitHub地址**: https://github.com/Binaryify/NeteaseCloudMusicApi
- **文档地址**: https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=license
- **项目描述**: 网易云音乐 Node.js API service
- **主要功能**:
  - 登录/注册相关接口
  - 歌曲搜索和播放
  - 歌单管理
  - 用户信息获取
  - 评论系统
  - 排行榜数据

:::tip
目前已经不维护且删除，详见
- https://www.landiannews.com/archives/101953.html
- https://www.ithome.com/0/746/942.htm
:::

#### 2. 本地开发配置

在本地开发时，需要修改API服务的配置：

```javascript
// server.js 中 285行 代码  
const host = options.host || process.env.HOST || ''

// 修改为（替换为本机IP地址）
const host = options.host || process.env.HOST || '192.168.122.103'
```

**配置说明**:
- 将 `192.168.122.103` 替换为你的本机IP地址
- 这样配置后，移动端设备可以通过局域网访问API服务
- 便于在不同设备上测试音乐播放功能

### 🎼 音乐播放器组件库

#### 1. React Player
- **GitHub地址**: https://github.com/cookpete/react-player
- **NPM地址**: https://www.npmjs.com/package/react-player
- **特色功能**:
  - 支持多种音频/视频格式
  - YouTube、SoundCloud等平台支持
  - 丰富的配置选项
  - 响应式设计
- **安装方式**:
```bash
npm install react-player
```

#### 2. React Audio Player
- **NPM地址**: https://www.npmjs.com/package/react-audio-player
- **特色功能**:
  - 轻量级音频播放组件
  - 简单易用的API
  - 支持基础播放控制
- **安装方式**:
```bash
npm install react-audio-player
```

#### 3. NPM React播放器组件搜索
- **搜索地址**: https://www.npmjs.com/search?q=react-player
- **说明**: 可以在此页面搜索更多React播放器相关组件

#### 4. Limni音乐播放器 (Vue)
- **项目地址**: https://github.com/lizzz0523/limni/tree/master/music-player
- **项目描述**: 非常有创意且功能强大的音乐播放器插件
- **特色功能**:
  - 创新的UI设计
  - 流畅的动画效果
  - 丰富的交互体验
- **学习价值**: 可以借鉴其设计思路应用到React项目中

#### 5. Vue APlayer
- **GitHub地址**: https://vue-aplayer.js.org/
- **NPM地址**: https://www.npmjs.com/package/vue-aplayer
- **项目描述**: Vue版本的音乐播放器组件
- **参考价值**: 
  - 学习组件设计模式
  - 了解音频播放的最佳实践
  - UI/UX设计参考

## 编辑器选择指南

- https://www.cnblogs.com/datiangou/p/10112854.html

## codemirror文本编辑器集成

- https://codemirror.net/
- https://www.npmjs.com/package/react-codemirror2
- https://www.cnblogs.com/tu-0718/p/13129860.html

## umi-request集成

- https://github.com/umijs/umi-request

一套统一的网络请求和错误处理方案

```js
import request, { extend } from 'umi-request';
import { message } from 'antd';
import {history} from 'umi';

const errorHandler = (error: any) => {
    // 请求已发送但服务端返回状态码非 2xx 的响应
    if (error.response) {
        if (error.data.status === 500) {
            // 跳转至至指定500页面
            // history.push('/500');
        }else if (error.data.status === 404) {
            // 跳转至至指定404页面
            // history.push('/404');
        }else {
            // 若不是500或404，则展示异常message
            message.error(error.data.message ? error.data.message : error.data);

        }
    } else {
        // 请求初始化时出错或者没有响应返回的异常
        message.error('服务器异常');
    }
}

// 响应拦截器
// 克隆响应对象做解析处理
request.interceptors.response.use(async response => {

    const data = await response.clone().json();

    // 详情返回的response处理
    if(data.code === '500') {
        switch (data.message) {
            case 'systemError':
                message.error('网络繁忙，请稍后再试');
                break;
            case 'loginTimeout':
                message.error('登录超时，请重新登录');
                // 跳转到login页面
                // history.push('/login');
                break;
            default :
                break;
        }
    }
    return response;

});

// 请求拦截器, 改变url 或 options.
request.interceptors.request.use((url, options) => {
    return {
        url,
        options,
    };

});

// 作为统一错误处理
const http = extend({
    errorHandler,
})

export default http;

```
