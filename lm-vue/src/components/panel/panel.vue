<template>
  <div class="vup-panel vup-panel_access">
    <div class="vup-panel-header" v-if="header" @click="onClickHeader" v-html="header">
      <slot name="header"></slot>
    </div>
    <div class="vup-panel-body">
      <slot></slot>
    </div>
    <div class="vup-panel-footer">
      <slot name="footer">
        <a
          class="vup-cell vup-cell_access vup-cell_link"
          :href="getUrl(footer.url)"
          v-if="footer && footer.title"
          @click.prevent="onClickFooter">
          <div class="vup-cell__bd" v-html="footer.title"></div>
        </a>
      </slot>
    </div>
  </div>
</template>
<script>
import Router from '@/utils/router'
export default {
  name: 'panel',
  props: {
    header: String,
    footer: Object
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
<style lang="scss">
@import '~@/theme/index.scss';
@import '~@/theme/panel.scss';
</style>
