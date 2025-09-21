---
title: JQuery教程
category:
  - JS
  - JQuery
---

# JQuery教程

## 📌 官网主要内容

🌐 **[https://jquery.com/](https://jquery.com/)**

* **下载**：最新的 jQuery 版本（目前 3.x 系列）。
* **API 文档**：[https://api.jquery.com/](https://api.jquery.com/) —— 全部方法查询。
* **博客 / 新闻**：jQuery Foundation 的更新信息。
* **插件库（已存档）**：曾经有 jQuery 插件中心，但现在大部分迁移到 GitHub/NPM。

---

:::tip
⚡ 小提示：
虽然 jQuery 仍在维护（安全更新），但它的应用场景主要集中在 **老项目维护** 或 **简单静态页面快速操作 DOM**，新项目一般推荐直接用 **原生 JavaScript** 或 **现代框架（Vue、React）**。
:::

## 常用方法

### serialize()和 serializeArray()

- https://api.jquery.com/serialize/#serialize
- https://api.jquery.com/serializeArray/#serializeArray

### Jquery 获取所有的Select 元素下的值

```js
<select id="regionOptions">
  <option value="westus" selected="selected">West US</option>
  <option value="westus2">West US2</option>
  <option value="eastus">East US</option>
</select>

$(function(){
  $("#regionOptions option").each(function () {
    var value = $(this).val();
    var text = $(this).text();
    console.log(value, "===",  text);
  })
});
```

### deferred对象

- https://api.jquery.com/category/deferred-object/
- http://www.ruanyifeng.com/blog/2011/08/a_detailed_explanation_of_jquery_deferred_object.html

### JQuery与DOM对象转换

```js

///jQuery对象转成DOM对象

var $v = $("#v") ; //jQuery对象
var v = $v[0]; //DOM对象

//DOM对象转成jQuery对象
var v = document.getElementById("v"); //DOM对象
var $v=$(v); //jQuery对象
```

### 🔹 jQuery 绑定事件的四种方式

#### 1. **直接绑定事件（快捷方法）**

```js
$("#btn").click(function() {
  alert("按钮被点击了！");
});
```

* 常用的有 `.click()`, `.dblclick()`, `.mouseover()`, `.keydown()` 等。
* **缺点**：不能绑定多个不同事件，语法不够灵活。

---

#### 2. **`.bind()` 方法（老版本方式，jQuery 3 已废弃）**

```js
$("#btn").bind("click", function() {
  alert("使用 bind 绑定的点击事件");
});
```

* 可以写成 `$("#btn").bind("click mouseover", handler)` 绑定多个事件。
* **缺点**：从 jQuery 3 开始已废弃，推荐用 `.on()` 代替。

---

#### 3. **`.delegate()` 方法（用于事件委托，jQuery 3 已废弃）**

```js
$("#list").delegate("li", "click", function() {
  alert("点击了某个 li 元素");
});
```

* 适合给 **动态生成的子元素** 绑定事件。
* **缺点**：也被 `.on()` 统一取代。

---

#### 4. **`.on()` 方法（推荐，现代写法）**

```js
// 普通绑定
$("#btn").on("click", function() {
  alert("推荐用 on 绑定事件");
});

// 一次绑定多个事件
$("#btn").on("mouseenter mouseleave", function() {
  $(this).toggleClass("hover");
});

// 事件委托
$("#list").on("click", "li", function() {
  alert("点击了 li");
});
```

* `.on()` 是 jQuery 官方推荐的现代事件绑定方式。
* 既可以直接绑定，也可以做事件委托，功能最强大。

---

#### 📌 总结

1. `.click()` 等快捷方法 → 简单绑定。
2. `.bind()` → 已废弃（用 `.on()` 替代）。
3. `.delegate()` → 已废弃（用 `.on()` 的事件委托替代）。
4. `.on()` → ✅ 推荐写法，统一替代前两者。


### `(function($){...})(jQuery)` 写法介绍

#### 核心概念
这是 JavaScript 中的**立即执行函数表达式（IIFE）**，用于 jQuery 插件开发。

#### 语法结构
```javascript
(function($){
    // 代码内容
})(jQuery);
```

#### 作用机制
1. **定义匿名函数**：`function($){...}` 创建一个参数为 `$` 的匿名函数
2. **立即调用**：外层括号 `()` 使函数立即执行，并传入 `jQuery` 对象作为参数
3. **参数映射**：`jQuery` 对象传递给参数 `$`，在函数内部可以使用 `$` 代替 `jQuery`

#### 主要优势
- **避免冲突**：防止 `$` 符号与其他JavaScript库冲突
- **作用域隔离**：创建独立作用域，避免全局变量污染
- **插件开发**：适合编写jQuery插件代码

#### 等价写法
```js
// 上述写法等同于：
var fn = function($) {
    // 代码内容
};
fn(jQuery);
```

#### 使用场景
- jQuery 插件开发
- 需要使用 `$` 符号但要避免命名冲突的场景
- 创建独立执行环境的代码块


### jQuery / JS 获取上传文件列表

```js
// 方式一：通过 name 属性获取（jQuery）
var files1 = $('input[name="fileTrans"]').prop('files');

// 方式二：通过 this 获取（jQuery）
// 常用于事件回调函数中，等价于 $("#txtImg1").prop("files")
var files2 = $(this).prop('files');

// 方式三：原生 JS 获取
// this 通常是 <input type="file"> 元素，等价于 document.getElementById("txtImg1").files
var files3 = this.files;

// 输出查看
console.log(files1);
console.log(files2);
console.log(files3);
```

示例表单

```
<form id="form">
  <input type="file" id="txtImg1" name="fileTrans" />
  <input type="hidden" name="file" />
</form>
```

## 常用工具库

### jquery二维码生成插件jquery.qrcode.js

- http://www.jq22.com/jquery-info294
- http://www.jq22.com/

### 10 款免费的 jQuery 图像缩放插件

- http://www.oschina.net/news/62344/free-jquery-image-zoom-plugins

### jquery EasyUI DataGrid 表格控件

📌 官网首页：
👉 https://www.jeasyui.com/

📌 DataGrid 官方文档：
👉 https://www.jeasyui.com/documentation/datagrid.php


## 调用接口

### JQuery 上传JSON表单提交后台

[uploadJson](./file/uploadJson.html)

```js
// 优化后的前端代码
function sendRequest() {
    // 使用对象字面量更简洁地初始化参数
    const params = {
        target_id: "",
        title: "",
        mainImage: "",
        bgSound: "",
        sections: "1",
        fileList: "2"
    };

    console.log("发送参数:", params); // 使用console.log替代alert

    $.ajax({
        url: 'http://localhost:8080/artronApp/requestJson', // 修复URL语法错误
        type: 'POST',
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8", // 移除重复的contentType设置
        dataType: "json",
        timeout: 10000, // 添加超时设置
        beforeSend: function() {
            console.log("正在处理请求，请稍候...");
        },
        success: function(response) {
            console.log("请求成功:", response);
            // 在这里处理成功响应
        },
        error: function(xhr, status, error) {
            console.error("请求失败:", {
                status: xhr.status,
                statusText: xhr.statusText,
                error: error
            });
            // 在这里处理错误情况
        }
    });
}

// 使用现代的fetch API版本（可选）
async function sendRequestWithFetch() {
    const params = {
        target_id: "",
        title: "",
        mainImage: "",
        bgSound: "",
        sections: "1",
        fileList: "2"
    };

    try {
        console.log("发送参数:", params);
        
        const response = await fetch('http://localhost:8080/artronApp/requestJson', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(params)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("请求成功:", data);
        return data;
    } catch (error) {
        console.error("请求失败:", error);
        throw error;
    }
}
```

```java
@RestController
@RequestMapping("/artronApp")
public class JsonRequestController {
    
    private static final Logger logger = LoggerFactory.getLogger(JsonRequestController.class);
    
    @PostMapping(value = "/requestJson", 
                consumes = MediaType.APPLICATION_JSON_VALUE,
                produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> requestJson(@RequestBody RequestParams params) {
        
        try {
            logger.info("接收到请求参数: {}", params);
            
            // 参数验证
            if (params == null) {
                return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "参数不能为空"));
            }
            
            // 业务逻辑处理
            // TODO: 在这里添加具体的业务逻辑
            
            // 构建响应
            Map<String, Object> response = Map.of(
                "success", true,
                "message", "处理成功",
                "data", params
            );
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("处理请求时发生错误", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("success", false, "message", "服务器内部错误"));
        }
    }
    
    // 使用专门的请求参数类
    public static class RequestParams {
        private String targetId;
        private String title;
        private String mainImage;
        private String bgSound;
        private String sections;
        private String fileList;
        
        // 构造函数
        public RequestParams() {}
        
        // Getter 和 Setter 方法
        public String getTargetId() { return targetId; }
        public void setTargetId(String targetId) { this.targetId = targetId; }
        
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        
        public String getMainImage() { return mainImage; }
        public void setMainImage(String mainImage) { this.mainImage = mainImage; }
        
        public String getBgSound() { return bgSound; }
        public void setBgSound(String bgSound) { this.bgSound = bgSound; }
        
        public String getSections() { return sections; }
        public void setSections(String sections) { this.sections = sections; }
        
        public String getFileList() { return fileList; }
        public void setFileList(String fileList) { this.fileList = fileList; }
        
        @Override
        public String toString() {
            return "RequestParams{" +
                    "targetId='" + targetId + '\'' +
                    ", title='" + title + '\'' +
                    ", mainImage='" + mainImage + '\'' +
                    ", bgSound='" + bgSound + '\'' +
                    ", sections='" + sections + '\'' +
                    ", fileList='" + fileList + '\'' +
                    '}';
        }
    }
    
    // 如果你更喜欢使用Map接收参数的版本
    @PostMapping(value = "/requestJsonMap")
    public ResponseEntity<Map<String, Object>> requestJsonMap(@RequestBody Map<String, Object> params) {
        
        try {
            logger.info("接收到请求参数: {}", params);
            
            // 构建响应
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "处理成功");
            response.put("receivedParams", params);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("处理请求时发生错误", e);
            Map<String, Object> errorResponse = Map.of(
                "success", false,
                "message", "服务器内部错误"
            );
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
```

### 参考资料

- http://www.jb51.net/article/111722.htm