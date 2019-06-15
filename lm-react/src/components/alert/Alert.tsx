import React from 'react';
import { Component, View, Transition, ComponentProps, isEqual } from '@src/core';
import { Dialog } from '../dialog';
import { AlertComponentProps } from './PropsType'
interface AlertProps extends AlertComponentProps {
  // 显示|隐藏
  visible: boolean;
};

export class Alert extends Component<AlertProps, any> {

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

  private close(): void {
    this.setState({
      isVisible: false
    });
  }

  render(): React.ReactElement<any> {
    // const { visible, title, size, top, modal, customClass, showClose, children } = this.props;
    let { visible, title, content, hideOnBlur, buttonText, maskTransition, dialogTransition } = this.props;
    let { isVisible } = this.state;
    return (
      <div className="lm-alert">
        <Dialog
          visible={isVisible}
          hide-on-blur={hideOnBlur}
          maskTransition={maskTransition}
          dialogTransition={dialogTransition}
          onHide={() => this.props.onHide && this.props.onHide()}
          onShow={() => this.props.onShow && this.props.onShow()}>
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

