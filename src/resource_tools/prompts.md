---
title: Prompts
category:
  - 资源库
---

# Prompts - 交互式命令行提示库完整文档

## 📋 项目概览

**Prompts** 是一个轻量级、美观且用户友好的交互式命令行提示库。它为 CLI 应用提供了简单易用的提示功能，帮助与用户交互获取信息。

### 🌟 核心特点

- **简洁高效**：无需庞大依赖，不像其他库被拆分成多个独立模块
- **用户友好**：通过精心设计的布局和配色创建美观的 CLI 界面
- **Promise 支持**：支持 async/await，避免回调地狱
- **灵活可用**：所有提示都是独立的，可单独使用
- **易于测试**：提供程序化提交答案的方式
- **统一体验**：所有提示类型都有一致的交互体验

## 📦 安装

```bash
npm install --save prompts
```

**Node.js 要求**：支持 Node 14 及以上版本

## 🚀 快速开始

### 基础使用示例

```javascript
const prompts = require('prompts');

(async () => {
  const response = await prompts({
    type: 'number',
    name: 'age',
    message: 'How old are you?',
    validate: value => value < 18 ? 'Nightclub is 18+ only' : true
  });
  console.log(response); // => { age: 24 }
})();
```

### 单个提示对象

使用单个提示对象进行提问，返回包含响应的对象。

```javascript
const prompts = require('prompts');

(async () => {
  const response = await prompts({
    type: 'text',
    name: 'meaning',
    message: 'What is the meaning of life?'
  });
  console.log(response.meaning);
})();
```

### 多个提示对象

传递提示对象数组来进行多个问题的提问，确保每个提示都有唯一的 `name` 属性。

```javascript
const prompts = require('prompts');

const questions = [
  {
    type: 'text',
    name: 'username',
    message: 'What is your GitHub username?'
  },
  {
    type: 'number',
    name: 'age',
    message: 'How old are you?'
  },
  {
    type: 'text',
    name: 'about',
    message: 'Tell something about yourself',
    initial: 'Why should I?'
  }
];

(async () => {
  const response = await prompts(questions);
  // => response => { username, age, about }
})();
```

### 条件提示

属性可以是函数，允许基于前一个答案动态设置提示。

```javascript
const prompts = require('prompts');

const questions = [
  {
    type: 'text',
    name: 'dish',
    message: 'Do you like pizza?'
  },
  {
    type: prev => prev == 'pizza' ? 'text' : null,
    name: 'topping',
    message: 'Name a topping'
  }
];

(async () => {
  const response = await prompts(questions);
})();
```

**注意**：`type` 为假值时，该提示会被跳过。

## 🔧 API 参考

### prompts(questions, options)

**类型**：Function  
**返回**：Object

主要的提示函数，接收提示对象数组并返回包含响应的对象。

#### 参数

**questions** - Array|Object

提示对象数组，定义向用户提出的问题。支持所有提示类型。

用户可以通过以下方式取消提示：
- ESC 键
- Abort 信号
- Ctrl+C
- Ctrl+D

取消时，返回对象中不会定义相关属性。

#### options

**onSubmit** - Function

- **类型**：Function
- **默认值**：() => {}

在每次提示提交后调用的回调函数。

签名：`(prompt, answer, answers)`

- `prompt`：当前提示对象
- `answer`：用户对当前问题的答案
- `answers`：到目前为止收集的所有用户答案

支持异步函数。返回 `true` 可退出提示链并返回已收集的所有响应，否则继续迭代。

**示例**：
```javascript
(async () => {
  const questions = [{ ... }];
  const onSubmit = (prompt, answer) => 
    console.log(`Thanks I got ${answer} from ${prompt.name}`);
  const response = await prompts(questions, { onSubmit });
})();
```

**onCancel** - Function

- **类型**：Function
- **默认值**：() => {}

用户取消/退出提示时调用的回调函数。

签名：`(prompt, answers)`

- `prompt`：当前提示对象
- `answers`：到目前为止收集的用户答案

支持异步函数。返回 `true` 可继续并阻止提示循环中止。取消时返回已收集的响应。

**示例**：
```javascript
(async () => {
  const questions = [{ ... }];
  const onCancel = prompt => {
    console.log('Never stop prompting!');
    return true;
  }
  const response = await prompts(questions, { onCancel });
})();
```

### prompts.override(answers)

**类型**：Function

通过传递答案对象到 `prompts.override` 来预先填充提示答案。

与 `process.argv` 结合使用时特别强大。

**示例**：
```javascript
const prompts = require('prompts');
prompts.override(require('yargs').argv);

(async () => {
  const response = await prompts([
    {
      type: 'text',
      name: 'twitter',
      message: `What's your twitter handle?`
    },
    {
      type: 'multiselect',
      name: 'color',
      message: 'Pick colors',
      choices: [
        { title: 'Red', value: '#ff0000' },
        { title: 'Green', value: '#00ff00' },
        { title: 'Blue', value: '#0000ff' }
      ],
    }
  ]);
  console.log(response);
})();
```

### prompts.inject(values)

**类型**：Function

以编程方式注入响应。这使您能够提前准备响应，用于测试目的。

如果找到任何注入的值，提示会立即用该值解析。

**参数**：

**values** - Array

要注入的值数组。已解析的值会从内部注入数组中移除。每个值可以是一个值数组，以为多次提问提供答案。

如果值是 `Error` 实例，将模拟用户取消/退出提示。

**示例**：
```javascript
const prompts = require('prompts');
prompts.inject([ '@terkelg', ['#ff0000', '#0000ff'] ]);

(async () => {
  const response = await prompts([
    {
      type: 'text',
      name: 'twitter',
      message: `What's your twitter handle?`
    },
    {
      type: 'multiselect',
      name: 'color',
      message: 'Pick colors',
      choices: [
        { title: 'Red', value: '#ff0000' },
        { title: 'Green', value: '#00ff00' },
        { title: 'Blue', value: '#0000ff' }
      ],
    }
  ]);
  // => { twitter: 'terkelg', color: [ '#ff0000', '#0000ff' ] }
})();
```

## 📝 提示对象

提示对象是定义问题和提示类型的 JavaScript 对象。

### 基础结构

```javascript
{
  type: String | Function,
  name: String | Function,
  message: String | Function,
  initial: String | Function | Async Function,
  format: Function | Async Function,
  onRender: Function,
  onState: Function,
  stdin: Readable,
  stdout: Writeable
}
```

### 属性作为函数

几乎所有提示属性都可以是函数类型，在提示用户前调用。

**函数签名**：`(prev, values, prompt)`

- `prev`：前一个提示的值
- `values`：包含迄今为止收集的所有值的响应对象
- `prompt`：前一个提示对象

**示例**：
```javascript
{
  type: prev => prev > 3 ? 'confirm' : null,
  name: 'confirm',
  message: (prev, values) => `Please confirm that you eat ${values.dish} times ${prev} a day?`
}
```

上述提示在前一个提示的值小于 3 时会被跳过。

### 属性说明

**type** - String|Function

定义要显示的提示类型。见下节《提示类型》。

如果 `type` 为假值，提示者将跳过该问题。

```javascript
{
  type: null,
  name: 'forgetme',
  message: `I'll never be shown anyway`,
}
```

**name** - String|Function

响应将保存在返回响应对象中此键/属性下。有多个提示同名时，仅最新响应会被存储。

确保为提示提供唯一的 `name` 以避免覆盖前置值。

**message** - String|Function

显示给用户的消息。

**initial** - String|Function

可选的默认提示值。支持异步函数。

**format** - Function

接收用户输入并返回格式化值供程序使用。返回的值将添加到响应对象。

签名：`(val, values)`

- `val`：当前提示的值
- `values`：当前响应对象（需要基于前置响应格式化时有用）

**示例**：
```javascript
{
  type: 'number',
  name: 'price',
  message: 'Enter price',
  format: val => Intl.NumberFormat(undefined, { 
    style: 'currency', 
    currency: 'USD' 
  }).format(val);
}
```

**onRender** - Function

提示被渲染时的回调。函数将 [kleur](https://github.com/lukeed/kleur) 作为第一个参数，`this` 指向当前提示。

**示例**：
```javascript
{
  type: 'number',
  message: 'This message will be overridden',
  onRender(kleur) {
    this.msg = kleur.cyan('Enter a number');
  }
}
```

**onState** - Function

当前提示状态改变时的回调。

签名：`(state)`，其中 `state` 是当前状态的快照对象。

状态对象有两个属性：`value` 和 `aborted`。例如：`{ value: 'This is ', aborted: false }`

**stdin/stdout** - Stream

默认情况下，prompts 使用 `process.stdin` 接收输入，`process.stdout` 输出。

如果需要使用不同流（例如 `process.stderr`），可用 `stdin` 和 `stdout` 属性设置。

## 💬 提示类型

Prompts 支持 11 种不同的提示类型，每种都有独特的用途：

### 1. Text 文本

自由文本输入的文本提示。当提供 `initial` 值时，按 Tab 可自动补全。

```javascript
{
  type: 'text',
  name: 'value',
  message: `What's your twitter handle?`
}
```

**参数**：

| 参数 | 类型 | 描述 |
|------|------|------|
| message | string | 显示的提示信息 |
| initial | string | 默认字符串值 |
| style | string | 渲染样式（default, password, invisible, emoji），默认为 default |
| format | function | 接收用户输入，返回值会添加到响应对象 |
| validate | function | 接收用户输入，如果有效返回 true，否则返回错误信息字符串 |
| onRender | function | 渲染时回调，keyword this 指向当前提示 |
| onState | function | 状态变化回调 |

### 2. Password 密码

具有掩蔽输入的密码提示。

这是一个类似 `type: 'text'` 的提示，但 `style` 设置为 `'password'`。

```javascript
{
  type: 'password',
  name: 'value',
  message: 'Tell me a secret'
}
```

**参数**：同 Text 提示

### 3. Invisible 隐形

提示用户输入隐形文本。

这个提示类似 `sudo`，输入不可见。类似于 `type: 'text'`，`style` 设置为 `'invisible'`。

```javascript
{
  type: 'invisible',
  name: 'value',
  message: 'Enter password'
}
```

**参数**：同 Text 提示

### 4. Number 数字

提示用户输入数字。

可以键入数字并使用上/下箭头增加/减少值。仅允许数字作为输入。当提供 `initial` 值时，按 Tab 可自动补全。

```javascript
{
  type: 'number',
  name: 'value',
  message: 'How old are you?',
  initial: 0,
  style: 'default',
  min: 2,
  max: 10
}
```

**参数**：

| 参数 | 类型 | 描述 |
|------|------|------|
| message | string | 显示的提示信息 |
| initial | number | 默认数字值 |
| format | function | 接收用户输入 |
| validate | function | 验证用户输入 |
| max | number | 最大值，默认为 Infinity |
| min | number | 最小值，默认为 -Infinity |
| float | boolean | 允许浮点输入，默认 false |
| round | number | 将浮点值舍入到 x 位小数，默认 2 |
| increment | number | 使用箭头键时的增量步长，默认 1 |
| style | string | 渲染样式 |
| onRender | function | 渲染时回调 |
| onState | function | 状态变化回调 |

### 5. Confirm 确认

经典的是/否提示。

按 y 或 n 确认/拒绝。

```javascript
{
  type: 'confirm',
  name: 'value',
  message: 'Can you confirm?',
  initial: true
}
```

**参数**：

| 参数 | 类型 | 描述 |
|------|------|------|
| message | string | 显示的提示信息 |
| initial | boolean | 默认值，默认 false |
| format | function | 接收用户输入 |
| onRender | function | 渲染时回调 |
| onState | function | 状态变化回调 |

### 6. List 列表

返回数组的列表提示。

类似 `text` 提示，但输出是包含由分隔符分离的字符串的 Array。

```javascript
{
  type: 'list',
  name: 'value',
  message: 'Enter keywords',
  initial: '',
  separator: ','
}
```

**参数**：

| 参数 | 类型 | 描述 |
|------|------|------|
| message | string | 显示的提示信息 |
| initial | boolean | 默认值 |
| format | function | 接收用户输入 |
| separator | string | 字符串分隔符，会修剪字符串开始和结束的所有空格，默认 ',' |
| onRender | function | 渲染时回调 |
| onState | function | 状态变化回调 |

### 7. Toggle 切换

交互式切换/开关提示。

使用 Tab 或箭头键/Tab/空格在选项之间切换。

```javascript
{
  type: 'toggle',
  name: 'value',
  message: 'Can you confirm?',
  initial: true,
  active: 'yes',
  inactive: 'no'
}
```

**参数**：

| 参数 | 类型 | 描述 |
|------|------|------|
| message | string | 显示的提示信息 |
| initial | boolean | 默认值，默认 false |
| format | function | 接收用户输入 |
| active | string | 活跃状态的文本，默认 'on' |
| inactive | string | 非活跃状态的文本，默认 'off' |
| onRender | function | 渲染时回调 |
| onState | function | 状态变化回调 |

### 8. Select 选择

交互式选择提示。

使用上/下导航。使用 Tab 循环列表。

```javascript
{
  type: 'select',
  name: 'value',
  message: 'Pick a color',
  choices: [
    { title: 'Red', description: 'This option has a description', value: '#ff0000' },
    { title: 'Green', value: '#00ff00', disabled: true },
    { title: 'Blue', value: '#0000ff' }
  ],
  initial: 1
}
```

**参数**：

| 参数 | 类型 | 描述 |
|------|------|------|
| message | string | 显示的提示信息 |
| initial | number | 默认值的索引 |
| format | function | 接收用户输入 |
| hint | string | 显示给用户的提示 |
| warn | string | 选择禁用选项时显示的消息 |
| choices | Array | 字符串或选择对象数组 [{ title, description, value, disabled }, ...] |
| onRender | function | 渲染时回调 |
| onState | function | 状态变化回调 |

### 9. Multiselect 多选

交互式多选提示。

使用空格切换选择/取消选择，上/下导航。使用 Tab 循环列表。也可使用右键选择，左键取消选择。

默认返回包含所选项目值（而非显示标题）的数组。

```javascript
{
  type: 'multiselect',
  name: 'value',
  message: 'Pick colors',
  choices: [
    { title: 'Red', value: '#ff0000' },
    { title: 'Green', value: '#00ff00', disabled: true },
    { title: 'Blue', value: '#0000ff', selected: true }
  ],
  max: 2,
  hint: '- Space to select. Return to submit'
}
```

**参数**：

| 参数 | 类型 | 描述 |
|------|------|------|
| message | string | 显示的提示信息 |
| format | function | 接收用户输入 |
| instructions | string or boolean | 显示的提示说明 |
| choices | Array | 选择对象数组 [{ title, value, disabled }, ...] |
| optionsPerPage | number | 每页显示的选项数（默认 10） |
| min | number | 最小选择数 |
| max | number | 最大选择数 |
| hint | string | 显示给用户的提示 |
| warn | string | 选择禁用选项时显示的消息 |
| onRender | function | 渲染时回调 |
| onState | function | 状态变化回调 |

**注意**：这是少数几个不接受初始值的提示之一。如果要预定义选定值，给选择对象一个 `selected: true` 属性。

### 10. Autocomplete 自动补全

交互式自动补全提示。

提示根据用户输入列出选项。键入过滤列表。使用 ⇧/⇩ 导航。使用 Tab 循环结果。使用 Page Up/Page Down（Mac：fn + ⇧/⇩）改变页面。按 Enter 选择提示下方高亮的项目。

默认的 suggest 函数基于选择的 `title` 属性排序。可以通过传递自己的 suggest 函数来覆盖如何过滤选择。

```javascript
{
  type: 'autocomplete',
  name: 'value',
  message: 'Pick your favorite actor',
  choices: [
    { title: 'Cage' },
    { title: 'Clooney', value: 'silver-fox' },
    { title: 'Gyllenhaal' },
    { title: 'Gibson' },
    { title: 'Grant' }
  ]
}
```

**参数**：

| 参数 | 类型 | 描述 |
|------|------|------|
| message | string | 显示的提示信息 |
| format | function | 接收用户输入 |
| choices | Array | 自动补全选择对象数组 [{ title, value }, ...] |
| suggest | function | 过滤函数，默认按 title 属性排序。suggest 应总是返回 Promise |
| limit | number | 显示的最大结果数，默认 10 |
| style | string | 渲染样式（default, password, invisible, emoji），默认 'default' |
| initial | string or number | 默认初始值 |
| clearFirst | boolean | 第一个 ESCAPE 按键将清除输入 |
| fallback | string | 无匹配时的回退消息，如果提供默认为初始值 |
| onRender | function | 渲染时回调 |
| onState | function | 状态变化回调（有三个属性：value, aborted, exited） |

**示例 suggest 函数**：
```javascript
const suggestByTitle = (input, choices) =>
  Promise.resolve(choices.filter(i => i.title.slice(0, input.length) === input))
```

### 11. Date 日期

交互式日期提示。

使用左/右/Tab 导航。使用上/下改变日期。

```javascript
{
  type: 'date',
  name: 'value',
  message: 'Pick a date',
  initial: new Date(1997, 09, 12),
  validate: date => date > Date.now() ? 'Not in the future' : true
}
```

**参数**：

| 参数 | 类型 | 描述 |
|------|------|------|
| message | string | 显示的提示信息 |
| initial | date | 默认日期 |
| locales | object | 用于定义自定义区域设置 |
| mask | string | 日期的格式掩码，默认：YYYY-MM-DD HH:mm:ss |
| validate | function | 接收用户输入，有效时返回 true，否则返回错误消息字符串 |
| onRender | function | 渲染时回调 |
| onState | function | 状态变化回调 |

**默认区域设置**：
```javascript
{
  months: [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ],
  monthsShort: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ],
  weekdays: [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'
  ],
  weekdaysShort: [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
  ]
}
```

## 📚 更多资源

详细的格式化选项请参考 [wiki](https://github.com/terkelg/prompts/wiki)
