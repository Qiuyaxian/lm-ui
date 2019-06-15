import { ComponentProps } from '@src/core';

export interface GridComponentProps extends ComponentProps {
  showLrBorders?: boolean
  showVerticalDividers?: boolean
}

export interface GridParentProps extends GridComponentProps {
  index?: number
  column?: number
}

export interface GridItemComponentProps extends ComponentProps {
  icon?: string
  label?: string
  link?: string
  parent?: GridParentProps
};