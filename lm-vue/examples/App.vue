<template>
  <div id="app">
    <router-view class="router-view"></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
})
export default class App extends Vue {
}
</script>
<style lang="scss">
@import './assets/style/style.scss';
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
