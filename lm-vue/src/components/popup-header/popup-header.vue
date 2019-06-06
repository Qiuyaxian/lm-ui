<template>
  <div class="lm-popup-header" :class="showBottomBorder ? 'lm-border-bottom' : ''">
    <div class="lm-popup-header-left" @click="$emit('on-click-left')">
      <slot name="left-text">{{ leftText }}</slot>
    </div>
    <div class="lm-popup-header-title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="lm-popup-header-right" @click="$emit('on-click-right')">
      <slot name="right-text">{{ rightText }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lm-popup-header',
  props: {
    /**
     * [leftText 左侧文字]
     * @type {[type]}
     */
    leftText: String,
    /**
     * [rightText 右侧文字]
     * @type {[type]}
     */
    rightText: String,
    /**
     * [title 标题]
     * @type {[type]}
     */
    title: String,
    /**
     * [showBottomBorder 是否显示底部边框]
     * @type {Object}
     */
    showBottomBorder: {
      type: Boolean,
      default: true
    }
  }
}
</script>