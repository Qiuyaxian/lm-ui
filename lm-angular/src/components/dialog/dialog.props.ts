import { EventEmitter, Input, Output } from '@angular/core'
import { DialogComponent } from './dialog.component'
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

  @Output() emitShow:  EventEmitter<DialogComponent> = new EventEmitter<DialogComponent>()
  @Output() emitHide: EventEmitter<DialogComponent> = new EventEmitter<DialogComponent>()
  
  // vue中的 $emit readonly
  // @Output() emitChange:  EventEmitter<DialogComponent> = new EventEmitter<DialogComponent>()
  // @Output() emitClickMask:  EventEmitter<DialogComponent> = new EventEmitter<DialogComponent>()
}