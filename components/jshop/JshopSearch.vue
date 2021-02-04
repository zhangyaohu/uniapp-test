<template>
	<view>
		<!--搜素框不是fixed-->
		<view class="search-static search" ref="searchBar" v-show="!showFixed">
			<view class="search-static__content" @click="goSearch">
				<view class="search-static__input" :class="data.params.style">
					<text>请输入关键字搜索</text>
				</view>
				<image class='search-icon' src='/static/image/zoom.png'></image>
			</view>
		</view>
		<view class="search-fixed search" v-show="showFixed">
			<view class="search-static__content" @click="goSearch">
				<view class="search-static__input" :class="data.params.style">
					<text>请输入关键字搜索</text>
				</view>
				<image class='search-icon' src='/static/image/zoom.png'></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'JshopSearch',
		props: {
			data: {
				type: Object
			}
		},
		data() {
			return {
				showFixed: false,
				scrollTop: 0,
				searchTop: 0
			}
		},
		created() {
			let  _this = this;
			//记录初始位置
			_this.$nextTick(() => {
				_this.searchTop = _this.$refs['searchBar'].$el.offsetTop;
			})
		},
		mounted() {
			// #ifdef H5
			window.addEventListener('scroll', this.handleScroll)
			// #endif
		},
		methods: {
			handleScroll() {
				debugger;
				this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				this.scrollTop >= this.searchTop ?  this.showFixed = true : this.showFixed = false;
			},
			goSearch() {
				uni.navigateTo({
					url: '/pages/index/search'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search{
		width: 100%;
		height: 104upx;
		line-height: 104upx;
		padding: 16upx 26upx;
		z-index: 999;
		background-color: #fff;
		&-static {
			position: relative;
			width: 100%;
			height: 100%;
			&__content {
				position: relative;
				width: 100%;
				height: 100%;
			}
			&__input{
				position: relative;
				padding: 10upx 90upx 10upx 40upx;
				border-radius: 50upx;
				background-color: #E9E9E9;
				font-size: 24upx;
				transition: all .5s;
				line-height: 52upx;
			}
		}
		&-fixed {
		 	position: fixed;
		 	top: 0;
		 	/* background: linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, 0)); */
		 	transition: all .5s;
			padding: 16upx 26upx;
		}
		&-icon{
			position: absolute;
			z-index: 99;
			right: 30upx;
			top: 50%;
			transform: translateY(-50%);
			width: 50upx;
			height: 50upx;
		}
	}
</style>
