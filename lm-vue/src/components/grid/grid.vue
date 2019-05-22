<template>
  <div class="lm-grids" :class="{
      'lm-grid-no-lr-borders': !showLrBorders,
      'lm-grid-no-borders': !showBorders
    }"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'grid',
  data () {
    return {
      childrenSize: 3
    }
  },
  methods: {
    /**
     * [countColumn 计算产生的cols列数]
     * @return {[type]} [description]
     */
    countColumn () {
      this.childrenSize = this.$children.length
      this.$children.forEach((c, index) => (c.index = index))
    }
  },
  props: {
    /**
     * [cols 列数]
     * @type {Object}
     */
    cols: Number,
    /**
     * [showLrBorders 是否显示左右边框  ]
     * @type {Object}
     */
    showLrBorders: {
      type: Boolean,
      default: true
    },
    /**
     * [showVerticalDividers 是否显示垂直分割线]
     * @type {Object}
     */
    showVerticalDividers: {
      type: Boolean,
      default: true
    },
    /**
     * [showBorders 是否显示所有边框]
     * @type {Object}
     */
    showBorders: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    /**
     * [column 计算列数]
     * @return {[type]} [description]
     */
    column () {
      return this.cols || this.childrenSize;
    }
  }
}
</script>
<style lang="scss">
@import '~@/theme/index.scss';
@import '~@/theme/grid.scss';
</style>
