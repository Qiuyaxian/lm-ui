<template>
  <lm-page>
    <lm-header>Cell</lm-header>
    <lm-group>
      <lm-group-title slot="group-title"
                        header-label="App.vue"></lm-group-title>
      <lm-cell label="左边" content="请选择"></lm-cell>
      <lm-cell label="跳转" content="前往首页" link="/home"></lm-cell>
    </lm-group>
  </lm-page>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss">
</style>
