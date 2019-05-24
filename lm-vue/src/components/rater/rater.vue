<template>
  <div class="lm-rater">
    <input v-model="currentValue" style="display:none">
    <a
     class="lm-rater-box"
     v-for="(i, index) in max"
     :key="index"
     @click="handleClick(i-1)"
     :class="{ 'is-active' : currentValue > i-1 }"
     :style="{
       'color': colors && colors[i-1] ? colors[i-1] : defaultColor,
       'margin-right': i == max ? 0 : pxTorem(margin),
       'width': pxTorem(fontSize),
       'height': pxTorem(fontSize),
       'padding-right': i == max ? pxTorem(margin) : 0
     }">
     <span class="lm-rater-inner">
       <span :style="getRaterInnerStyle" v-html="star"></span>
       <span
       class="lm-rater-outer"
       :style="getRaterOuterStyle"
       v-if="cutPercent > 0 && cutIndex === i-1"
       v-html="star"></span>
     </span>
    </a>
  </div>
</template>

<script>
import { pxTorem } from '@/utils'
export default {
  name: 'lm-rater',
  created () {
    this.currentValue = parseInt(this.value)
  },
  mounted () {
    this.updateStyle()
  },
  props: {
    /**
     * [min 最小值]
     * @type {Object}
     */
    min: {
      type: Number,
      default: 0
    },
    /**
     * [max 最大值]
     * @type {Object}
     */
    max: {
      type: Number,
      default: 5
    },
    /**
     * [value 绑定值]
     * @type {Object}
     */
    value: {
      type: [Number, String],
      default: 0
    },
    /**
     * [disabled 是否禁用]
     * @type {[type]}
     */
    disabled: Boolean,
    /**
     * [star 评分图标]
     * @type {Object}
     */
    star: {
      type: String,
      default: '★'
    },
    /**
     * [activeColor 选中颜色]
     * @type {Object}
     */
    activeColor: {
      type: String,
      default: '#fc6'
    },
    /**
     * [defaultColor 默认颜色]
     * @type {Object}
     */
    defaultColor: {
      type: String,
      default: '#ccc'
    },
    /**
     * [margin 距离右边边距]
     * @type {Object}
     */
    margin: {
      type: Number,
      default: 4
    },
    /**
     * [fontSize 评分图标大小]
     * @type {Object}
     */
    fontSize: {
      type: Number,
      default: 32
    }
  },
  computed: {
    getRaterInnerStyle () {
      let fontSize = this.fontSize
      return {
        display: 'inline-block',
        fontSize: pxTorem(fontSize),
        width: pxTorem(fontSize),
        height: pxTorem(fontSize),
        lineHeight: pxTorem(fontSize)
      }
    },
    getRaterOuterStyle () {
      let fontSize = this.fontSize
      return {
        display: 'inline-block',
        color: this.activeColor,
        width: this.cutPercent + '%',
        fontSize: pxTorem(fontSize),
        lineHeight: pxTorem(fontSize)
      }
    },
    /**
     * [sliceValue description]
     * @return {[type]} [description]
     */
    sliceValue () {
      const _val = this.currentValue.toFixed(2).split('.');
      return _val.length === 1 ? [_val[0], 0] : _val;
    },
    /**
     * [cutIndex description]
     * @return {[type]} [description]
     */
    cutIndex () {
      return this.sliceValue[0] * 1;
    },
    /**
     * [cutPercent description]
     * @return {[type]} [description]
     */
    cutPercent () {
      return this.sliceValue[1] * 1;
    }
  },
  methods: {
    pxTorem (val) {
      return pxTorem(val)
    },
    /**
     * [handleClick 绑定点击事件]
     * @param  {[type]} i     [description]
     * @param  {[type]} force [description]
     * @return {[type]}       [description]
     */
    handleClick (i, force) {
      if (!this.disabled || force) {
        if (this.currentValue === i + 1) {
          this.currentValue = i < this.min ? this.min : i
          this.updateStyle();
        } else {
          this.currentValue = (i + 1) < this.min ? this.min : (i + 1);
        }
      }
    },
    /**
     * [updateStyle 更新行内样式]
     * @return {[type]} [description]
     */
    updateStyle () {
      let defaultColor = this.defaultColor
      let activeColor = this.activeColor
      for (var j = 0; j < this.max; j++) {
        if (j <= this.currentValue - 1) {
          this.$set(this.colors, j, activeColor);
        } else {
          this.$set(this.colors, j, defaultColor);
        }
      }
    }
  },
  data () {
    return {
      colors: [],
      currentValue: 0
    }
  },
  watch: {
    /**
     * [currentValue 监听单曲值变化]
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    currentValue (val) {
      this.updateStyle();
      this.$emit('input', val);
    },
    /**
     * [value 监听外部值，并更新组件那边数值]
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    value (val) {
      this.currentValue = val;
    }
  }
}
</script>

<style lang="scss">
@import '~@/theme/index.scss';
.#{ $class-prefix } {
  &-rater {
    text-align: left;
    display: inline-block;
    line-height: normal;
  }
  &-rater-box {
    display: inline-block;
    position: relative;
    font-size: 0;
    line-height: 0;
    text-align: center;
    cursor: pointer;
    color: $rater-color;
    &:last-child {
      margin-right: 0px!important;
    }
    &:hover {
      color: $rater-hover-color;
    }
    &.is-disabled {
      color: $rater-disabled-color !important;
      cursor: not-allowed;
    }
  }
  &-rater-inner {
    position: relative;
    display: inline-block;
  }
  &-rater-outer {
    position: absolute;
    left: 0;
    top: 0;
    display: inline-block;
    overflow: hidden;
  }
}
</style>