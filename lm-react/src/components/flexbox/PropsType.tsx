import { ComponentProps } from '@src/core';

export interface FlexboxComponentProps extends ComponentProps {
  orient?: string
  gutter?: number
}

export interface FlexboxParentProps extends FlexboxComponentProps {

}

export interface FlexboxItemComponentProps extends ComponentProps {
  span?: number | string
  order?: number | string
  parent?: FlexboxParentProps
};