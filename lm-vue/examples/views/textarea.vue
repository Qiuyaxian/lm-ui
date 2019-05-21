<template>
  <vup-wrapper>
    <vup-navbar>Textarea</vup-navbar>
    <vup-form >
      <vup-form-item labelAlign="top" title="请输">
        <vup-textarea :max="20" placeholder="请输入"></vup-textarea>
      </vup-form-item>
    </vup-form>
  </vup-wrapper>
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
