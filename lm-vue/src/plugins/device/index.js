import {
  isAndroid,
  isIpad,
  isIpod,
  isIphone,
  isWechat,
  isAlipay
} from '@/utils/device';
const plugin = {
  install (Vue) {
    const device = {
      isAndroid,
      isIpad,
      isIpod,
      isIphone,
      isWechat,
      isAlipay
    }
    if (!Vue.$lm) {
      Vue.$lm = {
        device
      }
    } else {
      Vue.$lm.device = device
    }
    Vue.mixin({
      created: function () {
        this.$lm = Vue.$lm
      }
    })
  }
}
export default plugin
export const install = plugin.install