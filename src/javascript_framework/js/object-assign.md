---
title: Object.assign() 方法详解
category:
  - JS
  - Object.assign()
---

# Object.assign() 方法详解

## 基本概念

Object.assign() 是 JavaScript 中用于对象属性复制的重要方法。它将所有可枚举的自有属性从一个或多个源对象复制到目标对象，并返回修改后的目标对象。

## 语法

```javascript
Object.assign(target, ...sources)
```

- **target**: 目标对象，接收属性的对象
- **sources**: 源对象，提供属性的对象（可以是多个）

## 核心特性

### 1. 属性覆盖规则
当多个对象具有相同属性键时，后面的源对象会覆盖前面的：

```javascript
const target = { a: 1, b: 2 };
const source1 = { b: 3, c: 4 };
const source2 = { c: 5, d: 6 };

const result = Object.assign(target, source1, source2);
console.log(result); // { a: 1, b: 3, c: 5, d: 6 }
```

### 2. 浅拷贝特性
Object.assign() 执行的是浅拷贝，只复制属性的引用：

```javascript
const obj1 = { a: { x: 1 } };
const obj2 = Object.assign({}, obj1);

obj1.a.x = 2;
console.log(obj2.a.x); // 2 (受影响，因为是浅拷贝)
```

### 3. 调用 getter 和 setter
该方法会调用源对象的 getter 和目标对象的 setter：

```javascript
const source = {
  get foo() {
    console.log('getter called');
    return 'bar';
  }
};

const target = {};
Object.assign(target, source); // 输出: "getter called"
```

## 注意事项

1. **只复制可枚举属性**: 不可枚举的属性不会被复制
2. **不复制原型链属性**: 只复制对象自身的属性
3. **不适合原型合并**: 对于原型属性定义，建议使用 `Object.getOwnPropertyDescriptor()` 和 `Object.defineProperty()`

## 常见用途

### 对象克隆
```javascript
const clone = Object.assign({}, originalObject);
```

### 对象合并
```javascript
const merged = Object.assign({}, obj1, obj2, obj3);
```

### 默认参数设置
```javascript
function createUser(options) {
  const defaults = { name: 'Anonymous', age: 0 };
  return Object.assign({}, defaults, options);
}
```

## 官方文档链接

您可以在 MDN Web Docs 查看 Object.assign() 的完整官方文档：

**[Object.assign() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)**

这个方法是 ES2015 (ES6) 引入的重要特性，在现代 JavaScript 开发中被广泛使用，特别是在 React 状态更新和函数式编程场景中。