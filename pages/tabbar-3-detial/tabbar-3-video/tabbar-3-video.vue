
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
	
	<view class="item">
		<button @click="onsubmit">确认发布</button>
		
	</view>
	
	</view>
</template>
<script>
	export default {
		data() {
			return {
				
			}
		},
		methods:{
		  reset(){
			  
		  },
		  onsubmit(e){
			let detail = e.detail.value
			console.log(e)
			uniCloud.callFunction({
				name:"yuyue",
				data:{
				    time:this.time,
					name:this.name
				}
			}).then(res=>{
				console.log(res);
			})
			uni.switchTab({
				url: "/pages/tabbar/tabbar-1/tabbar-1"
			});
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
	.item{
		padding: 20rpx;
		margin: 20rpx;
	}
	.button{
		margin-bottom: 50rpx;
		padding: 20rpx;
	}
</style>
