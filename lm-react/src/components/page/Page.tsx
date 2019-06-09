import React from 'react';
import { Component, View, Transition, ComponentProps } from '@src/core';

interface PageProps extends ComponentProps {

};

export default class Page extends Component<PageProps, any> {
  static Header: any;
  static Footer: any;

  state = {}

  wrap: any

  static defaultProps: PageProps = {

  }

  constructor(props: PageProps) {
    super(props);
  }


  render(): React.ReactElement<any> {
    // const { visible, title, size, top, modal, customClass, showClose, children } = this.props;
    return (
      <div>{this.props.children}</div>
    );
  };
};

