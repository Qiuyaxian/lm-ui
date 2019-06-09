import React from 'react';
import { Component, View, Transition, ComponentProps } from '@src/core';

// 右侧
interface HeaderRightProps extends ComponentProps {

}
export default class HeaderRight extends Component<HeaderRightProps, any> {
  static componentName = 'HeaderRight'
  state = {}

  wrap: any

  static defaultProps: HeaderRightProps = {

  }

  constructor(props: HeaderRightProps) {
    super(props);
  }

  render() {
    // const { visible, title, size, top, modal, customClass, showClose, children } = this.props;
    return (
      <div>
        {this.props.children}
      </div>
    );
  };
};
