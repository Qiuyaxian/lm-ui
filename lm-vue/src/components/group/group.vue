<template>
  <div class="vup-group" :class="{
      'vup-group-border': showBorders
    }">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'group',
  props: {
    /**
     * [cellWidth cell 的宽度]
     * @type {[type]}
     */
    cellWidth: String,
    /**
     * [labelWidth 左边label 的宽度]
     * @type {[type]}
     */
    labelWidth: String,
    /**
     * [labelAlign 左边label 的对齐方式]
     * @type {[type]}
     */
    labelAlign: String,
    /**
     * [itemsLeft 左边label 的距离左边的宽度]
     * @type {Object}
     */
    borderIntent: Boolean,
    /**
     * [gutter 间距]
     * @type {Array}
     */
    gutter: [String, Number],
    showBorders: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  created () {
  },
  methods: {
  }
};
</script>
<style lang="scss">
@import '~@/theme/index.scss';
@import '~@/theme/cell.scss';
@import '~@/theme/form.scss';
</style>
