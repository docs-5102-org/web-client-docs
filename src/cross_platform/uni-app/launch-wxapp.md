---
title: app唤起小程序指南
category:
  - 跨平台框架
tag:
  - uni-app
order: 7
---

# app唤起小程序指南

### 示例代码

```vue
<template>
	<view class="container">
		<!-- 操作按钮 -->
        <view class="action-section">
            <button class="submit-button" @tap="handleOrder">
                <image class="button-icon" src="/static/wechat.png"></image>
                <text>小程序直接下单</text>
            </button>
        </view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeTab: null,
			}
		},
		onLoad() {
			this.activeTab = this.tabs[0];
			this.getWeixinService()
		},
		methods: {
			handleTabChange(tab) {
				this.activeTab = tab;
				// console.log('当前选中:', tab);
			},

			getVehicleImageById(id) {
				const tab = this.tabs.find(t => t.id === id);
				return tab ? tab.image : '';
			},

			makeCall() {
				uni.makePhoneCall({
					phoneNumber: this.phoneNumber
				});
			},

			isWeixin() {
				// #ifdef H5
				return /MicroMessenger/i.test(navigator.userAgent);
				// #endif
				// #ifndef H5
				return true;
				// #endif
			},

			isMobile() {
				// #ifdef H5
				return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
				// #endif
				// #ifndef H5
				return true;
				// #endif
			},

			getWeixinService() {
				// #ifdef APP-PLUS
				plus.share.getServices((services) => {
					for (let service of services) {
						if (service.id === 'weixin') {
							this.weixinService = service
							console.log('获取微信服务成功')
							break
						}
					}

					if (!this.weixinService) {
						console.log('未找到微信分享服务')
					}
				}, (error) => {
					console.log('获取分享服务失败：', JSON.stringify(error))
				})
				// #endif
			},

			jumpToMiniProgram() {
				const config = {
					appId: 'wxxxxxxxxx',
					id: 'gh_xxxxxxxxx',
					path: 'pages/index/index',
					query: '',
					envVersion: 'release',
				};

				// #ifdef H5
				if (!this.isMobile()) {
					uni.showToast({
						title: '请在手机上打开此页面',
						icon: 'none',
						duration: 2000
					});
					return;
				}

				let schemeUrl = `weixin://dl/business/?appid=${config.appId}&path=${config.path}`;

				if (config.query) {
					schemeUrl += `&query=${encodeURIComponent(config.query)}`;
				}

				if (config.envVersion) {
					schemeUrl += `&env_version=${config.envVersion}`;
				}

				window.location.href = schemeUrl;

				setTimeout(() => {
					uni.showModal({
						title: '提示',
						content: '如果未自动跳转，请点击右上角菜单，选择"在浏览器中打开"',
						showCancel: false
					});
				}, 2000);
				// #endif

				// #ifdef MP-WEIXIN
				uni.navigateToMiniProgram({
					appId: config.appId,
					path: config.path,
					success: (res) => {
						console.log('跳转成功', res);
					},
					fail: (err) => {
						console.error('跳转失败', err);
						uni.showToast({
							title: '跳转失败，请稍后重试',
							icon: 'none'
						});
					}
				});
				// #endif

				// #ifdef APP-PLUS
				if (!this.weixinService) {
					uni.showToast({
						title: '微信服务未初始化',
						icon: 'none'
					})
					return
				}

				const options = {
					id: config.id,
					path: config.path,
					type: 0
				}

				this.weixinService.launchMiniProgram(
					options,
					() => {
						console.log('跳转小程序成功')
					},
					(error) => {
						uni.showToast({
							title: '跳转失败：' + error.message,
							icon: 'none',
							duration: 3000
						})
						console.log('跳转小程序失败：', JSON.stringify(error))
					}
				)
				// #endif
			},

			handleOrder() {
				this.jumpToMiniProgram();
			}
		}
	}
</script>

<style>
	page {
		--theme-color: #fe7f0e;
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

    /* 操作按钮 */
	.action-section {
		padding: 0 32rpx;
		margin-bottom: 32rpx;
	}

	.submit-button {
		width: 100%;
		background: linear-gradient(to right, #a855f7, #7c3aed);
		color: white;
		font-size: 36rpx;
		font-weight: bold;
		border-radius: 100rpx;
		border: none;
		box-shadow: 0 10rpx 30rpx rgba(168, 85, 247, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12rpx;
	}

	.button-icon {
		width: 40rpx;
		height: 40rpx;
		display: block;
	}

	.submit-button::after {
		border: none;
	}


</style>
```

### 注意事项

1. 在已上线的企业小程序情况下，自定义基准没有任何问题
2. 云打包时，需要额外配置如下内容

- `manifest` -> `安卓iOS模块配置` -> `勾选Share分享` -> `勾选微信分享` -> `填入appid`

:::tip
**注意：**

`manifest` -> `安卓iOS模块配置` -> `勾选Share分享` -> `勾选微信分享` -> `填入appid`

这里的`appid`不是小程序的`appid`，是需要在 `微信·开发平台` 单独申请的移动应用的 `appid`
方便于应用分享到微信生态

注册地址：`https://open.weixin.qq.com/`

要求：这里的主体，尽量与小程序保持一致，便于审核

:::

如果不按照上面的操作，将会报 `bad_param`，详见[https://ask.dcloud.net.cn/article/41404](https://ask.dcloud.net.cn/article/41404)

3. [关于targetsdkversion说明，上传应用商店时需要设置30（低于30不支持），默认为28](https://uniapp.dcloud.net.cn/tutorial/app-android-targetsdkversion.html)

### 参考文档

- [问题指南](https://ask.dcloud.net.cn/article/41404)
- [官方文档](https://uniapp.dcloud.net.cn/api/other/open-miniprogram.html#navigatetominiprogram)
- [参考指南](https://blog.csdn.net/weixin_45549967/article/details/120163949)
- [h5 API指南](https://www.html5plus.org/doc/zh_cn/share.html#plus.share.ShareService.launchMiniProgram)

