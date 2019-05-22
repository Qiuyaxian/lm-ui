<template>
  <div class="lm-form-preview-header">
    <slot>
      <slot name="header-left">
        <label class="lm-form-preview-label" v-html="headerLabel"></label>
      </slot>
      <slot name="header-right">
        <span class="lm-form-preview-value" v-html="headerValue || '&nbsp;'"></span>
      </slot>
    </slot>
  </div>
</template>
<script>
export default {
  name: 'group-title',
  props: {
    headerLabel: String,
    headerValue: String,
    previewItems: Array
  }
};
</script>
