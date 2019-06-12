import React, { Children } from 'react';
import { Component, View, Transition, ComponentProps } from '@src/core';
import { createHashHistory as createHistory } from "history";
// 创建历史对象
const history = createHistory();

// header 组件
interface LeftOptionsProps {
  showBack?: boolean
  preventGoBack?: boolean
  backText?: string
}
interface RightOptionsProps {
  showMore?: boolean
}
interface HeaderProps extends ComponentProps {
  leftOptions?: LeftOptionsProps
  title?: string
  transition?: string
  rightOptions?: RightOptionsProps
  position?: string
  left?: any
  right?: any
  overwriteLeft?: any
  overwriteTitle?: any
  onClickBack?: Function
  onClickMore?: Function
};

export default class Header extends Component<HeaderProps, any> {

  state = {
  }

  wrap: any

  static defaultProps: HeaderProps = {
    leftOptions: {
      showBack: true,
      preventGoBack: false,
      backText: ''
    },
    title: '',
    transition: 'lm',
    rightOptions: {
      showMore: false
    },
    position: 'static'
  }

  constructor(props: HeaderProps) {
    super(props);
  }

  get _leftOptions() {
    let { leftOptions } = this.props;
    return Object.assign({
      showBack: true,
      preventGoBack: false,
      backText: ''
    }, leftOptions || {})
  }

  onClickBack() {

    if (this._leftOptions.preventGoBack) {
      this.props.onClickBack && this.props.onClickBack()
    } else {
      history ? history.goBack() : window.history.back()
    }
  }
  onClickMore(event) {
    this.props.onClickMore && this.props.onClickMore()
    event.preventDefault();
  }
  render(): React.ReactElement<any> {
    let { children, title, transition, left, right, overwriteTitle, leftOptions, rightOptions, overwriteLeft, className } = this.props;

    return (
      <div className={this.className('lm-header', className)}>
        <div className="lm-header-left">
          {
            overwriteLeft ? overwriteLeft : (
              <React.Fragment>
                <Transition name={transition}>
                  <a style={this._leftOptions.showBack ? { 'display': 'none' } : { 'display': 'block' }} className="lm-header-back">{typeof this._leftOptions.backText === 'undefined' ? '返回' : this._leftOptions.backText}</a>
                </Transition>
                <Transition name={transition}>
                  <div style={this._leftOptions.showBack ? { 'display': 'none' } : { 'display': 'block' }} className="left-arrow" onClick={() => this.onClickBack()}></div>
                </Transition>
              </React.Fragment>
            )
          }
          {left}
        </div>
        {
          !overwriteTitle ? (
            <h1 className="lm-header-title">
              <Transition name={transition}>
                {title ? (<span>{title}</span>) : (<React.Fragment>{children}</React.Fragment>)}
              </Transition>
            </h1>
          ) : (
              <div className="lm-header-title-area">
                {overwriteTitle}
              </div>
            )
        }
        <div className="lm-header-right">
          {
            rightOptions.showMore ? (<a className="lm-header-more" onClick={(e) => this.onClickMore(e)}></a>) : (null)
          }
          {right}
        </div>
      </div>
    );
  };
};

