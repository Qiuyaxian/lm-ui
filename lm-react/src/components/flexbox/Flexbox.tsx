import React, { Children } from 'react';
import { Component, View, Transition, ComponentProps } from '@src/core';

interface FlexboxProps extends ComponentProps {
  gutter?: number
  justify?: string
  align?: string
  wrap?: string,
  direction?: string
  orient?: string
};

export default class Flexbox extends Component<FlexboxProps, any> {
  static Item: any
  static defaultProps: FlexboxProps = {
    gutter: 16,
    orient: 'horizontal'
  }

  constructor(props: FlexboxProps) {
    super(props);
  }
  get styles(): any {
    let { justify, align, wrap, direction } = this.props;
    const styles = {
      'justifyContent': justify,
      'WebkitJustifyContent': justify,
      'alignItems': align,
      'WebkitAlignItems': align,
      'flexWrap': wrap,
      'WebkitFlexWrap': wrap,
      'flexDirection': direction,
      'WebkitFlexDirection': direction
    }
    return styles;
  }
  render() {
    let { children, orient, gutter } = this.props;
    let styles = this.styles;
    let flexboxItems = []
    if (children && children.length !== 0) {
      for (let i = 0; i < children.length; i++) {
        flexboxItems.push(React.cloneElement(children[i], {
          key: i,
          parent: {
            gutter: gutter,
            orient: orient
          }
        }))
      }
    }
    return (
      <div className={this.className('lm-flexbox', {
        'lm-flex-col': orient === 'vertical',
        'lm-flex-row': orient === 'horizontal'
      })}
        style={this.style(styles)}>
        {flexboxItems}
      </div>
    );
  };
};

