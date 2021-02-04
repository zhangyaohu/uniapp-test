<template>
  <view>
	  <view v-for="(item,index) in data" :key="index" class="spec-item">
	  	<view>{{index}}</view>
	      <view v-for="(it, key) in item" :key="it.name" class="spec-item-btn" :class="[it.cla]" @click="changeSpec(index, key)">
	  		{{it.name}}
	  	</view>
	  </view>
  </view>
</template>

<script>
	export default {
		name: 'SpaceIndex',
		props: {
			data: {
				type: [Object, Array],
			}
		},
		methods: {
			changeSpec(v, k) {
				let newData = {
					v: v,
					k: k
				}
				this.$emit("changeSpec", newData);
			}
		}
	}
</script>

<style scoped lang="scss">
	.spec-item{
		border-bottom: 2upx solid #ccc;
		&-btn{
			padding: 10upx 26upx;
			margin-right: 15upx;
			margin-bottom: 10upx;
			display: inline-block;
			background: #f2f2f2;
		}
	}
	.selected{
		background: #fcedeb;
		color: #f2270c;
	}
</style>
