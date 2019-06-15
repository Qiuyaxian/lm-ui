import { ComponentProps } from '@src/core';

// header 组件
export interface LeftOptionsProps {
  showBack?: boolean
  preventGoBack?: boolean
  backText?: string
}

export interface RightOptionsProps {
  showMore?: boolean
}

export interface HeaderComponentProps extends ComponentProps {
  leftOptions?: LeftOptionsProps
  title?: string
  transition?: string
  rightOptions?: RightOptionsProps
  position?: string
  left?: any
  right?: any
  overwriteLeft?: any
  overwriteTitle?: any
  onClickBack?: Function
  onClickMore?: Function
};