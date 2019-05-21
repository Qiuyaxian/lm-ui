<template>
  <vup-wrapper>
    <vup-navbar>Icon</vup-navbar>
    <vup-icon type="success"></vup-icon>
    <vup-icon type="info"></vup-icon>
    <vup-icon type="info-circle"></vup-icon>
    <vup-icon type="warn"></vup-icon>
    <vup-icon type="waiting"></vup-icon>
    <vup-icon type="waiting-circle"></vup-icon>
    <vup-icon type="safe-success"></vup-icon>
    <vup-icon type="safe_warn"></vup-icon>
    <vup-icon type="success-circle"></vup-icon>
    <vup-icon type="success-no-circle"></vup-icon>
    <vup-icon type="circle"></vup-icon>
    <vup-icon type="download"></vup-icon>
    <vup-icon type="cancel"></vup-icon>
    <vup-icon type="search"></vup-icon>
    <vup-icon type="clear"></vup-icon>
    <br/>
    <vup-icon type="success" is-msg></vup-icon>
    <vup-icon type="info" is-msg></vup-icon>
    <vup-icon type="warn" is-msg></vup-icon>
    <vup-icon type="waiting" is-msg></vup-icon>
    <vup-icon type="safe_success" is-msg></vup-icon>
    <vup-icon type="safe_warn" is-msg></vup-icon>
  </vup-wrapper>
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
  .vup-close {
    margin-top: pxTorem(viewTransform(8));
    margin-bottom: pxTorem(viewTransform(8));
  }
}
</style>
