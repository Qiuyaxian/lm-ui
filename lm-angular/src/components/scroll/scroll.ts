import {
  ElementRef,
  Renderer2,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  OnInit,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  DoCheck,
  OnDestroy
} from '@angular/core';
import * as _better_scroll from "better-scroll";
let BScroll = (_better_scroll as any).default || _better_scroll;
function noop() {}
import { 
  extend,
  querySelector,
  getStyle,
  getRect,
  isEqual
} from '../../core'

export interface pullDownRefreshConfigProps {
  threshold: number, // 下拉距离到50px触发刷新函数,同时必须搭配bounce中的top值为真，开启弹性才可以触发
  stop: number // 下拉停止位置
};


export interface pullUpLoadConfigProps {
  threshold: 40
}; 

export interface bounceProps {
  top: boolean,
  bottom: boolean,
  left: boolean,
  right: boolean
}

interface posProps {
  y: number
  x: number
  directionY: number
}

@Component({
  selector: 'lm-scroll',
  templateUrl: './scroll.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LmScroll implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  
  // slot 
  @ContentChild('pullUpWrapper') pullUpWrapper: TemplateRef<any>;
  
  // props 传递参数
  /**
   * [data 用于内部监听数据变化，通知状态更改，刷新dom]
   * @type {Object}
   */
  @Input('data') set data(value: any) {
    let old = this._data;
    if(!isEqual(value, old)) {
      let timer = setTimeout(() => {
        this.isTouchEnd = false;
        if (!this.isPullUpLoad) {
          this.scroll && this.scroll.forceUpdate && this.scroll.forceUpdate(true);
        }
        clearTimeout(timer);
      });
    }
  }
  /**
   * [probeType description]
   * @type {Object}
   */
  @Input('probeType') probeType: number
  /**
   * [isClick 是否开启点击事件]
   * @type {Object}
   */
  @Input('isClick') isClick: boolean = true
  /**
   * [isDblclick 是否开启双击击事件]
   * @type {Object}
   */
  @Input('isDblclick') isDblclick: boolean = true
  /**
   * [isListenScrollStart 是否开启滚动前监听]
   * @type {Object}
   */
  @Input('isListenScrollStart') isListenScrollStart: boolean = false
  /**
   * [listenScroll 是否开启监听]
   * @type {Object}
   */
  @Input('isListenScroll') isListenScroll: boolean = false
  /**
   * [isListenBeforeScroll 是否开启滚动前监听]
   * @type {Object}
   */
  @Input('isListenBeforeScroll') isListenBeforeScroll: boolean = false
  /**
   * [isListenScrollEnd 是否开启滚动结束监听]
   * @type {Object}
   */
  @Input('isListenScrollEnd') isListenScrollEnd: boolean = false
  /**
   * [direction 开启滚动方向]
   * @type {Object}
   */
  @Input('direction') direction: string
  /**
   * [isScrollbar 是否开启滚动条]
   * @type {Object}
   */
  @Input('isScrollbar') isScrollbar: boolean = false
  /**
   * [pullDownRefresh 是否开启下拉加载]
   * @type {Object}
   */
  @Input('isPullDownRefresh') isPullDownRefresh: boolean = false
  /**
   * [pullDownRefreshAnimation 配置下拉动画位置 两种1.固定顶部top，一种是跟随下拉位置]
   * @type {Object}
   */
  @Input('pullDownRefreshAnimation') pullDownRefreshAnimation: string
  /**
   * [pullDownRefreshScroll 是否开启下拉滚动监听]
   * @type {Object}
   */
  @Input('pullDownRefreshScroll') pullDownRefreshScroll: {
    type: boolean,
    default: false
  }
  /**
   * [pullDownRefreshConfig 下拉滚动监听配置]
   * @type {Object}
   */
  @Input('pullDownRefreshThreshold') pullDownRefreshThreshold: number = 92
  @Input('pullDownRefreshStop') pullDownRefreshStop: number = 92
  
  /**
   * [pullUpLoad 是否开启上拉加载]
   * @type {Object}
   */
  @Input('isPullUpLoadRefresh') isPullUpLoadRefresh: boolean = false
  @Input('pullUpLoadType') pullUpLoadType: string = ''
  /**
   * [isPullUpLoadScroll 是否开启上拉加载滚动监听]
   * @type {Object}
   */
  @Input('isPullUpLoadScroll') isPullUpLoadScroll: boolean = false
  /**
   * [pullUpLoadConfig 配置上拉距离]
   * @type {Object}
   */
  @Input('pullUpLoadThreshold') pullUpLoadThreshold: number = 92
  // private _pullUpLoadConfig: pullUpLoadConfigProps = {
  //   threshold: 40
  // }
  /**
   * [startY 开始位置]
   * @type {Object}
   */
  @Input('startY') startY: number = 0
  /**
   * [refreshDelay 延迟刷新时间]
   * @type {Object}
   */
  @Input('refreshDelay') refreshDelay: number = 10
  /**
   * [isFreeScroll 是否开启自由滚动]
   * @type {Object}
   */
  @Input('isFreeScroll') isFreeScroll: boolean = false
  /**
   * [isMouseWheel 是否开启鼠标滚动]
   * @type {Object}
   */
  @Input('isMouseWheel') isMouseWheel: boolean = false
  /**
   * [bounce 是否开启弹性]
   * @type {Object}
   */
  @Input('bounce') set bounce(option: bounceProps) {
    this._bounce = extend(this._bounce, option);
  }
  private _bounce: bounceProps = {
    top: true,
    bottom: true,
    left: false,
    right: false
  }
  
  /**
   * [isStopPropagation 是否阻止事件冒泡。多用在嵌套 scroll 的场景。]
   * @type {Object}
   */
  @Input('isStopPropagation') isStopPropagation: boolean = false
  /**
   * [isZoom 是否开启缩放]
   * @type {Object}
   */
  @Input('isZoom') isZoom: boolean = false
  /**
   * [isUseTransition 是否开启css3动画  设置false 防止iphone微信滑动卡顿]
   * @type {Object}
   */
  @Input('isUseTransition') isUseTransition: boolean = false
  /**
   * [pullUpLoadShow 是否显示加载文字]
   * @type {Object}
   */
  @Input('pullUpLoadShow') pullUpLoadShow: boolean = false
  /**
   * [pullingDownStart 下拉滚动前执行]
   * @type {Object}
   */
  @Input('pullingDownStart') pullingDownStart: Function
  /**
   * [pullingDownEnd 下拉结束执行函数]
   * @type {Object}
   */
  @Input('pullingDownEnd') pullingDownEnd: Function
  /**
   * [pullingDownKeep 下拉正在执行函数]
   * @type {Object}
   */
  @Input('pullingDownKeep') pullingDownKeep: Function
  /**
   * [pullDownInitTopConfig 初始化头部位置]
   * @type {Object}
   */
  @Input('pullDownInitTopConfig') pullDownInitTopConfig: number = 92;
  /**
   * [Input 页码总数]
   * @param {[type]} 'total' [description]
   */
  @Input('total') total: number = 1;
  /**
   * [Input 当前页面数]
   * @param {[type]} 'page' [description]
   */
  @Input('page') page: number = 1;
  /**
   * [Input 是否显示初次加载]
   * @param {[type]} 'isShowLoading' [description]
   */
  @Input('isShowLoading') isShowLoading: boolean = true; 
  
  // 内部数据
  private _data: any;
  private pullDownStyle: string = "" // 下拉样式设置
  private beforePullDown: boolean = true // 记录是否已经触发下拉
  private isPullingDown: boolean = false // 是否已经下拉
  private pullUpDirty: boolean = true
  private isPullUpLoad: boolean = false
  private isTouchEnd: boolean = false
  private scrollY: number = 0
  private scrollWrapperHeight: number = 0
  private pullDownStyleHeight: number = 0
  private pullDownInitTop: number = 0
  private isRebounding: boolean = false
  private upLoadThreshold: number = 0
  private downRefreshThreshold: number = 0
  private downRefreshStop: number = 0
  private downInitTopConfig: number = 0

  // 提供外部操作事件
  // 开始滚动前
  @Output() readonly beforeScrollStart: EventEmitter<any> = new EventEmitter<any>()
  // 开始滚动
  @Output() readonly scrollStart: EventEmitter<any> = new EventEmitter<any>()
  // 滚动中
  @Output() readonly scrolling: EventEmitter<any> = new EventEmitter<any>()
  // 滚动结束
  @Output() readonly scrollEnd: EventEmitter<any> = new EventEmitter<any>()
  // 这里替换为外部下拉函数
  @Output() readonly pullingDown: EventEmitter<any> = new EventEmitter<any>()
  // 内部封装上拉事件
  @Output() readonly pullingUp: EventEmitter<any> = new EventEmitter<any>()
  
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef) {
  }

  public scroll: any

  private initScroll (): void {
    let elem = this.el.nativeElement;
    let scrollWrapper = querySelector('.scroll-wrapper', elem)
    let scrollContent = querySelector('.scroll-content', elem)
    let scrollBody = querySelector('.scroll-body', elem)
   
    if (!scrollWrapper) return;
    if (scrollBody) {
      // 设置高度
      let height: number = getRect(scrollWrapper).height;
      let width: number = getRect(scrollWrapper).width;
      if (this.direction === 'horizontal') {
        // 计算水平滚动的宽度
        let childrens = scrollBody.children && scrollBody.children.length >= 2
              ? scrollBody.children
              : scrollBody.children[0].children;
        let slideWidth: number = 0;
        if (childrens && childrens.length !== 0) {
          for (let i = 0; i < childrens.length; i++) {
            let child= childrens[i];
            let childWidth: number = getRect(child).width;
            slideWidth += childWidth;
            if (getStyle(child, "margin-left")) {
              slideWidth += Number(getStyle(child, "margin-left").replace(/px/gi, ""));
            }
            if (getStyle(child, "margin-right")) {
              slideWidth += Number(getStyle(child, "margin-right").replace(/px/gi, ""));
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
    
    this.scroll = new BScroll(scrollWrapper, {
      scrollX: false, // horizontal水平
      scrollY: true, // vertical垂直
      mouseWheel: this.isMouseWheel,
      // eventPassthrough: this.direction === DIRECTION_H?'vertical':'horizontal', // 忽略竖直方向的滚动
      stopPropagation: this.isStopPropagation,
      bounce: this._bounce,
      scrollbar: this.isScrollbar, // 是否显示滚动条
      dblclick: this.isDblclick, // 是否开启双击事件
      click: this.isClick,
      probeType: this.probeType,
      pullUpLoad: this.isPullUpLoadRefresh ? {
        'threshold': this.pullUpLoadThreshold
      } : this.isPullUpLoadRefresh, // 上拉刷新
      pullDownRefresh: this.isPullDownRefresh
        ? {
          'threshold': this.pullDownRefreshThreshold,
          'stop': this.downRefreshStop
        }
        : this.isPullDownRefresh, // 下拉刷新
      useTransition: this.isUseTransition
    });
    // 开始滚动前
    if (this.isListenBeforeScroll) {
      this.scroll.on("beforeScrollStart", () => {
        this.beforeScrollStart.emit();
      });
    }
    // 开始滚动
    if (this.isListenScrollStart) {
      this.scroll.on("scrollStart", () => {
        this.scrollStart.emit();
      });
    }
    // 滚动中-1表示从上往下滑,1表示从下往上滑,0表示没有滑动
    this.scroll.on("scroll", (pos: posProps) => {
      if (this.scroll.directionY) pos.directionY = this.scroll.directionY;
      this.scrollY = pos.y;
      if (
        this.scroll.directionY <= 0 &&
        pos.y >= this.downRefreshStop / 2
      ) {
        this.pullingDownScrollHandle(pos);
      }
      if (this.scroll.directionY >= 0) {
        this.scrolling.emit(pos);
      }
    });
    // 滚动结束
    if (this.isListenScrollEnd) {
      this.scroll.on("scrollEnd", (pos: posProps) => {
        this.scrollEnd.emit(pos);
      });
    }
    // 调用事件
    if (this.isPullDownRefresh) this.pullingDownHanlde();
    if (this.isPullUpLoadRefresh) this.pullingUpHandle();
  }

  /**
   * [pullingDownScrollHandle 下拉滚动事件]
   * @param  {[type]} pos [description]
   * @return {[type]}     [description]
   */
  private pullingDownScrollHandle(pos: posProps): void {
    // 首先判断是否开启了下拉事件
    if (!this.isPullDownRefresh) return;
    // 是否是处于下拉
    if (!this.beforePullDown) {
      if (pos.y < this.downRefreshStop / 2) return;
      // 这里可以写动画效果
      this.pullDownStyleHeight = pos.y;
      if (pos.y >= 0) {
        this.pullingDownStart && this.pullingDownStart(pos);
      }
      this.pullDownStyle = `top:${Math.min(
        pos.y + this.pullDownInitTop,
        0
      )}px;height: ${Math.max(pos.y,this.downRefreshStop)}px;`;
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
      this.pullingDownKeep && this.pullingDownKeep(pos, Math.min(pos.y + this.pullDownInitTop, 0));
    }
    // 完成后下拉动画进行收缩顶部隐藏
    if (this.isRebounding) {
      if (Math.abs(pos.y) !== 0) {
        this.pullingDownEnd &&
          this.pullingDownEnd(
            pos,
            -Number(this.pullDownInitTopConfig) -
              (this.downRefreshStop - pos.y)
          );
      }
      // 顶部动画收缩
      this.pullDownStyle = `top:${-Number(this.pullDownInitTopConfig) -
        (this.downRefreshStop - pos.y)}px;height:${Math.max(pos.y, this.downRefreshStop
      )}px;`;
    }
  }
  /**
   * [pullingDownHanlde 内部封装下拉事件,供外部使用]
   * @return {[type]} [description]
   */
  private pullingDownHanlde(): void {
    this.scroll.on("pullingDown", () => {
      // 清除绑定
      this.beforePullDown = false;
      this.isPullingDown = true;
      this.refreshView();
      /* 这里替换为外部下拉函数 */
      this.pullingDown.emit();
    });
  }
  /**
   * [pullingUpHandle 内部封装上拉事件,供外部使用]
   * @return {[type]} [description]
   */
  private pullingUpHandle(): void { 
    this.scroll.on("pullingUp", () => {
      if (!this.isPullUpLoad) {
        this.isPullUpLoad = true;
        this.refreshView();
        let finish = (state: boolean = false) => {
          this.forceUpdate(state)
        }
        this.pullingUp.emit(finish); 
      }
    });

    // 是否是手指离开屏幕后加载 => 后续扩展
    // if (this.pullUpLoadType !== "end") {
    //   // 监听手指是否离开屏幕
    //   this.scroll.on('touchEnd',(pos)=>{
    //     this.isTouchEnd = true;
    //     if (this.isPullUpLoad) {
    //       this.pullingUp.emit(); 
    //     }
    //   });
    // }
  }
  /**
   * [forceUpdate 释放释放状态]
   * @param  {[type]} dirty [description]
   * @return {[type]}       [description]
   */
  protected forceUpdate(dirty): void {
    if (this.isPullDownRefresh && this.isPullingDown) {
      this.isPullingDown = false;
      this._reboundPullDown().then(() => {
        this._afterPullDown();
        this.refreshView();
      });
    } else if (this.isPullUpLoadRefresh && this.isPullUpLoad) {
      this.isPullUpLoad = false;
      this.scroll.finishPullUp();
      this.pullUpDirty = dirty;
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
    const stopTime: number = 600;
    return new Promise(resolve => {
      setTimeout(() => {
        this.isRebounding = true;
        this.scroll.finishPullDown();
        this.refreshView();
        resolve();
      }, stopTime);
    });
  }
  /**
   * [_afterPullDown 下拉刷新更改头部加载样子]
   * @return {[type]} [description]
   */
  private _afterPullDown(): void {
    setTimeout(() => {
      this.pullDownStyle = `top:${this.pullDownInitTop}px;height:${
        this.downRefreshStop
      }px;`;
      this.beforePullDown = true;
      this.isRebounding = false;
      this.refreshView();
    }, this.scroll.options.bounceTime);
  }
  /**
   * [finishPullUp 通知刷新完成]
   * @return {[type]} [description]
   */
  protected finishPullUp(): void {
    if (
      this.scroll &&
      this.scroll.finishPullUp &&
      typeof this.scroll.finishPullUp === "function"
    ){
      this.scroll.finishPullUp();
      this.isTouchEnd = false;
    }
  }
  /**
   * [destroy 销毁scroll]
   * @return {[type]} [description]
   */
  protected destroy() {
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
  protected disable() {
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
  protected enable() {
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
  protected refresh() {
    if (
      this.scroll &&
      this.scroll.refresh &&
      typeof this.scroll.refresh === "function"
    ) {
      this.scroll.refresh();
      this.refreshView();
    }
  }
  private refreshView() {
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }
  
  /**
   * [scrollTo 滚动到指定位置]
   * @return {[type]} [description]
   */
  protected scrollTo() {
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
  protected scrollToElement() {
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
  protected openPullUp() {
    this.scroll.openPullUp();
  }
  /**
   * [closePullUp 动态关闭滚动]
   * @return {[type]} [description]
   */
  protected closePullUp() {
    this.scroll.closePullUp();
  }
  /**
   * [clickHandle 点击事件模板]
   * @param  {[type]} event [description]
   * @param  {[type]} item  [description]
   * @return {[type]}       [description]
   */
  private clickHandle(event, item) {
    // if (!event._constructed) return;
    // this.click$emit("", item);
  }

  private adapter (value: number): number {
    let fontSize = (getStyle(document.documentElement, 'font-size').replace(/px/i, '') || 75);
    return value ? value * (fontSize / 75) : 0;
  }

  ngOnInit () {
    
    this.pullDownInitTop = -this.adapter(this.pullDownInitTopConfig || this.pullDownRefreshThreshold);
    this.upLoadThreshold = this.adapter(this.pullUpLoadThreshold);
    this.downRefreshThreshold = this.adapter(this.pullDownRefreshThreshold)
    this.downRefreshStop = this.adapter(this.pullDownRefreshStop)
    this.downInitTopConfig = this.adapter(this.pullDownInitTopConfig)
    
    // //初始化
    setTimeout(() => {
      this.initScroll();
    }, 30)
  }
  ngAfterViewInit () {
    
  }
  // 数据监听 => 触发变更检测机制就是调用DoCheck
  
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  ngOnDestroy(): void {
    this.scroll && this.scroll.destroy();
    this.scroll = null;
  }
}