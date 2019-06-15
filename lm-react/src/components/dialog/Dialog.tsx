import React from 'react';
import { Component, View, Transition, ComponentProps } from '@src/core';
import { DialogComponentProps } from './PropsType'
import { Mask } from '../mask'
type State = {
  hidden: boolean
};

interface DialogProps extends DialogComponentProps {
  visible: boolean
};

export class Dialog extends Component<DialogProps, any> {
  state: State = {
    hidden: false
  }

  static defaultProps: DialogProps = {
    visible: false,
    maskTransition: 'lm-mask',
    dialogTransition: 'lm-dialog',
    dialogClass: 'lm-dialog',
    dialogStyle: {}
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { visible, onShow } = this.props;
    if (visible) onShow && onShow();
    this.setState({
      hidden: visible
    });
  }

  componentWillReceiveProps(nextProps): void {
    let { visible, onShow } = nextProps;
    if (visible) onShow && onShow();
    this.setState({
      hidden: nextProps.visible
    })
  }

  render() {
    let { visible, maskZIndex, dialogStyle, maskTransition, dialogTransition, children } = this.props;
    let { hidden } = this.state;
    return (
      <div className="lm-dialog-wrapper lm-dialog-absolute">
        <Mask
          maskZIndex={maskZIndex}
          onMaskClick={() => this.props.onMaskClick && this.props.onMaskClick()}
          maskTransition={maskTransition}
          onHide={() => this.props.onHide && this.props.onHide()}
          show={hidden}>
        </Mask>
        <Transition name={dialogTransition}>
          <View show={hidden}>
            <div style={dialogStyle} className="lm-dialog">{children}</div>
          </View>
        </Transition>
      </div>
    );
  };
};

