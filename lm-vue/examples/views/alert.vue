<template>
  <lm-page>
    <lm-header>Alert</lm-header>
    <div v-transfer-dom>
      <lm-alert v-model="show" title="消息" @on-show="onShow" @on-hide="onHide">Your Message is sent successfully~</lm-alert>
    </div>
    <div v-transfer-dom>
      <lm-alert v-model="show2" title="消息" content="Your Message is sent successfully~"></lm-alert>
    </div>
    <lm-group>
      <lm-switch label="Show Me" v-model="show"></lm-switch>
    </lm-group>
    <lm-group label="Prop: content">
      <lm-switch label="Show Me" v-model="show2"></lm-switch>
    </lm-group>
  </lm-page>
</template>
<script lang="ts">
import {
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Vue,
  Watch
} from "vue-property-decorator";

import TransferDom from '../../src/directives/transfer-dom'
@Component({
  directives: {
    'transfer-dom': TransferDom
  },
  created() {
    console.log(this.$lm, 'this.$lm');
  },
  // 声明周期钩子
  mounted() {},
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next();
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    next();
  }
})
export default class Alert extends Vue {
  show: boolean = false;
  show1: boolean = false;
  show2: boolean = false;
  onHide() {
    console.log("on hide");
  }
  onShow() {
    console.log("on show");
  }
  showPlugin() {
    // this.$lm.alert.show({
    //   title: 'VUX is Cool',
    //   content: 'Do you agree?',
    //   onShow () {
    //     console.log('Plugin: I\'m showing')
    //   },
    //   onHide () {
    //     console.log('Plugin: I\'m hiding now')
    //   }
    // })
  }
  showModule() {
    // this.$lm.alert.show({
    //   title: 'VUX is Cool',
    //   content: 'Do you agree?',
    //   onShow () {
    //     console.log('Module: I\'m showing')
    //   },
    //   onHide () {
    //     console.log('Module: I\'m hiding now')
    //   }
    // })
  }
}
</script>