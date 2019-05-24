<template>
  <div class="" v-bind="$attrs" v-on="$listeners">
    <div v-bind="$attrs" v-on="$listeners" v-transfer-dom="isTransferDom">
      <popup
      v-bind="$attrs" v-on="$listeners"
      v-model="showValue"
      class="lm-popup-picker"
      :id="`lm-popup-picker-${uuid}`"
      @on-hide="onPopupHide"
      @on-show="onPopupShow"
      :popup-style="popupStyle">
        <div class="lm-popup-picker-container">
          <popup-header
          v-bind="$attrs" v-on="$listeners"
          :left-text="cancelText || '取消'"
          :right-text="confirmText || '完成'"
          @on-click-left="onHide(false)"
          @on-click-right="onHide(true)"
          :title="popupTitle"></popup-header>
          <picker
          v-bind="$attrs" v-on="$listeners"
          :data="data"
          v-model="tempValue"
          @on-change="onPickerChange"
          :fixed-columns="hideDistrict ? 2 : 0"
          :columns="3"
          :container="'#lm-popup-picker-'+uuid"
          :column-width="columnWidth"></picker>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>

import array2string from '@/filters/array2String'
import value2name from '@/filters/value2name'
import { uuidMixin, dispatchMixin } from '@/mixins'
import TransferDom from '@/directives/transfer-dom'

import Picker from '../picker/picker'
import Popup from '../popup/popup'
import PopupHeader from '../popup-header/popup-header'
const getObject = function (obj) {
  return JSON.parse(JSON.stringify(obj))
}
export default {
  name: 'lm-address-components',
  directives: {
    TransferDom
  },
  mixins: [ uuidMixin, dispatchMixin ],
  components: {
    Picker,
    Popup,
    PopupHeader
  },
  filters: {
    array2string,
    value2name
  },
  props: {
    cancelText: String,
    confirmText: String,
    data: {
      type: Array,
      default () {
        return []
      }
    },
    columns: {
      type: Number,
      default: 0
    },
    fixedColumns: {
      type: Number,
      default: 0
    },
    value: {
      type: Array,
      default () {
        return []
      }
    },
    showName: Boolean,
    show: Boolean,
    displayFormat: Function,
    isTransferDom: {
      type: Boolean,
      default: true
    },
    hideDistrict: Boolean,
    columnWidth: Array,
    popupStyle: Object,
    popupTitle: String,
    disabled: Boolean
  },
  created () {
    if (typeof this.show !== 'undefined') {
      this.showValue = this.show;
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
      const _val = getObject(val);
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
      this.$emit('input', getObject(val));
      this.$emit('on-change', getObject(val))
    },
    show (val) {
      this.showValue = val;
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
