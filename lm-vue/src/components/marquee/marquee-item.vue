<template>
  <li>
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: 'lm-marquee-item',
  mounted () {
    this.$nextTick(() => {
      this.$parent.destroy()
      this.$parent.init()
      this.$parent.start()
    })
  }
}
</script>