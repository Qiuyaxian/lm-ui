<template>
  <lm-template>
    <lm-navbar>Textarea</lm-navbar>
    <lm-form-preview header-label="付款金额" header-value="¥2400.00" :preview-items="list"></lm-form-preview>
  </lm-template>
</template>
<script>
export default {
  data () {
    return {
      list: [{
        label: '商品',
        value: '电动打蛋机'
      }, {
        label: '标题标题',
        value: '名字名字名字'
      }, {
        label: '标题标题',
        value: '很长很长的名字很长很长的名字很长很长的名字很长很长的名字很长很长的名字'
      }]
    }
  }
}
</script>
<style lang="scss">
@import "~@/theme/index.scss";
@import "~@/theme/cell.scss";
/*@import "~@/theme/form.scss";*/
</style>
