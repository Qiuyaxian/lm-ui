import { ComponentProps } from '@src/core';

export interface PickerComponentProps extends ComponentProps {
  data: any[] | any[][]  // 数据来源
  model: any[] // 绑定数据
  stop?: boolean
  columns?: number
  fixedColumns?: number
  itemClass?: string
  columnWidth?: any[]
  onChange?: Function
  updateModel?: Function
};
export interface PickerState {
  currentValue: string[] | number[]
  currentData: any[][]
}


export interface PickerItemComponentProps extends ComponentProps {
  index: number
  value: string | number
  data: string[] | number[]
  onChange?: Function
};
export interface PickerItemState {
  value: string | number
  data: string[] | number[]
}