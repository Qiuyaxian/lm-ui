<template>
  <lm-page>
    <lm-header>Clock</lm-header>
    <lm-clock :time="time"></lm-clock>
  </lm-page>
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
