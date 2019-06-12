import React from 'react';
import { Component, ComponentProps, cleanStyle, Router } from '@src/core';
import { InlineDesc as InlineDescSlot } from '../inline-desc'
import { createHashHistory as createHistory } from "history";
// 创建历史对象
const history = createHistory();
interface ParentProps {
  borderIntent?: boolean
  cellWidth?: string
  showBorders?: boolean
  labelWidth?: string
  labelAlign?: string
}

interface CellProps extends ComponentProps {
  label?: any
  content?: any
  isLink?: boolean
  inlineDesc?: string | number
  link?: string | object
  valueAlign?: string
  borderIntent?: boolean
  primary?: string
  disabled?: boolean
  alignItems?: string
  placeholder?: string
  parent?: ParentProps
  icon?: any
  onCellClick?: Function
};

export default class Cell extends Component<CellProps, any> {

  constructor(props: CellProps) {
    super(props);
  }

  static defaultProps: CellProps = {
    primary: 'title'
  }

  get borderIntent() {
    let { parent, borderIntent } = this.props;
    return parent.borderIntent || borderIntent;
  }
  /**
   * [cellStyles 计算左侧cell的宽度]
   * @return {[type]} [description]
   */
  get cellStyles() {
    let { parent } = this.props;
    let { cellWidth } = parent
    return cleanStyle({
      width: cellWidth
    });
  }
  /**
   * [labelStyles 计算label 样式]
   * @return {[type]} [description]
   */
  get labelStyles() {
    let { parent } = this.props;
    let { labelWidth, labelAlign } = parent;
    return cleanStyle({
      'width': labelWidth,
      'textAlign': labelAlign
    });
  }
  /**
   * [labelClass 计算label label class ]
   * @return {[type]} [description]
   */
  get labelClass() {
    let { parent } = this.props;
    let { labelAlign } = parent;
    return {
      'lm-cell-justify': labelAlign === 'justify'
    }
  }
  /**
   * [valueClass 计算右侧文字样式]
   * @return {[type]} [description]
   */
  get valueClass() {
    let { primary, valueAlign } = this.props;
    return cleanStyle({
      'lm-cell-primary': primary === 'content' || valueAlign === 'left'
    })
  }
  /**
   * [style 子项的样式]
   * @return {[type]} [description]
   */
  get styles() {
    let { alignItems } = this.props;
    return cleanStyle({
      'alignItems': alignItems
    })
  }

  onClick() {
    let { disabled, link, onCellClick } = this.props;
    if (!disabled && link) {
      Router.go && Router.go(link, history)
    } else {
      onCellClick && onCellClick();
    }
  }

  render() {
    let {
      icon,
      label,
      content,
      children,
      isLink,
      inlineDesc,
      link,
      valueAlign,
      primary,
      disabled,
      placeholder
    } = this.props
    let styles = this.styles;
    let cellStyles = this.cellStyles;
    let labelClass = this.labelClass;
    let labelStyles = this.labelStyles;
    let borderIntent = this.borderIntent
    return (

      <div className={this.className('lm-cell', {
        'lm-tap-active': isLink || !!link,
        'lm-cell-access': isLink || !!link,
        'lm-cell-no-border-intent': !borderIntent,
        'lm-cell-disabled': disabled
      })}
        onClick={() => this.onClick()}
        style={this.style(styles)}
      >
        <div className={this.className('lm-cell-icon')}>
          {icon}
        </div>

        <div
          className={this.className('lm-cell-label', {
            'lm-cell-primary': primary === 'title' && valueAlign !== 'left'
          })
          }
          style={this.style(cellStyles)}>
          <p className="">
            <label className={this.className(labelClass)}
              style={this.style(labelStyles)}>
              {label}
            </label>
          </p>
          {
            inlineDesc ? (<InlineDescSlot>inlineDesc</InlineDescSlot>) : (null)
          }
        </div>

        <div className={this.className('lm-cell-content', {
          'lm-cell-placeholder': !content || (content && content.length === 0)
        })
        }>

          {content ? (
            <React.Fragment>{content || placeholder}</React.Fragment>
          ) : (
              <React.Fragment>{children}</React.Fragment>
            )
          }
        </div>

      </div>
    );
  };
};

