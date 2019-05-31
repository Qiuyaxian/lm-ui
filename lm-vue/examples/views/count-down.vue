<template>
  <lm-page>
    <lm-header>CountDown</lm-header>
    <lm-divider>自动倒计时</lm-divider>
    <lm-group>
      <lm-cell label="倒计时">
        <lm-count-down v-model="time" @on-finish="finish" v-show="show"></lm-count-down>
      </lm-cell>
    </lm-group>
    <lm-divider>手动倒计时</lm-divider>
    <lm-group>
      <lm-switch label="手动倒计时" v-model="start"></lm-switch>
      <lm-cell label="倒计时">
        <lm-count-down :start="start" v-model="time2" @on-finish="finish" v-show="show"></lm-count-down>
      </lm-cell>
    </lm-group>
  </lm-page>
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
