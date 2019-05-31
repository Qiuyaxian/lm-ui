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
    show: Boolean,
    text: String,
    position: String,
    transition: {
      type: String,
      default: 'blc-mask'
    },
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