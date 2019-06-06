<template>
  <span v-text="text" :class="['lm-badge', {'lm-badge-dot': typeof text === 'undefined', 'lm-badge-single': typeof text !== 'undefined' && text.toString().length === 1}, `lm-badge-${type}`]"><slot></slot></span>
</template>

<script>
export default {
  name: 'lm-badge',
  props: {
    /**
     * [text badge显示文字]
     * @type {Array}
     */
    text: [String, Number],
    /**
     * [type badge类型]
     * @type {Object}
     */
    type: {
      type: String,
      default: 'default'
    }
  }
}
</script>
