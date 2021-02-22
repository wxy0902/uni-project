<template>
	<view>
		<view class="info-box">
			<view class="user-item">
				<navigator url="/pages/ucenter/ucenter">
					<image :src="postDetail.userInfo.avatar"></image>
				</navigator>
				<view class="user-item-user">
					<text class="user-name">{{postDetail.userInfo.username}}</text>
					<view class="cxplain">{{postDetail.userInfo.intro}}</view>
				</view>

				<view class="iconfont icon-gengduo more-item" @click="show = true;showTipOff = true;"></view>
				<!-- <block v-if="postDetail.is_follow">
					<u-button size="mini" style="float:right;font-size: 14px;" @click="cancelFollow">已关注</u-button>
				</block> -->
				<!-- <block v-else>
					
					<u-button type="error" size="mini" style="float:right;font-size: 14px;" @click="follow">关注</u-button>
				</block> -->
			</view>
			<view class="icon">
				<text>{{postDetail.create_time}}</text>
			</view>
			<view class="hr"></view>
			<rich-text class="post-text" :nodes="postDetail.content"></rich-text>
			<!-- 图片 -->
			<block v-if="postDetail.type == 1">
				<block>
					<view>
						<image v-for="(mediaItem, index2) in postDetail.media" :key="index2" @tap.stop="previewImage" mode="aspectFill"
						 :data-current="mediaItem" :data-image="postDetail.media" :src="mediaItem"></image>
					</view>
				</block>
			</block>
			<!-- <block v-if="postDetail.type == 2 && postDetail.media.length > 0">
				<video :controls="false" :autoplay="true" :src="postDetail.media[0]"></video>
			</block> -->

			<!--按钮-->
			<view class="p-footer">
				<block v-if="postDetail.is_collection">
					<view class="btn m-right-20" @click="cancelCollection">
						<text class="iconfont icon-shoucang" style="color: #d81e06;"></text>
						<text>123</text>
					</view>
				</block>
				<block v-else>
					<view class="btn m-right-20" @click="addCollection">
						<text class="iconfont  icon-icon-test"></text>
						<text>123</text>
					</view>
				</block>
				<block v-if="postDetail.is_thumb">
					<view class="btn" @click="cancelThumb" type="default">
						<text class="iconfont icon-dianzan3" style="color: #d81e06;"></text>
						<text>123</text>
					</view>
				</block>
				<block v-else>
					<view class="btn" @click="addThumb" type="default">
						<text class="iconfont icon-dianzan2"></text>
						<text>123</text>
					</view>
				</block>
				<!-- <view @click.stop="jumpTopic(postDetail.topic_info.id)" class="topic-name">{{postDetail.topic_info.topic_name}}</view> -->
			</view>
		</view>
		<view class="comment-box">
			<view>评论（{{postDetail.comment_list.length}}）</view>
			<comment-list :commentList="postDetail.comment_list" @clickPraise="clickPraiseComment" @clickDelete="clickDeleteComment"
			 @clickDeleteChild="clickDeleteCommentChild" @clickRecomment="clickRecomment" @clickRecommentChild="clickRecommentChild"></comment-list>
		</view>
		<view style="height: 100rpx;"></view>
		<!-- 评论输入框 -->
		<view class="tool">
			<!-- <view class="tool-item"> -->
			<!-- <view @click.stop="jumpTopic(postDetail.topic_info.id)" class="topic-name">{{postDetail.topic_info.topic_name}}</view> -->
			<!-- <block> -->
			<view class="icon-btn m-right-30" @click="clickComment()">
				<text class="iconfont icon-pinglun"></text>
				<text>评论</text>
			</view>
			<view class="icon-btn m-right-30" @click="show = true;showTipOff = false;">
				<text class="iconfont icon-zhuanfa"></text>
				<text>转发</text>
			</view>

			<u-button type="success">获取微信</u-button>
			<u-button type="warning" @click="makephonecall">拨打电话</u-button>
			<!-- </view> -->
		</view>
		<!-- 评论输入框 -->
		<!-- view class="comment-tool" v-if="sendComment">
			<textarea placeholder="吐个槽..." fixed="true" cursor-spacing="10" v-model="cTxt" auto-height="true" placeholder-class="txt-placeholder"></textarea>
			<u-button type="error" @click="addComment" :disabled="isSubmitD" style="border-radius: 0;">发布</u-button>
		</view> -->
		<Comment ref="detailComment" @sendComment="sendComment" :placeholder="placeholder"></Comment>
		<u-popup v-model="show" mode="bottom" border-radius="14" length="15%" safe-area-inset-bottom closeable>
			<!-- <view class="uni-share-content-box">
				<view class="uni-share-content-item" @click.stop="select(item,index)">
					<image class="uni-share-image" src="../../static/icon-bottom-nav/find_normal.png" mode="aspectFill"></image>
					<text class="uni-share-text">微信分享</text>
				</view>
				<view class="uni-share-content-item" @click.stop="select(item,index)">
					<image class="uni-share-image" src="../../static/icon-bottom-nav/find_normal.png" mode="aspectFill"></image>
					<text class="uni-share-text">生成海报</text>
				</view>
			    <view class="uni-share-content-item" @click.stop="select(item,index)">
			    	<image class="uni-share-image" src="../../static/icon-bottom-nav/find_normal.png" mode="aspectFill"></image>
			    	<text class="uni-share-text">举报</text>
			    </view>
			</view> -->
			<view class="uni-share-content-box">
				<button open-type="share" plain>
					<image src="../../static/icon-bottom-nav/find_normal.png" mode="aspectFit"></image>
					<text>微信分享</text>
				</button>

				<button class="onSave" @click="createPoster" plain>
					<image src="../../static/icon-bottom-nav/find_normal.png" mode="aspectFit"></image>
					<text>生成海报</text>
				</button>

				<button v-if="showTipOff" class="onSave" @click="toTipOff" plain>
					<image src="../../static/icon-bottom-nav/find_normal.png" mode="aspectFit"></image>
					<text>举报</text>
				</button>
			</view>
		</u-popup>

		<!-- 去首页 -->
		<go-home></go-home>
		<!-- 提示弹窗 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import commentList from '../../components/comment-list/comment-list.vue'
	import Comment from '../../components/comment/comment.vue'

	export default {
		data() {
			return {
				show: false,
				showTipOff: false,
				postId: 0,
				postDetail: {
					type: 1,
					comment: [],
					media: [
						'https://t7.baidu.com/it/u=2397542458,3133539061&fm=193&f=GIF',
						'https://t7.baidu.com/it/u=2397542458,3133539061&fm=193&f=GIF',
						// 'https://t7.baidu.com/it/u=2397542458,3133539061&fm=193&f=GIF'
					],
					userInfo: {
						avatar: 'https://t7.baidu.com/it/u=2397542458,3133539061&fm=193&f=GIF',
						username: '老王',
						intro: '这就是我，哈哈哈'
					},
					create_time: "1分钟前",
					comment_list: [{
							avatar: 'https://t7.baidu.com/it/u=2397542458,3133539061&fm=193&f=GIF',
							username: '小王',
							content: "这个宝贝好棒",
							create_time: "1分钟前",
							self: 1,
							child_comment_list: [{
									username: "小王",
									other_username: "lala",
									content: "确实很好看",
									self: 1,
								},
								{
									username: "lala",
									// other_username:"lala",
									content: "确实很好看",
									// create_time: "1分钟前",
									// self: 1,
								}
							]
						},
						{
							avatar: 'https://t7.baidu.com/it/u=2397542458,3133539061&fm=193&f=GIF',
							username: '小明',
							content: "666",
							create_time: "1分钟前",
						}
					],
					is_thumb: false,
					is_collection: false
				},
				cTxt: "",
				isSubmitD: false,
				sendComment: false,
				//评论组件相关
				placeholder: '请输入评论内容…',
				commentParam: {},
			};
		},
		components: {
			commentList,
			Comment
		},
		onLoad(options) {
			this.postId = options.id;
			this.getPostDetail();

			//#ifdef MP-WEIXIN
			wx.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			})
			//#endif
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			let imgURL;
			if (this.postDetail.media.length > 0) {
				imgURL = this.postDetail.media[0];
			}
			return {
				title: this.postDetail.content,
				path: '/pages/post-detail/post-detail?id=' + this.postId,
				imageUrl: imgURL
			}
		},
		onShareTimeline() {
			let imgURL = imgURL = this.postDetail.media[0];;
			return {
				title: this.postDetail.content,
				imageUrl: imgURL,
				query: 'id=' + this.postId
			}
		},
		methods: {
			Comment() {
				console.log(11111)
				this.sendComment = true
			},
			addComment() {
				this.isSubmitD = true;
				if (this.cTxt == "") {
					this.$u.toast('评论不能为空');
					this.isSubmitD = false;
					return;
				}
				let cTxt = this.utf16toEntities(this.cTxt)
				this.$H.post('post/addComment', {
					content: cTxt,
					uid: this.postDetail.uid,
					post_id: this.postId
				}).then(res => {
					if (res.code == 200) {
						this.cTxt = "";
						this.$u.toast('评论成功');
						this.getPostDetail();
					}
					this.isSubmitD = false;
				});
			},
			//把utf16的emoji表情字符进行转码成八进制的字符
			utf16toEntities(str) {
				var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则  
				return str.replace(patt, function(char) {
					var H, L, code;
					if (char.length === 2) {
						H = char.charCodeAt(0); // 取出高位  
						L = char.charCodeAt(1); // 取出低位  
						code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法  
						return "&#" + code + ";";
					} else {
						return char;
					}
				});
			},
			//将编码后的八进制的emoji表情重新解码成十六进制的表情字符
			entitiesToUtf16(str) {
				return str.replace(/&#(\d+);/g, function(match, dec) {
					let H = Math.floor((dec - 0x10000) / 0x400) + 0xD800;
					let L = Math.floor(dec - 0x10000) % 0x400 + 0xDC00;
					return String.fromCharCode(H, L);
				});
			},
			getPostDetail() {
				this.$H.get('post/detail', {
					id: this.postId
				}).then(res => {

					res.result.comment_list.data.forEach(item => {
						item.content = this.entitiesToUtf16(item.content);
					})

					this.postDetail = res.result;
				});
			},
			cancelCollection() {
				this.postDetail.is_collection = false
				// this.$H.post('post/cancelCollection', {
				// 	id: this.postId
				// }).then(res => {
				// 	if (res.code === 200) {
				// 		this.postDetail.is_collection = false;
				// 	}
				// })
			},
			addCollection() {
				this.postDetail.is_collection = true
				// this.$H.post('post/addCollection', {
				// 	id: this.postId,
				// 	uid: this.postDetail.uid
				// }).then(res => {
				// 	if (res.code === 200) {
				// 		this.postDetail.is_collection = true;
				// 	}
				// })
			},
			addThumb() {
				this.postDetail.is_thumb = true
				// this.$H.post('post/addThumb', {
				// 	id: this.postId
				// }).then(res => {
				// 	if (res.code === 200) {
				// 		this.postDetail.is_thumb = true;
				// 	}
				// })
			},
			cancelThumb() {
				this.postDetail.is_thumb = false
				// this.$H.post('post/cancelThumb', {
				// 	id: this.postId,
				// 	uid: this.postDetail.uid
				// }).then(res => {
				// 	if (res.code === 200) {
				// 		this.postDetail.is_thumb = false;
				// 	}
				// })
			},
			more() {
				this.show = true
				this.showTipOff = true
			},
			follow() {
				// this.show = true
				// this.$H.post('user/addFollow', {
				// 	id: this.postDetail.uid
				// }).then(res => {
				// 	if (res.code === 200) {
				// 		this.postDetail.is_follow = true;
				// 	} else {
				// 		this.$refs.uToast.show({
				// 			title: res.msg,
				// 			type: 'error'
				// 		})
				// 	}
				// })
			},
			cancelFollow() {
				this.$H.post('user/cancelFollow', {
					id: this.postDetail.uid
				}).then(res => {
					if (res.code === 200) {
						this.postDetail.is_follow = false;
					}
				})
			},
			previewImage(e) {
				uni.previewImage({
					current: e.currentTarget.dataset.current, // 当前显示图片的http链接
					urls: e.currentTarget.dataset.image // 需要预览的图片http链接列表
				})
			},
			/**
			 * 点赞多级评论
			 * @param {Object} item
			 */
			clickPraiseComment(item) {
				console.log(11111)
				//只能点赞不能取消
				// if (item.IS_PRAISE == '1') {
				// 	return;
				// }
				// item.IS_PRAISE = '1';
				// item.PRAISE_NUM++;
			},
			/**
			 * 删除多级评论
			 */
			clickDeleteComment(item) {
				console.log(12233)
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
				this.placeholder = '回复' + item.username + ':';
			},
			/**
			 * 回复评论的评论
			 * @param {Object} item
			 */
			clickRecommentChild(item) {
				this.commentParam = {};
				this.$refs.detailComment.open();
				this.placeholder = '回复' + item.username + ':';
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
			 * 发送评论
			 * @param {Object} result
			 */
			sendComment(result) {
				this.commentParam.COMMENT = result;
				this.commentList.push(this.commentParam);
			},
			// 拨打电话
			makephonecall() {
				uni.makePhoneCall({
					phoneNumber: '114' //仅为示例
				});
			},
			// 创建海报
			createPoster() {
				uni.navigateTo({
					url: "/pages/poster/poster?image=" + this.postDetail.media[0]
				})
			},
			// 举报
			toTipOff() {
				uni.navigateTo({
					url: "/pages/tip-off/tip-off"
				})
			}
		},

	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F5F5F5;
	}

	.info-box {
		padding: 20rpx;
		background-color: #FFFFFF;
	}

	.icon text {
		font-size: 12px;
		color: #999;
		margin-right: 20rpx;
	}

	/*关注*/

	.user-item {
		height: 80rpx;
		margin: 20rpx 0 20rpx 0;
	}

	.user-item image {
		width: 80rpx;
		height: 80rpx;
		float: left;
		margin-right: 10rpx;
		border-radius: 50%;
	}

	.user-item-user {
		height: 80rpx;
		float: left;
	}

	.cxplain {
		font-size: 12px;
		color: #999;
		line-height: 100%;
	}

	.more-item {
		display: flex;
		justify-content: flex-end;
	}

	/*底部操作*/
	.p-footer {
		margin-top: 20rpx;
		display: flex;
		justify-content: flex-end;
	}

	.p-footer .topic-name {
		font-size: 20rpx;
		color: #8687fd;
		background-color: #e6e6ff;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10rpx 20rpx;
	}

	.p-footer .btn {
		border: 1px solid #F5F5F5;
		padding: 10rpx 20rpx;
		border-radius: 20rpx;
	}

	.p-footer .btn text {
		margin: 0 5rpx;
	}

	.m-right-20 {
		margin-right: 20rpx;
	}

	/*评论*/
	.comment-box {
		padding: 20rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
	}

	/*文章图片*/
	.img-style-1 {
		display: block;
		width: 100%;
		max-height: 600rpx;
		border-radius: 5px;
	}

	.img-style-2 {
		display: flex;
	}

	.img-style-2 image {
		margin: 5rpx;
		border-radius: 5px;
		width: 100%;
		height: 294rpx;

	}

	.img-style-3 {
		display: flex;
		flex-wrap: wrap;
	}

	.img-style-3 image {
		width: 31.3%;
		height: 200rpx;
		margin: 1%;
		border-radius: 5px;
	}

	/* 评论tool */
	.tool {
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #fff;
		padding: 15rpx;
		display: flex;
		justify-content: space-around;
	}

	.tool .icon-btn {
		display: flex;
		flex-direction: column;
		// padding: 5rpx 30rpx;
		color: #666;
	}


	.tool .icon-btn text:nth-child(1) {
		font-size: 20px;
	}

	.tool .icon-btn text:nth-child(2) {
		font-size: 10px;
	}

	video {
		width: 100%;
	}

	.post-text {
		white-space: pre-wrap;
	}

	.uni-share-content-box {
		height: 100%;
		display: flex;
		justify-content: space-around;
		background-color: #f5f5f5;

		button {
			border: none;
			outline: 0 none !important;
			// height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background-color: transparent;

			image {
				width: 60rpx;
				height: 60rpx;
			}

			text {
				font-size: 24rpx;
				color: #333333;
			}
		}
	}

	.uni-share-content-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.uni-share-content-item:active {
		background-color: #f5f5f5;
	}

	.uni-share-image {
		width: 60rpx;
		height: 60rpx;
	}

	.uni-share-text {
		font-size: 24rpx;
		color: #333333;
	}
</style>
