<template>
  <lm-template>
    <lm-navbar>Search</lm-navbar>
    <lm-search v-model="search" @on-change="getResult"
               @on-cancel="onCancel"
               @on-submit="onSubmit"></lm-search>
    <lm-form-preview header-label="付款金额"
                     header-value="¥2400.00"
                     :preview-items="list"></lm-form-preview>
  </lm-template>
</template>
<script>
export default {
  data () {
    return {
      search: '5',
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
  },
  methods: {
    getResult (val) {
      console.log('on-change', val);
    },
    onSubmit (val) {
      console.log(val, 'on onSubmit')
    },
    onFocus () {
      console.log('on focus')
    },
    onCancel () {
      console.log('on cancel')
    }
  },
}
</script>
<style lang="scss">
</style>
