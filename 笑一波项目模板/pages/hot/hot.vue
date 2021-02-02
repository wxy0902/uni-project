<template>
	<view class="index">
		<block v-for="(item, index) in list" :key="index">
			<view class="card">
				<view class="car-title-view" v-if="item.text">
					<rich-text :nodes="item.text"></rich-text>
				</view>
				<image
					class="card-img"
					v-if="item.img"
					:src="item.img"
					mode="widthFix"
					@click="previmg(item.img)"
				></image>
				<video v-if="item.video" :src="item.video" controls></video>
				<view class="iconbottom">
					<view
						@click="setlike('like', index, item.id)"
						:class="item.type && item.type == 'like' ? 'active' : ''"
						class="iconfont icon-appreciate_light"
					>
						<text>{{ item.like }}</text>
					</view>
					<view
						@click="setlike('hate', index, item.id)"
						:class="item.type && item.type == 'hate' ? 'active' : ''"
						class="icon-oppose_light iconfont"
					>
						<text>{{ item.hate }}</text>
					</view>
					<view @click="showreply(item.id, index)" class="icon-pinglun iconfont">
						<text>{{ item.replycount ? item.replycount : 0 }}</text>
					</view>
				</view>
			</view>
		</block>
		<text class="loadMore" v-if="loading">{{!loading && list.length < 1?"没有了":"加载中"}}</text>

		<button
			open-type="getUserInfo"
			v-if="showlogin"
			id="showlogin"
			type="warn"
			@getuserinfo="login"
		>
			使用微信登录
		</button>
		<view id="mask" @click="showlogin = false" v-if="showlogin"></view>
	</view>
</template>

<script>
/* *
 * tabbar最热页面
 * */
import { mapState, mapMutations, mapActions } from 'vuex';
import util, { parGetData, parSetData, checklogin } from '../../common/util';
export default {
	data() {
		return {
			/* 为true表示正在刷新 */
			refreshing: false,
			/* 服务商列表 */
			providerList: [],
			/* 数据数组 */
			list: [],
			openid: '',
			userinfo: '',
			token: '',
			/* 当前页数 */
			fetchPageNum: 1,
			/* 为true表示加载中 */
			loading: true,
			showlogin: false
		};
	},
	onShow() {
		this.checkstat();
	},
	onShareAppMessage() {
		return {
			title: '最新最好笑的趣事趣图，来看下吧',
			path: '/pages/hot/hot'
		};
	},
	onLoad() {
		this.checkstat();
		this.getData();
	},
	onReachBottom() {
		/* 到底部加载 */
		this.getData();
	},
	onPullDownRefresh() {
		// 下拉刷新
		this.refreshing = true;
		this.getData();
	},
	methods: {
		checkstat() {
			var logininfo = util.checklogin();
			this.openid = logininfo.openid;
			this.userinfo = logininfo.userinfo;
			this.token = logininfo.token;
		},
		previmg(url) {
			uni.previewImage({
				urls: [url]
			});
		},
		showreply(id, index) {
			// 进入回复页面
			uni.setStorage({
				key: 'detail-' + id,
				data: parSetData(this.list[index])
			});
			uni.navigateTo({
				url: '../detail/detail?id=' + id
			});
		},
		getData() {
			this.loading = true;
			uni.request({
				url: util.apiurl + 'syj/index/getlist',
				method: 'POST',
				dataType: 'json',
				data: {
					page: this.refreshing ? 1 : this.fetchPageNum,
					pagesize: 20,
					status: 1,
					order: 'like',
					token: this.token,
					shebei: util.shebei
				},
				success: ret => {
					if (ret.statusCode !== 200) {
						uni.showToast({
							title: '请求数据失败请重试' + ret.statusCode,
							duration: 2000,
							icon: 'none'
						});
					} else {
						if (ret.data.data.length < 1) {
							uni.showToast({
								title: '没有了',
								icon: 'none'
							});
							return false;
						}
						if (this.refreshing && ret.data.data[0].id === this.list[0].id) {
							uni.showToast({
								title: '已经最新',
								icon: 'none'
							});
							this.refreshing = false;
							uni.stopPullDownRefresh();
							return;
						}
						if (this.refreshing) {
							this.refreshing = false;
							uni.stopPullDownRefresh();
							this.list = ret.data.data;
							this.fetchPageNum = 2;
						} else {
							this.list = this.list.concat(ret.data.data);
							this.fetchPageNum += 1;
						}
					}
				},
				fail: res => {
					uni.showToast({
						title: '请求数据失败请重试',
						duration: 2000,
						icon: 'none'
					});
				},
				complete: function() {
					this.loading = false;
				},
				header: {
					auth: util.httpauth
				}
			});
		},
		setlike(type, index, tid) {
			util.setlike(this, this.list[index], type, tid);
		},
		/* 登录方法 */
		login(res) {
			util.logincomm(res, this);
		}
	}
};
</script>

<style>
.iconbottom {
	align-items: center;
	text-align: center;
	justify-content: center;
	margin: 20rpx auto 10rpx;
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
