<template>
  <vup-wrapper>
    <vup-navbar>Clock</vup-navbar>
    <vup-clock :time="time"></vup-clock>
  </vup-wrapper>
</template>
<script>
export default {
  data () {
    return {
      time: '2019-07-13 21:54'
    }
  }
}
</script>
<style lang="scss">
</style>
