---
title: 移动端设备信息获取指南
category:
  - vue
date: 2025-09-20
---

# 移动端设备信息获取指南

在移动端Web开发中，经常需要获取设备的各种信息，如IMEI、IMSI、手机型号、系统版本、浏览器信息等。本文将介绍三种主要的获取方法。

## 可获取的设备信息类型

### 基本设备信息
- **IMEI**: 设备的国际移动设备身份码
- **IMSI**: 设备的国际移动用户识别码  
- **Model**: 设备的型号
- **Vendor**: 设备的生产厂商
- **UUID**: 设备的唯一标识

### 浏览器和系统信息
- 浏览器类型和版本
- 操作系统类型和版本
- 设备类型判断（手机/平板）

## 方法一：HTML5+ API

HTML5+是一个跨平台的移动应用开发框架，提供了丰富的设备信息获取接口。

### 特点
- 功能完整，可直接获取IMEI、IMSI等敏感信息
- 需要特定的打包工具和配置
- 适用于混合应用开发

### 主要属性
```javascript
// 获取设备信息
plus.device.imei    // 国际移动设备身份码
plus.device.imsi    // 国际移动用户识别码  
plus.device.model   // 设备型号
plus.device.vendor  // 生产厂商
plus.device.uuid    // 设备唯一标识
```

### 参考文档
[HTML5+ Device API官方文档](https://www.html5plus.org/doc/zh_cn/device.html)

## 方法二：mobile-detect.js 插件

mobile-detect.js是一个轻量级的JavaScript库，专门用于检测移动设备信息。

### 特点
- 纯JavaScript实现，使用简单
- 无需特殊配置，Web页面直接可用
- 主要基于User-Agent字符串分析
- 无法获取IMEI、IMSI等敏感信息

### 使用示例
```javascript
// 引入mobile-detect.js后
var md = new MobileDetect(window.navigator.userAgent);

// 基本设备检测
console.log(md.mobile());          // 'Sony' - 移动设备品牌
console.log(md.phone());           // 'Sony' - 手机品牌  
console.log(md.tablet());          // null - 平板检测
console.log(md.userAgent());       // 'Safari' - 浏览器
console.log(md.os());              // 'AndroidOS' - 操作系统

// 特定设备判断
console.log(md.is('iPhone'));      // false - 是否为iPhone
console.log(md.is('bot'));         // false - 是否为爬虫

// 版本信息
console.log(md.version('Webkit'));     // 534.3 - Webkit版本
console.log(md.versionStr('Build'));   // '4.1.A.0.562' - Build版本

// 模式匹配
console.log(md.match('playstation|xbox')); // false - 游戏设备检测
```

### 获取方式
- [项目主页](http://hgoebl.github.io/mobile-detect.js)
- [GitHub下载](https://github.com/hgoebl/mobile-detect.js/)

## 方法三：Native App 交互（JSBridge）

通过JavaScript Bridge与原生App进行交互，获取设备信息。

### 特点
- 可获取完整的设备信息
- 需要App端配合开发
- 适用于混合开发场景
- 安全性和权限可控

### 实现示例
```javascript
var jsBridge = (function () {  
    function connectWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge);
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function () {
                callback(WebViewJavascriptBridge);
            }, false)
        }
    }
    
    connectWebViewJavascriptBridge(function (WebViewJavascriptBridge) {
        // 初始化Bridge
        WebViewJavascriptBridge.init(function (message, responseCallback) {
        });
        
        // 注册处理函数
        WebViewJavascriptBridge.registerHandler("contacts", function(data, responseCallback) {
            var datas = JSON.parse(data);
            // 处理联系人数据
        });
    });
    
    return {
        // 初始化方法
        init: function (fn) {
            connectWebViewJavascriptBridge(function (WebViewJavascriptBridge) {
                WebViewJavascriptBridge.init(function (message, responseCallback) {
                });
                fn && fn();
            })
        },
        
        // 获取App版本
        getAppVersion: function (callback) {
            WebViewJavascriptBridge.callHandler('getAppVersion', {}, function (response) {
                callback(response);
            });
        },
        
        // 获取设备ID
        getSid: function (callback) {
            WebViewJavascriptBridge.callHandler('getSid', {}, function (response) { 
                callback(response); 
            });
        },
        
        // 获取联系人
        getContacts: function (callback) {
            WebViewJavascriptBridge.callHandler('getContacts', {}, function (response) { 
                callback(response); 
            });
        },
        
        // 其他App交互方法
        showWebPage: function (obj) {
            WebViewJavascriptBridge.callHandler('showWebPage', { 
                title: obj.title, 
                pageUrl: obj.pageUrl 
            }, function (response) { });
        }
    }
})();
```

## 方法选择建议

### 根据应用场景选择

1. **纯Web页面**：推荐使用mobile-detect.js
   - 简单易用，无需额外配置
   - 适合基本的设备识别需求

2. **混合应用开发**：推荐HTML5+或JSBridge
   - 可获取完整设备信息
   - 适合需要深度设备集成的应用

3. **已有App项目**：推荐JSBridge方式
   - 充分利用原生能力
   - 可自定义权限控制

### 隐私和权限考虑

- IMEI、IMSI等敏感信息需要特殊权限
- 遵循平台隐私政策要求
- 向用户明确告知信息使用目的

## 总结

获取移动端设备信息的方法多样，开发者应根据具体需求和应用场景选择合适的方案。在获取敏感设备信息时，务必注意隐私保护和权限申请的相关要求。