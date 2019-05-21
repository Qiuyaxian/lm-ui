<template>
  <button
    :style="buttonStyle"
    class="vup-btn"
    :class="classes"
    :disabled="disabled"
    :type="actionType"
    @click="onClick">
    <i class="vup-loading" v-if="showLoading"></i>
    <slot>{{ text }}</slot>
  </button>
</template>
<script>
import Router from '@/utils/router'
export default {
  name: 'vup-button',
  props: {
    type: {
      default: 'default'
    },
    disabled: Boolean,
    mini: Boolean,
    plain: Boolean,
    text: String,
    actionType: String,
    showLoading: Boolean,
    link: [String, Object],
    gradients: {
      type: Array,
      validator: function (val) {
        return val.length === 2
      }
    }
  },
  methods: {
    onClick () {
      !this.disabled && Router.go(this.link, this.$router)
    }
  },
  computed: {
    noBorder () {
      return Array.isArray(this.gradients)
    },
    buttonStyle () {
      if (this.gradients) {
        return {
          background: `linear-gradient(90deg, ${this.gradients[0]}, ${this.gradients[1]})`,
          color: '#FFFFFF'
        }
      }
    },
    classes () {
      return [
        {
          'vup-btn_disabled': !this.plain && this.disabled,
          'vup-btn_plain-disabled': this.plain && this.disabled,
          'vup-btn_mini': this.mini,
          'vup-btn-no-border': this.noBorder
        },
        !this.plain ? `vup-btn_${this.type}` : '',
        this.plain ? `vup-btn_plain-${this.type}` : '',
        this.showLoading ? `vup-btn_loading` : ''
      ]
    }
  }
}
</script>
<style lang="scss">
@import '~@/theme/index.scss';
@import '~@/theme/button.scss';
</style>
