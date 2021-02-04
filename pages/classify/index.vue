<template>
	<view class="classify">
		<view class="classify-goods-box">
			<view class="classify-goods-list">
				<scroll-view scroll-y="true">
					<view class="classify-goods-li" :class="{'active': index === ins}" v-for="(item, index) in menus" :key="item.id"
					      @click="active(index)">
						<text>{{item.name}}</text>
					</view>
				</scroll-view>
			</view>
			<view class="classify-goods-grid">
				<scroll-view scroll-y="true">
					<swiper class="jshop-swiper-c jshop-bottom-cell-group" :indicator-dots="swiper.indicatorDots" :autoplay="swiper.autoplay"
					 :duration="swiper.duration" v-if="advert.tpl1_class_banner1">
						<swiper-item v-for="item in advert.tpl1_class_banner1" :key="item.id">
							<image :src="item.img" mode="widthFix" class="jshop-fill" @click="showSliderInfo(item.type, item.val)"></image>
						</swiper-item>
					</swiper>
					<view class="classify-goods-item-box jshop-flex" v-if=" menus[ins] &&  menus[ins].child">
						<view class="classify-goods-items" v-for="(item, index) in menus[ins].child" :key="index" @click="goClass(item.id)">
							<image class="classify-goods-item-img" :src="item.image_url" alt="" mode="aspectFill" />
							<view class="classify-goods-item-name jshop-text_center">{{item.name}}</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import utils from '../../libs/utils.js'
	export default {
		name: 'ClassifyIndex',
		data() {
			return {
				menus: [],
				ins: 0,
				advert: {},
				swiper: {
					indicatorDots: true,
					autoplay: true,
					// interval: 2000,
					duration: 500,
				},
			}
		},
		onLoad() {
			this.categories();
			this.getBanner();
		},
		methods: {
			active (index) {
				this.ins = index;
			},
			categories() {
				this.$api.getCategories({}, res => {
					console.log(res);
					if (res.status) {
						let arr = utils.quickSort(res.data, 'id', '+');
						for (let i = 0; i < arr.length; i++) {
							if (i === 0) {
								arr[i].active = true;
							} else {
								arr[i].active = false;
							}
						}
						this.menus = arr;
					}
				});
			},
			//获得广告图
			getBanner() {
				this.$api.advert({
					codes: 'tpl1_class_banner1'
				}, res => {
					this.advert = res.data.list;
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.classify {
		/*  #ifdef  H5  */
		height: calc(100vh - 188upx);
		/*  #endif  */
		/*  #ifndef  H5  */
		height: 100vh;

		/*  #endif  */
		&-goods-box {
			height: 100%;
			overflow: hidden;
			display: flex;
		}

		&-goods-list {
			flex: 1 1;
			width: 160upx;
		}

		&-goods-grid {
			flex: 4 1;
			background-color: #fff;
			padding: 20upx;
		}

		&-goods-li {
			font-size: 24upx;
			color: #666;
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			position: relative;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		&-goods-item-img {
			width: 170upx;
			height: 170upx;
		}

		&-goods-items {
			width: 170upx;
			margin-right: 20upx;
			margin-bottom: 20upx;
		}
	}

	.active {
		background-color: #fff;

		&::before {
			content: '';
			height: 100%;
			width: 10upx;
			background: #0000FF;
			display: inline-block;
			vertical-align: middle;
			left: 0;
			position: absolute;
		}
	}
</style>
