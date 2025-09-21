---
title: Redux教程
category:
  - react
  - Redux
date: 2025-09-20
---

# Redux教程

## 📌 Redux 官方资源

* **Redux 官网**
  👉 [https://redux.js.org/](https://redux.js.org/)

* **快速上手教程（Essentials Tutorial）**
  👉 [https://redux.js.org/tutorials/essentials/part-1-overview-concepts](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)

* **完整教程（Fundamentals Tutorial）**
  👉 [https://redux.js.org/tutorials/fundamentals/part-1-overview](https://redux.js.org/tutorials/fundamentals/part-1-overview)

* **Redux Toolkit（官方推荐写法）**
  👉 [https://redux-toolkit.js.org/](https://redux-toolkit.js.org/)

---

## 🚀 Redux 快速上手示例

官方推荐用 **Redux Toolkit** 来写 Redux 逻辑：

```js
// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// 创建 counter 模块
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1 },
    decrement: state => { state.value -= 1 },
    incrementByAmount: (state, action) => { state.value += action.payload }
  }
});

// 导出 actions 和 reducer
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const store = configureStore({ reducer: { counter: counterSlice.reducer } });
```

```js
// 在 React 组件中使用
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './store';

export function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
```

---

⚡ 小提示：

* 新项目尽量用 **Redux Toolkit**，比传统 Redux 简洁很多。
* React 官方文档也推荐配合 **React-Redux hooks**（`useSelector`、`useDispatch`）使用。

---
