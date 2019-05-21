<template>
  <div
    class="vup-tab-item"
    :class="[
      {
        'activeClass': currentSelected,
        'vup-tab-selected': currentSelected,
        'vup-tab-disabled': disabled
      }
    ]"
    :style="style"
    @click="onItemClick">
    <slot></slot>
    <span
      v-if="typeof badgeLabel !== 'undefined' && badgeLabel !== ''"
      :style="{
        background: badgeBackground,
        color: badgeColor
      }"
      class="vup-tab-item-badge">{{ badgeLabel }}</span>
  </div>
</template>

<script>
import { childMixin } from '@/mixins';
export default {
  name: 'tab-item',
  mixins: [childMixin],
  props: {
    /**
     * [activeClass 设置选中样式]
     * @type {[type]}
     */
    activeClass: String,
    /**
     * [disabled 是否禁用]
     * @type {[type]}
     */
    disabled: Boolean,
    /**
     * [badgeBackground 小红点背景色]
     * @type {Object}
     */
    badgeBackground: {
      type: String,
      default: '#f74c31'
    },
    /**
     * [badgeColor 小红点文字颜色]
     * @type {Object}
     */
    badgeColor: {
      type: String,
      default: '#fff'
    },
    /**
     * [badgeLabel 小红点文字内容]
     * @type {[type]}
     */
    badgeLabel: String
  },
  computed: {
    /**
     * [style 计算当前组件样式]
     * @return {[type]} [description]
     */
    style () {
      return {
        borderWidth: this.$parent.lineWidth + 'px',
        borderColor: this.$parent.activeColor,
        color: this.currentSelected ? this.$parent.activeColor : this.disabled ? this.$parent.disabledColor : this.$parent.defaultColor,
        border: this.$parent.animate ? 'none' : 'auto'
      }
    }
  }
}
</script>
