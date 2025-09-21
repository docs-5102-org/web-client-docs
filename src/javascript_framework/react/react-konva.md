---
title: React-Konva 教程指南
category:
  - react
date: 2025-09-20
---

# React-Konva 教程指南

## 🎨 简介

React-Konva 是一个基于 Konva.js 的 React 绑定库，专为构建高性能的 2D Canvas 应用而设计。它提供了声明式的 API，让您可以像使用常规 React 组件一样创建复杂的图形界面。

### 主要特性

- 🚀 高性能 2D 图形渲染
- 📱 支持触摸和鼠标事件
- 🎯 丰富的形状和滤镜支持
- 🔄 动画和缓动效果
- 📐 图层管理和变换
- 🎪 拖拽和缩放功能

## 📦 安装

### React 项目
```bash
npm add react-konva konva
# 或者使用 yarn
yarn add react-konva konva
```

### Vue 项目
```bash
npm install vue-konva konva --save
# 或者使用 yarn
yarn add vue-konva konva
```

## 🏗️ 基础用法

### 创建基本画布

```jsx
import React from 'react';
import { Stage, Layer, Circle, Text } from 'react-konva';

function App() {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="Hello Konva!" x={50} y={80} />
        <Circle x={200} y={200} radius={50} fill="red" />
      </Layer>
    </Stage>
  );
}

export default App;
```

### 组件结构说明

- **Stage**: 画布容器，类似于 HTML 的 `<canvas>` 元素
- **Layer**: 图层，用于组织和管理图形元素
- **Shape**: 各种形状组件（Circle、Rect、Text 等）

## 🎯 核心概念

### 1. 坐标系统
- 原点 (0,0) 位于左上角
- X 轴向右为正
- Y 轴向下为正

### 2. 图层管理
```jsx
<Stage width={800} height={600}>
  <Layer name="background">
    {/* 背景元素 */}
  </Layer>
  <Layer name="objects">
    {/* 主要对象 */}
  </Layer>
  <Layer name="ui">
    {/* UI 元素 */}
  </Layer>
</Stage>
```

### 3. 事件处理
```jsx
<Circle
  x={100}
  y={100}
  radius={50}
  fill="blue"
  onClick={() => console.log('Circle clicked!')}
  onMouseEnter={() => console.log('Mouse entered')}
  onDragEnd={(e) => console.log('New position:', e.target.position())}
/>
```

## 📚 实用示例

### 1. 可拖拽的形状
```jsx
import React, { useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

function DraggableRect() {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  return (
    <Stage width={400} height={300}>
      <Layer>
        <Rect
          x={position.x}
          y={position.y}
          width={100}
          height={100}
          fill="green"
          draggable
          onDragEnd={(e) => {
            setPosition({
              x: e.target.x(),
              y: e.target.y()
            });
          }}
        />
      </Layer>
    </Stage>
  );
}
```

### 2. 动画效果
```jsx
import React, { useRef, useEffect } from 'react';
import { Stage, Layer, Star } from 'react-konva';

function AnimatedStar() {
  const starRef = useRef();

  useEffect(() => {
    const node = starRef.current;
    const anim = new window.Konva.Animation((frame) => {
      const scale = Math.sin(frame.time * 2e-3) + 0.5;
      node.scaleX(scale);
      node.scaleY(scale);
    }, node.getLayer());
    
    anim.start();
    
    return () => anim.stop();
  }, []);

  return (
    <Stage width={400} height={300}>
      <Layer>
        <Star
          ref={starRef}
          x={200}
          y={150}
          numPoints={5}
          innerRadius={20}
          outerRadius={40}
          fill="#89b717"
        />
      </Layer>
    </Stage>
  );
}
```

## 🔧 高级功能

### 1. 图片处理
```jsx
import React, { useState, useEffect } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';

function ImageComponent() {
  const [image] = useImage('https://example.com/image.jpg');

  return (
    <Stage width={400} height={300}>
      <Layer>
        <Image
          image={image}
          x={50}
          y={50}
          width={300}
          height={200}
        />
      </Layer>
    </Stage>
  );
}
```

### 2. 滤镜效果
```jsx
<Rect
  x={10}
  y={10}
  width={100}
  height={100}
  fill="red"
  filters={[window.Konva.Filters.Blur]}
  blurRadius={10}
/>
```

### 3. 导出为图片
```jsx
const downloadURI = (uri, name) => {
  const link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const handleExport = () => {
  const uri = stageRef.current.toDataURL();
  downloadURI(uri, 'stage.png');
};
```

## 📖 学习资源

### 官方资源
- 📘 [官方文档](https://konvajs.org/docs/)
- 🎮 [交互式示例](https://konvajs.org/docs/sandbox/index.html)
- 🛠️ [工具类库](https://github.com/konvajs/react-konva-utils)

### 实用示例
- 📝 [可编辑文本示例](https://codesandbox.io/p/sandbox/react-konva-editable-resizable-text-55kyv?file=%2Fsrc%2FStickyNote.jsx)
- 🎨 [更多 Canvas 工具库合集](javascript:void(0)) <!-- 这里可以链接到您的其他文档 -->

## 💡 最佳实践

### 1. 性能优化
- 使用 `perfectDrawEnabled={false}` 提高绘制性能
- 合理使用图层，避免过度嵌套
- 对于静态内容，考虑使用 `listening={false}`

### 2. 响应式设计
```jsx
function ResponsiveStage() {
  const [stageSize, setStageSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setStageSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Stage width={stageSize.width} height={stageSize.height}>
      {/* 内容 */}
    </Stage>
  );
}
```

### 3. 内存管理
- 及时清理事件监听器
- 销毁不再使用的动画
- 合理使用 useRef 和 useCallback

## 🚀 进阶应用场景

- 📊 数据可视化图表
- 🎮 简单游戏开发
- 🖼️ 图像编辑器
- 📋 流程图编辑器
- 🎨 绘图应用
- 📐 CAD 工具
