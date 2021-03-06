<template>
  <div class="lm-search-bar" :class="{ 'lm-search-bar-focusing':!isCancel || currentValue && currentValue.length != 0 }" :style="{ 'background' : searchBar }">
     <div class="lm-search-url-bar" @click="searchRouteHandle" v-if="type == 'url'"></div>
     <form action="." class="lm-search-bar-form" :class="radius?'lm-search-radius':''" :style="{ 'background' : searchForm }" @submit.prevent="$emit('on-submit', currentValue)">
       <label :for="`lm-search-${uuid}`" v-show="!isFocus && !currentValue" class="lm-search-mask" @click="touch"></label>
       <div class="lm-search-bar-box">
         <div class="lm-icon-search lm-icon-search-start"></div>
         <input v-model="currentValue"
                :id="`lm-search-${uuid}`"
                class="lm-search-bar-input"
                type="text"
                ref="search-input"
                autocomplete="off"
                @focus="onFocus"
                @blur="onBlur"
                :placeholder="getPlaceholder"
                @compositionstart="onComposition($event, 'start')"
                @compositionend="onComposition($event, 'end')"
                @input="onComposition($event, 'input')"
                >
         <a href="javascript:;" class="lm-icon-clear" @click="clear" v-show="currentValue"></a>
       </div>
       <label v-show="!isFocus && !currentValue && isShowCancel" :for="`lm-search-${uuid}`" class="lm-search-bar-label" :style="{ 'background' : searchForm }">
         <div class="lm-icon-search">&nbsp;</div>
         <span class="lm-search-placeholder">搜索</span>
       </label>
     </form>
     <a href="javascript:;" v-if="isShowCancel" @click="cancel" class="lm-search-bar-cancel-btn">取消</a>
  </div>
</template>

<script>
import { resetScrollIntoView } from '@/utils'
import { uuidMixin } from '@/mixins'
export default {
  name: 'lm-search',
  mixins: [ uuidMixin ],
  props: {
    /**
     * [searchBar description]
     * @type {Object}
     */
    searchBar: {
      type: String,
      default: '#EFEFF4'
    },
    /**
     * [searchForm description]
     * @type {Object}
     */
    searchForm: {
      type: String,
      default: 'white'
    },
    /**
     * [required description]
     * @type {Object}
     */
    required: {
      type: Boolean,
      default: false
    },
    /**
     * [placeholder description]
     * @type {[type]}
     */
    placeholder: String,
    /**
     * [cancelText description]
     * @type {[type]}
     */
    cancelText: String,
    /**
     * [value description]
     * @type {Object}
     */
    value: {
      type: String,
      default: ''
    },
    /**
     * [isShowCancel description]
     * @type {Object}
     */
    isShowCancel: {
      type: Boolean,
      default: true
    },
    /**
     * [radius description]
     * @type {Object}
     */
    radius: {
      type: Boolean,
      default: false
    },
    /**
     * [type description]
     * @type {Object}
     * search|url
     */
    type: {
      type: String,
      default: 'search'
    },
    /**
     * [url description]
     * @type {[type]}
     */
    url: String
  },
  components: {
  },
  data () {
    return {
      onInput: false,
      currentValue: '',
      isCancel: true,
      isFocus: false,
      isFixed: false
    }
  },
  created () {
    if (this.value) {
      this.currentValue = this.value
    }
    this.$nextTick(() => {
      this.searchInput = this.$refs[`lm-search-${this.uuid}`]
      console.log(this.searchInput, `lm-search-${this.uuid}`, 'this.searchInput')
    })
  },
  computed: {
    getPlaceholder () {
      if (!this.isShowCancel) {
        return '请输入要搜索的内容';
      } else {
        return '';
      }
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    }
  },
  methods: {
    /**
     * [emitEvent 注册事件]
     * @return {[type]} [description]
     */
    emitEvent () {
      this.$nextTick(() => {
        this.$emit('input', this.currentValue)
        this.$emit('on-change', this.currentValue)
      })
    },
    /**
     * [onComposition 绑定input事件]
     * @param  {[type]} $event [description]
     * @param  {[type]} type   [description]
     * @return {[type]}        [description]
     */
    onComposition ($event, type) {
      if (type === 'start') {
        this.onInput = true
      }
      if (type === 'end') {
        this.onInput = false
        this.emitEvent();
      }
      if (type === 'input') {
        if (!this.onInput) {
          this.emitEvent();
        }
      }
    },
    /**
     * [clear 清除input输入框数据]
     * @return {[type]} [description]
     */
    clear () {
      this.currentValue = '';
      this.emitEvent();
      this.isFocus = true;
      this.setFocus()
      if (this.autoFixed && !this.isFixed) {
        this.isFixed = true;
      }
      this.$emit('on-clear');
    },
    /**
     * [cancel 取消事件]
     * @return {[type]} [description]
     */
    cancel () {
      this.isCancel = true;
      this.isFocus = false;
      this.currentValue = '';
      this.emitEvent();
      this.isFixed = false;
      this.$emit('on-cancel');
    },
    /**
     * [handleResultClick 注册完成事件搜索框返回结果绑定点击]
     * @param  {[type]} item [description]
     * @return {[type]}      [description]
     */
    handleResultClick (item) {
      this.$emit('result-click', item) // just for compatibility
      this.$emit('on-result-click', item)
      this.isCancel = true
      this.isFixed = false
    },
    /**
     * [searchRouteHandle description]
     * @return {[type]} [description]
     */
    searchRouteHandle () {
      if (this.url) {
        this.$router.push({
          'path': this.url
        })
      }
    },
    /**
     * [setFocus 设置input获取光标]
     */
    setFocus () {
      this.searchInput && this.searchInput.focus();
    },
    /**
     * [setBlur input失去光标]
     */
    setBlur () {
      this.searchInput && this.searchInput.blur();
    },
    /**
     * [touch 点击遮罩层]
     * @return {[type]} [description]
     */
    touch () {
      if (this.type === 'url') {
      } else {
        this.isCancel = false;
        this.isFocus = true;
        this.$emit('on-touch');
      }
    },
    /**
     * [onFocus 开启自动获取获取光标]
     * @return {[type]} [description]
     */
    onFocus () {
      if (this.type === 'url') {
      } else {
        this.$emit('on-focus');
        this.touch();
        this.resetScrollIntoView(false)
      }
    },
    /**
     * [onBlur 失去光标]
     * @return {[type]} [description]
     */
    onBlur () {
      this.isFocus = false
      if (this.currentValue && /\s+/.test(this.currentValue)) {
        this.currentValue = this.currentValue.replace(/\s/g, '')
      }
      if (this.currentValue.length === 0) {
        this.isCancel = true;
        this.currentValue = '';
      }
      this.resetScrollIntoView();
      this.$emit('on-blur');
    },
    /**
     * [resetScrollIntoView 恢复页面到原来位置]
     * @param  {Boolean} state [description]
     * @return {[type]}        [description]
     */
    resetScrollIntoView (state = true) {
      this.searchInput && resetScrollIntoView && resetScrollIntoView(this.searchInput, state)
    }
  }
}
</script>