import React from 'react';
import classnames from 'classnames';
import { ComponentProps } from '../props'
interface inComponentProps extends ComponentProps {
  className?: string;
  style?: React.CSSProperties;
  slot?: boolean | string | Symbol
};

export class Component<inComponentProps, T> extends React.Component<inComponentProps, any> {

  protected classNames(...args) {
    return classnames(args);
  }

  protected className(...args) {
    let props: any = this.props;
    let className = {};
    if (props.className) {
      className = props.className
    }
    return this.classNames.apply(this, args.concat([className]));
  }

  protected style(args) {
    let props: any = this.props;
    let style = {};
    if (props.style) {
      style = props.style
    }
    return Object.assign({}, args, style)
  }

}

