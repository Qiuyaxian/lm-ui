<template>
  <vup-wrapper>
    <vup-navbar>switch</vup-navbar>
    <vup-group>
      <vup-switch title="switch" v-model="value"></vup-switch>
    </vup-group>
  </vup-wrapper>
</template>

<script>
export default {
  data () {
    return {
      value: false
    }
  }
}
</script>

<style lang="scss">
</style>
