<template>
  <p class="vup-divider">
    <slot></slot>
  </p>
</template>

<script>
export default {
  name: 'divider'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '~@/theme/index.scss';
.#{ $class-prefix } {
  &-divider {
    display: table;
    white-space: nowrap;
    height: auto;
    overflow: hidden;
    line-height: 1;
    text-align: center;
    padding: pxTorem(viewTransform(10)) 0;
    color: #666;
    font-size: pxTorem(32);
  }
  &-divider:after,
  &-divider:before {
    content: '';
    display: table-cell;
    position: relative;
    top: 50%;
    width: 50%;
    background: linear-gradient(180deg, #ccc, #ccc, rgba(229, 229, 229, 0)) bottom left no-repeat;
    background-repeat: no-repeat;
    background-size: 100% pxTorem(viewTransform(1));
  }
  &-divider:before {
    background-position: right 1em top 50%;
  }
  &-divider:after {
    background-position: left 1em top 50%;
  }
}

</style>