<template>
  <span class="vup-spinner" :class="className" :style="styles"><slot></slot></span>
</template>

<script>
import Spinner from '@/utils/spinner';
const types = ['android', 'ios', 'ios-small', 'bubbles', 'circles', 'crescent', 'dots', 'lines', 'ripple', 'spiral']
export default {
  name: 'spinner',
  mounted () {
    this.$nextTick(() => {
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
        rs[`vup-spinner-${types[i]}`] = this.type === types[i]
      }
      return rs
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '~@/theme/index.scss';
.#{ $class-prefix } {
  &-spinner {
    stroke: $spinner-color;
    fill: $spinner-color;
    vertical-align: middle;
    display: inline-block;
    line-height: pxTorem($spinner-size);
    @include setWidthHeight($spinner-size, $spinner-size);
    & svg {
      @include setWidthHeight($spinner-size, $spinner-size);
    }
    &.#{ $class-prefix }-spinner-inverse {
      stroke: #fff;
      fill: #fff;
    }
  }
  &-spinner-android {
    stroke: $spinner-android-color;
  }
  &-spinner-ios,
  &-spinner-ios-small {
    stroke: $spinner-color;
  }
  &-spinner-spiral {
    & .stop1 {
      stop-color: #fff;
      stop-opacity: 0;
    }
    & .stop2 {
      stop-color: $spinner-color;
      stop-opacity: 1;
    }
    &.#{ $class-prefix }-spinner-inverse {
      & .stop1 {
        stop-color: #000;
      }
      & .stop2 {
        stop-color: #fff;
      }
    }
  }
}
</style>