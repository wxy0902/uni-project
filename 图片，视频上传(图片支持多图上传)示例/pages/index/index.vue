<template>
	<easy-upload
	:dataList="imageList" uploadUrl="http://localhost:3000/upload" :types="category"
	deleteUrl='http://localhost:3000/upload' :uploadCount="6"
	@successImage="successImage" @successVideo="successvideo"
	></easy-upload>
</template>

<script>
	export default {
		data() {
			return {
				imageList: [],
				category: 'video'
			}
		},
		onLoad() {
			uni.request({
				url: 'http://10.20.30.78:3000/upload',
				method: 'GET',
				data: {
					category: this.category
				},
				success: res => {
					this.imageList = res.data
				},
				fail(err) {
					console.log(err)
				}
			});
		},
		methods: {
			successImage(e){
				uni.showModal({
					content : '上传成功,详细信息请看控制台'
				})
				console.log(e)
			},
			successvideo(e){
				console.log(e)
			}
		}
	}
</script>

<style>
	
</style>
