---
title: 常用技巧
category:
  - vue
date: 2025-09-20
order: 2
---

# 常用技巧

## vue2中css使用data中的变量

在vue2中，我们要借助`setProperty`函数来实现功能，如下：

```
<template>
    <div class="home" ref="UI">
        <div class="header">hello world</div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            color: 'red'
        }

    },
    mounted(){
      this.setUI()
    },
    methods:{
        setUI(){
            this.$refs.UI.style.setProperty("--color",this.color);//给变量赋值
        }
    }
}
</script>
<style>
    .home{
        /* 定义变量 */
        --color:'12px';
        .header{
           color: var(--color);  //使用变量
        }
    }
</style>
```

## vue 重置data的所有属性

**1. 拿到data原始属性**
`this.$options.data()`

**2. 拿到当前的data**
`this.$data`

**3. 复制到当前$data里面**
`Object.assign(this.$data, this.$options.data());`

## vue项目如何刷新当前页面

https://www.cnblogs.com/yinn/p/9056731.html


## Vue 获取所有的路由的数组

`this.$router.options.routes`

## input 使用v-model想要改变父属性的写法

https://www.cnblogs.com/llcdbk/p/12613362.html

## 移动端设备信息获取指南

[移动端设备信息获取指南](./get-imei.md)

## 配置路径别名的几种方式

[配置路径别名的几种方式](./config-alias.md)


## 子组件调用父组件里面的数据和方法 父组件调用子组件的数据和方法

- https://www.cnblogs.com/toughy/p/11841474.html

## vue多主题风格切换

- https://blog.csdn.net/qq_26715417/article/details/105380373
- https://blog.csdn.net/timebeign/article/details/104181555

## vue3.0中使用postcss-pxtorem

- https://www.jianshu.com/p/8350b611e5bb


