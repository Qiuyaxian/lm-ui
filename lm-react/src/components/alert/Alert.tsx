import React from 'react';
import { Component, View, Transition, PropTypes } from '../../core';
import { Dialog } from '../dialog';
type State = {
};

interface AlertProps {
  // 显示|隐藏
  visible: boolean;
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
  onHide?: Function;
  // 弹出层弹出前执行的函数
  onShow?: Function;
};

export default class Alert extends Component<AlertProps, any> {
  state: State

  wrap: any

  static defaultProps: AlertProps = {
    visible: false,
    title: '弹窗',
    content: '消息发送成功',
    buttonText: '确定',
    hideOnBlur: false,
    maskTransition: 'vup-mask',
    dialogTransition: 'vup-dialog'
  }

  constructor(props: AlertProps) {
    super(props);
    this.wrap = React.createRef();
  }

  private open(visible: boolean): void {
    this.props.onShow(visible)
  }
  private close(visible: boolean): void {
    this.props.onHide(visible);
  };

  render(): React.ReactElement<any> {
    // const { visible, title, size, top, modal, customClass, showClose, children } = this.props;
    let { visible, title, content, hideOnBlur, buttonText, maskTransition, dialogTransition } = this.props;
    return (
      <div className="vup-alert">
        <Dialog
          visible={visible}
          hide-on-blur={hideOnBlur}
          maskTransition={maskTransition}
          dialogTransition={dialogTransition}
          onHide={() => this.close(visible)}
          onShow={() => this.open(visible)}>
          <div className="vup-dialog__hd">
            <strong className="vup-dialog__title">{title}</strong>
          </div>
          <div className="vup-dialog__bd">
            <div>{content}</div>
          </div>
          <div className="vup-dialog__ft">
            <a href="javascript:;"
              className="vup-dialog__btn vup-dialog__btn_primary"
              onClick={() => this.close(visible)}>{buttonText}</a>
          </div>
        </Dialog>
      </div>
    );
  };
};

