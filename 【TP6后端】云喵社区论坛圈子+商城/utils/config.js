const baseUrl = "api.ymeoo.cn"; //域名
const miniappName = "云喵圈子-快速搭建行业交流兴趣社区解决方案"; //站点标题 ，一般用于分享时的标题
const indexPostAd = "adunit-ee54ee8bb9662237"; //首页帖子列表广告Id,为空时不显示，用于微信小程序
const postDetailAd = "adunit-637ffe5b2f2873d5"; //帖子详情广告Id,为空时不显示，用于微信小程序
const mAd = "adunit-e681985439979442"; //我的页面广告Id,为空时不显示，用于微信小程序


const domain = 'https://' + baseUrl + "/api/"; //接口地址（无需更改）
export default {
	baseUrl: baseUrl,
	domain: domain,
	miniappName: miniappName,
	indexPostAd:indexPostAd,
	postDetailAd:postDetailAd,
	mAd:mAd
}
