// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 适配
// import 'lib-flexible'
// 路由
import router from './router'
// 组件
import '../src/index';
// vuex
import store from '@/vuex'

import './assets/style/style.scss'
// 引入vue插件
import ConfigPlugin from '@/plugins/config'
import addressPlugin from '@/plugins/address'
import alertPlugin from '@/plugins/alert'
import confirmPlugin from '@/plugins/confirm'
import toastPlugin from '@/plugins/toast'

// global VUP config
Vue.use(ConfigPlugin, {
  $layout: 'PAGE_VIEW' // global config for VUX, since v2.5.12
})
Vue.use(alertPlugin)
Vue.use(confirmPlugin)
Vue.use(toastPlugin)
Vue.config.productionTip = false

Vue.config.errorHandler = (err, vm, info) => {
  console.log(err, 'err');
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  router,
  store,
  template: '<App/>'
})
