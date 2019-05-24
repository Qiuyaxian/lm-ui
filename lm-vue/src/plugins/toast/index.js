import objectAssign from 'object-assign'
import { Toast } from '../../components/toast'
import { mergeOptions } from '@/utils/plugin_helper'
let $vm;
let watcher;
let opt = {
  time: 2000,
  width: 230,
  isShowMask: false,
  position: 'middle'
};
const plugin = {
  install (vue, pluginOptions = {}) {
    const ToastComponent = vue.extend(Toast)

    if (!$vm) {
      $vm = new ToastComponent({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }

    const defaults = {}
    for (let i in $vm.$options.props) {
      if (i !== 'value') {
        defaults[i] = $vm.$options.props[i].default
      }
    }

    const toast = {
      show (options = {}) {
        // destroy watcher
        watcher && watcher();
        if (typeof options === 'string') {
          mergeOptions($vm, objectAssign({}, pluginOptions, { text: options }))
        } else if (typeof options === 'object') {
          mergeOptions($vm, objectAssign({}, pluginOptions, options))
        }
        if (typeof options === 'object' && options.onShow || options.onHide) {
          watcher = $vm.$watch('show', (val) => {
            val && options.onShow && options.onShow($vm)
            val === false && options.onHide && options.onHide($vm)
          })
        }
        $vm.show = true
      },
      success (option) {
        opt = objectAssign(opt, option);
        opt[`type`] = `success`;
        toast.show(opt);
      },
      error (option) {
        opt = objectAssign(opt, option);
        opt[`type`] = `error`;
        toast.show(opt);
      },
      cancel (option) {
        opt = objectAssign(opt, option);
        opt[`type`] = `cancel`;
        toast.show(opt);
      },
      warn (option) {
        opt = objectAssign(opt, option);
        opt[`type`] = `warn`;
        toast.show(opt);
      },
      text (text, position = 'default') {
        toast.show({
          type: 'text',
          width: 'auto',
          position,
          text
        })
      },
      hide () {
        $vm.show = false
      },
      isVisible () {
        return $vm.show
      }
    }

    // all Vux's plugins are included in this.$lm
    if (!vue.$lm) {
      vue.$lm = {
        toast
      }
    } else {
      vue.$lm.toast = toast
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