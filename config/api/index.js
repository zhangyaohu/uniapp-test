import {http} from '../http/index.js';
import {
	apiBaseUrl
} from '../config.js';
export const shopConfig = (callback) => http.get(apiBaseUrl + 'api/common/jshopconf').then(res => callback(res));
//取下级地址列表
export const getAreaList = (data, callback) => http.post('user.getarealist', apiBaseUrl + 'api.html', data, callback).then(res => callback(res));
//获取首页陪住
export const getPageConfig = (data, callback) => http.post('pages.getpageconfig', apiBaseUrl + 'api.html', data, callback).then(res => callback(res));
//获得分类菜单
export const getCategories = (data, callback) => http.post('categories.getallcat', apiBaseUrl + 'api.html',data, callback).then(res => callback(res));
// 获取广告
export const advert = (data, callback) => http.post('advert.getcarousellists', apiBaseUrl + 'api.html', data, callback).then(res => callback(res));
// 获取购物车列表
export const cartList = (data, callback) => http.post('cart.getlist', apiBaseUrl + 'api.html', data, callback).then(res => callback(res));
// 用户登录
export const login = (data, callback) => http.post('user.login', apiBaseUrl + 'api.html', data, callback).then(res => callback(res));
// 发送短信验证码
export const sms = (data, callback) => http.post('user.sms', apiBaseUrl + 'api.html', data, callback).then(res => callback(res));
// 短信验证码登录
export const smsLogin = (data, callback) => http.post('user.smslogin', apiBaseUrl + 'api.html', data, callback).then(res => callback(res));
// 获取商品详情
export const goodsDetail = (data, callback) => http.post('goods.getdetial', apiBaseUrl + 'api.html', data, callback).then(res => callback(res));
// 获取商品参数信息
export const goodsParams = (data, callback) => http.post('goods.getgoodsparams', apiBaseUrl + 'api.html', data, callback).then(res => callback(res));
// 获取商品评论信息
export const goodsComment = (data, callback) => http.post('goods.getgoodscomment',  apiBaseUrl + 'api.html', data, callback).then(res => callback(res));
// 获取设置默认货品
export const getProductInfo = (data, callback) => http.post('goods.getproductinfo', apiBaseUrl + 'api.html', data, callback).then(res => callback(res));