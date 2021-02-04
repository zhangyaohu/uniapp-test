<template>
	<view class="jshop-swiper jshop-bottom-cell-group">
		<swiper class="jshop-swiper-c" :indicator-dots="swiper.indicatorDots" :autoplay="swiper.autoplay" :interval="data.params.duration"
		 :duration="swiper.duration">
			<swiper-item v-for="(item, index) in data.params.list" :key="index">
				<image :src="item.image" mode="aspectFill" class="jshop-fill" @click="showSliderInfo(item.linkType, item.linkValue)"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: 'JshopSwiper',
		props: {
			data: {
				required: true
			}
		},
		data() {
			return {
				swiper: {
					indicatorDots: true,
					autoplay: true,
					// interval: 2000,
					duration: 500,
				},
			}
		},
		methods: {
			showSliderInfo() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.jshop-swiper {
		height: 340upx;
		position: relative;
		&-c{
			height: 340upx;
		}
	}
	.jshop-fill{
		height: 340upx;
	}
</style>
