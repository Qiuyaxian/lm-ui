import { ComponentProps } from '@src/core';

export interface PopupState {
  initialShow: boolean
  hasFirstShow: boolean
  shouldRenderBody: boolean
  show: boolean
};


export interface PopupComponentProps extends ComponentProps {

  height?: string
  width?: string
  showMask?: boolean
  isTransparent?: boolean
  hideOnBlur?: boolean
  position?: string
  maxHeight?: string
  popupStyle?: any
  hideOnDeactivated?: boolean
  shouldRerenderOnShow?: boolean
  shouldScrollTopOnShow?: boolean
  onShow?: Function
  onHide?: Function
};