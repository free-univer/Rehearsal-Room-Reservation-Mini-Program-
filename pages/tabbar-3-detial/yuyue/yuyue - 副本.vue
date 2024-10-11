
<template>
	<view class="content">
	<view class="input-box">
	<uni-section title="提示" subTitle="请输入真实有效信息" type="line" padding>
				<uni-easyinput prefixIcon="calendar" v-model="time" placeholder="请输入预约时间(例:10.1.13:00-19:00)" @iconClick="iconClick">
				</uni-easyinput>
				<uni-easyinput prefixIcon="auth" v-model="name" placeholder="请输入你的真实姓名" @iconClick="iconClick">
				</uni-easyinput>
	</uni-section>
	</view>

	
	<button @click="upload">确认发布</button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				imageValue:[],
				filesUrl:[]
			}
		},
		methods:{
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
				console.log('上传成功',e)
				const tempFiles = e.tempFiles
				console.log(tempFiles)
				const urlpath = [];
				for (const file of tempFiles) {
				  console.log(file.url)
				  urlpath.push(file.url);
				}
				console.log(urlpath);
				 this.filesUrl=urlpath;
				 console.log(this.filesUrl);
				 uniCloud.callFunction({
				 	name:"yuyue",
				 	data:{
				 	    time:this.time,
				 		filesUrl:this.filesUrl,
						name:this.name
				 	}
				 }).then(res=>{
				 	console.log(res);
				 })
			},
			onloa
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
