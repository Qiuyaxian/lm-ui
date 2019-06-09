import React from 'react';
import { Component, View, Transition, ComponentProps } from '@src/core';

// 中间
interface HeaderTitleProps extends ComponentProps {

}
export default class HeaderTitle extends Component<HeaderTitleProps, any> {
  static componentName = 'HeaderTitle'
  state = {}

  wrap: any

  static defaultProps: HeaderTitleProps = {

  }

  constructor(props: HeaderTitleProps) {
    super(props);
  }

  render() {
    // const { visible, title, size, top, modal, customClass, showClose, children } = this.props;
    return (
      <div>标题</div>
    );
  };
};
