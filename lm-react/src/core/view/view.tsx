import * as React from 'react';

interface ViewProps  {
  show?: boolean;
  className?: string;
  children?: React.ReactElement<any>
}

export class View extends React.Component<ViewProps, any> {
  public static _typeName = 'View';
  render(): React.ReactElement<any> {
    const classNames = [];

    const { show = true, className = '', children } = this.props;

    const mixed: any = { style: { ...children.props.style } };
    
    if (!show) mixed.style.display = 'none';
    
    if (children.props.className) classNames.push(children.props.className);
    
    if (className) classNames.push(className);
    
    mixed.className = classNames.join(' ');
    
    return React.cloneElement(React.Children.only(children), mixed);
  }
}
