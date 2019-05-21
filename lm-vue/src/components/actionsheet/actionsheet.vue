<template>
  <div class="vup-actionsheet-wrapper">
    <transition name="vup-actionsheet-mask">
      <div
        class="vup-mask vup-mask_transparent"
        @click="onClickingMask"
        v-show="show"></div>
    </transition>
    <div
      class="vup-skin_android"
      v-if="theme === 'android'">
      <transition
        name="vup-android-actionsheet"
        @after-enter="$emit('on-after-show')"
        @after-leave="$emit('on-after-hide')">
        <div
          class="vup-actionsheet"
          v-show="show">
          <div class="vup-actionsheet__menu">
            <div
              class="vup-actionsheet__cell"
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
      class="vup-actionsheet"
      :class="{'vup-actionsheet_toggle': show}"
      v-else
      ref="iOSMenu">
      <div class="vup-actionsheet__menu">
        <div class="vup-actionsheet__cell" v-if="hasHeaderSlot">
          <slot name="header"></slot>
        </div>
        <div class="vup-actionsheet__cell"
          v-for="(text, key) in menus"
          :key="key"
          @click="onMenuClick(text, key)"
          v-html="text.label || text"
          :class="`vup-actionsheet-menu-${text.type || 'default'}`">
        </div>
      </div>
      <div
        class="vup-actionsheet__action"
        @click="emitEvent('on-click-menu', 'cancel')"
        v-if="showCancel">
        <div class="vup-actionsheet__cell">{{ cancelText || '取消' }}</div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'actionsheet',
  mounted () {
    this.hasHeaderSlot = !!this.$slots.header
    this.$nextTick(() => {
      this.$tabbar = document.querySelector('.vup-tabbar')
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
    onTransitionEnd () {
      this.$emit(this.show ? 'on-after-show' : 'on-after-hide')
    },
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
    onClickingMask () {
      this.$emit('on-click-mask')
      this.closeOnClickingMask && (this.show = false)
    },
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

<style lang="scss">
@import '~@/theme/index.scss';
@import '~@/theme/mask.scss';
@import '~@/theme/actionsheet.scss';
.#{$class-prefix} {
  &-actionsheet-menu-primary {
    color: $actionsheet-label-primary-color;
  }
  &-actionsheet-menu-warn {
    color: $actionsheet-label-warn-color;
  }
  &-actionsheet-menu-default {
    color: $actionsheet-label-default-color;
  }
  &-actionsheet-menu-disabled {
    color: $actionsheet-label-disabled-color;
  }
  &-actionsheet-mask-enter,
  &-actionsheet-mask-leave-active,
  &-android-actionsheet-enter,
  &-android-actionsheet-leave-active {
    opacity: 0;
  }
  &-actionsheet-mask-leave-active,
  &-actionsheet-mask-enter-active,
  &-android-actionsheet-leave-active,
  &-android-actionsheet-enter-active {
    transition: opacity 300ms!important;
  }
}
</style>