<template>
	<view>
	   <!-- 粉丝页面 -->
	   <user-list :list= "userList" />
	</view>
</template>

<script>
	import userList from '../../components/user-list/user-list.vue'
	export default {
		data() {
			return {
				userList: []
			}
		},
	}
</script>

<style scoped>

</style>