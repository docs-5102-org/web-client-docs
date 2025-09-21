---
title: NodeJS安装与使用教程
category:
  - 包管理器
tag:
  - NodeJS
---

# NodeJS安装与使用教程

## 下载地址

* 官网下载地址：
    [http://www.nodejs.org/download/](http://www.nodejs.org/download/)

* 华为云镜像源
    [https://mirrors.huaweicloud.com/nodejs](https://mirrors.huaweicloud.com/nodejs)

> 说明：  
> tar.gz是源码包需要编译才可以使用
> tar.xz 是编译好的 解压即可使用 


## 安装

### Linux安装NodeJS

#### 直接使用已编译好的包

Node 官网已经把 linux 下载版本更改为已编译好的版本了，我们可以直接下载解压后使用：

```shell
# wget https://nodejs.org/dist/v10.9.0/node-v10.9.0-linux-x64.tar.xz // 下载
# tar xf node-v10.9.0-linux-x64.tar.xz // 解压
# cd node-v10.9.0-linux-x64/ // 进入解压目录
# ./bin/node -v // 执行node命令 查看版本
v10.9.0
```

解压文件的 bin 目录底下包含了 node、npm 等命令，我们可以使用 ln 命令来设置软连接：

```shell
ln -s /usr/software/nodejs/bin/npm /usr/local/bin/
ln -s /usr/software/nodejs/bin/node /usr/local/bin/

#安装 cross-env
npm install -g cross-env
ln -s /usr/local/nodejs/node-v16.16.0-linux-x64/bin/cross-env /usr/local/bin/
```
删除软链

```shell
#进入目录
cd /usr/local/bin
#直接删除即可
rm npm
rm node
```
npm指定版本更新

```
npm install -g npm@8.13.2
```

### Windows安装

参考：[https://www.runoob.com/nodejs/nodejs-install-setup.html](https://www.runoob.com/nodejs/nodejs-install-setup.html)

## 设置镜像源

菜鸟教程：[https://www.runoob.com/?s=npm](https://www.runoob.com/?s=npm)

```shell
#设置镜像源
npm config set registry https://registry.npm.taobao.org

#查看镜像地址
npm config get registry
```
