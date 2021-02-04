<template>
	<view class="jshop-back" :class="{'show': showMenu, 'hidden': !showMenu}">
		<view v-if="showMenu">
			<view class="jshop-back-item" @click="goHome">
				<image src="../../../static/image/index_gray.png" class="icon-image"></image>
			</view>
			<view class="jshop-back-item" @click="goHome">
				<image src="../../../static/image/me-ic-about.png" class="icon-image"></image>
			</view>
		</view>
		<view class="jshop-back-menu" :class="{'rotate': showMenu}" @click="show">
			<image class="jshop-back-img" src="../../../static/image/menu.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'BackToIndex',
		data() {
			return {
				showMenu: false,
			}
		},
		methods: {
			show() {
				this.showMenu = !this.showMenu;
			},
			goHome(e){
				debugger;
				console.log(e);
				e.stopPropagation();
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.jshop-back {
		position: fixed;
		right: 28upx;
		bottom: 125upx;
		width: 86upx;
		height: 279upx;
		background: rgb(255, 255, 255);
		border-radius: 50upx;

		&-img {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-pack: center;
			-webkit-justify-content: center;
			justify-content: center;
			-webkit-box-align: center;
			-webkit-align-items: center;
			align-items: center;
			position: absolute;
			width: 86upx;
			height: 86upx;
			background: #3c3e49;
			/* background: #5989b9; */
			border-radius: 50%;
			box-shadow: 0 0 5upx 2upx rgba(0, 0, 0, 0.2);
			z-index: 11;
			background-color: rgb(255, 113, 89)
		}

		&-item {
			text-align: center;
			width: 86upx;
			height: 86upx;
			justify-content: center;
			display: flex;
			align-items: center;
			transition: 0;
			transition: opacity 0.5s;
		}

		&-menu {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-pack: center;
			-webkit-justify-content: center;
			justify-content: center;
			-webkit-box-align: center;
			-webkit-align-items: center;
			align-items: center;
			position: absolute;
			width: 86upx;
			height: 86upx;
			background: #3c3e49;
			/* background: #5989b9; */
			border-radius: 50%;
			z-index: 11;
			bottom: 0;
		}
	}

	.icon-image {
		width: 57upx;
		height: 57upx;
		vertical-align: middle;
	}
	.rotate{
		transform: rotate(90deg);
		transition: all .5s;
	}
	.hidden{
		width: 86upx;
		height: 86upx;
		transition: all .5s;
		.jshop-back-item{
			width: 0upx;
			height: 0upx;
			transition: 0;
			transition: opacity 0.5s;
		}
	}
	.show{
		width: 86upx;
		height: 279upx;
		transition: 0;
	    transition: all .2s;
		.jshop-back-item{
			width: 86upx;
			height: 86upx;
			transition: 1;
			transition: opacity 0.5s;
		}
	}
</style>
