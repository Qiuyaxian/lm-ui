import React from 'react';
import { Component, View, Transition, PropTypes } from '../../core';

type State = {
  hidden: boolean
};

interface DialogProps {
  visible: boolean;
  maskTransition?: string;
  maskZIndex?: number;
  dialogTransition?: string;
  dialogClass?: string;
  hideOnBlur?: boolean;
  dialogStyle?: React.CSSProperties
  scroll?: boolean;
  onHide?: Function
  onShow?: Function
};

export default class Dialog extends Component<DialogProps, any> {
  state: State = {
    hidden: false
  }

  public wrap: any

  static defaultProps: DialogProps = {
    visible: false,
    maskTransition: 'vup-mask',
    dialogTransition: 'vup-dialog',
    dialogClass: 'vup-dialog',
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
  // 判定当前是否是打开 
  // willOpen(prevProps: Object, nextProps: Object): boolean {
  //   return (!prevProps.visible && nextProps.visible);
  // }

  // willClose(prevProps: Object, nextProps: Object): boolean {
  //   return (prevProps.visible && !nextProps.visible);
  // }

  private open(visible: boolean): void {
    this.props.onShow(visible);
  }

  private close(visible: boolean): void {
    this.props.onHide(visible);
  }

  render() {
    let { visible, maskZIndex, dialogStyle, maskTransition, dialogTransition, children } = this.props;
    let { hidden } = this.state;
    return (
      <div className="vup-x-dialog vup-dialog-absolute">
        <Transition name={maskTransition}>
          <View show={hidden}>
            <div style={maskZIndex ? { zIndex: maskZIndex } : {}} className="vup-mask" onClick={() => this.close(hidden)}></div>
          </View>
        </Transition>
        <Transition name={dialogTransition}>
          <View show={hidden}>
            <div style={dialogStyle} className="vup-dialog">{children}</div>
          </View>
        </Transition>
      </div>
    );
  };
};

