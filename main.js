import Vue from 'vue'
import App from './App'
import * as Api from  './config/api/index.js'
import store from './store/index.js';
import VuexMixins from './components/VuexMixins.vue';
import Storage from './libs/storage.js';
import utils from './libs/utils.js';
import * as config from './config/config.js'

Vue.config.productionTip = false
Vue.prototype.$api = Api;
Vue.prototype.$storage = Storage;
Vue.prototype.$utils  = utils;
Vue.prototype.$config = config;
Vue.mixin(VuexMixins)

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
