import DatetimePicker from '@/components/datetime/datetimepicker'
import ObjectAssign from 'object-assign'
/* just for importing style and avoid less-loader issue */
import { Datetime } from '@/components/datetime' // eslint-disable-line

const libs = {
  show: function (options = {}) {
    options = ObjectAssign({
      destroyOnHide: true,
      isOneInstance: true,
      confirmText: '确定',
      cancelText: '取消'
    }, options)
    const datetime = libs.datetime = new DatetimePicker(options)
    datetime.show()
  },
  hide: function () {
    libs.datetime && libs.datetime.hide()
  }
}

export default {
  install (Vue) {
    // inject style
    const DatetimeComponent = Vue.extend(Datetime)
    const div = document.createElement('div')
    if (typeof document !== 'undefined') {
      let $vm = new DatetimeComponent({
        el: div
      })
      $vm.$el.style.display = 'none'
      $vm.$el.className += ' lm-datetime-style-inject'
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