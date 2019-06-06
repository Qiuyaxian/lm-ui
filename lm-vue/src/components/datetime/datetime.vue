<template>
  <a class="lm-datetime lm-cell"
     :class="{'lm-cell-access': !readonly}"
     :data-cancel-text="'取消'"
     :data-confirm-text="'确定'"
     href="javascript:;">
    <slot>
      <div>
        <slot name="title">
          <p :style="styles"
             :class="labelClass"
             v-html="label"></p>
        </slot>
        <inline-desc v-if="inlineDesc">{{ inlineDesc }}</inline-desc>
      </div>
      <div class="lm-cell-content lm-cell-primary lm-datetime-value"
           :style="{
          textAlign: valueTextAlign
        }">
        <span class="lm-cell-placeholder"
              v-if="!currentValue && placeholder">{{ placeholder }}</span>
        <span class="lm-cell-value"
              v-if="currentValue">{{ displayFormat ? displayFormat(currentValue) : currentValue }}</span>
      </div>
    </slot>
  </a>
</template>

<script>
// import Icon from '../icon'
import Picker from './datetimepicker'
import Group from '../group/group'
import InlineDesc from '../inline-desc/inline-desc'
import { uuidMixin } from '@/mixins'
import { format } from '@/utils';

export default {
  name: 'lm-datetime',
  mixins: [uuidMixin],
  components: {
    Group,
    InlineDesc
    // Icon
  },
  props: {
    /**
     * [format 格式]
     * @type {Object}
     */
    format: {
      type: String,
      default: 'YYYY-MM-DD',
      validator (val) {
        /* istanbul ignore if */
        if (process.env.NODE_ENV === 'development' && val && /A/.test(val) && val !== 'YYYY-MM-DD A') {
          return console.error('[VUX] Datetime prop:format 使用 A 时只允许的值为： YYYY-MM-DD A')
        }
        return true
      }
    },
    /**
     * [label 左侧文字]
     * @type {[type]}
     */
    label: String,
    /**
     * [value 绑定值]
     * @type {Object}
     */
    value: {
      type: String,
      default: ''
    },
    /**
     * [inlineDesc 小文字]
     * @type {[type]}
     */
    inlineDesc: String,
    /**
     * [placeholder 默认显示文字]
     * @type {[type]}
     */
    placeholder: String,
    /**
     * [minYear 最小年份]
     * @type {[type]}
     */
    minYear: Number,
    /**
     * [minYear 最大年份]
     * @type {[type]}
     */
    maxYear: Number,
    /**
     * [confirmText 确认文字]
     * @type {[type]}
     */
    confirmText: String,
    /**
     * [confirmText 取消文字]
     * @type {[type]}
     */
    cancelText: String,
    /**
     * [confirmText 清除文字]
     * @type {[type]}
     */
    clearText: String,
    /**
     * [yearRow 自定义展示年份]
     * @type {Object}
     */
    yearRow: {
      type: String,
      default: '{value}'
    },
    /**
     * [monthRow 自定义展示月份]
     * @type {Object}
     */
    monthRow: {
      type: String,
      default: '{value}'
    },
    /**
     * [dayRow 自定义展示天数]
     * @type {Object}
     */
    dayRow: {
      type: String,
      default: '{value}'
    },
    /**
     * [hourRow 自定义展示小时]
     * @type {Object}
     */
    hourRow: {
      type: String,
      default: '{value}'
    },
    /**
     * [minuteRow 自定义展示分钟]
     * @type {Object}
     */
    minuteRow: {
      type: String,
      default: '{value}'
    },
    /**
     * [secondRow 自定义展示秒]
     * @type {Object}
     */
    secondRow: {
      type: String,
      default: '{value}'
    },
    /**
     * [required 是否必填]
     * @type {Object}
     */
    required: {
      type: Boolean,
      default: false
    },
    /**
     * [minHour 最小小时]
     * @type {Object}
     */
    minHour: {
      type: Number,
      default: 0
    },
    /**
     * [maxHour 最大小时]
     * @type {Object}
     */
    maxHour: {
      type: Number,
      default: 23
    },
    /**
     * [startDate 开始时间]
     * @type {Object}
     */
    startDate: {
      type: String,
      validator (val) {
        /* istanbul ignore if */
        if (process.env.NODE_ENV === 'development' && val && val.length !== 10) {
          console.error('Datetime prop:start-date 必须为 YYYY-MM-DD 格式')
        }
        return val ? val.length === 10 : true
      }
    },
    /**
     * [endDate 结束时间]
     * @type {Object}
     */
    endDate: {
      type: String,
      validator (val) {
        /* istanbul ignore if */
        if (process.env.NODE_ENV === 'development' && val && val.length !== 10) {
          console.error('[VUX] Datetime prop:end-date 必须为 YYYY-MM-DD 格式')
        }
        return val ? val.length === 10 : true
      }
    },
    /**
     * [valueTextAlign 文字方法]
     * @type {[type]}
     */
    valueTextAlign: String,
    /**
     * [displayFormat 显示文字格式]
     * @type {[type]}
     */
    displayFormat: Function,
    /**
     * [readonly 是否自读]
     * @type {[type]}
     */
    readonly: Boolean,
    /**
     * [hourList 小时列表]
     * @type {[type]}
     */
    hourList: Array,
    /**
     * [minuteList 分钟列表]
     * @type {[type]}
     */
    minuteList: Array,
    /**
     * [show 是否显示]
     * @type {[type]}
     */
    show: Boolean,
    /**
     * [defaultSelectedValue 默认选择值]
     * @type {[type]}
     */
    defaultSelectedValue: String,
    /**
     * [computeHoursFunction 外部计算处理小时函数]
     * @type {[type]}
     */
    computeHoursFunction: Function,
    /**
     * [computeHoursFunction 外部计算处理天数函数]
     * @type {[type]}
     */
    computeDaysFunction: Function,
    orderMap: Object
  },
  created () {
    this.isFirstSetValue = false
    this.currentValue = this.value
  },
  data () {
    return {
      currentShow: false,
      currentValue: null,
      valid: true,
      errors: {}
    }
  },
  mounted () {
    const uuid = this.uuid
    this.$el.setAttribute('id', `lm-datetime-${uuid}`)
    if (!this.readonly) {
      this.$nextTick(() => {
        this.render()
        if (this.show) {
          this.$nextTick(() => {
            this.picker && this.picker.show(this.currentValue)
          })
        }
      })
    }
  },
  computed: {
    styles () {
      if (!this.$parent) {
        return {}
      }
      return {
        width: this.$parent.labelWidth,
        textAlign: this.$parent.labelAlign,
        marginRight: this.$parent.labelMarginRight
      }
    },
    pickerOptions () {
      let _this = this
      let options = {
        trigger: '#lm-datetime-' + this.uuid,
        format: this.format,
        value: this.currentValue,
        output: '.lm-datetime-value',
        confirmText: _this.getButtonText('confirm'),
        cancelText: _this.getButtonText('cancel'),
        clearText: _this.clearText,
        yearRow: this.yearRow,
        monthRow: this.monthRow,
        dayRow: this.dayRow,
        hourRow: this.hourRow,
        minuteRow: this.minuteRow,
        minHour: this.minHour,
        maxHour: this.maxHour,
        startDate: this.startDate,
        endDate: this.endDate,
        hourList: this.hourList,
        minuteList: this.minuteList,
        defaultSelectedValue: this.defaultSelectedValue,
        computeHoursFunction: this.computeHoursFunction,
        computeDaysFunction: this.computeDaysFunction,
        orderMap: this.orderMap || {},
        onSelect (type, val, wholeValue) {
          if (_this.picker && _this.picker.config.renderInline) {
            _this.$emit('input', wholeValue)
            _this.$emit('on-change', wholeValue)
          }
        },
        onConfirm (value) {
          _this.currentValue = value
        },
        onClear (value) {
          _this.$emit('on-clear', value)
        },
        onHide (type) {
          _this.currentShow = false
          _this.$emit('update:show', false)
          _this.validate()
          _this.$emit('on-hide', type)
          if (type === 'cancel') {
            _this.$emit('on-cancel')
          }
          if (type === 'confirm') {
            _this.timer = setTimeout(() => {
              _this.$nextTick(() => {
                if (_this.timer) clearTimeout(_this.timer)
                _this.$emit('on-confirm', _this.value)
              })
            })
          }
        },
        onShow () {
          _this.currentShow = true
          _this.$emit('update:show', true)
          _this.$emit('on-show')
        }
      }
      if (this.minYear) {
        options.minYear = this.minYear
      }
      if (this.maxYear) {
        options.maxYear = this.maxYear
      }
      return options
    },
    firstError () {
      let key = Object.keys(this.errors)[0]
      return this.errors[key]
    },
    labelClass () {
      if (!this.$parent) {
        return {}
      }
      return {
        'lm-cell-justify': this.$parent.labelAlign === 'justify' || this.$parent.$parent.labelAlign === 'justify'
      }
    }
  },
  methods: {
    /**
     * [getButtonText 按钮文字]
     * @param  {[type]} type [description]
     * @return {[type]}      [description]
     */
    getButtonText (type) {
      if (type === 'cancel' && this.cancelText) {
        return this.cancelText
      } else if (type === 'confirm' && this.confirmText) {
        return this.confirmText
      }
      return this.$el.getAttribute(`data-${type}-text`)
    },
    /**
     * [render 渲染函数]
     * @return {[type]} [description]
     */
    render () {
      this.$nextTick(() => {
        this.picker && this.picker.destroy()
        this.picker = new Picker(this.pickerOptions)
      })
    },
    /**
     * [validate 校验]
     * @return {[type]} [description]
     */
    validate () {
      if (!this.currentValue && this.required) {
        this.valid = false
        this.errors.required = '必填'
        return
      }
      this.valid = true
      this.errors = {}
    }
  },
  watch: {
    readonly (val) {
      if (val) {
        this.picker && this.picker.destroy()
      } else {
        this.render()
      }
    },
    show (val) {
      if (val === this.currentShow) return
      if (val) {
        this.picker && this.picker.show(this.currentValue)
      } else {
        this.picker && this.picker.hide(this.currentValue)
      }
    },
    currentValue (val, oldVal) {
      this.$emit('input', val)
      if (!this.isFirstSetValue) {
        this.isFirstSetValue = true
        oldVal && this.$emit('on-change', val)
      } else {
        this.$emit('on-change', val)
      }
      this.validate()
    },
    startDate () {
      this.render()
    },
    endDate () {
      this.render()
    },
    format (val) {
      if (this.currentValue) {
        this.currentValue = format(this.currentValue, val)
      }
      this.render()
    },
    value (val) {
      // do not force render when renderInline is true
      if (this.readonly || (this.picker && this.picker.config.renderInline)) {
        this.currentValue = val
        return
      }
      if (this.currentValue !== val) {
        this.currentValue = val
        this.render()
      }
    }
  },
  beforeDestroy () {
    this.picker && this.picker.destroy()
    if (this.timer) clearTimeout(this.timer)
  }
}
</script>