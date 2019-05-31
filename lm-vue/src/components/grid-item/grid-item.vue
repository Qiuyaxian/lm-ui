<template>
  <a href="javascript:;"
    class="lm-grid"
    :class="{
      'lm-grid-item-no-border': (isLast && !$parent.showLrBorders) || (!isLast && !$parent.showVerticalDividers),
    }"
    @click="onClick"
    :style="style">
    <div class="lm-grid-icon">
      <slot name="icon">
        <img v-if="icon" :src="icon" alt="" />
      </slot>
    </div>
    <p class="lm-grid-label">
      <slot name="label">
        <span v-if="label" v-html="label"></span>
      </slot>
    </p>
    <slot></slot>
  </a>
</template>
<script>
import Router from '@/utils/router'
export default {
  name: 'lm-grid-item',
  props: {
    /**
     * [icon 图标]
     * @type {[type]}
     */
    icon: String,
    /**
     * [label 文字]
     * @type {[type]}
     */
    label: String,
    /**
     * [link 链接地址]
     * @type {[type]}
     */
    link: String
  },
  data () {
    return {
      index: 0,
      hasIconSlot: false,
      hasLabelSlot: false
    }
  },
  created () {
    this.$parent && this.$parent.countColumn()
  },
  mounted () {
    // 获取slot里面的节点
    this.$slots.icon && (this.hasIconSlot = true)
    this.$slots.label && (this.hasLabelSlot = true)
  },
  destroyed () {
    this.$parent && this.$parent.countColumn()
  },
  computed: {
    /**
     * [isLast 获取列数]
     * @return {Boolean} [description]
     */
    isLast () {
      return !((this.index + 1) % this.$parent.column)
    },
    /**
     * [style 计算样式]
     * @return {[type]} [description]
     */
    style () {
      const column = this.$parent.column
      const styles = {}
      if (!column || column === 3) return
      styles.width = `${100 / column}%`
      return styles
    }
  },
  methods: {
    /**
     * [onClick 点击跳转]
     * @return {[type]} [description]
     */
    onClick () {
      this.$emit('on-item-click');
      this.link && Router.go(this.link, this.$router);
    }
  }
}
</script>