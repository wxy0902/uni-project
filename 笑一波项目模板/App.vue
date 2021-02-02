<script>
import util from './common/util.js';
export default {
	onLaunch: function() {
		//#ifdef APP-PLUS
		/* 5+环境锁定屏幕方向 */
		plus.screen.lockOrientation('portrait-primary'); //锁定
		/* 5+环境升级提示 */
		uni.getProvider({
			service: 'push',
			success: function(res) {
				// 个推的名称为 igexin
				if (~res.provider.indexOf('igexin')) {
					uni.subscribePush({
						provider: 'igexin',
						success: function(res) {}
					});
				}
			}
		});
		uni.onPush({
			provider: 'igexin',
			callback: function(data) {
				var title = '';
				var jsondata = JSON.parse(data.data);
				for (var a in jsondata) {
					title += a + '=' + jsondata[a];
				}
				uni.showModal({
					title: '提示',
					content: title,
					success: function(res) {
						if (res.confirm) {
						} else if (res.cancel) {
						}
					}
				});
			}
		});
		//#endif
	}
};
</script>
<style>
@import './common/common.css';
@import './common/icon.css';
page,
view {
	display: flex;
}
page {
	min-height: 100%;
	background-color: #f1f1f1;
}
.index .card {
	margin: 8rpx auto;
	padding-bottom: 10rpx;
	padding-top: 10rpx;
}
.index .card image,
.index .card video {
	display: block;
	max-width: 96%;
	margin: 8rpx auto;
}
.index .card video {
	width: 100%;
}
.index .card .car-title-view {
	font-size: 32rpx;
	padding: 20rpx 25rpx;
	display: block;
}
#mask {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 99;
	background: rgba(0, 0, 0, 0.5);
	overflow: hidden;
}
#showlogin {
	position: fixed;
	width: 50%;
	left: 50%;
	margin-left: -25%;
	top: 30%;
	z-index: 9999;
}
.iconbottom {
	align-items: center;
	text-align: center;
	justify-content: center;
	margin: 25rpx auto 15rpx;
}
.iconbottom .iconfont {
	display: inline-block;
	margin: auto 50rpx;
	font-size: 30rpx;
}
.iconbottom .iconfont.active {
	color: #f44336;
}
.iconbottom .iconfont text {
	padding: 0 10rpx;
	color: #777777;
	font-size: 20rpx;

}
</style>
