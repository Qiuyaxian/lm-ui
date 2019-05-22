import Datetime from '@/components/datetime/datetimepicker'
import ObjectAssign from 'object-assign'
/* just for importing style and avoid less-loader issue */
import pageDatetimeComponent from '@/components/datetime/datetime' // eslint-disable-line

const libs = {
  show: function (options = {}) {
    options = ObjectAssign({
      destroyOnHide: true,
      isOneInstance: true,
      confirmText: '确定',
      cancelText: '取消'
    }, options)
    const datetime = libs.datetime = new Datetime(options)
    datetime.show()
  },
  hide: function () {
    libs.datetime && libs.datetime.hide()
  }
}

export default {
  install (Vue) {
    // inject style
    const _Datetime = Vue.extend(pageDatetimeComponent)
    const div = document.createElement('div')
    if (typeof document !== 'undefined') {
      let $vm = new _Datetime({
        el: div
      })
      $vm.$el.style.display = 'none'
      $vm.$el.className += ' blc-datetime-style-inject'
      document.body.appendChild($vm.$el)
    }

    if (!Vue.$lm) {
      Vue.$lm = {
        datetime: libs
      }
    } else {
      Vue.$lm.datetime = libs
    }

    Vue.mixin({
      created: function () {
        this.$lm = Vue.$lm
      }
    })
  }
}