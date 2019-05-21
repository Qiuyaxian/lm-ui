<template>
  <vup-wrapper>
    <vup-navbar>Tab</vup-navbar>
    <vup-tab>
      <vup-tab-item selected>已发货</vup-tab-item>
      <vup-tab-item>未发货</vup-tab-item>
      <vup-tab-item>全部订单</vup-tab-item>
    </vup-tab>
  </vup-wrapper>
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
