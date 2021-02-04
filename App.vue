<script>
	export default {
		onLaunch: function() {
			console.log('App onLaunch')
			let _this = this;
			_this.$api.shopConfig(res => {
				console.log(res);
				_this.updateObject({
					key: 'config',
					data: res
				})
				// #ifdef H5
				//百度统计
				if (res.statistics) {
					var script = document.createElement("script");
					script.innerHTML = res.statistics;
					document.getElementsByTagName("body")[0].appendChild(script);
				}
				//#endif
			})
			//获取地区信息
			this.$api.getAreaList({}, res => {
				if (res.status) {
					this.$storage.set('areaList', res.data);
				}
			});
			
			// #ifdef APP-PLUS
			//this.checkVersion()
            //#endif
 		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	} 
</script>

<style>
	/*每个页面公共css */
	@import url("./static/style/common.css");
	/*css动画库*/
	@import url("./static/style/animate.css");
	body{
	  background-color: #f8f8f8!important;
	  font-size: 28upx;
	}
</style>
