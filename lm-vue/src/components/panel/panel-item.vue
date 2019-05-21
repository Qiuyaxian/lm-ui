<template>
  <div class="vup-panel-item" ref="panel"
   :class="{
     'vup-panel-horizontal': type === 'horizontal',
     'vup-panel-vertical': type === 'vertical'
   }"
   @click="onClick"
  >
    <slot name="panel-item-header"></slot>
    <slot name="panel-item-image">
      <div class="vup-panel-img">
        <img v-if="src" :src="src" />
      </div>
    </slot>
    <div class="vup-panel-item-body">
      <slot name="panel-item-title">
        <h3 class="vup-panel-title">{{ title }}</h3>
      </slot>
      <slot name="panel-item-desc">
        <p class="vup-panel-desc">{{ desc }}</p>
      </slot>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Router from '@/utils/router'
import { hasClass, getParentNode } from '@/utils/dom'
export default {
  name: 'panel-item',
  props: {
    type: {
      type: String,
      default: 'horizontal'
    },
    src: String,
    title: String,
    desc: String,
    link: [String, Object],
    notAllowLink: String
  },
  data () {
    return {}
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
<style lang="scss">
@import '~@/theme/index.scss';
@import '~@/theme/panel.scss';
</style>
