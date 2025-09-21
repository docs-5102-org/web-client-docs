---
title: React-quill 教程指南
category:
  - react
date: 2025-09-20
---

# React-Quill 富文本编辑器教程

## 简介

React-Quill 是一个基于 React 的富文本编辑器组件，它封装了强大的 Quill.js 编辑器，为 React 应用提供了开箱即用的富文本编辑功能。

**官网链接：** [https://www.npmjs.com/package/react-quill](https://www.npmjs.com/package/react-quill)

## 安装

使用 npm 安装：

```bash
npm install react-quill
```

或使用 yarn：

```bash
yarn add react-quill
```

## 基础使用

### 1. 导入组件和样式

```jsx
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 导入样式
```

### 2. 基础示例

```jsx
function MyEditor() {
  const [value, setValue] = useState('');

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
    />
  );
}
```

## 高级配置

### 自定义工具栏

React-Quill 允许你完全自定义工具栏，包括字体设置、样式选项、颜色配置等：

```jsx
class RichTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    
    this.modules = {
      toolbar: {
        container: [
          // 字体大小设置
          [{ 'size': ['small', false, 'large', 'huge'] }],
          
          // 文本格式化
          ['bold', 'italic', 'underline', 'strike'],
          
          // 列表和缩进
          [
            { 'list': 'ordered' }, 
            { 'list': 'bullet' }, 
            { 'indent': '-1' }, 
            { 'indent': '+1' }
          ],
          
          // 链接和图片
          ['link', 'image'],
          
          // 对齐方式
          [{ 'align': [] }],
          
          // 背景颜色
          [{
            'background': [
              'rgb(0, 0, 0)', 'rgb(230, 0, 0)', 'rgb(255, 153, 0)',
              'rgb(255, 255, 0)', 'rgb(0, 138, 0)', 'rgb(0, 102, 204)',
              'rgb(153, 51, 255)', 'rgb(255, 255, 255)', 'rgb(250, 204, 204)',
              // ... 更多颜色选项
            ]
          }],
          
          // 字体颜色
          [{
            'color': [
              'rgb(0, 0, 0)', 'rgb(230, 0, 0)', 'rgb(255, 153, 0)',
              'rgb(255, 255, 0)', 'rgb(0, 138, 0)', 'rgb(0, 102, 204)',
              // ... 更多颜色选项
            ]
          }],
          
          // 清空格式和自定义功能
          ['clean'],
          ['emoji'],
          ['video2'] // 自定义视频按钮
        ],
        
        // 自定义处理函数
        handlers: {
          'image': this.imageHandler.bind(this),
          'video2': this.showVideoModal.bind(this),
        },
      },
      
      // 图片拖拽功能
      ImageDrop: true,
      
      // Emoji 配置
      'emoji-toolbar': true,
      "emoji-textarea": false,
      "emoji-shortname": true,
    };
  }

  // 自定义图片上传处理
  imageHandler() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    
    input.onchange = () => {
      const file = input.files[0];
      // 处理图片上传逻辑
      this.uploadImage(file);
    };
  }

  // 显示视频模态框
  showVideoModal() {
    // 自定义视频插入逻辑
    console.log('显示视频上传模态框');
  }

  render() {
    return (
      <ReactQuill
        ref={(el) => { this.reactQuillRef = el }}
        theme="snow"
        value={this.state.value}
        onChange={(value) => this.setState({ value })}
        modules={this.modules}
      />
    );
  }
}
```

## 主要特性

### 1. 主题支持
React-Quill 支持两种内置主题：
- `snow`：干净的白色主题（推荐）
- `bubble`：气泡样式主题

### 2. 格式化选项
- **文本样式**：粗体、斜体、下划线、删除线
- **列表**：有序列表、无序列表
- **缩进**：增加/减少缩进
- **对齐**：左对齐、居中、右对齐、两端对齐
- **颜色**：字体颜色、背景颜色
- **链接和媒体**：链接、图片、视频

### 3. 扩展功能
- 图片拖拽上传
- Emoji 表情支持
- 自定义工具栏按钮
- 自定义处理函数

## 事件处理

### onChange 事件
```jsx
const handleChange = (content, delta, source, editor) => {
  console.log('内容:', content);
  console.log('变化:', delta);
  console.log('来源:', source); // 'api', 'user', 或 'silent'
  console.log('编辑器实例:', editor);
};

<ReactQuill onChange={handleChange} />
```

### 获取编辑器实例
```jsx
const quillRef = useRef();

const getEditorContent = () => {
  if (quillRef.current) {
    const editor = quillRef.current.getEditor();
    const content = editor.getContents();
    const text = editor.getText();
    console.log('Delta 格式:', content);
    console.log('纯文本:', text);
  }
};

<ReactQuill ref={quillRef} />
```

## 样式自定义

### CSS 覆盖
```css
/* 自定义编辑器高度 */
.ql-container {
  height: 300px;
}

/* 自定义工具栏样式 */
.ql-toolbar {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

/* 自定义编辑区域样式 */
.ql-editor {
  font-size: 16px;
  line-height: 1.6;
}
```

## 最佳实践

1. **性能优化**：对于大型应用，考虑按需加载 React-Quill
2. **图片处理**：实现自定义图片上传逻辑，避免使用 base64 嵌入
3. **内容验证**：在提交前验证和清理用户输入的内容
4. **移动端适配**：确保在移动设备上的良好体验
5. **无障碍支持**：React-Quill 内置了良好的无障碍支持

## 常见问题

### Q: 如何设置默认内容？
A: 使用 `defaultValue` 或 `value` 属性：
```jsx
<ReactQuill defaultValue="<h1>欢迎使用富文本编辑器</h1>" />
```

### Q: 如何禁用编辑器？
A: 使用 `readOnly` 属性：
```jsx
<ReactQuill readOnly={true} />
```

### Q: 如何获取纯文本内容？
A: 通过编辑器实例调用 `getText()` 方法：
```jsx
const text = quillRef.current.getEditor().getText();
```

## 总结

React-Quill 是一个功能强大且易于使用的富文本编辑器，适合各种 React 应用场景。通过合理的配置和自定义，可以打造出符合项目需求的编辑器体验。更多高级用法和 API 详情，请参考[官方文档](https://www.npmjs.com/package/react-quill)。

## 参考链接

- [React-Quill NPM 官网](https://www.npmjs.com/package/react-quill)
- [Quill.js 官方文档](https://quilljs.com/)
- 第三方
  - https://www.cnblogs.com/datiangou/p/10112854.html
  - https://www.jianshu.com/p/c552af25b56b
  - https://www.cnblogs.com/Grewer/p/16743592.html
  - https://www.cnblogs.com/Grewer/p/17430021.html
  - ​https://www.jianshu.com/p/448fee19cd70
- 实战项目
  - 小微万能导航宝箱后台: **universal-toolbox-manage-web** 中 实现了 自定义工具bar、官方bar的两个组件
  - jasper-org: 低代码平台封装了最新的版本