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
    leftText: String,
    rightText: String,
    title: String,
    showBottomBorder: {
      type: Boolean,
      default: true
    }
  }
}
</script>