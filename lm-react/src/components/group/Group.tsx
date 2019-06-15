import React from 'react';
import { Component } from '@src/core';
import { GroupComponentProps } from './PropsType'
interface GroupProps extends GroupComponentProps {
  header?: any
  gutter?: string | number
};

export class Group extends Component<GroupProps, any> {

  static Title: any

  static Cell: any

  static Switch: any

  static defaultProps: GroupProps = {
    borderIntent: true,
    showBorders: true
  }

  constructor(props: GroupProps) {
    super(props);
  }

  render() {
    let { header, children, showBorders, borderIntent, cellWidth, labelAlign } = this.props;
    let Groupitems = [];


    return (
      <div className={this.className('lm-group')}>
        {header}
        <div className={this.className('lm-group-cells', {
          'lm-group-border': showBorders
        })}>
          {
            React.Children.map(children, (child, index) => {
              return React.cloneElement(child, {
                key: index,
                parent: {
                  borderIntent: borderIntent,
                  cellWidth: cellWidth,
                  labelAlign: labelAlign
                }
              });
            })
          }
        </div>
      </div>
    );
  };
};

