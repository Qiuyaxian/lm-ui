<template>
  <div class="vup-toast-wrapper">
    <div class="vup-mask_transparent" v-show="isShowMask && show"></div>
    <transition :name="currentTransition">
      <div class="vup-toast" :style="{width: toastWidth }" :class="toastClass" v-show="show">
        <i class="weui-icon-success-no-circle vup-icon_toast" v-show="type !== 'text'"></i>
        <p class="vup-toast__content" v-if="text" :style="style" v-html="text"></p>
        <p class="vup-toast__content" v-else :style="style">
          <slot></slot>
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
import { safariFixMixin } from '@/mixins'
import { pxTorem, viewTransform } from '@/utils'
export default {
  name: 'toast',
  mixins: [ safariFixMixin ],
  props: {
    value: Boolean,
    time: {
      type: Number,
      default: 2000
    },
    type: {
      type: String,
      default: 'success'
    },
    transition: String,
    width: {
      type: [Number, String],
      default: '230'
    },
    isShowMask: {
      type: Boolean,
      default: false
    },
    text: String,
    position: {
      type: String,
      default: 'middle'
    }
  },
  data () {
    return {
      show: false
    }
  },
  created () {
    if (this.value) {
      this.show = true
    }
  },
  computed: {
    currentTransition () {
      if (this.transition) {
        return this.transition
      }
      if (this.position === 'top') {
        return 'vup-slide-from-top'
      }
      if (this.position === 'bottom') {
        return 'vup-slide-from-bottom'
      }
      return 'vup-fade'
    },
    toastClass () {
      return {
        'weui-toast_forbidden': this.type === 'warn',
        'weui-toast_cancel': this.type === 'cancel',
        'weui-toast_success': this.type === 'success',
        'vup-toast_text': this.type === 'text',
        'vup-toast-top': this.position === 'top',
        'vup-toast-bottom': this.position === 'bottom',
        'vup-toast-middle': this.position === 'middle'
      }
    },
    toastWidth () {
      return typeof (this.width) === 'number' ? pxTorem(this.width) : this.width
    },
    style () {
      if (this.type === 'text' && this.width === 'auto') {
        return { padding: pxTorem(viewTransform(10)) }
      }
    }
  },
  watch: {
    show (val) {
      if (val) {
        this.$emit('input', true)
        this.$emit('on-show')
        this.fixSafariOverflowScrolling('auto')
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.show = false
          this.$emit('input', false)
          this.$emit('on-hide')
          this.fixSafariOverflowScrolling('touch')
        }, this.time)
      }
    },
    value (val) {
      this.show = val
    }
  }
}
</script>

<style lang="scss">
@import '~@/theme/index.scss';
@import '~@/theme/transition.scss';
@import '~@/theme/iconfont.scss';
@import '~@/theme/mask.scss';
@import '~@/theme/toast.scss';
.vup-toast.vup-toast-top {
  top: $toast-position-top-offset;
}
.vup-toast.vup-toast-bottom {
  top: auto;
  bottom: $toast-position-bottom-offset;
  transform: translateX(-50%);
}
.vup-toast.vup-toast-middle {
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.vup-slide-from-top-enter, .vup-slide-from-top-leave-active {
  opacity: 0;
  transform: translateX(-50%) translateY(-100%)!important;
}
.vup-slide-from-bottom-enter, .vup-slide-from-bottom-leave-active {
  opacity: 0;
  transform: translateX(-50%) translateY(100%)!important;
}
.vup-slide-from-top-enter-active,
.vup-slide-from-top-leave-active,
.vup-slide-from-bottom-enter-active,
.vup-slide-from-bottom-leave-active {
  transition: all 400ms cubic-bezier(.36,.66,.04,1);
}
.vup-toast {
  transform: translateX(-50%);
  margin-left: 0!important;
}
.vup-toast.weui-toast_forbidden {
  color: #F76260;
}
.vup-toast.weui-toast_forbidden {
  .vup-toast__content {
    margin-top: pxTorem(viewTransform(10));
  }
}
.vup-toast.vup-toast_text{
  min-height: 0;
}
.vup-toast_text {
  .vup-toast__content {
    margin: 0;
    padding-top: pxTorem(viewTransform(10));
    padding-bottom: pxTorem(viewTransform(10));
    border-radius: pxTorem(viewTransform(15));
  }
}
.vup-toast__content {
  font-size: $toast-content-font-size;
}
.weui-loading_toast {
  .vup-toast__content {
    margin-top: 0;
  }
}
.weui-toast_success {
  .vup-icon_toast:before {
    content: "\EA08";
  }
}
.weui-toast_cancel {
  .vup-icon_toast:before {
    content: "\EA0D";
  }
}
.weui-toast_forbidden {
  .vup-icon_toast.weui-icon-success-no-circle:before {
    content: "\EA0B";
    color: #F76260;
  }
}
</style>