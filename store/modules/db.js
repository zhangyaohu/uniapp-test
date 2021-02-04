import * as types from '../mutation-type.js';
import Vue from 'vue';
let state = {
	config: {},
	redirectPage: ''
}

const actions = {
	[types.UPDATE_OBJECT]: ({commit}, payload) => {
		commit(types.UPDATE_OBJECT, payload);
	},
	[types.UPDATE_REDIRECT]: ({commit}, payload) => {
		commit(types.UPDATE_REDIRECT, payload);
	}
}

const mutations = {
	[types.UPDATE_OBJECT]: (state, {key, data}) => {
		if(!state[key]) state[key] = {};
		Vue.set(state, key, data);
	},
	[types.UPDATE_REDIRECT]: (state, {type, page}) => {
		Vue.set(state, type, page);
	}
}

export default{
	state,
	actions,
	mutations
}