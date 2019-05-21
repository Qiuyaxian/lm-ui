import Vue from 'vue'
import Vuex from 'vuex'
import system from './modules/system/index'
// 使用vuex插件
Vue.use(Vuex)
// 实例化vuex
let store = new Vuex.Store({
  modules: {
    system
  }
})
export default store
