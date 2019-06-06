<template>
  <popup-picker
    :fixed-columns="hideDistrict ? 2 : 0"
    :columns="3"
    :data="data"
    :label="label"
    v-model="currentValue"
    show-name
    :inline-desc="inlineDesc"
    :placeholder="placeholder"
    :value-text-align="valueTextAlign"
    :confirm-text="confirmText"
    :cancel-text="cancelText"
    :display-format="displayFormat"
    :popup-style="popupStyle"
    :popup-title="popupTitle"
    :show.sync="showValue"
    :disabled="disabled"
    @on-shadow-change="onShadowChange"
    @on-hide="_onHide"
    @on-show="_onShow">
    <template slot="title" slot-scope="props">
      <slot
        name="title"
        :label-class="props.labelClass"
        :label-style="props.labelStyles"
        :label-title="props.title">
        <label
          :class="[props.labelClass,labelClass]"
          :style="props.labelStyle"
          v-if="props.labelTitle"
          v-html="props.labelTitle"></label>
      </slot>
    </template>
  </popup-picker>
</template>

<script>
import name2value from '@/filters/name2value'
import value2name from '@/filters/value2name'
import PopupPicker from '../popup-picker/popup-picker'
export default {
  name: 'lm-address',
  components: {
    PopupPicker
  },
  props: {
    /**
     * [label 左侧文字项]
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
     * [rawValue 指定初始化时绑定的数据是否为文本]
     * @type {[type]}
     */
    rawValue: Boolean,
    /**
     * [data ]
     * @type {Object}
     */
    data: {
      type: Array,
      required: true
    },
    /**
     * [labelWidth 设置侧边宽度]
     * @type {[type]}
     */
    labelWidth: String,
    /**
     * [inlineDesc 设置小文字]
     * @type {[type]}
     */
    inlineDesc: String,
    /**
     * [placeholder 当值为空的时候显示的值]
     * @type {[type]}
     */
    placeholder: String,
    /**
     * [hideDistrict 是否隐藏区，即只显示省份和城市]
     * @type {[type]}
     */
    hideDistrict: Boolean,
    /**
     * [valueTextAlign 文字方向]
     * @type {[type]}
     */
    valueTextAlign: String,
    /**
     * [confirmText 头部右侧文字]
     * @type {[type]}
     */
    confirmText: String,
    /**
     * [cancelText 头部左边侧文字]
     * @type {[type]}
     */
    cancelText: String,
    /**
     * [displayFormat 展示的文字格式]
     * @type {Object}
     */
    displayFormat: {
      type: Function,
      default: (val, names) => names
    },
    /**
     * [popupStyle popup样式]
     * @type {[type]}
     */
    popupStyle: Object,
    /**
     * [popupTitle popup 头部中间title文字]
     * @type {[type]}
     */
    popupTitle: String,
    /**
     * [show 控制是否显示与否]
     * @type {[type]}
     */
    show: Boolean,
    /**
     * [disabled 是否禁用]
     * @type {[type]}
     */
    disabled: Boolean
  },
  created () {
    if (this.currentValue.length && this.rawValue) {
      const parsedVal = name2value(this.currentValue, this.data)
      if (/__/.test(parsedVal)) {
        console.error('[Wrong address value', this.currentValue)
        this.currentValue = [];
      } else {
        this.currentValue = parsedVal.split(' ')
      }
    }
    if (this.show) {
      this.showValue = true
    }
  },
  methods: {
    /**
     * [_onHide 触发外部隐藏函数]
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    _onHide (val) {
      this.$emit('on-hide', val)
    },
    /**
     * [_onShow 触发外部显示函数]
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    _onShow (val) {
      this.$emit('on-show', val)
    },
    /**
     * [getAddressName 获取地址名字]
     * @return {[type]} [description]
     */
    getAddressName () {
      return value2name(this.value, this.data)
    },
    /**
     * [onShadowChange 当选择改变的时候]
     * @param  {[type]} ids   [description]
     * @param  {[type]} names [description]
     * @return {[type]}       [description]
     */
    onShadowChange (ids, names) {
      this.$emit('on-shadow-change', ids, names)
    }
  },
  data () {
    return {
      currentValue: this.value,
      showValue: false
    }
  },
  computed: {
    nameValue () {
      return value2name(this.currentValue, this.data)
    },
    labelClass () {
      return {
        'lm-cell-justify': this.$parent && (this.$parent.labelAlign === 'justify' || this.$parent.$parent.labelAlign === 'justify')
      }
    }
  },
  watch: {
    currentValue (val) {
      this.$emit('input', val)
    },
    value (val) {
      if (val.length && !/\d+/.test(val[0])) {
        const id = name2value(val, this.data).split(' ')
        if (id[0] !== '__' && id[1] !== '__') {
          this.currentValue = id
          return
        }
      }
      this.currentValue = val
    },
    show (val) {
      this.showValue = val
    },
    showValue (val) {
      this.$emit('update:show', val)
    }
  }
}
</script>