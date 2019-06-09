import React from 'react';
import { Component, View, Transition, ComponentProps } from '@src/core';

// 左侧
interface HeaderLeftProps extends ComponentProps {

}
export default class HeaderLeft extends Component<HeaderLeftProps, any> {
  static componentName = 'HeaderLeft'
  state = {}

  wrap: any

  static defaultProps: HeaderLeftProps = {

  }

  constructor(props: HeaderLeftProps) {
    super(props);
  }

  render() {
    // const { visible, title, size, top, modal, customClass, showClose, children } = this.props;
    return (
      <div>左侧{this.props.children}</div>
    );
  };
};