---
title: 常见问题
category:
  - 跨平台框架
tag:
  - flutter
order: 4
---

# flutter 常见问题与解决方案

## flutter相关问题

### 文本方向性问题

**错误信息**：
```
RichText widgets require a Directionality widget ancestor.
No Directionality widget found.
```

**解决方案**：
```dart
// 方案一：使用 Directionality 包裹
Directionality(
  textDirection: TextDirection.ltr,
  child: Text('Your text here'),
)

// 方案二：在Text组件中添加属性
Text(
  'Deliver features faster',
  textAlign: TextAlign.center,
  textDirection: TextDirection.ltr,
)
```

### Row组件布局问题

**错误信息**：
```
Horizontal RenderFlex with multiple children has a null textDirection
```

**解决方案**：
```dart
Row(
  textDirection: TextDirection.ltr,
  children: [
    // 子组件
  ],
)
```

同理其他widget布局如果没有 ，MaterialApp包住，只要拥有 textDirection 属性，都必须加上 textDirection: TextDirection.ltr

### 数据类型错误

**错误信息**：
```
type '_Map<String, String>' is not a subtype of type 'String'
```

通常来讲，是由于你返回的数据是一个Map,但是某个方法里要求的是String 

**解决方案**：
```dart
// 错误示例
Image.network(listData[index])  // 返回Map对象

// 正确示例
Image.network(listData[index]['imageUrl'])  // 返回String
```

### 依赖包管理

#### 添加依赖
在 `pubspec.yaml` 文件中添加：
```yaml
dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.2
  fluttertoast: ^8.2.2
```

#### 安装依赖
```bash
flutter pub get
```

**注意**：安装完依赖需要重启程序才能生效。

### JSON数据处理

#### 相关资源
- **官方文档**：https://flutter.cn/docs/data-and-backend/json

#### 代码生成命令
```bash
# 一次性生成
flutter pub run build_runner build --delete-conflicting-outputs

# 监控文件变化
flutter pub run build_runner watch
```

#### JSON操作示例
```dart
// JSON字符串转Map
Map<String, dynamic> map = jsonDecode(response.data);

// Map转JSON字符串
String str = jsonEncode(map);

// 获取JSON字符串
response.data.toString()
```

### flutter 编写代码过程中，如果遇到引入新的类或者文件，都需要 restart一下 才能生效

### path_provider

用于查找文件系统上常用的位置: https://pub-web.flutter-io.cn/packages/path_provider

### 文件系统操作

#### 系统路径获取示例(获取系统目录)
```dart
import "package:path/path.dart" show dirname, join;
import 'dart:io' show Directory, File, Platform;

// 获取当前文件绝对路径
var currentFilePath = File(Platform.script.toFilePath()).absolute.path;

// 获取项目根路径
var rootAbsolutePath = Directory.current.path;

// 获取相对路径
var relativePath = currentFilePath.replaceFirst(rootAbsolutePath, '');

// 获取父目录路径
String parentPath = File(Platform.script.toFilePath()).parent.path;
```

### 7. 网络请求

#### Dio网络库
- **官方文档**：https://pub-web.flutter-io.cn/packages/dio
- **使用教程**：https://juejin.cn/post/7038847800154521631



### 文本下划线问题

如果Text组件出现黄色下划线，原因是缺少Material风格的根组件，建议在应用根部使用 `MaterialApp`。

### Cannot fit requested classes in a single dex file (# methods: 66731 > 65536)

在`android/app/build.gradle`中添加

```
android {
    defaultConfig {
         multiDexEnabled true
    }
}

dependencies {
   implementation 'com.android.support:multidex:1.0.3'

}
```
参考：
https://blog.csdn.net/VVVZCS/article/details/102699821
https://stackoverflow.com/questions/62223356/d8-cannot-fit-requested-classes-in-a-single-dex-file/62224956


### FLutter Error: ADB exited with exit code 1 Performing Streamed Install**

出现这个原因是模拟器存储空间满了没办法安装运行新的应用，打开模拟器界面将原先一些不要的应用卸载了就能安装了！

### Because bruno >=2.1.0-nullsafety depends on intl ^0.17.0 and flutter_qk_ui depends on intl ^0.18.0,**

**解决方案：yml文件中添加如下进行覆盖**

```yml
dependency_overrides:
  intl: 0.17.0
```

### E:\dev_workspace\flutter_workspace\flutter_qk_ui\android\app\src\debug\AndroidManifest.xml Error: uses-sdk:minSdkVersion 16 cannot be smaller than version 21 declared in library [:camera_android] E:\dev_workspace\flutter_workspace\flutter_qk_ui\build\camera_android\intermediates\merged_manifest\debug\AndroidManifest.xml as the library might be using APIs not available in 16 Suggestion: use a compatible library with a minSdk of at most 16, or increase this project's minSdk version to at least 21, or use tools:overrideLibrary="io.flutter.plugins.camera" to force usage (may lead to runtime failures)

在 `android/app/src/main/AndroidManifest.xml` 文件中 加入`<uses-sdk tools:overrideLibrary="io.flutter.plugins.camera"></uses-sdk>`

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          xmlns:tools="http://schemas.android.com/tools">
      <uses-sdk tools:overrideLibrary="io.flutter.plugins.camera"></uses-sdk>
      <application
            //....你的代码
            >
            //.....
      </application> 
</manifest>
```

### ERROR:flutter/runtime/dart_vm_initializer.cc(41)] Unhandled Exception: PlatformException(channel-error, Unable to establish connection on channel., null, null

如果你使用的是热重启或热重载，它就不会起作用。由于Flutter必须将插件依赖项注入到应用的平台特定部分，因此热重启/热重载不足以触发注入，也就是说新添加依赖时，必须重启flutter应用, 关掉程序 重新 `flutter run`

### Apps targeting Android 12 and higher are required to specify an explicit value for `android:exported` when the corresponding component has an intent filter defined.

在`AndroidManifest.xml`文件中给`activity`添加`android:exported`，例如：

```xml
<activity android:name=".MainActivity" android:exported="true">
```

### The Android Gradle plugin supports only Kotlin Gradle plugin version 1.5.20 and higher. The following dependencies do not satisfy the required version: project ':image_gallery_saver' -> org.jetbrains.kotlin:kotlin-gradle-plugin:1.3.72

在`pubspec.yaml`中添加如下节点，如果下载不了到缓存中，就手动下载

```yaml
dependency_overrides:
  image_gallery_saver:
    git:
      url: https://github.com/hui-z/image_gallery_saver
      ref: master
```

### Running Gradle task 'assembleDebug'... 运行卡住

注释google（）、mavenCentral（）方法， 手动添加仓库地址

```
buildscript {
    ext.kotlin_version = '1.7.10'
    repositories {
//        google()
//        mavenCentral()
        maven { url 'https://maven.aliyun.com/repository/central'}
        maven { url 'https://maven.aliyun.com/repository/public' }
        maven { url 'https://maven.aliyun.com/repository/google'}
        maven { url 'https://maven.aliyun.com/repository/gradle-plugin'}
        maven { url 'https://dl.google.com/dl/android/maven2/'}
    }

    dependencies {
        classpath 'com.android.tools.build:gradle:7.3.0'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
    }
}

allprojects {
    repositories {
//        google()
//        mavenCentral()
        maven { url 'https://maven.aliyun.com/repository/central'}
        maven { url 'https://maven.aliyun.com/repository/public' }
        maven { url 'https://maven.aliyun.com/repository/google'}
        maven { url 'https://maven.aliyun.com/repository/gradle-plugin'}
        maven { url 'https://dl.google.com/dl/android/maven2/'}
    }
}
```

### Your Flutter application is created using an older version of the Android embedding. It's being deprecated in favor of Android embedding v2. android  - 您的 Flutter 应用程序是使用旧版本的 Android 嵌入创建的

https://www.coder.work/article/7751257
https://blog.csdn.net/weixin_40795574/article/details/114402827
https://github.com/flutter/flutter/wiki/Upgrading-pre-1.12-Android-projects



## Android相关问题解决

### 1. Android嵌入版本过旧

**解决方案参考**：
- https://www.coder.work/article/7751257
- https://blog.csdn.net/weixin_40795574/article/details/114402827
- https://github.com/flutter/flutter/wiki/Upgrading-pre-1.12-Android-projects

### 2. Gradle构建卡住

**解决方案**：修改 `android/build.gradle`
```gradle
buildscript {
    ext.kotlin_version = '1.7.10'
    repositories {
        maven { url 'https://maven.aliyun.com/repository/central'}
        maven { url 'https://maven.aliyun.com/repository/public' }
        maven { url 'https://maven.aliyun.com/repository/google'}
        maven { url 'https://maven.aliyun.com/repository/gradle-plugin'}
        maven { url 'https://dl.google.com/dl/android/maven2/'}
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:7.3.0'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
    }
}

allprojects {
    repositories {
        maven { url 'https://maven.aliyun.com/repository/central'}
        maven { url 'https://maven.aliyun.com/repository/public' }
        maven { url 'https://maven.aliyun.com/repository/google'}
        maven { url 'https://maven.aliyun.com/repository/gradle-plugin'}
        maven { url 'https://dl.google.com/dl/android/maven2/'}
    }
}
```

### 3. Kotlin版本冲突

**错误信息**：
```
The Android Gradle plugin supports only Kotlin Gradle plugin version 1.5.20 and higher.
```

**解决方案**：在 `pubspec.yaml` 中添加
```yaml
dependency_overrides:
  image_gallery_saver:
    git:
      url: https://github.com/hui-z/image_gallery_saver
      ref: master
```

### 4. Android 12兼容性

**错误信息**：需要显式设置 `android:exported`

**解决方案**：在 `AndroidManifest.xml` 中添加
```xml
<activity android:name=".MainActivity" android:exported="true">
```

### 5. SDK版本兼容性

**解决方案**：在 `AndroidManifest.xml` 中添加
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          xmlns:tools="http://schemas.android.com/tools">
    <uses-sdk tools:overrideLibrary="io.flutter.plugins.camera"></uses-sdk>
    <!-- 其他配置 -->
</manifest>
```

### 6. 依赖冲突问题

**解决方案**：使用依赖覆盖
```yaml
dependency_overrides:
  intl: 0.17.0
```

### 7. DEX文件大小限制

**错误信息**：
```
Cannot fit requested classes in a single dex file (# methods: 66731 > 65536)
```

**解决方案**：在 `android/app/build.gradle` 中添加
```gradle
android {
    defaultConfig {
        multiDexEnabled true
    }
}

dependencies {
    implementation 'com.android.support:multidex:1.0.3'
}
```
