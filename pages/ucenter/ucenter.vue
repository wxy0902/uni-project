<template>
	<view class="con-c">
       <view class="user-info">
       	<u-avatar class="avatar" :src="userInfo.avatar"></u-avatar>
       	<view class="user-c">
       		<view class="username">{{userInfo.username}}</view>
       		<view class="num-box">
       			<text>{{userInfo.follow}} <text class="txt">关注</text></text>
       			<text>{{userInfo.fans}} <text class="txt">粉丝</text></text>
       		</view>
       		<text class="desc">{{userInfo.intro}}</text>
       		<view class="btn-box">
       			<u-button v-show="!userInfo.is_follow" @click="follow" class="btn" shape="circle" type="error" size="mini">
       				<u-icon name="plus"></u-icon>
       				<text>关注</text>
       			</u-button>
       			<u-button v-show="userInfo.is_follow" @click="cancelFollow" class="btn" shape="circle" size="mini">
       				<text>已关注</text>
       			</u-button>
       			<u-button @click="toChat" shape="circle" size="mini">
       				<text style="margin: 0 15rpx;">私信</text>
       			</u-button>
       		</view>
       	</view>
       </view>
	   <view class="tab-box">
	   	<u-tabs bg-color="#f5f5f5" inactive-color="#999" name="tab_name" :list="tabs" active-color="#616161" :is-scroll="false"
	   	  :current="current" @change="tabChange"></u-tabs>
	   </view>
	   <scroll-view scroll-y="true">
	    <post-waterfall v-if="current==0"></post-waterfall>
	   <find-list v-if="current==1"></find-list>
	   </scroll-view>
	</view>
</template>

<script>
	import findList from '../../components/find-list/find-list.vue'
	import postWaterfall from '../../components/post-waterfall/post-waterfall.vue'
	export default {
		data() {
			return {
				userInfo: {
					avatar:'https://oss.ymeoo.cn/20201128160653247734811.jpg',
					username:'haha',
					fans: 2,
					follow: 1,
					intro: 'haha，我就是我',
					is_follow: 2
				},
				tabs: [{
						tab_name: '咨询'
					}, {
						tab_name: '有圈'
					}
				],
				current: 0,
			}
		},
		components: {
			findList,
			postWaterfall
		},
		methods: {
			tabChange(index) {
				this.current = index;
			},
			toChat() {
				// console.log("url",url)
				uni.navigateTo({
					url: '/pages/chat/chat'
				})
			}
		},
	}
</script>

<style>
	page {
		background-color: #f5f5f5;
	}
</style>
<style scoped>
	@import 'ucenter.css';
</style>