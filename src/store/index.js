import Vue from 'vue'
import vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import  mutations from './mutations'
import  state from './state'
import createLog from 'vuex/dist/logger'

Vue.use(vuex);
const debug=process.env.NODE_ENV!=='production'

export default new vuex.Store({
	actions,
	getters,
	mutations,
	state,
	//严格模式 调试
	strict:debug,
	pluging:debug?[createLog()]:[]
})

