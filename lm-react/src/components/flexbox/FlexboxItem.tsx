import React, { Children } from 'react';
import { Component, View, Transition, ComponentProps, Router, pxTorem } from '@src/core';
declare let document: any;
const prefixList = ['-moz-box-', '-webkit-box-', '-ms-box-']

interface ParentProps {
  gutter?: number
  orient?: string
}
interface FlexboxItemProps extends ComponentProps {
  span?: number | string
  order?: number | string
  parent?: ParentProps
};

export default class FlexboxItem extends Component<FlexboxItemProps, any> {
  wrap: any

  public bodyWidth: number = 0

  static defaultProps: FlexboxItemProps = {

  }
  componentWillMount() {
    this.bodyWidth = document.documentElement.offsetWidth
  }
  constructor(props: FlexboxItemProps) {
    super(props);
  }
  buildWidth(width: number | string): number {
    if (typeof width === 'number') {
      if (width < 1) {
        return width
      } else {
        return width / 12
      }
    } else if (typeof width === 'string' && this.bodyWidth > 0) {
      return Number(width.replace('px', '')) / this.bodyWidth
    }
  }
  get styles() {
    let styles: any = {}
    let { parent, span, order } = this.props;
    let { orient, gutter } = parent
    let marginName = orient === 'horizontal' ? 'marginLeft' : 'marginTop'
    if (gutter * 1 !== 0) {
      styles[marginName] = pxTorem(gutter)
    }
    if (span) {
      for (let i = 0; i < prefixList.length; i++) {
        styles[`${prefixList[i]}flex`] = `0 0 ${this.buildWidth(span) * 100}%`
      }
    }
    if (typeof order !== 'undefined') {
      styles.order = order
    }
    return styles
  }
  render() {
    // let {  } = this.props;
    let styles = this.styles;
    return (
      <div className="lm-flexbox-item" style={styles}>
        {this.props.children}
      </div>
    );
  };
};