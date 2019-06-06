<template>
  <lm-page>
    <lm-header>Marquee</lm-header>
    <lm-divider>默认</lm-divider>
    <lm-marquee>
      <lm-marquee-item v-for="i in 5" :key="i" class="align-middle">hello world {{i}}</lm-marquee-item>
    </lm-marquee>
    <lm-divider>在cell中使用</lm-divider>
    <lm-group>
      <lm-cell label="滚动播放">
        <lm-marquee direction="left">
          <lm-marquee-item v-for="i in 5" :key="i">hello world {{ i }}</lm-marquee-item>
        </lm-marquee>
      </lm-cell>
    </lm-group>
    <lm-divider>异步加载数据</lm-divider>
    <lm-marquee>
      <lm-marquee-item v-for="i in asyncCount" :key="i" class="align-middle">hello world {{i}}</lm-marquee-item>
    </lm-marquee>
  </lm-page>
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
