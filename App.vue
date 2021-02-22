<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	@import "static/css/iconfont.css";
	/*每个页面公共css */
	@import "/style/common.css";
	@import "/style/relation.css";

	/* 页面底色 */
	page {
		background: #F8F8F8;
	}

	.container {
		padding: 20rpx;
		background-color: #FFFFFF;
	}

	.title {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50rpx;
		padding: 20rpx 0;
		font-size: 35rpx;
		font-weight: 500;
		color: #333;
		background: #FFFFFF;
	}
</style>
