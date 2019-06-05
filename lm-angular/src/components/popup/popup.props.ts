import { EventEmitter, Input, Output } from '@angular/core'
export class LmAlertProps {
  title: string
  content: string
  buttonText?: string
  maskTransition?: string
  maskZIndex?: string | number
  dialogTransition?: string
  hideOnBlur?: boolean
  onHide?: Function
  onShow?: Function
}
