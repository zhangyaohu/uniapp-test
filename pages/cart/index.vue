<template>
	<view v-if="cartData && cartData.length > 0">
		
	</view>
	<view class='jshop-cart-none' v-else>
		<image class="jshop-cart-none-img" src="/static/image/car.png" mode=""></image>
		<view class='jshop-cart-none-t'>购物车快饿瘪了 T.T</view>
		<view class='jshop-cart-none-m'>快给我挑点宝贝吧</view>
		<navigator class="jshop-cart-none-b" url='../index/index' hover-class="btn-hover" open-type="switchTab">去逛逛</navigator>
	</view>
</template>

<script>
	export default {
		name: 'CartIndex',
		data() {
			return {
				cartData: []
			}
		},
		//页面加载
		onShow: function() {
		   let userToken = this.$storage.get('userToken') ;
		   if (userToken) {
		    this.getCartData(); //获取购物车数据
		   }
		},
		methods: {
			//得到购物车数据
			getCartData() {
				this.$api.cartList({}, (res) => {
					console.log(res);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.jshop-cart{
		&-none{
			width: 100%;
			padding: 200upx 0upx;
			margin: 0 auto;
			text-align: center;
			&-img{
				width: 252upx;
				height: 228upx;
			}
			&-m{
				color: #333;
				font-size: 28upx;
				line-height: 29upx;
				margin-bottom: 40upx;
			}
			&-t{
				color: #333;
				font-size: 28upx;
				line-height: 29upx;
			}
			&-b{
				    display: inline-block;
				    padding: 16upx 40upx;
				    font-size: 30upx;
				    color: #fff;
				    background-image: linear-gradient(135deg,#f2140c,#f2270c 70%,#f24d0c);
			}
		}
	}
</style>
