<template>
  <div class="vup-cell vup-form-preview" :class="{'vup-cell-no-border-intent': !borderIntent}">
    <div class="vup-form-preview_bd">
      <div class="vup-form-preview_item" v-for="(item, index) in list" :key="index">
        <label class="vup-form-preview_label" v-html="item.label"></label>
        <span class="vup-form-preview_value" v-html="item.value"></span>
      </div>
    </div>
  </div>
</template>
<script>
import { cleanStyle, getParentProp } from '@/utils'
export default {
  name: 'cell-preview',
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
.#{ $class-prefix } {
  &-form-preview{
    & .#{ $class-prefix }-form-preview_bd{
      width: 100%;
      padding: 0;
    }
  }
}
</style>
