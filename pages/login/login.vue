<template>
	<view class="login">
		<image class="logo" :src="shareCover"></image>
		<text class="txt1">申请获取以下权限</text>
		<text class="txt2">获取你的公开信息（昵称、头像等）</text>
		<u-button type="success" open-type="getUserInfo" lang="zh_CN" @getuserinfo="userLogin" shape="circle" plain>授权登录</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				domain: this.$H.domain,
				shareCover:""
			};
		},
		onLoad() {
			this.getSysInfo();
		},
		methods: {
			// getSysInfo() {
			// 	this.$H.get("system/miniConfig").then(res => {
			// 		this.shareCover = res.result.intro;
			// 	})
			// },
			userLogin(e) {
				let that = this;
				let userInfo = e.detail.userInfo;
				// console.log(e)
				uni.login({
					success: function(res) {
						console.log("res",res)
						if (res.code) {
						// 	that.$H.post('user/miniWxLogin', {
						// 		code: res.code,
						// 		username: userInfo.nickName,
						// 		avatar: userInfo.avatarUrl,
						// 		province: userInfo.province,
						// 		city: userInfo.city,
						// 		gender: userInfo.gender
						// 	}).then(res2 => {
						// 		if (res2.code === 200) {
						// 			uni.setStorageSync("hasLogin", true);
						// 			uni.setStorageSync("token", res2.result.token);
						// 			uni.navigateBack();
						// 			that.getUserInfo();
						// 		}
						// 	})
						}
					}
				});
			},
			getUserInfo() {
				this.$H.get("user/userInfo").then(res => {
					uni.setStorageSync("userInfo", res.result)
				})
			}
		}
	}
</script>

<style lang="scss">
	.login{
		display: flex;
		flex-direction: column;
		padding: 100rpx;
	}
	.login .logo {
		width: 230rpx;
		height: 230rpx;
		margin: 50rpx auto;
	}
	
	.login .txt1{
		margin-bottom: 10rpx;
	}
	
	.login .txt2{
		color: #999;
		margin-bottom: 50rpx;
	}
</style>
