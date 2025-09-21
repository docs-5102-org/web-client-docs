---
title: Vue 使用免费的百度语音合成指南
category:
  - vue
date: 2025-09-20
order: 2
---

# Vue 使用免费的百度语音合成指南

## 概述

百度语音合成（Text-to-Speech, TTS）服务提供了将文本转换为语音的功能。本文档将介绍如何在Vue项目中集成百度语音合成服务，包括旧版本的简单接口和官方API的使用方法。

## 一、旧版本百度语音合成接口

### 接口地址
```
http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text=*****
```

### 使用方法
直接引用该接口，在text参数后面加上自定义文字的UTF-8编码。在JavaScript中可以使用`encodeURI(文本)`进行编码，将返回的值拼接在text参数之后即可。

### 参数说明

| 参数 | 说明 | 取值范围 | 默认值 |
|------|------|----------|--------|
| `lan` | 语言选择 | 固定值zh（中英文混合模式） | zh |
| `ie` | 编码方式 | UTF-8 | UTF-8 |
| `spd` | 语速 | 0-9 | 5 |
| `text` | 合成文本 | UTF-8编码，小于512个中文字或英文数字 | - |

### Vue中的实现示例

```javascript
// 在Vue组件中使用
export default {
  methods: {
    playTTS(text) {
      const encodedText = encodeURI(text);
      const audioUrl = `http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=${encodedText}`;
      
      const audio = new Audio(audioUrl);
      audio.play();
    }
  }
}
```

## 二、官方API接口

### 官方文档
[百度AI开放平台 - 语音合成](https://ai.baidu.com/ai-doc/SPEECH/Qk38y8lrl)

### 完整参数列表

| 参数 | 说明 | 取值范围 | 默认值 | 必填 |
|------|------|----------|--------|------|
| `tex` | 合成文本 | UTF-8编码，小于512个中文字或英文数字 | - | 是 |
| `tok` | 开发者access_token | - | - | 是 |
| `cuid` | 用户唯一标识 | 长度60字符以内，建议使用MAC地址或IMEI码 | - | 是 |
| `ctp` | 客户端类型 | web端填写固定值1 | 1 | 是 |
| `lan` | 语言选择 | 固定值zh | zh | 否 |
| `spd` | 语速 | 0-9 | 5 | 否 |
| `pit` | 音调 | 0-9 | 5 | 否 |
| `vol` | 音量 | 0-15 | 5 | 否 |
| `per` | 发音人选择 | 0=普通女声，1=普通男声，3=度逍遥，4=度丫丫 | 0 | 否 |

## 三、获取必要参数

### 1. 获取CUID
在Windows系统中：
1. 按`Win + R`打开运行对话框
2. 输入`cmd`并按回车
3. 执行命令：`ipconfig /all`
4. 以"以太网 本地连接"的物理地址为准

### 2. 获取Access Token

#### 应用注册信息
进入百度AI开放平台个人开发的应用管理，找到已开通语音合成服务的应用，获取以下信息：
- App ID: ****
- API Key: ****
- Secret Key: ****

#### Token获取接口
向以下地址发送POST请求：
```
https://openapi.baidu.com/oauth/2.0/token
```

**请求参数：**
- `grant_type`：必须参数，固定为"client_credentials"
- `client_id`：必须参数，应用的API Key
- `client_secret`：必须参数，应用的Secret Key

#### Vue中获取Token示例

```javascript
// 获取Access Token的方法
async getAccessToken() {
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', 'YOUR_API_KEY');
  params.append('client_secret', 'YOUR_SECRET_KEY');

  try {
    const response = await fetch('https://openapi.baidu.com/oauth/2.0/token', {
      method: 'POST',
      body: params
    });
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('获取Token失败:', error);
    return null;
  }
}
```

## 四、Vue完整实现示例

```vue
<template>
  <div class="tts-container">
    <textarea 
      v-model="textToSpeak" 
      placeholder="请输入要合成的文本"
      maxlength="512">
    </textarea>
    <button @click="speakText">播放语音</button>
  </div>
</template>

<script>
export default {
  name: 'BaiduTTS',
  data() {
    return {
      textToSpeak: '',
      accessToken: '',
      cuid: 'your_unique_device_id'
    };
  },
  
  async mounted() {
    // 获取访问令牌
    this.accessToken = await this.getAccessToken();
  },
  
  methods: {
    async getAccessToken() {
      const params = new URLSearchParams();
      params.append('grant_type', 'client_credentials');
      params.append('client_id', 'YOUR_API_KEY');
      params.append('client_secret', 'YOUR_SECRET_KEY');

      try {
        const response = await fetch('https://openapi.baidu.com/oauth/2.0/token', {
          method: 'POST',
          body: params
        });
        const data = await response.json();
        return data.access_token;
      } catch (error) {
        console.error('获取Token失败:', error);
        return null;
      }
    },

    speakText() {
      if (!this.textToSpeak.trim()) {
        alert('请输入要合成的文本');
        return;
      }

      // 使用旧版本接口（简单方式）
      this.speakWithOldAPI();
      
      // 或者使用官方API（功能更丰富）
      // this.speakWithOfficialAPI();
    },

    speakWithOldAPI() {
      const encodedText = encodeURI(this.textToSpeak);
      const audioUrl = `http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=${encodedText}`;
      
      const audio = new Audio(audioUrl);
      audio.play().catch(error => {
        console.error('播放失败:', error);
      });
    },

    async speakWithOfficialAPI() {
      if (!this.accessToken) {
        alert('请先获取访问令牌');
        return;
      }

      const params = new URLSearchParams();
      params.append('tex', this.textToSpeak);
      params.append('tok', this.accessToken);
      params.append('cuid', this.cuid);
      params.append('ctp', '1');
      params.append('lan', 'zh');
      params.append('spd', '5');
      params.append('pit', '5');
      params.append('vol', '5');
      params.append('per', '0');

      try {
        const response = await fetch('http://tsn.baidu.com/text2audio', {
          method: 'POST',
          body: params
        });

        if (response.ok) {
          const audioBlob = await response.blob();
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          audio.play();
        } else {
          console.error('语音合成失败');
        }
      } catch (error) {
        console.error('请求失败:', error);
      }
    }
  }
};
</script>

<style scoped>
.tts-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
}

textarea {
  width: 100%;
  height: 120px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
```

## 五、其他Web语音合成解决方案

### 1. Java后台实现
参考小说novel-mp项目的实现方式。
详见：[CSDN博客文章](https://blog.csdn.net/u010138825/article/details/49228015)

### 2. WebSpeech插件
适用于Web端的语音合成插件。
官网：[WebSpeech中文版](http://www.eguidedog.net/cn/WebSpeech_cn.php)

### 3. Speak.js插件
另一个适用于Web端的语音合成插件。
参考教程：[Speak.js使用教程](http://www.5imoban.net/jiaocheng/jquery/201712183090.html)

## 注意事项

1. **文本长度限制**：合成的文本必须小于512个中文字符或英文数字
2. **编码格式**：使用UTF-8编码，服务器端会转换为GBK，转换后长度必须小于1024字节
3. **跨域问题**：在实际部署中可能需要处理跨域问题
4. **Token过期**：Access Token有效期有限，需要定期刷新
5. **使用配额**：免费版本有使用次数限制，超出需要付费

## 总结

百度语音合成为Vue项目提供了便捷的文本转语音功能。可以根据项目需求选择简单的旧版本接口或功能丰富的官方API。在实际使用中，建议根据具体需求和技术架构选择合适的实现方案。