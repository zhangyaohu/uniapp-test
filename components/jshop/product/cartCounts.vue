<template>
	<view class="jshop-counts">
		<text class="jshop-counts-item">数量</text>
		<text  class="jshop-counts-item" :class="{'disabled': count <= 1}" @click="handleCut">-</text>
		<text class="jshop-counts-item">{{count}}</text>
		<text class="jshop-counts-item" :class="{'disabled': count >=max}" @click="handleAdd">+</text>
	</view>
</template>

<script>
	export default {
		name: 'CartCounts',
		props: {
			max: {
				type: Number
			}
		},
		data() {
			return {
				count: 1
			}
		},
		methods: {
			handleCut() {
				if(this.count > 1) {
					this.count--;
				}
				this.$emit('count-change', this.count);
			},
			handleAdd() {
				if(this.count >= this.max) {
				  this.count = this.max;
				  return;
				}
				if(this.count < this.max) {
					this.count++;
				}
				this.$emit('count-change', this.count);
			},
			reset() {
				this.count = 1;
			}
		},
		watch: {
			max(newVal, oldVal) {
				if(this.count >= newVal) {
					this.count = this.max;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.jshop-counts{
		background: #fff;
		padding: 26upx;
		border-top: 2upx solid #f3f3f3;
		&-item{
			display: inline-block;
			margin-right: 20upx;
			font-size: 24upx;
			height: 52upx;
		}
	}
</style>
