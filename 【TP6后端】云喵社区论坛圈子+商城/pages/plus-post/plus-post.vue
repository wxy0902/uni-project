<template>
	<view class="container">
		<view class="head">
			<!-- 图文 -->
			<block v-if="form.type == 1">
				<u-button class="plus-btn" type="error" :disabled="btnDisabled" :loading="btnLoading" @click="uploadImg">发布</u-button>
			</block>
			<!-- 视频 -->
			<block v-if="form.type == 2">
				<u-button class="plus-btn" type="error" :disabled="btnDisabled" :loading="btnLoading" @click="submit">发布</u-button>
			</block>
		</view>
		<textarea placeholder="这一刻的想法..." :auto-height="true" maxlength="-1" v-model="form.content" class="post-txt"></textarea>
		<!-- 上传图片 -->
		<block v-if="form.type == 1">
			<u-upload ref="uUpload" name="Image" :max-count="9" :header="header" :action="uploadImgUrl" @on-uploaded="submit"
			 :auto-upload="false"></u-upload>
		</block>
		<block v-if="form.type == 2">
			<block v-if="form.media.length > 0">
				<video class="upload-video" :src="form.media[0]"></video>
			</block>
			<block v-else>
				<view @click="chooseVideo" class="upload-wrap">
					<u-icon name="plus"></u-icon>
				</view>
			</block>
		</block>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnDisabled: false,
				btnLoading: false,
				uploadImgUrl: this.$c.domain + 'common/upload',
				form: {
					type: 1,
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
			chooseVideo() {
				let that = this;
				uni.chooseVideo({
					compressed:false,
					success: (res) => {
						const tempFilePaths = res.tempFilePath;
						uni.uploadFile({
							url: this.$c.domain + "common/uploadFile",
							filePath: tempFilePaths,
							name: 'file',
							header: {
								token: uni.getStorageSync("token")
							},
							success: (uploadFileRes) => {
								let result = JSON.parse(uploadFileRes.data);
								if (result.code == 410 || result.code == 420) {
									uni.navigateTo({
										url: "/pages/login/login"
									})
									return;
								}

								if (result.code == 200) {
									that.form.media.push(result.result.url);
								}
							}
						});
					}
				});
			},
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
			submit(e) {
				if (this.form.type == 1) {
					let mediaList = [];
					e.forEach(function(item, index) {
						mediaList.push(item.response.result.url)
					})
					this.form.media = mediaList;
				}

				this.$H.post("post/addPost", this.form).then(res => {
					if (res.code == 200) {
						uni.redirectTo({
							url: "/pages/post-detail/post-detail?id=" + res.result.id
						})
					}
					this.btnDisabled = false;
					this.btnLoading = false;
				})
			}
		}
	}
</script>

<style lang="scss">
	@import 'plus-post.css';
</style>
