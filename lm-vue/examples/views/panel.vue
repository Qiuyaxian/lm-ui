<template>
  <lm-template>
    <lm-navbar>Panel</lm-navbar>
    <lm-panel style="background: white;" header="Panel header">
      <lm-panel-item link="/home" class="panel-item" src="http://img2.imgtn.bdimg.com/it/u=1334873465,1852890759&fm=26&gp=0.jpg" title="标题一" desc="由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。"></lm-panel-item>
       <lm-panel-item class="panel-item" src="http://img2.imgtn.bdimg.com/it/u=1334873465,1852890759&fm=26&gp=0.jpg" title="标题一" desc="由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。"></lm-panel-item>
    </lm-panel>

    <lm-panel style="background: white;" header="Panel header">
      <lm-panel-item type="vertical" link="/home" class="panel-item" src="http://img2.imgtn.bdimg.com/it/u=1334873465,1852890759&fm=26&gp=0.jpg" title="标题一" desc="由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。"></lm-panel-item>
      <lm-panel-item type="vertical" link="/home" class="panel-item" src="http://img2.imgtn.bdimg.com/it/u=1334873465,1852890759&fm=26&gp=0.jpg" title="标题一" desc="由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。">
        <p>自定义内容</p>
      </lm-panel-item>
    </lm-panel>
  </lm-template>
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
    }
  }
}
</script>
<style lang="scss">
</style>
