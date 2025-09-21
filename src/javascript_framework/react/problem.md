---
title: 常见问题
category:
  - react
date: 2025-09-20
---

# 常见问题

## 类型编译错误

### Ts Js input赋值报错The property 'value' does not exist on value of type 'HTMLElement'解决办法

const inputContant = (document.getElementById('suggestId') as HTMLInputElement);
原因是HTMLElement返回自getElementById()实际上是HTMLInputElement从其继承的实例，因为传递的是输入元素的ID。同样，在静态类型的Js(Ts)中，它不会编译。

### React native uuid Error crypto.getRandomValues() not supported. See httpsgithub.comuuidjsuuid

解决方案，自己安装一个 uuid 库即可，手动实现的貌似不支持，如下：

```
Install react-native-get-random-values 
Import it before uuid: 
import 'react-native-get-random-values'; 
import { v4 as uuidv4 } from 'uuid';
```

### React Hooks异步操作防踩坑指南

- https://www.cnblogs.com/art-poet/p/13276874.html
- https://blog.csdn.net/sinat_17775997/article/details/102671301

## Pre-Commit for Git Hookshusky 之正确关闭提交代码检测

### 1.git husky 报错：subject may not be empty [subject-empty] / type may not be empty [type-empty]

⧗   input: 初始化提交
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

**解决方案：**

git commit -m "feat: 初始化提交"

### 如何卸载husky、关闭 husky监测的流程

1. npm uninstall husky
2. 关闭 husky流程

a.方法一

- [参考](https://blog.csdn.net/qq_40259641/article/details/113726741)

b.方法二

打开根目录下的package.json文件, 搜索是否有lint-staged包, 执行以下命令删除:

```bash
npm uninstall lint-staged
```

c.方法三

```bash
git push --no-verify //跳过githook执行
```

3.**git commit -m "feat: 2023-10-17"**
**file:///E:/dev_workspace/gitee/website-org/miliqk-web-dumi/node_modules/listr2/dist/index.js:206**
    **this.options.fields ??= {};**

解决方式

版本问题，请用nvm 切换使用最新的node版本