<template>
  <div class="vup-flexbox" :class="{
    'vup-flex-col': orient === 'vertical',
    'vup-flex-row': orient === 'horizontal'
  }"
  :style="styles">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'flexbox',
  props: {
    /**
     * [gutter 间距]
     * @type {Object}
     */
    gutter: {
      type: Number,
      default: 16
    },
    /**
     * [orient 排列方式]
     * @type {Object}
     */
    orient: {
      type: String,
      default: 'horizontal'
    },
    /**
     * [justify 左右对齐方式]
     * @type {[type]}
     */
    justify: String,
    /**
     * [align 水平对齐方式]
     * @type {[type]}
     */
    align: String,
    /**
     * [wrap 换行]
     * @type {[type]}
     */
    wrap: String,
    /**
     * [direction description]
     * @type {[type]}
     */
    direction: String
  },
  computed: {
    /**
     * [styles 动态计算行内样式]
     * @return {[type]} [description]
     */
    styles () {
      const styles = {
        'justify-content': this.justify,
        '-webkit-justify-content': this.justify,
        'align-items': this.align,
        '-webkit-align-items': this.align,
        'flex-wrap': this.wrap,
        '-webkit-flex-wrap': this.wrap,
        'flex-direction': this.direction,
        '-webkit-flex-direction': this.direction
      }
      return styles;
    }
  }
}
</script>

<style lang="scss">
@import '~@/theme/index.scss';
@import '~@/theme/flex.scss';
.vup-flexbox {
  width: 100%;
  text-align: left;
  display: flex;
  display: -webkit-flex;
  box-align: center;
  align-items: center;
  .vup-flexbox-item {
    flex: 1;
    -webkit-flex: 1;
    min-width: pxTorem(viewTransform(20));
    width: 0%;
    &:first-child {
      margin-left: 0!important;
      margin-top: 0!important;
    }
  }
}
.vup-flex-row {
  box-direction: row;
  box-orient: horizontal;
  flex-direction: row;
}
.vup-flex-col {
  box-orient: vertical;
  flex-direction: column;
  > .vup-flexbox-item {
    width: 100%;
  }
}
</style>