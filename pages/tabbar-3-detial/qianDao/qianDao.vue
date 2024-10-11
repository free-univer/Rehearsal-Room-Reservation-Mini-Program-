
<template>
	<view class="content">
	<view class="input-box">
	<uni-section title="提示" subTitle="将排练室情况以照片或视频上传" type="line" padding>
				
	</uni-section>
	</view>

	<uni-file-picker
		v-model="imageValue" 
		fileMediatype="image" 
		mode="grid" 
		@select="select" 
		@progress="progress" 
		@success="success" 
		@fail="fail" 
		ref='files'
		:auto-upload="false"
	/>
	<button @click="upload" >确认发布</button>
	</view>
</template>
<script>
	let id;
	export default {
		data() {
			return {
				imageValue:[],
				filesUrl:[],
				//formValue:{
					
				//}
			}
		},
		onLoad(e){
			console.log(e)
			id=e.id;
			this.getDetail()
		},
		methods:{
			getDetail(){
				uniCloud.callFunction({
					name:"rowAll",
					data:{
						id
					}
				}).then(res=>{
					console.log(res.result.data[0])
					//this.formValue=res.result.data[0]
					//cosole.log("id"+this.formValue)
				})
			},
			upload(){
				this.$refs.files.upload()
				
			},
			// 获取上传状态
			select(e){
				console.log('选择文件：',e)
			},
			// 获取上传进度
			progress(e){
				console.log('上传进度：',e)
			},
			
			// 上传成功
			success(e){
				//console.log('上传成功',e)
				const tempFiles = e.tempFiles
				//console.log(tempFiles)
				const urlpath = [];
				for (const file of tempFiles) {
				  //console.log(file.url)
				  urlpath.push(file.url);
				}
				//console.log(urlpath);
				 this.filesUrl=urlpath;
				// console.log(this.filesUrl);
				 uniCloud.callFunction({
				 	name:"musi_data",
				 	data:{
				 		filesUrl:this.filesUrl,
				 	}
				 }).then(res=>{
				 	//console.log(res);
				 })
				uni.switchTab({
					url: "/pages/tabbar/tabbar-1/tabbar-1"
				});
			},
			
			// 上传失败
			fail(e){
				console.log('上传失败：',e)
			}
		
		}
	}
</script>

<style lang="scss">
	.input-box{
		width: 50%;
		margin: 50rpx;
		.input{
			margin: 30rpx;
			padding: 30rpx;
		}
	}
	.uni-mt-5 {
		margin-top: 5px;
	}
	.uni-easyinput{
	     width: 600rpx;
		 padding: 15rpx;
	}
	.button{
		margin: 30rpx;
	}
</style>
