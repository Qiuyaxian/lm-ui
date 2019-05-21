<template>
  <vup-wrapper>
    <vup-navbar>Tab</vup-navbar>
    <vup-group>
      <vup-switch title="一般使用" v-model="show1"></vup-switch>
      <vup-switch title="type为文字" v-model="show2"></vup-switch>
      <vup-switch title="type为cancel" v-model="show3"></vup-switch>
      <vup-switch title="type为warn" v-model="show4"></vup-switch>
      <vup-switch title="时间为1s" v-model="show5"></vup-switch>
      <vup-switch title="长文字" v-model="show6"></vup-switch>
    </vup-group>
    <vup-toast v-model="show1" @on-hide="onHide">一般使用</vup-toast>
    <vup-toast v-model="show2" type="text">type为文字</vup-toast>
    <vup-toast v-model="show3" type="cancel">type为cancel</vup-toast>
    <vup-toast v-model="show4" type="warn">type为warn</vup-toast>
    <vup-toast v-model="show5" :time="1000">时间为1s</vup-toast>
    <vup-toast v-model="show6" type="text" width="30em">长文字长文字长文字长文字长文字</vup-toast>
  </vup-wrapper>
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
    showPosition (position) {
      this.position = position
      this.showPositionValue = true
    },
    onHide () {
      console.log('on hide')
    }
  }
}
</script>

<style lang="scss">
</style>
