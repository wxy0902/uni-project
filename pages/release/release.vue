<template>
	<view class="posia posi-all0 posi-lr0 z999">
		<view class="posif posi-all0 posi-lr0 anima-punch-in3 bgwhite-a98"></view>
		<view class="release-popup">
			<view class="list-flex2">
				<!-- <navigator class="item flex-50v" url="/pages/plus-post/plus-post"> -->
				<view class="item flex-50v" @click="show = true">
					<image class="item-icon" src="/static/icon-nav-release/send_topic_icon.png" mode="aspectFit"></image>
					<view class="item-name">发咨询</view>
				</view>
				<!-- </navigator> -->
				<!-- <navigator class="item flex-50v"> -->
					<view class="item flex-50v" @click="show2 = true">
					<image class="item-icon" src="/static/icon-nav-release/send_secondhand_icon.png" mode="aspectFit"></image>
					<view class="item-name">发日常</view>
					</view>
				<!-- </navigator> -->
			</view>
			<image class="close" src="/static/icon-nav-release/icon_close.png" mode="aspectFit" @tap="$emit('close',false)"></image>
		</view>
		<u-action-sheet :list="list" v-model="show" @click="onSheetItem"></u-action-sheet>
		<u-action-sheet :list="list" v-model="show2" @click="onSheetItem2"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					text: '图文'
				}, {
					text: '视频'
				}],
				show: false,
				show2: false,
			}
		},
		onReady() {
			console.log('release');
		},

		methods: {
			onSheetItem(index){
				uni.navigateTo({
				    url: '/pages/release-information/release-information?type=' + index
				});
			},
            onSheetItem2(index){
				uni.navigateTo({
				    url: '/pages/plus-post/plus-post?type=' + index
				});
			}
		}
	}
</script>

<style>
	.release-popup {
		position: fixed;
		right: 0;
		left: 0;
		bottom: 24rpx;
	}

	.item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.item-icon {
		width: 112rpx;
		height: 112rpx;
		border-radius: 50%;
	}

	.item-name {
		font-size: 28rpx;
		color: #8f8f94;
		margin-top: 12rpx;
	}

	.list-flex2 {
		display: flex;
		width: 60%;
		margin: 0 auto;
		padding-bottom: 112rpx;
	}

	.list-flex2 .item:nth-child(1) {
		animation: fly-in .4s;
		animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
	}

	.list-flex2 .item:nth-child(2) {
		animation: fly-in .6s;
		animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
	}

	.close {
		display: block;
		margin: 0 auto;
		width: 56rpx;
		height: 56rpx;
		animation: fly-in .6s;
		animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
	}
</style>
