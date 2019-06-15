<template>
  <div class="lm-form-preview">
    <slot name="header">
      <lm-group-title :header-label="headerLabel" :header-value="headerValue"></lm-group-title>
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
    /**
     * [headerLabel 头部左侧文字]
     * @type {[type]}
     */
    headerLabel: String,
    /**
     * [headerValue 头部右侧]
     * @type {[type]}
     */
    headerValue: String,
    /**
     * [previewItems 展示数据列表]
     * @type {[type]}
     */
    previewItems: Array
  },
  data () {
    return {}
  }
}
</script>