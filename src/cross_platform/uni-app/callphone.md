---
title: 调用打电话指南
category:
  - 跨平台框架
tag:
  - uni-app
order: 7
---

# 调用打电话指南

### 调用示例

```vue
<template>
	<view class="container">
		<!-- 底部拨打电话按钮 -->
		<view class="bottom-call-button" @click="makeCall">
			<text class="bottom-call-text">立即拨打电话</text>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				phoneNumber: '400-xxx-9544',
			}
		},
		methods: {
			makeCall() {
				uni.makePhoneCall({
					phoneNumber: this.phoneNumber
				});
			}
		}
	}
</script>

<style>
	/* 主题色变量 */
	page {
		--theme-color: #fe7f0e;
		--theme-color-light: rgba(254, 127, 14, 0.1);
		--theme-color-shadow: rgba(254, 127, 14, 0.3);
		background-color: #f5f5f5;
	}

	.container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: #fff;
		padding-bottom: 80rpx;
	}
	/* 底部固定拨打电话按钮 */
	.bottom-call-button {
		position: fixed;
		bottom: 20rpx;
		left: 30rpx;
		right: 30rpx;
		background: var(--theme-color);
		border-radius: 50rpx;
		padding: 25rpx 0;
		text-align: center;
		box-shadow: 0 8rpx 20rpx var(--theme-color-shadow);
		z-index: 99;
	}

	.bottom-call-text {
		color: #fff;
		font-size: 32rpx;
		font-weight: bold;
	}

</style>
```

### 云打包时，必须要设置权限，否则功能无效

`manifest` -> `安卓iOS权限配置` -> `额外添加的权限` -> 在输入框添追加如下的权限

```
<uses-permission android:name="android.permission.CALL_PHONE"/>
```

### 注意事项

- [关于targetsdkversion说明，上传应用商店时需要设置30（低于30不支持），默认为28](https://uniapp.dcloud.net.cn/tutorial/app-android-targetsdkversion.html)


### 参考文档

- [官方文档](https://uniapp.dcloud.net.cn/api/system/phone.html#makephonecall)