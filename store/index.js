import Vue from 'vue';
import Vuex from  'vuex';
import db from './modules/db.js';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		db
	},
	actions: {
		
	},
	getters: {
		
	}
})