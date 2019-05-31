<template>
  <lm-page>
    <lm-header>CountUp</lm-header>
    <lm-divider>默认</lm-divider>
    <lm-count-up :start-val="1" :end-val="1388" :duration="2" class="demo1"></lm-count-up>
    <br />
    <lm-count-up :end-val="88.88" :duration="2" :decimals="2" class="demo1"></lm-count-up>
    <br />
    <lm-count-up :start="doStart" :end-val="88.88" :duration="2" :decimals="2" class="demo1"></lm-count-up>
    <div class="">
      <lm-button @click.native="doStart=true" type="primary">开始</lm-button>
    </div>
  </lm-page>
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
