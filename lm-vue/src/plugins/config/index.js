/**
 * 默认系统配置
 */
export default {
  install (Vue, config = {}) {
    if (!Vue.vup) {
      Vue.vup = {
        config
      }
    } else {
      Vue.vup.config = config
    }

    if (typeof window !== 'undefined') {
      window.VUP_CONFIG = config
    }

    Vue.mixin({
      created: function () {
        if (this.$vup) {
          this.$vup.config = config
        } else {
          this.$vup = {
            config
          }
        }
      }
    })
  }
}