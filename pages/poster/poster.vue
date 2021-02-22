<template>
	<view class="pc-container">
		<image :src="imgurl" mode="aspectFill" @longpress="saveImage"></image>
		<canvas canvas-id="myCanvas" class="poster_canvas" v-show="canvasShow"></canvas>
	</view>
</template>

<script>
	// 文字换行
	function drawtext(text, maxWidth) {
		let textArr = text.split("");
		let len = textArr.length;
		// 上个节点
		let previousNode = 0;
		// 记录节点宽度
		let nodeWidth = 0;
		// 文本换行数组
		let rowText = [];
		// 如果是字母，侧保存长度
		let letterWidth = 0;
		// 汉字宽度
		let chineseWidth = 21;
		// otherFont宽度
		let otherWidth = 10.5;
		for (let i = 0; i < len; i++) {
			if (/[\u4e00-\u9fa5]|[\uFE30-\uFFA0]/g.test(textArr[i])) {
				if (letterWidth > 0) {
					if (nodeWidth + chineseWidth + letterWidth * otherWidth > maxWidth) {
						rowText.push({
							type: "text",
							content: text.substring(previousNode, i)
						});
						previousNode = i;
						nodeWidth = chineseWidth;
						letterWidth = 0;
					} else {
						nodeWidth += chineseWidth + letterWidth * otherWidth;
						letterWidth = 0;
					}
				} else {
					if (nodeWidth + chineseWidth > maxWidth) {
						rowText.push({
							type: "text",
							content: text.substring(previousNode, i)
						});
						previousNode = i;
						nodeWidth = chineseWidth;
					} else {
						nodeWidth += chineseWidth;
					}
				}
			} else {
				if (/\n/g.test(textArr[i])) {
					rowText.push({
						type: "break",
						content: text.substring(previousNode, i)
					});
					previousNode = i + 1;
					nodeWidth = 0;
					letterWidth = 0;
				} else if (textArr[i] == "\\" && textArr[i + 1] == "n") {
					rowText.push({
						type: "break",
						content: text.substring(previousNode, i)
					});
					previousNode = i + 2;
					nodeWidth = 0;
					letterWidth = 0;
				} else if (/[a-zA-Z0-9]/g.test(textArr[i])) {
					letterWidth += 1;
					if (nodeWidth + letterWidth * otherWidth > maxWidth) {
						rowText.push({
							type: "text",
							content: text.substring(previousNode, i + 1 - letterWidth)
						});
						previousNode = i + 1 - letterWidth;
						nodeWidth = letterWidth * otherWidth;
						letterWidth = 0;
					}
				} else {
					if (nodeWidth + otherWidth > maxWidth) {
						rowText.push({
							type: "text",
							content: text.substring(previousNode, i)
						});
						previousNode = i;
						nodeWidth = otherWidth;
					} else {
						nodeWidth += otherWidth;
					}
				}
			}
		}
		if (previousNode < len) {
			rowText.push({
				type: "text",
				content: text.substring(previousNode, len)
			});
		}
		return rowText;
	}
	export default {
		data() {
			return {
				imgurl: '',
				canvasShow: true,
				// image:''
			}
		},
		onHide() {
			uni.removeStorageSync('person-card');
		},
		onLoad(option) {
			console.log("option", option.image)
			// this.image = option.image
		},
		mounted() {
			//如果本地有图片了，直接取，解决一些页面切换canvas没有重画
			// if(uni.getStorageSync('person-card')){
			//     this.canvasShow = false;
			//     this.imgurl = uni.getStorageSync('person-card');
			// }else{
			this.canvasImage();
			// }    
		},
		methods: {
			canvasImage() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				let ctx = uni.createCanvasContext('myCanvas', this);
				ctx.fillRect(0, 0, 375, 673);
				ctx.setFillStyle("#FFF");
				ctx.fillRect(0, 0, 375, 673);
				ctx.drawImage('../../static/icon-bottom-nav/find_normal.png', 0, 0, 375, 375);
				// 商品标题
				ctx.setFontSize(21);
				ctx.setFillStyle('#333');
				let drawtextList = drawtext('啦啦啦，我是卖报的小画家', 341);
				let textTop = 0;
				drawtextList.forEach((item, index) => {
					if (index < 2) {
						textTop = 380 + (index + 1) * 28;
						ctx.fillText(item.content, 17, textTop);
					}
				});
				// 商品价格
				ctx.setFontSize(26);
				ctx.setFillStyle('#f00');
				ctx.fillText('￥666.00', 17, textTop + 47);
				// 商品分割线
				ctx.beginPath();
				ctx.setLineWidth(1);
				ctx.moveTo(17, textTop + 70);
				ctx.lineTo(358, textTop + 70);
				ctx.setStrokeStyle('#eee');
				ctx.stroke();
				// 长按识别二维码访问
				ctx.setFontSize(19);
				ctx.setFillStyle('#333');
				ctx.fillText("长按识别二维码访问", 17, textTop + 136);
				// 二维码
				ctx.drawImage('../../static/icon-bottom-nav/find_normal.png', 238, textTop + 88, 120, 120);

				//开始绘画，必须调用这一步，才会把之前的一些操作实施
				ctx.draw(true, () => {
					uni.canvasToTempFilePath({
						canvasId: 'myCanvas',
						success: (res) => {
							// 在H5平台下，tempFilePath 为 base64
							this.imgurl = res.tempFilePath;
							this.canvasShow = false;
							uni.hideLoading();
							uni.setStorageSync('person-card', this.imgurl);
						},
						fail: () => {
							uni.showToast({
								title: '海报加载失败',
								duration: 2000
							});
						}
					});
				});

			},
			saveImage() {
				uni.showActionSheet({
					itemList: ['保存图片', '取消'],
					success: (res) => {
						if (res.tapIndex == 0) {
							uni.saveImageToPhotosAlbum({
								filePath: this.imgurl, //    图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
								success: () => {
									uni.showToast({
										title: '保存成功',
										duration: 2000
									});
								},
								fail: () => {
									uni.showToast({
										title: '保存失败',
										duration: 2000
									});
								}
							});
						}
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			}
		}
	}
</script>

<style scoped>
	.poster_canvas {
		width: 100%;
		min-height: 1300rpx;
	}

	image {
		width: 100%;
		min-height: 1300rpx;
		display: block;
	}
</style>
