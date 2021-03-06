<template>
  <div class="lm-actionsheet-wrapper">
    <transition name="lm-actionsheet-mask">
      <div
        class="lm-mask lm-mask-transparent"
        @click="onClickingMask"
        v-show="show"></div>
    </transition>
    <div
      class="lm-skin_android"
      v-if="theme === 'android'">
      <transition
        name="lm-android-actionsheet"
        @after-enter="$emit('on-after-show')"
        @after-leave="$emit('on-after-hide')">
        <div
          class="lm-actionsheet"
          v-show="show">
          <div class="lm-actionsheet-menu">
            <div
              class="lm-actionsheet-cell"
              v-for="(text, key) in menus"
              :key="key"
              @click="onMenuClick(text, key)"
              v-html="text.label || text">
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div
      class="lm-actionsheet"
      :class="{'lm-actionsheet_toggle': show}"
      v-else
      ref="iOSMenu">
      <div class="lm-actionsheet-menu">
        <div class="lm-actionsheet-cell" v-if="hasHeaderSlot">
          <slot name="header"></slot>
        </div>
        <div class="lm-actionsheet-cell"
          v-for="(text, key) in menus"
          :key="key"
          :data-key="key"
          @click="onMenuClick(text, key)"
          v-html="text.label || text"
          :class="`lm-actionsheet-menu-${text.type || 'default'}`">
        </div>
      </div>
      <div
        class="lm-actionsheet-action"
        @click="emitEvent('on-click-menu', 'cancel')"
        v-if="showCancel">
        <div class="lm-actionsheet-cell">{{ cancelText || '取消' }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'lm-actionsheet',
  mounted () {
    this.hasHeaderSlot = !!this.$slots.header
    this.$nextTick(() => {
      this.$tabbar = document.querySelector('.lm-tabbar')
      this.$refs.iOSMenu && this.$refs.iOSMenu.addEventListener('transitionend', this.onTransitionEnd)
    })
  },
  props: {
    value: Boolean,
    showCancel: Boolean,
    cancelText: String,
    theme: {
      type: String,
      default: 'ios'
    },
    menus: {
      type: [Object, Array],
      default: () => ({})
    },
    closeOnClickingMask: {
      type: Boolean,
      default: true
    },
    closeOnClickingMenu: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      hasHeaderSlot: false,
      show: false
    }
  },
  methods: {
    /**
     * [onTransitionEnd 是否完成显示隐藏，触发回调函数]
     * @return {[type]} [description]
     */
    onTransitionEnd () {
      this.$emit(this.show ? 'on-after-show' : 'on-after-hide')
    },
    /**
     * [onMenuClick 点击菜单项]
     * @param  {[type]} text [description]
     * @param  {[type]} key  [description]
     * @return {[type]}      [description]
     */
    onMenuClick (text, key) {
      if (typeof text === 'string') {
        this.emitEvent('on-click-menu', key, text)
      } else {
        if (text.type !== 'disabled' && text.type !== 'info') {
          if (text.value || text.value === 0) {
            this.emitEvent('on-click-menu', text.value, text)
          } else {
            this.emitEvent('on-click-menu', '', text)
            this.show = false
          }
        }
      }
    },
    /**
     * [onClickingMask 点击遮罩层]
     * @return {[type]} [description]
     */
    onClickingMask () {
      this.$emit('on-click-mask')
      this.closeOnClickingMask && (this.show = false)
    },
    /**
     * [emitEvent 绑定菜单子项事件]
     * @param  {[type]} event [description]
     * @param  {[type]} menu  [description]
     * @param  {[type]} item  [description]
     * @return {[type]}       [description]
     */
    emitEvent (event, menu, item) {
      if (event === 'on-click-menu' && !/.noop/.test(menu)) {
        let _item = item
        if (typeof _item === 'object') {
          _item = JSON.parse(JSON.stringify(_item))
        }
        this.$emit(event, menu, _item)
        this.$emit(`${event}-${menu}`)
        this.closeOnClickingMenu && (this.show = false)
      }
    },
    /**
     * [fixIos 当底部存在tabbar时设置z-index]
     * @param  {[type]} zIndex [description]
     * @return {[type]}        [description]
     */
    fixIos (zIndex) {
      if (this.$el.parentNode && this.$el.parentNode.className.indexOf('v-transfer-dom') !== -1) {
        return
      }
      if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {
        this.$tabbar.style.zIndex = zIndex
      }
    }
  },
  watch: {
    show (val) {
      this.$emit('input', val)
      if (val) {
        this.fixIos(-1)
      } else {
        setTimeout(() => {
          this.fixIos(100)
        }, 200)
      }
    },
    value: {
      handler: function (val) {
        this.show = val
      },
      immediate: true
    }
  },
  beforeDestroy () {
    this.fixIos(100)
    this.$refs.iOSMenu && this.$refs.iOSMenu.removeEventListener('transitionend', this.onTransitionEnd)
  }
}
</script>