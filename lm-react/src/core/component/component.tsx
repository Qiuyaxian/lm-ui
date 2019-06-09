import React from 'react';
import classnames from 'classnames';

interface ComponentProps {
  className?: string;
  style?: React.CSSProperties;
  slot?: boolean | string | Symbol
};

export class Component<ComponentProps, T> extends React.Component<ComponentProps, any> {

  classNames(...args) {
    return classnames(args);
  }

  className(...args) {
    let props: any = this.props;
    let className = {};
    if (props.className) {
      className = props.className
    }
    return this.classNames.apply(this, args.concat([className]));
  }

  style(args) {
    let props: any = this.props;
    let style = {};
    if (props.style) {
      style = props.style
    }
    return Object.assign({}, args, style)
  }

}

