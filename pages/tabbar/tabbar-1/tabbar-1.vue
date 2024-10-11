<template>
	<view class="home">
	   <view class="content">
	
	   	   <view @click="goDetail(item._id)" class="item" v-for="item in listArr" :key="item._id">
	   	   	     <view class="text">
	   	   	       <view class="title">
	   	   	     	 {{item.time}}
	   	   	       </view>
				   <view class="info">
				   	   <text>{{item.name}}</text>
					   <text>----------</text>
					   <text><uni-dateformat :date="item.postTime"></uni-dateformat></text>					 
				   </view>
			
	   	   	     </view>
				
	   	   </view>
	   </view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			listArr:[],
			
		};
	},
	onLoad() {
		this.getData()
	},
	methods: {
		goAdd(){
			uni.navigateTo({
				url:"/pages/add/add"
			})
		},
		getData(){
			uniCloud.callFunction({
				name:"getAll",
				
			}).then(res=>{
				//console.log(res);
				this.listArr=res.result.data
				uni.stopPullDownRefresh()
			})
		},
		goDetail(e){
			uni.navigateTo({
				url:"/pages/detail/detail?id="+e
			})
		},
		onPullDownRefresh(){
			this.listArr=[]
			 this.getData()	
		}//下拉刷新
	}
};
</script>

<style lang='scss' scoped>
 .home{
	 .content{
		 padding: 30rpx;
		 .item{
			 display: flex;
			 justify-content: space-between;
			 padding: 20rpx 0;
			 border-bottom: 1rpx solid #eee;
			 .text{
				 flex:1;
				 padding: 10rpx;
				 margin: 10rpx;
				 .title{
					 font-size: 50rpx;
					 color: #333;
					  overflow: hidden;
					 text-overflow: ellipsis;
					     display: -webkit-box;
					     -webkit-line-clamp: 2; //多行在这里修改数字即可
					     overflow:hidden;
					     /* autoprefixer: ignore next */
					     -webkit-box-orient: vertical;
				 }
				 .info{
					 font-size: 28rpx;
					 color:#888;
				 }
			 }
		 }
	 }
 }
</style>
