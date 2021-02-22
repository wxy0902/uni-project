<template>
	<view>
		<view class="title">我的收藏</view>
		<view>
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		</view>
		<scroll-view scroll-y="true" >
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
				list: [{
					name: '咨询'
				}, {
					name: '有圈'
				}],
				current: 0
			}
		},
		components: {
			findList,
			postWaterfall
		},
		methods: {
			change(index) {
				this.current = index;
			}
		}
	}
</script>

<style scoped>

</style>
