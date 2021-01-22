<template>
	<view>
       <!-- 我的关注 -->
	   <user-list :list= "userList" />
	</view>
</template>

<script>
	import userList from '../../components/user-list/user-list.vue'
	export default {
		data() {
			return {
				userList: [
					{
						avatar: 'xxxxx',
						username: '小明',
						gender: '男',
						has_follow: 2,
						uid: 0,
					},
					{
						avatar: 'xxxxx',
						username: '小红',
						gender: '女',
						has_follow: 2,
						uid: 1,
					}
				]
			}
		},
		components: {
			userList
		},
	}
</script>

<style scoped>

</style>