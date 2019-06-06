<template>
  <div class="lm-alert">
    <lm-dialog
      v-model="showValue"
      :mask-transition="maskTransition"
      :dialog-transition="dialogTransition"
      :hide-on-blur="hideOnBlur"
      :mask-z-index="maskZIndex"
      @on-hide="$emit('on-hide')"
      @on-show="$emit('on-show')">
      <div class="lm-dialog-header">
        <strong class="lm-dialog-title">{{ title }}</strong>
      </div>
      <div class="lm-dialog-body">
        <slot>
          <div v-html="content"></div>
        </slot>
      </div>
      <div class="lm-dialog-footer">
        <a href="javascript:;"
          class="lm-dialog-btn lm-dialog-btn-primary"
          @click="_onHide">{{ buttonText || '确定' }}</a>
      </div>
    </lm-dialog>
  </div>
</template>
<script>
import Dialog from '../dialog/dialog'
export default {
  name: 'lm-alert',
  components: {
    'lm-dialog': Dialog
  },
  created () {
    if (typeof this.value !== 'undefined') {
      this.showValue = this.value
    }
  },
  props: {
    /**
     * [value 绑定值,实现双向绑定]
     * @type {[type]}
     */
    value: Boolean,
    /**
     * [title 头部文字]
     * @type {[type]}
     */
    title: String,
    /**
     * [content 内容]
     * @type {[type]}
     */
    content: String,
    /**
     * [buttonText 按钮文字]
     * @type {[type]}
     */
    buttonText: String,
    /**
     * [hideOnBlur 是否失去光标就隐藏]
     * @type {Object}
     */
    hideOnBlur: {
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
     * [dialogTransition dialog动画]
     * @type {Object}
     */
    dialogTransition: {
      type: String,
      default: 'lm-dialog'
    },
    /**
     * [maskZIndex dialog 层级]
     * @type {Array}
     */
    maskZIndex: [Number, String]
  },
  data () {
    return {
      showValue: false
    }
  },
  methods: {
    /**
     * [_onHide 内部隐藏函数]
     * @return {[type]} [description]
     */
    _onHide () {
      this.showValue = false
    }
  },
  watch: {
    value (val) {
      this.showValue = val
    },
    showValue (val) {
      this.$emit('input', val)
    }
  }
}
</script>