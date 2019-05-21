<template>
  <div class="vup-cell-box">
    <div class="vup-cell vup-tap-active" :class="{'vup-cell_access': !disabled}" @click="onClick" v-show="showCell">
      <div class="vup-cell__hd">
        <slot name="title" label-class="vup-label" :label-style="labelStyles" :label-title="title">
          <label class="vup-label" :class="labelClass" :style="labelStyles" v-if="title" v-html="title"></label>
        </slot>
        <vup-inline-desc v-if="inlineDesc">{{ inlineDesc }}</vup-inline-desc>
      </div>
      <div class="vup-cell-primary vup-popup-picker-select-box">
        <div class="vup-popup-picker-select" :style="{textAlign: valueTextAlign}">
          <span class="vup-popup-picker-value vup-cell-value" v-if="!displayFormat && !showName && value.length">{{value | array2string}}</span>
          <span class="vup-popup-picker-value vup-cell-value" v-if="!displayFormat && showName && value.length">{{value | value2name(data)}}</span>
          <span class="vup-popup-picker-value vup-cell-value" v-if="displayFormat && value.length">{{ displayFormat(value, value2name(value, data)) }}</span>
          <span v-if="!value.length && placeholder" v-text="placeholder" class="vup-popup-picker-placeholder vup-cell-placeholder"></span>
        </div>
      </div>
      <div class="vup-cell_content">
      </div>
    </div>
    <div v-transfer-dom="isTransferDom">
      <vup-popup
      v-model="showValue"
      class="vup-popup-picker"
      :id="`vup-popup-picker-${uuid}`"
      @on-hide="onPopupHide"
      @on-show="onPopupShow"
      :popup-style="popupStyle">
        <div class="vup-popup-picker-container">
          <vup-popup-header
          :left-text="cancelText || '取消'"
          :right-text="confirmText || '完成'"
          @on-click-left="onHide(false)"
          @on-click-right="onHide(true)"
          :title="popupTitle"></vup-popup-header>
          <vup-picker
          :data="data"
          v-model="tempValue"
          @on-change="onPickerChange"
          :columns="columns"
          :fixed-columns="fixedColumns"
          :container="'#vup-popup-picker-'+uuid"
          :column-width="columnWidth"></vup-picker>
        </div>
      </vup-popup>
    </div>

  </div>
</template>

<script>
import Picker from '../picker/picker'
import Cell from '../cell/cell'
import Popup from '../popup/popup'
import PopupHeader from '../popup-header/popup-header'
// import Flexbox from '../flexbox/flexbox'
// import FlexboxItem from '../flexbox/flexbox-item'
import InlineDesc from '../inline-desc/inline-desc'

import array2string from '@/filters/array2String'
import value2name from '@/filters/value2name'
import { uuidMixin } from '@/mixins'
import TransferDom from '@/directives/transfer-dom'
const getObject = function (obj) {
  return JSON.parse(JSON.stringify(obj))
}
export default {
  name: 'popup-picker',
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
    'vup-picker': Picker,
    'vup-cell': Cell,
    'vup-popup': Popup,
    'vup-popup-header': PopupHeader,
    // 'vup-flexbox': Flexbox,
    // 'vup-flexbox-item': FlexboxItem,
    'vup-inline-desc': InlineDesc
  },
  filters: {
    array2string,
    value2name
  },
  props: {
    /**
     * [valueTextAlign description]
     * @type {Object}
     */
    valueTextAlign: {
      type: String,
      default: 'right'
    },
    /**
     * [title description]
     * @type {[type]}
     */
    title: String,
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
    inlineDesc: [String, Number, Array, Object, Boolean],
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
    disabled: Boolean
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
        'vup-cell-justify': this.$parent && (this.$parent.labelAlign === 'justify' || this.$parent.$parent.labelAlign === 'justify')
      }
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
@import '~@/theme/index.scss';
@import '~@/theme/1px.scss';
@import '~@/theme/popup.scss';
.#{$class-prefix} {
  &-cell-primary {
    flex: 1;
  }
  &-cell-box {
    position: relative;
  }
  &-cell-box:not(:first-child):before {
    content: " ";
    position: absolute;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    transform-origin: 0 0;
    transform: scaleY(0.5);
    left: pxTorem(viewTransform(15));
  }
}
</style>