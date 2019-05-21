<template>
  <span class="vup-label-desc"><slot></slot></span>
</template>

<script>
export default {
  name: 'inline-desc'
}
</script>

<style lang="scss">
@import '~@/theme/index.scss';
.#{$class-prefix} {
  &-label-desc{
    font-size: $cell-label-desc-fontsize;
    color: $cell-label-desc-color;
  }
}
</style>