<template>
  <vup-wrapper>
    <vup-navbar>CountDown</vup-navbar>
    <vup-divider>自动倒计时</vup-divider>
    <vup-group>
      <vup-cell label="倒计时">
        <vup-count-down v-model="time" @on-finish="finish" v-show="show"></vup-count-down>
      </vup-cell>
    </vup-group>
    <vup-divider>手动倒计时</vup-divider>
    <vup-group>
      <vup-switch title="手动倒计时" v-model="start"></vup-switch>
      <vup-cell label="倒计时">
        <vup-count-down :start="start" v-model="time2" @on-finish="finish" v-show="show"></vup-count-down>
      </vup-cell>
    </vup-group>
  </vup-wrapper>
</template>

<script>
export default {
  data () {
    return {
      show: true,
      time: 15,
      time2: 15,
      start: false
    }
  },
  methods: {
    finish (index) {
      this.show = false
      this.value = 'completed'
      console.log('current index', index)
    }
  }
}
</script>
<style lang="scss">
.demo1{
  display: block;
  font-size: 6em;
  color: #04BE02;
  text-align: center;
}
</style>
