<template>
	<view class="content-ques">
		<view class="view-content-content">
			<!-- 用户信息 -->
			<view class="view-header">
				<!-- 头像 -->
				<image :src="detailInfo.HEADIMGURL" class="image-photo"></image>
				<view class="header-txt">
					<text class="name">{{ detailInfo.NICKNAME }}</text>
					<view style="flex-direction: row; display: flex; align-items: center;">
						<text class="sub">{{ detailInfo.PLACE ? detailInfo.PLACE + '' : '' }}</text>
					</view>
				</view>
			</view>
			<!-- 详情描述 -->
			<view class="item-desc">{{ detailInfo.DETAIL_DESC + (detailInfo.LESION_RANGE ? '，' + detailInfo.LESION_RANGE + '发生' : '') }}</view>
			<!-- 图片 -->
			<view class="item-imgs">
				<image
					:src="itemImg"
					class="image-imgs"
					v-for="(itemImg, indexImg) in detailInfo.IMAG_ARR"
					:index="indexImg"
					:key="indexImg"
					mode="aspectFill"
					@click="cliclImage(detailInfo.IMAG_ARR, indexImg)"
				></image>
			</view>

			<view class="view-delete-detail">
				<text class="sub">{{ formateDate(detailInfo.CREATE_TIME) }}</text>
				<view style="flex: 1;"></view>
				<text style="padding-left: 20rpx;	color: #004261;" @click="clickDeleteDetail()" v-if="detailInfo.CANDELETE == 1">删除</text>
			</view>
			<view class="view-delete-detail">
				<view class="bottom-item">
					<view class="iconfont view bottom-item-image"></view>
					<text class="bottom-item-text">{{ detailInfo.VIEW_NUM }}</text>
				</view>
				<view class="bottom-item" style="	justify-content: center;">
					<view class="iconfont msg bottom-item-image"></view>
					<view style="align-items: flex-end">12</view>
					<!-- <text class="bottom-item-text">{{ detailInfo.COMMENT_NUM }}</text> -->
				</view>
				<view class="bottom-item" style="	justify-content: flex-end;" @click="clickPraise(detailInfo.IS_PRAISE)">
					<view class="iconfont praised bottom-item-image" style="color:#d81e07" v-if="detailInfo.IS_PRAISE == '1'"></view>
					<view class="iconfont praise bottom-item-image" v-else></view>
					<text class="bottom-item-text">{{ detailInfo.PRAISE_NUM }}</text>
				</view>
			</view>
		</view>
		<!-- <five-commentlist :commentList="commentList" @clickPraise="clickPraiseSig" @clickDelete="clickDeleteSig"></five-commentlist> -->
		<!-- 
		@param: commentList展示的评论列表数据
		@method: clickPraise 点赞评论
		@method: clickDelete 删除父级评论
		@method: clickRecommentChild 点赞子评论
		@method: clickDeleteChild 删除子评论
		 -->
		<five-mul-commentlist
			:commentList="commentList"
			@clickPraise="clickPraiseComment"
			@clickDelete="clickDeleteComment"
			@clickDeleteChild="clickDeleteCommentChild"
			@clickRecomment="clickRecomment"
			@clickRecommentChild="clickRecommentChild"
		></five-mul-commentlist>

		<view class="view-conmment-send-bottom">
			<view class=" view-comment-textarea" @click="clickComment()"><view class="textarea-comment">写评论…</view></view>
		</view>
		<five-comment ref="detailComment" @sendComment="sendComment" :placeholder="placeholder"></five-comment>
	</view>
</template>

<script>
/**
 * @author: 小五
 * @time：	2020-07-07
 * 注：
 * 1. 评论详情 、回复评论及回复子评论功能实际是调用接口实现，在这里只为实现效果，逻辑无参考价值
 */
import data from '@/data';
import dateUtils from '@/common/utils/dateUtils.js';
export default {
	data() {
		return {
			detailInfo: {},
			commentList: [],

			//评论组件相关
			placeholder: '请输入评论内容…',
			commentParam: {}
		};
	},
	onLoad: function(e) {},
	onShow: function() {
		this.getData(); //获取数据
		this.getComment(); //获取评论列表
	},
	methods: {
		/**
		 * 获取用户信息
		 */
		getData() {
			this.detailInfo = data.dataInfo;
		},
		/**
		 * 获取评论详情
		 */
		getComment() {
			this.commentList = data.commentList;
		},

		/**
		 * 格式化发布日期
		 * @param {Object} dateString
		 */
		formateDate(dateString) {
			dateString = parseInt(dateString) * 1000;
			let date = new Date(dateString);
			let formatStr = dateUtils.dateFormat('YYYY年mm月dd日 HH:MM:SS', date);
			return formatStr;
		},

		/**
		 * 回复问题
		 */
		clickComment() {
			this.commentParam = {
				COMMENT_TIME: '2020-07-07 14:30:01',
				FIRSTNICKNAME: '网友45454545',
				CHILD_ANWSER_LIST: [],
				IS_PRAISE: null,
				PRAISE_NUM: 0,
				CANDELETE: 1,
				HEADIMGURL: 'http://img4.imgtn.bdimg.com/it/u=2858424520,3197172862&fm=11&gp=0.jpg',
				SECONDNICKNAME: null
			};
			this.$refs.detailComment.open();
		},
		/**
		 * 详情点赞
		 * @param {Object} isPraise
		 */
		clickPraise(isPraise) {
			let praiseParam = '1';
			let praiseNum = parseInt(this.detailInfo.PRAISE_NUM);
			switch (isPraise) {
				case '0':
					praiseParam = '1';
					praiseNum++;
					break;
				case '1':
					praiseParam = '0';
					praiseNum--;
					break;
			}
			this.detailInfo.IS_PRAISE = praiseParam;
			this.detailInfo.PRAISE_NUM = praiseNum--;
		},

		/**
		 *  查看图片大图
		 * @param {Object} images
		 * @param {Object} index
		 */
		cliclImage(images, index) {
			uni.previewImage({
				urls: images,
				current: index,
				longPressActions: {
					itemColor: '#12B368',
					success: function(data) {},
					fail: function(err) {}
				}
			});
		},
		/**
		 * 删除详情
		 */
		clickDeleteDetail() {
			uni.showModal({
				title: '提示',
				content: '确定要删除吗？',
				confirmColor: '#12B368',
				success: function(res) {
					/* 调用接口删除 */
				}
			});
		},
		/**
		 * 点赞多级评论
		 * @param {Object} item
		 */
		clickPraiseComment(item) {
			//只能点赞不能取消
			if (item.IS_PRAISE == '1') {
				return;
			}
			item.IS_PRAISE = '1';
			item.PRAISE_NUM++;
		},
		/**
		 * 删除多级评论
		 */
		clickDeleteComment(item) {
			uni.showModal({
				title: '提示',
				content: '确定要删除评论吗？',
				confirmColor: '#12B368',
				success: function(res) {
					/* 调用接口删除 */
				}
			});
		},
		/**
		 * 删除多级子评论
		 */
		clickDeleteCommentChild(item) {
			uni.showModal({
				title: '提示',
				content: '确定要删除评论吗？',
				confirmColor: '#12B368',
				success: function(res) {
					/* 调用接口删除 */
				}
			});
		},

		/**
		 * 回复 评论
		 * @param {Object} item
		 */
		clickRecomment(item) {
			this.commentParam = {};
			this.$refs.detailComment.open();
			this.placeholder = '回复' + item.FIRSTNICKNAME + ':';
		},
		/**
		 * 回复评论的评论
		 * @param {Object} item
		 */
		clickRecommentChild(item) {
			this.commentParam = {};
			this.$refs.detailComment.open();
			this.placeholder = '回复' + item.FIRSTNICKNAME + ':';
		},
		/**
		 * 删除单级评论
		 */
		clickDeleteSig(item) {
			uni.showModal({
				title: '提示',
				content: '确定要删除评论吗？',
				confirmColor: '#12B368',
				success: function(res) {
					/* 调用接口删除 */
				}
			});
		},
		/**
		 * 点赞单级评论
		 */
		clickPraiseSig(item) {
			//只能点赞不能取消
			if (item.IS_PRAISE == '1') {
				return;
			}
			item.IS_PRAISE = '1';
			item.PRAISE_NUM++;
		},
		/**
		 * 发送评论
		 * @param {Object} result
		 */
		sendComment(result) {
			this.commentParam.COMMENT = result;
			this.commentList.push(this.commentParam);
		}
	}
};
</script>

<style lang="scss">
@import '../../common/css/iconfont.css';
page,
.content-ques {
	background-color: $view-bg-color;
}

.view-delete-detail {
	flex: 1;
	display: flex;
	font-size: 26rpx;
}
.bottom-item {
	flex: 1;
	display: flex;
	flex-direction: row;
	// justify-content:space-between;
	flex-direction: column;
	align-items: center;
	height: 80rpx;
	.bottom-item-image {
		font-size: 40rpx;
		color: $uni-text-color;
	}
	.bottom-item-text {
		font-size: $uni-font-size-sm;
		// margin-left: 20rpx;
		// align-items: flex-end;
		color: $uni-text-color;
	}
}
.view-content-content {
	background-color: white;
	flex-direction: column;
	padding: 30rpx 30rpx 0 30rpx;
}
.view-header {
	display: flex;
	align-items: center;
	flex-direction: row;

	.image-photo {
		height: 90rpx;
		width: 90rpx;
		background-color: $view-bg-color;
		border: 1px solid $line-color;
		border-radius: 45rpx;
		margin-right: 30rpx;
	}

	.header-txt {
		display: flex;
		flex-direction: column;
		color: $uni-text-color-grey;
		line-height: 1.5;
		justify-content: center;
		font-size: $uni-font-size-sm;
		.name {
			color: #004261;
			font-weight: bold;
			font-size: $uni-font-size-base;
		}
	}
}
.sub {
	color: $uni-text-color-grey;
	font-size: $uni-font-size-sm;
}
.item-desc {
	color: $uni-text-color;
	line-height: 1.6;
	font-size: $uni-font-size-base;
	margin-top: 20rpx;
}

.item-imgs {
	margin: 20rpx 0;
	display: flex;
	flex-direction: row;
	-webkit-flex-wrap: wrap;
	flex-wrap: wrap;

	.image-imgs {
		border-radius: 10rpx;
		background-color: $view-bg-color;
		height: 220rpx;
		width: 220rpx;
		margin: 1px 4rpx;
	}
}

.view-conmment-send-bottom {
	width: 100%;
	position: fixed;
	bottom: 0;
	display: flex;
	flex-direction: row;
	background-color: white;
	border-top: 1px solid $view-bg-color;
}

.view-comment-textarea {
	background-color: $uni-bg-color-grey;
	border-radius: 40rpx;
	padding: 15rpx 20rpx;
	margin: 25rpx 20rpx;
	width: 80%;
	flex: 1;
	align-items: center;
}
.textarea-comment {
	padding: 0;
	// width: 100%;
	height: 100%;
	font-size: $uni-font-size-base;
	// color: $uni-text-color;
	color: $uni-text-sub-color;
}
.icon-comment {
	font-size: 46rpx;
	color: $uni-text-color;
	margin: 0 30rpx 0 5rpx;
}
.view-btn-comment {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: $uni-font-size-base;
	color: white;
	height: 70rpx;
	width: 120rpx;
	border-radius: 10rpx;
	background-color: $theme-color;
	font-weight: 500;
}
.textarea-bottom {
	background-color: white;
	padding: 20rpx;
}
</style>
