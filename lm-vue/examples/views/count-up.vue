<template>
  <vup-wrapper>
    <vup-navbar>CountUp</vup-navbar>
    <vup-divider>默认</vup-divider>
    <vup-count-up :start-val="1" :end-val="1388" :duration="2" class="demo1"></vup-count-up>
    <br />
    <vup-count-up :end-val="88.88" :duration="2" :decimals="2" class="demo1"></vup-count-up>
    <br />
    <vup-count-up :start="doStart" :end-val="88.88" :duration="2" :decimals="2" class="demo1"></vup-count-up>
    <div class="">
      <vup-button @click.native="doStart=true" type="primary">开始</vup-button>
    </div>
  </vup-wrapper>
</template>

<script>
export default {
  data () {
    return {
      doStart: false
    }
  }
}
</script>
<style lang="scss">
.demo1{
  display: block;
  font-size: 6em;
  color: #04BE02;
  text-align: center;
}
</style>
