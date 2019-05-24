import { EventEmitter, Input, Output } from '@angular/core'
/**
 * 对应vue中的props
 */
export class AlertProps {

  @Input() show: boolean = false
  @Input() title: string
  @Input() content: string
  @Input() buttonText: string
  @Input() maskTransition: string
  @Input() maskZIndex: string | number
  @Input() dialogTransition: string
  @Input() dialogClass: string
  @Input() hideOnBlur: boolean

  // vue中的 $emit
  @Output() emitShow:  EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() emitHide: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() emitInput:  EventEmitter<boolean> = new EventEmitter<boolean>() 
}