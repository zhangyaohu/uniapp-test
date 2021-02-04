<template>
	<view class="jshop-goods jshop-bottom-cell-group">
		<view class="jshop-goods-more jshop-flex jshop-flex-space-between">
			<view class="jshop-flex-1">
				商品组名称
			</view>
			<view class="jshop-flex-1 jshop-text_right">
				<text class="jshop-goods-text">查看更多</text>
				<image class='jshop-goods_icon' src='/static/image/right.png'></image>
			</view>
		</view>
		<view class="jshop-goods-c">
			<!-- <view class='img-grids'> -->
			<view class="" v-if="data.params.list.length" class="jshop-flex jshop-flex-wrap">
				<view class="jshop-goods-item jshop-flex-1" v-for="item in data.params.list" :key="item.id" @click="goodsDetail(item.id)">
					<image class="jshop-goods-item-image have-none" :src="item.image_url" mode='aspectFill'></image>
					<view class="jshop-goods-item-b">
						<view class="jshop-goods-name grids-goods-name">
							{{item.name}}
						</view>
						<view class="jshop-goods-item-c">
							<view class="jshop-goods-price red-price">￥{{item.price}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'JshopGoods',
		props: {
			data: {
				required: true
			}
		},
		methods: {
			goodsDetail(id) {
				uni.navigateTo({
					url: `/pages/goods/index/index?id=`+ id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.jshop-goods {
		background-color: #fff;

		&_icon {
			width: 50upx;
			height: 50upx;
			vertical-align: middle;
		}

		&-item {
			width: 336upx;
			margin: 26upx;
			background-color: #fff;
            margin-top: 0upx;
			margin-bottom: 14upx;
			&-image {
				width: 336upx;
				height: 336upx;
			}

			&:nth-child(2n-1) {
				margin-right: 0;
			}

			&-b {
				padding: 0 10px 10px;
			}

			&-c {
				overflow: hidden;
				margin-top: 10px;
			}
		}

		&-c {
			width: 100%;
		}

		&-name {
			height: 72upx;
			font-size: 26upx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			color: #333;
			width: 100%;
			line-height: 34upx;
		}

		&-price {
			color: #FF7159 !important;
			font-size: 28upx;
		}

		&-more {
			padding: 20upx 26upx 20upx 0upx;
			margin-left: 26upx;
			align-items: center;
		}

		&-text {
			font-size: 22upx;
			color: #999;
			line-height: 50upx;
			text-align: right;
		}
	}
</style>
