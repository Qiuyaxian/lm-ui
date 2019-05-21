<template>
  <span v-text="text" :class="['vup-badge', {'vup-badge-dot': typeof text === 'undefined', 'vup-badge-single': typeof text !== 'undefined' && text.toString().length === 1}, `vup-badge-${type}`]"><slot></slot></span>
</template>

<script>
export default {
  name: 'badge',
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
    font-size: pxTorem(viewTransform(12));
    height: pxTorem(viewTransform(16));
    line-height: pxTorem(viewTransform(16));
    border-radius: pxTorem(viewTransform(8));
    padding: 0 pxTorem(viewTransform(6));
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
    width: pxTorem(viewTransform(16));
  }
  &-badge-dot {
    height: auto;
    padding: pxTorem(viewTransform(5))
  }
}

</style>
