<template>
  <lm-template>
    <lm-navbar>Alert</lm-navbar>
    <lm-group>
      <lm-switch title="Show Me" v-model="show"></lm-switch>
    </lm-group>
    <div v-transfer-dom>
      <lm-alert v-model="show" title="Congratulations" @on-show="onShow" @on-hide="onHide">Your Message is sent successfully~</lm-alert>
    </div>
    <lm-group title="Prop: content">
      <lm-switch title="Show Me" v-model="show2"></lm-switch>
    </lm-group>
    <div v-transfer-dom>
      <lm-alert v-model="show2" title="Congratulations" content="Your Message is sent successfully~"></lm-alert>
    </div>
  </lm-template>
</template>
<script>
import TransferDom from '@/directives/transfer-dom'
export default {
  directives: {
    TransferDom
  },
  created () {
    console.log(this.$lm, 'this.$lm');
    this.$lm.alert.show({
      title: 'Vux is Cool',
      content: 'Do you agree?',
      onShow () {
        console.log('Plugin: I\'m showing')
      },
      onHide () {
        console.log('Plugin: I\'m hiding')
      }
    })
  },
  methods: {
    onHide () {
      console.log('on hide')
    },
    onShow () {
      console.log('on show')
    },
    showPlugin () {
      this.$lm.alert.show({
        title: 'VUX is Cool',
        content: 'Do you agree?',
        onShow () {
          console.log('Plugin: I\'m showing')
        },
        onHide () {
          console.log('Plugin: I\'m hiding now')
        }
      })
    },
    showModule () {
      this.$lm.alert.show({
        title: 'VUX is Cool',
        content: 'Do you agree?',
        onShow () {
          console.log('Module: I\'m showing')
        },
        onHide () {
          console.log('Module: I\'m hiding now')
        }
      })
    }
  },
  data () {
    return {
      show: false,
      show1: false,
      show2: false
    }
  }
}
</script>
<style lang="scss">
@import '~@/theme/index.scss';
@import '~@/theme/close.scss';
.dialog-demo {
  .weui-dialog{
    border-radius: pxTorem(8, 2);
    padding-bottom: pxTorem(8, 2);
  }
  .dialog-title {
    line-height: pxTorem(30, 2);
    color: #666;
  }
  .img-box {
    height: pxTorem(350, 2);
    overflow: hidden;
  }
  .lm-close {
    margin-top: pxTorem(8, 2);
    margin-bottom: pxTorem(8, 2);
  }
}
</style>
