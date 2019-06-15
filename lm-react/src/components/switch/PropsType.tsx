import { ComponentProps } from '@src/core';
import { GroupParentProps } from '../group'

export interface SwitchComponentProps extends ComponentProps {
  switchLabel?: any
  disabled?: boolean
  value: boolean | string | number
  inlineDesc?: any
  preventDefault?: boolean
  valueMap?: any[]
  parent?: GroupParentProps
  onChange?: Function
  input?: Function
};
export interface SwitchState {
  currentValue: boolean
}