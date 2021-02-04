<template>
	<view class="jshop-content">
	  <block v-for="item in param">
		<jshop-search :key="item.id" v-if="item.widget_code === 'search'"  :data="item"></jshop-search>
		<jshop-notice :key="item.id" v-if="item.widget_code === 'notice'"  :data="item"></jshop-notice>
		<jshop-swiper :key="item.id" v-if="item.widget_code === 'imgSlide'"  :data="item"></jshop-swiper>
		<jshop-coupon :key="item.id" v-if="item.widget_code=='coupon' "  :data="item"></jshop-coupon>
		<jshop-blank   :key="item.id" v-if="item.widget_code=='blank' "  :data="item"></jshop-blank>
		<jshop-textarea :key="item.id" v-if="item.widget_code=='textarea' "  :data="item"></jshop-textarea>
		<jshop-video :key="item.id" v-if="item.widget_code=='video' "  :data="item"></jshop-video>
		<jshop-imgWindow :key="item.id" v-if="item.widget_code=='imgWindow' "  :data="item"></jshop-imgWindow>
		<jshop-imgSingle :key="item.id" v-if="item.widget_code=='imgSingle' "  :data="item"></jshop-imgSingle>
		<jshop-goods :key="item.id" v-if="item.widget_code=='goods' "  :data="item"></jshop-goods>
		<jshop-article :key="item.id" v-if="item.widget_code=='article' "  :data="item"></jshop-article>
		<jshop-articleClassify :key="item.id" v-if="item.widget_code=='articleClassify' "  :data="item"></jshop-articleClassify>
		<jshop-navBar :key="item.id" v-if="item.widget_code=='navBar' "  :data="item"></jshop-navBar>
		<jshop-groupPurchase :key="item.id" v-if="item.widget_code=='groupPurchase' "  :data="item"></jshop-groupPurchase>
		<jshop-record :key="item.id" v-if="item.widget_code=='record' "  :data="item"></jshop-record>
		<jshop-pintuan :key="item.id" v-if="item.widget_code=='pintuan' "  :data="item"></jshop-pintuan>
	  </block>
	</view>
</template>

<script>
	import JshopSearch from './JshopSearch.vue';
	import JshopNotice from './JshopNotice.vue';
	import JshopSwiper from './JshopSwiper.vue';
	import JshopBlank from './JshopBlank';
	import JshopCoupon from './JshopCoupon.vue';
	import JshopVideo from './JshopVideo.vue';
	import JshopImageSingle from './JshopImageSingle.vue';
	import JshopNavBar from './JshopNavBar.vue';
	import JshopGroupPurchase from './JshopGroupPurchase.vue';
	import JshopPintuan from './JshopPintuan.vue';
	import JshopGoods from './JshopGoods.vue';
	import JshopRecord from './JshopRecord.vue';
	export default {
		name: 'JshopContent',
		components: {
			'jshop-search': JshopSearch,
			'jshop-notice': JshopNotice,
			'jshop-swiper': JshopSwiper,
			'jshop-blank': JshopBlank,
			'jshop-coupon': JshopCoupon,
			'jshop-video': JshopVideo,
			'jshop-navBar': JshopNavBar,
			'jshop-groupPurchase': JshopGroupPurchase,
			'jshop-pintuan': JshopPintuan,
			'jshop-goods': JshopGoods,
			'jshop-record': JshopRecord
		},
		props: {
			param: {
				type: Array,
				default: []
			}
		}
	}
</script>

<style>

</style>
