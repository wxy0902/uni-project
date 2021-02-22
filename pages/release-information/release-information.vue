<template>
	<view class="container">
		<view class="f-wrap">
			<u-form :model="form" ref="uForm">
				<u-form-item label="分类">
					<u-input input-align="right" v-model="cateName" @click="show = true" placeholder="请选择分类" type="select" />
				</u-form-item>
				<u-form-item label="描述" label-position="top">
					<u-input type="textarea" v-model="form.description" placeholder="请填写详细描述" />
				</u-form-item>
				<u-form-item label="微信" label-position="left">
					<u-input type="text" v-model="form.weChat" placeholder="请填写微信号" />
				</u-form-item>
				<u-form-item label="手机" label-position="left">
					<button size="mini" type="primary" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">获取手机</button>
				</u-form-item>
				<upload :form="form"></upload>
				<u-form-item label="位置" label-position="left" :border-bottom=false>
					<view @click="chooseLocation">{{form.location}}</view>
				</u-form-item>
			</u-form>
		</view>
		<!-- 分类选择器 -->
		<u-select v-model="show" mode="single-column" :list="cateList" @confirm="confirm"></u-select>
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
				cateList: [{
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
					bg_image: "",
					weChat:'',
					location: "请选择位置"
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
			// 获取手机号
			decryptPhoneNumber(phone) {
				console.log(phone)
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
			},
			chooseLocation() {
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						uni.chooseLocation({
							latitude: res.latitude,
							longitude: res.longitude,
							success: function(ress) {
								// this.$nextTick(() => {
								this.form.location = ress.name
								// })

								console.log('位置名称：' + ress.name);
								console.log('详细地址：' + ress.address);
								console.log('纬度：' + ress.latitude);
								console.log('经度：' + ress.longitude);
							}
						});
					}
				});

			}
		}
	}
</script>

<style lang="scss">
	// page{
	// 	background-color: #f5f5f5;
	// }

	.container {
		padding: 20rpx;
		background-color: #FFFFFF;
	}

	// .f-wrap {
	// 	padding: 20rpx;
	// 	border-radius: 10rpx;
	// 	box-shadow: 5rpx 5rpx 20rpx #e6e6e6;
	// 	background-color: #FFFFFF;
	// 	margin-bottom: 20rpx;
	// }

	// .f-wrap>.title {
	// 	font-weight: bold;
	// 	margin-bottom: 20rpx;
	// }
</style>
