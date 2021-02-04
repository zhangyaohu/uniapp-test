<template>
	<view class="jshop-goods-detail">
		<jshop-goods-detail></jshop-goods-detail>
		<swiper indicator-dots interval="5000" autoplay>
			<swiper-item v-for="(item, index) in goodsInfo.album" :key="index">
				<image :src="item" class="jshop-fill" @click="clickImg(item)"></image>
			</swiper-item>
		</swiper>
		<view class="jshop-goods-cell-group jshop-bottom-cell-group">
			<view class="jshop-flex jshop-flex-space-between jshop-goods-cell-group-top">
				<view>¥{{goodsInfo.price ? goodsInfo.price : 0}}</view>
				<view>{{goodsInfo.buy_count ? goodsInfo.buy_count : 0}}人已购买</view>
			</view>
			<view class="jshop-flex jshop-flex-space-between jshop-cell-group-item">
				<view>
					<view  class="line-clamp">{{goodsInfo.name ? goodsInfo.name : ''}}</view>
					<text v-if="goodsInfo.brief" class="color-9 fsz24 ">
						{{ goodsInfo.brief }}
					</text>
				</view>
				<view>
					<image class='jshop-fill icon' @click="goShare()" src='/static/image/share.png'></image>
				</view>
			</view>
			<view class="jshop-flex jshop-cell-group-item">
				<view class="jshop-cell-title">促销</view>
				<view>xxxx</view>
			</view>
			<view class="jshop-flex jshop-cell-group-item">
				<view class="jshop-cell-title">规格</view>
				<view>
					<text class='cell-bd-text'>{{ product.spes_desc }}</text>
				</view>
			</view>
			<view class="jshop-flex jshop-cell-group-item">
				<view class="jshop-cell-title">说明</view>
				<view>
					<view>
						<image class="jshop-goods-title-item-ic" src="/static/image/ic-dui.png" mode=""></image>
						<text class="cell-bd-text">24小时内发货</text>
					</view>
					<view>
						<image class="jshop-goods-title-item-ic" src="/static/image/ic-dui.png" mode=""></image>
						<text class="cell-bd-text">7天拆封无条件退货</text>
					</view>
				</view>
			</view>
		</view>
	    <view class="jshop-goods-rate">
			<jshop-tab v-model="tab" @tab-click="handleChangeTab" style="margin:0 auto;width:500upx">
				<jshop-tabpanel v-for="item in items"
				               :key="item.name" :label="item.label" :name="item.name"></jshop-tabpanel>
			</jshop-tab>
			<view v-if="tab === 'pictureDetail'">
				<image v-for="(item,index) in images" class="jshop-fill image-icon" :key="index" :src="item" @click="clickImg(item)"/>
			</view>
			<view v-if="tab === 'param'">
				<view class='jshop-goods-cell-group jshop-bottom-cell-group' v-if="goodsParams.length">
					<view class='jshop-goods-cell-item jshop-flex' v-for="(item, index) in goodsParams" :key="index">
						<view class='jshop-goods-cell-item-title jshop-flex-1'>
							<view class='jshop-goods-cell-hd-title'>{{ item.name }}</view>
						</view>
						<view class='jshop-goods-cell-item-value jshop-flex-1'>
							<text class='cell-bd-text'>{{ item.value }}</text>
						</view>
					</view>
					</view>
			</view>
			<view v-if="tab ===  'rate'">
				<jshop-rate :data="goodsComments.list"></jshop-rate>
			</view>
		</view>
		 <jshop-cart @add-cart="addCart" @immidiate-shop="immiDiateShop" @go-cart-page="goCartPage" @collect="collect"></jshop-cart>
		 <jshop-product v-show="showProduct" ref="product" :shopProp="product" :goods-info="goodsInfo" @changeSpec="changeSpec" @close="showProduct = false;"></jshop-product>
		 <jshop-back></jshop-back>
	</view>
</template>

<script>
	import JshopGoodsDetail from  '../../../components/jshop/JshopBack.vue';
	import Tab from '../../../components/jshop/tab/Tab.vue';
	import TabPanel from '../../../components/jshop/tab/TabPanel.vue';
	import Rate from '../../../components/jshop/rate/index.vue';
	import Cart from '../../../components/jshop/cart/index.vue'
	import Product from '../../../components/jshop/product/index.vue';
	import Back from '../../../components/jshop/backTo/index.vue'
	export default {
		name: 'GoodsIndex',
		components: {
			'jshop-goods-detail': JshopGoodsDetail,
			'jshop-tab': Tab,
			'jshop-tabpanel': TabPanel,
			'jshop-rate': Rate,
			'jshop-cart': Cart,
			'jshop-product': Product,
			'jshop-back': Back
		},
		data() {
			return {
				goodsId: '',//商品id
				goodsInfo: {},//商品信息
				isfav: false,
				product: {},
				tab: 'pictureDetail',
				showProduct: false,
				items: [{
					name: 'pictureDetail',
					label: '图文详情'
				},{
					name: 'param',
					label: '商品参数'
				}, {
					name:'rate',
					label: '买家评论'
				}],
				images: [],
				goodsParams: [],
				goodsComments: {
					loadStatus: 'more',
					page: 1,
					limit: 5,
					list: []
				},
			}
		},
		onLoad(options) {
			//获取商品ID
			if (options.id != '') {
				this.goodsId = options.id;
			}
		
			if (this.goodsId) {
				this.getGoodsDetail();
				this.getGoodsParams();
				this.getGoodsComments();
			} else {
				this.$utils.errorToShow('获取失败', () => {
					uni.navigateBack({
						delta: 1
					});
				});
			}
		},
		methods: {
			// 预览图片
			clickImg(imgs) {
				// 预览图片
				uni.previewImage({
					urls: imgs.split()
				});
			},
			getGoodsDetail() {
				let data = {
					id: this.goodsId
				}
			
				// 如果用户已经登录 要传用户token
				let userToken = this.$storage.get("userToken");
			
				if (userToken) {
					data['token'] = userToken;
				}
			
				this.$api.goodsDetail(data, res => {
					console.log(res);
					if (res.status == true) {
						let info = res.data;
						let products = res.data.product;
						this.goodsInfo = info;
						this.isfav = this.goodsInfo.isfav === 'true' ? true : false;
						this.product = this.spesClassHandle(products);
			            this.parseDom(this.goodsInfo.intro);
			
			
						// 判断如果登录用户添加商品浏览足迹
						if (userToken) {
							this.goodsBrowsing();
						}
					} else {
						this.$common.errorToShow(res.msg, () => {
							uni.navigateBack({
								delta: 1
							});
						})
					}
				})
			},
			// 多规格样式统一处理
			spesClassHandle(products) {
				// 判断是否是多规格 (是否有默认规格)
				if (products.hasOwnProperty('default_spes_desc')) {
					let spes = products.default_spes_desc;
					for (let key in spes) {
						for (let i in spes[key]) {
							if (spes[key][i].hasOwnProperty('is_default') && spes[key][i].is_default === true) {
								this.$set(spes[key][i], 'cla', 'pop-m-item selected');
							} else if (spes[key][i].hasOwnProperty('product_id') && spes[key][i].product_id) {
								this.$set(spes[key][i], 'cla', 'pop-m-item not-selected');
							} else {
								this.$set(spes[key][i], 'cla', 'pop-m-item none');
							}
						}
					}
					products.default_spes_desc = spes;
				}
				console.log(products);
				return products;
			},
			goodsBrowsing() {
				
			},
			addCart() {
				this.showProduct = true;
			},
			immiDiateShop() {
				
			},
			collect() {
				
			},
			goCartPage() {
				
			},
			// 切换商品规格
			changeSpec(obj) {
				let index = obj.v;
				let key = obj.k;
			
				if (this.product.default_spes_desc[index][key].hasOwnProperty('product_id') && this.product.default_spes_desc[index]
					[key].product_id) {
					let data = {
						'id': this.product.default_spes_desc[index][key].product_id
					};
					let userToken = this.$storage.get("userToken");
					if (userToken) {
						data['token'] = userToken;
					}
					this.$api.getProductInfo(data, res => {
						if (res.status == true) {
							// 切换规格判断可购买数量
							this.buyNum = res.data.stock > this.minBuyNum ? this.minBuyNum : res.data.stock;
							this.product = this.spesClassHandle(res.data);
						}
					});
					uni.showLoading({
						title: '加载中'
					});
					setTimeout(function() {
						uni.hideLoading();
					}, 1000);
				}
			},
			// 获取商品参数信息
			getGoodsParams() {
				this.$api.goodsParams({
					id: this.goodsId
				}, res => {
					if (res.status == true) {
						this.goodsParams = res.data;
					}
				})
			},
			handleChangeTab(val) {
				console.log(val);
				this.tab = val;
			},
			//解析图片获得图片url
			parseDom(arg) {		
			　　 var objE = document.createElement("div");	
			　　 objE.innerHTML = arg;
			　　 objE.childNodes.forEach(item => {
				  if(item.firstChild.getAttribute('src'))
				    this.images.push(item.firstChild.getAttribute('src'));
			    })
			},
			// 获取商品评论信息
			getGoodsComments() {
				let data = {
					page: this.goodsComments.page,
					limit: this.goodsComments.limit,
					goods_id: this.goodsId
				}
			
				this.goodsComments.loadStatus = 'loading';
			
				this.$api.goodsComment(data, res => {
					if (res.status == true) {
						let _list = res.data.list;
						let count = res.data.count;
						this.items = [{
					name: 'pictureDetail',
					label: '图文详情'
				},{
					name: 'param',
					label: '商品参数'
				}, {
					name:'rate',
					label: '买家评论(' + count + ')'
				}]
						// 如果评论没有图片 在这块作处理否则控制台报错
						_list.forEach(item => {
							item.ctime = this.$utils.formatDate(item.ctime * 1000, 'yyyy-MM-dd hh:mm:ss');
							if (!item.hasOwnProperty('images_url')) {
								this.$set(item, 'images_url', [])
							}
						});
			
						this.goodsComments.list = [...this.goodsComments.list, ..._list];
						// 根据count数量判断是否还有数据
						if (res.data.count > this.goodsComments.list.length) {
							this.goodsComments.loadStatus = 'more';
							this.goodsComments.page++;
						} else {
							this.goodsComments.loadStatus = 'noMore';
						}
					} else {
						this.$utils.errorToShow(res.msg);
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.jshop-goods-detail{
		background: #f8f8f8;
		padding-bottom: 90upx;
	}
	.icon{
		height: 50upx;
		width: 50upx;
	}
	.jshop-cell-title{
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: 80upx;
		align-items: center;
		justify-content: center;
	}
	.jshop-goods-title-item-ic{
		width: 36upx;
		height: 36upx;
		vertical-align: top;
	}
	.jshop-goods-cell-group{
	  background-color: #fff;	
	}
	.jshop-cell-group-item{
	  border-bottom: 2upx solid #f3f3f3;
	  padding:  20upx 26upx 20upx 0;
	  margin-left: 26upx;
	  min-height: 90upx;
	}
	.jshop-goods-cell-group-top{
		margin-left: 26upx;
		padding: 26upx 0upx;
	}
	.line-clamp{
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hiddn;
	}
	.jshop-goods-rate{
		background: #fff;
		margin-top: 26upx;
		background-color: #fff;
		padding: 26upx 0;
	}
	.image-icon{
	  height: 910.443upx;
	  width: 750upx;
	}
	.jshop-goods-cell-group{
	  background: #fff;
	}
	.jshop-goods-cell-item{
		border-bottom: 2upx solid #F8F8F8;
		 padding: 26upx 26upx;
	}
</style>
