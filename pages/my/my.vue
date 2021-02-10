<template>
	<view>
		<view class="head">
			<block v-if="hasLogin">
				<!-- <navigator class="userinfo" url="/pages/user-edit/user-edit"></navigator> -->
				<view class="userinfo" @click="toUcenter">
					<u-avatar :src="userInfo.avatar"></u-avatar>
					<view class="username">
						<text>{{userInfo.username}}</text>
						<text>{{userInfo.intro}}</text>
					</view>
					<!-- <text class="iconfont icon-right"></text> -->
				</view>
				<!-- </navigator> -->
			</block>
			<block v-else>
				<view class="btn-login">
					<u-button type="error" shape="circle" @click="toLogin" plain>授权登录</u-button>
				</view>
			</block>
		</view>
		<!--  -->
		<view class="grid">
			<u-grid :col="4" :border="false" style="margin: 20rpx 0;" @click="toNav">
				<u-grid-item index="/pages/my-collect/my-collect">
					<text>{{userInfo.fans}}</text>
					<view class="grid-text">收藏</view>
				</u-grid-item>
				<u-grid-item index="/pages/my-history/my-history">
					<text>{{userInfo.follow}}</text>
					<view class="grid-text">历史浏览</view>
				</u-grid-item>
				<u-grid-item index="/pages/my-attention/my-attention">
					<text>{{userInfo.post_num}}</text>
					<view class="grid-text">关注</view>
				</u-grid-item>
				<u-grid-item index="/pages/my-fans/my-fans">
					<text>{{userInfo.integral}}</text>
					<view class="grid-text">粉丝</view>
				</u-grid-item>
			</u-grid>
		</view>
		<!-- 个人中心 -->
		<view class="grid">
			<u-form ref="uForm" label-width="auto">
				<u-form-item right-icon="arrow-right">
					<view @click="toUserEdit">我的资料</view>
				</u-form-item>
				<u-form-item right-icon="arrow-right">
					<view @click="toMyRelease">我的咨询</view>
				</u-form-item>
				<u-form-item right-icon="arrow-right" :border-bottom=false>
					<view @click="toMyCircle">我的有圈</view>
				</u-form-item>
			</u-form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hasLogin: true
			}
		},
		methods: {
			toNav(url) {
				// console.log("url",url)
				uni.navigateTo({
					url: url
				})
			},
			toUserEdit() {
				uni.navigateTo({
					url: "/pages/user-edit/user-edit"
				})
			},
			toMyRelease() {
				uni.navigateTo({
					url: "/pages/my-release/my-release"
				})
			},
			toMyCircle() {
				uni.navigateTo({
					url: "/pages/my-contact/my-contact"
				})
			},
		}
	}
</script>

<style>
	page {
		background-color: #f5f5f5;
	}

	.head {
		padding: 20rpx;
		background-color: #fff;
		margin: 20rpx;
		border-radius: 10rpx;
	}

	.userinfo {
		display: flex;
		align-items: center;
		padding: 20rpx;
		margin: 40rpx 0;
	}

	.userinfo .username {
		display: flex;
		flex-direction: column;
	}

	.grid-text {
		color: #999;
		font-size: 12px;
	}

	.userinfo u-avatar {
		margin-right: 20rpx;
	}

	.userinfo .icon-right {
		margin-left: auto;
	}

	.btn-login {
		margin: 40rpx 0;
	}

	.grid {
		margin: 20rpx;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 5px;
	}

	/*服务按钮*/
	.btn-wrap {
		display: flex;
		margin-top: 30rpx;
	}

	.btn-wrap .btn-contact {
		background-color: #fff;
		margin-left: 15rpx;
		margin-right: 15rpx;
		padding: 20rpx;
		line-height: unset;
		font-size: 12px;
		color: #999;
	}

	.btn-wrap .btn-contact:active {
		background-color: #f5f5f5;
	}

	.btn-wrap .btn-contact .txt {
		margin-top: 20rpx;
	}

	.btn-wrap .btn-contact::after {
		border: unset;
		position: unset;
	}

	.icon-size {
		font-size: 50rpx;
	}
</style>
