<template>
	<view v-if="isShow" class="comment ">
		<view class="mask" @click="clickCancle()"></view>
		<!-- 评论输入框 -->
		<!-- <view class="comment-tool">
			<textarea placeholder="吐个槽..." fixed="true" cursor-spacing="10" v-model="cTxt" auto-height="true" placeholder-class="txt-placeholder"></textarea>
			<u-button type="error" @click="addComment" :disabled="isSubmitD" style="border-radius: 0;">发布</u-button>
		</view> -->

		<view class="tool">
			<textarea :cursor-spacing="setHight()" focus fixed="true" v-model="content" auto-height="true" placeholder-style="color:#666666"
			 :placeholder="placeholder" :show-confirm-bar=false></textarea>
			<u-button type="error" @click="clickSend()" :disabled="isSubmitD" style="border-radius: 0;">发布</u-button>
		</view>


		<!-- <view class="comment-bottom">
			<textarea class="bottom-textarea" :cursor-spacing="setHight()" v-model="content" focus placeholder-style="color:#666666" :placeholder="placeholder" />
			<view class="bottom-view" id="bottomView"><view class="send-btn" @click="clickSend()">发送</view></view>
		</view> -->
	</view>
</template>

<script>
	export default {
		props: {
			placeholder: {
				type: String,
				default: '请输入评论内容…'
			}

		},
		data() {
			return {
				isShow: false,
				content: ''
			};
		},
		watch: {},
		mounted() {
			uni.onKeyboardHeightChange(res => {
				console.log(res.height)
				this.isShow = res.height > 0
			})
		},
		methods: {
			setHight() {
				return uni.upx2px(80);
			},
			clickSend() {
				this.$emit('sendComment', this.content);
				//发送后清空数据
				this.content = '';
				this.isShow = false;
			},
			open() {
				this.isShow = true;
				console.log(this.note)
			},
			clickCancle() {
				this.isShow = false;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.tool {
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #fff;
		padding: 10rpx;
		display: flex;
	}

	.tool textarea {
		background-color: #f5f5f5;
		padding: 20rpx;
		border-radius: 10rpx;
		min-height: 40rpx;
	}

	.comment {
		z-index: 2;
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		display: flex;
		flex-direction: column;
	}

	.mask {
		width: 100%;
		flex: 1;
		background: rgba(0, 0, 0, 0.3);
	}

	.mask-hidden {
		display: none;
	}

	.comment-bottom {
		display: flex;
		flex-direction: column;
		width: 100%;
		background-color: white;
		position: absolute;
		bottom: 0;

		.bottom-textarea {
			margin: 0 auto;
			width: 92%;
			margin-top: 20rpx;
			height: 210rpx;
			border-bottom: 1px solid #f6f6f6;
		}

		.bottom-view {
			margin: 0rpx 30rpx;
			display: flex;
			height: 80rpx;
			justify-content: flex-end;
			align-items: center;
			flex-direction: row;

			.send-btn {
				width: 100rpx;
				text-align: end;
				font-size: 30rpx;
				align-items: center;
				color: #d81e07;
			}
		}
	}
</style>
