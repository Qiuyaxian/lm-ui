/*
* Anima Scroller
* Based Zynga Scroller (http://github.com/zynga/scroller)
* Copyright 2011, Zynga Inc.
* Licensed under the MIT License.
* https://raw.github.com/zynga/scroller/master/MIT-LICENSE.txt
*/

declare var window: any

import AnimationFrameService from './requestAnimationFrame';
import { easeOutCubic, easeInOutCubic } from './tools';
import { querySelector, getStyle } from './dom';
import { passiveSupported } from './passive_supported';

export class Scroller extends AnimationFrameService {
  public value: any = null
  private __prevValue: any = null
  private __isSingleTouch: boolean = false
  private __isTracking: boolean = false
  private __didDecelerationComplete: boolean = false
  private __isGesturing: boolean = false
  private __isDragging: boolean = false
  private __isDecelerating: boolean = false
  private __isAnimating: boolean = false
  private __clientTop: number = 0
  private __clientHeight: number = 0
  private __contentHeight: number = 0
  private __itemHeight: number = 0
  private __scrollTop: number = 0
  private __minScrollTop: number = 0
  private __maxScrollTop: number = 0
  private __scheduledTop: number = 0
  private __lastTouchTop: any = null
  private __lastTouchMove: any = null
  private __positions: any = null
  private __minDecelerationScrollTop: any = null
  private __maxDecelerationScrollTop: any = null
  private __decelerationVelocityY: any = null
  private dpr: any
  private __callback: any
  private __lastScale: any
  private __enableScrollY: any
  private __initialTouchTop: any
  private __interruptedAnimation: any
  public options: any = {}
  private isDestroy: boolean = false;
  private __component: any
  private __content: any
  private __container: any
  // 初始化
  constructor () {
    super();
    // this.build(container, options);
  }
  private getDpr (): any {
    let dpr = 1;
    if (typeof window === 'object') {
      if ((window as any).LM_CONFIG && (window as any).LM_CONFIG.$picker && (window as any).LM_CONFIG.$picker.respectHtmlDataDpr) {
        dpr = Number(document.documentElement.getAttribute('data-dpr')) || 1
      }
    }
    return dpr
  }
  // 建立
  protected build(container, options): any {
    const self = this

    self.isDestroy = false

    self.dpr = this.getDpr()

    options = options || {}
    self.__container = querySelector(container)
    let component = self.__component = self.__container.querySelector('[data-role=component]')
    let content = self.__content = component.querySelector('[data-role=content]')
    let indicator = component.querySelector('[data-role=indicator]')
    
    self.options = {
      itemClass: 'scroller-item',
      onSelect () {},
      defaultValue: 0,
      data: []
    }

    for (var key in options) {
      if (options[key] !== undefined) {
        self.options[key] = options[key]
      }
    }
     
    let rect = component.getBoundingClientRect();
    
    // if (options && (options as any).data) {
    //   self.options.data = (options as any).data
    // }

    // if (options && (options as any).defaultValue) {
    //   self.options.defaultValue = (options as any).defaultValue
    // }
    
    self.__itemHeight = parseFloat(getStyle(indicator, 'height'))

    self.__callback = (options && (options as any).callback) || function (top) {
      const distance = -top * self.dpr
      content.style.webkitTransform = 'translate3d(0, ' + distance + 'px, 0)'
      content.style.transform = 'translate3d(0, ' + distance + 'px, 0)'
    }

    self.__clientTop = (rect.top + component.clientTop) || 0

    self.__setDimensions(component.clientHeight, content.offsetHeight)

    if (component.clientHeight === 0) {
      self.__setDimensions(parseFloat(getStyle(component, 'height')), 204)
    }
    
    self.select(self.options.defaultValue, false, true)
  }
  /**
   * [touchStartHandler 鼠标按下]
   * @param {any} e [description]
   */
  protected touchStartHandler(e: any): void {
    if (e.target.tagName.match(/input|textarea|select/i)) {
      return
    }
    e.preventDefault()
    this.__doTouchStart(e, e.timeStamp)
  }
  /**
   * [touchMoveHandler 鼠标移动]
   * @param {[type]} e [description]
   */
  protected touchMoveHandler(e): void {
    this.__doTouchMove(e, e.timeStamp)
  }
  /**
   * [touchEndHandler 鼠标放开]
   * @param {[type]} e [description]
   */
  protected touchEndHandler(e): void {
    this.__doTouchEnd(e.timeStamp)
  }
  /**
   * [__setDimensions 设定滚动区域宽高]
   * @param {any} clientHeight  [description]
   * @param {any} contentHeight [description]
   */
  protected __setDimensions (
    clientHeight?: any, 
    contentHeight?: any): void {
    let self = this;
    self.__clientHeight = clientHeight
    self.__contentHeight = contentHeight

    let totalItemCount = self.options.data.length
    let clientItemCount = Math.round(self.__clientHeight / self.__itemHeight)

    self.__minScrollTop = -self.__itemHeight * (clientItemCount / 2)
    self.__maxScrollTop = self.__minScrollTop + totalItemCount * self.__itemHeight - 0.1
  }
  /**
   * [selectByIndex 通过索引值进行选定]
   * @param {[type]} index   [description]
   * @param {[type]} animate [description]
   */
  protected selectByIndex (index, animate?: any, init?: any): void {
    
    let self = this;
    if (index < 0 || index > self.__content.childElementCount - 1) {
      return
    }
    self.__scrollTop = self.__minScrollTop + index * self.__itemHeight
    // self.__scheduledTop = self.__scrollTop = top
    // Push values out    
    self.scrollTo(self.__scrollTop, animate, init)
 
    self.__selectItem(self.__content.children[index])
  }
  /**
   * [select 操作选中项目]
   * @param  {[type]} value   [description]
   * @param  {[type]} animate [description]
   * @return {any}            [description]
   */
  protected select (value, animate, init?: any): any {
    let self = this;
    let children = self.__content.children;
    for (var i = 0, len = children.length; i < len; i++) {
      if (decodeURI(JSON.parse(children[i].dataset.value).value) === value) {
        self.selectByIndex(i, animate, init)
        return
      }
    }
    self.selectByIndex(0, animate, init)
  }
  /**
   * [getValue 返回当前值]
   * @return {any} [description]
   */
  protected getValue (): any {
    return this.value
  }
  /**
   * [scrollTo 滚动到指定位置]
   * @param {[type]} top     [description]
   * @param {[type]} animate [description]
   */
  protected scrollTo (top, animate?: any, init?: any): void {
    let self = this
    animate = (animate === undefined) ? true : animate
    if (self.__isDecelerating) {
      this.stop(self.__isDecelerating)
      self.__isDecelerating = false
    }
    top = Math.round(Number((top / self.__itemHeight).toFixed(5))) * self.__itemHeight
    top = Math.max(Math.min(self.__maxScrollTop, top), self.__minScrollTop)
    if (top === self.__scrollTop || !animate) {
      self.__publish(top)
      // 多次触发
      // self.__scrollingComplete()
      return
    }
    // self.__publish(top, 250)
    self.__publish(top, typeof init === 'undefined' ? 250 : 0)
  }
  /**
   * [destroy 销毁]
   */
  protected destroy (): void {
    this.isDestroy = true
    this.__component.parentNode && this.__component.parentNode.removeChild(this.__component)
  }
  /**
   * [__selectItem 选中子项]
   * @param {[type]} selectedItem [description]
   */
  private __selectItem (selectedItem): void {
    let self = this
    let selectedItemClass = self.options.itemClass + '-selected'
    let lastSelectedElem = self.__content.querySelector('.' + selectedItemClass)
    if (lastSelectedElem) {
      lastSelectedElem.classList.remove(selectedItemClass)
    }
    selectedItem.classList.add(selectedItemClass)

    if (self.value !== null) {
      self.__prevValue = self.value
    }
    self.value = decodeURI(JSON.parse(selectedItem.dataset.value).value)
  }
  /**
   * [__scrollingComplete 滚动完成]
   */
  private __scrollingComplete (): void {
    var self = this

    var index = Math.round((self.__scrollTop - self.__minScrollTop - self.__itemHeight / 2) / self.__itemHeight)

    self.__selectItem(self.__content.children[index])
    if (self.__prevValue !== null && self.__prevValue !== self.value && !self.isDestroy) {
      self.options.onSelect(self.value, index)
    }
  }

  /**
   * [__doTouchStart 手指触摸开始]
   * @param {Event}  event     [description]
   * @param {number} timeStamp [description]
   */
  private __doTouchStart (event: Event, timeStamp: number): void {
    let ev = (event as any);
    const touches = ev.touches;
    const self = this;
    const target = ev.touches ? ev.touches[0] : ev;
    const isMobile = !!ev.touches;

    if (ev.touches && touches.length == null) {
      throw new Error('Invalid touch list: ' + touches)
    }
    if ((timeStamp as any) instanceof Date) {
      timeStamp = timeStamp.valueOf()
    }
    if (typeof timeStamp !== 'number') {
      throw new Error('Invalid timestamp value: ' + timeStamp)
    }

    self.__interruptedAnimation = true

    if (self.__isDecelerating) {
      this.stop(self.__isDecelerating)
      self.__isDecelerating = false
      self.__interruptedAnimation = true
    }

    if (self.__isAnimating) {
      this.stop(self.__isAnimating)
      self.__isAnimating = false
      self.__interruptedAnimation = true
    }
    // Use center point when dealing with two fingers
    let currentTouchTop
    let isSingleTouch = (isMobile && touches.length === 1) || !isMobile
    if (isSingleTouch) {
      currentTouchTop = target.pageY
    } else {
      currentTouchTop = Math.abs(target.pageY + touches[1].pageY) / 2
    }

    self.__initialTouchTop = currentTouchTop
    self.__lastTouchTop = currentTouchTop
    self.__lastTouchMove = timeStamp
    self.__lastScale = 1
    self.__enableScrollY = !isSingleTouch
    self.__isTracking = true
    self.__didDecelerationComplete = false
    self.__isDragging = !isSingleTouch
    self.__isSingleTouch = isSingleTouch
    self.__positions = []
  }
  /**
   * [__doTouchMove 手指触摸移动]
   * @param  {any}    ev        [description]
   * @param  {number} timeStamp [description]
   * @param  {number} scale     [description]
   * @return {any}              [description]
   */
  private __doTouchMove (ev: any, timeStamp: number, scale?: number): any {
    const self = this
    const touches = ev.touches
    const target = ev.touches ? ev.touches[0] : ev
    const isMobile = !!ev.touches

    if (touches && touches.length == null) {
      throw new Error('Invalid touch list: ' + touches)
    }
    if ((timeStamp as any) instanceof Date) {
      timeStamp = timeStamp.valueOf()
    }
    if (typeof timeStamp !== 'number') {
      throw new Error('Invalid timestamp value: ' + timeStamp)
    }

    // Ignore event when tracking is not enabled (event might be outside of element)
    if (!self.__isTracking) {
      return
    }

    var currentTouchTop
    // Compute move based around of center of fingers
    if (isMobile && touches.length === 2) {
      currentTouchTop = Math.abs(target.pageY + touches[1].pageY) / 2
    } else {
      currentTouchTop = target.pageY
    }

    var positions = self.__positions

    // Are we already is dragging mode?
    if (self.__isDragging) {
      var moveY = currentTouchTop - self.__lastTouchTop
      var scrollTop = self.__scrollTop

      if (self.__enableScrollY) {
        scrollTop -= moveY

        var minScrollTop = self.__minScrollTop
        var maxScrollTop = self.__maxScrollTop

        if (scrollTop > maxScrollTop || scrollTop < minScrollTop) {
          // Slow down on the edges
          if (scrollTop > maxScrollTop) {
            scrollTop = maxScrollTop
          } else {
            scrollTop = minScrollTop
          }
        }
      }

      // Keep list from growing infinitely (holding min 10, max 20 measure points)
      if (positions.length > 40) {
        positions.splice(0, 20)
      }

      // Track scroll movement for decleration
      positions.push(scrollTop, timeStamp)

      // Sync scroll position
      self.__publish(scrollTop)

      // Otherwise figure out whether we are switching into dragging mode now.
    } else {
      var minimumTrackingForScroll = 0
      var minimumTrackingForDrag = 5

      var distanceY = Math.abs(currentTouchTop - self.__initialTouchTop)

      self.__enableScrollY = distanceY >= minimumTrackingForScroll

      positions.push(self.__scrollTop, timeStamp)

      self.__isDragging = self.__enableScrollY && (distanceY >= minimumTrackingForDrag)

      if (self.__isDragging) {
        self.__interruptedAnimation = false
      }
    }

    // Update last touch positions and time stamp for next event
    self.__lastTouchTop = currentTouchTop
    self.__lastTouchMove = timeStamp
    self.__lastScale = scale
  }
  /**
   * [__doTouchEnd 手指触摸结束]
   * @param  {number} timeStamp [description]
   * @return {any}              [description]
   */
  private __doTouchEnd (timeStamp: number): any {
    let self = this

    if ((timeStamp as any) instanceof Date) {
      timeStamp = timeStamp.valueOf()
    }
    if (typeof timeStamp !== 'number') {
      throw new Error('Invalid timestamp value: ' + timeStamp)
    }

    // Ignore event when tracking is not enabled (no touchstart event on element)
    // This is required as this listener ('touchmove') sits on the document and not on the element itself.
    if (!self.__isTracking) {
      return
    }

    // Not touching anymore (when two finger hit the screen there are two touch end events)
    self.__isTracking = false

    // Be sure to reset the dragging flag now. Here we also detect whether
    // the finger has moved fast enough to switch into a deceleration animation.
    if (self.__isDragging) {
      // Reset dragging flag
      self.__isDragging = false

      // Start deceleration
      // Verify that the last move detected was in some relevant time frame
      if (self.__isSingleTouch && (timeStamp - self.__lastTouchMove) <= 100) {
        // Then figure out what the scroll position was about 100ms ago
        var positions = self.__positions
        var endPos = positions.length - 1
        var startPos = endPos

        // Move pointer to position measured 100ms ago
        for (var i = endPos; i > 0 && positions[i] > (self.__lastTouchMove - 100); i -= 2) {
          startPos = i
        }

        // If start and stop position is identical in a 100ms timeframe,
        // we cannot compute any useful deceleration.
        if (startPos !== endPos) {
          // Compute relative movement between these two points
          var timeOffset = positions[endPos] - positions[startPos]
          var movedTop = self.__scrollTop - positions[startPos - 1]

          // Based on 50ms compute the movement to apply for each render step
          self.__decelerationVelocityY = movedTop / timeOffset * (1000 / 60)

          // How much velocity is required to start the deceleration
          var minVelocityToStartDeceleration = 4

          // Verify that we have enough velocity to start deceleration
          if (Math.abs(self.__decelerationVelocityY) > minVelocityToStartDeceleration) {
            self.__startDeceleration(timeStamp)
          }
        }
      }
    }

    if (!self.__isDecelerating) {
      self.scrollTo(self.__scrollTop)
    }

    // Fully cleanup list
    self.__positions.length = 0
  }
  
  // Applies the scroll position to the content element
  /**
   * [__publish 开始调用animation运动]
   * @param  {[type]} top               [description]
   * @param  {any}    animationDuration [description]
   * @return {any}                      [description]
   */
  private __publish (top, animationDuration?: any, type?: any): any {
    let self = this

    // Remember whether we had an animation, then we try to continue based on the current "drive" of the animation
    let wasAnimating = self.__isAnimating
    if (wasAnimating) {
      this.stop(wasAnimating)
      self.__isAnimating = false
    }
    
    if (animationDuration) {
      // Keep scheduled positions for scrollBy functionality
      self.__scheduledTop = top

      let oldTop: number = self.__scrollTop
      let diffTop = top - oldTop

      let step = function (percent, now, render) {
        self.__scrollTop = oldTop + (diffTop * percent)
        // Push values out
        if (self.__callback) {
          self.__callback(self.__scrollTop)
        }
      }

      let verify = function (id) {
        return self.__isAnimating === id
      }

      let completed = function (renderedFramesPerSecond, animationId, wasFinished) {
        if (animationId === self.__isAnimating) {
          self.__isAnimating = false
        }
        if (self.__didDecelerationComplete || wasFinished) {
          self.__scrollingComplete()
        }
      }

      // When continuing based on previous animation we choose an ease-out animation instead of ease-in-out
      self.__isAnimating = this.start(step, verify, completed, animationDuration, wasAnimating ? easeOutCubic : easeInOutCubic)
    } else {
      
      self.__scheduledTop = self.__scrollTop = top
      // Push values out
      if (self.__callback) {
        self.__callback(top)
      }
    }
  }

  // Called when a touch sequence end and the speed of the finger was high enough to switch into deceleration mode.
  private __startDeceleration (timeStamp: number): any {
    var self = this

    self.__minDecelerationScrollTop = self.__minScrollTop
    self.__maxDecelerationScrollTop = self.__maxScrollTop

    // Wrap class method
    var step = function (percent, now, render) {
      self.__stepThroughDeceleration(render)
    }

    // How much velocity is required to keep the deceleration running
    var minVelocityToKeepDecelerating = 0.5

    // Detect whether it's still worth to continue animating steps
    // If we are already slow enough to not being user perceivable anymore, we stop the whole process here.
    var verify = function () {
      var shouldContinue = Math.abs(self.__decelerationVelocityY) >= minVelocityToKeepDecelerating
      if (!shouldContinue) {
        self.__didDecelerationComplete = true
      }
      return shouldContinue
    }

    var completed = function (renderedFramesPerSecond, animationId, wasFinished) {
      self.__isDecelerating = false
      if (self.__scrollTop <= self.__minScrollTop || self.__scrollTop >= self.__maxScrollTop) {
        self.scrollTo(self.__scrollTop)
        return
      }
      if (self.__didDecelerationComplete) {
        self.__scrollingComplete()
      }
    }

    // Start animation and switch on flag
    self.__isDecelerating = this.start(step, verify, completed)
  }

  // Called on every step of the animation
  private __stepThroughDeceleration (render) {
    let self = this

    let scrollTop = self.__scrollTop + self.__decelerationVelocityY

    let scrollTopFixed = Math.max(Math.min(self.__maxDecelerationScrollTop, scrollTop), self.__minDecelerationScrollTop)
    if (scrollTopFixed !== scrollTop) {
      scrollTop = scrollTopFixed
      self.__decelerationVelocityY = 0
    }

    if (Math.abs(self.__decelerationVelocityY) <= 1) {
      if (Math.abs(scrollTop % (self.__itemHeight as number)) < 1) {
        self.__decelerationVelocityY = 0
      }
    } else {
      self.__decelerationVelocityY *= 0.95
    }

    self.__publish(scrollTop)
  }
}