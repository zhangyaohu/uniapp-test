<template>
	<view class="jshop-product">
		<view class="jshop-product-mask"></view>
		<view class="jshop-product-c backInUp">
			<view class="jshop-product-info">
				<view class="jshop-product-info-img-c">
					<image :src="goodsInfo.album && goodsInfo.album[0]" class="jshop-product-info-img"></image>
				</view>
				<view style="display: flex; justify-content: space-between;width: 100%;">
					<view class="jshop-product-info-brif">
						<view class="jshop-goods-cell-group-top" style="width: 420upx;">
							<view class="line-clamp">{{goodsInfo.name ? goodsInfo.name : ''}}</view>
							<view>¥{{goodsInfo.price ? goodsInfo.price : 0}}</view>
						</view>
					</view>
					<view class="jshop-product-close" @click="$emit('close')">
						<image src='/static/image/close.png' class="jshop-fill"></image>
					</view>
				</view>
			</view>
			<view class="jshop-product-prop">
				<jshop-spec :data="shopProp.default_spes_desc" @changeSpec="changeSpec"></jshop-spec>
			</view>
			<cart-counts @count-change="handleCartChange" ref="cartCounts" :max="shopProp.total_stock"></cart-counts>
			<view class="jshop-product-btn" :class="{'disabled': !shopProp.total_stock}">
				{{shopProp.total_stock ? '确定' : '售罄'}}
			</view>
		</view>
	</view>
</template>

<script>
	import CartCounts from './cartCounts';
	import Spec from  '../spec/index.vue';
	export default {
		name: 'ProductIndex',
		components: {
			'cart-counts': CartCounts,
			'jshop-spec': Spec
		},
		props: {
			shopProp: {
				type: [Object, Array],
				default: {}
			},
			goodsInfo: {
				type: Object,
				defualt: () => {}
			}
		},
		data() {
			return {
				current: ''
			}
		},
		methods: {
			handleCartChange() {

			},
		   // 切换商品规格
		  changeSpec(obj) {
			this.$emit('changeSpec', obj);
			this.$refs['cartCounts'].reset();
		  },
		}
	}
</script>

<style lang="scss" scoped>
	.jshop-product {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 98;

		&-btn {
			background-image: linear-gradient(135deg, #f2140c, #f2270c 70%, #f24d0c);
			text-align: center;
			padding: 26upx;
			color: #fff;
			font-size: 28upx;
		}

		&-c {
			width: 100%;
			max-height: 804upx;
			background: rgb(255, 255, 255);
			position: absolute;
			left: 0upx;
			bottom: 0upx;
			z-index: 999;
		}

		&-mask {
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			position: fixed;
			background: rgba(0, 0, 0, 0.5);
		}

		&-close {
			width: 50upx;
			height: 50upx;

		}

		&-info {
			display: flex;
			position: relative;
			padding: 30upx 26upx;
			border-bottom: 2upx solid #f3f3f3;

			&-img {
				height: 100%;
				width: 100%;
				display: inline-block;
				overflow: hidden;
				position: relative;

				&-c {
					flex-grow: 0;
					flex-shrink: 0;
					flex-basis: 160upx;
					margin-right: 20upx;
					width: 160upx;
					height: 160upx;
					position: absolute;
					top: -20upx;
					background-color: #fff;
					border-radius: 6upx;
					border: 2upx solid #fff;
				}
			}

			&-btn {
				border: none;
				padding-right: 6upx 16upx;
				display: inline-block;
				margin-right: 16upx;
				margin-bottom: 10upx;
				font-size: 24upx;

				&:after {
					content: " ";
					width: 200%;
					height: 200%;
					position: absolute;
					border: none;
					top: 0;
					left: 0;
					-webkit-transform: scale(.5);
					transform: scale(.5);
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					box-sizing: border-box;
					border-radius: 10px;
				}
			}

			&-brif {
				margin-left: 180upx;
			}
		}

		&-prop {
			padding: 26upx;

			&-item {
				border-bottom: 2upx solid #f3f3f3;
			}
		}

		&-radio-btn {
			display: inline-block;
			padding: 5upx 15upx;
			background-color: #fff;
			color: #333;
			margin-right: 15upx;
			margin-bottom: 9upx;
		}
	}

	.line-clamp {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.uni-radio-input{
		opacity: 0;
	}
	
	.disabled{
		background: #DCDFE6;
	}
</style>
