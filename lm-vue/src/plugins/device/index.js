import { 
  isAndroid, 
  isIpad, 
  isIpod, 
  isIphone, 
  isWechat, 
  isAlipay 
} from '@/utils/device'

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
    if (!Vue.$device) {
      Vue.$device = device
    } else {
      Vue.device = device
    }
    Vue.mixin({
      created: function () {
        this.$device = Vue.$device
      }
    })
  }
}

export default plugin
export const install = plugin.install