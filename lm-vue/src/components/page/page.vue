<template>
  <div ref="view" class="lm-view lm-fix-safari-overflow-scrolling" :style="{ 'padding-top': paddingTop, 'padding-bottom': paddingBottom }">
    <!-- header start  -->
    <!-- <header>百丽春</header>  -->
    <slot name="header"></slot>
    <!-- header end -->
    <!-- body start -->
    <slot></slot>
    <!-- body end -->
    <!-- tabbar start -->
    <slot name="footer"></slot>
    <!-- tabbar end -->
  </div>
</template>

<script>
import { viewTransform, pxTorem, removeEventHandle, addEventHandle, querySelector } from '@/utils'
export default {
  name: 'lm-page',
  props: {
    /**
     * [bodyPaddingTop 距离头部距离]
     * @type {Object}
     */
    bodyPaddingTop: Number,
    /**
     * [bodyPaddingBottom 距离底部距离]
     * @type {Object}
     */
    bodyPaddingBottom: Number
  },
  data () {
    return {
      back: {
        backText: '',
        showBack: false,
        preventGoBack: false
      },
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  computed: {
    getBodyPaddingTop () {
      return pxTorem(viewTransform(this.bodyPaddingTop))
    },
    getBodyPaddingBottom () {
      return pxTorem(viewTransform(this.bodyPaddingBottom))
    }
  },
  created () {
    if (this.bodyPaddingTop) {
      this.paddingTop = pxTorem(this.bodyPaddingTop, this.bodyPaddingTop === 46 ? 2 : 1);
    } else if (this.$slots['header']) {
      this.paddingTop = pxTorem(46, 2);
    } else {
    }

    if (this.bodyPaddingBottom) {
      this.paddingBottom = pxTorem(this.bodyPaddingBottom, this.bodyPaddingBottom === 53 ? 2 : 1);
    } else if (this.$slots['footer']) {
      this.paddingBottom = pxTorem(53, 2);
    } else {
    }

    this.$nextTick(() => {
      addEventHandle(querySelector('body'), 'touchmove', this.touchmoveHandle)
    })
  },
  destroyed () {
    /**
     * 销毁禁止显示微信网页来源
     */
    removeEventHandle(querySelector('body'), 'touchmove', this.touchmoveHandle)
  },
  methods: {
    /**
     * [touchmoveHandle description]
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    touchmoveHandle (event) {
      if (querySelector('.lm-header') && !querySelector('.lm-header').contains(event['target'])) {
        event.preventDefault()
      } else {

      }

      if (querySelector('.lm-tabbar-absolute') && !querySelector('.lm-tabbar-absolute').contains(event['target'])) {
        event.preventDefault()
      } else {

      }
    },
    /**
     * [scrollTo 滚动到指定距离]
     * @param  {[type]} top [description]
     * @return {[type]}     [description]
     */
    scrollTo (top) {
      this.$nextTick(() => {
        if (this.$refs['view']) this.$refs['view'].scrollTop = top;
      });
    }
  },
  // 组件内部的路由守卫
  beforeRouteEnter (to, from, next) {
    next()
  },
  beforeRouteUpdate (to, from, next) {
    next()
  },
  beforeRouteLeave (to, from, next) {
    next()
  }
}
</script>
