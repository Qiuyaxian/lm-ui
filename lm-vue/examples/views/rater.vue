<template>
  <vup-wrapper>
    <vup-navbar>Rater</vup-navbar>
    <vup-rater v-model="data"></vup-rater>
  </vup-wrapper>
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
