<template>
  <transition :name="`lm-popup-animate-${position}`">
    <div
      v-show="show && !initialShow"
      :style="styles"
      class="lm-popup-dialog"
      :class="[`lm-popup-${position}`, show ? 'lm-popup-show' : '']">
        <slot v-if="shouldRenderBody"></slot>
    </div>
  </transition>
</template>

<script>
import Popuper from './popuper'
import { addClass, removeClass } from '@/utils'
export default {
  name: 'lm-popup',
  props: {
    /**
     * [value 是否显示]
     * @type {[type]}
     */
    value: Boolean,
    /**
     * [height 设置popup高度]
     * @type {Object}
     */
    height: {
      type: String,
      default: 'auto'
    },
    /**
     * [width 宽度]
     * @type {Object}
     */
    width: {
      type: String,
      default: 'auto'
    },
    /**
     * [showMask 是否显示遮罩层]
     * @type {Object}
     */
    showMask: {
      type: Boolean,
      default: true
    },
    /**
     * [isTransparent 是否背景透明]
     * @type {Boolean}
     */
    isTransparent: Boolean,
    /**
     * [hideOnBlur 是否失去光标隐藏]
     * @type {Object}
     */
    hideOnBlur: {
      type: Boolean,
      default: true
    },
    /**
     * [position 弹出位置]
     * @type {Object}
     */
    position: {
      type: String,
      default: 'bottom'
    },
    /**
     * [maxHeight 最大高度]
     * @type {[type]}
     */
    maxHeight: String,
    /**
     * [popupStyle popup行内样式]
     * @type {[type]}
     */
    popupStyle: Object,
    /**
     * [是否在 deactived 事件触发时自动关闭，避免在路由切换时依然显示弹窗  ]
     * @type {Object}
     */
    hideOnDeactivated: {
      type: Boolean,
      default: true
    },
    /**
     * [shouldRerenderOnShow 是否在显示时重新渲染内容区域(以及滚动到顶部)，适用于每次显示弹窗需要重新获取数据初始化的场景]
     * @type {Object}
     */
    shouldRerenderOnShow: {
      type: Boolean,
      default: false
    },
    /**
     * [shouldScrollTopOnShow 是否在显示时自动滚动到顶部]
     * @type {Object}
     */
    shouldScrollTopOnShow: {
      type: Boolean,
      default: false
    }
  },
  created () {
    // get global layout config
    if (this.$lm && this.$lm.config && this.$lm.config.$layout === 'PAGE_VIEW') {
      this.layout = 'PAGE_VIEW'
    }
  },
  mounted () {
    this.$overflowScrollingList = document.querySelectorAll('.lm-fix-safari-overflow-scrolling')
    this.$nextTick(() => {
      const _this = this;
      this.popup = new Popuper({
        showMask: _this.showMask,
        container: _this.$el,
        hideOnBlur: _this.hideOnBlur,
        onOpen () {
          _this.fixSafariOverflowScrolling('auto')
          _this.show = true
        },
        onClose () {
          _this.show = false

          if (window.__$lmPopups && Object.keys(window.__$lmPopups).length > 1) return
          if (document.querySelector('.lm-popup-dialog.lm-popup-mask-disabled')) return
          setTimeout(() => {
            _this.fixSafariOverflowScrolling('touch')
          }, 300)
        }
      })
      if (this.value) {
        this.popup.show()
      }
      this.initialShow = false
    })
  },
  deactivated () {
    if (this.hideOnDeactivated) {
      this.show = false
    }
    this.removeModalClassName()
  },
  methods: {
    /**
    * https://github.com/airyland/vux/issues/311
    * https://benfrain.com/z-index-stacking-contexts-experimental-css-and-ios-safari/
    */
    fixSafariOverflowScrolling (type) {
      if (!this.$overflowScrollingList.length) return
      // if (!/iphone/i.test(navigator.userAgent)) return
      for (let i = 0; i < this.$overflowScrollingList.length; i++) {
        this.$overflowScrollingList[i].style.webkitOverflowScrolling = type
      }
    },
    /**
     * [removeModalClassName 移除样式]
     * @return {[type]} [description]
     */
    removeModalClassName () {
      this.layout === 'PAGE_VIEW' && removeClass(document.body, 'lm-modal-open')
    },
    /**
     * [doShow 显示]
     * @return {[type]} [description]
     */
    doShow () {
      this.popup && this.popup.show()
      this.$emit('on-show')
      this.fixSafariOverflowScrolling('auto')
      this.layout === 'PAGE_VIEW' && addClass(document.body, 'lm-modal-open')
      if (!this.hasFirstShow) {
        this.$emit('on-first-show')
        this.hasFirstShow = true
      }
    },
    /**
     * [scrollTop 滚动到顶部]
     * @return {[type]} [description]
     */
    scrollTop () {
      this.$nextTick(() => {
        this.$el.scrollTop = 0
        const box = this.$el.querySelectorAll('.lm-scrollable')
        if (box.length) {
          for (let i = 0; i < box.length; i++) {
            box[i].scrollTop = 0
          }
        }
      })
    }
  },
  data () {
    return {
      layout: '',
      initialShow: true,
      hasFirstShow: false,
      shouldRenderBody: true,
      show: this.value
    }
  },
  computed: {
    styles () {
      const styles = {}
      if (!this.position || this.position === 'bottom' || this.position === 'top') {
        styles.height = this.height
      } else {
        styles.width = this.width
      }
      if (this.maxHeight) {
        styles['max-height'] = this.maxHeight
      }
      this.isTransparent && (styles['background'] = 'transparent')
      if (this.popupStyle) {
        for (let i in this.popupStyle) {
          styles[i] = this.popupStyle[i]
        }
      }
      return styles
    }
  },
  watch: {
    value (val) {
      this.show = val
    },
    show (val) {
      this.$emit('input', val)
      if (val) {
        // rerender body
        if (this.shouldRerenderOnShow) {
          this.shouldRenderBody = false
          this.$nextTick(() => {
            this.scrollTop()
            this.shouldRenderBody = true
            this.doShow()
          })
        } else {
          if (this.shouldScrollTopOnShow) {
            this.scrollTop()
          }
          this.doShow()
        }
      } else {
        this.$emit('on-hide')
        this.show = false
        this.popup.hide(false)
        setTimeout(() => {
          if (!document.querySelector('.lm-popup-dialog.lm-popup-show')) {
            this.fixSafariOverflowScrolling('touch')
          }
          this.removeModalClassName()
        }, 200)
      }
    }
  },
  beforeDestroy () {
    this.popup && this.popup.destroy()
    this.fixSafariOverflowScrolling('touch')
    this.removeModalClassName()
  }
}
</script>