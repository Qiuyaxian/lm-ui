import { ComponentProps } from '@src/core';

export interface GroupComponentProps extends ComponentProps {
  labelAlign?: string
  labelWidth?: string
  showBorders?: boolean
  cellWidth?: string
  borderIntent?: boolean
};

export interface GroupParentProps extends GroupComponentProps {
  borderIntent?: boolean
  cellWidth?: string
  showBorders?: boolean
  labelWidth?: string
  labelAlign?: string
}

export interface GroupTitleComponentProps extends ComponentProps {
  headerLabel: string
  headerValue: string
};