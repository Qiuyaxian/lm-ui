<template>
  <lm-page>
    <lm-header>cell-preview</lm-header>
    <lm-group-title header-label="信息" :borderIntent="false"></lm-group-title>
    <lm-cell-preview :list="list"></lm-cell-preview>
  </lm-page>
</template>
<script>
export default {
  data () {
    return {
      list: [{
        label: 'Apple',
        value: '3.29'
      }, {
        label: 'Banana',
        value: '1.04'
      }, {
        label: 'Fish',
        value: '8.00'
      }]
    }
  }
}
</script>
<style lang="scss">
</style>
