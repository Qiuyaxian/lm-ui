<template>
  <button
    :style="buttonStyle"
    class="lm-btn"
    :class="classes"
    :disabled="disabled"
    :type="actionType"
    @click="onClick">
    <i class="lm-loading" v-if="showLoading"></i>
    <slot>{{ text }}</slot>
  </button>
</template>
<script>
import Router from '@/utils/router'
export default {
  name: 'lm-button',
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
          'lm-btn-disabled': !this.plain && this.disabled,
          'lm-btn-plain-disabled': this.plain && this.disabled,
          'lm-btn-mini': this.mini,
          'lm-btn-no-border': this.noBorder
        },
        !this.plain ? `lm-btn-${this.type}` : '',
        this.plain ? `lm-btn-plain-${this.type}` : '',
        this.showLoading ? `lm-btn-loading` : ''
      ]
    }
  }
}
</script>
<style lang="scss">
@import '~@/theme/index.scss';
@import '~@/theme/button.scss';
</style>
