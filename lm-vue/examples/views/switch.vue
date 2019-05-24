<template>
  <lm-template>
    <lm-navbar>switch</lm-navbar>
    <lm-group>
      <lm-switch label="switch" v-model="value"></lm-switch>
    </lm-group>
  </lm-template>
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
