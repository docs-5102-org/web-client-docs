---
title: JavaScript 判断浏览器环境
category:
  - JS
tag:
  - call()
  - apply()
  - bind()
---

# JavaScript 判断浏览器环境完整教程

在前端开发中，根据用户的浏览器环境提供不同的体验是很常见的需求。本教程将介绍多种方法来判断用户是在PC端、移动端还是微信浏览器中访问您的网站。

## 1. 基础概念

浏览器环境检测主要依赖于 `navigator.userAgent` 和 `navigator.platform` 这两个属性：

- `navigator.userAgent`: 包含浏览器的详细信息字符串
- `navigator.platform`: 包含操作系统平台信息

## 2. 简单的移动端检测

### 方法一：基础移动端检测

```javascript
// 判断浏览器函数
function isMobile(){
  if(window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
    return true; // 移动端
  }else{
    return false; // PC端
  }
}

// 使用示例
if(isMobile()) {
  console.log('用户正在使用移动设备访问');
} else {
  console.log('用户正在使用PC设备访问');
}
```

## 3. 详细的设备类型检测

### 方法二：完整的设备环境检测

```javascript
var os = function() {
  var ua = navigator.userAgent,
  isWindowsPhone = /(?:Windows Phone)/.test(ua),
  isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,  
  isAndroid = /(?:Android)/.test(ua),  
  isFireFox = /(?:Firefox)/.test(ua),  
  isChrome = /(?:Chrome|CriOS)/.test(ua),
  isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
  isPhone = /(?:iPhone)/.test(ua) && !isTablet,
  isPc = !isPhone && !isAndroid && !isSymbian;
  
  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid : isAndroid,
    isPc : isPc
  };
}();

// 使用方法
if(os.isAndroid || os.isPhone){
  alert("移动设备访问");
}

if(os.isTablet){
  alert("平板设备访问");
}

if(os.isPc){
  alert("PC设备访问");
}
```

## 4. 微信浏览器检测

### 检测是否为微信客户端

```javascript
var isWechat = function () {
  var rst = true;
  if(window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)){
    var ua = navigator.userAgent.toLowerCase();
    if (!(ua.match(/MicroMessenger/i) == "micromessenger")) {
      rst = false;
    }
  }else {
    rst = false;
  }
  return rst;
}

// 使用示例
if(isWechat()) {
  console.log('在微信浏览器中打开');
}
```

## 5. 综合环境检测方案

### PC端与移动端微信浏览器的详细判断

```javascript
//平台、设备和操作系统  
var system = {
  win: false,
  mac: false,
  xll: false,
  ipad: false
};

//检测平台  
var p = navigator.platform;
system.win = p.indexOf("Win") == 0;
system.mac = p.indexOf("Mac") == 0;
system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
system.ipad = (navigator.userAgent.match(/iPad/i) != null) ? true : false;

//判断逻辑
if (system.win || system.mac || system.xll || system.ipad) {
  alert("在PC端上打开的");
} else {
  var ua = navigator.userAgent.toLowerCase();  
  if(ua.match(/MicroMessenger/i)=="micromessenger") {  
    alert("在手机端微信上打开的");
  } else {  
    alert("在手机上非微信上打开的");
  }  
}
```

## 6. 完整的工具类实现（推荐）

以下是一个完整的浏览器环境检测工具类：

```javascript
export function getCurrentPlatForm() {
  //平台、设备和操作系统
  var system = {
    win: false,
    mac: false,
    xll: false,
    ipad: false
  };
  
  //检测平台
  var p = navigator.platform;
  system.win = p.indexOf("Win") == 0;
  system.mac = p.indexOf("Mac") == 0;
  system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
  system.ipad = (navigator.userAgent.match(/iPad/i) != null) ? true : false;
  
  if (system.win || system.mac || system.xll || system.ipad) {
    //在PC端上打开的
    return 1;
  } else {
    var _ua = navigator.userAgent.toLowerCase();
    if(_ua.match(/MicroMessenger/i)=="micromessenger") {
      //在手机端微信上打开的
      return 2;
    } else {
      //在手机上非微信上打开的
      var ua = navigator.userAgent,
      isWindowsPhone = /(?:Windows Phone)/.test(ua),
      isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
      isAndroid = /(?:Android)/.test(ua),
      isFireFox = /(?:Firefox)/.test(ua),
      isChrome = /(?:Chrome|CriOS)/.test(ua),
      isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
      isIPhone = /(?:iPhone)/.test(ua) && !isTablet,
      isPc = !isIPhone && !isAndroid && !isSymbian;
      
      if(isAndroid || isIPhone){
        //手机端APP
        return 3;
      }else{
        //手机端非微信浏览器
        return 4;
      }
    }
  }
}

// 使用工具类
const platform = getCurrentPlatForm();

switch(platform) {
  case 1:
    console.log('PC端访问');
    break;
  case 2:
    console.log('手机端微信浏览器访问');
    break;
  case 3:
    console.log('手机端APP访问');
    break;
  case 4:
    console.log('手机端非微信浏览器访问');
    break;
  default:
    console.log('未知环境');
}
```

## 7. 实际应用场景

### 根据环境进行页面跳转

```javascript
const platform = getCurrentPlatForm();

if(platform === 1) {
  // PC端显示完整版网站
  window.location.href = '/pc/index.html';
} else if(platform === 2) {
  // 微信端显示微信优化版本
  window.location.href = '/wechat/index.html';
} else if(platform === 3 || platform === 4) {
  // 移动端显示手机版
  window.location.href = '/mobile/index.html';
}
```

### 动态加载不同的样式文件

```javascript
const platform = getCurrentPlatForm();
const link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';

if(platform === 1) {
  link.href = '/css/pc.css';
} else {
  link.href = '/css/mobile.css';
}

document.head.appendChild(link);
```

## 8. 注意事项

1. **用户代理检测的局限性**: `navigator.userAgent` 可以被用户或浏览器修改，因此不是100%可靠的。

2. **性能考虑**: 避免在每次需要时都进行检测，建议在页面加载时检测一次并缓存结果。

3. **维护成本**: 随着新设备和浏览器的出现，正则表达式可能需要更新。

4. **现代替代方案**: 考虑使用CSS媒体查询和现代的Web API（如`navigator.userAgentData`）来实现响应式设计。

## 9. 总结

本教程提供了多种检测浏览器环境的方法，从简单的移动端检测到完整的环境分类。选择合适的方法取决于您的具体需求。对于大多数应用场景，推荐使用完整的工具类实现，它提供了清晰的返回值和全面的环境检测功能。

记住，在现代Web开发中，响应式设计往往比环境检测更优雅，但在某些特定场景下（如微信小程序开发、不同平台的功能适配等），环境检测仍然是必要的工具。