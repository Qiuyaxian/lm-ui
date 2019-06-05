import { passiveSupported } from '../../utils'
const isBrowser = typeof window === 'object'

// not a good way but works well
if (isBrowser) {
  (window as any).__$lmPopups = (window as any).__$lmPopups || {} 
}
interface paramsProps {
  hideOnBlur: boolean
  onOpen: Function
  onClose: Function
  showMask: boolean
}

export abstract class Popuper {
  uuid: any
  params: paramsProps
  divMask: HTMLElement
  mask: HTMLElement
  containerHandler: Function
  container: HTMLDivElement
  isShow: boolean
  div: HTMLDivElement
  build(option): any {
    if (!isBrowser) {
      return
    }
    this.uuid = Math.random().toString(36).substring(3, 8)
    // this.params = {}
    if (Object.prototype.toString.call(option) === '[object Object]') {
      this.params = {
        hideOnBlur: option.hideOnBlur,
        onOpen: option.onOpen || function () {},
        onClose: option.onClose || function () {},
        showMask: option.showMask
      }
    }
    if (!!(document.querySelectorAll('.lm-popup-mask').length <= 0)) {
      this.divMask = document.createElement('a')
      this.divMask.className = 'lm-popup-mask'
      this.divMask.dataset.uuid = ''
      this.divMask['href'] = 'javascript:void(0)'
      document.body.appendChild(this.divMask)
    }
    let div
    if (!option.container) {
      div = document.createElement('div')
    } else {
      div = option.container
    }

    // div.className += ` lm-popup-dialog lm-popup-dialog-${this.uuid}`
    div.className += ` lm-popup-dialog-${this.uuid}`
    if (!this.params.hideOnBlur) {
      div.className += ' lm-popup-mask-disabled'
    }

    this.div = div

    if (!option.container) {
      document.body.appendChild(div)
    }
    this.container = document.querySelector('.lm-popup-dialog-' + this.uuid)
    this.mask = document.querySelector('.lm-popup-mask')
    this.mask.dataset.uuid += `,${this.uuid}`
    this._bindEvents()
    option = null
    this.containerHandler = () => {
      this.mask && !/show/.test(this.mask.className) && setTimeout(() => {
        !/show/.test(this.mask.className) && (this.mask.style['zIndex'] = '-1')
      }, 200)
    }

    this.container && this.container.addEventListener('webkitTransitionEnd', ($event) => {
      this.containerHandler($event)
    })
    this.container && this.container.addEventListener('transitionend', ($event) => {
      this.containerHandler($event)
    })
    return this;
  }
 
  onClickMask(): void {
    this.params.hideOnBlur && this.params.onClose()
  }
  _bindEvents(): void {
    if (this.params.hideOnBlur) {
      this.mask.addEventListener('click', this.onClickMask.bind(this), false)
      this.mask.addEventListener('touchmove', e => e.preventDefault(), passiveSupported ? {passive: false} : false)
    }
  }
  show(): void {
    if (this.params.showMask) {
      this.mask.classList.add('lm-popup-show')
      this.mask.style['zIndex'] = '500'
    }
    this.container.classList.add('lm-popup-show')
    this.params.onOpen && this.params.onOpen(this)
    if (isBrowser) {
      (window as any).__$lmPopups[this.uuid] = 1
    }
  }
 
  hide(shouldCallback: boolean = true): void{
    this.container.classList.remove('lm-popup-show')
    if (!document.querySelector('.lm-popup-dialog.lm-popup-show')) {
      this.mask.classList.remove('lm-popup-show')
      setTimeout(() => {
        this.mask && !/show/.test(this.mask.className) && (this.mask.style['zIndex'] = '-1')
      }, 400)
    }
    shouldCallback === false && this.params.onClose && this.params.hideOnBlur && this.params.onClose(this)
    this.isShow = false
    if (isBrowser) {
      delete (window as any).__$lmPopups[this.uuid]
    }
  }

  destroy(): void {
    this.mask.dataset.uuid = this.mask.dataset.uuid.replace(new RegExp(`,${this.uuid}`, 'g'), '')
    if (!this.mask.dataset.uuid) {
      this.mask.removeEventListener('click', this.onClickMask.bind(this), false)
      this.mask && this.mask.parentNode && this.mask.parentNode.removeChild(this.mask)
    } else {
      this.hide()
    }
    this.container.removeEventListener('webkitTransitionEnd', ($event) => {
      this.containerHandler($event)
    })
    this.container.removeEventListener('transitionend', ($event) => {
      this.containerHandler($event)
    })
    if (isBrowser) {
      delete (window as any).__$lmPopups[this.uuid]
    }
  }
}
