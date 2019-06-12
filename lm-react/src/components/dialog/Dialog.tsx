import React from 'react';
import { Component, View, Transition, ComponentProps } from '@src/core';

type State = {
  hidden: boolean
};

interface DialogProps {
  visible: boolean
  maskTransition?: string
  maskZIndex?: number
  dialogTransition?: string
  dialogClass?: string
  hideOnBlur?: boolean
  dialogStyle?: React.CSSProperties
  scroll?: boolean
  onHide?: Function
  onShow?: Function
  willUnmount?: Function
};

export default class Dialog extends Component<DialogProps, any> {
  state: State = {
    hidden: false
  }

  public wrap: any

  static defaultProps: DialogProps = {
    visible: false,
    maskTransition: 'lm-mask',
    dialogTransition: 'lm-dialog',
    dialogClass: 'lm-dialog',
    dialogStyle: {}
  }

  constructor(props) {
    super(props);
    // 创建包裹层
    this.wrap = React.createRef();
  }

  componentDidMount() {
    let { visible } = this.props;
    if (visible) this.open(visible);
    this.setState({
      hidden: visible
    });
  }

  componentWillReceiveProps(nextProps): void {
    let { visible } = nextProps;
    if (visible) this.open(visible);
    this.setState({
      hidden: nextProps.visible
    })
  }
  private open(visible: boolean): void {
    this.props.onShow(visible);
  }

  private close(visible: boolean): void {
    this.props.onHide(visible);
  }
  onTouchCancelHandle(event) {
    event.preventDefault()
  }
  onTouchEndHandle(event) {
    event.preventDefault()
  }
  onTouchMoveHandle(event) {
    event.preventDefault()
  }
  onTouchStartHandle(event) {
    event.preventDefault()
  }
  render() {
    let { visible, maskZIndex, dialogStyle, maskTransition, dialogTransition, children } = this.props;
    let { hidden } = this.state;
    return (
      <div className="lm-dialog-wrapper lm-dialog-absolute">
        <Transition name={maskTransition} onAfterLeave={() => this.props.willUnmount()}>
          <View show={hidden}>
            <div
              onTouchEnd={(e) => this.onTouchEndHandle(e)}
              onTouchMove={(e) => this.onTouchMoveHandle(e)}
              onTouchStart={(e) => this.onTouchStartHandle(e)}
              onMouseDown={(e) => this.onTouchStartHandle(e)}
              onMouseMove={(e) => this.onTouchMoveHandle(e)}
              onMouseUp={(e) => this.onTouchEndHandle(e)}

              style={maskZIndex ? { zIndex: maskZIndex } : {}} className="lm-mask" onClick={() => this.close(hidden)}></div>
          </View>
        </Transition>
        <Transition name={dialogTransition}>
          <View show={hidden}>
            <div style={dialogStyle} className="lm-dialog">{children}</div>
          </View>
        </Transition>
      </div>
    );
  };
};

