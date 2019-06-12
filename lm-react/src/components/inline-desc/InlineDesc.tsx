import React from 'react';
import { Component, ComponentProps } from '@src/core';

interface InlineDescProps extends ComponentProps {
};

export default class InlineDesc extends Component<InlineDescProps, any> {

  constructor(props: InlineDescProps) {
    super(props);
  }

  render() {
    return (
      <span className="lm-label-desc">
        {this.props.children}
      </span>
    );
  };
};

