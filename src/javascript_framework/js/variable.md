---
title: JavaScript 中 var、let、const 的区别详解
category:
  - js
date: 2025-09-20
---

# JavaScript 中 var、let、const 的区别详解

## 🚀 前言

在 JavaScript 中，变量声明是编程的基础。ES6 引入了 `let` 和 `const` 关键字，为开发者提供了更好的变量声明方式。本文将详细对比 `var`、`let`、`const` 三种声明方式的区别。

## 📊 核心区别对比表

| 特性 | var | let | const |
|------|-----|-----|-------|
| 变量提升 | ✅ | ❌ | ❌ |
| 块作用域 | ❌ | ✅ | ✅ |
| 重复声明 | ✅ | ❌ | ❌ |
| 重新赋值 | ✅ | ✅ | ❌ |
| 挂载到window | ✅ | ❌ | ❌ |
| 暂存死区 | ❌ | ✅ | ✅ |

## 1️⃣ 全局对象挂载差异

### var 声明的变量会挂载到 window 对象

```javascript
var a = 100;
console.log(a, window.a); // 100 100
```

### let 和 const 声明的变量不会挂载到 window

```javascript
let b = 10;
console.log(b, window.b); // 10 undefined

const c = 1;
console.log(c, window.c); // 1 undefined
```

**原因**: `var` 声明的全局变量会成为全局对象的属性，而 `let` 和 `const` 声明的变量存在于块级作用域中。

## 2️⃣ 变量提升

### var 存在变量提升

```javascript
console.log(a); // undefined（已声明但未赋值）
var a = 100;

// 等价于：
// var a;
// console.log(a); // undefined
// a = 100;
```

### let 和 const 不存在变量提升

```javascript
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 10;

console.log(c); // ReferenceError: Cannot access 'c' before initialization
const c = 10;
```

**关键点**: `let` 和 `const` 声明的变量不会被提升，访问未声明的变量会抛出 `ReferenceError`。

## 3️⃣ 块级作用域

### var 不具备块级作用域

```javascript
if (true) {
  var a = 100;
}
console.log(a); // 100（可以访问）

for (var i = 0; i < 3; i++) {
  // 循环逻辑
}
console.log(i); // 3（循环结束后仍可访问）
```

### let 和 const 具备块级作用域

```javascript
if (true) {
  let b = 10;
  const c = 1;
}
console.log(b); // ReferenceError: b is not defined
console.log(c); // ReferenceError: c is not defined

for (let i = 0; i < 3; i++) {
  // 循环逻辑
}
console.log(i); // ReferenceError: i is not defined
```

**实际应用**: 块级作用域避免了变量污染，使代码更加安全可靠。

## 4️⃣ 重复声明

### var 允许重复声明

```javascript
var a = 100;
console.log(a); // 100

var a = 10; // 重复声明，不会报错
console.log(a); // 10
```

### let 和 const 不允许重复声明

```javascript
let a = 100;
let a = 10; // SyntaxError: Identifier 'a' has already been declared

const b = 100;
const b = 10; // SyntaxError: Identifier 'b' has already been declared
```

**好处**: 防止意外的变量覆盖，提高代码的健壮性。

## 5️⃣ 暂存死区（Temporal Dead Zone）

暂存死区是指在块级作用域中，使用 `let` 或 `const` 声明变量之前，该变量都是不可用的。

```javascript
var a = 100;

if (true) {
  // 这里是暂存死区
  console.log(a); // ReferenceError: Cannot access 'a' before initialization
  
  let a = 1; // 声明后才可使用
}
```

**解释**: 尽管外部有 `var a = 100`，但在块级作用域内，由于存在 `let a` 声明，JavaScript 引擎会优先在当前作用域查找变量，而此时变量尚未声明完成，因此报错。

## 6️⃣ const 的特殊性

### 必须在声明时赋值

```javascript
const a; // SyntaxError: Missing initializer in const declaration
```

### 不能重新赋值

```javascript
const a = 100;
a = 200; // TypeError: Assignment to constant variable
```

### 对象和数组的特殊情况

虽然 `const` 声明的变量不能重新赋值，但如果是引用类型，可以修改其内部属性：

```javascript
// 数组
const list = [];
list[0] = 10;
list.push(20);
console.log(list); // [10, 20]

// 对象
const obj = { a: 100 };
obj.name = 'apple';
obj.a = 10000;
console.log(obj); // {a: 10000, name: 'apple'}
```

**注意**: `const` 保证的是变量指向的内存地址不变，而不是值不变。

## 🛡️ 最佳实践建议

### 1. 优先使用 const

```javascript
// 推荐：优先使用 const
const API_URL = 'https://api.example.com';
const users = [];
const config = { theme: 'dark' };
```

### 2. 需要重新赋值时使用 let

```javascript
// 循环计数器
for (let i = 0; i < 10; i++) {
  // ...
}

// 条件赋值
let message;
if (error) {
  message = 'Error occurred';
} else {
  message = 'Success';
}
```

### 3. 避免使用 var

```javascript
// 不推荐
var userName = 'John';

// 推荐
const userName = 'John';
```

## ⚠️ 常见陷阱与注意事项

### 1. 循环中的闭包问题

```javascript
// 问题代码（使用 var）
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 输出：3, 3, 3
  }, 100);
}

// 解决方案（使用 let）
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 输出：0, 1, 2
  }, 100);
}
```

### 2. 暂存死区陷阱

```javascript
function example() {
  console.log(typeof a); // ReferenceError（不是 "undefined"）
  let a = 10;
}
```

### 3. const 对象冻结

如果需要完全不可变的对象，使用 `Object.freeze()`：

```javascript
const obj = Object.freeze({ name: 'John' });
obj.name = 'Jane'; // 静默失败（严格模式下会报错）
console.log(obj.name); // 'John'
```

## 📋 总结

- **var**: 函数作用域，存在变量提升，可重复声明，会挂载到全局对象
- **let**: 块级作用域，不存在变量提升，不可重复声明，可重新赋值
- **const**: 块级作用域，不存在变量提升，不可重复声明，不可重新赋值

现代 JavaScript 开发中，建议遵循 "const > let > var" 的优先级原则，这样可以写出更安全、更可维护的代码。

---

**参考资料**: 
- [MDN Web Docs - var](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/var)
- [MDN Web Docs - let](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let)
- [MDN Web Docs - const](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const)