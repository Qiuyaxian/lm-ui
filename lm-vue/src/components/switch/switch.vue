<template>
  <div class="lm-switch-wrapper lm-cell lm-cell-switch">
    <div class="lm-cell-bd">
      <label class="lm-label" :style="labelStyle" :class="labelClass" v-html="title"></label>
      <inline-desc v-if="inlineDesc">{{ inlineDesc }}</inline-desc>
    </div>
    <div class="lm-cell-switch-body">
      <input class="lm-switch" type="checkbox" :disabled="disabled" v-model="currentValue" />
      <div v-if="preventDefault" class="lm-switch-overlay" @click="onClick"></div>
    </div>
  </div>
</template>

<script>
import InlineDesc from '../inline-desc/inline-desc'
import { cleanStyle } from '@/utils'
export default {
  name: 'lm-switch',
  props: {
    title: {
      type: String,
      required: true
    },
    disabled: Boolean,
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    inlineDesc: [String, Boolean, Number],
    preventDefault: Boolean,
    valueMap: {
      type: Array,
      default: () => ([false, true])
    }
  },
  computed: {
    parent () {
      const { $parent } = this
      return $parent || {}
    },
    labelStyle () {
      let isHTML = /<\/?[^>]*>/.test(this.title)
      let width = Math.min(isHTML ? 5 : (this.title.length + 1), 14) + 'em'
      return cleanStyle({
        display: 'block',
        width: this.parent.labelWidth || width,
        textAlign: this.parent.labelAlign
      })
    },
    labelClass () {
      return {
        'lm-cell-justify': this.parent.labelAlign === 'justify'
      }
    }
  },
  components: {
    InlineDesc
  },
  methods: {
    /**
     * [onClick 点击事件]
     * @return {[type]} [description]
     */
    onClick () {
      this.$emit('on-click', !this.currentValue, this.currentValue)
    },
    /**
     * [toBoolean 转化为布尔值]
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    toBoolean (val) {
      if (!this.valueMap) {
        return val
      } else {
        const index = this.valueMap.indexOf(val)
        return index === 1
      }
    },
    /**
     * [toRaw description]
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    toRaw (val) {
      if (!this.valueMap) {
        return val
      } else {
        return this.valueMap[val ? 1 : 0]
      }
    }
  },
  data () {
    return {
      currentValue: this.toBoolean(this.value)
    }
  },
  watch: {
    /**
     * [currentValue 监听当前值变化]
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    currentValue (val) {
      const rawValue = this.toRaw(val)
      this.$emit('input', rawValue)
      this.$emit('on-change', rawValue)
    },
    /**
     * [value 监听外部值变化]
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    value (val) {
      this.currentValue = this.toBoolean(val)
    }
  }
}
</script>

<style lang="scss">
@import '~@/theme/index.scss';
@import '~@/theme/cell.scss';
@import '~@/theme/switch.scss';
</style>