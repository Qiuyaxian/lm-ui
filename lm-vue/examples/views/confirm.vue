<template>
  <vup-wrapper>
    <vup-navbar>confirm</vup-navbar>
    <vup-group>
      <vup-switch title="Toggle" v-model="show"></vup-switch>
    </vup-group>
    <vup-group>
      <vup-switch title="Toggle show-input" v-model="show3"></vup-switch>
    </vup-group>
    <vup-group>
      <vup-switch title="Set default input value" v-model="show5"></vup-switch>
    </vup-group>
    <vup-group>
      <vup-switch title="Toggle_android" v-model="show2"></vup-switch>
    </vup-group>
    <vup-group>
      <vup-switch :title="'closeOnConfirm=false'" v-model="show4"></vup-switch>
    </vup-group>
    <vup-group>
      <vup-switch :title="'showCancelButton=false'" v-model="show6"></vup-switch>
    </vup-group>
    <div v-transfer-dom>
      <vup-confirm v-model="show"
      title="Confirm deleting the item"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
      @on-show="onShow"
      @on-hide="onHide">
        <p style="text-align:center;">Are you sure?</p>
      </vup-confirm>
    </div>
    <br>
    <div v-transfer-dom>
      <vup-confirm v-model="show3"
      show-input
      :title="'Confirm deleting the item'"
      :input-attrs="{type: 'number'}"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
      @on-show="onShow"
      @on-hide="onHide">
      </vup-confirm>
    </div>
    <br>
    <div v-transfer-dom>
      <vup-confirm v-model="show5"
      show-input
      ref="confirm5"
      title="Confirm deleting the item"
      @on-cancel="onCancel"
      @on-confirm="onConfirm5"
      @on-show="onShow5"
      @on-hide="onHide">
      </vup-confirm>
    </div>
    <br>
    <div v-transfer-dom>
      <vup-confirm v-model="show2"
      :title="'Confirm deleting the item'"
      theme="android"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
      @on-show="onShow"
      @on-hide="onHide">
        <p style="text-align:center;">I miss u sunyi</p>
      </vup-confirm>
    </div>
    <br>
    <div v-transfer-dom>
      <vup-confirm
      v-model="show4"
      :close-on-confirm="false"
      :title="'Confirm deleting the item'"
      @on-confirm="onConfirm4">
        <p style="text-align:center;">Are you sure?</p>
      </vup-confirm>
    </div>
    <br>
    <div v-transfer-dom>
      <vup-confirm
      v-model="show6"
      :show-cancel-button="false"
      :title="'Confirm deleting the item'"
      @on-confirm="onConfirm">
        <p style="text-align:center;">Are you sure</p>
      </vup-confirm>
    </div>
    <br>
    <div style="padding:15px;">
      <vup-button @click.native="showPlugin" type="primary">Show</vup-button>
    </div>
    <div style="padding:15px;">
      <vup-button @click.native="showPlugin2" type="primary">Plugin usage</vup-button>
    </div>
    <div style="padding:15px;">
      <vup-button @click.native="showPlugin3" type="primary">Call prompt by using plugin</vup-button>
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
    onCancel () {
      console.log('on cancel')
    },
    onConfirm (msg) {
      console.log('on confirm')
      if (msg) {
        alert(msg)
      }
    },
    onConfirm4 () {
      console.log('on confirm')
      // this.$vux.loading.show({
      //   transition: '',
      //   text: 'processing'
      // })
      // setTimeout(() => {
      //   this.$vux.loading.hide()
      //   this.show4 = false
      // }, 1000)
    },
    onHide () {
      console.log('on hide')
    },
    onShow () {
      console.log('on show')
    },
    onShow5 () {
      // this.$refs.confirm5.setInputValue('default')
    },
    onConfirm5 (value) {
      // this.$refs.confirm5.setInputValue('')
      // this.$vux.toast.text('input value: ' + value)
    },
    showPlugin () {
      this.$vux.confirm.show({
        title: 'Title',
        content: 'Content',
        onShow () {
          console.log('plugin show')
        },
        onHide () {
          console.log('plugin hide')
        },
        onCancel () {
          console.log('plugin cancel')
        },
        onConfirm () {
          console.log('plugin confirm')
        }
      })
    },
    showPlugin2 () {
      this.showPlugin()
    },
    showPlugin3 () {
      // const _this = this
      // this.$vux.confirm.prompt('123', {
      //   title: 'Title',
      //   onShow () {
      //     console.log('promt show')
      //     _this.$vux.confirm.setInputValue('set input value')
      //   },
      //   onHide () {
      //     console.log('prompt hide')
      //   },
      //   onCancel () {
      //     console.log('prompt cancel')
      //   },
      //   onConfirm (msg) {
      //     alert(msg)
      //   }
      // })
    }
  },
  data () {
    return {
      show: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false
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
