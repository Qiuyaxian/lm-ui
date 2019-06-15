import { ComponentProps } from '@src/core';

export interface PopupPickerParentProps {
  borderIntent?: boolean
  cellWidth?: string
  showBorders?: boolean
  labelWidth?: string
  labelAlign?: string
}
export interface PopupPickerState {
  onShowProcess: boolean
  tempValue: any[]
  closeType: boolean
  currentData: any[]
  showValue: boolean
  currentValue: any[]
}
export interface PopupPickerComponentProps extends ComponentProps {
  value: any[]
  label: string
  data: any[]
  valueTextAlign?: string
  cancelText?: string
  confirmText?: string
  placeholder?: string
  columns?: number
  fixedColumns?: number
  showName?: boolean
  inlineDesc?: any
  showCell?: boolean
  displayFormat?: Function
  isTransferDom?: boolean
  columnWidth?: any[]
  popupStyle?: Object
  popupTitle?: string
  disabled?: boolean
  borderIntent?: boolean
  parent?: PopupPickerParentProps
  onHide?: Function
  onShow?: Function
  onChange?: Function
  onShadowChange?: Function
};
