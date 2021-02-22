<template>
	<view>
		<view class="title">我的咨询</view>
		<post-waterfall></post-waterfall>
		<go-home></go-home>
	</view>
</template>

<script>
	import postWaterfall from '../../components/post-waterfall/post-waterfall.vue'
	export default {
		components: {
			postWaterfall
		},
	}
</script>

<style scoped>

</style>
