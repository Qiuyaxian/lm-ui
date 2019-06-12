import React from 'react';
import { Component, View, Transition, ComponentProps, isEqual } from '@src/core';
import { Dialog } from '../dialog';

interface AlertProps extends ComponentProps {
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
  willUnmount?: Function
};

export default class Alert extends Component<AlertProps, any> {

  wrap: any

  static defaultProps: AlertProps = {
    visible: false,
    title: '弹窗',
    content: '消息发送成功',
    buttonText: '确定',
    hideOnBlur: false,
    maskTransition: 'lm-mask',
    dialogTransition: 'lm-dialog'
  }

  constructor(props: AlertProps) {
    super(props);
    this.wrap = React.createRef();
    let { visible } = props;
    this.state = {
      isVisible: visible || false
    }
  }
  componentWillReceiveProps(newProps: AlertProps) {
    let { visible } = newProps;
    let { isVisible } = this.state;
    if (!isEqual(visible, isVisible)) {
      this.setState({
        isVisible: visible
      })
    }
  }
  private open(): void {
    let { onShow } = this.props;
    onShow && onShow();
  }
  private close(): void {
    let { onHide } = this.props;
    this.setState({
      isVisible: false
    })
    onHide && onHide();
  };

  render(): React.ReactElement<any> {
    // const { visible, title, size, top, modal, customClass, showClose, children } = this.props;
    let { visible, title, content, hideOnBlur, buttonText, maskTransition, dialogTransition } = this.props;
    let { isVisible } = this.state;
    return (
      <div className="lm-alert">
        <Dialog
          willUnmount={() => this.props.willUnmount()}
          visible={isVisible}
          hide-on-blur={hideOnBlur}
          maskTransition={maskTransition}
          dialogTransition={dialogTransition}
          onHide={() => this.close()}
          onShow={() => this.open()}>
          <div className="lm-dialog-header">
            <strong className="lm-dialog-title">{title}</strong>
          </div>
          <div className="lm-dialog-body">
            <div>{content}</div>
          </div>
          <div className="lm-dialog-footer">
            <a href="javascript:;"
              className="lm-dialog-btn lm-dialog-btn-primary"
              onClick={() => this.close()}>{buttonText}</a>
          </div>
        </Dialog>
      </div>
    );
  };
};

