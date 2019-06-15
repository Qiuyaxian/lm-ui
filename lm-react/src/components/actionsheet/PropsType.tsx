import { ComponentProps } from '@src/core';

export interface ActionsheetState {
  show: boolean
}

export interface ActionsheetComponentProps extends ComponentProps {
  showCancel?: boolean
  cancelText?: string
  theme?: string
  menus: object | any[]
  closeOnClickingMask?: boolean
  closeOnClickingMenu?: boolean
  headerSlot?: any
  maskZIndex?: number
  onClickMask?: Function
  onHide?: Function
  onClickMenu?: Function
  maskTransition?: string
  onAfterEnter?: Function
  onAfterLeave?: Function
};
