<template>
  <div class="lm-marquee" :style="{height: height + 'px'}">
    <ul class="lm-marquee-box" ref="box" :style="{transform: `translate3d(0,${currenTranslateY}px,0)`, transition: `transform ${noAnimate ? 0 : duration}ms`}">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'lm-marquee',
  props: {
    /**
     * [interval 方法滚动时间]
     * @type {Object}
     */
    interval: {
      type: Number,
      default: 2000
    },
    /**
     * [duration 滚动时间间距]
     * @type {Object}
     */
    duration: {
      type: Number,
      default: 300
    },
    /**
     * [direction 滚动方向['up', 'down']]
     * @type {Object}
     */
    direction: {
      type: String,
      default: 'up'
    },
    /**
     * [itemHeight 滚动项高度]
     * @type {[type]}
     */
    itemHeight: Number
  },
  beforeDestroy () {
    this.destroy()
  },
  data () {
    return {
      currenTranslateY: 0,
      height: '',
      length: 0,
      currentIndex: 0,
      noAnimate: false
    }
  },
  methods: {
    /**
     * [destroy 销毁]
     * @return {[type]} [description]
     */
    destroy () {
      this.timer && clearInterval(this.timer)
    },
    /**
     * [init 初始化]
     * @return {[type]} [description]
     */
    init () {
      this.destroy()
      if (this.cloneNode) {
        this.$refs.box.removeChild(this.cloneNode)
      }
      this.cloneNode = null
      let firstItem = this.$refs.box.firstElementChild
      if (!firstItem) {
        return false
      }
      this.length = this.$refs.box.children.length
      this.height = this.itemHeight || firstItem.offsetHeight
      if (this.direction === 'up') {
        this.cloneNode = firstItem.cloneNode(true)
        this.$refs.box.appendChild(this.cloneNode)
      } else {
        this.cloneNode = this.$refs.box.lastElementChild.cloneNode(true)
        this.$refs.box.insertBefore(this.cloneNode, firstItem)
      }
      return true
    },
    /**
     * [start 开始播放]
     * @return {[type]} [description]
     */
    start () {
      if (this.direction === 'down') this.go(false)
      this.timer = setInterval(() => {
        if (this.direction === 'up') {
          this.currentIndex += 1
          this.currenTranslateY = -this.currentIndex * this.height
        } else {
          this.currentIndex -= 1
          this.currenTranslateY = -(this.currentIndex + 1) * this.height
        }
        if (this.currentIndex === this.length) {
          setTimeout(() => {
            this.go(true)
          }, this.duration)
        } else if (this.currentIndex === -1) {
          setTimeout(() => {
            this.go(false)
          }, this.duration)
        } else {
          this.noAnimate = false
        }
      }, this.interval + this.duration)
    },
    /**
     * [go 滚动]
     * @param  {[type]} toFirst [description]
     * @return {[type]}         [description]
     */
    go (toFirst) {
      this.noAnimate = true
      if (toFirst) {
        this.currentIndex = 0
        this.currenTranslateY = 0
      } else {
        this.currentIndex = this.length - 1
        this.currenTranslateY = -(this.currentIndex + 1) * this.height
      }
    }
  }
}
</script>