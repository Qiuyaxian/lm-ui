import { ComponentProps } from '@src/core';
export interface MaskState {
  hidden: boolean
};

export interface MaskComponentProps {
  show: boolean
  maskTransition?: string
  maskZIndex?: number
  onMaskClick?: Function
  onHide?: Function
};