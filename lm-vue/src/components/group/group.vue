<template>
  <div class="lm-group">
    <slot name="group-title"></slot>
    <div class="lm-group-cells"
         :class="{
      'lm-group-border': showBorders
    }">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'lm-group',
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
    borderIntent: {
      type: Boolean,
      default: true
    },
    /**
     * [gutter 间距]
     * @type {Array}
     */
    gutter: [String, Number],
    /**
     * [showBorders 是否显示边框]
     * @type {Object}
     */
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
