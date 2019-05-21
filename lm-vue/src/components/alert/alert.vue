<template>
  <div class="vup-alert">
    <vup-dialog
      v-model="showValue"
      :mask-transition="maskTransition"
      :dialog-transition="dialogTransition"
      :hide-on-blur="hideOnBlur"
      :mask-z-index="maskZIndex"
      @on-hide="$emit('on-hide')"
      @on-show="$emit('on-show')">
      <div class="vup-dialog__hd">
        <strong class="vup-dialog__title">{{ title }}</strong>
      </div>
      <div class="vup-dialog__bd">
        <slot>
          <div v-html="content"></div>
        </slot>
      </div>
      <div class="vup-dialog__ft">
        <a href="javascript:;"
          class="vup-dialog__btn vup-dialog__btn_primary"
          @click="_onHide">{{ buttonText || '确定' }}</a>
      </div>
    </vup-dialog>
  </div>
</template>

<script>
import Dialog from '../dialog/dialog'
export default {
  name: 'vup-alert',
  components: {
    'vup-dialog': Dialog
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
      default: 'vup-mask'
    },
    dialogTransition: {
      type: String,
      default: 'vup-dialog'
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '~@/theme/index.scss';
@import '~@/theme/transition.scss';
@import '~@/theme/mask.scss';
@import '~@/theme/dialog.scss';
</style>
