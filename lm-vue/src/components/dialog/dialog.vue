<template>
  <div
    class="lm-dialog-wrapper"
    :class="{'lm-dialog-absolute': layout === 'PAGE_VIEW'}">
    <transition :name="maskTransition">
      <div class="lm-mask" @click="hide" v-show="show" :style="maskStyle"></div>
    </transition>
    <transition :name="dialogTransition">
      <div :class="dialogClass" v-show="show" :style="dialogStyle">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { preventBodyScrollMixin } from '@/mixins'
export default {
  name: 'lm-dialog',
  mixins: [preventBodyScrollMixin],
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    /**
     * [show 是否显示]
     * @type {Object}
     */
    show: {
      type: Boolean,
      default: false
    },
    /**
     * [maskTransition 遮罩层动画]
     * @type {Object}
     */
    maskTransition: {
      type: String,
      default: 'lm-mask'
    },
    /**
     * [maskTransition 遮罩层层级]
     * @type {Object}
     */
    maskZIndex: [String, Number],
    /**
     * [dialogTransition dialog动画]
     * @type {Object}
     */
    dialogTransition: {
      type: String,
      default: 'lm-dialog'
    },
    /**
     * [dialogClass dialog样式]
     * @type {Object}
     */
    dialogClass: {
      type: String,
      default: 'lm-dialog'
    },
    /**
     * [hideOnBlur 是否失去光标后隐藏]
     * @type {[type]}
     */
    hideOnBlur: Boolean,
    /**
     * [dialogStyle dialog行内样式]
     * @type {[type]}
     */
    dialogStyle: Object,
    /**
     * [scroll 是否允许滚动]
     * @type {Object}
     */
    scroll: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    maskStyle () {
      if (typeof this.maskZIndex !== 'undefined') {
        return {
          zIndex: this.maskZIndex
        }
      }
    }
  },
  mounted () {
    if (typeof window !== 'undefined') {
      if (window.LM_CONFIG && window.LM_CONFIG.$layout === 'PAGE_VIEW') {
        this.layout = 'PAGE_VIEW'
      }
    }
  },
  watch: {
    show (val) {
      this.$emit('update:show', val)
      this.$emit(val ? 'on-show' : 'on-hide')
      if (val) {
        this.addModalClassName()
      } else {
        this.removeModalClassName()
      }
    }
  },
  methods: {
    /**
     * [shouldPreventScroll 是否阻止滚动]
     * @return {[type]} [description]
     */
    shouldPreventScroll () {
      const iOS = /iPad|iPhone|iPod/i.test(window.navigator.userAgent)
      const hasInput = this.$el.querySelector('input') || this.$el.querySelector('textarea')
      if (iOS && hasInput) return true;
    },
    hide () {
      if (this.hideOnBlur) {
        this.$emit('update:show', false)
        this.$emit('change', false)
        this.$emit('on-click-mask')
      }
    }
  },
  data () {
    return {
      layout: ''
    }
  }
}
</script>
