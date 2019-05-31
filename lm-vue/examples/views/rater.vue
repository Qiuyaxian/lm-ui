<template>
  <lm-page>
    <lm-header>Rater</lm-header>
    <lm-group>
      <lm-cell label="请选择">
        <lm-rater v-model="data"></lm-rater>
      </lm-cell>
    </lm-group>
  </lm-page>
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
