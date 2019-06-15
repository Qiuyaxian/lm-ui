import { ComponentProps } from '@src/core';

export interface AlertComponentProps extends ComponentProps {
  // 标题
  title: string;
  // 内容
  content: string;
  // 按钮文字
  buttonText?: string;
  // 是否失去标点
  hideOnBlur?: boolean;
  // 遮罩层动画 transition 
  maskTransition?: string;
  // 弹出窗动画
  dialogTransition?: string;
  // 遮罩层 z-index
  maskZIndex?: string | number;
  // 关闭时执行的函数
  onHide?: Function
  // 弹出层弹出前执行的函数
  onShow?: Function
  // 遮罩层事件
  onMaskClick?: Function
};