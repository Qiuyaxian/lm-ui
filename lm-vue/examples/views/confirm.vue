<template>
  <lm-template>
    <lm-navbar>confirm</lm-navbar>
    <lm-group>
      <lm-switch label="Toggle" v-model="show"></lm-switch>
    </lm-group>
    <lm-group>
      <lm-switch label="Toggle show-input" v-model="show3"></lm-switch>
    </lm-group>
    <lm-group>
      <lm-switch label="Set default input value" v-model="show5"></lm-switch>
    </lm-group>
    <lm-group>
      <lm-switch label="Toggle_android" v-model="show2"></lm-switch>
    </lm-group>
    <lm-group>
      <lm-switch :label="'closeOnConfirm=false'" v-model="show4"></lm-switch>
    </lm-group>
    <lm-group>
      <lm-switch :label="'showCancelButton=false'" v-model="show6"></lm-switch>
    </lm-group>
    <div v-transfer-dom>
      <lm-confirm v-model="show"
      label="Confirm deleting the item"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
      @on-show="onShow"
      @on-hide="onHide">
        <p style="text-align:center;">Are you sure?</p>
      </lm-confirm>
    </div>
    <br>
    <div v-transfer-dom>
      <lm-confirm v-model="show3"
      show-input
      :label="'Confirm deleting the item'"
      :input-attrs="{type: 'number'}"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
      @on-show="onShow"
      @on-hide="onHide">
      </lm-confirm>
    </div>
    <br>
    <div v-transfer-dom>
      <lm-confirm v-model="show5"
      show-input
      ref="confirm5"
      label="Confirm deleting the item"
      @on-cancel="onCancel"
      @on-confirm="onConfirm5"
      @on-show="onShow5"
      @on-hide="onHide">
      </lm-confirm>
    </div>
    <br>
    <div v-transfer-dom>
      <lm-confirm v-model="show2"
      :label="'Confirm deleting the item'"
      theme="android"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
      @on-show="onShow"
      @on-hide="onHide">
        <p style="text-align:center;">I miss u sunyi</p>
      </lm-confirm>
    </div>
    <br>
    <div v-transfer-dom>
      <lm-confirm
      v-model="show4"
      :close-on-confirm="false"
      :label="'Confirm deleting the item'"
      @on-confirm="onConfirm4">
        <p style="text-align:center;">Are you sure?</p>
      </lm-confirm>
    </div>
    <br>
    <div v-transfer-dom>
      <lm-confirm
      v-model="show6"
      :show-cancel-button="false"
      :label="'Confirm deleting the item'"
      @on-confirm="onConfirm">
        <p style="text-align:center;">Are you sure</p>
      </lm-confirm>
    </div>
    <br>
    <div style="padding:15px;">
      <lm-button @click.native="showPlugin" type="primary">Show</lm-button>
    </div>
    <div style="padding:15px;">
      <lm-button @click.native="showPlugin2" type="primary">Plugin usage</lm-button>
    </div>
    <div style="padding:15px;">
      <lm-button @click.native="showPlugin3" type="primary">Call prompt by using plugin</lm-button>
    </div>
  </lm-template>
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
      // this.$lm.loading.show({
      //   transition: '',
      //   text: 'processing'
      // })
      // setTimeout(() => {
      //   this.$lm.loading.hide()
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
      // this.$lm.toast.text('input value: ' + value)
    },
    showPlugin () {
      this.$lm.confirm.show({
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
      const _this = this
      this.$lm.confirm.prompt('123', {
        title: 'Title',
        onShow () {
          console.log('promt show')
          _this.$lm.confirm.setInputValue('set input value')
        },
        onHide () {
          console.log('prompt hide')
        },
        onCancel () {
          console.log('prompt cancel')
        },
        onConfirm (msg) {
          alert(msg)
        }
      })
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
  .lm-close {
    margin-top: pxTorem(viewTransform(8));
    margin-bottom: pxTorem(viewTransform(8));
  }
}
</style>
