<template>
  <lm-template>
    <lm-navbar>Rater</lm-navbar>
    <lm-rater v-model="data"></lm-rater>
  </lm-template>
</template>
<script>
export default {
  data () {
    return {
      data: '5'
    }
  }
}
</script>
<style lang="scss">
</style>
