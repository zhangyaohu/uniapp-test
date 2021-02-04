<template>
	<view class="jshop-navbar jshop-bottom-cell-group">
		<view class="jshop-navbar-list">
          <view class="jshop-navbar-list__item jshop-flex-1 jshop-center jshop-text_center" v-for="(item, index) in data.params.list" :key="index">
			  <image :src="item.image" mode="aspectFill" class="jshop-fill jshop-navbar-image"></image>
			  <view class="imgnavbar-item-text">{{item.text}}</view>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'JshopNavBar',
        props: {
			data: {
				required: true
			}
		}
	}
</script>

<style scoped lang="scss">
	.jshop-navbar {
		width: 100%;
		position: relative;
		background-color: #fff;

		&-list {
			overflow: hidden;
			padding: 24upx 0 0;
			width: 100%;
			display: flex;
			height: 182upx;
		}
		&-image{
			height: 90upx;
			width: 90upx;
		}
	}
</style>
