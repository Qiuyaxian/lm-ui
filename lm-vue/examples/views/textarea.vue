<template>
  <lm-page>
    <lm-header>Textarea</lm-header>
    <lm-form class="lm-form-wrapper">
      <lm-form-item labelAlign="top" title="请输">
        <lm-textarea @on-blur="blurHandle" @on-change="changeHandle" :max="20" placeholder="请输入"></lm-textarea>
      </lm-form-item>
    </lm-form>
  </lm-page>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    changeHandle (value) {
      console.log('value: ', value)
    },
    blurHandle (value, event) {
      console.log('value: ', value, event)
    },
  }
}
</script>
<style lang="scss">
.lm-form-wrapper{
  background: white;
}
</style>
