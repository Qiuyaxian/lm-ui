<template>
  <div class="lm-inline-block">
    <span v-if="showTimeString">{{ timeString }}</span>
    <div class="lm-clocker-tpl"><slot></slot></div>
  </div>
</template>

<script>
import Clocker from './clocker'
let format = '%D 天 %H 小时 %M 分 %S 秒';
// if (typeof V_LOCALE === 'undefined') {
//   if (process.env.NODE_ENV === 'development') {
//     console.warn('[VUX warn] 抱歉，clocker 组件需要升级 vux-loader 到最新版本才能正常使用')
//   }
// } else {
//   if (V_LOCALE === 'en') { // eslint-disable-line
//     format = '%D d %H h %M m %S s'
//   } else if (V_LOCALE === 'zh-CN') { // eslint-disable-line
//     format = '%D 天 %H 小时 %M 分 %S 秒'
//   }
// }
export default {
  name: 'clock',
  mounted () {
    this.$nextTick(() => {
      this.slot = this.$el.querySelector('.lm-clocker-tpl');
      this.slotString = this.slot.innerHTML;
      if (this.slotString !== '') {
        this.showTimeString = false;
      }
      this.render();
    })
  },
  methods: {
    /**
     * [render 渲染函数]
     * @return {[type]} [description]
     */
    render () {
      if (!this.time) return;
      this.clocker = new Clocker(this.time).on('tick', event => {
        this.update(event)
        this.$emit('on-tick', event)
      }).on('finish', () => {
        this.timeString = '00:00:00'
        this.$emit('on-finish')
      }).start()
    },
    /**
     * [update 更新时间状态]
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    update (event) {
      if (this.showTimeString) {
        this.timeString = event.strftime(this.format)
      } else {
        let string = event.strftime(this.slotString)
        if (string !== this.cacheSlotString) {
          this.slot.innerHTML = this.cacheSlotString = string
        }
      }
    }
  },
  props: {
    /**
     * [time 设置时间]
     * @type {Array}
     */
    time: [String, Number],
    /**
     * [format 设置时间格式]
     * @type {Object}
     */
    format: {
      type: String,
      default: format
    }
  },
  watch: {
    /**
     * [time 监听时间值变化,执行移除和重新渲染操作]
     * @return {[type]} [description]
     */
    time () {
      this.clocker && this.clocker.remove();
      this.render();
    }
  },
  data () {
    return {
      showTimeString: true,
      timeString: '',
      slotString: '',
      cacheSlotString: ''
    }
  },
  beforeDestroy () {
    // 销毁清除
    if (this.clocker) {
      this.clocker.remove();
      this.clocker = null;
    }
  }
}
</script>