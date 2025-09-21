---
title: uni-request 网络封装
category:
  - 跨平台框架
tag:
  - uni-app
  - uni-request
---

# 网络请求封装

### 统一封装 uni.request 为标准 API

在实际项目开发中，建议将网络请求进行统一封装，便于维护和错误处理。

#### 1. 项目结构

```
src/
├── api/
│   ├── api.js          // API接口定义
│   └── unireq.js       // 网络请求封装
├── common/
│   └── constants.js    // 常量配置
└── pages/
    └── ...             // 页面文件
```

#### 2. 常量配置文件 (constants.js)

```javascript
// 响应状态码
export const RESULT_SUCCESS_CODE = 200;
export const RESULT_FAIL_CODE = 0;
export const AUTHORIZATION_OFFLINE_CODE = 402;

// 服务器配置
export const BASE_URL = "http://122.114.70.115:96/api";           // 接口地址
export const STATIC_HOST = "http://122.114.70.115:96";            // 静态资源地址

// 开发配置
export const DEV_DEVICE_NO = 'A0-A4-C5-B9-67-66';               // 本地开发机设备号
```

#### 3. 网络请求封装 (unireq.js)

```javascript
import {
    RESULT_SUCCESS_CODE,
    RESULT_FAIL_CODE
} from "@/common/constants.js";

/**
 * 统一网络请求封装
 * @param {String} url - 请求地址
 * @param {Object} data - 请求参数
 * @param {String} type - 请求方法 GET/POST/PUT/DELETE
 * @returns {Promise} 返回Promise对象
 */
export default function ajax(url, data = {}, type = 'GET') {
    return new Promise((resolve, reject) => {
        let promise;
        
        if (type === 'GET') {
            // GET请求参数拼接到URL
            let dataStr = '';
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + encodeURIComponent(data[key]) + '&';
            });
            
            if (dataStr !== '') {
                dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
                url = url + '?' + dataStr;
            }
            
            // 发送GET请求
            promise = uni.request({
                url,
                timeout: 10000,  // 设置超时时间
                header: {
                    'Content-Type': 'application/json'
                }
            });
        } else {
            // 发送POST/PUT/DELETE请求
            promise = uni.request({
                url,
                data,
                method: type,
                timeout: 10000,  // 设置超时时间
                header: {
                    'Content-Type': 'application/json'
                }
            });
        }
        
        promise.then(response => {
            /**
             * uni.request 返回值特殊说明：
             * response 为一个数组 [error, data]
             * - 第一项为错误信息（网络错误等）
             * - 第二项为响应数据
             */
            const [error, data] = response;
            
            if (error) {
                // 网络请求失败
                uni.showToast({
                    title: '网络请求失败',
                    icon: 'none'
                });
                reject(error);
                return;
            }
            
            const result = data.data;
            
            // 根据业务状态码处理响应
            if (result.code === RESULT_SUCCESS_CODE) {
                resolve(result);
            } else if (result.code === RESULT_FAIL_CODE) {
                // 业务失败但需要继续处理
                resolve(result);
            } else {
                // 其他错误状态
                uni.showToast({
                    title: result.msg || '请求失败',
                    icon: 'none'
                });
                reject(result);
            }
            
        }).catch(err => {
            // 请求异常处理
            console.error('请求异常:', err);
            uni.showToast({
                title: '网络异常，请稍后重试',
                icon: 'none'
            });
            reject(err);
        });
    });
}
```

#### 4. API接口定义 (api.js)

```javascript
/**
 * 包含项目所有接口请求函数
 * 所有函数返回Promise对象
 */
import ajax from './unireq.js';
import { BASE_URL } from "@/common/constants.js";

// 搜索相关API
export const reqHotWordList = () => {
    return ajax(`${BASE_URL}/bookV1/search/hot-word`);
};

// 设备相关API
export const saveOrGetDevice = (data) => {
    return ajax(`${BASE_URL}/device/saveOrGet`, data, 'POST');
};

// 用户相关API
export const getUserInfo = (userId) => {
    return ajax(`${BASE_URL}/user/${userId}`);
};

export const updateUserInfo = (data) => {
    return ajax(`${BASE_URL}/user/update`, data, 'PUT');
};

// 文件上传API
export const uploadFile = (filePath) => {
    return new Promise((resolve, reject) => {
        uni.uploadFile({
            url: `${BASE_URL}/upload`,
            filePath: filePath,
            name: 'file',
            success: (res) => {
                const data = JSON.parse(res.data);
                if (data.code === 200) {
                    resolve(data);
                } else {
                    reject(data);
                }
            },
            fail: (err) => {
                reject(err);
            }
        });
    });
};
```

#### 5. 使用示例

```vue
<template>
    <view class="content">
        <view class="data">
            <text>响应数据: {{ responseData }}</text>
        </view>
        <button type="primary" @click="getHotWords">获取热词</button>
        <button type="primary" @click="postDeviceTest">提交设备信息</button>
    </view>
</template>

<script>
import {
    reqHotWordList,
    saveOrGetDevice
} from "@/api/api.js";

export default {
    data() {
        return {
            responseData: '暂无数据'
        }
    },
    methods: {
        // 获取热词列表
        async getHotWords() {
            try {
                uni.showLoading({ title: '加载中...' });
                const res = await reqHotWordList();
                console.log('热词数据:', res);
                this.responseData = JSON.stringify(res);
            } catch (error) {
                console.error('获取热词失败:', error);
            } finally {
                uni.hideLoading();
            }
        },
        
        // 提交设备信息测试
        async postDeviceTest() {
            try {
                uni.showLoading({ title: '提交中...' });
                
                const deviceInfo = {
                    os: 'Android',                    // 操作系统
                    vendor: 'Xiaomi',                // 设备厂商
                    model: 'Mi 10',                  // 设备型号
                    mac: 'A0-A4-C5-B9-67-66',       // MAC地址
                    area: 'Beijing',                 // 设备区域
                    deviceNo: 'DEVICE_001',          // 设备唯一标识
                    status: 1,                       // 设备状态
                };

                const res = await saveOrGetDevice(deviceInfo);
                console.log('设备信息提交结果:', res);
                this.responseData = JSON.stringify(res);
                
                uni.showToast({
                    title: '提交成功',
                    icon: 'success'
                });
                
            } catch (error) {
                console.error('设备信息提交失败:', error);
            } finally {
                uni.hideLoading();
            }
        }
    },
    
    // 页面加载时获取热词
    onLoad() {
        this.getHotWords();
    }
}
</script>

<style scoped>
.content {
    padding: 20px;
}

.data {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #f5f5f5;
    border-radius: 5px;
}

button {
    margin: 10px 0;
}
</style>
```

#### 6. 高级功能扩展

##### 添加请求拦截器

```javascript
// 在 unireq.js 中添加拦截器功能
const requestInterceptor = (config) => {
    // 添加统一的请求头
    const token = uni.getStorageSync('token');
    if (token) {
        config.header = {
            ...config.header,
            'Authorization': `Bearer ${token}`
        };
    }
    
    // 添加时间戳防止缓存
    if (config.method === 'GET') {
        const separator = config.url.includes('?') ? '&' : '?';
        config.url += `${separator}_t=${Date.now()}`;
    }
    
    return config;
};
```

##### 添加响应拦截器

```javascript
const responseInterceptor = (response) => {
    // 统一处理登录过期
    if (response.data.code === 401) {
        uni.removeStorageSync('token');
        uni.navigateTo({
            url: '/pages/login/login'
        });
        return Promise.reject('登录过期');
    }
    
    return response;
};
```

### 封装的优势

1. **统一错误处理** - 集中处理网络错误和业务错误
2. **代码复用** - 避免重复的网络请求代码
3. **易于维护** - 修改网络请求逻辑只需修改一个文件
4. **类型安全** - 可以结合TypeScript提供更好的类型提示
5. **功能扩展** - 可以轻松添加拦截器、缓存等功能

---

## 总结

以上是uniapp开发中的常见问题及解决方案。在实际开发中，建议：

1. **设备验证：** 对于需要设备合法性验证的应用，建议结合后端实现完整的验证机制
2. **权限配置：** 打包前仔细检查所需权限是否正确配置
3. **平台差异：** 注意不同平台（iOS/Android/H5）的特性差异
4. **网络封装：** 统一封装网络请求，提高代码质量和维护性
5. **错误处理：** 完善的错误处理机制，提升用户体验
6. **测试验证：** 在真机上充分测试各项功能
7. **文档参考：** 及时查阅uniapp官方文档获取最新信息
