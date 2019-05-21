<template>
  <div class="vup-cell" :class="{
      'vup-tap-active': isLink || !!link,
      'vup-cell_access': isLink || !!link,
      'vup-cell-no-border-intent': !getBorderIntent,
      'vup-cell-disabled': disabled
    }"
    :style="style"
    @click="onClick"
    >
    <!-- icon start -->
    <div class="vup-cell_icon">
      <slot name="icon"></slot>
    </div>
    <!-- icon end -->
    <!-- 左侧文字 start -->
    <div class="vup-cell_label" :style="cellStyles" :class="{'vup-cell-primary': primary === 'title' && valueAlign !== 'left'}">
      <p class="">
        <label class="" :style="labelStyles" :class="labelClass">
          <slot name="label">{{ label }}</slot>
        </label>
      </p>
      <!-- 小文字 start -->
      <inline-desc>
        <slot name="inline-desc">{{ inlineDesc }}</slot>
      </inline-desc>
      <!-- 小文字 end -->
    </div>
    <!-- 左侧文字 end -->

    <!-- 右侧文字 start -->
    <div class="vup-cell_content">
      <slot>{{ content }}</slot>
    </div>
    <!-- 右侧文字 end -->
  </div>
</template>
<script>
import inlineDesc from '../inline-desc/inline-desc'
import { cleanStyle, getParentProp, Router } from '@/utils'
export default {
  name: 'cell',
  props: {
    /**
     * [label 左侧文字内容]
     * @type {Array}
     */
    label: [String, Number],
    /**
     * [content 右侧文字内容]
     * @type {Array}
     */
    content: [String, Number, Array],
    /**
     * [isLink 是否是链接]
     * @type {Boolean}
     */
    isLink: Boolean,
    /**
     * [inlineDesc 小文字说明]
     * @type {Array}
     */
    inlineDesc: [String, Number],
    /**
     * [link 链接地址]
     * @type {Array}
     */
    link: [String, Object],
    /**
     * [valueAlign 左边对齐方式]
     * @type {Array}
     */
    valueAlign: [String, Boolean, Number],
    /**
     * [borderIntent 是否开启边框]
     * @type {Object}
     */
    borderIntent: Boolean,
    /**
     * [primary description]
     * @type {Object}
     */
    primary: {
      type: String,
      default: 'title'
    },
    /**
     * [disabled 是否禁用]
     * @type {[type]}
     */
    disabled: Boolean,
    /**
     * [alignItems 右侧文字对齐]
     * @type {[type]}
     */
    alignItems: String
  },
  data () {
    return {}
  },
  created () {
  },
  components: {
    inlineDesc
  },
  methods: {
    /**
     * [onClick 点击事件绑定]
     * @return {[type]} [description]
     */
    onClick () {
      // 跳转
      !this.disabled && this.link && Router.go && Router.go(this.link, this.$router)
    }
  },
  computed: {
    getBorderIntent () {
      return getParentProp(this, 'borderIntent') || this.borderIntent;
    },
    /**
     * [cellStyles 计算左侧cell的宽度]
     * @return {[type]} [description]
     */
    cellStyles () {
      return cleanStyle({
        width: getParentProp(this, 'cellWidth')
      });
    },
    /**
     * [labelStyles 计算label 样式]
     * @return {[type]} [description]
     */
    labelStyles () {
      return cleanStyle({
        width: getParentProp(this, 'labelWidth'),
        textAlign: getParentProp(this, 'labelAlign')
      });
    },
    /**
     * [labelClass 计算label label class ]
     * @return {[type]} [description]
     */
    labelClass () {
      return {
        'vup-cell-justify': this.$parent && (this.$parent.labelAlign === 'justify' || this.$parent.$parent.labelAlign === 'justify')
      }
    },
    /**
     * [valueClass 计算右侧文字样式]
     * @return {[type]} [description]
     */
    valueClass () {
      return {
        'vup-cell-primary': this.primary === 'content' || this.valueAlign === 'left'
        // 'vup-cell-align-left': this.valueAlign === 'left',
        // 'vup-cell-arrow-up': this.arrowDirection === 'up',
        // 'vup-cell-arrow-down': this.arrowDirection === 'down'
      }
    },
    /**
     * [style 子项的样式]
     * @return {[type]} [description]
     */
    style () {
      if (this.alignItems) {
        return {
          alignItems: this.alignItems
        }
      }
    }
  }
};
</script>
<style lang="scss">
@import '~@/theme/index.scss';
@import '~@/theme/cell.scss';
</style>