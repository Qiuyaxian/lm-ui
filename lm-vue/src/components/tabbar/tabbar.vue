<template>
  <div class="lm-tabbar">
     <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'tabbar',
  props: {
    iconClass: String,
    value: Number
  },
  data () {
    return {
      index: -1,
      currentIndex: this.index,
      number: this.$children.length
    }
  },
  mounted () {
    if (process.env.NODE_ENV === 'development') {
      this.$nextTick(() => {
        const $el = this.$el
        const position = window.getComputedStyle($el).position
        if (position === 'fixed') {
          return false;
        } else if (position === 'absolute') {
          if (document.documentElement.offsetHeight !== window.innerHeight) {
            console.warn('[lm warn] tabbar 定位默认为 absolute，如果你没有使用 100% 布局(view-box)，需要手动设置 style position 为 fixed')
          }
        }
      })
    }
    if (this.value >= 0) {
      this.currentIndex = this.value
    }
    this.updateIndex();
  },
  watch: {
    /**
     * [currentIndex 监听当前值]
     * @param  {[type]} val    [description]
     * @param  {[type]} oldVal [description]
     * @return {[type]}        [description]
     */
    currentIndex (val, oldVal) {
      oldVal > -1 && this.$children[oldVal] && (this.$children[oldVal].currentSelected = false)
      val > -1 && this.$children[val] && (this.$children[val].currentSelected = true)
      this.$emit('input', val)
      this.$emit('on-index-change', val, oldVal)
    },
    /**
     * [index 监听索引变化]
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    index (val) {
      this.currentIndex = val
    },
    /**
     * [value 监听绑定值]
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    value (val) {
      this.index = val
    }
  },
  methods: {
    /**
     * [updateIndex 更新索引]
     * @return {[type]} [description]
     */
    updateIndex () {
      if (!this.$children || !this.$children.length) return
      this.number = this.$children.length
      let children = this.$children
      for (let i = 0; i < children.length; i++) {
        children[i].currentIndex = i
        if (children[i].currentSelected) {
          this.index = i
        }
      }
    }
  }
}
</script>
<style lang="scss">
@import '~@/theme/index.scss';
@import '~@/theme/tabbar.scss';
</style>