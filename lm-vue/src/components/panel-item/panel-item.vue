<template>
  <div class="lm-panel-item" ref="panel"
   :class="{
     'lm-panel-horizontal': type === 'horizontal',
     'lm-panel-vertical': type === 'vertical',
     'lm-panel-item-divide': getBorderIntent
   }"
   @click="onClick"
   :style="style"
  >
    <slot name="panel-item-header"></slot>
    <slot name="panel-item-image">
      <div class="lm-panel-img">
        <img v-if="src" :src="src" />
      </div>
    </slot>
    <div class="lm-panel-item-body">
      <slot name="panel-item-title">
        <h3 class="lm-panel-title">{{ title }}</h3>
      </slot>
      <slot name="panel-item-desc">
        <p class="lm-panel-desc">{{ desc }}</p>
      </slot>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Router from '@/utils/router'
import { hasClass, getParentNode } from '@/utils/dom'
import { getParentProp } from '@/utils'
export default {
  name: 'lm-panel-item',
  props: {
    /**
     * [type panel展示类型]
     * @type {Object}
     */
    type: {
      type: String,
      default: 'horizontal'
    },
    /**
     * [src 链接地址]
     * @type {[type]}
     */
    src: String,
    /**
     * [title 标题]
     * @type {[type]}
     */
    title: String,
    /**
     * [desc 文字描述]
     * @type {[type]}
     */
    desc: String,
    /**
     * [link 链接地址]
     * @type {Array}
     */
    link: [String, Object],
    /**
     * [notAllowLink 不允许跳转区域样式]
     * @type {[type]}
     */
    notAllowLink: String
  },
  data () {
    return {
      bodyWidth: ''
    }
  },
  beforeMount () {
    this.bodyWidth = document.documentElement.offsetWidth
  },
  computed: {
    getBorderIntent () {
      return getParentProp(this, 'borderIntent');
    },
    style () {
      if (!this.$parent) return {};
      if (this.type === 'horizontal') return {};
      const { cols, gutter } = this.$parent;
      const styles = {};
      let gutters = []
      if (gutter) {
        let len = gutter.length;
        if (len === 1) {
          for (let i = 0; i < 4; i++) {
            gutters.push(gutter)
          }
        } else if (len === 2) {
          gutters = gutter.concat(gutter)
        } else if (len === 3) {
          gutters = gutter.concat(gutter.slice(1, 2))
        } else {
          gutters = gutter.splice(0, 4);
        }
      }
      styles.width = `${100 / cols}%`
      return styles;
    }
  },
  methods: {
    /**
     * [onClick 点击跳转]
     * @return {[type]} [description]
     */
    onClick (event) {
      let el = event.target
      let current = this.$refs['panel']
      let notAllowLink = this.notAllowLink
      if (notAllowLink) el = getParentNode(el, notAllowLink, current)
      if (notAllowLink && hasClass(el, notAllowLink)) {
        this.$emit('on-item-click')
      } else {
        this.$emit('on-item-click')
        this.link && Router.go(this.link, this.$router)
      }
    }
  }
}
</script>
