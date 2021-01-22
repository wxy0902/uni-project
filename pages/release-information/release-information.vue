<template>
	<view class="container">
		<view class="f-wrap">
			<u-form :model="form" ref="uForm">
				<u-form-item label="类别">
					<u-input input-align="right" v-model="cateName" @click="show = true" placeholder="请选择类别" type="select" />
				</u-form-item>
				<u-form-item label="描述" label-position="top">
					<u-input type="textarea" v-model="form.description" placeholder="请填写详细描述" />
				</u-form-item>
				<!-- <u-form-item label="圈子封面" label-position="top" v-if="form.type == 0">
					<u-upload ref="uUpload" name="Image" :max-count="9" :header="header" :action="uploadImgUrl" @on-uploaded="submit"
					 :auto-upload="false"></u-upload>
				</u-form-item>
				<u-form-item label="圈子背景" label-position="top" v-if="form.type == 1">
					<block v-if="form.media.length > 0">
						<video class="upload-video" :src="form.media[0]"></video>
					</block>
					<block v-else>
						<view @click="chooseVideo" class="upload-wrap">
							<u-icon name="plus"></u-icon>
						</view>
					</block>
				</u-form-item> -->
				<upload :form="form"></upload>
			</u-form>
		</view>
		<!-- 分类选择器 -->
		<u-select v-model="show" value-name='cate_id' label-name='cate_name' mode="single-column" :list="cateList" @confirm="confirm"></u-select>
		<!-- 提交按钮 -->
		<view style="height: 120rpx;"></view>
		<view class="f-fixed">
			<u-button @click="submit" type="error" shape="circle">提交</u-button>
		</view>
	</view>
</template>

<script>
	import upload from '../../components/upload/upload.vue'
	export default {
		data() {
			return {
				show: false,
				cateList: [
					{
											value: '1',
											label: '宠物'
										},
										{
											value: '2',
											label: '租房'
										}
				],
				cateName: '',
				header: {
					// token: uni.getStorageSync("token")
				},
				form: {
					type: 0,
					cate_id: "",
					topic_name: "",
					description: "",
					cover_image: "",
					bg_image: ""
				}
			};
		},
		components: {
			upload
		},
		onLoad(options) {
			// this.getCate();
			this.form.type = options.type;
		},
		methods: {
			onUploaded1(e) {
				this.form.cover_image = e[0].response.result.url;
			},
			onUploaded2(e) {
				this.form.bg_image = e[0].response.result.url;
			},
			submit() {

				this.$H.post('topic/topicAdd', this.form).then(res => {
					if (res.code == 200) {
						this.$u.toast('成功创建圈子');
						uni.redirectTo({
							url: '/pages/topic-detail/topic-detail?id=' + res.result.id
						})
					}
				})
			},
			getCate() {
				this.$H.post('topic/classList').then(res => {
					this.cateList = res.result;
				})
			},
			confirm(e) {
				this.form.cate_id = e[0].value;
				this.cateName = e[0].label;
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
</style>
