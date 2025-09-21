---
title: HTML5Plus 分享功能完整教程
category:
  - html5plus
tag:
  - 移动原生扩展API
  - 分享
---

# HTML5Plus 分享功能完整教程

### 用HBuilder实现打包后的 分享api 微信分享/微博分享教程

https://www.html5plus.org/doc/zh_cn/share.html#plus.share.getServices

https://www.html5plus.org/doc/zh_cn/share.html#plus.share.ShareMessage

首先要获取到一个对象 （比如说 你要分享到微信，那么这个对象就是包含 微信 信息的对象， 分享到QQ，那就是包含QQ信息的对象..微博等 之后就可以使用该对象里的方法 send 方法发起分享）

那这个对象哪里来？

通过 ==**plus.share.getServices()**== 这个方法中的回调函数会返回包含所有对象的一个数组，就是微信，QQ ，微博 的这些对象都会在这个数组里，代码如下：

```js
let t = this  //因为用的vue框架，这里需要用到this ，如果没有用可注释
plus.share.getServices(function(e) {
    　　t.shareData = e　　　　　　　　//这个回调函数的参数 e 就包含了 所有对象的数组
　　　　//在这个数组里 找到属于微信的对象 循环匹配查找
    　　for(var i in e){　　　　　　　　
        　　if('weixin' == e[i].id){
            　　t.sharewx = e[i]　　//保存到变量里 （之后即可使用该对象发起分享）
        　　}
    　　}
})

let msg = {
　　　　type: 'web',　　//分享的内容的类型
　　　　title: '页面分享标题',
　　　　content: '内容',
　　　　thumbs: ['http://img-cdn-qiniu.dcloud.net.cn/icon3.png'],
　　　　href: 'https://www.baidu.com/',
　　　　extra:{scene:"WXSceneSession"} // 'WXSceneSession'分享给好友，'WXSceneTimeline'分享到朋友圈
}

//msg对象的属性和参数 官方文档里有说明
//这里就用到了上面获取到的 微信对象 使用send发起分享
t.sharewx.send(msg, function() {
　　　　console.log('分享成功')
},function(error) {
　　　　console.log('分享失败')
})
```