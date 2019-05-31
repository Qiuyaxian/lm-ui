<template>
  <lm-page>
    <lm-header>九宫格</lm-header>
    <lm-grid :cols="3">
      <lm-grid-item v-for="(grid, gridIndex) in grids" :key="gridIndex" :label="grid.label" :icon="grid.icon">
      </lm-grid-item>
    </lm-grid>
  </lm-page>
</template>

<script>
let grids = []
for (let i = 0; i < 9; i++) {
  grids.push({
    'label': 'grid',
    'icon': 'https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg'
  })
}
export default {
  data () {
    return {
      grids: grids
    }
  }
}
</script>

<style lang="scss">
</style>
