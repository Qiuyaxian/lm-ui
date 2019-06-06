<template>
  <div class="lm-popup-picker-wrapper">
    <lm-cell :borderIntent="getBorderIntent"
             :label="label"
             @on-cell-click="onClick"
             :inlineDesc="inlineDesc" :content="value">
      <div class="lm-popup-picker-select"
           :style="{textAlign: valueTextAlign}">
        <span class="lm-popup-picker-value lm-cell-value"
              v-if="!displayFormat && !showName && value.length">{{value | array2string}}</span>
        <span class="lm-popup-picker-value lm-cell-value"
              v-if="!displayFormat && showName && value.length">{{value | value2name(data)}}</span>
        <span class="lm-popup-picker-value lm-cell-value"
              v-if="displayFormat && value.length">{{ displayFormat(value, value2name(value, data)) }}</span>
        <span v-if="!value.length && placeholder"
              v-text="placeholder"
              class="lm-popup-picker-placeholder lm-cell-placeholder"></span>
      </div>
    </lm-cell>
    <div v-transfer-dom="isTransferDom">
      <lm-popup v-model="showValue"
                class="lm-popup-picker"
                :id="`lm-popup-picker-${uuid}`"
                @on-hide="onPopupHide"
                @on-show="onPopupShow"
                :popup-style="popupStyle">
        <div class="lm-popup-picker-container">
          <lm-popup-header :left-text="cancelText || '取消'"
                           :right-text="confirmText || '完成'"
                           @on-click-left="onHide(false)"
                           @on-click-right="onHide(true)"
                           :title="popupTitle"></lm-popup-header>
          <lm-picker :data="data"
                     v-model="tempValue"
                     @on-change="onPickerChange"
                     :columns="columns"
                     :fixed-columns="fixedColumns"
                     :container="'#lm-popup-picker-'+uuid"
                     :column-width="columnWidth"></lm-picker>
        </div>
      </lm-popup>
    </div>
  </div>
</template>

<script>
import Picker from '../picker/picker'
import Cell from '../cell/cell'
import Popup from '../popup/popup'
import PopupHeader from '../popup-header/popup-header'
import InlineDesc from '../inline-desc/inline-desc'
import array2string from '@/filters/array2String'
import value2name from '@/filters/value2name'
import { uuidMixin } from '@/mixins'
import TransferDom from '../../directives/transfer-dom'
import { getParentProp } from '@/utils'
const getObject = function (obj) {
  return JSON.parse(JSON.stringify(obj));
}
export default {
  name: 'lm-popup-picker',
  directives: {
    TransferDom
  },
  created () {
    if (typeof this.show !== 'undefined') {
      this.showValue = this.show
    }
  },
  mixins: [uuidMixin],
  components: {
    'lm-picker': Picker,
    'lm-cell': Cell,
    'lm-popup': Popup,
    'lm-popup-header': PopupHeader,
    'lm-inline-desc': InlineDesc
  },
  filters: {
    array2string,
    value2name
  },
  props: {
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
     * [label 左侧文字说明]
     * @type {[type]}
     */
    label: String,
    /**
     * [valueTextAlign 文字对齐方式]
     * @type {Object}
     */
    valueTextAlign: {
      type: String,
      default: 'right'
    },
    /**
     * [cancelText 弹出层左侧取消文字]
     * @type {[type]}
     */
    cancelText: String,
    /**
     * [confirmText 弹出层右侧取消文字]
     * @type {[type]}
     */
    confirmText: String,
    /**
     * [data 绑定数据]
     * @type {Object}
     */
    data: {
      type: Array,
      default () {
        return []
      }
    },
    /**
     * [placeholder 默认提示语]
     * @type {[type]}
     */
    placeholder: String,
    /**
     * [columns 列数]
     * @type {Object}
     */
    columns: {
      type: Number,
      default: 0
    },
    /**
     * [fixedColumns 指定显示列数]
     * @type {Object}
     */
    fixedColumns: {
      type: Number,
      default: 0
    },
    /**
     * [showName 是否显示名字]
     * @type {[type]}
     */
    showName: Boolean,
    /**
     * [inlineDesc 小文字说明]
     * @type {Array}
     */
    inlineDesc: [String, Number],
    /**
     * [showCell 是否显示cell]
     * @type {Object}
     */
    showCell: {
      type: Boolean,
      default: true
    },
    /**
     * [show 是否显示]
     * @type {[type]}
     */
    show: Boolean,
    /**
     * [displayFormat 展示格式]
     * @type {[type]}
     */
    displayFormat: Function,
    /**
     * [isTransferDom 是否删除当前位置，插入到底部]
     * @type {Object}
     */
    isTransferDom: {
      type: Boolean,
      default: true
    },
    /**
     * [columnWidth 列宽度]
     * @type {[type]}
     */
    columnWidth: Array,
    /**
     * [popupStyle 弹出层行内样式]
     * @type {[type]}
     */
    popupStyle: Object,
    /**
     * [popupTitle 弹出层标题]
     * @type {[type]}
     */
    popupTitle: String,
    /**
     * [disabled 是否禁用]
     * @type {[type]}
     */
    disabled: Boolean,
    /**
     * [borderIntent 边框左侧是否存在距离]
     * @type {Boolean}
     */
    borderIntent: false
  },
  computed: {
    labelStyles () {
      return {
        display: 'block',
        width: (this.$parent && (this.$parent.labelWidth || this.$parent.$parent.labelWidth)) || 'auto',
        textAlign: this.$parent && (this.$parent.labelAlign || this.$parent.$parent.labelAlign),
        marginRight: this.$parent && (this.$parent.labelMarginRight || this.$parent.$parent.labelMarginRight)
      }
    },
    labelClass () {
      return {
        'lm-cell-justify': this.$parent && (this.$parent.labelAlign === 'justify' || this.$parent.$parent.labelAlign === 'justify')
      }
    },
    getBorderIntent () {
      return getParentProp(this, 'borderIntent') || this.borderIntent;
    }
  },
  methods: {
    value2name,
    /**
     * [getNameValues 获取当前值]
     * @return {[type]} [description]
     */
    getNameValues () {
      return value2name(this.currentValue, this.data)
    },
    /**
     * [onClick 点击打开弹出层]
     * @return {[type]} [description]
     */
    onClick () {
      if (!this.disabled) {
        this.showValue = true
      }
    },
    /**
     * [onHide 弹出层关闭]
     * @param  {[type]} type [description]
     * @return {[type]}      [description]
     */
    onHide (type) {
      this.showValue = false
      if (type) {
        this.closeType = true
        this.currentValue = getObject(this.tempValue)
      }
      if (!type) {
        this.closeType = false
        if (this.value.length > 0) {
          this.tempValue = getObject(this.currentValue)
        }
      }
    },
    /**
     * [onPopupShow 弹出层显示]
     * @return {[type]} [description]
     */
    onPopupShow () {
      // reset close type to false
      this.closeType = false
      this.$emit('on-show')
    },
    /**
     * [onPopupHide 弹出层隐藏]
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    onPopupHide (val) {
      if (this.value.length > 0) {
        this.tempValue = getObject(this.currentValue)
      }
      this.$emit('on-hide', this.closeType)
    },
    /**
     * [onPickerChange 滚动选择时触发]
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    onPickerChange (val) {
      if (JSON.stringify(this.currentValue) !== JSON.stringify(val)) {
        // if has value, replace it
        if (this.value.length) {
          const nowData = JSON.stringify(this.data)
          if (nowData !== this.currentData && this.currentData !== '[]') {
            this.tempValue = getObject(val)
          }
          this.currentData = nowData
        } else { // if no value, stay quiet
          // if set to auto update, do update the value
        }
      }
      const _val = getObject(val)
      this.$emit('on-shadow-change', _val, value2name(_val, this.data).split(' '))
    }
  },
  watch: {
    value (val) {
      if (JSON.stringify(val) !== JSON.stringify(this.tempValue)) {
        this.tempValue = getObject(val)
        this.currentValue = getObject(val)
      }
    },
    currentValue (val) {
      this.$emit('input', getObject(val))
      this.$emit('on-change', getObject(val))
    },
    show (val) {
      this.showValue = val
    },
    showValue (val) {
      this.$emit('update:show', val)
    }
  },
  data () {
    return {
      onShowProcess: false,
      tempValue: getObject(this.value),
      closeType: false,
      currentData: JSON.stringify(this.data), // used for detecting if it is after data change
      showValue: false,
      currentValue: this.value
    }
  }
}
</script>