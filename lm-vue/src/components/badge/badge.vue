<template>
  <span v-text="text" :class="['lm-badge', {'lm-badge-dot': typeof text === 'undefined', 'lm-badge-single': typeof text !== 'undefined' && text.toString().length === 1}, `lm-badge-${type}`]"><slot></slot></span>
</template>

<script>
export default {
  name: 'lm-badge',
  props: {
    text: [String, Number],
    type: {
      type: String,
      default: 'default'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/theme/index.scss';
.#{$class-prefix} {
  &-badge {
    display: inline-block;
    text-align: center;
    font-size: pxTorem(12, 2);
    height: pxTorem(16, 2);
    line-height: pxTorem(16, 2);
    border-radius: pxTorem(8, 2);
    padding: 0 pxTorem(6, 2);
    background-clip: padding-box;
    vertical-align: middle;
  }
  &-badge-default {
    background: $badge-default-bg-color;
    color: $badge-default-color;
  }
  &-badge-primary {
    background: $badge-primary-bg-color;
    color: $badge-primary-color;
  }
  &-badge-danger {
    background: $badge-danger-bg-color;
    color: $badge-danger-color;
  }
  &-badge-warning {
    background: $badge-warning-bg-color;
    color: $badge-warning-color;
  }
  &-badge-single {
    padding: 0;
    width: pxTorem(16, 2);
  }
  &-badge-dot {
    height: auto;
    padding: pxTorem(5, 2);
  }
}

</style>
