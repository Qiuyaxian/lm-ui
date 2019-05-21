<template>
  <div class="vup-search-bar" :class="{ 'vup-search-bar_focusing':!isCancel || currentValue && currentValue.length != 0 }" :style="{ 'background' : searchBar }">
     <div class="vup-search-url-bar" @click="searchRouteHandle" v-if="type == 'url'"></div>
     <form action="." class="vup-search-bar__form" :class="radius?'vup-search-radius':''" :style="{ 'background' : searchForm }" @submit.prevent="$emit('on-submit', currentValue)">
       <label :for="`vup-search_${ uuid }`" v-show="!isFocus && !currentValue" class="vup-search-mask" @click="touch"></label>
       <div class="vup-search-bar__box">
         <div class="vup-icon-search vup-icon-search-start"></div>
         <input v-model="currentValue"
                :id="`vup-search_${uuid}`"
                class="vup-search-bar__input"
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
         <a href="javascript:;" class="vup-icon-clear" @click="clear" v-show="currentValue"></a>
       </div>
       <label v-show="!isFocus && !currentValue && isShowCancel" :for="`vup-search_${ uuid }`" class="vup-search-bar__label" :style="{ 'background' : searchForm }">
         <div class="vup-icon-search">&nbsp;</div>
         <span class="vup-search-placeholder">搜索</span>
       </label>
     </form>
     <a href="javascript:;" v-if="isShowCancel" @click="cancel" class="vup-search-bar__cancel-btn">取消</a>
  </div>
</template>

<script>
import { resetScrollIntoView } from '@/utils'
import { uuidMixin } from '@/mixins'
export default {
  name: 'search',
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
      this.searchInput = this.$refs[`vup-search_${this.uuid}`]
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
     * [handleResultClick 注册完成事件]
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
<style lang="scss">
@import '~@/theme/index.scss';
@import '~@/theme/iconfont.scss';
.vup-search-radius{
  border-radius: pxTorem(viewTransform(15));
  overflow: hidden;
}
.vup-search-url-bar{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 5;
}
.vup-icon-search, .vup-icon-clear{
  display: inline-block;
  position: relative;
  color: #9B9B9B;
  vertical-align: middle;
  font-style: normal !important;
  font-variant: normal !important;
  font-weight: normal !important;
  font-stretch: normal !important;
  line-height: 1;
  font-family: weui !important;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}
.vup-icon-search{
  line-height: pxTorem(62) !important;
  font-size: pxTorem(32) !important;
  &:before{
    content: "\EA0E";
  }
}
.vup-icon-clear{
  &:before{
    content: "\EA0F";
  }
}
.vup-search-bar{
  position: relative;
  padding: pxTorem(viewTransform(8)) pxTorem(viewTransform(10));
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  @include css3(box-sizing, border-box)
}
.vup-search-bar__form{
  position: relative;
  z-index: 3;
  border-radius: pxTorem(viewTransform(4));
  @include css3(flex, auto);
}
.vup-search-mask{
  position: absolute;
  left: 0;
  top: 0;
  width: 90%;
  height: 100%;
  z-index: 5;
}
.vup-search-bar__box{
  position: relative;
  padding-left: pxTorem(60);
  padding-right: pxTorem(60);
  height: 100%;
  width: 100%;
  @include css3(box-sizing, border-box);
  z-index: 1;
}
.vup-icon-search-start{
  position: absolute;
  left: pxTorem(15);
  top: 0;
}
.vup-search-bar__input{
  padding: pxTorem(10) 0;
  width: 100%;
  height: pxTorem(42);
  border: 0;
  font-size: pxTorem(28);
  line-height: pxTorem(42);
  background: transparent;
}
.vup-icon-clear{
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 pxTorem(20);
  color: #B2B2B2 !important;
  font-size: pxTorem(28) !important;
  line-height: pxTorem(62) !important;
}
.vup-search-bar__label{
  position: absolute;
  top: 1px;
  right: 1px;
  bottom: 1px;
  left: 1px;
  z-index: 8;
  border-radius: pxTorem(6);
  text-align: center;
  color: #9B9B9B;
  text-align: center;
  .vup-icon-search{
    vertical-align: middle;
  }
  .vup-search-placeholder{
    font-size: pxTorem(28);
    height: pxTorem(62);
    line-height: pxTorem(62);
    @include css3(box-sizing, border-box);
    vertical-align: middle;
  }
}
.vup-search-bar__cancel-btn{
  display: none;
  font-size: pxTorem(28);
  margin-left: pxTorem(20);
  line-height: pxTorem(62);
  color: #FF9900;
  white-space: nowrap;
}
.vup-search-bar{
  &.vup-search-bar_focusing {
    & .vup-search-bar__cancel-btn{
      display: block;
    }
  }
}
</style>
