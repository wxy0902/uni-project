<template>
	<view class="wrap">
		<u-waterfall v-model="list" ref="uWaterfall">
			<template v-slot:left="{leftList}">
				<view @click="jump(item)" class="demo-warter"  v-for="(item, index) in leftList" :key="index">
					<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
					<block v-if="item.type == 1">
						<u-lazy-load threshold="-450" border-radius="10 10 0 0" :image="item.image" :index="index"></u-lazy-load>
					</block>
					<block v-else>
						<video class="post-video" :controls="false" :show-center-play-btn="false" :src="item.media[0]"></video>
						<view class="video-tag">
							<u-icon color="#fff" size="40" name="play-right-fill"></u-icon>
						</view>
					</block>
					<view class="footer-wrap">
						<view class="p-title">{{item.content}}</view>
						<view class="p-user">
							<u-avatar size="35" :src="item.userInfo.avatar"></u-avatar>
							<text class="username">{{item.userInfo.username}}</text>
							<!-- <view class="distance">
								<u-icon name="thumb-up"></u-icon>
								<text>{{item.distance}}km</text>
							</view> -->
							<!-- <block> -->
								<view class="thumb" @click="addThumb" type="default">
									<!-- <text class="iconfont icon-dianzan1"></text> -->
									<u-icon name="thumb-up" size='32'></u-icon>
									<!-- <u-icon name="thumb-up" size='32' color='red'></u-icon> -->
									<text>{{item.thumb}}</text>
								</view>
							<!-- </block> -->
						</view>
					</view>
				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view @click="jump(item)" class="demo-warter" v-for="(item, index) in rightList" :key="index">
					<block v-if="item.type == 1">
						<u-lazy-load threshold="-450" border-radius="10 10 0 0" :image="item.image" :index="index"></u-lazy-load>
					</block>
					<block v-else>
						<video class="post-video" :controls="false" :show-center-play-btn="false" :src="item.media[0]"></video>
						<view class="video-tag">
							<u-icon color="#fff" size="40" name="play-right-fill"></u-icon>
						</view>
					</block>
					<view class="footer-wrap">
						<view class="p-title">{{item.content}}</view>
						<view class="p-user">
							<u-avatar size="35" :src="item.userInfo.avatar"></u-avatar>
							<text class="username">{{item.userInfo.username}}</text>
							<view class="thumb">
								<u-icon name="thumb-up" size='32'></u-icon>
								<text>{{item.thumb}}</text>
							</view>
						</view>
					</view>
				</view>
			</template>
		</u-waterfall>
		<u-loadmore v-if="loadStatus != 'none'" :status="loadStatus"></u-loadmore>
	</view>
</template>

<script>
	export default {
		props: {
			// list: Array,
			// loadStatus: {
			// 	type: String,
			// 	default: 'loadmore'
			// }
		},
		data() {
			return {
				list:[
					{
						type:1,
						image:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
						content:'真的是太帅了,啦啦啦啦啦啦啦啦啦啦啦啦6666666！',
						userInfo:{
							avator:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
							username: 'haha',
						},
						thumb:'2'
					},
					{
						type:1,
						image:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
						content:'真的是太帅了！',
						userInfo:{
							avator:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
							username: 'haha',
						},
						thumb:'2'
					},
					{
						type:1,
						image:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
						content:'真的是太帅了！',
						userInfo:{
							avator:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
							username: 'haha',
						},
						thumb:'2'
					},
					{
						type:1,
						image:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
						content:'真的是太帅了！',
						userInfo:{
							avator:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
							username: 'haha',
						},
						thumb:'2'
					},
					{
						type:1,
						image:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
						content:'真的是太帅了！',
						userInfo:{
							avator:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
							username: 'haha',
						},
						thumb:'2'
					},
					{
						type:1,
						image:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
						content:'真的是太帅了！',
						userInfo:{
							avator:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
							username: 'haha',
						},
						thumb:'2'
					},
					{
						type:1,
						image:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
						content:'真的是太帅了！',
						userInfo:{
							avator:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
							username: 'haha',
						},
						thumb:'2'
					},
				]
			}
		},
		methods: {
			jump(item) {
				// if (item.type == 1) {
					uni.navigateTo({
						url: "/pages/find-detail/find-detail"
					})
				// } else {
				// 	uni.navigateTo({
				// 		url: "/pages/video-detail/video-detail?id=" + item.id
				// 	})
				// }
			},
			clear() {
				this.$refs.uWaterfall.clear();
			}
		}
	}
</script>
<style>
	/* page不能写带scope的style标签中，否则无效 */
	page {
		background-color: rgb(240, 240, 240);
	}
</style>

<style scoped>
	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		position: relative;
		overflow: hidden;
	}

	.video-tag {
		position: absolute;
		left: 35%;
		top: 30%;
		background-color: rgba(0, 0, 0, 0.4);
		padding: 20rpx;
		border-radius: 50%;
		width: 100rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}

	.footer-wrap {
		padding: 20rpx;
		color: #616161;
	}

	.footer-wrap .p-title {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.footer-wrap .p-user {
		display: flex;
		align-items: center;
		line-height: 20rpx;
		font-size: 28rpx;
		margin-top: 20rpx;
	}

	.footer-wrap .p-user .username {
		font-size: 20rpx;
		margin-left: 10rpx;
	}

	.footer-wrap .p-user .thumb {
		display: flex;
		align-items: center;
		margin-left: auto;
		border: 1px solid #F5F5F5;
		padding: 5rpx 10rpx;
		border-radius: 20rpx;
	}
	
	.footer-wrap .p-user .thumb text{
		margin: 0 0 2rpx 10rpx;
	}

	.post-video {
		width: 100%;
	}
</style>
