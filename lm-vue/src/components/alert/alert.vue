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
    value: Boolean,
    title: String,
    content: String,
    buttonText: String,
    hideOnBlur: {
      type: Boolean,
      default: false
    },
    maskTransition: {
      type: String,
      default: 'lm-mask'
    },
    dialogTransition: {
      type: String,
      default: 'lm-dialog'
    },
    maskZIndex: [Number, String]
  },
  data () {
    return {
      showValue: false
    }
  },
  methods: {
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