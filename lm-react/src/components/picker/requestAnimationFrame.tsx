declare let window: any
function createtTime(): number {
  if(Date.now) return Date.now();
  else +new Date()
}

let running: any = {}
let counter: number = 1
let desiredFrames: number = 60
let millisecondsPerSecond: number = 1000

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
if (typeof window !== 'undefined') {
  ;(function () {
    let lastTime: number = 0
    let vendors: any[] = ['ms', 'moz', 'webkit', 'o']
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
      window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame']
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (callback: Function, element: any) {
        let currTime: number = new Date().getTime()
        let timeToCall: number = Math.max(0, 16 - (currTime - lastTime))
        let id = window.setTimeout(function () {
          callback(currTime + timeToCall)
        }, timeToCall)
        lastTime = currTime + timeToCall
        return id
      }
    }
    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function (id) {
        clearTimeout(id)
      }
    }
  }())
}

export default {

  // A requestAnimationFrame wrapper / polyfill.
  requestAnimationFrame: (function () {
    if (typeof window !== 'undefined') {
      let requestFrame = window.requestAnimationFrame
      return function (callback: Function, root: any) {
        requestFrame(callback, root)
      }
    }
  })(),

  // Stops the given animation.
  stop (id: any): boolean {
    let cleared = running[id] != null
    if (cleared) {
      running[id] = null
    }
    return cleared
  },

  // Whether the given animation is still running.
  isRunning (id: any): boolean {
    return running[id] != null
  },

  // Start the animation.
  start (stepCallback?: Function, verifyCallback?: Function, completedCallback?: Function, duration?: number, easingMethod?: Function, root?: any): any {
    let _this = this
    let start: number = createtTime()
    let lastFrame: number = start
    let percent: number = 0
    let dropCounter: number = 0
    let id: number = counter++

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
      let render: boolean = virtual !== true
      // Get current time
      let now: number = createtTime()
      // Verification is executed before next animation step
      if (!running[id] || (verifyCallback && !verifyCallback(id))) {
        running[id] = null
        completedCallback && completedCallback(desiredFrames - (dropCounter / ((now - start) / millisecondsPerSecond)), id, false)
        return
      }
      
      // For the current rendering to apply let's update omitted steps in memory.
      // This is important to bring internal state variables up-to-date with progress in time.
      if (render) {
        let droppedFrames: number = Math.round((now - lastFrame) / (millisecondsPerSecond / desiredFrames)) - 1
        for (let j = 0; j < Math.min(droppedFrames, 4); j++) {
          step(true)
          dropCounter++
        }
      }

      // Compute percent value
      if (duration) {
        percent = (now - start) / duration
        if (percent > 1) {
          percent = 1
        }
      }

      // Execute step callback, then...
      let value = easingMethod ? easingMethod(percent) : percent
      if ((stepCallback(value, now, render) === false || percent === 1) && render) {
        running[id] = null
        completedCallback && completedCallback(desiredFrames - (dropCounter / ((now - start) / millisecondsPerSecond)), id, percent === 1 || duration == null)
      } else if (render) {
        lastFrame = now
        _this.requestAnimationFrame(step, root)
      }
    }

    // Mark as running
    running[id] = true
    // Init first step
    _this.requestAnimationFrame(step, root)
    // Return unique animation ID
    return id
  }
}
