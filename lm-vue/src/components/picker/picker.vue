<template>
  <div class="lm-picker">
    <flexbox :gutter="0">
      <flexbox-item :span="columnWidth && columnWidth[index]" v-for="(one, index) in currentData" :key="index" style="margin-left: 0;">
        <div class="lm-picker-item" :id="`lm-picker-${uuid}-${index}`"></div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import Scroller from '@/utils/scroller'
import Flexbox from '../flexbox/flexbox'
import FlexboxItem from '../flexbox-item/flexbox-item'
import Manager from './chain'
import value2name from '@/filters/value2name'
import { isArray } from '@/utils'
export default {
  name: 'lm-picker',
  props: {
    /**
     * [value 绑定数据值]
     * @type {[type]}
     */
    value: Array,
    /**
     * [data 滚动选择数据]
     * @type {[type]}
     */
    data: Array,
    /**
     * [columns 列数]
     * @type {Object}
     */
    columns: {
      type: Number,
      default: 0
    },
    /**
     * [fixedColumns 指定显示多少列，隐藏多余的]
     * @type {Object}
     */
    fixedColumns: {
      type: Number,
      default: 0
    },
    /**
     * [itemClass 滚动项样式]
     * @type {Object}
     */
    itemClass: {
      type: String,
      default: 'scroller-item'
    },
    /**
     * [columnWidth 列宽度]
     * @type {[type]}
     */
    columnWidth: Array
  },
  components: {
    Flexbox,
    FlexboxItem
  },
  created () {
    if (this.columns !== 0) {
      const length = this.columns;
      this.store = new Manager(this.data, length, this.fixedColumns || this.columns);
      this.currentData = this.store.getColumns(this.value)
    }
  },
  mounted () {
    this.uuid = Math.random().toString(36).substring(3, 8)
    this.$nextTick(() => {
      this.render(this.currentData, this.currentValue)
    })
  },
  methods: {
    /**
     * [getNameValues description]
     * @return {[type]} [description]
     */
    getNameValues () {
      return value2name(this.currentValue, this.data)
    },
    /**
     * [getId description]
     * @param  {[type]} i [description]
     * @return {[type]}   [description]
     */
    getId (i) {
      return `#lm-picker-${this.uuid}-${i}`
    },
    /**
     * [render description]
     * @param  {[type]} data  [description]
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
    render (data, value) {
      let count = this.currentData.length
      this.count = count;
      const _this = this;
      if (!data || !data.length) {
        return
      }
      // set first item as value
      if (value.length < count) {
        for (let i = 0; i < count; i++) {
          if (typeof data[i][0] === 'undefined' && isArray(this.data) && this.data[0] && typeof this.data[0].value !== 'undefined' && !this.columns) {
            console.error('渲染出错，当前是联动模式，需要指定columns(列数)');
          }
          this.$set(_this.currentValue, i, data[i][0].value || data[i][0])
        }
      }
      for (let i = 0; i < data.length; i++) {
        /**
        * Still don't know why this happens
        */
        if (!document.querySelector(_this.getId(i))) {
          return
        }
        _this.scroller[i] && _this.scroller[i].destroy()
        _this.scroller[i] = new Scroller(_this.getId(i), {
          data: data[i],
          defaultValue: value[i] || data[i][0].value,
          itemClass: _this.itemClass,
          onSelect (value) {
            _this.$set(_this.currentValue, i, value)
            if (!this.columns || (this.columns && _this.getValue().length === _this.store.count)) {
              _this.$nextTick(() => {
                _this.$emit('on-change', _this.getValue())
              })
            }
            if (_this.columns !== 0) {
              _this.renderChain(i + 1)
            }
          }
        })
        if (_this.currentValue) {
          _this.scroller[i].select(value[i])
        }
      }
    },
    /**
     * [renderChain description]
     * @param  {[type]} i [description]
     * @return {[type]}   [description]
     */
    renderChain (i) {
      if (!this.columns) {
        return
      }
      // do not render for last scroller
      if (i > this.count - 1) {
        return
      }
      const _this = this
      let ID = this.getId(i)
      // destroy old one
      this.scroller[i].destroy()
      let list = this.store.getChildren(_this.getValue()[i - 1])
      this.scroller[i] = new Scroller(ID, {
        data: list,
        itemClass: _this.item_class,
        onSelect (value) {
          _this.$set(_this.currentValue, i, value)
          _this.$nextTick(() => {
            _this.$emit('on-change', _this.getValue())
          })
          // 链式
          _this.renderChain(i + 1)
        }
      })
      // list is Array(empty) as maybe
      if (list.length) {
        this.$set(this.currentValue, i, list[0].value)
        this.renderChain(i + 1)
      } else {
        this.$set(this.currentValue, i, null)
      }
    },
    /**
     * [getValue description]
     * @return {[type]} [description]
     */
    getValue () {
      let data = [];
      for (let i = 0; i < this.currentData.length; i++) {
        if (this.scroller[i]) {
          data.push(this.scroller[i].value)
        } else {
          return []
        }
      }
      return data;
    },
    /**
     * [emitValueChange description]
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    emitValueChange (val) {
      if (!this.columns || (this.columns && val.length === this.store.count)) {
        this.$emit('on-change', val)
      }
    }
  },
  data () {
    return {
      scroller: [],
      count: 0,
      uuid: '',
      currentData: this.data,
      currentValue: this.value
    }
  },
  watch: {
    value (val) {
      if (JSON.stringify(val) !== JSON.stringify(this.currentValue)) {
        this.currentValue = val
      }
    },
    currentValue (val, oldVal) {
      this.$emit('input', val)
      // render all the scroller for chain datas
      if (this.columns !== 0) {
        if (val.length > 0) {
          if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
            this.currentData = this.store.getColumns(val)
            this.$nextTick(() => {
              this.render(this.currentData, val)
            })
          }
        } else {
          this.render(this.currentData, [])
        }
      } else {
        if (val.length) {
          for (let i = 0; i < val.length; i++) {
            if (this.scroller[i] && this.scroller[i].value !== val[i]) {
              this.scroller[i].select(val[i])
            }
          }
        } else {
          this.render(this.currentData, [])
        }
      }
    },
    data (val) {
      if (JSON.stringify(val) !== JSON.stringify(this.currentData)) {
        this.currentData = val
      }
    },
    currentData (newData) {
      if (Object.prototype.toString.call(newData[0]) === '[object Array]') {
        this.$nextTick(() => {
          this.render(newData, this.currentValue)
          // emit on-change after rerender
          this.$nextTick(() => {
            this.emitValueChange(this.getValue())
            if (JSON.stringify(this.getValue()) !== JSON.stringify(this.currentValue)) {
              if (!this.columns || (this.columns && this.getValue().length === this.store.count)) {
                this.currentValue = this.getValue()
              }
            }
          })
        })
      } else {
        if (this.columns !== 0) {
          if (!newData.length) {
            return
          }
          const length = this.columns
          this.store = new Manager(newData, length, this.fixedColumns || this.columns)
          this.currentData = this.store.getColumns(this.currentValue)
        }
      }
    }
  },
  beforeDestroy () {
    for (let i = 0; i < this.count; i++) {
      this.scroller[i] && this.scroller[i].destroy()
      this.scroller[i] = null
    }
  }
}
</script>