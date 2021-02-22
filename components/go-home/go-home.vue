<template>
	<!-- <navigator url="/pages/home/home"> -->
	<view class="container" @click="goHome">首页</view>
	<!-- </navigator> -->
</template>

<script>
	export default {
		methods: {
			goHome() {
				uni.reLaunch({
					url:'/pages/index/index'
				})
			}
		},
	}
</script>

<style scoped>
.container{
	width: 100rpx;
	height: 100rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	right: 20rpx;
	bottom: 220rpx;
	color: #FFFFFF;
	border-radius: 50%; 
	background: rgba(0,0,0, 0.5);
}
</style>