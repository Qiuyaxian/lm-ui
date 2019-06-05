declare var window: any

import {
  Injectable,
  ComponentRef,
  ComponentFactoryResolver,
  Injector,
  ApplicationRef
} from '@angular/core'

export default abstract class AnimationFrameService {
  private running: any = {};
  private counter: any = 1;
  private desiredFrames: number = 60;
  private millisecondsPerSecond: number = 1000;
  
  // 检查浏览情况
  public requestAnimationCheck(): any {
    if (typeof window !== 'undefined') {
      let lastTime: Number = 0
      let vendors: String[] = ['ms', 'moz', 'webkit', 'o']
      for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame']
      }

      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
          let currTime: Number = new Date().getTime()
          let timeToCall: Number = Math.max(0, 16 - (Number(currTime) - Number(lastTime)))
          let id = window.setTimeout(function () {
            callback(Number(currTime) + Number(timeToCall))
          }, timeToCall)
          lastTime = Number(currTime) + Number(timeToCall)
          return id
        }

      }

      if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
          clearTimeout(id)
        }
      }
      return window;
    }
    return false;
  }

  public createTime(): Number {
    if (Date.now) return Date.now();
    else +new Date();
  }

  public requestAnimationFrame(callback: Function, root): void {
    // 但处理放回结果
    let win = this.requestAnimationCheck();
    if (win.requestAnimationFrame) {
      win.requestAnimationFrame(callback, root)
    } else {

    }
  }

  // Stops the given animation.
  public stop (id: any): boolean {
    let cleared: boolean = this.running[id] != null;
    if (cleared) {
      this.running[id] = null
    }
    return cleared;
  }

  // Whether the given animation is still running.
  public isRunning (id: any): boolean {
    return this.running[id] != null
  }

  // Start the animation.
  public start (stepCallback?: Function, verifyCallback?: Function, completedCallback?: Function, duration?: Number, easingMethod?: Function, root?: any): any {
    let _this = this;
    let start = this.createTime();
    let lastFrame = start;
    let percent: number = 0;
    let dropCounter: number = 0;
    let id = this.counter++;
    let running = this.running;
    let desiredFrames = this.desiredFrames;
    let millisecondsPerSecond = this.millisecondsPerSecond;

    if (!root) {
      root = document.body
    }
    // Compacting running db automatically every few new animations
    if (id % 20 === 0) {
      let newRunning = {}
      for (let usedId in running) {
        newRunning[usedId] = true
      }
      running = newRunning
    }
    
    // This is the internal step method which is called every few milliseconds
    let step = function (virtual) {
      // Normalize virtual value
      let render = virtual !== true
      // Get current time
      let now = _this.createTime()
      // Verification is executed before next animation step
      if (!running[id] || (verifyCallback && !verifyCallback(id))) {
        running[id] = null
        completedCallback && completedCallback(<number>desiredFrames - (<number>dropCounter / ((<number>now - <number>start) / (<number>millisecondsPerSecond))), id, false)
        return
      }
      
      // For the current rendering to apply let's update omitted steps in memory.
      // This is important to bring internal state letiables up-to-date with progress in time.
      if (render) {
        let droppedFrames = Math.round((<number>now - <number>lastFrame) / (<number>millisecondsPerSecond / (<number>desiredFrames))) - 1
        for (let j = 0; j < Math.min(droppedFrames, 4); j++) {
          step(true)
          dropCounter++
        }
      }

      // Compute percent value
      if (duration) {
        percent = (<number>now - <number>start) / (<number>duration)
        if (percent > 1) {
          percent = 1
        }
      }

      // Execute step callback, then...
      let value = easingMethod ? easingMethod(percent) : percent
      if ((stepCallback(value, now, render) === false || percent === 1) && render) {
        running[id] = null
        completedCallback && completedCallback(<number>desiredFrames - (<number>dropCounter / ((<number>now - <number>start) / (<number>millisecondsPerSecond))), id, percent === 1 || duration == null)
      } else if (render) {
        lastFrame = now
        _this.requestAnimationFrame(step, root)
      }
    }
    // Mark as running
    this.running[id] = true
    // Init first step
    _this.requestAnimationFrame(step, root)
    // Return unique animation ID
    return id
  }
}

