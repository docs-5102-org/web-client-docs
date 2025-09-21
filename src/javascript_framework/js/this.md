---
title: this指向的三种方法
category:
  - JS
tag:
  - call()
  - apply()
  - bind()
---

# JavaScript 改变 this 指向的三种方法：call()、apply()、bind()

在 JavaScript 中，`this` 的指向是一个重要且容易混淆的概念。幸运的是，JavaScript 提供了三个方法来显式改变 `this` 的指向：`call()`、`apply()` 和 `bind()`。

## 1. call() 方法

### 基本用法

`call()` 方法可以改变函数内部 `this` 的指向，并立即执行函数。

```javascript
var o = {
    name: "andy"
};

function fn() {
    console.log(this);
}

// 默认情况下，this 指向 window
fn(); // 输出: Window 对象

// 使用 call() 改变 this 指向
fn.call(o); // 输出: {name: "andy"}
```

### 传递参数

`call()` 方法不仅可以改变 `this` 指向，还可以传递参数给函数：

```javascript
var o = {
    name: "andy"
};

function fn(a, b) {
    console.log(this);
    console.log(a + b);
}

fn.call(o, 1, 2);
// 输出: {name: "andy"}
// 输出: 3
```

### call() 语法

```javascript
function.call(thisArg, arg1, arg2, ...)
```

- `thisArg`：函数运行时使用的 `this` 值
- `arg1, arg2, ...`：传递给函数的参数列表

## 2. apply() 方法

`apply()` 方法与 `call()` 类似，但参数传递方式不同。

### 基本用法

```javascript
var o = {
    name: "andy"
};

function fn(a, b) {
    console.log(this);
    console.log(a + b);
}

// apply() 使用数组传递参数
fn.apply(o, [1, 2]);
// 输出: {name: "andy"}
// 输出: 3
```

### apply() 语法

```javascript
function.apply(thisArg, [argsArray])
```

- `thisArg`：函数运行时使用的 `this` 值
- `argsArray`：一个数组或类数组对象，用于传递参数

### apply() 的常见应用

```javascript
// 找出数组中的最大值
var numbers = [1, 5, 3, 9, 2];
var max = Math.max.apply(null, numbers);
console.log(max); // 输出: 9

// 将类数组转换为数组
function convertToArray() {
    return Array.prototype.slice.apply(arguments);
}
```

## 3. bind() 方法

`bind()` 方法创建一个新函数，当被调用时，将其 `this` 关键字设置为提供的值。

### 基本用法

```javascript
var o = {
    name: "andy"
};

function fn() {
    console.log(this);
}

// bind() 返回一个新函数，不会立即执行
var boundFn = fn.bind(o);
boundFn(); // 输出: {name: "andy"}
```

### 预设参数

```javascript
var o = {
    name: "andy"
};

function fn(a, b, c) {
    console.log(this);
    console.log(a, b, c);
}

// 预设部分参数
var boundFn = fn.bind(o, 1, 2);
boundFn(3); // 输出: {name: "andy"} 和 1 2 3
```

### bind() 语法

```javascript
function.bind(thisArg[, arg1[, arg2[, ...]]])
```

## 三种方法的区别对比

| 方法 | 执行时机 | 参数传递 | 返回值 |
|------|----------|----------|--------|
| `call()` | 立即执行 | 参数列表 | 函数执行结果 |
| `apply()` | 立即执行 | 数组 | 函数执行结果 |
| `bind()` | 返回新函数 | 参数列表 | 绑定后的新函数 |

## 实际应用场景

### 1. 借用方法

```javascript
var obj1 = {
    name: "张三",
    sayHello: function() {
        console.log("Hello, " + this.name);
    }
};

var obj2 = {
    name: "李四"
};

// 借用 obj1 的方法
obj1.sayHello.call(obj2); // 输出: "Hello, 李四"
```

### 2. 事件处理器中的 this

```javascript
var button = document.getElementById('myButton');
var obj = {
    name: "按钮对象",
    handleClick: function() {
        console.log(this.name + " 被点击了");
    }
};

// 使用 bind() 确保 this 指向正确
button.addEventListener('click', obj.handleClick.bind(obj));
```

### 3. 继承中的构造函数调用

```javascript
function Animal(name) {
    this.name = name;
}

function Dog(name, breed) {
    // 调用父构造函数
    Animal.call(this, name);
    this.breed = breed;
}

var myDog = new Dog("旺财", "哈士奇");
console.log(myDog.name); // 输出: "旺财"
```

## 总结

- **call()**：立即执行，参数逐个传递
- **apply()**：立即执行，参数以数组形式传递
- **bind()**：返回新函数，不立即执行，可预设参数

这三个方法都是改变函数 `this` 指向的重要工具，理解它们的区别和使用场景对于掌握 JavaScript 至关重要。