import objectAssign from 'object-assign'
import AddressComponents from '@/components/address/address-components'
import { mergeOptions } from '@/utils/plugin_helper'

let $vm
let watcher

const plugin = {
  install (vue, pluginOptions = {}) {
    const Address = vue.extend(AddressComponents);
    if (!$vm) {
      $vm = new Address({
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
    const address = {
      show (options = {}) {
        // destroy watcher
        watcher && watcher()
        if (typeof options === 'string') {
          mergeOptions($vm, objectAssign({}, pluginOptions, {text: options}))
        } else if (typeof options === 'object') {
          mergeOptions($vm, objectAssign({}, pluginOptions, options))
        }
        if (typeof options === 'object') {
          // watcher = $vm.$watch('show', (val) => {
          //   val === false && options && options.onHide && options.onHide();
          // })
          /**
           * 绑定事件
           */
          $vm.$off('on-show');
          $vm.$on('on-show', (type) => {
            options && options.onShow && options.onShow(type);
          });
          $vm.$off('on-hide')
          $vm.$on('on-hide', (type) => {
            options && options.onHide && options.onHide(type);
          });

          $vm.$off('on-shadow-change')
          $vm.$on('on-shadow-change', (val1, val2) => {
            options && options.onShadowChange && options.onShadowChange(val1, val2);
          });

          $vm.$off('on-change');
          $vm.$on('on-change', (val) => {
            options && options.onShadowChange && options.onShadowChange(val);
          });

          $vm.$off('input');
          $vm.$on('input', (val) => {
            options && options.input && options.input(val);
          });
        }
        $vm.show = true;
      },
      hide () {
        $vm.show = false
      },
      isVisible () {
        return $vm.show
      }
    }

    // all Vux's plugins are included in this.$vup
    if (!vue.$vup) {
      vue.$vup = {
        address
      }
    } else {
      vue.$vup.address = address
    }

    vue.mixin({
      created: function () {
        this.$vup = vue.$vup
      }
    })
  }
}

export default plugin
export const install = plugin.install