<template>
  <view>
	  <view class="goods-assess-item" v-for="(item, index) in data" :key="index">
	  	<view class='cell-group'>
	  		<view class='jshop-flex'>
	  			<view class='cell-item-image'>
	  				<image class='user-head-img' :src='item.user.avatar' mode="aspectFill"></image>
	  			</view>
	  			<view class='cell-item-bd'>
	  				<view class="cell-bd-view">
	  					<text class="cell-bd-text" style="display: inline-block;">{{ (item.user.nickname && item.user.nickname != '')?item.user.nickname:item.user.mobile }}</text>
	  					<text class="cell-bd-text-right" style="display: inline-block;padding-right: 20upx;">
	  						<uni-rate size="12" disabled="true" :value="item.score"></uni-rate>
	  					</text>
	  				</view>
	  				<view class="cell-bd-view">
	  					<text class="cell-bd-text color-9" style="margin-right: 16upx;">{{ item.ctime }}</text>
	  					<text class="cell-bd-text color-9">{{ item.addon }}</text>
	  				</view>
	  			</view>
	  		</view>
	  	</view>
	  	<view class="gai-body">
	  		<view class="gai-body-text">
	  			{{ item.content }}
	  		</view>
	  		<view class="gai-body-img" v-if="item.images_url.length">
	  			<image :src="img" mode="aspectFill" v-for="(img, key) in item.images_url" :key="key" @click="clickImg(img)"></image>
	  		</view>
	  		<view class="seller-content" v-if="item.seller_content">
	  			<view class="seller-content-top">
	  				<image class="seller-content-img" src="/static/image/seller-content.png"></image>掌柜回复
	  			</view>
	  			{{item.seller_content}}
	  		</view>
	  	</view>
	  </view>
  </view>
</template>

<script>
	export default {
		props: {
			data: {
				type: Array,
				default: []
			}
		},
		methods: {
			clickImg(imgs) {
				uni.previewImage({
					urls: imgs.split()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-head-img{
	  width: 20upx;
	  height: 20upx;
	  border-radius: 50%;
	}
	.cell-item-image{
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: 20upx;
		margin-right: 26upx;
	}
	.cell-group{
		padding: 26upx;
	}
	.cell-item-bd{
	      flex-basis: 100%;
	      display: inline-flex;
	      justify-content: space-between;
	}
	.gai-body{
		margin: 18upx;
	}
</style>
