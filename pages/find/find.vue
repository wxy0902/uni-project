<template>
	<view>
		<scroll-view>
			<!-- <post-list :list="postList" :loadStatus="loadStatus"></post-list> -->
			<find-list ref="waterfall" :list="postList" :loadStatus="loadStatus"></find-list>
		</scroll-view>
	</view>
</template>

<script>
	import findList from '../../components/find-list/find-list.vue'
	// import postWaterfall from '../../components/post-waterfall/post-waterfall.vue'
	export default {
		components: {
			findList
		},
		data() {
			return {
				postList: [{
						id: 1,
						uid: 2,
						discuss_id: 3,
						type:1,
						create_time: '1天前',
						read_count: 2,
						fabulous_count: 1,
						comment_count: 1,
						userInfo: {
							avatar: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
							username: '哈哈',
						},
						media: [
							'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
						]
					},
					{
							id: 1,
							uid: 2,
							discuss_id: 3,
							type:1,
							create_time: '1天前',
							read_count: 2,
							fabulous_count: 1,
							comment_count: 1,
							userInfo: {
								avatar: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
								username: '哈哈',
							},
							media: [
								'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
								'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
							]
						},
						{
								id: 1,
								uid: 2,
								discuss_id: 3,
								type:1,
								create_time: '1天前',
								read_count: 2,
								fabulous_count: 1,
								comment_count: 1,
								userInfo: {
									avatar: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
									username: '哈哈',
								},
								media: [
									'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
									'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
									'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
								]
							},
							{
									id: 1,
									uid: 2,
									discuss_id: 3,
									type:1,
									create_time: '1天前',
									read_count: 2,
									fabulous_count: 1,
									comment_count: 1,
									userInfo: {
										avatar: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
										username: '哈哈',
									},
									media: [
										'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
										'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
										'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
										'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
										'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
										'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
										'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg'
									]
								},
								{
										id: 1,
										uid: 2,
										discuss_id: 3,
										type:1,
										create_time: '1天前',
										read_count: 2,
										fabulous_count: 1,
										comment_count: 1,
										userInfo: {
											avatar: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
											username: '哈哈',
										},
										media: [
											'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
											'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
											'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
											'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
											'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
											'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
											'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg'
										]
									}

				],
				loadStatus: "loadmore",
			}
		},
	}
</script>

<style scoped>

</style>
