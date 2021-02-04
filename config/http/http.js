/** * * * * * * * * * * * * * * * * * * * * * * **
 *                    _ooOoo_                    *
 *                   o8888888o                   *
 *                   88" . "88                   *
 *                   (| -_- |)                   *
 *                   O\  =  /O                   *
 *                ____/`---'\____                *
 *              .'  \\|     |//  `.              *
 *             /  \\|||  :  |||//  \             *
 *            /  _||||| -:- |||||-  \            *
 *            |   | \\\  -  /// |   |            *
 *            | \_|  ''\---/''  |   |            *
 *            \  .-\__  `-`  ___/-. /            *
 *          ___`. .'  /--.--\  `. . __           *
 *       ."" '<  `.___\_<|>_/___.'  >'"".        *
 *      | | :  `- \`.;`\ _ /`;.`/ - ` : | |      *
 *      \  \ `-.   \_ __\ /__ _/   .-` /  /      *
 * ======`-.____`-.___\_____/___.-`____.-'====== *
 *                    `=---='                    *
 * ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ *
 *             佛祖保佑       永无BUG              *
 *         此代码经过开光处理，不可能存在bug！        *
 * * * * * * * * * * * * * * * * * * * * * * * **/
 // 需要登陆的，都写到这里，否则就是不需要登陆的接口
 const methodsToken = [
 	'user.info',
 	'user.editinfo',
 	'user.changeavatar',
 	'user.logout',
 	'user.addgoodsbrowsing',
 	'user.delgoodsbrowsing',
 	'user.goodsbrowsing',
 	'user.goodscollection',
 	'user.goodscollectionlist',
 	'user.vuesaveusership',
 	'user.saveusership',
 	'user.getshipdetail',
 	'user.setdefship',
 	'user.editship',
 	'user.removeship',
 	'user.getusership',
 	'user.pay',
 	'user.orderevaluate',
 	'user.getuserdefaultship',
 	'user.issign',
 	'user.sign',
 	'user.mypoint',
 	'user.userpointlog',
 	'user.getbankcardlist',
 	'user.getdefaultbankcard',
 	'user.addbankcard',
 	'user.removebankcard',
 	'user.setdefaultbankcard',
 	'user.getbankcardinfo',
 	'user.editpwd',
 	'user.forgotpwd',
 	'user.recommend',
 	'user.balancelist',
 	'user.sharecode',
 	'user.cash',
 	'user.cashlist',
 	'user.myinvite',
 	'user.activationinvite',
 	'coupon.getcoupon',
 	'coupon.usercoupon',
 	'cart.add',
 	'cart.del',
 	'cart.getlist',
 	'cart.setnums',
 	'cart.getnumber',
 	'order.cancel',
 	'order.del',
 	'order.details',
 	'order.confirm',
 	'order.getlist',
 	'order.create',
 	'order.getship',
 	'order.getorderlist',
 	'order.getorderstatusnum',
 	'order.aftersaleslist',
 	'order.aftersalesinfo',
 	'order.aftersalesstatus',
 	'order.addaftersales',
 	'order.sendreship',
 	'order.iscomment',
 	'payments.getinfo',
 	'user.getuserpoint',
 	'coupon.getcouponkey',
 	'store.isclerk',
 	'store.storeladinglist',
 	'store.ladinginfo',
 	'store.lading',
 	'store.ladingdel',
 	'distribution_center-api-info',
 	'distribution_center-api-applydistribution',
 	'distribution_center-api-setstore',
 	'distribution_center-api-myorder',
 	'pintuan.pintuanteam',
 	'lottery-api-getLotteryConfig',
 	'lottery-api-lottery',
 	'lottery-api-lotteryLog'
 ];
 import storage from '../../libs/storage.js';
 import utils from '../../libs/utils.js';
export default class Http {
	constructor({
		  onShowSuccessTip = (/* response, successTip  */) => true,
		  onShowErrorTip = (/* err, errorTip */) => true,
	}) {
		this.onShowSuccessTip = onShowSuccessTip;
		this.onShowErrorTip = onShowErrorTip;
	}
	
	request(url, d = {}, method='GET', options = {}) {
		//  let loadingInstance = null;
		    //  if(url.indexOf('resources') < 0 && url.indexOf('ticket') <0 && url.indexOf('domains')<0) {
		    //    loadingInstance = Loading.service({ fullscreen: true});
		    //  }
		    // 有 null的情况
		    let data = d || {};
		    options = options || {};
		
		    let {
		      successTip = false, // 默认false，不展示
		      errorTip, //  = method === 'get' ? '获取数据失败！' : '操作失败！', // 默认失败提示
		      noEmpty = false, // 过滤掉 值为 null、''、undefined三种参数，不传递给后端
		      originResponse = false,
		    } = options;
		
		    // 删除 参数对象中为 null '' undefined 的数据，不发送给后端
		    if (noEmpty === true && typeof data === 'object' && !Array.isArray(data)) {
		      const noEmptyData = {};
		
		      Object.keys(data).forEach(key => {
		        const value = data[key];
		        if (value !== null && value !== '' && value !== void 0) {
		          noEmptyData[key] = value;
		        }
		      });
		
		      data = noEmptyData;
		    }
		
		    const isGet = method === 'get';
		    const isDelete = method === 'delete';
		
		    /*
		    *
		    * Content-Type application/x-www-form-urlencoded 存在问题
		    * 参见：https://github.com/axios/axios/issues/362
		    *
		    * */
		    const defaultsContentType = 'application/json'
		
		    const contentType = (options.headers && options.headers['Content-Type'])
		      || (options.headers && options.headers['content-type'])
		      || (options.headers && options.headers['contentType'])
		      || '';
		
		    const isFormType = (defaultsContentType && defaultsContentType.indexOf('application/x-www-form-urlencoded') > -1)
		      || contentType.indexOf('application/x-www-form-urlencoded') > -1;
		
		    if (isFormType) {
		      data = stringify(data);
		      console.log(data);
		    }
		
		    uni.showLoading({
		    	title: '加载中'
		    });
		    const ajaxPromise = new Promise((resolve, reject) => {
		      uni.request({
		        method,
		        url,
		        data,
		        ...options,
				success: function(response) {
					uni.hideLoading();
					resolve(originResponse ? response : response.data);
				},
				fail: function(error) {
					uni.hideLoading();
					if (error && error.response) {
						showError(error.response);
					}
					reject(error);
				},
				complete: () => {
					setTimeout(function() {
						uni.hideLoading();
					}, 250);
				}
		      })
		    });
		    return ajaxPromise;
	}
	
	 /**
	   * 发送一个get请求，一般用于查询操作
	   * @param {string} url 请求路径
	   * @param {object} [params] 传输给后端的数据，正常请求会转换成query string 拼接到url后面
	   * @param {object} [options] ��参数
	   * @returns {Promise}
	   */
	  get(url, params, options) {
	    return this.request(url, params, 'get', options);
	  }
	
	  /**
	   * 发送一个post请求，一般用于添加操作
	   * @param {string} url 请求路径
	   * @param {object} [data] 传输给后端的数据
	   * @param {object} [options] 配置参数
	   * @returns {Promise}
	   */
	  post(method, url, data, options) {
		  // 判断token是否存在
		  if (methodsToken.indexOf(method) >= 0) {
		  	// 获取用户token
		  	let userToken = storage.get("userToken");
		  	if (!userToken) {
		  		utils.jumpToLogin();
		  		return Promise.reject('你还没有登录!');
		  	} else {
		  		data.token = userToken;
		  	}
		  }
		  
		  data.method = method;
	    return this.request(url, data, 'post', options);
	  }
	
	
	  /**
	   * 发送一个put请求，一般用于更新操作
	   * @param {string} url 请求路径
	   * @param {object} [data] 传输给后端的数据
	   * @param {object} [options] 配置参数
	   * @returns {Promise}
	   */
	  put(url, data, options) {
	    return this.request(url, data, 'put', options);
	  }
	
	  /**
	   * 发送一个patch请求，一般用于更新部分数据
	   * @param {string} url 请求路径
	   * @param {object} [data] 传输给后端的数据
	   * @param {object} [options] 配置参数
	   * @returns {Promise}
	   */
	  patch(url, data, options) {
	    return this.request(url, data, 'patch', options);
	  }
	
	  /**
	   * 发送一个delete请求，一般用于删除数据，params会被忽略（http协议中定义的）
	   * @param {string} url 请求路径
	   * @param {object} [data] 传输给后端的数据
	   * @param {object} [options] 配置参数
	   * @returns {Promise}
	   */
	  del(url, data, options) {
	    return this.request(url, data, 'delete', options);
	  }
	  /**
	   * 发送一个文件上传过程请求
	   * @param {string} url 请求路径
	   * @param {object} [data] 传输给后端的数据
	   * @param {object} [options] 配置参数
	   * @returns {Promise}
	   */
	  upload(url, files, options) {
		  const ajaxPromise = new Promise((resolve, reject) => {
		    uni.uploadFile({
		      url,
		      files,
			  headers: {
			  	'Accept': 'application/json',
			  	'Content-Type': 'multipart/form-data',
			  },
		      ...options,
		  	success: function(response) {
		  		  resolve(originResponse ? response : response.data);
		  	},
		  	fail: function(response) {
		  		if(err.response && err.response.data && err.response.data && err.response.data.errors) reject(err.response.data.errors);
		  		else reject(err.response && err.response.statusText && err.response.statusText);
		  	},
			complete: () => {
				setTimeout(function() {
					uni.hideLoading();
				}, 250);
			},
		    })
		  });
		  return ajaxPromise;
	  }
}