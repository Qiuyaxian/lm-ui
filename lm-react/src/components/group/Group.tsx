import React from 'react';
import { Component, ComponentProps } from '@src/core';

interface GroupProps extends ComponentProps {
  header?: any
  labelWidth?: string
  labelAlign?: string
  gutter?: string | number
  borderIntent?: boolean
  cellWidth?: string
  showBorders?: boolean
};

export default class Group extends Component<GroupProps, any> {
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
    if (children && children.length !== 0) {
      for (let i = 0; i < children.length; i++) {
        let child = children[i];
        Groupitems.push(React.cloneElement(child, {
          key: i,
          parent: {
            borderIntent: borderIntent,
            cellWidth: cellWidth,
            labelAlign: labelAlign
          }
        }))
      }
    }
    return (
      <div className={this.className('lm-group')}>
        {header}
        <div className={this.className('lm-group-cells', {
          'lm-group-border': showBorders
        })}>
          {Groupitems}
        </div>
      </div>
    );
  };
};

