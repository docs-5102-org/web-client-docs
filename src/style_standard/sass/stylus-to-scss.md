---
title: Stylus 转换为 SCSS 指南
category:
  - sass
---

# Stylus 转换为 SCSS 指南

## 概述

本文档介绍如何使用 `stylus-converter` 工具将 Stylus 文件转换为 SCSS 文件。这个转换工具可以帮助开发者在不同的CSS预处理器之间进行代码迁移。

## 什么是 Stylus 和 SCSS

- **Stylus**: 一个功能强大的CSS预处理器，语法简洁，支持缩进语法和传统CSS语法
- **SCSS**: Sass的SCSS语法，是CSS的超集，使用大括号和分号，更接近传统CSS语法

## 安装步骤

### 1. 全局安装 stylus-converter

使用 npm 全局安装转换工具：

```bash
npm install -g stylus-converter
```

### 2. 验证安装

安装完成后，可以通过以下命令验证是否安装成功：

```bash
stylus-converter --version
```

## 使用方法

### 基本转换命令

在包含要转换文件的目录中执行以下命令：

```bash
stylus-converter -i input.styl -o output.scss
```

### 参数说明

- `-i` 或 `--input`: 指定输入的 Stylus 文件路径
- `-o` 或 `--output`: 指定输出的 SCSS 文件路径

### 示例

将 `test.styl` 文件转换为 `test.scss`：

```bash
stylus-converter -i test.styl -o test.scss
```

## 批量转换

如果需要转换多个文件，可以使用脚本或批处理命令：

### Unix/Linux/macOS
```bash
for file in *.styl; do
    stylus-converter -i "$file" -o "${file%.styl}.scss"
done
```

### Windows (PowerShell)
```powershell
Get-ChildItem *.styl | ForEach-Object {
    stylus-converter -i $_.Name -o ($_.BaseName + ".scss")
}
```

## 相关资源

- **项目仓库**: [https://github.com/TaoXuSheng/stylus-converter](https://github.com/TaoXuSheng/stylus-converter)
- **Stylus 官方文档**: [https://stylus-lang.com/](https://stylus-lang.com/)
- **Sass 官方文档**: [https://sass-lang.com/](https://sass-lang.com/)
- **第三方教程**: [http://quanzhan.applemei.com/webStack/TkRZeU1BPT0=](http://quanzhan.applemei.com/webStack/TkRZeU1BPT0=)


## 总结

`stylus-converter` 是一个实用的工具，可以帮助开发者快速将Stylus代码迁移到SCSS。虽然自动转换可能不是100%完美，但可以大大减少手动迁移的工作量。使用时建议结合手动检查和测试，确保转换结果的正确性。