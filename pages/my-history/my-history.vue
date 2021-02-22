<template>
	<view>
		<view class="title">我浏览的</view>
		<view class="time">2021-02-20</view>
        <view class="history">
			<view class="history-item">
				<image src="../../static/icon-bottom-nav/find_select.png" mode=""></image>
				<text>￥20</text>
			</view>
			<view class="history-item">
				<image src="../../static/icon-bottom-nav/find_select.png" mode=""></image>
				<text>￥20</text>
			</view>
			<view class="history-item">
				<image src="../../static/icon-bottom-nav/find_select.png" mode=""></image>
				<text>￥20</text>
			</view>
			<view class="history-item">
				<image src="../../static/icon-bottom-nav/find_select.png" mode=""></image>
				<text>￥20</text>
			</view>
			<view class="history-item">
				<image src="../../static/icon-bottom-nav/find_select.png" mode=""></image>
				<text>￥20</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style scoped>
 .history{
	 /* width: 100%; */
	 display: flex;
	 /* flex-direction:row; */
	 justify-content: space-around;
	 /* height: 300rpx; */
	 /* display: inline-block; */
 }
 
 .history .time{
	 /* display: block; */
 }
 .history-item{
	width: 30%;
	 height: 300rpx;
	 flex-wrap: wrap;
 }
 
 .history-item image{
	 width: 100%;
	 height: 200rpx;
 }
</style>