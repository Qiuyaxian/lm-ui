/**
 * 默认系统配置
 */
export default {
  install (Vue, config = {}) {
    if (!Vue.$lm) {
      Vue.$lm = {
        config
      }
    } else {
      Vue.$lm.config = config
    }
    if (typeof window !== 'undefined') {
      window.LM_CONFIG = config
    }
    Vue.mixin({
      created: function () {
        if (this.$lm) {
          this.$lm.config = config
        } else {
          this.$lm = {
            config
          }
        }
      }
    })
  }
}