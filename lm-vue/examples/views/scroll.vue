<template>
  <lm-page>
    <lm-header class="lm-header-fixed"
               slot="header">Scroll</lm-header>
    <lm-scroll
      ref="scroll"
      :listenScrollStart="true"
      :pullUpLoad="true"
      :listenScrollEnd="true"
      :data="list"
      @pullingUp="pullingUpHandle"
    >
      <lm-panel v-if="list && list.length !== 0">
        <lm-panel-item
          class="lm-flex-shrink panel-item"
          v-for="(item, index) in list"
          :key="index"
          :link="item.link"
          :src="item.img"
          :title="item.title"
          :desc="item.desc">
        </lm-panel-item>
      </lm-panel>
    </lm-scroll>
  </lm-page>
</template>
<script>
export default {
  data () {
    return {
      list: [],
      total: 5,
      page: 1
    }
  },
  created () {
    let list = [];
    for (let i = 0; i < 3; i++) {
      list.push({
        link: '/home',
        img: 'http://img1.shikee.com/try/2016/06/21/10172020923917672923.jpg_220x220.jpg',
        title: '上课时间',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
      })
    }
    this.list = list;
  },
  methods: {
    pullingUpHandle () {
      if (this.page > this.total) {
        this.$refs.scroll.forceUpdate(false);
        return;
      }
      let timer = setTimeout(() => {
        let list = [];
        for (let i = 0; i < 10; i++) {
          list.push({
            link: '/home',
            img: 'http://img1.shikee.com/try/2016/06/21/10172020923917672923.jpg_220x220.jpg',
            title: '上课时间',
            desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
          })
        }
        this.list = this.list.concat(list);
        this.$refs.scroll.forceUpdate(false);
        ++this.page;
      }, 5000)
    }
  }
}
</script>
<style lang="scss">
</style>
