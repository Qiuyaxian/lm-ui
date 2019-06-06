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
    /**
     * [type 按钮类型]
     * @type {Object}
     */
    type: {
      default: 'default'
    },
    /**
     * [disabled 是否禁用]
     * @type {[type]}
     */
    disabled: Boolean,
    /**
     * [mini 是否使用mini迷你]
     * @type {[type]}
     */
    mini: Boolean,
    /**
     * [plain 是否镂空]
     * @type {[type]}
     */
    plain: Boolean,
    /**
     * [text 文字]
     * @type {[type]}
     */
    text: String,
    /**
     * [actionType 点击后的背景颜色类型]
     * @type {[type]}
     */
    actionType: String,
    /**
     * [showLoading 是否显示loading加载]
     * @type {[type]}
     */
    showLoading: Boolean,
    /**
     * [link 链接地址]
     * @type {Array}
     */
    link: [String, Object],
    /**
     * [gradients 按钮背景渐变，长度必须为2 ]
     * @type {Object}
     */
    gradients: {
      type: Array,
      validator: function (val) {
        return val.length === 2
      }
    }
  },
  methods: {
    onClick () {
      !this.disabled && Router.go && Router.go(this.link, this.$router)
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
