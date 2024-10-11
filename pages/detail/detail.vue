<template>
	<view class="detail">
	    <view v-if="loadState" >
	  	    <view class="title">
	  			{{detail.time}}
	  		</view>
	  		<view class="info">
	  		    <text>{{detail.name}}</text>
	  			<text>-----</text>
	  			<text><uni-dateformat :date="detail.postTime"></uni-dateformat></text>
	  		</view>
	  		<view class="content">
	  			content
	  		</view>
	  		<view class="btnGroup">
	  			<button size="default" type="primary" @click="goAhead()">签退</button>
	  		</view>
	  	</view>
		<view v-if="!loadState"><uni-load-more status="loading"></uni-load-more></view>
    </view>
		
</template>

<script>
	let id;
	export default {
		data() {
			return {
				detail:{},
				loadState:false
			}
		},
		onLoad(e){
			id=e.id
			this.getDetail()
		},
		methods: {
		  goAhead(){
			  uni.navigateTo({
			  	url:"/pages/tabbar-3-detial/qianDao/qianDao?id"+id
			  })
		  },
		  getDetail(){
		     uniCloud.callFunction({
		     	name:"rowAll",
				data:{
					id
				}
		     }).then(res=>{
				// console.log(res)
				 this.detail=res.result.data[0]
				// console.log(this.detail)
				 this.loadState=true
			 })
		  }
		}
	}
</script>

<style lang="scss" scoped>
.detail{
	padding: 30rpx;
	.title{
		font-size: 50rpx;
		color: #000;
		text-align: justify;
		line-height: 1.4rem;
	}
	.info{
		font-size: 30rpx;
		color: #666;
		padding: 30rpx 0 60rpx;
		text{
			padding-right: 30rpx;
		}
	}
	.btnGroup{
		margin-top: 50rpx;
	}
}
</style>
