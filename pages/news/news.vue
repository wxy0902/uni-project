<template>
	<view>
		<view class="msg-wrap">
			<view class="title">
				<view class="left">私信</view>
			</view>
			<!-- 图文消息 -->
			<block v-if="msgList.article_msg_list.length > 0">
				<navigator @longpress="onPressArticle(item.m_id,index)" :url="'/pages/article-detail/article-detail?id='+item.post_id+'&time='+item.create_time"
				 class="msg-item" v-for="(item,index) in msgList.article_msg_list" :key="index">
					<view class="avatar-box">
						<u-badge v-if="item.status == 0" :is-dot="true" :offset="[5,10]" type="error"></u-badge>
						<u-avatar class="avatar" :src="item.user_info.avatar"></u-avatar>
					</view>
					<view class="right">
						<view>
							<text style="margin-right: 10rpx;">{{item.user_info.username}}</text>
							<u-tag bg-color="#8687fd" text="官方" type="error" size="mini" mode="dark" />
						</view>
						<view class="desc">
							<text>{{item.article_title}}</text>
							<text class="time">{{item.create_time}}</text>
						</view>
					</view>
				</navigator>
			</block>
			<block v-if="msgList.chat_msg_list.length > 0">
				<navigator @longpress="onPressArticle(item.m_id,index)" url='/pages/chat/chat' class="msg-item" v-for="(item,index) in msgList.chat_msg_list"
				 :key="index">
					<view class="avatar-box">
						<u-badge :count="item.count" :offset="[5,10]" type="error"></u-badge>
						<u-avatar class="avatar" :src="item.user_info.avatar"></u-avatar>
					</view>
					<view class="right">
						<view>
							<text style="margin-right: 10rpx;">{{item.user_info.username}}</text>
						</view>
						<view class="desc">
							<text>{{item.msg.content}}</text>
							<text class="time">{{item.create_time}}</text>
						</view>
					</view>
				</navigator>
			</block>
			<block v-if="msgList.chat_msg_list.length == 0 && msgList.article_msg_list.length == 0">
				<view class="msg-empty">
					<image class="img" mode="widthFix" src="/static/empty.png"></image>
					<text class="txt">暂无新消息</text>
				</view>
			</block>
		</view>
		<!-- 删除弹窗 -->
		<u-action-sheet :list="sheetList" v-model="showSheet" @click="onSheetItem"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showSheet: false,
				sheetList: [{
					text: '删除',
					color: 'red'
				}],
				msgList: {
					article_msg_list: [{
							m_id: 1,
							status: 0,
							user_info: {
								username: 'haha',
								avatar: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg'
							},
							msg: {
								content: '这是文章信息'
							},
							create_time: '1天前'
						},
						{
							m_id: 1,
							status: 0,
							user_info: {
								username: 'haha',
								avatar: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg'
							},
							msg: {
								content: '这是文章信息'
							},
							create_time: '1天前'
						},
					],
					chat_msg_list: [{
							m_id: 1,
							user_info: {
								username: '小明',
								avatar: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg'
							},
							msg: {
								content: '这是文章信息'
							},
							create_time: '1天前',
							count: 9
						},
						{
							m_id: 1,
							user_info: {
								username: '小红',
								avatar: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg'
							},
							msg: {
								content: '这是文章信息'
							},
							create_time: '1天前',
							count: 100
						},
					]
				},
				checkedMsgId: "",
				checkedIndex: ""
			};
		},
		onShow() {
			this.getMsgList();
		},
		methods: {
			onPressArticle(id, index) {
				this.showSheet = true;
				this.checkedMsgId = id;
				this.checkedIndex = index;
			},
			onSheetItem(index) {
				if (index == 0) {
					// this.$H.post("message/delMsg", {
					// 	id: this.checkedMsgId
					// }).then(res => {
					// 	if (res.code == 200) {
					// 		this.msgList.article_msg_list.splice(this.checkedIndex, 1)
					// 	}
					// })
				}
			},
			getMsgList() {
				// this.$H.post("message/num").then(res => {

				// 	this.msgList = res.result;

				// 	let num = res.result;
				// 	if (num.all_count > 0) {
				// 		uni.setTabBarBadge({
				// 			index: 2,
				// 			text: num.all_count.toString()
				// 		})
				// 	} else {
				// 		uni.removeTabBarBadge({
				// 			index: 2
				// 		})
				// 	}
				// })
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import 'news.scss';
</style>
