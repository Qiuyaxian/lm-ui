<template>
  <lm-template>
    <lm-navbar>Actionsheet</lm-navbar>
    <lm-group>
      <lm-switch :title="'Basic Usage'" v-model="show1"></lm-switch>
      <lm-switch :title="'Android Theme'" v-model="show7"></lm-switch>
      <lm-switch :title="'Show cancel menu'" v-model="show2"></lm-switch>
      <lm-switch :title="'Array menu'" v-model="show5"></lm-switch>
    </lm-group>

    <lm-group :title="'Prevent closing when clicking mask'">
      <lm-switch :title="'Basic Usage'" v-model="show4"></lm-switch>
    </lm-group>

    <lm-group>
      <lm-switch :title="'Menu as tips'" v-model="show3"></lm-switch>
      <lm-switch :title="'Slot: header'" v-model="show6"></lm-switch>
      <lm-switch :title="'Prevent auto closing'" v-model="show8"></lm-switch>
    </lm-group>

    <lm-actionsheet v-model="show4" :menus="menus1" :close-on-clicking-mask="false" show-cancel @on-click-mask="console('on click mask')"></lm-actionsheet>

    <lm-actionsheet
      v-model="show1"
      :menus="menus1"
      @on-click-menu="click"
      @on-after-hide="log('after hide')"
      @on-after-show="log('after show')"></lm-actionsheet>

    <lm-actionsheet v-model="show2" :menus="menus2" @on-click-menu="click" show-cancel></lm-actionsheet>

    <lm-actionsheet v-model="show3" :menus="menus3" @on-click-menu="click" @on-click-menu-delete="onDelete" show-cancel></lm-actionsheet>

    <lm-actionsheet v-model="show5" :menus="menus5" show-cancel @on-click-menu="click5"></lm-actionsheet>

    <lm-actionsheet v-model="show6" :menus="menus1">
      <p slot="header" v-html="'Actionsheet header'"></p>
    </lm-actionsheet>

    <lm-actionsheet
      v-model="show7"
      :menus="menu7"
      theme="android"
      @on-click-menu="click"
      @on-after-hide="log('after hide')"
      @on-after-show="log('after show')">
    </lm-actionsheet>

    <lm-toast v-model="showSuccess">Deleted~</lm-toast>

    <div v-transfer-dom>
      <lm-actionsheet v-model="show8" :menus="menus8" @on-click-menu="demo8doClose" :close-on-clicking-mask="false" :close-on-clicking-menu="false">
      </lm-actionsheet>
    </div>
  </lm-template>
</template>
<script>
import TransferDom from '@/directives/transfer-dom'
export default {
  directives: {
    TransferDom
  },
  data () {
    return {
      show1: false,
      menus1: {
        menu1: 'Share to friends',
        menu2: 'Share to timeline'
      },
      show2: false,
      menus2: {
        menu1: 'Take Photo',
        menu2: 'Choose from photos'
      },
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      show7: false,
      show8: false,
      menus5: [{
        label: 'Actionsheet header',
        type: 'info'
      }, {
        label: 'Primary',
        type: 'primary',
        value: 'primary',
        otherProp: 'hey'
      }, {
        label: 'Warn',
        type: 'warn'
      }, {
        label: 'Disabled',
        type: 'disabled'
      }, {
        label: 'Default'
      }],
      menu7: {
        menu1: '北京烤鸭',
        menu2: '陕西油泼面',
        menu3: '西安肉夹馍'
      },
      showSuccess: false,
      menus3: {
        'title.noop': 'Actionsheet header',
        delete: '<span style="color:red">Delete</span>'
      },
      menus8: {
        menu1: 'Close me',
        menu2: 'Close me'
      }
    }
  },
  methods: {
    log (str) {
      console.log(str)
    },
    demo8doClose () {
      this.show8 = false;
      // this.$vux.loading.show({
      //   text: 'processing'
      // })
      // setTimeout(() => {
      //   this.$vux.loading.hide()
      //   this.show8 = false
      // }, 1000)
    },
    console (msg) {
      console.log(msg)
    },
    click (key) {
      console.log(key)
    },
    click5 (key, item) {
      console.log(key, item)
    },
    onDelete () {
      this.showSuccess = true
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
