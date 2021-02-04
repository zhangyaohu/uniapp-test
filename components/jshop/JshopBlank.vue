<template>
	<view class="blank" :style="{background:data.params.backgroundColor,height:data.params.height*2+'rpx'}"></view>
</template>

<script>
	export default {
		name: 'JshopBlank',
		props: {
			data: {
			  required: true
			}
		}
	}
</script>

<style>
</style>
