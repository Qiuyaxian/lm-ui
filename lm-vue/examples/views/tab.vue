<template>
  <lm-template>
    <lm-navbar>Tab</lm-navbar>
    <lm-tab>
      <lm-tab-item selected>已发货</lm-tab-item>
      <lm-tab-item>未发货</lm-tab-item>
      <lm-tab-item>全部订单</lm-tab-item>
    </lm-tab>
  </lm-template>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    onItemClick (index) {
      console.log('当前索引', index)
    }
  }
}
</script>

<style lang="scss">
</style>
