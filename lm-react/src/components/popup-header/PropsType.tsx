import { ComponentProps } from '@src/core';

export interface PopupHeaderComponentProps extends ComponentProps {
  showBottomBorder?: boolean
  leftText?: string
  title?: string
  rightText?: string
  leftTextSlot?: any
  titleSlot?: any
  rightTextSlot?: any
  onClickLeft?: Function
  onClickRight?: Function
};