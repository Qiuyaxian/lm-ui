<script>
import { CountUp } from 'countup.js'
import { extend } from '@/utils'
export default {
  name: 'count-up',
  created () {
    this.$nextTick(() => {
      let options = extend({
        startVal: this.startVal,
        decimalPlaces: this.decimals,
        duration: this.duration
      }, this.options);
      this._countup = new CountUp(this.$el, this.endVal, options);
      if (this.start) {
        this._countup.start();
      }
    })
  },
  props: {
    /**
     * [tag elememt 标签]
     * @type {Object}
     */
    tag: {
      type: String,
      default: 'span'
    },
    /**
     * [start 是否完成就执行]
     * @type {Object}
     */
    start: {
      type: Boolean,
      default: true
    },
    /**
     * [startVal 默认开始值]
     * @type {Object}
     */
    startVal: {
      type: Number,
      default: 0
    },
    /**
     * [endVal 结束值]
     * @type {Object}
     */
    endVal: {
      type: Number,
      required: true
    },
    /**
     * [decimals number of decimal places in number]
     * @type {Object}
     */
    decimals: {
      type: Number,
      default: 0
    },
    /**
     * [duration 递增间距]
     * @type {Object}
     */
    duration: {
      type: Number,
      default: 2
    },
    /**
     * [options 配置项]
     * @type {Object}
     */
    options: {
      type: Object,
      default () {
        return {

        }
      }
    }
  },
  render (h) {
    return h(this.tag, {}, [ this.startVal ])
  },
  watch: {
    /**
     * [start 监听start变化]
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    start (val) {
      if (val) {
        this._countup && this._countup.start()
      }
    },
    /**
     * [endVal 监听结束值变化]
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    endVal (val) {
      this._countup && this._countup.update(val);
    }
  },
  destroyed () {
    this._countup = null
  }
}
</script>