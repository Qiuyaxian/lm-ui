<template>
  <div ref="page-view" class="page-views vup-fix-safari-overflow-scrolling" :style="{ 'padding-top': paddingTop, 'padding-bottom': paddingBottom }">
    <!-- header start  -->
    <!-- <page-header>百丽春</page-header>  -->
    <slot name="page-header"></slot>
    <!-- header end -->
    <!-- body start -->
    <slot></slot>
    <!-- body end -->
    <!-- tabbar start -->
    <slot name="page-footer"></slot>
    <!-- tabbar end -->
  </div>
</template>

<script>
import { viewTransform, pxTorem, removeEventHandle, addEventHandle, querySelector } from '@/utils'
export default {
  name: 'vup-template',
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
    /**
     * [description]
     * @param  {[type]} state [description]
     * @return {[type]}       [description]
     */
    // ...mapState({
    //   route: state => state.route,
    //   path: state => state.route.path
    // }),
    /**
     * [getBodyPaddingTop 获取头部距离]
     * @return {[type]} [description]
     */
    getBodyPaddingTop () {
      return pxTorem(viewTransform(this.bodyPaddingTop))
    },
    /**
     * [getBodyPaddingBottom 获取底部距离]
     * @return {[type]} [description]
     */
    getBodyPaddingBottom () {
      return pxTorem(viewTransform(this.bodyPaddingBottom))
    }
  },
  created () {
    if (this.bodyPaddingTop) {
      this.paddingTop = this.bodyPaddingTop === 46 ? pxTorem(viewTransform(this.bodyPaddingTop)) : pxTorem(this.bodyPaddingTop)
    } else if (this.$slots['page-header']) {
      this.paddingTop = pxTorem(viewTransform(46))
    } else {
    }

    if (this.bodyPaddingBottom) {
      this.paddingBottom = this.bodyPaddingBottom === 53 ? pxTorem(viewTransform(this.bodyPaddingBottom)) : pxTorem(this.bodyPaddingBottom)
    } else if (this.$slots['page-footer']) {
      this.paddingBottom = pxTorem(viewTransform(53))
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
      if (querySelector('.vup-header') && !querySelector('.vup-header').contains(event['target'])) {
        event.preventDefault()
      } else {

      }

      if (querySelector('.vup-tabbar-absolute') && !querySelector('.vup-tabbar-absolute').contains(event['target'])) {
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
        if (this.$refs['page-view']) {
          this.$refs['page-view'].scrollTop = top
        } else {

        }
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
<style lang="scss" scoped>
</style>
