<template>
  <vup-wrapper>
    <vup-navbar>flexbox</vup-navbar>
    <vup-flexbox>
      <vup-flexbox-item><div class="flex-demo">1</div></vup-flexbox-item>
      <vup-flexbox-item><div class="flex-demo">2</div></vup-flexbox-item>
    </vup-flexbox>

    <vup-flexbox :gutter="0">
      <vup-flexbox-item><div class="flex-demo">1</div></vup-flexbox-item>
      <vup-flexbox-item><div class="flex-demo">2</div></vup-flexbox-item>
      <vup-flexbox-item><div class="flex-demo">3</div></vup-flexbox-item>
      <vup-flexbox-item><div class="flex-demo">4</div></vup-flexbox-item>
      <vup-flexbox-item><div class="flex-demo">5</div></vup-flexbox-item>
      <vup-flexbox-item><div class="flex-demo">6</div></vup-flexbox-item>
    </vup-flexbox>
  </vup-wrapper>
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
