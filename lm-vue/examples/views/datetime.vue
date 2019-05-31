<template>
  <lm-page>
    <lm-header>datetime</lm-header>
    <lm-group>
      <lm-cell label="左边" content="请选择"></lm-cell>
      <lm-datetime
        v-model="value1"
        @on-change="change"
        label="年月日"
        placeholder="请选择"
        @on-cancel="log('cancel')"
        @on-confirm="onConfirm"
        @on-hide="log('hide', $event)"></lm-datetime>
      </lm-group>
  </lm-page>
</template>

<script>
export default {
  data () {
    return {
      value1: '',
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
