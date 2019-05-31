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
