<template>
  <transition :name="`vup-popup-animate-${position}`">
    <div
      v-show="show && !initialShow"
      :style="styles"
      class="vup-popup-dialog"
      :class="[`vup-popup-${position}`, show ? 'vup-popup-show' : '']">
        <slot v-if="shouldRenderBody"></slot>
    </div>
  </transition>
</template>

<script>
import Popuper from './popuper'
import { addClass, removeClass } from '@/utils'
export default {
  name: 'popup',
  props: {
    value: Boolean,
    height: {
      type: String,
      default: 'auto'
    },
    width: {
      type: String,
      default: 'auto'
    },
    showMask: {
      type: Boolean,
      default: true
    },
    isTransparent: Boolean,
    hideOnBlur: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'bottom'
    },
    maxHeight: String,
    popupStyle: Object,
    hideOnDeactivated: {
      type: Boolean,
      default: true
    },
    shouldRerenderOnShow: {
      type: Boolean,
      default: false
    },
    shouldScrollTopOnShow: {
      type: Boolean,
      default: false
    }
  },
  created () {
    // get global layout config
    if (this.$vup && this.$vup.config && this.$vup.config.$layout === 'PAGE_VIEW') {
      this.layout = 'PAGE_VIEW'
    }
  },
  mounted () {
    this.$overflowScrollingList = document.querySelectorAll('.vup-fix-safari-overflow-scrolling')
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
          if (window.__$vupPopups && Object.keys(window.__$vupPopups).length > 1) return
          if (document.querySelector('.vup-popup-dialog.vup-popup-mask-disabled')) return
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
    removeModalClassName () {
      this.layout === 'PAGE_VIEW' && removeClass(document.body, 'vup-modal-open')
    },
    doShow () {
      this.popup && this.popup.show()
      this.$emit('on-show')
      this.fixSafariOverflowScrolling('auto')
      this.layout === 'PAGE_VIEW' && addClass(document.body, 'vup-modal-open')
      if (!this.hasFirstShow) {
        this.$emit('on-first-show')
        this.hasFirstShow = true
      }
    },
    scrollTop () {
      this.$nextTick(() => {
        this.$el.scrollTop = 0
        const box = this.$el.querySelectorAll('.vup-scrollable')
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
          if (!document.querySelector('.vup-popup-dialog.vup-popup-show')) {
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
<style lang="scss">
/*@import '~@/styles/index.scss';*/
@import '~@/theme/function.scss';
@import '~@/theme/variables.scss';
@import '~@/theme/modal.scss';
.#{ $class-prefix } {
  &-popup-dialog {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: $popup-background-color;
    z-index: 501;
    transition-property: transform;
    transition-duration: 300ms;
    max-height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  /*&-popup-dialog.#{ $class-prefix }-popup-show {
    transform: translate(0, 100%);
  }*/
  &-popup-dialog.#{ $class-prefix }-popup-left {
    width: auto;
    height: 100%;
    top: 0;
    right: auto;
    bottom: auto;
    left: 0;
  }
  &-popup-dialog.#{ $class-prefix }-popup-right {
    width: auto;
    height: 100%;
    top: 0;
    right: 0;
    bottom: auto;
    left: auto;
  }
  &-popup-dialog.#{ $class-prefix }-popup-top {
    width: 100%;
    top: 0;
    right: auto;
    bottom: auto;
    left: 0;
  }
  &-popup-mask {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    tap-highlight-color: rgba(0,0,0,0);
    z-index: -1;
    transition: opacity 400ms;
  }
  &-popup-mask.#{ $class-prefix }-popup-show {
    opacity: 1;
  }
  &-popup-animate-bottom-enter,
  &-popup-animate-bottom-leave-active {
    transform: translate3d(0, 100%, 0);
  }
  &-popup-animate-left-enter,
  &-popup-animate-left-leave-active {
    transform: translate3d(-100%, 0, 0);
  }
  &-popup-animate-right-enter,
  &-popup-animate-right-leave-active {
    transform: translate3d(100%, 0, 0);
  }
  &-popup-animate-top-enter,
  &-popup-animate-top-leave-active {
    transform: translate3d(0, -100%, 0);
  }
}
</style>