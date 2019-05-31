<template>
  <lm-page>
    <lm-header>Icon</lm-header>
    <lm-icon type="success"></lm-icon>
    <lm-icon type="info"></lm-icon>
    <lm-icon type="info-circle"></lm-icon>
    <lm-icon type="warn"></lm-icon>
    <lm-icon type="waiting"></lm-icon>
    <lm-icon type="waiting-circle"></lm-icon>
    <lm-icon type="safe-success"></lm-icon>
    <lm-icon type="safe_warn"></lm-icon>
    <lm-icon type="success-circle"></lm-icon>
    <lm-icon type="success-no-circle"></lm-icon>
    <lm-icon type="circle"></lm-icon>
    <lm-icon type="download"></lm-icon>
    <lm-icon type="cancel"></lm-icon>
    <lm-icon type="search"></lm-icon>
    <lm-icon type="clear"></lm-icon>
    <br/>
    <lm-icon type="success" is-msg></lm-icon>
    <lm-icon type="info" is-msg></lm-icon>
    <lm-icon type="warn" is-msg></lm-icon>
    <lm-icon type="waiting" is-msg></lm-icon>
    <lm-icon type="safe_success" is-msg></lm-icon>
    <lm-icon type="safe_warn" is-msg></lm-icon>
  </lm-page>
</template>
<script>
import TransferDom from '@/directives/transfer-dom'
export default {
  directives: {
    TransferDom
  },
  methods: {
    doShowToast () {
      // this.$vux.toast.show({
      //   text: 'toast'
      // })
    }
  },
  data () {
    return {
      show: false,
      show2: false,
      showToast: false,
      showHideOnBlur: false,
      showScrollBox: false,
      showDialogStyle: false
    }
  }
}
</script>