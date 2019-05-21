<template>
  <vup-wrapper>
    <vup-navbar>Search</vup-navbar>
    <vup-group>
      <vup-cell  v-for="(type, index) in types" :label="type" :key="index">
        <vup-spinner :type="type"></vup-spinner>
      </vup-cell>
    </vup-group>
  </vup-wrapper>
</template>
<script>
export default {
  data () {
    return {
      types: ['android', 'ios', 'ios-small', 'bubbles', 'circles', 'crescent', 'dots', 'lines', 'ripple', 'spiral']
    }
  }
}
</script>
<style lang="scss">
</style>
