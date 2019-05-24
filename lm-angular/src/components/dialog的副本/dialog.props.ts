import { EventEmitter, Input, Output } from '@angular/core'
/**
 * 对应vue中的props
 */
export class DialogProps {
  @Input() show: boolean = false
  @Input() maskTransition: string
  @Input() maskZIndex: string | number
  @Input() dialogTransition: string
  @Input() dialogClass: string
  @Input() hideOnBlur: boolean
  @Input() dialogStyle: object
  @Input() scroll: boolean
  // vue中的 $emit
  @Output() emitShow:  EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() emitHide: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() emitChange:  EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() emitClickMask:  EventEmitter<boolean> = new EventEmitter<boolean>()
  
  // @Input() top: string = '15%'                // css value
  // @Input('close-on-click-modal') closeOnClickModal: boolean = true
  // @Input('close-on-press-escape') closeOnPressEscape: boolean = true
  
  // @Input('lock-scroll') lockScroll: boolean = true    // lock body overflow
  // @Input('custom-class') customClass: string
  // @Input('show-close') showClose: boolean = true
  // @Input('before-close') beforeClose: ((done: Function) => {}) = ((d: Function) => d())
  
  // @Input('dialog-zindex') dialogZindex: number = 2000
  // @Input('modal-zindex') modalZindex: number = 1999
  
  // @Input() visible: boolean = false
  // @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>()
}