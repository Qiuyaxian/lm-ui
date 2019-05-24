<template>
  <lm-template>
    <lm-navbar>datetime</lm-navbar>
    <lm-group>
      <lm-cell label="左边" placeholder="请选择"></lm-cell>
      <lm-cell label="左边" placeholder="请选择"></lm-cell>
      <lm-datetime-range label="请选择" start-date="2017-01-01" end-date="2017-02-02" :format="'YYYY年MM月DD日'" v-model="valueRange" @on-change="change"></lm-datetime-range>
      </lm-group>
  </lm-template>
</template>

<script>
export default {
  data () {
    return {
      valueRange: ['2017-01-15', '03', '05'],
    }
  },
  methods: {
    log (str1, str2 = '') {
      console.log(str1, str2)
    },
    change (value) {
      console.log('new Value', value)
    },
    onConfirm (val) {
      console.log('on-confirm arg', val)
      console.log('current value', this.value1)
    }
  }
}
</script>

<style lang="scss">

</style>
