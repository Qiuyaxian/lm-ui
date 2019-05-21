<template>
  <vup-wrapper>
    <vup-navbar>Panel</vup-navbar>
    <vup-panel header="App.vue">
      <vup-panel-item link="/home" class="panel-item" src="http://img2.imgtn.bdimg.com/it/u=1334873465,1852890759&fm=26&gp=0.jpg" title="标题一" desc="由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。"></vup-panel-item>
       <vup-panel-item class="panel-item" src="http://img2.imgtn.bdimg.com/it/u=1334873465,1852890759&fm=26&gp=0.jpg" title="标题一" desc="由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。"></vup-panel-item>
    </vup-panel>
  </vup-wrapper>
</template>
<script>
export default {
  data () {
    return {
      footer: {
        title: '更多',
        url: 'http://vux.li'
      }
    }
  },
  methods: {
    finish (index) {
      this.show = false
      this.value = 'completed'
      console.log('current index', index)
    }
  }
}
</script>
<style lang="scss">
</style>
