<template>
  <a
   href="javascript:;"
   class="lm-tabbar-item"
   :class="{
     'lm-bar-item-on': isActive,
     'lm-tabbar-simple': simple
   }"
   @click="onItemClick(true)">
    <div class="lm-tabbar-icon"
       :class="[
         iconClass || $parent.iconClass,
         { 'lm-reddot': showDot }
       ]"
       v-if="!simple"
       >
      <slot name="icon" v-if="!simple && !(hasActiveIcon && isActive)"></slot>
      <slot name="icon-active" v-if="!simple && hasActiveIcon && isActive"></slot>
      <sup v-if="badge"><badge :text="badge"></badge></sup>
    </div>
    <p class="lm-tabbar-label">
      <slot name="label"></slot>
    </p>
  </a>
</template>
<script>
import Router from '@/utils/router'
export default {
  name: 'lm-tabbar-item',
  props: {
    /**
     * [showDot 是否显示小红点]
     * @type {Object}
     */
    showDot: {
      type: Boolean,
      default: false
    },
    /**
     * [selected 是否选中]
     * @type {Object}
     */
    selected: {
      type: Boolean,
      default: false
    },
    /**
     * [badge badge图标提示]
     * @type {[type]}
     */
    badge: String,
    /**
     * [link 跳转链接]
     * @type {Array}
     */
    link: [String, Object],
    /**
     * [iconClass icon图标样式]
     * @type {[type]}
     */
    iconClass: String
  },
  computed: {
    /**
     * [isActive 获取选中状态]
     * @return {Boolean} [description]
     */
    isActive () {
      return this.$parent.index === this.currentIndex && this.currentIndex !== -1;
    }
  },
  mounted () {
    if (!this.$slots.icon) {
      this.simple = true
    }
    if (this.$slots['icon-active']) {
      this.hasActiveIcon = true
    }
    this.$parent.updateIndex()
  },
  data () {
    return {
      simple: false,
      hasActiveIcon: false,
      currentIndex: -1,
      currentSelected: this.selected
    }
  },
  methods: {
    /**
     * [onItemClick 绑定点击事件]
     * @param  {Boolean} hasLink [description]
     * @return {[type]}          [description]
     */
    onItemClick (hasLink) {
      if (this.$parent.preventDefault) {
        this.$parent.$emit('on-before-index-change', this.currentIndex)
        return
      }
      if (typeof this.disabled === 'undefined' || this.disabled === false) {
        this.currentSelected = true
        this.$parent.currentIndex = this.currentIndex;
        this.$nextTick(() => {
          this.$emit('on-item-click', this.currentIndex)
        })
      }
      if (hasLink === true) {
        Router.go(this.link, this.$router)
      }
    }
  },
  watch: {
    /**
     * [currentSelected 监听当前选中]
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    currentSelected (val) {
      if (val) {
        this.$parent.index = this.currentIndex;
      }
    },
    /**
     * [selected 监听外部传入的选中状态]
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    selected (val) {
      this.currentSelected = val
    }
  },
  beforeDestroy () {
    const $parent = this.$parent
    this.$nextTick(() => {
      $parent.updateIndex()
    })
  }
}
</script>