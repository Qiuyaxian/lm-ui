<template>
  <transition :name="transition">
    <div
      class="blc-loading-toast blc-loading-wrapper"
      :class="!text ? 'blc-loading-no-text' : ''"
      v-show="show">
      <div class="blc-mask-transparent"></div>
      <div
        class="blc-toast"
        :class="loadingClass"
        :style="{
          position: position
        }">
        <i class="blc-loading weui-icon-toast"></i>
        <p class="blc-toast-content" v-if="text">{{ text || '加载中...' }}<slot></slot></p>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'lm-loading',
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    /**
     * [show 是否显示]
     * @type {[type]}
     */
    show: Boolean,
    /**
     * [text 加载文字]
     * @type {[type]}
     */
    text: String,
    /**
     * [position 显示位置]
     * @type {[type]}
     */
    position: String,
    /**
     * [transition 动画]
     * @type {Object}
     */
    transition: {
      type: String,
      default: 'blc-mask'
    },
    /**
     * [align 对齐方式]
     * @type {Object}
     */
    align: {
      type: String,
      default: 'middle'
    }
  },
  computed: {
    loadingClass () {
      return {
        'blc-toast-top': this.align === 'top',
        'blc-toast-bottom': this.align === 'bottom',
        'blc-toast-middle': this.align === 'middle'
      }
    }
  },
  watch: {
    show (val) {
      this.$emit('update:show', val)
    }
  }
}
</script>