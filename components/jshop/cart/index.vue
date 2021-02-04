<template>
	<view class="jshop-flex jshop-cart">
		<view class="jshop-flex-left">
			<view class="jshop-cart-left-item" @click="handleCollect">
				<image src="../../../static/image/ic-me-collect.png" class="jshop-fill icon"/>
				<view class="jshop-cart-left-item-text">收藏</view>
			</view>
			<view class="jshop-cart-left-item" @click="handleGoCartPage">
				<image src="../../../static/image/cart_gray.png" class="jshop-fill icon"></image>
				<view class="jshop-cart-left-item-text">购物车</view>
			</view>
		</view>
		<view class="jshop-flex-center" @click="handleAddCart">加入购物车</view>
		<view class="jshop-flex-right" @click="handleImmiateShop">立即购买</view>
	</view>
</template>

<script>
	export default {
		name: 'CartIndex',
		methods:{
			handleAddCart() {
				this.$emit('add-cart');
			},
			handleImmiateShop() {
				this.$emit('immiate-shop');
			},
			handleGoCartPage() {
				this.$emit('go-cart-page');
			},
			handleCollect() {
				this.$emit('collect');
			}
		}
	}
</script>

<style scoped lang="scss">
	.jshop-flex{
		&-left{
			flex-grow: 0;
			flex-shrink: 0;
			flex-basis: 30%;
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;
		}
		&-center {
			flex-grow: 0;
			flex-shrink: 0;
			flex-basis: 35%;
			justify-content: center;
			align-items: center;
			text-align: center;
			line-height: 90upx;
			background-image: linear-gradient(135deg,#ffba0d,#ffc30d 69%,#ffcf0d);
			color: #fff;
		}
		&-right{
			flex-grow: 0;
			flex-shrink: 0;
			flex-basis: 35%;
			justify-content: center;
			align-items: center;
			text-align: center;
			line-height: 90upx;
			background-image: linear-gradient(135deg,#f2140c,#f2270c 70%,#f24d0c);
			color: #fff;
		}
	}
	.jshop-cart {
		width: 100%;
		height: 90upx;
		position: fixed;
		bottom: 0;
		background: #fff;
		overflow: hidden;
		box-shadow: 0 0 20px #ccc;
		&-left-item{
			flex: 1;
			width: 0;
			justify-content: center;
			align-items: center;
			text-align: center;
			&-text{
				font-size: 22upx;
			}
		}
	}
	.icon{
		width: 50upx;
		height: 50upx;
		top: 6upx;
	}
</style>
