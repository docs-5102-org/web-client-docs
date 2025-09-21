---
title: VUE实现微信JSSDK分享教程
category:
  - vue
date: 2025-09-20
---

# 微信JSSDK分享功能实现教程

本教程详细介绍如何在Vue项目中集成微信JSSDK实现分享功能，包含前端Vue代码和后端Java代码的完整实现。

## 一、前期准备

### 1.1 绑定JS接口安全域名

在微信公众平台后台配置JS接口安全域名，确保您的域名已经通过验证。

## 二、引入JSSDK

### 2.1 方式一：npm安装（推荐）

```bash
npm install jweixin-module --save
```

### 2.2 方式二：CDN引入

```html
<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
```

备用地址（当主地址不可访问时使用）：
```html
<script type="text/javascript" src="http://res2.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
```

## 三、前端Vue实现

### 3.1 导入微信SDK

```javascript
import wx from 'weixin-js-sdk';
```

### 3.2 核心分享方法实现

```javascript
async _goWxchat(){
  // 获取当前页面URL，去除hash部分
  let url = encodeURIComponent(location.href.split('#')[0]);
  let data = { url };
  
  // 调用后端接口获取签名配置
  const res = await reqConfigSignature(data);
  
  if (res.code === RESULT_SUCCESS_CODE) {
    // 解构后端返回的配置数据
    let { appId, timestamp, nonceStr, signature } = res.data;
    
    // 配置微信JSSDK
    wx.config({
      debug: true, // 开启调试模式，生产环境建议设置为false
      appId,       // 公众号唯一标识
      timestamp,   // 生成签名的时间戳
      nonceStr,    // 生成签名的随机串
      signature,   // 签名
      jsApiList: [
        'onMenuShareTimeline',     // 分享到朋友圈
        'onMenuShareAppMessage'    // 分享给朋友
      ]
    });
    
    // JSSDK配置成功后的回调
    wx.ready(function () {
      // 配置分享到朋友圈
      wx.onMenuShareTimeline({
        title: '分享标题',
        link: url + '?redirectUrl=http://auth.motopa.cn/logo.png',
        imgUrl: '分享图片URL',
        success: function () {
          console.log("分享到朋友圈成功");
        },
        cancel: function () {
          console.log("取消分享到朋友圈");
        }
      });

      // 配置分享给朋友
      wx.onMenuShareAppMessage({
        title: '分享标题',
        desc: '分享描述',
        link: url + '?redirectUrl=http://auth.motopa.cn/logo.png',
        imgUrl: '分享图片URL',
        type: '', // 分享类型
        dataUrl: '', // 音乐或视频链接
        success: function () {
          console.log("分享给朋友成功");
        },
        cancel: function () {
          console.log("取消分享给朋友");
        }
      });
    });

    // JSSDK配置失败的回调
    wx.error(function(res){
      console.error('微信JSSDK配置失败', res);
    });
  }
}
```

### 3.3 重要注意事项

- 如果使用固定URL，需要特别注意编码格式：`encodeURIComponent('http://auth.motopa.cn/');` 结尾必须有斜杠
- URL参数需要正确编码，避免特殊字符导致签名验证失败

## 四、后端Java实现

### 4.1 控制器类

```java
package com.auth.sdk.controller;

import com.alibaba.fastjson.JSONObject;
import com.auth.sdk.common.ResultData;
import com.auth.sdk.db.redisson.dao.base.StringRedisBaseDao;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.net.URLDecoder;
import java.util.Arrays;
import java.util.Random;

@RestController
@RequestMapping("/wx")
@Slf4j
public class WxShareController {

    // 微信公众号配置
    private static final String appId = "你的AppId";
    private static final String appSecret = "你的AppSecret";
    private static final long expireTime = 120L; // Token过期时间（秒）

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    StringRedisBaseDao stringRedisBaseDao; // Redis操作类
```

### 4.2 获取签名配置接口

```java
    /**
     * 获取微信JSSDK配置签名
     */
    @PostMapping("/WeixinAction_getWXConfigSignature")
    public ResultData getWXConfigSignature(@RequestBody JSONObject reqJson) {
        // URL解码
        String url = URLDecoder.decode(reqJson.getString("url"));
        log.info("原始URL: " + url);
        
        // 生成时间戳和随机字符串
        String timestamp = Long.toString(System.currentTimeMillis() / 1000);
        String nonceStr = getRandomStr(8);
        
        log.info("随机串：" + nonceStr + ", 获取签名URL: " + url);
        
        // 构建签名字符串
        String[] signArr = new String[]{
            "url=" + url, 
            "jsapi_ticket=" + getWXJsapiTicket(), 
            "noncestr=" + nonceStr, 
            "timestamp=" + timestamp
        };
        Arrays.sort(signArr);
        String signStr = StringUtils.join(signArr, "&");
        
        // 生成SHA1签名
        String resSign = DigestUtils.sha1Hex(signStr);
        log.info("返回的签名：" + resSign);
        
        // 构建返回数据
        JSONObject respJson = new JSONObject();
        respJson.put("appId", appId);
        respJson.put("timestamp", timestamp);
        respJson.put("nonceStr", nonceStr);
        respJson.put("signature", resSign);
        
        return ResultData.success(respJson);
    }
```

### 4.3 获取JSApi Ticket

```java
    /**
     * 获取jsapi_ticket
     */
    private String getWXJsapiTicket() {
        // 先从Redis获取缓存的ticket
        String ticket = stringRedisBaseDao.getItem(appId);
        
        if (StringUtils.isBlank(ticket)) {
            // 缓存中没有，从微信API获取
            String url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" 
                        + getWXaccessToken() + "&type=jsapi";
            String resp = restTemplate.getForObject(url, String.class);
            JSONObject resJson = JSONObject.parseObject(resp);
            
            ticket = resJson.getString("ticket");
            log.info("获取到ticket：" + ticket);
            
            // 缓存到Redis
            stringRedisBaseDao.addItem(appId, ticket, expireTime);
        }
        
        return ticket;
    }
```

### 4.4 获取Access Token

```java
    /**
     * 获取access_token
     */
    private String getWXaccessToken() {
        String url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="
                    + appId + "&secret=" + appSecret;
        String resp = restTemplate.getForObject(url, String.class);
        JSONObject resJson = JSONObject.parseObject(resp);
        
        log.info("获取到access_token：" + resp);
        return resJson.getString("access_token");
    }
```

### 4.5 工具方法

```java
    /**
     * 生成指定长度的随机字符串
     */
    public static String getRandomStr(int length) {
        String base = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random = new Random();
        StringBuffer str = new StringBuffer();

        for (int i = 0; i < length; i++) {
            int randomNum = random.nextInt(base.length());
            char randomChar = base.charAt(randomNum);
            str.append(randomChar);
        }
        
        return str.toString();
    }
}
```

## 五、测试步骤

### 5.1 本地测试配置

1. **配置hosts文件**
   使用SwitchHosts工具将本机IP指向JS接口安全域名

2. **调试模式**
   在前端代码中设置`debug: true`，可以在客户端看到详细的调试信息

3. **移动端测试**
   - 在微信内置浏览器中访问页面
   - 点击右上角分享按钮测试分享功能
   - 检查分享内容是否正确显示

### 5.2 常见问题排查

- **签名验证失败**：检查URL编码是否正确，确保与JS接口安全域名一致
- **分享内容不显示**：检查分享链接和图片URL是否可访问
- **接口调用失败**：确认appId和appSecret配置正确，检查网络连接

## 六、参考资料

- [微信JSSDK官方文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)
- [Vue项目集成微信分享实践](https://www.cnblogs.com/backtozero/p/7064247.html)
- [微信分享功能实现详解](https://www.jb51.net/article/155032.htm)

## 注意事项

1. 生产环境中建议将`debug`设置为`false`
2. 妥善保管`appId`和`appSecret`，避免泄露
3. 合理设置Redis缓存过期时间，避免频繁请求微信API
4. 分享图片建议使用HTTPS链接，确保在所有环境下都能正常显示
5. 测试时注意微信的接口调用频率限制