import objectAssign from 'object-assign';
import Actionsheet from '../../components/actionsheet/index.js';
import { mergeOptions } from '@/utils/plugin_helper';
let $vm
let watcher
const plugin = {
  install (vue, pluginOptions = {}) {
    const ActionsheetComponent = vue.extend(Actionsheet);
    if (!$vm) {
      $vm = new ActionsheetComponent({
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

    const actionsheet = {
      show (options = {}) {
        // destroy watcher
        watcher && watcher()
        if (typeof options === 'string') {
          mergeOptions($vm, objectAssign({}, pluginOptions, { text: options }))
        } else if (typeof options === 'object') {
          mergeOptions($vm, objectAssign({}, pluginOptions, options))
        }
        if (typeof options === 'object') {
          watcher = $vm.$watch('show', (val) => {
            // val === false && options.onClickMenu && options.onClickMenu($vm)
          })
          /**
           * 绑定事件
           */
          $vm.$off('on-click-mask');
          $vm.$on('on-click-mask', () => {
            options && options.onClickMask && options.onClickMask();
          });
          $vm.$off('on-click-menu');
          $vm.$on('on-click-menu', (value, text) => {
            options && options.onClickMenu && options.onClickMenu(value, text);
          });
          $vm.$off('on-after-show');
          $vm.$on('on-after-show', () => {
            options && options.onAfterShow && options.onAfterShow();
          });
          $vm.$off('on-after-hide');
          $vm.$on('on-after-hide', () => {
            options && options.onAfterHide && options.onAfterHide();
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

    // all Vux's plugins are included in this.$lm
    if (!vue.$lm) {
      vue.$lm = {
        actionsheet
      }
    } else {
      vue.$lm.actionsheet = actionsheet
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