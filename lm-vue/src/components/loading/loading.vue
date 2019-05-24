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

<style lang="scss">
@import '~@/theme/index.scss';
@import '~@/theme/mask.scss';
@import '~@/theme/toast.scss';
@import '~@/theme/loading.scss';
.blc-loading .blc-toast {
  z-index: $loading-z-index;
}
.blc-loading.weui-icon-toast {
  margin: pxTorem(20, 2) 0 pxTorem(10, 2);
  width: pxTorem(38, 2);
  height: pxTorem(38, 2);
  vertical-align: baseline;
  display: inline-block;
}
.blc-mask-enter, .blc-mask-leave-active,
.blc-mask-leave-active, .blc-mask-enter-active {
  position: relative;
  z-index: 1;
}
.blc-mask-enter, .blc-mask-leave-active {
  opacity: 0;
}
.blc-mask-leave-active, .blc-mask-enter-active {
  transition: opacity 300ms;
}
.blc-loading-no-text .weui-toast {
  min-height: pxTorem(98, 2);
}
</style>