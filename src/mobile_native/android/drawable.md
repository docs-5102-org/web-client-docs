---
title: Drawable 图片适配指南
category:
  - 移动端原生开发
tag:
  - Android
---

# Android Drawable 图片适配指南

## 概述

在Android开发中，为了适配不同屏幕密度的设备，系统提供了多个drawable文件夹来存放不同分辨率的图片资源。正确理解和使用这些文件夹对于创建适配性良好的Android应用至关重要。

## Drawable 文件夹分类

Android系统提供了以下drawable文件夹：

- **drawable-ldpi** - 低密度（~120dpi）
- **drawable-mdpi** - 中等密度（~160dpi）
- **drawable-hdpi** - 高密度（~240dpi）
- **drawable-xhdpi** - 超高密度（~320dpi）
- **drawable-xxhdpi** - 超超高密度（~480dpi）
- **drawable-xxxhdpi** - 超超超高密度（~640dpi）
- **drawable-nodpi** - 无缩放处理
- **drawable** - 默认文件夹

## 系统资源匹配机制

### 匹配规则

Android系统会根据设备的DPI值自动选择最合适的drawable文件夹：

1. **优先匹配**：系统首先在与设备密度匹配的文件夹中查找图片资源
2. **向上查找**：如果匹配的文件夹中没有找到资源，系统会依次在更高密度的文件夹中查找
3. **向下查找**：如果所有更高密度的文件夹都没有找到，则在更低密度的文件夹中查找
4. **默认查找**：最后在默认的drawable文件夹中查找
5. **报错处理**：如果所有文件夹都没有找到资源，应用将会报错

### 查找顺序示例

假设当前设备的DPI是320（xhdpi），系统的查找顺序为：
```
drawable-xhdpi → drawable-xxhdpi → drawable-xxxhdpi → drawable-hdpi → drawable-mdpi → drawable-ldpi → drawable
```

## 密度分类与DPI范围

### 设备密度对应表

| 设备密度范围 | 适配资源文件密度 | DPI范围 |
|-------------|----------------|---------|
| 0dpi ~ 120dpi | ldpi | ~120dpi |
| 120dpi ~ 160dpi | mdpi | ~160dpi |
| 160dpi ~ 240dpi | hdpi | ~240dpi |
| 240dpi ~ 320dpi | xhdpi | ~320dpi |
| 320dpi ~ 480dpi | xxhdpi | ~480dpi |
| 480dpi ~ 640dpi | xxxhdpi | ~640dpi |

### 如何获取设备DPI

在代码中可以通过以下方式获取设备的DPI值：

```java
float xdpi = getResources().getDisplayMetrics().xdpi;
float ydpi = getResources().getDisplayMetrics().ydpi;
```

## 图片缩放机制

### 缩放倍数

以mdpi为基线（1.0倍），各密度目录下的缩放倍数如下：

| 密度 | 缩放倍数 |
|------|----------|
| ldpi | 0.75 |
| mdpi | 1.0 |
| hdpi | 1.5 |
| xhdpi | 2.0 |
| xxhdpi | 3.0 |
| xxxhdpi | 4.0 |

### 缩放规则

- **低密度图片**：如果图片所在目录的DPI低于设备匹配目录，图片会被**放大**
- **高密度图片**：如果图片所在目录的DPI高于设备匹配目录，图片会被**缩小**
- **nodpi图片**：drawable-nodpi目录下的图片**不会进行缩放**，保持原始大小

### 缩放倍数计算公式

对于任意设备，图片的缩放倍数计算公式为：

```
缩放倍数 = 设备密度 / 图片所在目录密度
```

最终显示尺寸 = 图片原始尺寸 × 缩放倍数

## 建议的图标尺寸

### Mipmap 图标建议尺寸

| 资源文件密度 | 官方建议尺寸 | 实测建议尺寸 |
|-------------|-------------|-------------|
| mipmap-mdpi | 48 × 48 | 16 × 16 |
| mipmap-hdpi | 72 × 72 | 32 × 32 |
| mipmap-xhdpi | 96 × 96 | 48 × 48 |
| mipmap-xxhdpi | 144 × 144 | 64 × 64 |
| mipmap-xxxhdpi | 192 × 192 | 72 × 72 |

## 最佳实践建议

### 1. 资源优化策略
- 为主要密度（hdpi、xhdpi、xxhdpi）提供专门的图片资源
- 对于装饰性图片，可以只提供一个高密度版本，让系统自动缩放
- 重要的UI图标建议为每个密度都提供对应版本

### 2. 使用nodpi的场景
- 不希望被缩放的图片（如背景图）
- 已经经过精确设计的图片资源
- 需要保持原始尺寸的图片

### 3. 性能考虑
- 避免让系统频繁进行图片缩放操作
- 合理控制图片文件大小
- 考虑使用矢量图drawable（Vector Drawable）替代多套位图资源

## 参考链接

以下是Android官方文档中的相关资源：

- **[支持不同像素密度](https://developer.android.com/training/multiscreen/screendensities)** - Android官方关于屏幕密度适配的完整指南
- **[应用资源概述](https://developer.android.com/guide/topics/resources/providing-resources)** - Android应用资源管理的官方文档
- **[资源类型概述](https://developer.android.com/guide/topics/resources/available-resources)** - 各种资源类型的详细说明
- **[添加多密度矢量图形](https://developer.android.com/studio/write/vector-asset-studio)** - Vector Asset Studio使用指南
- **[屏幕兼容性概览](https://developer.android.com/guide/practices/screens_support)** - 支持多种屏幕的官方指南
- **[可绘制资源](https://developer.android.com/guide/topics/resources/drawable-resource)** - Drawable资源的官方文档

## 总结

Android的drawable适配机制通过智能的资源匹配和缩放算法，帮助开发者创建在各种设备上都能良好显示的应用。理解这套机制的工作原理，并合理地组织图片资源，是Android UI开发的重要基础技能。

记住核心原则：**系统会优先使用最匹配的资源，如果找不到则通过缩放其他密度的资源来适配当前设备。**