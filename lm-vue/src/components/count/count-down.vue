<template>
  <span><slot>{{ message }}</slot>{{currentTime}}</span>
</template>

<script>
export default {
  name: 'count-down',
  props: {
    /**
     * [value 绑定值]
     * @type {[type]}
     */
    value: Number,
    /**
     * [message 提示语]
     * @type {[type]}
     */
    message: String,
    /**
     * [start 是否加载完成启动]
     * @type {Object}
     */
    start: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.currentTime = this.time;
    if (this.value) this.currentTime = this.value;
  },
  methods: {
    /**
     * [tick 执行倒计时]
     * @return {[type]} [description]
     */
    tick () {
      let _this = this
      this.interval = setInterval(() => {
        if (_this.currentTime > 0) {
          _this.currentTime--;
        } else {
          _this.stop();
          _this.index++;
          _this.$emit('on-finish', _this.index);
        }
      }, 1000);
    },
    /**
     * [stop 停止倒计时]
     * @return {[type]} [description]
     */
    stop () {
      clearInterval(this.interval);
    }
  },
  watch: {
    /**
     * [value 监听绑定值变化]
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    value (val) {
      this.currentTime = val;
    },
    /**
     * [currentTime 监听当前时间变化]
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    currentTime (val) {
      this.$emit('input', val);
    },
    /**
     * [start 监听是否加载完成立刻执行]
     * @param  {[type]} newVal [description]
     * @param  {[type]} oldVal [description]
     * @return {[type]}        [description]
     */
    start (newVal, oldVal) {
      if (newVal === true && oldVal === false && this.currentTime > 0) {
        this.tick();
      }
      if (newVal === false && oldVal === true) {
        this.stop();
      }
    }
  },
  mounted () {
    if (this.start) {
      this.tick();
    }
  },
  data () {
    return {
      interval: null,
      index: 0,
      currentTime: 60
    }
  }
}
</script>