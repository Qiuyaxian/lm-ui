import { ComponentProps } from '@src/core';
import { GroupParentProps } from '../group'

export interface CellComponentProps extends ComponentProps {
  label?: any
  content?: any
  isLink?: boolean
  inlineDesc?: string | number
  link?: string | object
  valueAlign?: string
  borderIntent?: boolean
  primary?: string
  disabled?: boolean
  alignItems?: string
  placeholder?: string
  parent?: GroupParentProps
  icon?: any
  onCellClick?: Function
};
