<template>
	<view class="notice jshop-bottom-cell-group" v-if="data.params.list && data.params.list.length > 0">
		<view class="notice-icon">
			<image src="../../static/image/news.png"></image>
		</view>
        <swiper class="notice-c" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000" :vertical="true" :circular="true">
           	<swiper-item v-for="item in data.params.list" :key="item.id">
           		<view class="swiper-item" @click="goNotice(item.id)">{{ item.title }}</view>
           	</swiper-item>
          </swiper>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'JshopNotice',
		props: {
			data: {
				type: Object,
				default: () => {
					return {}
				},
				required: true
			}
		},
		methods: {
			goNotice() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.notice {
		width: 100%;
		height: 62upx;
		position: relative;
		overflow: hidden;
		padding: 6upx 26upx 6upx 60upx;
		color: #333;
		background-color: #fff;

		&-icon {
			display: inline-block;
			height: 40upx;
			position: absolute;
			top: 59%;
			left: 26upx;
			-webkit-transform: translateY(-50%);
			transform: translateY(-50%);
			overflow: hidden;

			image {
				width: 30upx;
				height: 30upx;
				float: left;
			}
		}
		
		&-c{
			height: 50upx;
			line-height: 50upx;
			margin-left: 10upx;
			float: left;
			width: 630upx;
			display: inline-block;
			font-size: 28upx;
		}
	}
</style>
