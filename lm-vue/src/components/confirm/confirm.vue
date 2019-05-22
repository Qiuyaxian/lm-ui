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
    value: {
      type: Boolean,
      default: false
    },
    showInput: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'ios'
    },
    hideOnBlur: {
      type: Boolean,
      default: false
    },
    title: String,
    confirmText: String,
    cancelText: String,
    maskTransition: {
      type: String,
      default: 'lm-fade'
    },
    maskZIndex: [Number, String],
    dialogTransition: {
      type: String,
      default: 'lm-dialog'
    },
    content: String,
    closeOnConfirm: {
      type: Boolean,
      default: true
    },
    inputAttrs: Object,
    showContent: {
      type: Boolean,
      default: true
    },
    confirmType: {
      type: String,
      default: 'primary'
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.showValue = this.show
    if (this.value) {
      this.showValue = this.value
    }
  },
  watch: {
    value (val) {
      this.showValue = val
    },
    showValue (val) {
      this.$emit('input', val)
      if (val) {
        if (this.showInput) {
          this.msg = ''
          setTimeout(() => {
            if (this.$refs.input) {
              this.setInputFocus()
            }
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
    getInputAttrs () {
      return this.inputAttrs || {
        type: 'text'
      }
    },
    setInputValue (val) {
      this.msg = val
    },
    setInputFocus (evt) {
      if (evt) {
        evt.preventDefault()
      }
      this.$refs.input.focus()
    },
    _onConfirm () {
      if (!this.showValue) {
        return
      }
      if (this.closeOnConfirm) {
        this.showValue = false
      }
      this.$emit('on-confirm', this.msg)
    },
    _onCancel () {
      if (!this.showValue) {
        return
      }
      this.showValue = false
      this.$emit('on-cancel')
    }
  }
}
</script>

<style lang="scss">
@import '~@/theme/index.scss';
.lm-prompt {
  padding-bottom: 1.6em;
}
.lm-prompt-msgbox {
  width: 80%;
  border: 1px solid #dedede;
  border-radius: pxTorem(viewTransform(5));
  padding: pxTorem(viewTransform(4)) pxTorem(viewTransform(5));
  appearance: none;
  outline: none;
  font-size: pxTorem(viewTransform(16));
}
</style>