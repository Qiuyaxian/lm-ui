import React from 'react';
import { Component, View, Transition, ComponentProps } from '@src/core';

interface PageHeaderProps extends ComponentProps {

};

export default class PageHeader extends Component<PageHeaderProps, any> {
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
      <div>page</div>
    );
  };
};

