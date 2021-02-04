<template>
	<view class="container">
		<!--展示的内容组件-->
	  <jshop-content :param="pageDatas"></jshop-content>
		<!--展示的Copyright组件-->
	  <jshop-copyright></jshop-copyright>
	</view>
</template>

<script>
	import JshopContent from './../../components/jshop/content.vue';
	import JshopCopyRight from './../../components/jshop/copyright.vue';
	export default {
		components: {
			'jshop-content': JshopContent,
			'jshop-copyright': JshopCopyRight
		},
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				pageCode: 'mobile_home',
				pageDatas: []
			}
		},
		mounted() {
			this.__init__();
		},
		methods: {
			//初始化首页配置
           __init__(){
			   this.$api.getPageConfig({
						code: this.pageCode
					},(res) => {
				   if(res.status) {
					   //首页配置
					  this.pageDatas =  res.data.items;
				   }
			    })
		   }
		}
	}
</script>

<style>
	.container {
		font-size: 24upx;
		line-height: 24upx;
	}
</style>
