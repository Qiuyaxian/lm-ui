<template>
  <div class="lm-toast-wrapper">
    <div class="lm-mask-transparent" v-show="isShowMask && show"></div>
    <transition :name="currentTransition">
      <div class="lm-toast" :style="{width: toastWidth }" :class="toastClass" v-show="show">
        <i class="weui-icon-success-no-circle lm-toast-icon" v-show="type !== 'text'"></i>
        <p class="lm-toast-content" v-if="text" :style="style" v-html="text"></p>
        <p class="lm-toast-content" v-else :style="style">
          <slot></slot>
        </p>
      </div>
    </transition>
  </div>
</template>
<script>
import { safariFixMixin } from '@/mixins'
import { pxTorem } from '@/utils'
export default {
  name: 'toast',
  mixins: [ safariFixMixin ],
  props: {
    visible: Boolean,
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
      default: 230
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
    if (this.visible) {
      this.show = true;
    }
  },
  computed: {
    currentTransition () {
      if (this.transition) {
        return this.transition
      }
      if (this.position === 'top') {
        return 'lm-slide-from-top'
      }
      if (this.position === 'bottom') {
        return 'lm-slide-from-bottom'
      }
      return 'lm-fade'
    },
    toastClass () {
      return {
        'weui-toast_error': this.type === 'error',
        'weui-toast_cancel': this.type === 'cancel',
        'weui-toast_success': this.type === 'success',
        'weui-toast_warn': this.type === 'warn',
        'lm-toast_text': this.type === 'text',
        'lm-toast-top': this.position === 'top',
        'lm-toast-bottom': this.position === 'bottom',
        'lm-toast-middle': this.position === 'middle'
      }
    },
    toastWidth () {
      return typeof (this.width) === 'number' ? pxTorem(this.width) : this.width
    },
    style () {
      if (this.type === 'text' && this.width === 'auto') {
        return { padding: pxTorem(10, 2) }
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
          this.show = false;
          this.$emit('input', false);
          this.$emit('on-hide');
          this.fixSafariOverflowScrolling('touch')
        }, this.time);
      }
    },
    visible (val) {
      if (typeof (val) !== 'undefined') {
        this.show = val;
      }
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
.lm-toast.lm-toast-top {
  top: $toast-position-top-offset;
}
.lm-toast.lm-toast-bottom {
  top: auto;
  bottom: $toast-position-bottom-offset;
  transform: translateX(-50%);
}
.lm-toast.lm-toast-middle {
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.lm-slide-from-top-enter, .lm-slide-from-top-leave-active {
  opacity: 0;
  transform: translateX(-50%) translateY(-100%)!important;
}
.lm-slide-from-bottom-enter, .lm-slide-from-bottom-leave-active {
  opacity: 0;
  transform: translateX(-50%) translateY(100%)!important;
}
.lm-slide-from-top-enter-active,
.lm-slide-from-top-leave-active,
.lm-slide-from-bottom-enter-active,
.lm-slide-from-bottom-leave-active {
  transition: all 400ms cubic-bezier(.36,.66,.04,1);
}
.lm-toast {
  transform: translateX(-50%);
  margin-left: 0!important;
}
.lm-toast.weui-toast_error {
  color: #F76260;
}
.lm-toast.weui-toast_warn {
  color: #ecad4d;
}
.lm-toast.lm-toast_text{
  min-height: 0;
}
.lm-toast_text {
  .lm-toast-content {
    margin: 0;
    padding-top: pxTorem(10, 2);
    padding-bottom: pxTorem(10, 2);
    border-radius: pxTorem(15, 2);
  }
}
.lm-toast-content {
  font-size: $toast-content-font-size;
}
.weui-loading-toast {
  .lm-toast-content {
    margin-top: 0;
  }
}
.weui-toast_success {
  .lm-toast-icon:before {
    content: "\EA08";
  }
}
.weui-toast_cancel {
  .lm-toast-icon:before {
    content: "\EA0D";
  }
}
.weui-toast_warn {
  .lm-toast-icon.weui-icon-success-no-circle:before {
    content: "\EA05";
    color: #ecad4d;
  }
}
.weui-toast_error {
  .lm-toast-icon.weui-icon-success-no-circle:before {
    content: "\EA0B";
    color: #F76260;
  }
}
</style>