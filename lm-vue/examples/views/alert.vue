<template>
  <vup-wrapper>
    <vup-navbar>Alert</vup-navbar>
    <vup-group>
      <vup-switch title="Show Me" v-model="show"></vup-switch>
    </vup-group>
    <div v-transfer-dom>
      <vup-alert v-model="show" title="Congratulations" @on-show="onShow" @on-hide="onHide">Your Message is sent successfully~</vup-alert>
    </div>
    <vup-group title="Prop: content">
      <vup-switch title="Show Me" v-model="show2"></vup-switch>
    </vup-group>
    <div v-transfer-dom>
      <vup-alert v-model="show2" title="Congratulations" content="Your Message is sent successfully~"></vup-alert>
    </div>

    <vup-group title="Use as a plugin">
      <vup-cell label="Show Me" @click.native="showPlugin" is-link></vup-cell>
      <vup-cell label="Will auto close in 3s" @click.native="showPluginAuto" is-link></vup-cell>
    </vup-group>

    <vup-group title="Use as a module">
      <vup-cell label="Show Me" @click.native="showModule" is-link></vup-cell>
      <vup-cell label="Will auto close in 3s" @click.native="showModuleAuto" is-link></vup-cell>
    </vup-group>
  </vup-wrapper>
</template>
<script>
import TransferDom from '@/directives/transfer-dom'
export default {
  directives: {
    TransferDom
  },
  created () {
    console.log(this.$vup, 'this.$vup');
    this.$vup.alert.show({
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
      // this.$vux.alert.show({
      //   title: 'VUX is Cool',
      //   content: this.$t('Do you agree?'),
      //   onShow () {
      //     console.log('Plugin: I\'m showing')
      //   },
      //   onHide () {
      //     console.log('Plugin: I\'m hiding now')
      //   }
      // })
    },
    showModule () {
      // AlertModule.show({
      //   title: 'VUX is Cool',
      //   content: this.$t('Do you agree?'),
      //   onShow () {
      //     console.log('Module: I\'m showing')
      //   },
      //   onHide () {
      //     console.log('Module: I\'m hiding now')
      //   }
      // })
    },
    showModuleAuto () {
      // this.showModule()
      // setTimeout(() => {
      //   AlertModule.hide()
      // }, 3000)
    },
    showPluginAuto () {
      // this.showPlugin()
      // setTimeout(() => {
      //   this.$vux.alert.hide()
      // }, 3000)
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
