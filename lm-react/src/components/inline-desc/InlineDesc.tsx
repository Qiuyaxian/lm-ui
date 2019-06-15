import React from 'react';
import { Component } from '@src/core';
import { InlineDescComponentProps } from './PropsType'

interface InlineDescProps extends InlineDescComponentProps {

};

export class InlineDesc extends Component<InlineDescProps, any> {

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

