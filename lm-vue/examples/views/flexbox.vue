<template>
  <lm-page>
    <lm-header>flexbox</lm-header>
    <lm-flexbox>
      <lm-flexbox-item><div class="flex-demo">1</div></lm-flexbox-item>
      <lm-flexbox-item><div class="flex-demo">2</div></lm-flexbox-item>
    </lm-flexbox>

    <lm-flexbox :gutter="0">
      <lm-flexbox-item><div class="flex-demo">1</div></lm-flexbox-item>
      <lm-flexbox-item><div class="flex-demo">2</div></lm-flexbox-item>
      <lm-flexbox-item><div class="flex-demo">3</div></lm-flexbox-item>
      <lm-flexbox-item><div class="flex-demo">4</div></lm-flexbox-item>
      <lm-flexbox-item><div class="flex-demo">5</div></lm-flexbox-item>
      <lm-flexbox-item><div class="flex-demo">6</div></lm-flexbox-item>
    </lm-flexbox>
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
