<template>
  <span class="lm-spinner"
        :class="className"
        :style="styles">
    <slot></slot>
  </span>
</template>
<script>
import Spinner from '@/utils/spinner';
const types = ['android', 'ios', 'ios-small', 'bubbles', 'circles', 'crescent', 'dots', 'lines', 'ripple', 'spiral']
export default {
  name: 'lm-spinner',
  mounted () {
    this.$nextTick(() => {
      let parentNode = this.$el.parentNode;
      if (parentNode && /cell/i.test(parentNode.className)) parentNode.style.lineHeight = 0;
      /**
       * 实例化Spinner对象
       */
      Spinner(this.$el, this.type, this.size)
    })
  },
  props: {
    /**
     * [type Spinner 类型]
     * @type {Object}
     */
    type: {
      type: String,
      default: 'ios'
    },
    /**
     * [size 图标大小]
     * @type {[type]}
     */
    size: String
  },
  computed: {
    /**
     * [styles 返回行内样式]
     * @return {[type]} [description]
     */
    styles () {
      if (typeof this.size !== 'undefined' && this.size !== '28px') {
        return {
          width: this.size,
          height: this.size
        }
      }
    },
    /**
     * [className 返回class样式类]
     * @return {[type]} [description]
     */
    className () {
      let rs = {}
      for (let i = 0; i < types.length; i++) {
        rs[`lm-spinner-${types[i]}`] = this.type === types[i]
      }
      return rs
    }
  }
}
</script>