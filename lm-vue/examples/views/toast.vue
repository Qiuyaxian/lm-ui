<template>
  <lm-page>
    <lm-header>toast</lm-header>
    <lm-group>
      <lm-switch label="一般使用" v-model="show1"></lm-switch>
      <lm-switch label="type为文字" v-model="show2"></lm-switch>
      <lm-switch label="type为cancel" v-model="show3"></lm-switch>
      <lm-switch label="type为warn" v-model="show4"></lm-switch>
      <lm-switch label="时间为1s" v-model="show5"></lm-switch>
      <lm-switch label="长文字" v-model="show6"></lm-switch>
    </lm-group>
    <lm-toast :visible="show1" @on-hide="onHide">一般使用</lm-toast>
    <lm-toast :visible="show2" @on-hide="onHide" type="text">type为文字</lm-toast>
    <lm-toast :visible="show3" @on-hide="onHide" type="cancel">type为cancel</lm-toast>
    <lm-toast :visible="show4" @on-hide="onHide" type="warn">type为warn</lm-toast>
    <lm-toast :visible="show5" @on-hide="onHide" :time="1000">时间为1s</lm-toast>
    <lm-toast :visible="show6" @on-hide="onHide" type="text" width="30em">长文字长文字长文字长文字长文字</lm-toast>
    <lm-divider>js调用</lm-divider>
    <div style="padding: 0 32px;">
      <lm-button @click.native="toastHandle('cancel', '取消操作')">type为cancel</lm-button>
      <lm-button @click.native="toastHandle('warn', '警告操作')">type为warn</lm-button>
      <lm-button @click.native="toastHandle('success', '成功操作')">type为success</lm-button>
      <lm-button @click.native="toastHandle('error', '错误操作')">type为warn</lm-button>
    </div>
  </lm-page>
</template>

<script>
export default {
  data () {
    return {
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false
    }
  },
  methods: {
    onHide () {
      this.show1 = false;
      this.show2 = false;
      this.show3 = false;
      this.show4 = false;
      this.show5 = false;
      this.show6 = false;
    },
    toastHandle (type = 'cancel', text = '取消操作') {
      console.log(this.$lm, 'this.$lm')
      this.$lm.toast[type]({
        text: text
      })
    }
  }
}
</script>

<style lang="scss">
</style>
