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
  name: 'lm-toast',
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
    if (this.value) {
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
    value (val) {
      if (typeof (val) !== 'undefined') {
        this.show = val;
      }
    }
  }
}
</script>