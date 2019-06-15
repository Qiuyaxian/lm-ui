import React from 'react';
import { Component, pxTorem, isEqual, getRect, getStyle, querySelector, addEventHandle, removeEventHandle } from '@src/core';
import BScroll from "better-scroll";
import {
  ScrollComponentProps,
  pullDownRefreshThresholdProps,
  PullUpLoadConfigProps,
  BounceProps,
  ScrollState,
  posProps
} from './PropsType'

function noop() { }

interface ScrollProps extends ScrollComponentProps {

};

export class Scroll extends Component<ScrollProps, ScrollState> {
  wrap: any
  scroll: any
  static defaultProps: ScrollProps = {
    wrapper: "scroll-wrapper",
    disabled: false,
    data: null,
    probeType: 1,
    direction: 'vertical',
    pullDownRefreshAnimation: 'follow',
    pullDownRefreshThreshold: 46 * 2,
    pullDownRefreshStop: 46 * 2,
    pullDownRefreshStopTime: 600,
    pullUpLoadType: '',
    pullUpLoadThreshold: 40,
    startY: 0,
    refreshDelay: 10,
    bounce: {
      top: true,
      bottom: true,
      left: false,
      right: false
    },
    pullDownInitTopConfig: 46 * 2,
    isClick: true,
    isDblclick: false,
    isListenScrollStart: false,
    isListenScroll: false,
    isListenBeforeScroll: false,
    isListenScrollEnd: false,
    isZoom: false,
    isStopPropagation: false,
    isUseTransition: false,
    isFreeScroll: false,
    isMouseWheel: false,
    isPullUpLoadRefresh: false,
    isPullUpLoadScroll: false,
    isScrollbar: false,
    isPullDownRefresh: false
  }
  state: ScrollState = {
    pullDownStyle: "", // 下拉样式设置
    beforePullDown: true, // 记录是否已经触发下拉
    isPullingDown: false, // 是否已经下拉
    pullUpDirty: true,
    isPullUpLoad: false,
    isTouchEnd: false,
    scrollY: 0,
    scrollWrapperHeight: 0,
    pullDownStyleHeight: 0,
    pullDownInitTop: 0,
    isRebounding: false,

    upLoadThreshold: 0,
    downRefreshThreshold: 0,
    downRefreshStop: 0,
    downInitTopConfig: 0
  }
  constructor(props: ScrollProps) {
    super(props);
  }
  componentDidMount() {
    let { pullDownInitTopConfig,
      pullDownRefreshThreshold,
      pullDownRefreshStop,
      pullUpLoadThreshold
    } = this.props;

    let pullDownInitTop: number = -this.adapter(pullDownInitTopConfig ||
      pullDownRefreshThreshold);
    let upLoadThreshold: number = this.adapter(pullUpLoadThreshold);
    let downRefreshThreshold: number = this.adapter(pullDownRefreshThreshold)
    let downRefreshStop: number = this.adapter(pullDownRefreshStop)
    let downInitTopConfig: number = this.adapter(pullDownInitTopConfig)

    this.setState({
      pullDownInitTop: pullDownInitTop,
      upLoadThreshold: upLoadThreshold,
      downRefreshThreshold: downRefreshThreshold,
      downRefreshStop: downRefreshStop,
      downInitTopConfig: downInitTopConfig
    })
    let timer = setTimeout(() => {
      this.initScroll();
      clearTimeout(timer);
    })
  }

  adapter(value: number): number {
    let fontSize = (getStyle(document.documentElement, 'font-size').replace(/px/i, '') || 75);
    return value ? value * (fontSize / 75) : 0;
  }

  componentWillUnmount() {

  }

  componentWillReceiveProps(nextProps: ScrollProps) {
    let { data: nData } = nextProps;
    let { data: oData, refreshDelay } = this.props;
    if (!isEqual(nData, oData)) {
      let { isPullUpLoad } = this.state;
      let timer = setTimeout(() => {
        this.setState({
          isTouchEnd: false
        })
        if (!isPullUpLoad) this.forceUpdate(true);
        clearTimeout(timer);
      }, refreshDelay);
    }
  }
  // methods 
  /**
   * [initScroll 初始化]
   * @return {[type]} [description]
   */
  private initScroll(): void {
    let {
      direction,
      bounce,
      isDblclick,
      isClick,
      probeType,
      isListenScrollStart,
      isListenScroll,
      isListenBeforeScroll,
      isListenScrollEnd,
      isZoom,
      isStopPropagation,
      isUseTransition,
      isFreeScroll,
      isMouseWheel,
      isPullUpLoadRefresh,
      isPullUpLoadScroll,
      isScrollbar,
      isPullDownRefresh,
      pullUpLoadType
    } = this.props;


    let scrollWrapper: any = this.refs['wrapper'],
      scrollContent: any = this.refs["scroll-content"],
      scrollBody: any = this.refs[`scroll-body`];
    // if (!this.refs["scroll-wrapper"]) return;



    if (scrollBody) {
      // 设置高度
      let height: number = Number(getRect(scrollWrapper).height),
        width: number = Number(getRect(scrollWrapper).width);
      if (direction === 'horizontal') {
        // 计算水平滚动的宽度
        let childrens: any[] =
          scrollBody.children && scrollBody.children.length >= 2
            ? scrollBody.children
            : scrollBody.children[0].children;
        let slideWidth: number = 0;
        if (childrens && childrens.length !== 0) {
          for (let i = 0; i < childrens.length; i++) {
            let child = childrens[i];
            let childWidth: number = Number(getRect(child).width);
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
    let {
      upLoadThreshold,
      downRefreshThreshold,
      downRefreshStop
    } = this.state;
    // 实例化对象,并在当前对象上新增一个scoll对象
    this.scroll = new BScroll(scrollWrapper, {
      scrollX: direction === 'horizontal', // horizontal水平
      scrollY: direction === 'vertical', // vertical垂直
      mouseWheel: isMouseWheel,
      // eventPassthrough: direction === DIRECTION_H?'vertical':'horizontal', // 忽略竖直方向的滚动
      stopPropagation: isStopPropagation,
      bounce: bounce,
      scrollbar: isScrollbar, // 是否显示滚动条
      dblclick: isDblclick, // 是否开启双击事件
      click: isClick,
      probeType: probeType,
      pullUpLoad: isPullUpLoadRefresh ? {
        'threshold': upLoadThreshold
      } : isPullUpLoadRefresh, // 上拉刷新
      pullDownRefresh: isPullDownRefresh
        ? {
          'threshold': downRefreshThreshold,
          'stop': downRefreshStop
        } : isPullDownRefresh, // 下拉刷新
      useTransition: isUseTransition
    });
    // 开始滚动前
    if (isListenBeforeScroll) {
      this.scroll.on("beforeScrollStart", () => {
        console.log('1')
        // this.$emit("beforeScrollStart");
      });
    }
    // 开始滚动
    if (isListenScrollStart) {
      this.scroll.on("scrollStart", () => {
        console.log('2')
        // this.$emit("scrollStart");
      });
    }
    // 滚动中-1表示从上往下滑,1表示从下往上滑,0表示没有滑动

    this.scroll.on("scroll", (pos: posProps) => {
      if (this.scroll.directionY) {
        pos.directionY = this.scroll.directionY;
      }
      this.setState({
        scrollY: pos.y
      })
      if (
        this.scroll.directionY <= 0 && pos.y >= downRefreshThreshold / 2
      ) {
        // this.pullingDownScrollHandle(pos: posProps);
      }
      if (this.scroll.directionY >= 0) {
        // this.$emit("scroll", pos);
      }
    });
    // 滚动结束
    if (isListenScrollEnd) {
      this.scroll.on("scrollEnd", pos => {

        // 滚动到底部
        if (pullUpLoadType === "end") {
          if (Math.abs(pos.y) > Math.abs(this.scroll.maxScrollY + 50)) {
            // this.$emit("scrollEnd", pos);
          }
        } else {
          // this.$emit("scrollEnd", pos);
        }
      });
    }
    // 调用事件
    if (isPullDownRefresh) this.pullingDownHanlde();
    if (isPullUpLoadRefresh) this.pullingUpHandle();
  }
  /**
   * [pullingDownScrollHandle 下拉滚动事件]
   * @param  {[type]} pos [description]
   * @return {[type]}     [description]
   */
  private pullingDownScrollHandle(pos: posProps): void {
    // 首先判断是否开启了下拉事件
    let {
      isPullDownRefresh,
      pullDownRefreshThreshold
    } = this.props;

    let {
      beforePullDown,
      pullDownInitTop,
      pullDownStyleHeight,
      pullDownStyle,
      isRebounding,
      upLoadThreshold,
      downRefreshThreshold,
      downRefreshStop
    } = this.state;

    if (!isPullDownRefresh) return;
    // 是否是处于下拉
    if (!beforePullDown) {
      if (pos.y < downRefreshStop / 2) return;
      // 这里可以写动画效果
      this.setState({
        pullDownStyleHeight: pos.y
      })
      if (pos.y >= 0) {
        // this.pullingDownStart && this.pullingDownStart(pos: posProps);
      }
      this.setState({
        pullDownStyle: `top:${Math.min(pos.y + pullDownInitTop, 0)}px;height: ${Math.max(pos.y, downRefreshStop)}px;`
      })
    } else {
      // 中间动画持续
      if (Math.min(pos.y + pullDownInitTop, 0) < 0) {
        // this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 0)}px`;
        this.setState({
          pullDownStyle: `top:${Math.min(pos.y + pullDownInitTop, 0)}px`
        });
      }
      this.setState({
        pullDownStyle: `${pullDownStyle};height:${Math.max(pos.y, Math.abs(pos.y + pullDownInitTop))}px;`
      })

      // pullingDownKeep && pullingDownKeep(pos, Math.min(pos.y + pullDownInitTop, 0));
    }
    // 完成后下拉动画进行收缩顶部隐藏
    // if (isRebounding) {
    //   if (Math.abs(pos.y) !== 0) {
    //     this.pullingDownEnd && this.pullingDownEnd(pos,
    //         -this.pullDownInitTopConfig -
    //           (this.downRefreshStop - pos.y)
    //       );
    //   }
    //   // 顶部动画收缩
    //   this.pullDownStyle = `top:${-this.pullDownInitTopConfig -
    //     (this.downRefreshStop - pos.y)}px;height:${Math.max(
    //     parseInt(pos.y),
    //     this.downRefreshStop
    //   )}px;`;
    // }
  }
  /**
   * [pullingDownHanlde 内部封装下拉事件,供外部使用]
   * @return {[type]} [description]
   */
  private pullingDownHanlde(): void {
    let { beforePullDown, isPullingDown } = this.state
    this.scroll.on("pullingDown", () => {
      // 清除绑定
      if (!isPullingDown) {
        this.setState({
          beforePullDown: false,
          isPullingDown: false
        })
        /* 这里替换为外部下拉函数 */
        // this.$emit("pullingDown", (state = false) => {
        //   this.forceUpdate(state)
        // });
      }
    });
  }
  /**
   * [pullingUpHandle 内部封装上拉事件,供外部使用]
   * @return {[type]} [description]
   */
  private pullingUpHandle() {
    let { isPullUpLoad } = this.state;
    this.scroll.on("pullingUp", (pos: posProps) => {
      if (!isPullUpLoad) {
        this.setState({
          'isPullUpLoad': true
        })
        // this.$emit("pullingUp", (state = false) => {
        //   this.forceUpdate(state)
        // });
      }
    });
    // 监听手指是否离开屏幕
    // this.scroll.on('touchEnd',(pos: posProps)=>{
    //   this.isTouchEnd = true;
    //   if (this.isPullUpLoad) {
    // this.$emit('pullingUp');
    //   }
    // });
  }
  /**
   * [forceUpdate 释放释放状态]
   * @param  {[type]} dirty [description]
   * @return {[type]}       [description]
   */
  public forceUpdate(dirty?: any): void {
    let { isPullDownRefresh, isPullUpLoadRefresh } = this.props;
    let { isPullUpLoad, isPullingDown } = this.state;
    if (isPullDownRefresh && isPullingDown) {
      this.setState({
        isPullingDown: false
      })
      this._reboundPullDown().then(() => {
        this._afterPullDown();
      });
    } else if (isPullUpLoadRefresh && isPullUpLoad) {
      this.setState({
        isPullUpLoad: false
      })
      this.scroll.finishPullUp();
      this.setState({
        pullUpDirty: dirty
      })
      this.refresh();
    } else {
      this.refresh();
    }
  }
  /**
   * [_reboundPullDown 下拉刷新弹性事件]
   * @return {[type]} [description]
   */
  private _reboundPullDown(): Promise<any> {
    let { pullDownRefreshStopTime } = this.props;
    // const { stopTime = 600 } = pullDownRefresh;
    return new Promise(resolve => {
      setTimeout(() => {
        this.setState({
          isRebounding: true
        })
        this.scroll.finishPullDown();
        resolve();
      }, pullDownRefreshStopTime);
    });
  }
  /**
   * [_afterPullDown 下拉刷新更改头部加载样子]
   * @return {[type]} [description]
   */
  private _afterPullDown(): void {
    setTimeout(() => {
      let { pullDownInitTop, downRefreshStop } = this.state;
      this.setState({
        pullDownStyle: `top:${pullDownInitTop}px;height:${
          downRefreshStop
          }px;`,
        beforePullDown: true,
        isRebounding: false
      });
      this.refresh();
    }, this.scroll.options.bounceTime);
  }
  /**
   * [finishPullUp 通知刷新完成]
   * @return {[type]} [description]
   */
  public finishPullUp(): void {
    if (
      this.scroll &&
      this.scroll.finishPullUp &&
      typeof this.scroll.finishPullUp === "function"
    )
      this.scroll.finishPullUp();
  }
  /**
   * [destroy 销毁scroll]
   * @return {[type]} [description]
   */
  public destroy(): void {
    if (
      this.scroll &&
      this.scroll.destroy &&
      typeof this.scroll.destroy === "function"
    )
      this.scroll.destroy();
  }
  /**
   * [disable 禁止滚动]
   * @return {[type]} [description]
   */
  public disable(): void {
    if (
      this.scroll &&
      this.scroll.disable &&
      typeof this.scroll.disable === "function"
    )
      this.scroll.disable();
  }
  /**
   * [enable 允许滚动]
   * @return {[type]} [description]
   */
  public enable(): void {
    if (
      this.scroll &&
      this.scroll.enable &&
      typeof this.scroll.enable === "function"
    )
      this.scroll.enable();
  }
  /**
   * [refresh 刷新dom节点]
   * @return {[type]} [description]
   */
  public refresh(): void {
    if (
      this.scroll &&
      this.scroll.refresh &&
      typeof this.scroll.refresh === "function"
    ) {
      this.scroll.refresh();
    }
  }
  /**
   * [scrollTo 滚动到指定位置]
   * @return {[type]} [description]
   */
  public scrollTo(): void {
    if (
      this.scroll &&
      this.scroll.scrollTo &&
      typeof this.scroll.scrollTo === "function"
    )
      this.scroll.scrollTo.apply(this.scroll, arguments);
  }
  /**
   * [scrollToElement 滚动到指定列表中的某一个对象]
   * @return {[type]} [description]
   */
  public scrollToElement(): void {
    if (
      this.scroll &&
      this.scroll.scrollToElement &&
      typeof this.scroll.scrollToElement === "function"
    ) {
      this.scroll.scrollToElement.apply(this.scroll, arguments);
    }
  }
  /**
   * [openPullUp 动态开启滚动]
   * @return {[type]} [description]
   */
  public openPullUp(): void {
    this.scroll.openPullUp();
  }
  /**
   * [closePullUp 动态关闭滚动]
   * @return {[type]} [description]
   */
  public closePullUp(): void {
    this.scroll.closePullUp();
  }


  // computed
  get getPullDownRefreshAnimationTop() {
    let { pullDownRefreshStop } = this.props
    let height = this.adapter(pullDownRefreshStop ? pullDownRefreshStop : (46 * 2));
    return `top:-${height}px;height:${height}px;`;
  }

  render() {
    let {
      children,
      inlineDescSlot,
      isPullUpLoadRefresh,
      isPullUpLoadRefreshSlot,
      beforeTriggerSlot,
      afterTriggerSlot
    } = this.props;
    let { isPullUpLoad } = this.state
    return (
      <div className="scroll-wrapper" ref="wrapper">
        <div className="scroll-content" ref="scroll-content">
          <div className="scroll-body" ref="scroll-body">
            {children}

            <div id="pullUp">
              {
                isPullUpLoadRefresh ? (
                  <React.Fragment>
                    {
                      !isPullUpLoadRefreshSlot ? (

                        <div className="blc-width blc-pd-b-16px before-trigger">
                          {
                            !inlineDescSlot ? (
                              <div>
                                {!isPullUpLoad ? (
                                  <div className="pull-message">
                                    {
                                      beforeTriggerSlot ? (
                                        <React.Fragment>{beforeTriggerSlot}</React.Fragment>
                                      ) : (
                                          <span>加载完成,没有更多数据</span>
                                        )
                                    }
                                  </div>
                                ) : (
                                    <div className="pull-message">
                                      {
                                        afterTriggerSlot ? (
                                          <React.Fragment>{afterTriggerSlot}</React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                              <span className="">加载中...</span>
                                            </React.Fragment>
                                          )
                                      }
                                    </div>
                                  )
                                }
                              </div>
                            ) : (
                                <React.Fragment>{inlineDescSlot}</React.Fragment>
                              )
                          }

                        </div>

                      ) : (
                          <React.Fragment>{isPullUpLoadRefreshSlot}</React.Fragment>
                        )
                    }
                  </React.Fragment>
                ) : (null)
              }
            </div>

          </div>
        </div>
      </div>
    );
  };
};

