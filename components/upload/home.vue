<template>
	<view>
	<view class="search-classify">
		<!-- <u-search placeholder="搜索" v-model="keyword" @search="search" :show-action="false"></u-search> -->
		<u-search placeholder="搜索" :show-action="false" disabled @click="toSearch"></u-search>
		<!-- 导航条 -->
		<scroll-view class="scroll-bar-find" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto" 
		  :scroll-with-animation="true">
		  <view v-for="tab in tabBars" :key="tab.id" class="scroll-bar-finditem" :class="{'scroll-bar-finditemsh':current == tab.current}"
		    :id="tab.id" :data-current="tab.current" @click="fnBarClick(tab)">
		    {{tab.name}}
		  </view>
		</scroll-view>
	</view>
	
	
	<view class="post-waterfall">
		<post-waterfall ref="waterfall" :list="postList" :loadStatus="loadStatus"></post-waterfall>
	</view>
	
	</view>
</template>

<script>
	import postWaterfall from '../../components/post-waterfall/post-waterfall.vue'
	import {debounce} from '../../utils/utils.js'
	export default {
		data() {
			return {
				// keyword: "",
				// 导航项滑动初始id
				scrollInto: "recommend",
				// 导航项列表
				tabBars: [{
				  id: "recommend",
				  name: '推荐',
				  current: 0
				}, {
				  id: "album",
				  name: '摄影',
				  current: 1
				}, {
				  id: "video",
				  name: '视频',
				  current: 2
				}, {
				  id: "topic",
				  name: '话题',
				  current: 3
				}, {
				  id: "word",
				  name: '文章',
				  current: 4
				}, {
				  id: "org",
				  name: '活动',
				  current: 5
				}],
				// 刷新间隔
				timeOutFind: 0,
				// 双击刷新
				clickRefresh: false,
				loadStatus: "loadmore",
				postList:[
					{
						type:1,
						image:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
						content:'真的是太帅了！',
						userInfo:{
							avator:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
							username: 'haha',
						},
						distance:'2'
					},
					{
						type:1,
						image:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
						content:'真的是太帅了！',
						userInfo:{
							avator:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
							username: 'haha',
						},
						distance:'2'
					},
					{
						type:1,
						image:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
						content:'真的是太帅了！',
						userInfo:{
							avator:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
							username: 'haha',
						},
						distance:'2'
					},
					{
						type:1,
						image:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
						content:'真的是太帅了！',
						userInfo:{
							avator:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
							username: 'haha',
						},
						distance:'2'
					},
					{
						type:1,
						image:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
						content:'真的是太帅了！',
						userInfo:{
							avator:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
							username: 'haha',
						},
						distance:'2'
					},
					{
						type:1,
						image:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
						content:'真的是太帅了！',
						userInfo:{
							avator:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
							username: 'haha',
						},
						distance:'2'
					},
					{
						type:1,
						image:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
						content:'真的是太帅了！',
						userInfo:{
							avator:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
							username: 'haha',
						},
						distance:'2'
					},
				]
			}
		},
		components: {
			postWaterfall
		},
		methods:{
			toSearch() {
				uni.navigateTo({
					url:'/pages/search/search'
				})
			},
			// toJSON(){
				
			// },
			search() {
				// uni.navigateTo({
				// 	url: "/pages/topic-list/topic-list?keyword=" + this.keyword
				// })
			},
			/// 顶部导航选项点击
			fnBarClick(e) {
			  // console.log(e);
			  let current = e.hasOwnProperty("detail") ? e.detail.current : e.current;
			  this.scrollInto = this.tabBars[current].id;
			  // 是否当前项点击
			  if (e.hasOwnProperty("id") && this.current == current) {
			    this.timeOutFind += 1;
			    // 是否为刷新值和连续触发
			    if (!this.clickRefresh && this.timeOutFind >= 2) {
			      // 刷新值开
			      this.clickRefresh = true;
			      // 获取新数据
				  
			      // this.fnRefreshData();
			      // 定时器重置
			      this.timeOutFind = setTimeout(() => {
			        // 清除定时器
			        clearTimeout(this.timeOutFind)
			        // 连续触发记录重置
			        this.timeOutFind = 0;
			        // 刷新值关
			        this.clickRefresh = false;
			      }, 5000);
			    }
			    return;
			  } else {
			    // 改变顶部导航选中 
			    this.current = current;
			    // 首次选中激活顶部导航关联页状态 
			    // if (!this.status.album && current == 1) this.status.album = true;
			    // if (!this.status.video && current == 2) this.status.video = true;
			    // if (!this.status.topic && current == 3) this.status.topic = true;
			    // if (!this.status.word && current == 4) this.status.word = true;
			    // if (!this.status.org && current == 5) this.status.org = true;
			    // 清除定时器
			    clearTimeout(this.timeOutFind)
			    // 连续触发记录重置
			    this.timeOutFind = 0;
			    // 刷新值关
			    this.clickRefresh = false;
			  }
			},
			
			
		}
	}
</script>

<style>
	.search-classify{
		/* padding: 20rpx; */
		/* position: fixed; */
		/* top: 0; */
		/* width: 100%; */
		/* padding: 20rpx; */
		/* display: flex; */
		background-color: #FFFFFF;
	}
	/* 滑动scroll导航条 */
	.scroll-bar-find {
	  display: flex;
	  flex-direction: row;
	  white-space: nowrap;
	  flex-wrap: nowrap;
	  overflow: hidden;
	  /* background: #FF6699; */
	}
	
	/* 滑动scroll导航条项*/
	.scroll-bar-finditem {
	  display: inline-block;
	  width: 20%;
	  height: 86rpx;
	  line-height: 86rpx;
	  text-align: center;
	  font-size: 32rpx;
	  /* color: rgba(255, 255, 255, 0.6); */
	  border-bottom: 4rpx transparent solid;
	}
	
	.scroll-bar-finditemsh {
	  color: #FFFFFF;
	  border-bottom: 4rpx #FFFFFF solid;
	  font-size: 36rpx;
	  font-weight: bold;
	}
</style>
