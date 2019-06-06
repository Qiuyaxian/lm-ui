<template>
  <div class="lm-confirm">
    <lm-dialog v-model="showValue"
      :dialog-class="theme === 'android' ? 'lm-dialog lm-skin-android' : 'lm-dialog'"
      :mask-transition="maskTransition"
      :dialog-transition="theme === 'android' ? 'lm-fade' : dialogTransition"
      :hide-on-blur="hideOnBlur"
      :mask-z-index="maskZIndex"
      @on-hide="$emit('on-hide')">
      <div class="lm-dialog-header" v-if="!!title" :class="{'with-no-content': !showContent}">
        <strong class="lm-dialog-title">{{ title }}</strong>
      </div>
      <template v-if="showContent">
        <div class="lm-dialog-body" v-if="!showInput">
          <slot><div v-html="content"></div></slot>
        </div>
        <div v-else class="lm-prompt">
          <input
            class="lm-prompt-msgbox"
            v-bind="getInputAttrs()"
            v-model="msg"
            :placeholder="placeholder"
            @touchend="setInputFocus"
            ref="input"/>
        </div>
      </template>
      <div class="lm-dialog-footer">
        <a v-if="showCancelButton" href="javascript:;" class="lm-dialog-btn lm-dialog-btn-default" @click="_onCancel">{{cancelText || '取消'}}</a>
        <a v-if="showConfirmButton" href="javascript:;" class="lm-dialog-btn" :class="`lm-dialog-btn-${confirmType}`" @click="_onConfirm">{{confirmText || '确定'}}</a>
      </div>
    </lm-dialog>
  </div>
</template>

<script>
import Dialog from '../dialog/dialog'
export default {
  name: 'lm-confirm',
  components: {
    'lm-dialog': Dialog
  },
  props: {
    /**
     * [value 是否显示,使用双向绑定]
     * @type {Object}
     */
    value: {
      type: Boolean,
      default: false
    },
    /**
     * [showInput 是否显示文字输入框]
     * @type {Object}
     */
    showInput: {
      type: Boolean,
      default: false
    },
    /**
     * [placeholder 默认提示]
     * @type {Object}
     */
    placeholder: {
      type: String,
      default: ''
    },
    /**
     * [theme 风格主题]
     * @type {Object}
     */
    theme: {
      type: String,
      default: 'ios'
    },
    /**
     * [hideOnBlur 是否失去焦点后隐藏]
     * @type {Object}
     */
    hideOnBlur: {
      type: Boolean,
      default: false
    },
    /**
     * [title 标题]
     * @type {[type]}
     */
    title: String,
    /**
     * [confirmText 确认文字]
     * @type {[type]}
     */
    confirmText: String,
    cancelText: String,
    /**
     * [maskTransition 取消文字]
     * @type {Object}
     */
    maskTransition: {
      type: String,
      default: 'lm-fade'
    },
    /**
     * [maskZIndex 遮罩层层级]
     * @type {Array}
     */
    maskZIndex: [Number, String],
    /**
     * [dialogTransition dialog 动画]
     * @type {Object}
     */
    dialogTransition: {
      type: String,
      default: 'lm-dialog'
    },
    /**
     * [content 内容]
     * @type {[type]}
     */
    content: String,
    /**
     * [closeOnConfirm 是否开启点击取消关闭弹窗]
     * @type {Object}
     */
    closeOnConfirm: {
      type: Boolean,
      default: true
    },
    /**
     * [inputAttrs input 附加属性]
     * @type {[type]}
     */
    inputAttrs: Object,
    /**
     * [showContent 是否显示content 内容]
     * @type {Object}
     */
    showContent: {
      type: Boolean,
      default: true
    },
    /**
     * [confirmType 确认框样式]
     * @type {Object}
     */
    confirmType: {
      type: String,
      default: 'primary'
    },
    /**
     * [showCancelButton 是否显示取消按钮]
     * @type {Object}
     */
    showCancelButton: {
      type: Boolean,
      default: true
    },
    /**
     * [showConfirmButton 是否显示确定按钮]
     * @type {Object}
     */
    showConfirmButton: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.showValue = this.show;
    if (this.value) this.showValue = this.value;
  },
  watch: {
    value (val) {
      this.showValue = val
    },
    showValue (val) {
      this.$emit('input', val)
      if (val) {
        if (this.showInput) {
          this.msg = '';
          let timer = setTimeout(() => {
            if (this.$refs.input) {
              this.setInputFocus()
            }
            clearTimeout(timer);
          }, 300)
        }
        this.$emit('on-show') // emit just after msg is cleared
      }
    }
  },
  data () {
    return {
      msg: '',
      showValue: false
    }
  },
  methods: {
    /**
     * [getInputAttrs 设置输入框属性]
     * @return {[type]} [description]
     */
    getInputAttrs () {
      return this.inputAttrs || {
        type: 'text'
      }
    },
    /**
     * [setInputValue 设置input值]
     * @param {[type]} val [description]
     */
    setInputValue (val) {
      this.msg = val
    },
    /**
     * [setInputFocus input是否获取光标]
     * @param {[type]} evt [description]
     */
    setInputFocus (evt) {
      if (evt) evt.preventDefault();
      this.$refs.input.focus()
    },
    /**
     * [_onConfirm 绑定确定按钮事件]
     * @return {[type]} [description]
     */
    _onConfirm () {
      if (!this.showValue) return;
      if (this.closeOnConfirm) this.showValue = false;
      this.$emit('on-confirm', this.msg)
    },
    /**
     * [_onCancel 绑定取消按钮事件]
     * @return {[type]} [description]
     */
    _onCancel () {
      if (!this.showValue) return;
      this.showValue = false
      this.$emit('on-cancel')
    }
  }
}
</script>