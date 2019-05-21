<template>
  <div
    class="vup-x-dialog"
    :class="{'vup-dialog-absolute': layout === 'PAGE_VIEW'}">
    <transition :name="maskTransition">
      <div class="vup-mask" @click="hide" v-show="show" :style="maskStyle"></div>
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
  name: 'vup-dialog',
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
      default: 'vup-mask'
    },
    maskZIndex: [String, Number],
    dialogTransition: {
      type: String,
      default: 'vup-dialog'
    },
    dialogClass: {
      type: String,
      default: 'vup-dialog'
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
      if (window.VUP_CONFIG && window.VUP_CONFIG.$layout === 'PAGE_VIEW') {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '~@/theme/index.scss';
@import '~@/theme/modal.scss';
@import '~@/theme/transition.scss';
@import '~@/theme/mask.scss';
@import '~@/theme/dialog.scss';

.#{ $class-prefix } {
  &-dialog-absolute {
    .#{ $class-prefix }-dialog {
      position: absolute
    }
  }
}
</style>
