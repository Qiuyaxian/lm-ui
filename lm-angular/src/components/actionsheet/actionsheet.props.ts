import { EventEmitter, Input, Output } from '@angular/core'
export class LmActionsheetProps {
  header?: string
  showCancel?: boolean
  cancelText?: string
  theme?: string = 'ios'
  menus: object | any[]
  closeOnClickingMask?: boolean
  closeOnClickingMenu?: boolean
  onClickMask?: Function
  onClickMenu?: Function
  onAfterShow?: Function
  onAfterHide?: Function
}
