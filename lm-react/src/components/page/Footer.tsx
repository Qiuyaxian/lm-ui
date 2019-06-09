import React from 'react';
import { Component, View, Transition, ComponentProps } from '@src/core';

interface PageFooterProps extends ComponentProps {

};

export default class PageFooter extends Component<PageFooterProps, any> {
  state = {}

  wrap: any

  static defaultProps: PageFooterProps = {

  }

  constructor(props: PageFooterProps) {
    super(props);
  }


  render(): React.ReactElement<any> {
    console.log(this.props.children, 'this.props.children')
    // const { visible, title, size, top, modal, customClass, showClose, children } = this.props;
    return (
      <div>{this.props.children}</div>
    );
  };
};

