<template>
	<view>
		<view class="c-wrap">
			<u-form ref="uForm" label-width="auto">
				<u-form-item label="头像">
					<u-avatar mode="square" slot="right" :src="userInfo.avatar" size="100" @click="ChooseImage"></u-avatar>
				</u-form-item>
				<u-form-item label="昵称" right-icon="arrow-right">
					<!-- <u-input :placeholder="userInfo.username" v-model="userInfo.username" input-align="right" clearable=false /> -->
					<input class="text-input text-grey" type="text" maxlength="6" v-model="userInfo.username" />
					<!-- <u-input :placeholder="userInfo.username" v-model="userInfo.username" input-align="right" clearable=false /> -->
				</u-form-item>
				<u-form-item label="性别" right-icon="arrow-right">
					<view class="uni-input text-grey" @click="show = true">{{ userInfo.sex }}</view>
					<!-- <u-input input-align="right" v-model="cateName" @click="show = true" placeholder="请选择性别" type="select" /> -->
					<!-- <u-input input-align="right" v-model="cateName" @click="show = true" placeholder="请选择类别" type="text" /> -->
					<!-- <input class="text-input" type="text" maxlength="6" v-model="userInfo.intro" /> -->
					<!-- <u-input @click="jump(userInfo.intro,'intro')" :placeholder="userInfo.intro" :disabled="true" input-align="right" /> -->
				</u-form-item>
				<u-form-item label="个性签名" :border-bottom=false>
					<input class="text-input text-grey" type="text" maxlength="6" v-model="userInfo.intro" />
					<!-- <u-input @click="jump(userInfo.intro,'intro')" :placeholder="userInfo.intro" :disabled="true" input-align="right" /> -->
				</u-form-item>
			</u-form>
			
		</view>
		<u-select v-model="show" mode="single-column" :list="sexList" @confirm="confirm"></u-select>
		<view class="bottom-btn">
			<u-button @click="submit" shape="circle" type="error">保存</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {

				},
				sexList: [{
						value: '1',
						label: '男'
					},
					{
						value: '2',
						label: '女'
					}
				],
				show: false,
				userInfo: {
					avatar: 'https://t7.baidu.com/it/u=2397542458,3133539061&fm=193&f=GIF',
					username: '老王',
					intro: '啦啦啦啦啦',
					sex:'男'
				},
			};
		},
		onShow(options) {
			this.getUserInfo();
		},
		methods: {
			// 选择图片
			ChooseImage() {
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						// console.log("res",res)
						if (res.tempFilePaths && res.tempFilePaths.length > 0) {
							// that.avatarUrl = res.tempFilePaths[0]
							console.log("res.tempFilePaths[0]", res.tempFilePaths[0])
							this.userInfo.avatar = res.tempFilePaths[0]
						}
					}
				});
			},
			confirm(e) {
				console.log(e)
				this.userInfo.sex = e[0].label;
			},
			getUserInfo() {
				// this.$H.get("user/userInfo").then(res => {
				// 	this.userInfo = res.result
				// })
			},
			// jump(value, type) {
			// 	uni.navigateTo({
			// 		url: "edit-submit?value=" + JSON.stringify(value) + "&type=" + type
			// 	})
			// }
		}
	}
</script>

<style>
	page {
		background-color: #F5F5F5;
	}
</style>
<style scoped>
	.c-wrap {
		padding: 20rpx;
		background-color: #FFFFFF;
	}

	/* .bind-mobile {
		display: flex;
	} */

	/* 标签 */
	/* .tag-box {}

	.tag-box .tag {
		padding: 10rpx 20rpx;
		border-radius: 20rpx;
		font-size: 24rpx;
		display: inline-block;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		background-color: #ffebe5;
	}

	.tag-box .tag:nth-child(2n) {
		background-color: #ecf9f2;
	}

	.tag-box .tag:nth-child(3n) {
		background-color: #fff7e5;
	}

	.tag-box .tag:nth-child(5n) {
		background-color: #b3e0ff;
	} */

	.text-input {
		text-align: right;
	}
	
	.uni-input{
		text-align: end;
	}
	
	.text-grey {
		color: #8799a3;
	}
	
	.bottom-btn {
		padding: 20rpx;
		margin-top: 100rpx;
	}
</style>
