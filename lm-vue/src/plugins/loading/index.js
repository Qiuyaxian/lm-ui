import { Loading } from '@/components/loading'
import { mergeOptions } from '@/utils/plugin_helper'

let $vm
let watcher
let delayTime = null

const plugin = {
  install (vue, options) {
    const LoadingComponent = vue.extend(Loading)

    if (!$vm) {
      $vm = new LoadingComponent({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }

    const loading = {
      show (options = {}) {
        // destroy watcher
        watcher && watcher()
        if (typeof options === 'string') {
          $vm.text = options
        } else if (typeof options === 'object') {
          mergeOptions($vm, options)
        }
        if (typeof options === 'object' && options.onShow || options.onHide) {
          watcher = $vm.$watch('show', (val) => {
            val && options.onShow && options.onShow($vm)
            val === false && options.onHide && options.onHide($vm)
          })
        }
        delayTime && clearTimeout(delayTime)
        delayTime = setTimeout(() => {
          $vm.show = true
        }, options.delay || 0)
      },
      hide () {
        if (delayTime) {
          clearTimeout(delayTime)
          delayTime = null
        }
        $vm.show = false
      },
      isVisible () {
        return $vm.show
      }
    }

    // all Vux's plugins are included in this.$lm
    if (!vue.$lm) {
      vue.$lm = {
        loading
      }
    } else {
      vue.$lm.loading = loading
    }

    vue.mixin({
      created: function () {
        this.$lm = vue.$lm
      }
    })
  }
}

export default plugin
export const install = plugin.install