<template>
	<view class="index">
		<!-- #ifdef MP-WEIXIN -->
		<button
			open-type="getUserInfo"
			v-if="showlogin || !token"
			id="showlogin"
			type="warn"
			@getuserinfo="login"
		>
			使用微信登录
		</button>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<navigator url="../../platforms/app-plus/login/login">
			<button v-if="!token" id="showlogin" type="warn">请先登录</button>
		</navigator>
		<!-- #endif -->
		<block v-if="token">
			<view class="textcontent">
				<textarea placeholder="输入文字内容..." v-model="text" class="feedback-textare" />
			</view>
			<view class="uni-uploader">
				<view class="uni-uploader-body">
					<view class="uni-uploader__files" v-show="image">
						<view class="uni-uploader__file">
							<view class="iconfont icon-close" @click="close('image')"></view>
							<image class="uni-uploader__img" :src="image" :data-src="image"></image>
						</view>
					</view>
					<view class="uni-uploader__input-box">
						<view class="uni-uploader__input" @tap="chooseImage"></view>
						<view class="image-plus-text">只可添加一张图片</view>
					</view>
				</view>
			</view>
			<view class="uni-uploader">
				<view class="uni-uploader-body">
					<view class="uni-uploader__files" v-show="video">
						<view class="uni-uploader__file">
							<view class="iconfont icon-close" @click="close('video')"></view>
							<video :src="video" class="uni-uploader__video"></video>
						</view>
					</view>
					<view class="uni-uploader__input-box">
						<view class="uni-uploader__input" @tap="chooseVideo"></view>
						<view class="image-plus-text">只可添加一部视频</view>
					</view>
				</view>
			</view>
			<button type="warn" class="feedback-submit" @click="send">立即投稿</button>
		</block>
	</view>
</template>
<script>
/* *
 * 投稿页面
 */
import { mapState, mapMutations, mapActions } from 'vuex';
import util, { parGetData, parSetData, checklogin } from '../../common/util';
export default {
	data() {
		return {
			text: '',
			image: '',
			imageurl: '',
			video: '',
			openid: '',
			userinfo: '',
			token: '',
			showlogin: false
		};
	},
	onShow() {
		this.checkstat();
		if (!this.token) {
			this.gologinpage()
			this.showlogin = true;
		}
	},
	onLoad() {
		this.checkstat();
		if (!this.token) {
			this.gologinpage()
			this.showlogin = true;
		}
	},
	methods: {
		gologinpage(){
			// #ifdef APP-PLUS
			uni.navigateTo({
				url: '/platforms/app-plus/login/login'
			});
			// #endif
			// #ifdef MP-WEIXIN
			uni.navigateTo({
				url: '/platforms/mp-weixin/login/login'
			});
			// #endif
		},
		checkstat() {
			var logininfo = util.checklogin();
			this.openid = logininfo.openid;
			this.userinfo = logininfo.userinfo;
			this.token = logininfo.token;
		},
		close: function(type) {
			this[type] = '';
		},
		chooseImage: function() {
			var self = this;
			if (self.image) {
				uni.showToast({
					title: '只可上传一张图片,将自动替换为新选择的',
					icon: 'none'
				});
			}
			uni.chooseImage({
				count: 1,
				sizeType: 'compressed ',
				success: res => {
					self.image = res.tempFilePaths[0];
					uni.uploadFile({
						url: util.apiurl + 'syj/index/upimg',
						filePath: res.tempFilePaths[0],
						name: 'image',
						header: {
							auth: util.httpauth
						},
						success: res => {
							res.data = JSON.parse(res.data);
							if (res.statusCode == 200 && res.data.code < 1) {
								self.imageurl = res.data.imageurl;
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								});
								self.image = self.imageurl = '';
							}
						}
					});
				}
			});
		},
		send: function(e) {
			if (!this.token) {
				this.showlogin = true;
				return false;
			}
			if (!this.text && !this.image && !this.video) {
				uni.showToast({
					title: '文字、图片、视频三者至少填写一个',
					icon: 'none'
				});
				return false;
			}
			uni.showLoading({
				title: '发布中请稍等...'
			});
			var self = this;
			if (self.video) {
				uni.uploadFile({
					url: util.apiurl + 'syj/index/tougao',
					filePath: self.video,
					name: 'video',
					formData: {
						text: self.text,
						image: self.imageurl
					},
					header: {
						auth: util.httpauth
					},
					success: res => {
						if ('string' === typeof res.data) {
							res.data = JSON.parse(res.data);
						}
						if (res.statusCode == 200 && res.data.code < 1) {
							uni.showToast({
								title: res.data.msg
							});
							setTimeout(function() {
								uni.hideLoading();
							}, 1000);
							self.text = self.image = self.video = '';
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							setTimeout(function() {
								uni.hideLoading();
							}, 1000);
						}
					},
					fail: function() {
						uni.hideLoading();
					}
				});
			} else {
				uni.request({
					url: util.apiurl + 'syj/index/tougao',
					method: 'POST',
					data: {
						text: self.text,
						image: self.imageurl,
						token: self.token,
						shebei: util.shebei
					},
					success: ret => {
						if (ret.statusCode == 200 && ret.data.code < 1) {
							self.text = self.image = self.video = '';
							uni.showToast({
								title: ret.data.msg
							});
							setTimeout(function() {
								uni.hideLoading();
							}, 1000);
						} else {
							uni.showToast({
								title: ret.data.msg,
								icon: 'none'
							});
							setTimeout(function() {
								uni.hideLoading();
							}, 1000);
						}
					},
					fail: function() {
						uni.hideLoading();
					},
					header: {
						auth: util.httpauth
					}
				});
			}
		},
		chooseVideo: function() {
			var self = this;
			uni.chooseVideo({
				sourceType: ['album', 'camera'],
				success: res => {
					self.video = res.tempFilePath;
				}
			});
		},
		/* 登录方法 */
		login(res) {
			util.logincomm(res, this);
		}
	}
};
</script>

<style>
.index {
	background: #f9f9f9;
	overflow-x: hidden;
}
.index .textcontent {
	display: block;
	background: #fff;
	margin: 15rpx 0;
	font-size: 30rpx;
	padding: 0;
	width: 100%;
}
.index .textcontent textarea {
	display: block;
	height: 150rpx;
	margin: 10rpx;
}

#showlogin {
	position: fixed;
	width: 40%;
	left: 50%;
	margin-left: -20%;
	z-index: 999;
	top: 200rpx;
}

/* 上传 */

.uni-uploader {
	flex-direction: column;
	width: 100%;
	padding: 0;
	background: #fff;
	margin: 15rpx auto;
}

.image-plus-text {
	font-size: 20rpx;
	color: #777;
	margin: 0 auto;
}

.uni-uploader-body {
	margin-top: 0;
	overflow: hidden;
}

.uni-uploader__file {
	float: left;
	margin: auto 15rpx;
	padding-right: 15rpx;
	padding-top: 0;
	position: relative;
}
.uni-uploader__file .iconfont {
	position: absolute;
	right: -3rpx;
	top: -10rpx;
	font-size: 20rpx;
	width: 30rpx;
	height: 30rpx;
	border-radius: 50%;
	background: rgba(0, 0, 0, 0.5);
	color: #fff;
	text-align: center;
	line-height: 30rpx;
	justify-content: center;
}

.uni-uploader__img {
	display: block;
	width: 158rpx;
	height: 158rpx;
}

.uni-uploader__video {
	display: block;
	width: 158rpx;
	height: 158rpx;
}

.uni-uploader__input-box {
	float: left;
	position: relative;
	margin-top: 8rpx;
	margin-right: 18rpx;
	margin-bottom: 18rpx;
	margin-left: 8rpx;
	width: 200rpx;
	height: 200rpx;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	border-color: #f1f1f1;
}

.uni-uploader__input-box:before,
.uni-uploader__input-box:after {
	content: ' ';
	position: absolute;
	top: 45%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #eee;
}

.uni-uploader__input-box:before {
	width: 4rpx;
	height: 79rpx;
}

.uni-uploader__input-box:after {
	width: 79rpx;
	height: 4rpx;
}

.uni-uploader__input {
	position: absolute;
	z-index: 1;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
}
</style>
