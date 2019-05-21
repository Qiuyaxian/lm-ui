<template>
  <vup-wrapper>
    <vup-navbar>Dialog</vup-navbar>
    <vup-group>
      <vup-switch v-model="show" title="Toggle"></vup-switch>
      <vup-switch v-model="show2" title="use .sync"></vup-switch>
      <vup-switch v-model="showToast" title="show toast"></vup-switch>
      <vup-switch v-model="showHideOnBlur" title="hide on clicking mask"></vup-switch>
      <vup-switch v-model="showDialogStyle" title="Toggle" inline-desc="custom dialog style"></vup-switch>
    </vup-group>

    <div v-transfer-dom>
      <vup-dialog v-model="showToast" class="dialog-demo">
        <div style="padding:15px;">
          <vup-button @click.native="doShowToast" type="primary">show toast</vup-button>
        </div>
        <div @click="showToast=false">
          <span class="vup-close"></span>
        </div>
      </vup-dialog>
    </div>

    <div v-transfer-dom>
      <vup-dialog v-model="show" class="dialog-demo">
        <div class="img-box">
          <img src="https://ws1.sinaimg.cn/large/663d3650gy1fq6824ur1dj20ia0pydlm.jpg" style="max-width:100%">
        </div>
        <div @click="show=false">
          <span class="vup-close"></span>
        </div>
      </vup-dialog>
    </div>

    <div v-transfer-dom>
      <vup-dialog :show.sync="show2" class="dialog-demo">
        <div class="img-box">
          <img src="https://ws1.sinaimg.cn/large/663d3650gy1fq6824ur1dj20ia0pydlm.jpg" style="max-width:100%">
        </div>
        <div @click="show2=false">
          <span class="vup-close"></span>
        </div>
      </vup-dialog>
    </div>

    <div v-transfer-dom>
      <vup-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
        <div class="img-box">
          <img src="https://ws1.sinaimg.cn/large/663d3650gy1fq6824ur1dj20ia0pydlm.jpg" style="max-width:100%">
        </div>
        <div @click="showHideOnBlur=false">
          <span class="vup-close"></span>
        </div>
      </vup-dialog>
    </div>
    <div v-transfer-dom>
      <vup-dialog
      v-model="showDialogStyle"
      hide-on-blur
      :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
        <p @click="showDialogStyle = false" style="color:#fff;text-align:center;">
          <span style="font-size:30px;">HELLO WORLD</span>
          <br>
          <br>
          <div @click="showDialogStyle = false">
            <vup-icon type="cancel"></vup-icon>
          </div>
        </p>
      </vup-dialog>
    </div>
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
