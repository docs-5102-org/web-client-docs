---
title: uv-ui教程与注意事项
category:
  - 跨平台框架
tag:
  - uni-app
  - uv-ui
order: 3
---

# uv-ui教程与注意事项

官网：https://www.uvui.cn/components/setting.html
示例：https://h5.uvui.cn/

## 组件注意事项

### uv-search

uv-search 搜索时在nvue页面中，disabled=true 时，点击中间搜索框跳转事件不执行，修改如下
将 最外层的 clickHandler 事件改到 input标签上，具体如下：

```vue
<view
  class="uv-search"
  **@tap="clickHandler"  // -**  
    :style="[{
   margin: margin,
   flex: 1,
  }, $uv.addStyle(customStyle)]"
>
...
</view>

<input
  **@tap="clickHandler"  // +**
  confirm-type="search"
  @blur="blur"
```
