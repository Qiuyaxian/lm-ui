const wx = require('./1.3.0/1.3.0.js').wx

const plugin = {
  install (Vue) {
    Vue.prototype.$wechat = wx
    Vue.wechat = wx
  },
  $wechat: wx
}

export default plugin
const install = plugin.install
export {
  install,
  wx
}