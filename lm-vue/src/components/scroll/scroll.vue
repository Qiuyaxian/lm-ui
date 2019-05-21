<template>
  <div class="scroll-wrapper" :ref="wrapper">
    <div class="scroll-content" ref="scroll-content">
      <!-- 下拉动画 start -->
      <div
        :style="getPullDownRefreshAnimationTop"
        v-if="pullDownStyle && pullDownRefreshAnimation === 'follow'"
        class="pull-down-wrapper"
      >
        <div class="blc-width before-trigger">
          <div slot="inline-desc" class>
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
      </div>
      <!-- 自定义上拉样式 start -->
      <div id="pullUp">
        <slot name="pull-up-wrapper" :pullUpLoad="pullUpLoad" :isPullUpLoad="isPullUpLoad">
          <div v-if="pullUpLoad" class="blc-width blc-pd-b-16px before-trigger">
            <div slot="inline-desc" class>
              <!-- 三种状态 上拉，开始加载，加载完成，判断是否已经到最后 二种状态 上拉开始加载，加载完成，判断是否已经到最后 -->
              <div class v-if="!isPullUpLoad">
                <slot name="before-trigger">
                  <p>加载完成,没有更多数据</p>
                </slot>
              </div>
              <div class="after-trigger" v-else>
                <slot name="after-trigger">
                  <p>加载中...</p>
                </slot>
              </div>
            </div>
          </div>
        </slot>
      </div>
      <!-- 自定义上拉样式 end -->
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
function noop() {}
const COMPONENT_NAME = "scroll";
const DIRECTION_H = "horizontal"; // 水平的
const DIRECTION_V = "vertical"; // 垂直的
const pullDownStyle = "";
export default {
  name: "scroll",
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
    listenScrollStart: {
      type: Boolean,
      default: false
    },
    /**
     * [listenScroll 是否开启监听]
     * @type {Object}
     */
    listenScroll: {
      type: Boolean,
      default: false
    },
    /**
     * [listenBeforeScroll 是否开启滚动前监听]
     * @type {Object}
     */
    listenBeforeScroll: {
      type: Boolean,
      default: false
    },
    /**
     * [listenScrollEnd 是否开启滚动结束监听]
     * @type {Object}
     */
    listenScrollEnd: {
      type: Boolean,
      default: false
    },
    /**
     * [direction 开启滚动方向]
     * @type {Object}
     */
    direction: {
      type: String,
      default: DIRECTION_V
    },
    /**
     * [scrollbar 是否开启滚动条]
     * @type {Object}
     */
    scrollbar: {
      type: null,
      default: false
    },
    /**
     * [pullDownRefresh 是否开启下拉加载]
     * @type {Object}
     */
    pullDownRefresh: {
      type: null,
      default: false
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
     * [pullDownRefreshScroll 是否开启下拉滚动监听]
     * @type {Object}
     */
    pullDownRefreshScroll: {
      type: Boolean,
      default: false
    },
    /**
     * [pullDownRefreshConfig 下拉滚动监听配置]
     * @type {Object}
     */
    pullDownRefreshConfig: {
      type: Object,
      default() {
        return {
          threshold: 80, // 下拉距离到50px触发刷新函数,同时必须搭配bounce中的top值为真，开启弹性才可以触发
          stop: 80 // 下拉停止位置
        };
      }
    },
    /**
     * [pullUpLoad 是否开启上拉加载]
     * @type {Object}
     */
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    pullUpLoadType: {
      type: String,
      default: "" // end
    },
    /**
     * [pullUpLoadScroll 是否开启上拉加载滚动监听]
     * @type {Object}
     */
    pullUpLoadScroll: {
      type: Boolean,
      default: false
    },
    /**
     * [pullUpLoadConfig 配置上拉距离]
     * @type {Object}
     */
    pullUpLoadConfig: {
      type: Object,
      default() {
        return {
          threshold: 40
        };
      }
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
     * [freeScroll 是否开启自由滚动]
     * @type {Object}
     */
    freeScroll: {
      type: Boolean,
      default: false
    },
    /**
     * [mouseWheel 是否开启鼠标滚动]
     * @type {Object}
     */
    mouseWheel: {
      type: Boolean,
      default: false
    },
    /**
     * [bounce 是否开启弹性]
     * @type {Object}
     */
    bounce: {
      type: Boolean | Object,
      default() {
        return {
          top: true,
          bottom: true,
          left: false,
          right: false
        };
      }
    },
    /**
     * [stopPropagation 是否阻止事件冒泡。多用在嵌套 scroll 的场景。]
     * @type {Object}
     */
    stopPropagation: {
      type: Boolean,
      default: false
    },
    /**
     * [pageStopPropagation description]
     * @type {Object}
     */
    pageStopPropagation: {
      type: Boolean,
      default: false
    },
    /**
     * [zoom 是否开启缩放]
     * @type {Object}
     */
    zoom: {
      default: false
    },
    /**
     * [useTransition 是否开启css3动画  设置false 防止iphone微信滑动卡顿]
     * @type {Object}
     */
    useTransition: {
      type: Boolean,
      default: false
    },
    /**
     * [pullUpLoadShow 是否显示加载文字]
     * @type {Object}
     */
    pullUpLoadShow: {
      type: Boolean,
      default: false
    },
    /**
     * [pullingDownStart 下拉滚动前执行]
     * @type {Object}
     */
    pullingDownStart: {
      type: Function,
      default: noop
    },
    /**
     * [pullingDownEnd 下拉结束执行函数]
     * @type {Object}
     */
    pullingDownEnd: {
      type: Function,
      default: noop
    },
    /**
     * [pullingDownKeep 下拉正在执行函数]
     * @type {Object}
     */
    pullingDownKeep: {
      type: Function,
      default: noop
    },
    /**
     * [pullDownInitTopConfig 初始化头部位置]
     * @type {Object}
     */
    pullDownInitTopConfig: {
      type: Number,
      default: 50
    }
  },
  data() {
    return {
      pullDownStyle: "", // 下拉样式设置
      beforePullDown: true, // 记录是否已经触发下拉
      isPullingDown: false, // 是否已经下拉
      pullUpDirty: true,
      isPullUpLoad: false,
      isTouchEnd: false,
      scrollY: 0,
      scrollWrapperHeight: 0,
      pullDownStyleHeight: 0
    };
  },
  created() {
    // 初始化下拉样式高度
    this.pullDownInitTop = -(
      this.pullDownInitTopConfig || this.pullDownRefreshConfig.threshold
    );
    this.$nextTick(() => {
      this.initScroll();
    });
  },
  mounted() {},
  destroyed() {
    // 组件销毁时销毁存在的scroll
    this.$refs.scroll && this.$refs.scroll.destroy();
  },
  updated() {},
  computed: {
    /**
     * [getPullDownRefreshAnimationTop 计算加载头部距离]
     * @return {[type]} [description]
     */
    getPullDownRefreshAnimationTop() {
      let height =
        this.pullDownRefreshConfig && this.pullDownRefreshConfig.stop
          ? this.pullDownRefreshConfig.stop
          : "50";
      return `top:-${height}px;height:${height}px;`;
    }
  },
  methods: {
    /**
     * [initScroll 初始化]
     * @return {[type]} [description]
     */
    initScroll() {
      if (this.pageStopPropagation) return;
      let scrollWrapper = this.$refs[this.wrapper],
        scrollContent = this.$refs["scroll-content"],
        scrollBody = this.$refs[`scroll-body`];
      if (!this.$refs["scroll-wrapper"]) return;
      if (scrollBody) {
        // 设置高度
        let height = getRect(scrollWrapper).height,
          width = getRect(scrollWrapper).width;
        if (this.direction === DIRECTION_H) {
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
      // 实例化对象,并在当前对象上新增一个scoll对象
      this.scroll = new BScroll(scrollWrapper, {
        scrollX: this.direction === DIRECTION_H, // horizontal水平
        scrollY: this.direction === DIRECTION_V, // vertical垂直
        mouseWheel: this.mouseWheel,
        // eventPassthrough: this.direction === DIRECTION_H?'vertical':'horizontal', // 忽略竖直方向的滚动
        stopPropagation: this.stopPropagation,
        bounce: this.bounce,
        scrollbar: this.scrollbar, // 是否显示滚动条
        dblclick: this.isDblclick, // 是否开启双击事件
        click: this.isClick,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad ? this.pullUpLoadConfig : this.pullUpLoad, // 上拉刷新
        pullDownRefresh: this.pullDownRefresh
          ? this.pullDownRefreshConfig
          : this.pullDownRefresh, // 下拉刷新
        useTransition: this.useTransition
      });
      // 开始滚动前
      if (this.listenBeforeScroll) {
        this.scroll.on("beforeScrollStart", () => {
          this.$emit("beforeScrollStart");
        });
      }
      // 开始滚动
      if (this.listenScrollStart) {
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
          pos.y >= this.pullDownRefreshConfig.stop / 2
        ) {
          this.pullingDownScrollHandle(pos);
        }
        if (this.scroll.directionY >= 0) {
          this.$emit("scroll", pos);
        }
      });
      // 滚动结束
      if (this.listenScrollEnd) {
        this.scroll.on("scrollEnd", pos => {
          // 滚动到底部
          if (this.pullUpLoadType === "end") {
            if (Math.abs(pos.y) > Math.abs(this.scroll.maxScrollY + 50)) {
              console.log(pos.y);
              this.$emit("scrollEnd", pos);
            }
          } else {
            this.$emit("scrollEnd", pos);
          }
        });
      }
      // 调用事件
      if (this.pullDownRefresh) this.pullingDownHanlde();
      if (this.pullUpLoad) this.pullingUpHandle();
    },
    /**
     * [pullingDownScrollHandle 下拉滚动事件]
     * @param  {[type]} pos [description]
     * @return {[type]}     [description]
     */
    pullingDownScrollHandle(pos) {
      // 首先判断是否开启了下拉事件
      if (!this.pullDownRefresh) return;
      // 是否是处于下拉
      if (!this.beforePullDown) {
        if (pos.y < this.pullDownRefreshConfig.stop / 2) return;
        // 这里可以写动画效果
        this.pullDownStyleHeight = parseInt(pos.y);
        if (pos.y >= 0) {
          this.pullingDownStart && this.pullingDownStart(pos);
        }
        this.pullDownStyle = `top:${Math.min(
          pos.y + this.pullDownInitTop,
          0
        )}px;height: ${Math.max(
          parseInt(pos.y),
          this.pullDownRefreshConfig.stop
        )}px;`;
      } else {
        // 中间动画持续
        if (Math.min(pos.y + this.pullDownInitTop, 0) < 0) {
          // this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 0)}px`;
          this.pullDownStyle = `top:${Math.min(
            pos.y + this.pullDownInitTop,
            0
          )}px`;
        }
        this.pullDownStyle = `${this.pullDownStyle};height:${Math.max(
          pos.y,
          Math.abs(pos.y + this.pullDownInitTop)
        )}px;`;
        this.pullingDownKeep &&
          this.pullingDownKeep(pos, Math.min(pos.y + this.pullDownInitTop, 0));
      }
      // 完成后下拉动画进行收缩顶部隐藏
      if (this.isRebounding) {
        if (Math.abs(pos.y) !== 0) {
          this.pullingDownEnd &&
            this.pullingDownEnd(
              pos,
              -this.pullDownInitTopConfig -
                (this.pullDownRefreshConfig.stop - pos.y)
            );
        }
        // 顶部动画收缩
        this.pullDownStyle = `top:${-this.pullDownInitTopConfig -
          (this.pullDownRefreshConfig.stop - pos.y)}px;height:${Math.max(
          parseInt(pos.y),
          this.pullDownRefreshConfig.stop
        )}px;`;
      }
    },
    /**
     * [pullingDownHanlde 内部封装下拉事件,供外部使用]
     * @return {[type]} [description]
     */
    pullingDownHanlde() {
      this.scroll.on("pullingDown", () => {
        // 清除绑定
        this.beforePullDown = false;
        this.isPullingDown = true;
        /* 这里替换为外部下拉函数 */
        this.$emit("pullingDown");
      });
    },
    /**
     * [pullingUpHandle 内部封装上拉事件,供外部使用]
     * @return {[type]} [description]
     */
    pullingUpHandle() {
      this.scroll.on("pullingUp", () => {
        this.isPullUpLoad = true;
        this.$emit("pullingUp");
      });
      // 监听手指是否离开屏幕
      // this.scroll.on('touchEnd',(pos)=>{
      //   this.isTouchEnd = true;
      //   if (this.isPullUpLoad) {
      //     this.$emit('pullingUp');
      //   }
      // });
    },
    /**
     * [forceUpdate 释放释放状态]
     * @param  {[type]} dirty [description]
     * @return {[type]}       [description]
     */
    forceUpdate(dirty) {
      if (this.pullDownRefresh && this.isPullingDown) {
        this.isPullingDown = false;
        this._reboundPullDown().then(() => {
          this._afterPullDown();
        });
      } else if (this.pullUpLoad && this.isPullUpLoad) {
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
    _reboundPullDown() {
      const { stopTime = 600 } = this.pullDownRefresh;
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
    _afterPullDown() {
      setTimeout(() => {
        this.pullDownStyle = `top:${this.pullDownInitTop}px;height:${
          this.pullDownRefreshConfig.stop
        }px;`;
        this.beforePullDown = true;
        this.isRebounding = false;
        this.refresh();
      }, this.scroll.options.bounceTime);
    },
    /**
     * [finishPullUp 通知刷新完成]
     * @return {[type]} [description]
     */
    finishPullUp() {
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
    destroy() {
      if (
        this.scroll &&
        this.scroll.destroy &&
        typeof this.scroll.destroy === "function"
      )
        this.scroll.destroy();
    },
    /**
     * [disable 禁止滚动]
     * @return {[type]} [description]
     */
    disable() {
      if (
        this.scroll &&
        this.scroll.disable &&
        typeof this.scroll.disable === "function"
      )
        this.scroll.disable();
    },
    /**
     * [enable 允许滚动]
     * @return {[type]} [description]
     */
    enable() {
      if (
        this.scroll &&
        this.scroll.enable &&
        typeof this.scroll.enable === "function"
      )
        this.scroll.enable();
    },
    /**
     * [refresh 刷新dom节点]
     * @return {[type]} [description]
     */
    refresh() {
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
    scrollTo() {
      if (
        this.scroll &&
        this.scroll.scrollTo &&
        typeof this.scroll.scrollTo === "function"
      )
        this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    /**
     * [scrollToElement 滚动到指定列表中的某一个对象]
     * @return {[type]} [description]
     */
    scrollToElement() {
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
    openPullUp() {
      this.scroll.openPullUp();
    },
    /**
     * [closePullUp 动态关闭滚动]
     * @return {[type]} [description]
     */
    closePullUp() {
      this.scroll.closePullUp();
    },
    /**
     * [clickHandle 点击事件模板]
     * @param  {[type]} event [description]
     * @param  {[type]} item  [description]
     * @return {[type]}       [description]
     */
    clickHandle(event, item) {
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
      handler() {
        // 监听数据刷新后更新状态
        setTimeout(() => {
          this.isTouchEnd = false;
          this.forceUpdate(true);
        }, this.refreshDelay);
      },
      deep: true
    },
    disabled: {
      handler(newVal, oldVal) {
        // this.pullDownInitTop = -(this.pullDownInitTopConfig || this.pullDownRefreshConfig.threshold);
        // 初始化下拉样式高度
        // this.$nextTick(() => {
        //   if (newVal) this.initScroll();
        // });
      },
      immediate: true
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.scroll-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 2;
  /*background: transparent;*/
}
.scroll-content {
  position: relative;
  z-index: 1;
}
.pullingDown-trigger,
.pull-down-wrapper {
  position: absolute;
  width: 100%;
  left: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-transition: all;
  transition: all;
  z-index: 999;
}
</style>
