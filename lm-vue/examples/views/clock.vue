<template>
  <lm-template>
    <lm-navbar>Clock</lm-navbar>
    <lm-clock :time="time"></lm-clock>
  </lm-template>
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
