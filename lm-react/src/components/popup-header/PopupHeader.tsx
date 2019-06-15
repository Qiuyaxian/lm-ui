import React from 'react';
import { Component } from '@src/core';
import { PopupHeaderComponentProps } from './PropsType';

interface PopupHeaderProps extends PopupHeaderComponentProps {
  showBottomBorder?: boolean
  leftText?: string
  title?: string
  rightText?: string
  leftTextSlot?: any
  titleSlot?: any
  rightTextSlot?: any
  onClickLeft?: Function
  onClickRight?: Function
};

export class PopupHeader extends Component<PopupHeaderProps, any> {

  static defaultProps: PopupHeaderProps = {
    leftText: '取消',
    rightText: '确定'
  }

  constructor(props: PopupHeaderProps) {
    super(props);
  }

  render() {
    let { leftText, title, rightText, showBottomBorder, leftTextSlot, titleSlot, rightTextSlot } = this.props;
    return (
      <div className={this.className('lm-popup-header', {
        'lm-border-bottom': showBottomBorder
      })}>
        <div className="lm-popup-header-left" onClick={() => this.props.onClickLeft && this.props.onClickLeft()}>
          {leftTextSlot ? ({ leftTextSlot }) : (leftText)}
        </div>
        <div className="lm-popup-header-title">
          {titleSlot ? ({ titleSlot }) : (title)}
        </div>
        <div className="lm-popup-header-right" onClick={() => this.props.onClickRight && this.props.onClickRight()}>
          {rightTextSlot ? ({ rightTextSlot }) : (rightText)}
        </div>
      </div>
    );
  };
};

