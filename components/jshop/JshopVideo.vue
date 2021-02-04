<template>
	<view class="jshop-video jshop-bottom-cell-group">
		<video v-for="(item, index) in data.params.list" :key="index"
		      autoplay
		      :src="item.url" :poster="item.image" controls :autoplay='data.params.autoplay'
			  class="jshop-fill"></video>
	</view>
</template>

<script>
	export default {
		name: 'JshopViedio',
		props: {
			data: {
				required: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.jshop-video{
		position: relative;
	}
</style>
