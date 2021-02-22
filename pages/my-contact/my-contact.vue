<template>
	<view>
		<view class="title">我的有圈</view>
		<find-list></find-list>
		<go-home></go-home>
	</view>
</template>

<script>
	import findList from '../../components/find-list/find-list.vue'
	export default {
		components: {
			findList
		},
	}
</script>

<style scoped>
	
</style>
