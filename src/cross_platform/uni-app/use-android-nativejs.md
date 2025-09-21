---
title: uni-app 中使用 Android 原生 JS 开发指南
category:
  - 跨平台框架
tag:
  - uni-app
order: 2
---

# uni-app 中使用 Android 原生 JS 开发指南

## 概述

uni-app 提供了强大的原生能力扩展机制，允许开发者在不编写原生 Android 代码的情况下，直接通过 JavaScript 调用 Android 系统 API。这种方式特别适合需要使用系统级功能但又不想深入原生开发的场景。

本文将详细介绍如何在 uni-app 中使用 Android 原生 JS，包括常见的图片选择、微信扫码、相册操作等实用案例。

## 基础概念

### plus.android 对象

`plus.android` 是 uni-app 提供的 Android 原生扩展对象，主要包含以下方法：

- `importClass()`：导入 Android 原生类
- `runtimeMainActivity()`：获取主 Activity 实例
- `newObject()`：创建原生对象实例

### 基本使用模式

```javascript
// 1. 导入需要的 Android 类
let Intent = plus.android.importClass('android.content.Intent');

// 2. 获取主Activity
let main = plus.android.runtimeMainActivity();

// 3. 创建对象并调用方法
let intent = new Intent();
main.startActivity(intent);
```

## 实用案例详解

### 1. 图片选择器

#### 基础版本 - 单图选择

```javascript
/**
 * 打开系统图片选择器
 * @param {number} requestCode - 请求码，用于在回调中识别请求
 */
function openImagePicker(requestCode = 101) {
    try {
        // 导入Intent类
        const Intent = plus.android.importClass("android.content.Intent");
        
        // 获取主Activity
        const main = plus.android.runtimeMainActivity();
        
        // 创建Intent
        const intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("image/*");
        
        // 启动选择器
        main.startActivityForResult(
            Intent.createChooser(intent, "选择图片"), 
            requestCode
        );
        
        console.log('图片选择器已启动');
    } catch (error) {
        console.error('启动图片选择器失败:', error);
        uni.showToast({
            title: '启动图片选择器失败',
            icon: 'none'
        });
    }
}
```

#### 增强版本 - 多种选择方式

```javascript
/**
 * 多种图片选择方式
 * @param {string} mode - 选择模式: 'content'|'pick'|'document'|'media'
 * @param {number} requestCode - 请求码
 */
function openImagePickerAdvanced(mode = 'content', requestCode = 101) {
    try {
        const Intent = plus.android.importClass("android.content.Intent");
        const MediaStore = plus.android.importClass("android.provider.MediaStore");
        const main = plus.android.runtimeMainActivity();
        
        let intent;
        
        switch (mode) {
            case 'content':
                // 方式1：通用内容选择器（推荐）
                intent = new Intent(Intent.ACTION_GET_CONTENT);
                intent.addCategory(Intent.CATEGORY_OPENABLE);
                intent.setType("image/*");
                break;
                
            case 'pick':
                // 方式2：相册选择器
                intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
                intent.setType("image/*");
                break;
                
            case 'document':
                // 方式3：文档选择器（Android 4.4+）
                intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
                intent.addCategory(Intent.CATEGORY_OPENABLE);
                intent.setType("image/*");
                break;
                
            case 'media':
                // 方式4：媒体内容选择器
                intent = new Intent(Intent.ACTION_GET_CONTENT, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
                intent.setType("image/*");
                break;
                
            default:
                throw new Error('不支持的选择模式');
        }
        
        main.startActivityForResult(intent, requestCode);
        
    } catch (error) {
        console.error('启动图片选择器失败:', error);
        uni.showToast({
            title: `启动${mode}模式失败`,
            icon: 'none'
        });
    }
}
```

### 2. 微信扫码功能

```javascript
/**
 * 跨平台微信扫码
 * 支持 iOS 和 Android
 */
function openWeChatScan() {
    try {
        if (plus.os.name === 'iOS') {
            // iOS 使用 URL Scheme
            plus.runtime.openURL('weixin://scanqrcode');
        } else if (plus.os.name === 'Android') {
            // Android 使用 Intent
            const Intent = plus.android.importClass('android.content.Intent');
            const ComponentName = plus.android.importClass('android.content.ComponentName');
            const main = plus.android.runtimeMainActivity();
            
            const intent = new Intent();
            intent.setComponent(
                new ComponentName('com.tencent.mm', 'com.tencent.mm.ui.LauncherUI')
            );
            intent.putExtra('LauncherUI.From.Scaner.Shortcut', true);
            intent.setFlags(335544320); // Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP
            intent.setAction('android.intent.action.VIEW');
            
            main.startActivity(intent);
        }
        
        console.log('微信扫码已启动');
    } catch (error) {
        console.error('启动微信扫码失败:', error);
        uni.showToast({
            title: '请确保已安装微信',
            icon: 'none'
        });
    }
}

/**
 * 检查微信是否安装
 * @returns {boolean} 是否安装微信
 */
function isWeChatInstalled() {
    try {
        if (plus.os.name === 'Android') {
            const PackageManager = plus.android.importClass('android.content.pm.PackageManager');
            const main = plus.android.runtimeMainActivity();
            const packageManager = main.getPackageManager();
            
            try {
                packageManager.getPackageInfo('com.tencent.mm', 0);
                return true;
            } catch (e) {
                return false;
            }
        }
        return true; // iOS 默认返回 true，由系统处理
    } catch (error) {
        console.error('检查微信安装状态失败:', error);
        return false;
    }
}
```

### 3. 相册图片列表获取

```javascript
/**
 * 获取设备相册图片列表
 * @param {number} limit - 限制获取数量，0表示获取全部
 * @param {string} sortOrder - 排序方式: 'ASC'|'DESC'
 * @returns {Array} 图片信息数组
 */
function getImageListFromAlbum(limit = 0, sortOrder = 'DESC') {
    try {
        const imageList = [];
        const MediaStore = plus.android.importClass('android.provider.MediaStore');
        
        // 定义查询列
        const photoColumns = [
            MediaStore.Images.Media._ID,
            MediaStore.Images.Media.DATA,
            MediaStore.Images.Media.DATE_ADDED,
            MediaStore.Images.Media.DATE_MODIFIED,
            MediaStore.Images.Media.SIZE,
            MediaStore.Images.Media.DISPLAY_NAME,
            MediaStore.Images.Media.MIME_TYPE
        ];
        
        const main = plus.android.runtimeMainActivity();
        const resolver = main.getContentResolver();
        plus.android.importClass(resolver);
        
        // 构建排序条件
        const orderBy = `${MediaStore.Images.Media.DATE_ADDED} ${sortOrder}`;
        const limitClause = limit > 0 ? ` LIMIT ${limit}` : '';
        
        // 执行查询
        const cursor = resolver.query(
            MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
            photoColumns,
            null,
            null,
            orderBy + limitClause
        );
        
        plus.android.importClass(cursor);
        
        // 遍历结果
        while (cursor.moveToNext()) {
            const imageInfo = {
                id: cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media._ID)),
                filePath: cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA)),
                dateAdded: cursor.getLong(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATE_ADDED)),
                dateModified: cursor.getLong(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATE_MODIFIED)),
                size: cursor.getLong(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.SIZE)),
                displayName: cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DISPLAY_NAME)),
                mimeType: cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.MIME_TYPE))
            };
            
            // 转换时间戳为可读格式
            imageInfo.dateAddedFormatted = new Date(imageInfo.dateAdded * 1000).toLocaleString();
            imageInfo.dateModifiedFormatted = new Date(imageInfo.dateModified * 1000).toLocaleString();
            
            // 格式化文件大小
            imageInfo.sizeFormatted = formatFileSize(imageInfo.size);
            
            imageList.push(imageInfo);
        }
        
        cursor.close();
        
        console.log(`成功获取 ${imageList.length} 张图片信息`);
        return imageList;
        
    } catch (error) {
        console.error('获取相册图片列表失败:', error);
        uni.showToast({
            title: '获取相册失败',
            icon: 'none'
        });
        return [];
    }
}

/**
 * 格式化文件大小
 * @param {number} bytes - 字节数
 * @returns {string} 格式化后的大小
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
```

### 4. 权限检查与请求

```javascript
/**
 * 检查和请求存储权限
 * @returns {Promise<boolean>} 是否有权限
 */
function checkAndRequestStoragePermission() {
    return new Promise((resolve, reject) => {
        try {
            // 检查当前权限状态
            const hasPermission = plus.navigator.checkPermission('WRITE_EXTERNAL_STORAGE');
            
            if (hasPermission === 'granted') {
                resolve(true);
                return;
            }
            
            // 请求权限
            plus.navigator.requestPermission(
                ['READ_EXTERNAL_STORAGE', 'WRITE_EXTERNAL_STORAGE'],
                (result) => {
                    const granted = result.every(status => status === 'granted');
                    resolve(granted);
                },
                (error) => {
                    console.error('权限请求失败:', error);
                    reject(error);
                }
            );
            
        } catch (error) {
            console.error('权限检查失败:', error);
            reject(error);
        }
    });
}
```

## 实用工具类

### Android 原生 JS 工具类

```javascript
/**
 * Android 原生 JS 工具类
 */
class AndroidNativeHelper {
    
    /**
     * 安全导入 Android 类
     * @param {string} className - 类名
     * @returns {Object|null} 类对象
     */
    static safeImportClass(className) {
        try {
            return plus.android.importClass(className);
        } catch (error) {
            console.error(`导入类失败: ${className}`, error);
            return null;
        }
    }
    
    /**
     * 获取主 Activity
     * @returns {Object|null} Activity 对象
     */
    static getMainActivity() {
        try {
            return plus.android.runtimeMainActivity();
        } catch (error) {
            console.error('获取主Activity失败:', error);
            return null;
        }
    }
    
    /**
     * 检查应用是否安装
     * @param {string} packageName - 包名
     * @returns {boolean} 是否安装
     */
    static isAppInstalled(packageName) {
        try {
            const PackageManager = this.safeImportClass('android.content.pm.PackageManager');
            const main = this.getMainActivity();
            
            if (!PackageManager || !main) return false;
            
            const packageManager = main.getPackageManager();
            try {
                packageManager.getPackageInfo(packageName, 0);
                return true;
            } catch (e) {
                return false;
            }
        } catch (error) {
            console.error('检查应用安装状态失败:', error);
            return false;
        }
    }
    
    /**
     * 获取应用版本信息
     * @returns {Object} 版本信息
     */
    static getAppVersionInfo() {
        try {
            const PackageManager = this.safeImportClass('android.content.pm.PackageManager');
            const main = this.getMainActivity();
            
            if (!PackageManager || !main) return null;
            
            const packageManager = main.getPackageManager();
            const packageInfo = packageManager.getPackageInfo(main.getPackageName(), 0);
            
            return {
                versionName: packageInfo.versionName,
                versionCode: packageInfo.versionCode,
                packageName: packageInfo.packageName
            };
        } catch (error) {
            console.error('获取应用版本信息失败:', error);
            return null;
        }
    }
}
```

## 最佳实践

### 1. 错误处理

```javascript
// 始终使用 try-catch 包装原生调用
function safeNativeCall(callback) {
    try {
        return callback();
    } catch (error) {
        console.error('原生调用失败:', error);
        uni.showToast({
            title: '操作失败',
            icon: 'none'
        });
        return null;
    }
}
```

### 2. 权限管理

```javascript
// 在使用敏感功能前检查权限
async function safeStorageOperation(operation) {
    const hasPermission = await checkAndRequestStoragePermission();
    if (!hasPermission) {
        uni.showToast({
            title: '需要存储权限',
            icon: 'none'
        });
        return;
    }
    
    return operation();
}
```

### 3. 平台兼容性

```javascript
// 检查平台和版本兼容性
function checkCompatibility() {
    if (plus.os.name !== 'Android') {
        console.warn('此功能仅支持Android平台');
        return false;
    }
    
    const version = parseInt(plus.os.version);
    if (version < 21) { // Android 5.0
        console.warn('此功能需要Android 5.0+');
        return false;
    }
    
    return true;
}
```

## 常见问题与解决方案

### 1. 类导入失败

**问题**：`importClass` 失败或返回 null **解决方案**：

- 检查类名拼写是否正确
- 确认目标API级别是否支持该类
- 使用 `safeImportClass` 进行安全导入

### 2. 权限被拒绝

**问题**：调用系统功能时权限不足 **解决方案**：

- 在 `manifest.json` 中声明必要权限
- 运行时动态请求权限
- 提供权限说明和引导

### 3. Activity 结果获取

**问题**：`startActivityForResult` 无法获取返回结果 **解决方案**：

- 使用 uni-app 的生命周期钩子
- 实现 `onActivityResult` 监听器
- 考虑使用 uni-app 原生API替代

### 4. 内存泄漏

**问题**：长时间运行后应用卡顿 **解决方案**：

- 及时关闭 Cursor 对象
- 避免持有大量原生对象引用
- 使用完成后主动释放资源

## 性能优化建议

### 1. 延迟加载

```javascript
// 延迟导入类，避免启动时性能影响
let Intent = null;
function getIntentClass() {
    if (!Intent) {
        Intent = plus.android.importClass('android.content.Intent');
    }
    return Intent;
}
```

### 2. 缓存机制

```javascript
// 缓存昂贵的查询结果
const imageListCache = {
    data: null,
    timestamp: 0,
    maxAge: 60000, // 1分钟缓存
    
    get() {
        if (this.data && Date.now() - this.timestamp < this.maxAge) {
            return this.data;
        }
        return null;
    },
    
    set(data) {
        this.data = data;
        this.timestamp = Date.now();
    }
};
```

### 3. 批量操作

```javascript
// 批量处理，减少原生调用次数
function batchProcessImages(imageList, processor) {
    const batchSize = 50;
    const results = [];
    
    for (let i = 0; i < imageList.length; i += batchSize) {
        const batch = imageList.slice(i, i + batchSize);
        results.push(...processor(batch));
    }
    
    return results;
}
```

## 参考链接

- **[uni-app 原生插件开发指南](https://uniapp.dcloud.io/plugin/native-plugin)** - uni-app官方原生插件开发文档
- **[HTML5+ Android平台扩展API](https://www.html5plus.org/doc/zh_cn/android.html)** - HTML5+规范Android扩展API文档
- **[Android Intent官方文档](https://developer.android.com/guide/components/intents-filters)** - Android Intent使用指南
- **[Android MediaStore官方文档](https://developer.android.com/reference/android/provider/MediaStore)** - 媒体存储访问API文档
- **[uni-app条件编译](https://uniapp.dcloud.io/platform)** - 跨平台兼容性处理

## 总结

使用 uni-app 的 Android 原生 JS 功能可以在不编写 Java 代码的情况下访问强大的 Android 系统能力。通过合理的错误处理、权限管理和性能优化，可以创建出功能丰富且稳定的跨平台应用。

在实际开发中，建议：

1. 优先使用 uni-app 提供的跨平台 API
2. 对于特殊需求才使用原生扩展
3. 注意平台兼容性和版本差异
4. 做好错误处理和用户体验优化

掌握这些技能将大大提升 uni-app 应用的功能边界和用户体验。