<template>
	<view class="jshop-back" @click="handleBack">
		<image src="../../static/image/back-black.png" class="jshop-fill icon"></image>
	</view>
</template>

<script>
	export default {
		name: 'JshopBack',
		methods: {
			handleBack() {
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.jshop-back {
		position: fixed;
		z-index: 999;
		display: flex;
		width: 44upx;
		height: 44upx;
		border-radius: 50%;
		background: #de9393;
		margin: 12upx 12upx;
		align-items: center;
		justify-content: center;
	}
	.icon{
		width: 32upx;
		height: 32upx;
	}
</style>
