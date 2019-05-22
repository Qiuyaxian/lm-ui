<template>
  <div class="lm-header">
    <div class="lm-header-left">
      <slot name="overwrite-left">
        <transition :name="transition">
          <a class="lm-header-back" v-show="_leftOptions.showBack" @click.prevent.self="onClickBack">{{ typeof _leftOptions.backText === 'undefined' ? '返回' : _leftOptions.backText}}</a>
        </transition>
        <transition :name="transition">
          <div class="left-arrow" @click="onClickBack" v-show="_leftOptions.showBack"></div>
        </transition>
      </slot>
      <slot name="left"></slot>
    </div>
    <h1 class="lm-header-title" @click="$emit('on-click-title')" v-if="!shouldOverWriteTitle">
      <slot>
        <transition :name="transition">
          <span v-show="title">{{title}}</span>
        </transition>
      </slot>
    </h1>
    <div class="lm-header-title-area" v-if="shouldOverWriteTitle">
      <slot name="overwrite-title"></slot>
    </div>
    <div class="lm-header-right">
      <a class="lm-header-more" @click.prevent.self="$emit('on-click-more')" v-if="rightOptions.showMore"></a>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import { extend } from '@/utils/tools'
export default {
  name: 'navbar',
  props: {
    /**
     * [leftOptions 左侧返回按钮]
     * @type {[type]}
     */
    leftOptions: Object,
    /**
     * [title 文字标题]
     * @type {[type]}
     */
    title: String,
    /**
     * [transition 运动形式名字]
     * @type {[type]}
     */
    transition: String,
    /**
     * [rightOptions 右侧更多操作]
     * @type {Object}
     */
    rightOptions: {
      type: Object,
      default () {
        return {
          showMore: false
        }
      }
    },
    /**
     * [position top|bottom|static]
     * @type {Object}
     */
    position: {
      type: String,
      ddefault: 'static'
    }
  },
  beforeMount () {
    if (this.$slots['overwrite-title']) {
      this.shouldOverWriteTitle = true
    }
  },
  computed: {
    getHeaderStyle () {
      let style = {};
      if (this.position !== 'static') {
        style[this.position] = 0;
      }
      return style;
    },
    /**
     * [_leftOptions 计算左侧按钮部分属性]
     * @return {[type]} [description]
     */
    _leftOptions () {
      return extend({
        showBack: true,
        preventGoBack: false,
        backText: ''
      }, this.leftOptions || {})
    }
  },
  methods: {
    /**
     * [onClickBack 点击返回操作]
     * @return {[type]} [description]
     */
    onClickBack () {
      if (this._leftOptions.preventGoBack) {
        this.$emit('on-click-back')
      } else {
        this.$router ? this.$router.back() : window.history.back()
      }
    }
  },
  data () {
    return {
      shouldOverWriteTitle: false
    }
  }
}
</script>

<style lang="scss">
@import '~@/theme/function.scss';
@import '~@/theme/mixins.scss';
@import '~@/theme/variables.scss';
@import '~@/theme/extends.scss';
@import '~@/theme/header.scss';
</style>
