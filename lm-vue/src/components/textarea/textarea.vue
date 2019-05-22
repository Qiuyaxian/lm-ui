<template>
  <div class="">
    <textarea
      class="lm-textarea"
      :autocomplete="autocomplete"
      :autocapitalize="autocapitalize"
      :autocorrect="autocorrect"
      :spellcheck="spellcheck"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :name="name"
      v-model="currentValue"
      @focus="focusHandler"
      @blur="blurHander"
      :rows="rows"
      :cols="cols"
      :style="textareaStyle"
      :maxlength="max"
      ref="textarea"></textarea>
    <div class="lm-textarea-counter" v-show="showCounter && max" @click="focus">
      <span>{{count}}</span>/{{max}}
    </div>
  </div>
</template>
<script>
import { addEventHandle } from '@/utils'
import Debounce from 'lodash.debounce'
export default {
  name: 'lm-textarea',
  props: {
    /**
     * [id 绑定id]
     * @type {[type]}
     */
    id: String,
    /**
     * [height 高度]
     * @type {[type]}
     */
    height: Number,
    showCounter: {
      type: Boolean,
      default: true
    },
    /**
     * [name 关联name]
     * @type {[type]}
     */
    name: String,
    /**
     * [max 最大字数]
     * @type {[type]}
     */
    max: Number,
    /**
     * [autocomplete 是否自动补全]
     * @type {Object}
     */
    autocomplete: {
      type: String,
      default: 'off'
    },
    /**
     * [autocapitalize description]
     * @type {Object}
     */
    autocapitalize: {
      type: String,
      default: 'off'
    },
    /**
     * [autocorrect description]
     * @type {Object}
     */
    autocorrect: {
      type: String,
      default: 'off'
    },
    /**
     * [spellcheck description]
     * @type {Object}
     */
    spellcheck: {
      type: Boolean,
      default: false
    },
    /**
     * [rows 设置占的行数]
     * @type {Object}
     */
    rows: {
      type: Number,
      default: 3
    },
    /**
     * [cols 设置占的列数]
     * @type {Object}
     */
    cols: {
      type: Number,
      default: 30
    },
    /**
     * [readonly 是否只读]
     * @type {Object}
     */
    readonly: {
      type: Boolean,
      default: false
    },
    /**
     * [disabled 是否禁用]
     * @type {Object}
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * [placeholder 设置placeholder占位符]
     * @type {[type]}
     */
    placeholder: String
  },
  data () {
    return {
      currentValue: '',
      isFocus: false,
      onInput: false,
      timer: null
    }
  },
  created () {
    if (this.debounce) {
      this._debounce = Debounce(() => {
        this.$emit('on-change', this.currentValue)
      }, this.debounce)
    }
    if (/Android/gi.test(navigator.userAgent)) {
      const innerHeight = window.innerHeight;
      addEventHandle(window, 'resize', () => {
        const newInnerHeight = window.innerHeight;
        if (innerHeight > newInnerHeight) {
          // 键盘弹出事件处理
        } else {
          // 键盘收起事件处理
          this.scrollIntoView();
        }
      });
    } else {
      addEventHandle(window, 'focusin', () => {
        // 键盘弹出事件处理
      });
      addEventHandle(window, 'focusout', () => {
        // 键盘收起事件处理
        this.scrollIntoView()
      })
    }
  },
  computed: {
    /**
     * [count 计算输入框的汁]
     * @return {[type]} [description]
     */
    count () {
      let len = 0
      if (this.currentValue) {
        len = this.currentValue.replace(/\n/g, 'aa').length
      }
      return len > this.max ? this.max : len
    },
    /**
     * [textareaStyle 输入框行内样式]
     * @return {[type]} [description]
     */
    textareaStyle () {
      if (this.height) {
        return {
          height: `${this.height}px`
        }
      }
    }
  },
  methods: {
    /**
     * [scrollIntoView 页面input失去焦点的时候复位]
     * @param  {Number} time [description]
     * @return {[type]}      [description]
     */
    scrollIntoView (time = 0) {
      if (/iphone/i.test(navigator.userAgent)) {
      }
      // if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {  }
      this.timer = setTimeout(() => {
        if (this.timer) clearTimeout(this.timer)
        if (this.$refs.textarea && this.$refs.textarea.scrollIntoViewIfNeeded) this.$refs.textarea.scrollIntoViewIfNeeded(true)
      }, time)
    },
    /**
     * [focusHandler 处理页面input框 造成页面滚动问题]
     * @param  {[type]} $event [description]
     * @return {[type]}        [description]
     */
    focusHandler ($event) {
      this.$emit('on-focus', this.currentValue, $event);
      this.isFocus = true;
      this.timer = setTimeout(() => {
        if (this.timer) clearTimeout(this.timer)
        this.$refs.textarea && this.$refs.textarea.scrollIntoViewIfNeeded && this.$refs.textarea.scrollIntoViewIfNeeded(false);
      }, 500);
    },
    /**
     * [blurHander 失去光标]
     * @param  {[type]} $event [description]
     * @return {[type]}        [description]
     */
    blurHander ($event) {
      this.scrollIntoView()
      this.$emit('on-blur', this.currentValue, $event)
    },
    /**
     * [focus 给外部调用，令input框获得光标]
     * @return {[type]} [description]
     */
    focus () {
      if (this.$refs.textarea) this.$refs.textarea.focus()
      else throw new Error('this.$refs.textarea is not exit')
    },
    /**
     * [blur 给外部调用，令input框失去光标]
     * @return {[type]} [description]
     */
    blur () {
      if (this.$refs.textarea) this.$refs.textarea.blur()
      else throw new Error('this.$refs.textarea is not exit')
    }
  },
  watch: {
    /**
     * [value 监听绑定值的变化]
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    value (val) {
      this.currentValue = val;
    },
    /**
     * [currentValue 监听当前值变化]
     * @param  {[type]} newVal [description]
     * @param  {[type]} oldVal [description]
     * @return {[type]}        [description]
     */
    currentValue (newVal, oldVal) {
      if (this.max && newVal && newVal.length > this.max) {
        this.currentValue = newVal.slice(0, this.max)
      }
      this.$emit('input', this.currentValue)
      this.$emit('on-change', this.currentValue)
    }
  },
  beforeDestroy () {
    addEventHandle(window, 'resize', this.scrollIntoView)
  }
}
</script>
<style lang="scss">
</style>
