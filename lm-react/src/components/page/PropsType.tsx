import { ComponentProps } from '@src/core';

export interface PageComponentProps extends ComponentProps {
  header?: any
  footer?: any
  bodyPaddingTop?: number
  bodyPaddingBottom?: number
};