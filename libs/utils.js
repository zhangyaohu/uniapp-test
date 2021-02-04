import store from './../store/index';
import storage from './storage.js';
class Utils {
	/**
	 * 深拷贝 @param object {object}
	 * */
	deepCopy(object) {
		//如果不为object时返回此对象
		if (typeof object !== 'object') return object;
		//是数组时新对象为[]否则为{}
		let newObject = Array.isArray(object) ? [] : {};
		for (let key in object) {
			//对象中存在key值时进行赋值操作
			if (object.hasOwnProperty(key)) {
				if (typeof object[key] === 'object') {
					newObject[key] = this.deepCopy(object[key]);
				} else {
					newObject[key] = object[key]
				}
			}
		}
		return newObject;
	}
	/**
	 * 快速排序
	 * **/
	quickSort(arr, prop, direction) {
		let sort = (array, left = 0, right = array.length - 1) => {
			if (left >= right) return;
			let high = right,
				low = left,
				baseVal = array[right];
			while (low < high) {
				if (direction === '+') {
					while (low < high && array[low][prop] <= baseVal[prop]) {
						low++;
					}
					array[high] = array[low];
					while (low < high && array[high][prop] >= baseVal[prop]) {
						high--;
					}
					array[low] = array[high];
				} else {
					while (low < high && array[low][prop] >= baseVal[prop]) {
						low++;
					}
					array[high] = array[low];
					while (low < high && arr[high][prop] <= baseVal[prop]) {
						high--;
					}
					array[low] = array[high];
				}
			}
			array[high] = baseVal;
			sort(array, left, high - 1);
			sort(array, high + 1, right);
		}
		let newArr = arr.concat();
		sort(newArr);
		return newArr;
	}
	//跳转到登陆页面
	jumpToLogin(method) {
		var now_time = Date.parse(new Date())
		var value = storage.get('jump_to_login')
		if (!value) {
			value = 0
		}
		if (now_time - value > 3000) {
			//db.set('jump_to_login',now_time); //暂时屏蔽登录时间查询
			// 将当前页面route存vuex中 登录注册后跳转
			let pages = getCurrentPages()
			let page = pages[pages.length - 1]
			// 获取页面参数信息
			let pagePath = ''
			// #ifdef H5 || MP-WEIXIN || APP-PLUS	 || APP-PLUS-NVUE
			if (page.route.indexOf('pages/goods/index/index') !== -1) {
				//商品详情页
				if (page.goodsId) {
					pagePath = '/' + page.route + '?id=' + page.goodsId;
				} else {
					pagePath = '/pages/index/index';
				}
			}
			if (page.route.indexOf('pages/goods/index/group') !== -1) {
				//团购秒杀详情页
				if (page.goodsId && page.groupId) {
					pagePath = '/' + page.route + '?id=' + page.goodsId + '&group_id' + page.groupId;
				} else {
					pagePath = '/pages/index/index';
				}
			}
			// #endif

			// #ifdef MP-ALIPAY
			if (page.__proto__.route.indexOf('pages/goods/index/index') !== -1) {
				//商品详情页
				if (page.rootVM.goodsId) {
					pagePath = '/' + page.__proto__.route + '?id=' + page.rootVM.goodsId;
				} else {
					pagePath = '/pages/index/index';
				}
			}
			if (page.__proto__.route.indexOf('pages/goods/index/group') !== -1) {
				//团购秒杀详情页
				if (page.rootVM.goodsId && page.rootVM.groupId) {
					pagePath = '/' + page.__proto__.route + '?id=' + page.rootVM.goodsId + '&group_id' + page.rootVM.groupId;
				} else {
					pagePath = '/pages/index/index';
				}
			}
			// #endif
			if (pagePath) {
				store.commit({
					type: 'redirect',
					page: pagePath
				})
			}
			uni.showToast({
				title: '请先登录!',
				icon: 'none',
				duration: 1000,
				success: function(res) {
					// #ifdef H5 || APP-PLUS
					setTimeout(() => {
						uni.hideToast();
						uni.navigateTo({
							url: '/pages/login/login/index1'
						})
					}, 1000)
					// #endif
					// #ifdef MP-WEIXIN || MP-ALIPAY
					setTimeout(() => {
						uni.hideToast();
						uni.navigateTo({
							url: '/pages/login/choose/index',
							animationType: 'pop-in',
							animationDuration: 200
						})
					}, 500)
					// #endif
				}
			})
		}
	}
	
	errorToShow(msg = '操作失败', callback = function() {}) {
		setTimeout(function() {
			uni.showToast({
				title: msg,
				icon: 'none',
				duration: 1500,
				success() {
					setTimeout(function() {
						callback()
					}, 1500)
				}
			})
		},100)
	
	}
	
	loadToShow(msg = '加载中') {
		uni.showToast({
			title: msg,
			icon: 'loading'
		})
	}
	
	successToShow(msg = '保存成功', callback = function() {}) {
	
	
		setTimeout(function() {
			uni.showToast({
				title: msg,
				icon: 'success',
				duration: 1000,
				success() {
					setTimeout(function() {
						callback()
					}, 500)
				}
			})
		}, 100)
		/*  uni.showToast({
		    title: msg,
		    icon: 'success',
		    duration: 1000
		  }) */
	}
	
	loadToHide() {
		uni.hideToast();
	}
	
	navigateTo(url) {
		uni.navigateTo({
			url: url,
			animationType: 'pop-in',
			animationDuration: 300
		})
	}
	
	redirectTo(url) {
		uni.redirectTo({
			url: url,
			animationType: 'pop-in',
			animationDuration: 300
		})
	}
	
	/**
	 * 格式化日期
	 * **/
	 formatDate(date, format) {
		 if(!date) return;
		 let da = new Date(date);
		 format = format ? format : 'yyyy-MM-dd hh:mm:ss';
		 let d = {
			 'M+': da.getMonth() + 1,
			 'd+': da.getDate(),
			 'h+': da.getHours(),
			 'm+': da.getMinutes(),
			 's+': da.getSeconds(),
		 }
		 if(/y+/.test(format)) {
			format =  format.replace(/y+/, da.getFullYear());
		 }
		 for(let o in d) {
			 let regx = new RegExp(o);
			 if(regx.test(format)) {
				 let str = String(d[o]);
				 format = format.replace(regx, str.length > 1 ? str : '0' + str);
			 }
		 }
		 return format;
	 }
}
export default new Utils();
