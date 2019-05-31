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
    show: {
      type: Boolean,
      default: false
    },
    maskTransition: {
      type: String,
      default: 'lm-mask'
    },
    maskZIndex: [String, Number],
    dialogTransition: {
      type: String,
      default: 'lm-dialog'
    },
    dialogClass: {
      type: String,
      default: 'lm-dialog'
    },
    hideOnBlur: Boolean,
    dialogStyle: Object,
    scroll: {
      type: Boolean,
      default: true,
      validator (val) {
        /* istanbul ignore if */
        if (process.env.NODE_ENV === 'development' && val === false) {
          console.warn('[VUX warn] x-dialog:scroll 已经废弃。如果你是 100% 布局，请参照文档配置 $layout 以实现阻止滚动')
        }
        return true
      }
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
    shouldPreventScroll () {
      // hard to get focus on iOS device with fixed position, so just ignore it
      const iOS = /iPad|iPhone|iPod/i.test(window.navigator.userAgent)
      const hasInput = this.$el.querySelector('input') || this.$el.querySelector('textarea')
      if (iOS && hasInput) {
        return true
      }
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
