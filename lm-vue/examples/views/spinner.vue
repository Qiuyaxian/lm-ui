<template>
  <lm-page>
    <lm-header>Spinner</lm-header>
    <lm-group>
      <lm-cell  v-for="(type, index) in types" :label="type" :key="index"><lm-spinner :type="type"></lm-spinner></lm-cell>
    </lm-group>
  </lm-page>
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
