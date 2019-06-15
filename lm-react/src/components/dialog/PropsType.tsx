import { ComponentProps } from '@src/core';

export interface DialogComponentProps extends ComponentProps {
  maskTransition?: string
  maskZIndex?: number
  dialogTransition?: string
  dialogClass?: string
  hideOnBlur?: boolean
  dialogStyle?: React.CSSProperties
  scroll?: boolean
  onHide?: Function
  onShow?: Function
  onMaskClick?: Function
};