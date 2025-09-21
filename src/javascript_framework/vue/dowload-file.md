---
title: Vue文件下载实现指南
category:
  - vue
date: 2025-09-20
---

# Vue文件下载实现指南

在Vue项目中，文件下载是一个常见的功能需求。本文将介绍三种主要的文件下载实现方式，每种方式都有其适用场景和特点。

## 方式一：超链接方式 (GET请求)

这是最简单直接的文件下载方式，通过HTML的`<a>`标签向后端发送GET请求。

### 1.1 直接使用a标签

```html
<a :href='"/user/downloadExcel"'>下载模板</a>
```

### 1.2 动态创建a标签

```html
<div name="downloadfile" @click="downloadExcel">下载</div>
```

```javascript
function downloadExcel() {
    let a = document.createElement('a')
    a.href = "/user/downloadExcel"
    a.click()
}
```

### 1.3 使用window.location.href

```javascript
function downloadExcel() {
    window.location.href = "/tUserHyRights/downloadUsersUrl"
}
```

**适用场景：**
- 简单的文件下载
- 不需要传递复杂参数
- 后端支持GET请求下载

## 方式二：iframe方式

通过创建隐藏的iframe来实现文件下载，可以避免页面跳转。

```html
<el-button 
    size="mini" 
    class="filter-item" 
    type="primary" 
    icon="el-icon-download" 
    @click="handleExport(scope.row)">
    导出
</el-button>
```

```javascript
handleExport(row) {
    var elemIF = document.createElement('iframe')
    elemIF.src = 'user/downloadExcel?snapshotTime=' + 
                 formatDate(new Date(row.snapshotTime), 'yyyy-MM-dd hh:mm') +
                 '&category=' + row.category
    elemIF.style.display = 'none'
    document.body.appendChild(elemIF)
}
```

**适用场景：**
- 需要传递查询参数
- 避免页面跳转
- 后端返回文件流

## 方式三：Blob方式 (POST请求)

这是最灵活的方式，使用axios发送POST请求，通过Blob处理返回的二进制数据。

### 3.1 组件调用

```html
<el-button 
    size="mini" 
    class="filter-item" 
    type="primary" 
    icon="el-icon-download" 
    @click="handleExport(scope.row)">
    导出
</el-button>
```

```javascript
handleExport(row) {
    const url = "/user/downloadExcel"
    const options = {
        snapshotTime: formatDate(new Date(row.snapshotTime), 'yyyy-MM-dd hh:mm')
    }
    exportExcel(url, options)
}
```

### 3.2 封装的导出函数

```javascript
/**
 * 封装导出Excel文件请求
 * @param {string} url - 请求地址
 * @param {Object} options - 请求参数
 * @returns {Promise}
 */
export function exportExcel(url, options = {}) {
    return new Promise((resolve, reject) => {
        console.log(`${url} 请求数据，参数=>`, JSON.stringify(options))
        
        // 设置请求头
        axios.defaults.headers['content-type'] = 'application/json;charset=UTF-8'
        
        axios({
            method: 'post',
            url: url,
            data: options,
            responseType: 'blob' // 关键：指定响应数据类型为blob
        }).then(response => {
            resolve(response.data)
            
            // 创建Blob对象
            let blob = new Blob([response.data], {
                type: 'application/vnd.ms-excel'
            })
            
            // 生成文件名
            let fileName = Date.parse(new Date()) + '.xlsx'
            
            // 兼容IE浏览器
            if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveBlob(blob, fileName)
            } else {
                // 现代浏览器
                var link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = fileName
                link.click()
                
                // 释放内存
                window.URL.revokeObjectURL(link.href)
            }
        }).catch(err => {
            reject(err)
        })
    })
}
```

**适用场景：**
- 需要发送POST请求
- 传递复杂的请求参数
- 需要处理二进制文件数据
- 支持各种文件类型
- 需要自定义文件名

## 三种方式对比

| 方式 | 请求类型 | 复杂度 | 参数传递 | 浏览器兼容性 | 适用场景 |
|------|----------|--------|----------|--------------|----------|
| 超链接 | GET | 简单 | URL参数 | 优秀 | 简单下载 |
| iframe | GET | 中等 | URL参数 | 良好 | 避免页面跳转 |
| Blob | POST | 复杂 | 请求体 | 良好 | 复杂下载需求 |

## 最佳实践建议

1. **简单文件下载**：优先使用超链接方式
2. **需要传递参数但保持页面状态**：使用iframe方式
3. **复杂业务场景**：使用Blob方式，支持错误处理和进度监控
4. **文件名处理**：Blob方式可以自定义文件名，其他方式依赖后端设置
5. **错误处理**：Blob方式可以更好地处理下载失败的情况

## 注意事项

- 使用Blob方式时，务必设置`responseType: 'blob'`
- 记得在创建的临时URL使用完后调用`revokeObjectURL`释放内存
- 考虑浏览器兼容性，特别是IE浏览器的特殊处理
- 后端需要正确设置Content-Type和Content-Disposition响应头