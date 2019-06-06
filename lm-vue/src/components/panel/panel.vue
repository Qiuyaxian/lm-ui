<template>
  <div class="lm-panel" :class="{ 'lm-panel-border-not': !borderIntent }">
    <div class="lm-panel-header"
         v-if="header"
         @click="onClickHeader"
         v-html="header">
      <slot name="header"></slot>
    </div>
    <div class="lm-panel-body">
      <slot></slot>
    </div>
    <div class="lm-panel-footer">
      <slot name="footer">
        <a class="lm-cell lm-cell-access lm-cell-link"
           :href="getUrl(footer.url)"
           v-if="footer && footer.title"
           @click.prevent="onClickFooter">
          <div class="lm-cell__bd"
               v-html="footer.title"></div>
        </a>
      </slot>
    </div>
  </div>
</template>
<script>
import Router from '@/utils/router'
export default {
  name: 'lm-panel',
  props: {
    /**
     * [header panel头部]
     * @type {[type]}
     */
    header: String,
    /**
     * [footer panel底部]
     * @type {[type]}
     */
    footer: Object,
    /**
     * [borderIntent 是否开启边框]
     * @type {Object}
     */
    borderIntent: {
      type: Boolean,
      default: true
    },
    /**
     * [gutter 间距]
     * @type {[type]}
     */
    gutter: Array,
    /**
     * [cols 子项列数]
     * @type {[type]}
     */
    cols: Number
  },
  data () {
    return {}
  },
  methods: {
    getUrl (url) {
      return Router.getUrl(url, this.$router)
    },
    /**
     * [onClickFooter description]
     * @return {[type]} [description]
     */
    onClickFooter () {
      this.$emit('on-click-footer')
      Router.go && Router.go(this.footer.url, this.$router)
    },
    /**
     * [onClickHeader description]
     * @return {[type]} [description]
     */
    onClickHeader () {
      this.$emit('on-click-header')
    }
  }
}
</script>
