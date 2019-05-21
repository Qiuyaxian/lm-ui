<template>
  <vup-wrapper>
    <vup-navbar>cell-preview</vup-navbar>
    <vup-cell-preview :list="list"></vup-cell-preview>
  </vup-wrapper>
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
