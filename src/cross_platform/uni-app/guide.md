---
title: 入门指导
category:
  - 跨平台框架
tag:
  - uni-app
order: 1
---

# uni-app 教程参考手册

## 📚 基础入门

### 官方资源
- **官方文档**：https://uniapp.dcloud.io/
- **官方快速入门教程**：https://uniapp.dcloud.io/quickstart-hx

### 第三方入门教程
- **快速入门教程**：https://www.cnblogs.com/nanyang520/p/11726416.html

### BindingX教程

- gitee官方地址：https://gitee.com/mirrors/BindingX
- 阿里巴巴官方文档：https://alibaba.github.io/bindingx/guide/introduce
- uni-app官方示例：https://uniapp.dcloud.net.cn/tutorial/nvue-api.html#bindingx
- 第三方文档：https://www.jianshu.com/p/14729b28d15f

### uni-app v3 教程

### uni-app vue-cli 教程


### ad广告教程

https://doc.shenshiads.com/uniapp.html#%E5%BC%80%E9%80%9A%E6%B5%81%E7%A8%8B


---

## 🎨 UI 与样式

### 图标引入
引入图标时需要注意一些事项和最佳实践：

**参考资源：**
- **公众号程序猿的开源工具密圈**：https://mp.weixin.qq.com/s?__biz=MzI4MDQ5MTUzMg==&mid=2247490591&idx=1&sn=1a54d7c343daf24bb8d39ccabd854f1e&chksm=ebb6ff7cdcc1766a10751a69169db2df6c10f18d624922250ae159557968c202a2ab12944e19#rd
- **第三方 CSDN 教程**：https://blog.csdn.net/weixin_42674490/article/details/118356921

### 夜间模式实现
实现日间夜间自动变化的夜间模式功能：

**参考资源：**
- **夜间模式实现方法**：https://www.ruletree.club/archives/2610/

---

## ⚡ 高级功能

### renderjs

使用 renderjs 在视图层运行 JavaScript，实现复杂的交互效果：

**参考资源：**
- **官网教程**：https://uniapp.dcloud.io/frame?id=renderjs
- **第三方教程**：https://blog.csdn.net/weixin_49546561/article/details/121776045

### 设备与系统交互

#### 获取本机已安装的 APP
获取用户设备上已安装的应用程序列表：

**参考资源：**
- **实现教程**：https://www.cnblogs.com/tsuru/p/16923235.html

### 实现安卓手势拖拽右滑关闭当前页面并返回上级页面 + 阴影效果

https://mp.weixin.qq.com/s?__biz=MzI4MDQ5MTUzMg==&mid=2247493241&idx=1&sn=158eca2128dd8a1b7849daae2fd02f2a&chksm=ebb5051adcc28c0cac3435f8e0bcba2df2da4eaeb744d576ae3a5d85864854b0ff8ba8cab417&token=674004199&lang=zh_CN#rd


### uni-app nvue/vue 引入第三方字体教程，在线ttf转base64和在线识别字体网站分享

**参考资源：**
- **公众号程序猿的开源工具密圈**：https://mp.weixin.qq.com/s?__biz=MzI4MDQ5MTUzMg==&mid=2247494297&idx=1&sn=3a21a44810e8b93b691bb700667ec471&chksm=ebb509fadcc280ec75d47511985e18aaadb12e0547f2ca3ccbaacd85b806af1df8f7b35ea0cd#rd
- https://blog.csdn.net/feiyu_may/article/details/89518326
- https://blog.csdn.net/tuoni123/article/details/122182360

补充，貌似安卓设备中nvue页面上支持本地路径引入图标字体，总之在安卓中以下⽅式引⼊⽆任何报错

```
beforeCreate(){

// #ifdef APP-NVUE

var，domModule = weex.requireModule('dom');
domModule.addRule('fontFace',{
   'fontFamily':"texticon",
   'src':"url('/static/texticon/texticon.ttf')"
  });

// #endif
---
```

常见问题

```
**1.[渲染层网络层错误] Failed to load local font resource /assets/micons.b89d04c0.ttf-do-not-use-local-path-./app.wxss&8077&7**
**net::ERR_CACHE_MISS**
(env: Windows,mp,1.06.2405020; lib: 3.6.2)

**分析：**上面的错误是uni-app 打包到小程序中，引入自定义字体出现的问题

**结论：**在app-plus、H5 都能识别ttf文件，但是在小程序不识别，小程序只能识别base64编码的字体文件，所以保留了woff2，如：

@font-face {
  font-family: 'miconfont';
  src:
    url('data:font/woff2;charset=utf-8;base64,yourbase64xxxx') format('woff2'),
    url("~@/uni_modules/miliqk-app/css/global/icons/miconfont.ttf") format("truetype");
}

**在线转换字体：**https://transfonter.org/ 

```

### uni-app 使用web-view加载的本地及远程HTML网页和vue页面通讯教程（实现 与 外部 HTML 页面通信）

**参考资源：**
- **公众号程序猿的开源工具密圈**：https://mp.weixin.qq.com/s?__biz=MzI4MDQ5MTUzMg==&mid=2247499003&idx=1&sn=92f884e1ff9e717f493cf2a94c2de10b&chksm=ebb51f98dcc2968ec300e52d6b28b0eb60cf50e163deb66ec83525e3e101a1c7dd08a785136f&token=1849700495&lang=zh_CN#rd

### uni-app中实现一个全局弹层组件

https://juejin.cn/post/7069781217586970631

https://ext.dcloud.net.cn/search?q=%E5%85%A8%E5%B1%80%E5%BC%B9%E5%B1%82


## 📦 依赖管理与组件开发

### 使用 npm 安装第三方依赖

**操作步骤：**
1. 进入项目文件夹，如果没有 package.json 文件，执行 `npm init` 初始化
2. 执行 `npm install --save lodash` 安装第三方库
3. 在 Vue 组件中使用 import 导入

**示例代码：**
```javascript
<script>
import lodash from 'lodash'
//方法忽略...
console.log('lodash：', lodash.random(12,5));
</script>
```

**参考资源：**
- **详细教程**：https://blog.csdn.net/u011320682/article/details/90054784

### uni_modules 组件开发与发布
开发和发布可复用的 uni_modules 组件：

**参考资源：**
- **官方教程**: https://uniapp.dcloud.net.cn/plugin/uni_modules.html
- **组件开发教程**：https://blog.csdn.net/weixin_38633659/article/details/121939004

### 引入 jQuery 配置
在 Vue、uni-app（H5、App）中引入和配置 jQuery：

**参考资源：**
- **配置教程**：https://mp.weixin.qq.com/s?__biz=MzI4MDQ5MTUzMg==&mid=2247498728&idx=2&sn=48e3877404502933528a780e54d03b41&chksm=ebb5188bdcc2919d0cf37902c27d65600b2f9364302981de81a11567f217a509437cc9f8d7ac#rd

### uni-app 微信小程序登录流程梳理

**参考资源：**
- https://juejin.cn/post/7268663683881156669
- **小微万能导航宝箱实战项目**

### uni-app 主题切换功能 实现

**参考资源：**
- https://zhuanlan.zhihu.com/p/635051054
- https://zhuanlan.zhihu.com/p/635303307

---

## 🚀 应用发布与更新

### uni-upgrade-center 搭建 APP 更新系统

使用 uni-upgrade-center 搭建完整的应用更新系统，实现版本检测、增量更新、热更新等功能：

**核心功能：**
- 版本管理和发布
- 自动检测更新
- 增量更新和热更新
- 更新进度显示
- 强制更新控制

**参考资源：**
- **公众号完整教程**：https://mp.weixin.qq.com/s?__biz=MzI4MDQ5MTUzMg==&mid=2247496356&idx=1&sn=29457f383e0012779173d7479d854c4d&chksm=ebb511c7dcc298d18df0feeb7604661207d1ce611c898a3b0d2fc4599b73034490c5c39b813f&token=2034034739&lang=zh_CN#rd
- **CSDN 实现教程（基础版）**：https://blog.csdn.net/qq_42027681/article/details/115827047
- **CSDN 进阶教程（详细版）**：https://blog.csdn.net/tuoni123/article/details/125462996

**实现步骤：**
1. 搭建更新服务端
2. 配置版本信息和更新策略
3. 客户端集成更新检测
4. 处理更新下载和安装流程


### uni-app升级APP，包含apk整包升级和wgt应用资源升级 HBuilderX开发app实现自动更新版本

https://uniapp.dcloud.net.cn/tutorial/version.html#wgt%E7%83%AD%E6%9B%B4%E6%96%B0%E9%80%A0%E6%88%90%E7%9A%84%E5%B7%AE%E5%BC%82

https://blog.csdn.net/ganquanzhong/article/details/102461662


## 安卓/iOS专题

### 制作自定义证书，uniapp安卓打包使用及获取签名方法

https://blog.csdn.net/ting0712/article/details/116147281

### 其他设置 

#### 设置UrlSchemes

https://uniapp.dcloud.net.cn/tutorial/app-android-schemes.html#%E8%AE%BE%E7%BD%AEurlschemes

---

