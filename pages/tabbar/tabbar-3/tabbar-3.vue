<template>
	<view class="content" :class="{'active':active}">
		<image class="logo" :class="{'active':active}" src="../../../static/logo.png"  mode="aspectFit"></image>
		<view class="tabbar-box-wrap">
			<view class="tabbar-box">
				<view class="tabbar-box-item" @click="goToPage('/pages/tabbar-3-detial/tabbar-3-video/tabbar-3-video')">
					<image class="box-image" src="../../../static/img/video.png" mode="aspectFit"></image>
					<text class="explain">预约</text>
				</view>
			</view>
		</view>
	</view>
</template> 

<script>
export default {
	data() {
		return {
			active: false
		};
	},
	onLoad() {},
	onShow() {
		// setTimeout(() => {
		this.active = true;
		// }, 500);
	},
	onHide() {
		this.active = false;
	},
	methods: {
		goToPage(url) {
			if (!url) return;
			uni.navigateTo({
				url
			});
		},
		//照相上传
		takePhoto() {
			      uni.chooseImage({
			        count: 1, // 默认9，设置图片的数量
			        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			        sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
			        success: (res) => {
			          // 成功选择照片后的回调
			          const tempFilePaths = res.tempFilePaths;
			          console.log(tempFilePaths);
					    // 这里可以执行上传图片等后续操作
					     uni.uploadFile({//将本地资源上传到开发者服务器
					     					url:baseURL+'/api/Common/upload', //接口地址
					    					filePath: res.tempFilePaths[0],//图片地址
					    					name: 'file',
					       				formData:{
					    						access_token:uni.getStorageSync('access_token'),//加入token
					     					},
					     					success: (uploadFileRes) => {
					     						let data = JSON.parse(uploadFileRes.data)
					     						if(data.code ==1){
					     							this.my_avatar = data.data.url;//上传成功后返回的图片地址
					     						}
					     					},
											fail: (err) => {
											  console.log('选择照片失败：', err);
											}
					    });
			        },
			        fail: (err) => {
			          console.log('照相失败', err);
			        }
			      });
		},
		//选择照片或视频
		chooseYourMedia(){
			uni.chooseImage({
			  count: 9,
			  mediaType: ['mix'],
			  sourceType: ['album'],
			  maxDuration: 30,
			  camera: 'back',
			  success(res) {
			    console.log(res.tempFiles)
				uni.uploadFile({//将本地资源上传到开发者服务器
				 					url:baseURL+'/api/Common/upload', //接口地址
									filePath: res.tempFilePaths[0],//图片地址
									name: 'file',
				   				formData:{
										access_token:uni.getStorageSync('access_token'),//加入token
				 					},
				 					success: (uploadFileRes) => {
				 						let data = JSON.parse(uploadFileRes.data)
				 						if(data.code ==1){
				 							this.my_avatar = data.data.url;//上传成功后返回的图片地址
				 						}
				 					},
									fail: (err) => {
									  console.log('选择照片失败：', err);
									}
				});
			  }
			})
		},
	}
};
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	/* #ifdef H5 */
	height: calc(100vh - var(--window-bottom) - var(--window-top));
	/* #endif */
	/* #ifndef H5 */
	height: 100vh;
	/* #endif */
	transition: opacity 0.3s;
	background: #999;
	opacity: 0;
	&.active {
		opacity: 1;
	}
	.logo {
		position: relative;
		margin-top: -400upx;
		width: 200upx;
		height: 200upx;
		// z-index: -1;
		opacity: 0;
		transition: opacity 0.3s;
		&.active {
			opacity: 1;
		}
	}
}
.tabbar-box-wrap {
	position: absolute;
	width: 100%;
	padding: 50upx;
	box-sizing: border-box;
	bottom: 0;
	left: 0;
	.tabbar-box {
		position: relative;
		display: flex;
		width: 100%;
		background: #fff;
		border-radius: 20upx;
		padding: 15upx 20upx;
		box-sizing: border-box;
		z-index: 2;
		box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.1);
		&:after {
			content: '';
			position: absolute;
			bottom: -16upx;
			left: 0;
			right: 0;
			margin: auto;
			width: 50upx;
			height: 50upx;
			transform: rotate(45deg);
			background: #fff;
			z-index: 1;
			box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.1);
			border-radius: 2px;
		}
		&:before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: #ffffff;
			border-radius: 20upx;
			z-index: 2;
		}
		.tabbar-box-item {
			// position: relative;
			width: 100%;
			z-index: 3;
			margin: 10upx;
			color: $uni-color-subtitle;
			text-align: center;
			font-size: $uni-font-size-base;
			.box-image {
				width: 100%;
				height: $uni-img-size-lg;
			}
		}
	}
}
</style>
