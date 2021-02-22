<template>
	<view>
		<!-- 顶部自定义导航 -->
		<u-navbar :is-back="false" :border-bottom="false">
			<view class="tab-box">
				<!-- <u-tabs name="tab_name" bg-color="#fff" :list="tabs" active-color="#616161" :is-scroll="false" c :current="current"
				 @change="tabChange"></u-tabs> -->
				<u-tabs-swiper name="tab_name" ref="uTabs" bg-color="#fff" :list="tabs" active-color="#616161" :current="current"
				 @change="tabsChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
		</u-navbar>
		<!-- swiper tabs content -->
		<swiper class="swiper-body" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<!-- 关注 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y class="body-scroll-view" @scrolltolower="onreachBottom">
					<post-list :list="tabs[current].postList" :loadStatus="loadStatus"></post-list>
				</scroll-view>
			</swiper-item>
			<!-- 推荐 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y class="body-scroll-view" @scrolltolower="onreachBottom">
					<post-list :list="tabs[current].postList" :loadStatus="loadStatus"></post-list>
				</scroll-view>
			</swiper-item>
			<!-- 同城 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y class="body-scroll-view" @scrolltolower="onreachBottom">
					<view v-if="showOpenLocation" style="margin:100rpx 30rpx 30rpx 30rpx;">
						<u-button type="success" shape="circle" @click="getLocation">开启定位</u-button>
					</view>
					<view v-else class="post-waterfall">
						<post-waterfall ref="waterfall" :list="tabs[2].postList" :loadStatus="loadStatus"></post-waterfall>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
	import postList from '../../components/post-list/post-list.vue';
	import postWaterfall from '../../components/post-waterfall/post-waterfall.vue';
	export default {
		components: {
			postList,
			postWaterfall
		},
		data() {
			return {
				tabs: [{
						tab_name: '关注',
						postList: []
					}, {
						tab_name: '推荐',
						postList: []
					},
					{
						tab_name: uni.getStorageSync("district") || '同城',
						postList: []
					}
				],
				current: 1,
				swiperCurrent: 1,
				videoCurrent: 0,
				loadStatus: "loadmore",
				storageTopicList: [],
				page: 1,
				pageNear: 1,
				pageFllow: 1,
				shareCover: "",
				showOpenLocation: false
			}
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: this.$c.miniappName,
				path: '/pages/index/index',
				imageUrl: this.shareCover
			}
		},
		onLoad() {
			this.getPostList();
			this.storageTopicList = uni.getStorageSync("topicList");

			if (!uni.getStorageSync("location_info")) {
				this.showOpenLocation = true;
			}
			this.getSysInfo();
		},
		onPullDownRefresh() {
			this.page1 = 1;
			this.page2 = 1;
			this.page3 = 1;
			
			this.tabs.postList = [];
			this.getPostList();
			uni.stopPullDownRefresh();
			
			this.$refs.waterfall.clear();
			this.nearbyPostList = [];
			this.getNearbyPost();
		},
		watch: {
			showOpenLocation() {
				this.getNearbyPost();
			}
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;

				this.changeGetData(current)
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				if (this.current === 0) {
					this.pageFllow++
					this.getFollowPost();
				}
				if (this.current === 1) {
					this.page++
					this.getPostList();
				}
				if (this.current === 2) {
					this.pageNear++
					this.getNearbyPost();
				}
			},
			getNearbyPost() {
				this.loadStatus = "loading";
				if (!this.showOpenLocation) {
					let location = uni.getStorageSync("location_info");
					this.$H.get("post/nearbyPost", {
						lat: location.latitude,
						lng: location.longitude,
						page: this.pageNear
					}).then(res => {
						this.tabs[2].postList = this.tabs[2].postList.concat(res.result.data);
						if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
							this.loadStatus = "nomore";
						} else {
							this.loadStatus = "loadmore"
						}
					})
				}
			},
			getLocation() {
				let that = this;
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						var qqmapsdk = new QQMapWX({
							key: 'BMYBZ-GV464-JESUX-DZL53-Z6LNH-U6BIA' // 必填
						});

						qqmapsdk.reverseGeocoder({
							location: res,
							success: function(res2) {
								that.tabs[2].tab_name = res2.result.ad_info.district;
								uni.setStorageSync("district", res2.result.ad_info.district);
							},
							fail: function(error) {
								// console.error(error);
							},
							complete: function(res) {
								// console.log(res);
							}
						})

						uni.setStorageSync("location_info", res);
						that.showOpenLocation = false;
					}
				});
			},
			getSysInfo() {
				this.$H.get("system/miniConfig").then(res => {
					this.shareCover = res.result.intro;
				})
			},
			changeGetData(index) {
				if (this.tabs[index].postList.length == 0) {
					if (index == 0) {
						this.getFollowPost();
					} else if (index === 2) {
						this.getNearbyPost();
					} else {
						this.getPostList();
					}
				}
			},

			// 获取帖子列表
			getPostList() {
				this.loadStatus = "loading";

				let type = 1;
				let page = this.page;

				this.$H.get('post/list', {
					type: type,
					page: page
				}).then(res => {
					this.tabs[this.current].postList = this.tabs[this.current].postList.concat(res.result.data);
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus = "nomore";
					} else {
						this.loadStatus = "loadmore"
					}
				});
			},
			// 获取用户关注帖子
			getFollowPost() {
				this.loadStatus = "loading";
				this.$H.post('post/followUserPost', {
					page: this.pageFllow
				}).then(res => {
					this.tabs[this.current].postList = this.tabs[this.current].postList.concat(res.result.data);
					if (res.result.current_page === res.result.last_page || res.result.last_page === 0) {
						this.loadStatus = "nomore";
					} else {
						this.loadStatus = "loadmore"
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "index.scss";
</style>
