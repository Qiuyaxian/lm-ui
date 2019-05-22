<template>
  <div class="lm-form-preview">
    <slot name="header">
      <group-title :header-label="headerLabel" :header-value="headerValue"></group-title>
    </slot>
    <slot>
      <lm-cell-preview :list="previewItems"></lm-cell-preview>
    </slot>
  </div>
</template>
<script>
import { GroupTitle } from '../group';
export default {
  name: 'lm-form-preview',
  componentName: 'lm-form-preview',
  components: {
    GroupTitle
  },
  props: {
    headerLabel: String,
    headerValue: String,
    previewItems: Array
  },
  data () {
    return {}
  }
}
</script>
<style lang="scss">
@import '~@/theme/index.scss';
@import '~@/theme/cell.scss';
</style>