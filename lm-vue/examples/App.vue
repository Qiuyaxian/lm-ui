<template>
  <div id="app">
    <vup-scroll>
      <router-view class="router-view"></router-view>
    </vup-scroll>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import '~@/theme/index.scss';
@import '~@/theme/transition.scss';
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
