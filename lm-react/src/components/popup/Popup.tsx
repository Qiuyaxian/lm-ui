import React from 'react';
import { Component, View, Transition, pxTorem, isEqual } from '@src/core';
import { Mask } from '../mask'

import { PopupState, PopupComponentProps } from './PropsType'

interface PopupProps extends PopupComponentProps {
  value: boolean
};

export class Popup extends Component<PopupProps, PopupState> {
  state: PopupState = {
    initialShow: false,
    hasFirstShow: false,
    shouldRenderBody: true,
    show: false
  }

  wrap: any

  static defaultProps: PopupProps = {
    value: false,
    height: 'auto',
    width: 'auto',
    showMask: true,
    hideOnBlur: true,
    position: 'bottom',
    hideOnDeactivated: true,
    shouldRerenderOnShow: false,
    shouldScrollTopOnShow: false
  }

  constructor(props: PopupProps) {
    super(props);
  }
  componentDidMount() {
    let { value } = this.props;
    this.setState({
      show: value || false
    });
  }
  componentWillReceiveProps(nextProps: PopupProps) {
    let { value } = nextProps;
    if (!isEqual(value, this.state.show)) {
      this.setState({
        show: value
      })
    }
  }
  get styles(): any {
    let { position, height, width, maxHeight, popupStyle, isTransparent } = this.props;
    const styles: any = {}
    if (!position || position === 'bottom' || position === 'top') {
      styles.height = height
    } else {
      styles.width = width
    }
    maxHeight && (styles['maxHeight'] = maxHeight)
    isTransparent && (styles['background'] = 'transparent')
    if (popupStyle) {
      for (let i in popupStyle) {
        styles[i] = popupStyle[i]
      }
    }
    return styles;
  }
  onMaskClick() {
    this.setState({
      show: false
    })
  }
  render() {
    let { show, initialShow } = this.state
    let { position, children } = this.props;
    let styles = this.styles
    return (
      <div>
        <Mask onMaskClick={() => this.onMaskClick()} show={show} maskZIndex={500}></Mask>
        <Transition
          onAfterEnter={() => this.props.onHide && this.props.onHide()}
          onAfterLeave={() => this.props.onShow && this.props.onShow()}

          name={`lm-popup-animate-${position}`}
        >
          <View show={show && !initialShow}>
            <div style={this.style(styles)}
              className={this.className('lm-popup-dialog', `lm-popup-${position}`, {
                'lm-popup-show': show
              })}>
              {children}
            </div>
          </View>
        </Transition>
      </div>
    );
  };
};

