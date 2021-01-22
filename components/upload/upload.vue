<template>
	<view>
    <u-form-item label="图片" label-position="top" v-if="form.type == 0">
    	<u-upload ref="uUpload" name="Image" :max-count="9" :header="header" :action="uploadImgUrl" @on-uploaded="submit"
    	 :auto-upload="false"></u-upload>
    </u-form-item>
    <u-form-item label="视频" label-position="top" v-if="form.type == 1">
    	<block v-if="form.media.length > 0">
    		<video class="upload-video" :src="form.media[0]"></video>
    	</block>
    	<block v-else>
    		<view @click="chooseVideo" class="upload-wrap">
    			<u-icon name="plus"></u-icon>
    		</view>
    	</block>
    </u-form-item>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uploadImgUrl: '',
			}
		},
		props:{
			form:Object,
			header:String
		},
		methods: {
			chooseVideo() {
				let that = this;
				uni.chooseVideo({
					compressed:false,
					success: (res) => {
						const tempFilePaths = res.tempFilePath;
						uni.uploadFile({
							url: '',
							filePath: tempFilePaths,
							name: 'file',
							header: {
								// token: uni.getStorageSync("token")
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
			submit(e) {
				if (this.form.type == 0) {
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
		},
	}
</script>

<style scoped>

</style>