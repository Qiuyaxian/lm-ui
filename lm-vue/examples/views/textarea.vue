<template>
  <lm-template>
    <lm-navbar>Textarea</lm-navbar>
    <lm-form >
      <lm-form-item labelAlign="top" title="请输">
        <lm-textarea :max="20" placeholder="请输入"></lm-textarea>
      </lm-form-item>
    </lm-form>
  </lm-template>
</template>
<script>
export default {
  data () {
    return {
      footer: {
        title: '更多',
        url: 'http://vux.li'
      }
    }
  },
  methods: {
    finish (index) {
      this.show = false
      this.value = 'completed'
      console.log('current index', index)
    }
  }
}
</script>
<style lang="scss">
</style>
