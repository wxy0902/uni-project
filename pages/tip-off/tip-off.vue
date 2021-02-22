<template>
	<view class="container">
		<u-form :model="form">
			<u-form-item label="类型 (必填)" label-position="top">
				<u-radio-group v-model="radio">
					<u-radio v-for="(item, index) in radioList" :key="index" :name="item.name" :disabled="item.disabled">
						<text style="color: #666">{{ item.name }}</text>						
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="描述 (选填)" label-position="top">
				<u-input type="textarea" v-model="form.description" placeholder="请填写详细描述" />
			</u-form-item>
			<u-form-item label="图片证据 (选填)" label-position="top" :border-bottom=false>
				<u-upload ref="uUpload" name="Image" :max-count="9" :action="action" @on-uploaded="submit" :auto-upload="false"></u-upload>
			</u-form-item>
		</u-form>
		<view class="f-fixed">
			<u-button @click="submit" type="error" shape="circle">提交</u-button>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				action: 'http://www.example.com/upload',
				radioList: [
					{
						name: '不友善内容',
						disabled: false
					},
					{
						name: '造谣、伪科学',
						disabled: false
					},
					{
						name: '虚假互动数据',
						disabled: false
					},
					{
						name: '色情低速',
						disabled: false
					},
					{
						name: '违法违规',
						disabled: false
					},
					{
						name: '侵权投诉',
						disabled: false
					},
					{
						name: '青少年不宜',
						disabled: false
					},
					{
						name: '其他',
						disabled: false
					},
				],
				form: {
					description: '',
					media: ''
				},
			}
		},
		methods: {
			submit(e) {
				if (this.form.type == 0) {
					let mediaList = [];
					e.forEach(function(item, index) {
						mediaList.push(item.response.result.url)
					})
					this.form.media = mediaList;
				}

				// this.$H.post("post/addPost", this.form).then(res => {
				// 	if (res.code == 200) {
				// 		uni.redirectTo({
				// 			url: "/pages/post-detail/post-detail?id=" + res.result.id
				// 		})
				// 	}
				// 	this.btnDisabled = false;
				// 	this.btnLoading = false;
				// })
			}
		},
	}
</script>

<style scoped>
	.container {
		padding: 20rpx;
		background-color: #FFFFFF;
	}
</style>
