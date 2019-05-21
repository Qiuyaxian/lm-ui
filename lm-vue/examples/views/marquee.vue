<template>
  <vup-wrapper>
    <vup-navbar>Divider</vup-navbar>
    <vup-divider>默认</vup-divider>
    <vup-marquee>
      <vup-marquee-item v-for="i in 5" :key="i" class="align-middle">hello world {{i}}</vup-marquee-item>
    </vup-marquee>
    <vup-divider>在cell中使用</vup-divider>
    <vup-group>
      <vup-cell label="公共">
        <vup-marquee>
        <vup-marquee-item v-for="i in 5" :key="i">hello world {{i}}</vup-marquee-item>
        </vup-marquee>
      </vup-cell>
      <vup-cell label="公共" content="App.vue"></vup-cell>
    </vup-group>

    <vup-divider>异步加载数据</vup-divider>
    <vup-marquee>
      <vup-marquee-item v-for="i in asyncCount" :key="i" class="align-middle">hello world {{i}}</vup-marquee-item>
    </vup-marquee>
  </vup-wrapper>
</template>

<script>
export default {
  data () {
    return {
      value: false,
      asyncCount: 0
    }
  },
  mounted () {
    setTimeout(() => {
      this.asyncCount = 5
    }, 1000)
  }
}
</script>
<style lang="scss">
@import '~@/theme/index.scss';
.align-middle{
  font-size: pxTorem(32);
  line-height: 1.2;
  text-align: center;
  color: #000;
}
</style>
