<template>
  <lm-template>
    <lm-navbar>Icon</lm-navbar>
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
  </lm-template>
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
<style lang="scss">
@import '~@/theme/index.scss';
@import '~@/theme/close.scss';
.dialog-demo {
  .weui-dialog{
    border-radius: pxTorem(viewTransform(8));
    padding-bottom: pxTorem(viewTransform(8));
  }
  .dialog-title {
    line-height: pxTorem(viewTransform(30));
    color: #666;
  }
  .img-box {
    height: pxTorem(viewTransform(350));
    overflow: hidden;
  }
  .lm-close {
    margin-top: pxTorem(viewTransform(8));
    margin-bottom: pxTorem(viewTransform(8));
  }
}
</style>
