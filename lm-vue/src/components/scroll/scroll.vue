<template>
  <div class="scroll-wrapper"
       :ref="wrapper">
    <div class="scroll-content"
         ref="scroll-content">
      <!-- 下拉动画 start -->
      <div :style="getPullDownRefreshAnimationTop"
           v-if="pullDownStyle && pullDownRefreshAnimation === 'follow'"
           class="pull-down-wrapper">
        <div class="blc-width before-trigger">
          <div slot="inline-desc"
               class>
            <!-- 刷新加载前的展现 start -->
            <p v-if="beforePullDown">松手刷新</p>
            <!-- 刷新加载前的展现 end -->
            <!-- 刷新的时候展现 start -->
            <div v-else>
              <!-- 刷新的时候展现 -->
              <p v-if="isPullingDown">正在加载...</p>
              <!-- 刷新的时候展现 -->
              <!-- 加载完成 -->
              <p v-else>加载完成</p>
              <!-- 加载完成 -->
            </div>
            <!-- 刷新的时候展现 end -->
          </div>
        </div>
      </div>
      <!-- 下拉动画 end -->
      <div class="scroll-body" ref="scroll-body">
        <slot></slot>
        <!-- 自定义上拉样式 start -->
        <div id="pullUp">
          <slot name="pull-up-wrapper"
                :isPullUpLoadRefresh="isPullUpLoadRefresh"
                :isPullUpLoad="isPullUpLoad">
            <div v-if="isPullUpLoadRefresh"
                 class="blc-width blc-pd-b-16px before-trigger">
              <div slot="inline-desc"
                   class>
                <!-- 三种状态 上拉，开始加载，加载完成，判断是否已经到最后 二种状态 上拉开始加载，加载完成，判断是否已经到最后 -->
                <div class="pull-message"
                     v-if="!isPullUpLoad">
                  <slot name="before-trigger">
                    <span>加载完成,没有更多数据</span>
                  </slot>
                </div>
                <div class="pull-message"
                     v-else>
                  <slot name="after-trigger">
                    <lm-spinner></lm-spinner>
                    <span class="">加载中...</span>
                  </slot>
                </div>
              </div>
            </div>
          </slot>
        </div>
        <!-- 自定义上拉样式 end -->
      </div>
    </div>
  </div>
</template>

<script>
import {
  hasClass,
  addClass,
  removeClass,
  getRect,
  getData,
  getStyle,
  getById
} from "@/utils";
import BScroll from "better-scroll";
import Spinner from '../spinner'
function noop () { }
const getFontSize = function () {
  let fontSize = (getStyle(document.documentElement, 'font-size').replace(/px/i, '') / 75);
  return fontSize
}
export default {
  name: "lm-scroll",
  props: {
    /**
     * [wrapper 包裹名字]
     * @type {Object}
     */
    wrapper: {
      type: String,
      default: "scroll-wrapper"
    },
    /**
     * [disabled 是否禁用滚动]
     * @type {Object}
     */
    disabled: {
      type: Boolean,
      default: true
    },
    /**
     * [data 用于内部监听数据变化，通知状态更改，刷新dom]
     * @type {Object}
     */
    data: {
      type: null
    },
    /**
     * [probeType description]
     * @type {Object}
     */
    probeType: {
      type: Number,
      default: 1
    },
    /**
     * [direction 开启滚动方向]
     * @type {Object}
     */
    direction: {
      type: String,
      default: 'vertical'
    },

    /**
     * [pullDownRefreshAnimation 配置下拉动画位置 两种1.固定顶部top，一种是跟随下拉位置]
     * @type {Object}
     */
    pullDownRefreshAnimation: {
      type: String,
      default: "follow"
    },
    /**
     * [pullDownRefreshConfig 下拉滚动监听配置]
     * @type {Object}
     */
    pullDownRefreshThreshold: {
      type: Number,
      default: 92
    },
    pullDownRefreshStop: {
      type: Number,
      default: 92
    },
    pullDownRefreshStopTime: {
      type: Number,
      default: 600
    },
    pullUpLoadType: {
      type: String,
      default: "" // end
    },
    /**
     * [pullUpLoadThreshold 配置上拉距离]
     * @type {Object}
     */
    pullUpLoadThreshold: {
      type: Number,
      default: 40
    },
    /**
     * [startY 开始位置]
     * @type {Object}
     */
    startY: {
      type: Number,
      default: 0
    },
    /**
     * [refreshDelay 延迟刷新时间]
     * @type {Object}
     */
    refreshDelay: {
      type: Number,
      default: 10
    },
    /**
     * [bounce 是否开启弹性]
     * @type {Object}
     */
    bounce: {
      type: Boolean | Object,
      default () {
        return {
          top: true,
          bottom: true,
          left: false,
          right: false
        };
      }
    },
    /**
     * [pullDownInitTopConfig 初始化头部位置]
     * @type {Object}
     */
    pullDownInitTopConfig: {
      type: Number,
      default: 92
    },
    /**
     * [isClick 是否开启点击事件]
     * @type {Object}
     */
    isClick: {
      type: Boolean,
      default: true
    },
    /**
     * [isDblclick 是否开启双击击事件]
     * @type {Object}
     */
    isDblclick: {
      type: Boolean,
      default: false
    },
    /**
     * [listenScrollStart 是否开启滚动前监听]
     * @type {Object}
     */
    isListenScrollStart: {
      type: Boolean,
      default: false
    },
    /**
     * [listenScroll 是否开启监听]
     * @type {Object}
     */
    isListenScroll: {
      type: Boolean,
      default: false
    },
    /**
     * [listenBeforeScroll 是否开启滚动前监听]
     * @type {Object}
     */
    isListenBeforeScroll: {
      type: Boolean,
      default: false
    },
    /**
     * [listenScrollEnd 是否开启滚动结束监听]
     * @type {Object}
     */
    isListenScrollEnd: {
      type: Boolean,
      default: false
    },
    /**
     * [zoom 是否开启缩放]
     * @type {Object}
     */
    isZoom: {
      default: false
    },
    /**
     * [stopPropagation 是否阻止事件冒泡。多用在嵌套 scroll 的场景。]
     * @type {Object}
     */
    isStopPropagation: {
      type: Boolean,
      default: false
    },
    /**
     * [useTransition 是否开启css3动画  设置false 防止iphone微信滑动卡顿]
     * @type {Object}
     */
    isUseTransition: {
      type: Boolean,
      default: false
    },
    /**
     * [isFreeScroll 是否开启自由滚动]
     * @type {Object}
     */
    isFreeScroll: {
      type: Boolean,
      default: false
    },
    /**
     * [mouseWheel 是否开启鼠标滚动]
     * @type {Object}
     */
    isMouseWheel: {
      type: Boolean,
      default: false
    },
    /**
     * [pullUpLoad 是否开启上拉加载]
     * @type {Object}
     */
    isPullUpLoadRefresh: {
      type: Boolean,
      default: false
    },
    /**
     * [isPullUpLoadScroll 是否开启上拉加载滚动监听]
     * @type {Object}
     */
    isPullUpLoadScroll: {
      type: Boolean,
      default: false
    },
    /**
     * [scrollbar 是否开启滚动条]
     * @type {Object}
     */
    isScrollbar: {
      type: null,
      default: false
    },
    /**
     * [pullDownRefresh 是否开启下拉加载]
     * @type {Object}
     */
    isPullDownRefresh: {
      type: null,
      default: false
    },
  },
  components: {
    'lm-spinner': Spinner
  },
  data () {
    return {
      pullDownStyle: "", // 下拉样式设置
      beforePullDown: true, // 记录是否已经触发下拉
      isPullingDown: false, // 是否已经下拉
      pullUpDirty: true,
      isPullUpLoad: false,
      isTouchEnd: false,
      scrollY: 0,
      scrollWrapperHeight: 0,
      pullDownStyleHeight: 0,
      upLoadThreshold: 0,
      downRefreshThreshold: 0,
      downRefreshStop: 0,
      downInitTopConfig: 0
    };
  },
  created () {
    // 初始化下拉样式高度
    this.pullDownInitTop = -this.adapter(this.pullDownInitTopConfig || this.pullDownRefreshThreshold);
    this.upLoadThreshold = this.adapter(this.pullUpLoadThreshold);
    this.downRefreshThreshold = this.adapter(this.pullDownRefreshThreshold)
    this.downRefreshStop = this.adapter(this.pullDownRefreshStop)
    this.downInitTopConfig = this.adapter(this.pullDownInitTopConfig)
    this.$nextTick(() => {
      this.initScroll();
    });
  },
  computed: {
    /**
     * [getPullDownRefreshAnimationTop 计算加载头部距离]
     * @return {[type]} [description]
     */
    getPullDownRefreshAnimationTop () {
      let height = this.adapter(this.pullDownRefreshStop ? this.pullDownRefreshStop : (46 * 2));
      return `top:-${height}px;height:${height}px;`;
    }
  },
  methods: {
    /**
     * [initScroll 初始化]
     * @return {[type]} [description]
     */
    initScroll () {
      if (!this.$refs[this.wrapper]) return;
      let scrollWrapper = this.$refs[this.wrapper];
      let scrollContent = this.$refs["scroll-content"];
      let scrollBody = this.$refs[`scroll-body`];
      if (scrollBody) {
        // 设置高度
        let height = getRect(scrollWrapper).height;
        let width = getRect(scrollWrapper).width;
        if (this.direction === 'horizontal') {
          // 计算水平滚动的宽度
          let childrens =
            scrollBody.children && scrollBody.children.length >= 2
              ? scrollBody.children
              : scrollBody.children[0].children,
            slideWidth = 0;
          if (childrens && childrens.length !== 0) {
            for (let i = 0; i < childrens.length; i++) {
              let child = childrens[i],
                childWidth = getRect(child).width;
              slideWidth += childWidth;
              if (getStyle(child, "margin-left")) {
                slideWidth += Number(
                  getStyle(child, "margin-left").replace(/px/gi, "")
                );
              }
              if (getStyle(child, "margin-right")) {
                slideWidth += Number(
                  getStyle(child, "margin-right").replace(/px/gi, "")
                );
              }
              child.style.width = `${childWidth}px`;
            }
          }
          // 设置横行滚动的宽度和高度
          scrollContent.style.width = `${slideWidth}px`;
          scrollBody.style.height = `${childrens[0].height}px`;
        } else {
          // 设置垂直滚动的高度
          scrollBody.style.minHeight = `${height + 1}px`;
        }
      }
      let upLoadThreshold = this.upLoadThreshold;
      let downRefreshThreshold = this.downRefreshThreshold;
      let downRefreshStop = this.downRefreshStop;
      // 实例化对象,并在当前对象上新增一个scoll对象
      this.scroll = new BScroll(scrollWrapper, {
        scrollX: this.direction === 'horizontal', // horizontal水平
        scrollY: this.direction === 'vertical', // vertical垂直
        mouseWheel: this.isMouseWheel,
        stopPropagation: this.isStopPropagation,
        bounce: this.bounce,
        scrollbar: this.isScrollbar, // 是否显示滚动条
        dblclick: this.isDblclick, // 是否开启双击事件
        click: this.isClick,
        probeType: this.probeType,
        // 同理
        pullUpLoad: this.isPullUpLoadRefresh ? {
          'threshold': upLoadThreshold
        } : this.isPullUpLoadRefresh, // 上拉刷新
        // 如果为true 才传入object 配置项目 需要内部建立一个对象
        pullDownRefresh: this.isPullDownRefresh ? {
          'threshold': downRefreshThreshold,
          'stop': downRefreshStop
        } : this.isPullDownRefresh, // 下拉刷新
        useTransition: this.isUseTransition
      });
      // 开始滚动前
      if (this.isListenBeforeScroll) {
        this.scroll.on("beforeScrollStart", () => {
          this.$emit("beforeScrollStart");
        });
      }
      // 开始滚动
      if (this.isListenScrollStart) {
        this.scroll.on("scrollStart", () => {
          this.$emit("scrollStart");
        });
      }
      // 滚动中-1表示从上往下滑,1表示从下往上滑,0表示没有滑动
      this.scroll.on("scroll", pos => {
        if (this.scroll.directionY) pos.directionY = this.scroll.directionY;
        this.scrollY = pos.y;
        if (
          this.scroll.directionY <= 0 &&
          pos.y >= downRefreshStop / 2
        ) {
          this.pullingDownScrollHandle(pos);
        }
        if (this.scroll.directionY >= 0) {
          this.$emit("scroll", pos);
        }
      });
      // 滚动结束
      if (this.isListenScrollEnd) {
        this.scroll.on("scrollEnd", pos => {
          // 滚动到底部
          if (this.pullUpLoadType === "end") {
            if (Math.abs(pos.y) > Math.abs(this.scroll.maxScrollY + upLoadThreshold)) {
              console.log(pos.y);
              this.$emit("scrollEnd", pos);
            }
          } else {
            this.$emit("scrollEnd", pos);
          }
        });
      }
      // 调用事件
      if (this.isPullDownRefresh) this.pullingDownHanlde();
      if (this.isPullUpLoadRefresh) this.pullingUpHandle();
    },
    /**
     * [pullingDownScrollHandle 下拉滚动事件]
     * @param  {[type]} pos [description]
     * @return {[type]}     [description]
     */
    pullingDownScrollHandle (pos) {
      // 首先判断是否开启了下拉事件
      if (!this.isPullDownRefresh) return;
      // 是否是处于下拉
      let downInitTopConfig = this.downInitTopConfig;
      let downRefreshStop = this.downRefreshStop;
      let pullDownInitTop = this.pullDownInitTop;
      if (!this.beforePullDown) {
        if (pos.y < downRefreshStop / 2) return;
        // 这里可以写动画效果
        this.pullDownStyleHeight = parseInt(pos.y);
        if (pos.y >= 0) {
          this.$emit('pullingDownStart', pos);
        }
        this.pullDownStyle = `top:${Math.min(pos.y + pullDownInitTop, 0)}px; height: ${Math.max(parseInt(pos.y), downRefreshStop)}px;`;
      } else {
        // 中间动画持续
        if (Math.min(pos.y + pullDownInitTop, 0) < 0) {
          // this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 0)}px`;
          this.pullDownStyle = `top:${Math.min(pos.y + pullDownInitTop, 0)}px`;
        }
        this.pullDownStyle = `${this.pullDownStyle}; height:${Math.max(pos.y, Math.abs(pos.y + pullDownInitTop))}px;`;

        this.$emit('pullingDownKeep', pos, Math.min(pos.y + pullDownInitTop, 0))
      }

      // 完成后下拉动画进行收缩顶部隐藏
      if (this.isRebounding) {
        if (Math.abs(pos.y) !== 0) {
          this.$emit('pullingDownEnd', pos, -(downInitTopConfig) - (downRefreshStop - pos.y));
        }
        // 顶部动画收缩
        this.pullDownStyle = `top:${-(downInitTopConfig) - (downRefreshStop - pos.y)}px; height:${Math.max(parseInt(pos.y), downRefreshStop
        )}px;`;
      }
    },
    /**
     * [pullingDownHanlde 内部封装下拉事件,供外部使用]
     * @return {[type]} [description]
     */
    pullingDownHanlde () {
      this.scroll.on("pullingDown", () => {
        // 清除绑定
        this.beforePullDown = false;
        if (!this.isPullingDown) {
          this.isPullingDown = true;
          /* 这里替换为外部下拉函数 */
          this.$emit("pullingDown", (state = false) => {
            this.forceUpdate(state)
          });
        }
      });
    },
    /**
     * [pullingUpHandle 内部封装上拉事件,供外部使用]
     * @return {[type]} [description]
     */
    pullingUpHandle () {
      this.scroll.on("pullingUp", (pos) => {
        if (!this.isPullUpLoad) {
          this.isPullUpLoad = true;
          this.$emit("pullingUp", (state = false) => {
            this.forceUpdate(state)
          });
        }
      });
      // 监听手指是否离开屏幕
      // this.scroll.on('touchEnd',(pos)=>{
      //   this.isTouchEnd = true;
      //   if (this.isPullUpLoad) {
      //     this.$emit('pullingUp');
      //   }
      // });
    },
    adapter (value) {
      let fontSize = (getStyle(document.documentElement, 'font-size').replace(/px/i, '') || 75);
      return value ? value * (fontSize / 75) : 0;
    },
    /**
     * [forceUpdate 释放释放状态]
     * @param  {[type]} dirty [description]
     * @return {[type]}       [description]
     */
    forceUpdate (dirty) {
      if (this.isPullDownRefresh && this.isPullingDown) {
        this.isPullingDown = false;
        this._reboundPullDown().then(() => {
          this._afterPullDown();
        });
      } else if (this.isPullUpLoadRefresh && this.isPullUpLoad) {
        this.isPullUpLoad = false;
        this.scroll.finishPullUp();
        this.pullUpDirty = dirty;
        this.refresh();
      } else {
        this.refresh();
      }
    },
    /**
     * [_reboundPullDown 下拉刷新弹性事件]
     * @return {[type]} [description]
     */
    _reboundPullDown () {
      const stopTime = this.pullDownRefreshStopTime;
      return new Promise(resolve => {
        setTimeout(() => {
          this.isRebounding = true;
          this.scroll.finishPullDown();
          resolve();
        }, stopTime);
      });
    },
    /**
     * [_afterPullDown 下拉刷新更改头部加载样子]
     * @return {[type]} [description]
     */
    _afterPullDown () {
      setTimeout(() => {
        let pullDownInitTop = this.pullDownInitTop;
        let pullDownRefreshStop = this.adapter(this.pullDownRefreshStop)
        this.pullDownStyle = `top:${pullDownInitTop}px;height:${pullDownRefreshStop}px;`;
        this.beforePullDown = true;
        this.isRebounding = false;
        this.refresh();
      }, this.scroll.options.bounceTime);
    },
    /**
     * [finishPullUp 通知刷新完成]
     * @return {[type]} [description]
     */
    finishPullUp () {
      if (
        this.scroll &&
        this.scroll.finishPullUp &&
        typeof this.scroll.finishPullUp === "function"
      )
        this.scroll.finishPullUp();
    },
    /**
     * [destroy 销毁scroll]
     * @return {[type]} [description]
     */
    destroy () {
      if (
        this.scroll &&
        this.scroll.destroy &&
        typeof this.scroll.destroy === "function"
      ) {
        this.scroll.destroy();
      }
    },
    /**
     * [disable 禁止滚动]
     * @return {[type]} [description]
     */
    disable () {
      if (
        this.scroll &&
        this.scroll.disable &&
        typeof this.scroll.disable === "function"
      ) {
        this.scroll.disable();
      }
    },
    /**
     * [enable 允许滚动]
     * @return {[type]} [description]
     */
    enable () {
      if (
        this.scroll &&
        this.scroll.enable &&
        typeof this.scroll.enable === "function"
      ) {
        this.scroll.enable();
      }
    },
    /**
     * [refresh 刷新dom节点]
     * @return {[type]} [description]
     */
    refresh () {
      if (
        this.scroll &&
        this.scroll.refresh &&
        typeof this.scroll.refresh === "function"
      ) {
        this.scroll.refresh();
      }
    },
    /**
     * [scrollTo 滚动到指定位置]
     * @return {[type]} [description]
     */
    scrollTo () {
      if (
        this.scroll &&
        this.scroll.scrollTo &&
        typeof this.scroll.scrollTo === "function"
      ) {
        this.scroll.scrollTo.apply(this.scroll, arguments);
      }
    },
    /**
     * [scrollToElement 滚动到指定列表中的某一个对象]
     * @return {[type]} [description]
     */
    scrollToElement () {
      if (
        this.scroll &&
        this.scroll.scrollToElement &&
        typeof this.scroll.scrollToElement === "function"
      ) {
        this.scroll.scrollToElement.apply(this.scroll, arguments);
      }
    },
    /**
     * [openPullUp 动态开启滚动]
     * @return {[type]} [description]
     */
    openPullUp () {
      this.scroll && this.scroll.openPullUp();
    },
    /**
     * [closePullUp 动态关闭滚动]
     * @return {[type]} [description]
     */
    closePullUp () {
      this.scroll && this.scroll.closePullUp();
    },
    /**
     * [clickHandle 点击事件模板]
     * @param  {[type]} event [description]
     * @param  {[type]} item  [description]
     * @return {[type]}       [description]
     */
    clickHandle (event, item) {
      if (!event._constructed) return;
      this.$emit("click", item);
    }
  },

  watch: {
    /**
     * [data 监听外部数据更新状况，更新完成则更新内部状态 如果没有新数据需要在外部 回调中 this.$refs.scroll.forceUpdate()]
     * @type {Object}
     */
    data: {
      handler () {
        // 监听数据刷新后更新状态
        let timer = setTimeout(() => {
          this.isTouchEnd = false;
          if (!this.isPullUpLoad) this.forceUpdate(true);
          clearTimeout(timer);
        }, this.refreshDelay);
      },
      deep: true
    }
  },
  destroyed () {
    // 组件销毁时销毁存在的scroll
    this.$refs.scroll && this.$refs.scroll.destroy();
  },
};
</script>