<template>
  <lm-page>
    <lm-header>switch</lm-header>
    <lm-group>
      <lm-switch label="switch" v-model="value"></lm-switch>
      <lm-switch label="switch" v-model="value"></lm-switch>
    </lm-group>
  </lm-page>
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
