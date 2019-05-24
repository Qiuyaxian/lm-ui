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
import { TransferDom } from '../../directives/transfer-dom'
import { getParentProp } from '@/utils'
const getObject = function (obj) {
  return JSON.parse(JSON.stringify(obj))
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
     * [label description]
     * @type {[type]}
     */
    label: String,
    /**
     * [valueTextAlign description]
     * @type {Object}
     */
    valueTextAlign: {
      type: String,
      default: 'right'
    },
    /**
     * [cancelText description]
     * @type {[type]}
     */
    cancelText: String,
    /**
     * [confirmText description]
     * @type {[type]}
     */
    confirmText: String,
    /**
     * [data description]
     * @type {Object}
     */
    data: {
      type: Array,
      default () {
        return []
      }
    },
    /**
     * [placeholder description]
     * @type {[type]}
     */
    placeholder: String,
    /**
     * [columns description]
     * @type {Object}
     */
    columns: {
      type: Number,
      default: 0
    },
    /**
     * [fixedColumns description]
     * @type {Object}
     */
    fixedColumns: {
      type: Number,
      default: 0
    },
    /**
     * [value description]
     * @type {Object}
     */
    value: {
      type: Array,
      default () {
        return []
      }
    },
    /**
     * [showName description]
     * @type {[type]}
     */
    showName: Boolean,
    /**
     * [inlineDesc description]
     * @type {Array}
     */
    inlineDesc: [String, Number],
    /**
     * [showCell description]
     * @type {Object}
     */
    showCell: {
      type: Boolean,
      default: true
    },
    /**
     * [show description]
     * @type {[type]}
     */
    show: Boolean,
    /**
     * [displayFormat description]
     * @type {[type]}
     */
    displayFormat: Function,
    /**
     * [isTransferDom description]
     * @type {Object}
     */
    isTransferDom: {
      type: Boolean,
      default: true
    },
    /**
     * [columnWidth description]
     * @type {[type]}
     */
    columnWidth: Array,
    /**
     * [popupStyle description]
     * @type {[type]}
     */
    popupStyle: Object,
    /**
     * [popupTitle description]
     * @type {[type]}
     */
    popupTitle: String,
    /**
     * [disabled description]
     * @type {[type]}
     */
    disabled: Boolean,
    /**
     * [borderIntent description]
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
    getNameValues () {
      return value2name(this.currentValue, this.data)
    },
    onClick () {
      if (!this.disabled) {
        this.showValue = true
      }
    },
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
    onPopupShow () {
      // reset close type to false
      this.closeType = false
      this.$emit('on-show')
    },
    onPopupHide (val) {
      if (this.value.length > 0) {
        this.tempValue = getObject(this.currentValue)
      }
      this.$emit('on-hide', this.closeType)
    },
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
<style lang="scss">
@import "~@/theme/index.scss";
@import "~@/theme/cell.scss";
@import "~@/theme/transition.scss";
@import "~@/theme/popup.scss";
</style>