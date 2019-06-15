import React, { Children } from 'react';
import { Component, View, Transition } from '@src/core';

import { FlexboxParentProps, FlexboxComponentProps } from './PropsType'

interface FlexboxProps extends FlexboxComponentProps {
  justify?: string
  align?: string
  wrap?: string,
  direction?: string
};

export class Flexbox extends Component<FlexboxProps, any> {
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
        let parent: FlexboxParentProps = {
          gutter: gutter,
          orient: orient
        }
        flexboxItems.push(React.cloneElement(children[i], {
          key: i,
          parent: parent
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

