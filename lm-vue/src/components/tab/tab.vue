<template>
  <div class="lm-tab-container"
    :class="[barPosition === 'top' ? 'lm-tab-bar-top' : '']"
    >
    <div class="lm-tab" :class="[{ 'lm-tab-no-animate' : !animate},{ scrollable }]"
      ref="nav">
      <slot></slot>
      <div
        v-if="animate"
        class="lm-tab-ink-bar"
        :class="[barClass]"
        :style="barStyle">
        <span
          class="lm-tab-bar-inner"
          :style="innerBarStyle"
          v-if="customBarWidth"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { parentMixin } from '@/mixins'
export default {
  name: 'tab',
  mixins: [ parentMixin ],
  mounted () {
    // stop bar anmination on first loading
    this.$nextTick(() => {
      setTimeout(() => {
        this.hasReady = true
      }, 0)
    })
  },
  props: {
    /**
     * [lineWidth 底部边框高度]
     * @type {Object}
     */
    lineWidth: {
      type: Number,
      default: 1
    },
    /**
     * [activeColor 选中颜色]
     * @type {[type]}
     */
    activeColor: String,
    /**
     * [barActiveColor 底部border选中颜色]
     * @type {[type]}
     */
    barActiveColor: String,
    /**
     * [defaultColor 设置默认颜色]
     * @type {[type]}
     */
    defaultColor: String,
    /**
     * [disabledColor 设置禁用文字颜色]
     * @type {[type]}
     */
    disabledColor: String,
    /**
     * [animate 是否启用动画]
     * @type {Object}
     */
    animate: {
      type: Boolean,
      default: true
    },
    /**
     * [customBarWidth 小红点宽度]
     * @type {Array}
     */
    customBarWidth: [Function, String],
    /**
     * [preventDefault 是否开启阻止默认事件]
     * @type {[type]}
     */
    preventDefault: Boolean,
    /**
     * [scrollThreshold 设置列数]
     * @type {Object}
     */
    scrollThreshold: {
      type: Number,
      default: 4
    },
    /**
     * [barPosition 小红点位置]
     * @type {Object}
     */
    barPosition: {
      type: String,
      default: 'bottom',
      validator (val) {
        return ['bottom', 'top'].indexOf(val) !== -1
      }
    }
  },
  computed: {
    /**
     * [barLeft 计算底部边框距离左边距离]
     * @return {[type]} [description]
     */
    barLeft () {
      if (this.hasReady) {
        const count = this.scrollable ? (window.innerWidth / this.$children[this.currentIndex || 0].$el.getBoundingClientRect().width) : this.number
        return `${this.currentIndex * (100 / count)}%`
      }
    },
    /**
     * [barRight 计算底部边框距离右边距离]
     * @return {[type]} [description]
     */
    barRight () {
      if (this.hasReady) {
        const count = this.scrollable ? (window.innerWidth / this.$children[this.currentIndex || 0].$el.getBoundingClientRect().width) : this.number
        return `${(count - this.currentIndex - 1) * (100 / count)}%`
      }
    },
    // when prop:custom-bar-width
    innerBarStyle () {
      return {
        width: typeof this.customBarWidth === 'function' ? this.customBarWidth(this.currentIndex) : this.customBarWidth,
        backgroundColor: this.barActiveColor || this.activeColor
      }
    },
    /**
     * [barStyle 计算底部边框样式]
     * @return {[type]} [description]
     */
    barStyle () {
      const commonStyle = {
        left: this.barLeft,
        right: this.barRight,
        display: 'block',
        height: this.lineWidth + 'px',
        transition: !this.hasReady ? 'none' : null
      }
      if (!this.customBarWidth) {
        commonStyle.backgroundColor = this.barActiveColor || this.activeColor
      } else {
        commonStyle.backgroundColor = 'transparent' // when=prop:custom-bar-width
      }
      return commonStyle
    },
    /**
     * [barClass 底部边框运动样式]
     * @return {[type]} [description]
     */
    barClass () {
      return {
        'lm-tab-ink-bar-transition-forward': this.direction === 'forward',
        'lm-tab-ink-bar-transition-backward': this.direction === 'backward'
      }
    },
    /**
     * [scrollable 计算是否超出滚动]
     * @return {[type]} [description]
     */
    scrollable () {
      return this.number > this.scrollThreshold
    }
  },
  watch: {
    /**
     * [currentIndex 监听当前索引]
     * @param  {[type]} newIndex [description]
     * @param  {[type]} oldIndex [description]
     * @return {[type]}          [description]
     */
    currentIndex (newIndex, oldIndex) {
      this.direction = newIndex > oldIndex ? 'forward' : 'backward'
      this.$emit('on-index-change', newIndex, oldIndex)
      this.hasReady && this.scrollToActiveTab()
    }
  },
  data () {
    return {
      direction: 'forward',
      right: '100%',
      hasReady: false
    }
  },
  methods: {
    /**
     * [scrollToActiveTab 点击子组件进行动画运动]
     * @return {[type]} [description]
     */
    scrollToActiveTab () {
      if (!this.scrollable || !this.$children || !this.$children.length) {
        return;
      }
      const currentIndexTab = this.$children[this.currentIndex].$el;
      let count = 0;
      // scroll animation
      const step = () => {
        const scrollDuration = 15;
        const nav = this.$refs.nav;
        nav.scrollLeft += (currentIndexTab.offsetLeft - (nav.offsetWidth - currentIndexTab.offsetWidth) / 2 - nav.scrollLeft) / scrollDuration
        if (++count < scrollDuration) {
          window.requestAnimationFrame(step)
        }
      }
      window.requestAnimationFrame(step)
    }
  }
}
</script>
<style lang="scss">
@import '~@/theme/index.scss';
@import '~@/theme/tab.scss';
</style>