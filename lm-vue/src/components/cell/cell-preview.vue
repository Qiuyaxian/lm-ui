<template>
  <div class="lm-form-preview">
    <div class="lm-form-preview-item" :class="{'lm-cell-no-border-intent': !borderIntent, 'lm-cell': showBorder}" v-for="(item, index) in list" :key="index">
      <label class="lm-form-preview-label" v-html="item.label"></label>
      <span class="lm-form-preview-value" v-html="item.value"></span>
    </div>
  </div>
</template>
<script>
import { cleanStyle, getParentProp } from '@/utils'
export default {
  name: 'lm-cell-preview',
  props: {
    /**
     * [list 列表]
     * @type {[type]}
     */
    list: Array,

    /**
     * [borderIntent 是否开启边框]
     * @type {Object}
     */
    showBorder: {
      type: Boolean,
      default: true
    },
    /**
     * [borderIntent description]
     * @type {Object}
     */
    borderIntent: {
      type: Boolean,
      default: true
    }
  }
};
</script>
<style lang="scss">
@import '~@/theme/index.scss';
@import '~@/theme/cell.scss';
</style>
