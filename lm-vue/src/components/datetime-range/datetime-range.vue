<template>
  <popup-picker :data="list" :label="label" :display-format="cellFormat" v-model="currentValue" :inline-desc="inlineDesc" :placeholder="placeholder" @on-hide="_onHide" @on-show="$emit('on-show')" :value-text-align="valueTextAlign" :column-width="[1/2, 1/6]"></popup-picker>
</template>

<script>
import value2name from '@/filters/value2name'
import PopupPicker from '../popup-picker/popup-picker'
import { formatRange } from '@/utils'
import { numberRange } from '@/utils/number'
export default {
  name: 'lm-datetime-range',
  components: {
    PopupPicker
  },
  props: {
    /**
     * [label 左边文字值]
     * @type {Object}
     */
    label: {
      type: String,
      required: true
    },
    /**
     * [value 绑定值]
     * @type {Object}
     */
    value: {
      type: Array,
      default () {
        return []
      }
    },
    /**
     * [startDate 开始时间]
     * @type {[type]}
     */
    startDate: String,
    /**
     * [endDate 结束时间]
     * @type {[type]}
     */
    endDate: String,
    /**
     * [format 格式]
     * @type {Object}
     */
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    /**
     * [inlineDesc 小型文字]
     * @type {[type]}
     */
    inlineDesc: String,
    /**
     * [placeholder 文字默认显示值]
     * @type {[type]}
     */
    placeholder: String
  },
  methods: {
    /**
     * [_onHide 触发外部隐藏函数]
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    _onHide (val) {
      this.$emit('on-hide', val)
    }
  },
  data () {
    return {
      currentValue: this.value,
      cellFormat (val) {
        return val[0] + ' ' + val[1] + ':' + val[2]
      }
    }
  },
  computed: {
    list () {
      if (!this.startDate || !this.endDate) {
        return []
      }
      const datesNames = formatRange(this.startDate, this.endDate, this.format)

      const datesValues = formatRange(this.startDate, this.endDate, 'YYYY-MM-DD')

      const hours = numberRange(0, 23)
      const minutes = numberRange(0, 59)

      return [datesNames.map((one, index) => {
        return {
          name: one,
          value: datesValues[index]
        }
      }), hours, minutes]
    },
    nameValue () {
      return value2name(this.currentValue, this.list)
    }
  },
  watch: {
    currentValue (val) {
      this.$emit('on-change', val)
      this.$emit('input', val)
    },
    value (val) {
      this.currentValue = val
    }
  }
}
</script>