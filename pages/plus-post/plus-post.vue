<template>
	<view class="container">
		<view class="head">
			<!-- 图文 -->
			<block v-if="form.type == 0">
				<u-button class="plus-btn" type="error" :disabled="btnDisabled" :loading="btnLoading" @click="uploadImg">发布</u-button>
			</block>
			<!-- 视频 -->
			<block v-if="form.type == 1">
				<u-button class="plus-btn" type="error" :disabled="btnDisabled" :loading="btnLoading" @click="submit">发布</u-button>
			</block>
		</view>
		<u-form :model="form" ref="uForm">
			<u-form-item label="描述" label-position="top">
				<u-input type="textarea" v-model="form.content" placeholder="请填写详细描述" />
			</u-form-item>
		</u-form>
		
		<!-- 上传图片 -->
		<u-form-item label-position="top" v-if="form.type == 0">
			<u-upload ref="uUpload" name="Image" :max-count="9" :header="header" :action="uploadImgUrl" @on-uploaded="submit"
			 :auto-upload="false"></u-upload>
		</u-form-item>
		<u-form-item label-position="top" v-if="form.type == 1">
			<block v-if="form.media.length > 0">
				<video class="upload-video" :src="form.media[0]"></video>
			</block>
			<block v-else>
				<view @click="chooseVideo" class="upload-wrap">
					<u-icon name="plus"></u-icon>
				</view>
			</block>
		</u-form-item>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import Upload from '../../components/upload/upload.vue'
	export default {
		data() {
			return {
				btnDisabled: false,
				btnLoading: false,
				uploadImgUrl: 'https:www.baidu.com' + 'common/upload',
				form: {
					type: 0,
					topic_id: "",
					discuss_id: "",
					content: "",
					media: [],
					longitude: 0,
					latitude: 0
				},
				header: {
					token: uni.getStorageSync("token")
				},
			};
		},
		components: {
			Upload
		},
		onLoad(options) {
			if (options.topic_id) {
				this.form.topic_id = options.topic_id;
			}
			if (options.discuss_id) {
				this.form.discuss_id = options.discuss_id;
			}
			this.form.type = options.type;

			let location = uni.getStorageSync("location_info");
			this.form.longitude = location.longitude;
			this.form.latitude = location.latitude;
		},
		methods: {
			// chooseVideo() {
			// 	let that = this;
			// 	uni.chooseVideo({
			// 		compressed:false,
			// 		success: (res) => {
			// 			const tempFilePaths = res.tempFilePath;
			// 			uni.uploadFile({
			// 				url: '',
			// 				filePath: tempFilePaths,
			// 				name: 'file',
			// 				header: {
			// 					// token: uni.getStorageSync("token")
			// 				},
			// 				success: (uploadFileRes) => {
			// 					let result = JSON.parse(uploadFileRes.data);
			// 					if (result.code == 410 || result.code == 420) {
			// 						uni.navigateTo({
			// 							url: "/pages/login/login"
			// 						})
			// 						return;
			// 					}

			// 					if (result.code == 200) {
			// 						that.form.media.push(result.result.url);
			// 					}
			// 				}
			// 			});
			// 		}
			// 	});
			// },
			uploadImg() {
				this.btnDisabled = true;
				this.btnLoading = true;

				if (!this.form.content) {
					this.$refs.uToast.show({
						title: "内容不能为空",
						type: 'error'
					})
					this.btnDisabled = false;
					this.btnLoading = false;
					return;
				}

				this.$refs.uUpload.upload();
			},
			// submit(e) {
			// 	if (this.form.type == 0) {
			// 		let mediaList = [];
			// 		e.forEach(function(item, index) {
			// 			mediaList.push(item.response.result.url)
			// 		})
			// 		this.form.media = mediaList;
			// 	}

			// 	this.$H.post("post/addPost", this.form).then(res => {
			// 		if (res.code == 200) {
			// 			uni.redirectTo({
			// 				url: "/pages/post-detail/post-detail?id=" + res.result.id
			// 			})
			// 		}
			// 		this.btnDisabled = false;
			// 		this.btnLoading = false;
			// 	})
			// }
		}
	}
</script>

<style lang="scss">
	.head {
		display: flex;
		padding: 20rpx;
		border-bottom: 1px solid #f5f5f5;
	}
	
	.head .plus-btn {
		margin-left: auto;
	}
	
	.post-txt {
		width: 100%;
		padding: 20rpx 0;
		border-bottom: 1px solid #f5f5f5;
		min-height: 500rpx;
	}
	
	.upload-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 180rpx;
		height: 180rpx;
		background-color: #F5F5F5;
		margin-top: 30rpx;
		border-radius: 10rpx;
	}
	
	.upload-video{
		width: 180rpx;
		height: 180rpx;
		margin-top: 30rpx;
	}
</style>
