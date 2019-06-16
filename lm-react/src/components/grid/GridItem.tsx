import React from 'react';
import { Component, Router } from '@src/core';
import { createHashHistory as createHistory } from "history";
import { GridItemComponentProps } from './PropsType'

// 创建历史对象
const history = createHistory();

interface GridItemProps extends GridItemComponentProps {

}

export class GridItem extends Component<GridItemProps, any> {

  constructor(props: GridItemProps) {
    super(props);
  }
  onClick() {
    let { link } = this.props;
    Router.go(link, history);
  }
  render() {
    let { children, icon, label, iconSlot, labelSlot, parent } = this.props
    let { index, column, showLrBorders, showVerticalDividers } = parent
    let isLast = !((index + 1) && column);
    return (
      <a href="javascript:;"
        onClick={() => this.onClick()}
        className={this.className('lm-grid', {
          'lm-grid-item-no-border': (isLast && !showLrBorders) || (!isLast && !showVerticalDividers),
        })}>
        <div className="lm-grid-icon-wrapper">
          {
            !iconSlot ? (<img className="lm-grid-icon" src={icon} alt="" />) : (<React.Fragment>{iconSlot}</React.Fragment>)
          }
        </div>
        <p className="lm-grid-label">
          {!labelSlot ? (<span>{label}</span>) : (<React.Fragment>{labelSlot}</React.Fragment>)}
        </p>
        {children}
      </a>
    );
  };
};