---
title: subNVue应用
category:
  - 跨平台框架
tag:
  - uni-app
  - subNVue
order: 1
---

# subNVue应用

## 官方文档教程： 

- https://ask.dcloud.net.cn/article/35948
- https://ask.dcloud.net.cn/article/39811

## 插件示例
- https://ext.dcloud.net.cn/plugin?id=1573
- https://ext.dcloud.net.cn/plugin?id=267

## 自己在基础上写的demo示例

```vue
<template>
    <swiper :disable-touch="disabledTouch" :current="active" class="swiper" :vertical="direction=='down'?true:false"
     @change="change">
        <swiper-item v-if="direction!='left'">
            <view class="swiper-item-0"></view>
        </swiper-item>
        <swiper-item @touchstart="touchstart" @touchend="touchend" @touchcancel="touchend" @touchmove="touchmove">
            <view class="swiper-item-1" :style="style">
                <view class="title" v-if="title">
                    <text class="title-text">{{title}}</text>
                    <uni-icons type="close" size="20" color="#333333" class="close" @click="close"></uni-icons>
                </view>
                <slot name="content" />
            </view>
        </swiper-item>
        <swiper-item v-if="direction=='left'">
            <view class="swiper-item-0"></view>
        </swiper-item>
    </swiper>
</template>

<script>

    /**
     * @description 子窗口subNvue/原生子窗体 滑动弹窗组件 只适用于nvue、app端
     * @see
     *         https://ask.dcloud.net.cn/article/35948
     *      https://ask.dcloud.net.cn/article/39811
     * @property {String}    title            标题
     * @property {String}    borderRadius    圆角大小 默认0
     * @property {String}    backgroundColor    背景色，默认#FFFFFF
     * @property {String}    direction        滑动方向     type = [top|down|left|right] 弹出方式  默认'down'向下
     * @example

        1.配置

        目录    |-- pages  
                |-- index               // index 目录  
                |   |-- subNVue         // subNVue 目录  
                |       |-- popup.nvue  // 弹出层子窗体  
                |-- index.vue           // index 页面

        page.json

            {
                "path": "pages/index/index",
                "style": {
                    "navigationBarTitleText": "test",
                    "app-plus": {  
                        "subNVues":[{  
                            "id": "map_widget", // 唯一标识  
                            "path": "pages/index/subNVue/popup" ,// 子弹窗nvue页面路径  
                            "type": "popup",
                            "style": {  
                                "position": "absolute",
                                "dock": "right",
                                "height": "1000rpx",  
                                "bottom": "0",
                                "background": "transparent"  
                            }
                        }]  
                    }
                }
            },

        2.popup.nvue 内容如下：

            1）在script中引用插件 如果是easycom 可以省去引用的步骤 但目前仅支持components目录下，uni_modules自定义窗体暂不支持
            import miliqkSubNvuePopup from "@/components/miliqk-subnvue-popup/miliqk-subnvue-popup.vue"
            export default {
                components: {miliqkSubNvuePopup}
            }

            2）在子窗体中引用
            <template>
                <view style="flex: 1;">
                    <miliqk-subnvue-popup borderRadius="20rpx" direction="down" title="我是子窗体">
                        <view slot="content">
                            <!-- 此处填写布局代码 -->
                        </view>
                    </miliqk-subnvue-popup>
                </view>
            </template>

        3.index.nvue 内容调用子窗体内容

            <template>
                <view style="flex: 1;">
                    <view>
                        <button @click="open()">打开弹窗</button>
                        <button @click="close()">关闭弹窗</button>
                    </view>
                </view>
            </template>

            script代码操作子窗体

            const subNVue = uni.getSubNVueById('map_widget')  
            export default {
                methods:{
                    // 打开 nvue 子窗体  
                    open(){
                        console.log("=======subNVue========",  subNVue);
                        subNVue.show('slide-in-bottom', 300, function(){  
                            // 打开后进行一些操作...
                        });  

                    },

                    close(){
                        subNVue.hide('fade-out', 300)
                    },
                }
            }
     */
    const subNVue = uni.getCurrentSubNVue();
    export default {
        name: "miliqkSubNVuePopup",
        props: {
            title: {
                type: String,
                default: ''
            },
            borderRadius: {
                type: String,
                default: '0'
            },
            backgroundColor: {
                type: String,
                default: '#FFFFFF'
            },
            direction: {
                type: String,
                default: 'down'
            }
        },
        data() {
            return {
                active: 1,
                defaultActive:1,
                disabledTouch: false,
                startPage: 0,
                style: {},
                platform:''
            };
        },
        methods: {
            change(e) {
                this.active = e.detail.current
                if (e.detail.current != this.defaultActive) {
                    setTimeout(() => {
                        this.active = this.defaultActive
                    }, 100)
                    subNVue.hide('none')
                }
            },
            //关闭当前子窗口
            close() {
                switch (this.direction) {
                    case "down":
                        subNVue.hide('slide-out-bottom')
                        break;
                    case "left":
                        subNVue.hide('slide-out-left')
                        break;
                    case "right":
                        subNVue.hide('slide-out-right')
                }
            },
            touchstart(e) {
                if (this.direction == "down") {
                    this.startPage = e.changedTouches[0].pageY
                } else {
                    this.startPage = e.changedTouches[0].pageX
                }
            },
            touchmove(e) {
                //处理ios中swiper边缘可拖动问题
                if(this.platform=='ios'){
                    let movePage
                    if (this.direction == 'down') {
                        movePage = e.changedTouches[0].pageY
                    } else {
                        movePage = e.changedTouches[0].pageX
                    }
                    if (movePage < this.startPage) {
                        if (this.direction == "left") {
                            this.disabledTouch = false
                        } else {
                            this.disabledTouch = true
                        }
                    } else {
                        if (this.direction == "left") {
                            this.disabledTouch = true
                        } else {
                            this.disabledTouch = false
                        }
                    }
                }
            },
            touchend(e) {
                this.disabledTouch = false
            }
        },
        mounted() {
            this.platform = uni.getSystemInfoSync().platform;
            switch (this.direction) {
                case "down":
                    this.style = {
                        borderTopLeftRadius: this.borderRadius,
                        borderTopRightRadius: this.borderRadius
                    }
                    break;
                case "left":
                    this.active = 0
                    this.defaultActive = 0
                    this.style = {
                        borderTopRightRadius: this.borderRadius,
                        borderBottomRightRadius: this.borderRadius
                    }
                    break;
                case "right":
                    this.style = {
                        borderTopLeftRadius: this.borderRadius,
                        borderBottomLeftRadius: this.borderRadius
                    }
                    break;
            }
            this.style.backgroundColor = this.backgroundColor
        }
    }
</script>

<style lang="scss">
    .swiper {
        flex: 1;
    }

    .swiper-item-0 {
        background-color: transparent;
        flex: 1;
    }

    .swiper-item-1 {
        flex: 1;
    }

    .scroll-view {
        flex: 1;
    }

    .title {
        margin: 15rpx;
        border-bottom-width: 2rpx;
        border-bottom-style: solid;
        border-bottom-color: #eee;
        justify-content: center;
        align-items: center;
    }

    .title-text {
        font-size: 32rpx;
        color: #333333;
        padding: 25rpx 0;
    }

    .close {
        position: absolute;
        right: 0;
    }
</style>

```