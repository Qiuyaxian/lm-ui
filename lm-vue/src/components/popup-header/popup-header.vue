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

<style lang="scss">
@import '~@/theme/index.scss';
.#{$class-prefix} {
  &-popup-header {
    display: flex;
    height: $popup-header-height;
    line-height: $popup-header-height;
    font-size: $popup-header-font-size;
    background-color: $popup-header-bg-color;
  }
  &-popup-header-title {
    flex: 1;
    text-align: center;
    color: $popup-header-title-text-color;
  }
  &-popup-header-left {
    padding-left: $popup-header-left-text-padding;
    color: $popup-header-left-text-color;
  }
  &-popup-header-right {
    padding-right: $popup-header-right-text-padding;
    color: $popup-header-right-text-color;
  }
  &-popup-header.#{$class-prefix}-1px-b:after {
    border-color: #D9D9D9;
  }
}
</style>