import React from 'react';
import { Component, View, Transition, ComponentProps, pxTorem, querySelector, addEventHandle, removeEventHandle } from '@src/core';
import { Header } from '../header/index';

interface PageProps extends ComponentProps {
  header?: any
  footer?: any
  bodyPaddingTop?: number
  bodyPaddingBottom?: number
};

export default class Page extends Component<PageProps, any> {
  state = {
  }

  wrap: any

  static defaultProps: PageProps = {

  }

  constructor(props: PageProps) {
    super(props);
  }
  componentDidMount() {
    addEventHandle(querySelector('body'), 'touchmove', this.touchmoveHandle)
  }
  componentWillUnmount() {
    removeEventHandle(querySelector('body'), 'touchmove', this.touchmoveHandle)
  }
  /**
     * [touchmoveHandle description]
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
  touchmoveHandle(event) {
    if (querySelector('.lm-header') && !querySelector('.lm-header').contains(event['target'])) {
      event.preventDefault()
    } else {
    }
    if (querySelector('.lm-tabbar-absolute') && !querySelector('.lm-tabbar-absolute').contains(event['target'])) {
      event.preventDefault()
    } else {
    }
  }
  /**
   * [scrollTo 滚动到指定距离]
   * @param  {[type]} top [description]
   * @return {[type]}     [description]
   */
  scrollTo(top) {
    // if (this.$refs['view']) this.$refs['view'].scrollTop = top;
  }
  render(): React.ReactElement<any> {
    const { header, children, footer, bodyPaddingTop, bodyPaddingBottom } = this.props;

    let paddingTop: number | string = 0, paddingBottom: number | string = 0;

    if (bodyPaddingTop) {
      paddingTop = pxTorem(bodyPaddingTop);
    } else if (header) {
      paddingTop = pxTorem(46, 2);
    }

    if (bodyPaddingBottom) {
      paddingBottom = pxTorem(bodyPaddingBottom);
    } else if (footer) {
      paddingBottom = pxTorem(53, 2);
    }

    return (
      <div
        className="lm-view lm-fix-safari-overflow-scrolling"
        style={this.style({
          'paddingTop': paddingTop, 'paddingBottom': paddingBottom
        })
        }>
        {header}
        {children}
        {footer}
      </div>
    );
  };
};

