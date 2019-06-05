import { EventEmitter, Input, Output } from '@angular/core'
export class LmAlertProps {
  title: String
  content: String
  buttonText?: String
  maskTransition?: String
  maskZIndex?: String | Number
  dialogTransition?: String
  hideOnBlur?: Boolean
  onHide?: Function
  onShow?: Function
}
