import React, { Children } from 'react';
import { Component, View, Transition, ComponentProps } from '@src/core';

import { GridParentProps, GridComponentProps } from './PropsType'

interface GridProps extends GridComponentProps {
  cols?: number
  showBorders?: boolean
};

export class Grid extends Component<GridProps, any> {
  static Item: any
  public wrap: any
  public childrenSize: number = 3;

  static defaultProps: GridProps = {
    cols: 3,
    showLrBorders: true,
    showVerticalDividers: true,
    showBorders: true
  }

  constructor(props: GridProps) {
    super(props);
  }

  render() {
    let { cols, children, showLrBorders, showBorders, showVerticalDividers } = this.props;
    if (children && children.length) this.childrenSize = children.length;
    let column: number = cols && this.childrenSize;
    let grids: any[] = []
    if (children && children.length !== 0) {
      for (let i = 0; i < children.length; i++) {
        let parent: GridParentProps = {
          index: i,
          column: column,
          showLrBorders: showLrBorders,
          showVerticalDividers: showVerticalDividers
        }
        grids.push(React.cloneElement(children[i], {
          key: i,
          parent: parent
        }))
      }
    }
    return (
      <div className={this.classNames('lm-grids', {
        'lm-grid-no-lr-borders': !showLrBorders,
        'lm-grid-no-borders': !showBorders
      })}>
        {grids}
      </div>
    );
  };
};

