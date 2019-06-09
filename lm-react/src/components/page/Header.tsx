import React from 'react';
import { Component, View, Transition, ComponentProps } from '@src/core';
import { Header } from '../header'
// header 组件
interface PageHeaderProps extends ComponentProps {

};

export default class PageHeader extends Component<PageHeaderProps, any> {
  static left: any
  static right: any
  static title: any
  state = {}

  wrap: any

  static defaultProps: PageHeaderProps = {

  }

  constructor(props: PageHeaderProps) {
    super(props);
  }

  render(): React.ReactElement<any> {
    // const { visible, title, size, top, modal, customClass, showClose, children } = this.props;
    return (
      <Header>
        {this.props.children}
      </Header>
    );
  };
};
