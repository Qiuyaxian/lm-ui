<template>
  <lm-template>
    <lm-navbar>flexbox</lm-navbar>
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
  </lm-template>
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
@import '~@/theme/index.scss';
.flex-demo {
  font-size: pxTorem(32);
  line-height: 1.6;
  text-align: center;
  color: #fff;
  background-color: #20b907;
  margin-bottom: pxTorem(16);
  background-clip: padding-box;
}
</style>
