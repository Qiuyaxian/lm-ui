import React from 'react';
import { Component, View, Transition } from '@src/core';
import { MaskState, MaskComponentProps } from './PropsType'

interface MaskProps extends MaskComponentProps {

}

export class Mask extends Component<MaskProps, MaskState> {
  state: MaskState = {
    hidden: false
  }
  static defaultProps: MaskProps = {
    show: false,
    maskTransition: 'lm-mask'
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { show } = this.props;
    this.setState({
      hidden: show
    });
  }
  private isMobile: boolean = false
  private lastTimeStamp: number = 0
  private timeStamp: number = 0;
  private lastDistance: number = 0
  private distance: number = 0
  private isDragging: boolean = false

  componentWillReceiveProps(nextProps) {
    let { show } = nextProps;
    this.setState({
      hidden: nextProps.show
    })
  }
  private onTouchCancelHandle(event): void {
    event.preventDefault()

  }
  private onTouchEndHandle(event): void {
    event.preventDefault()
    this.isDragging = false;
    let lastDistance = this.lastDistance;
    let distance = this.distance;
    let timeStamp = this.timeStamp;
    let lastTimeStamp = this.lastTimeStamp;
    if (Math.abs(lastTimeStamp - timeStamp) <= 300 && Math.abs(distance - lastDistance) < 20) {
      this.onMaskClick();
    }
  }
  private onTouchMoveHandle(event): void {
    event.preventDefault()
    let ev = (event as any);
    const touches = ev.touches;
    const target = ev.touches ? ev.touches[0] : ev;
    if (!!ev.touches) {
      this.distance = target.pageY;
      this.timeStamp = ev.timeStamp;
    }
  }
  private onTouchStartHandle(event): void {
    event.preventDefault()
    let ev = (event as any);
    const touches = ev.touches;
    const target = ev.touches ? ev.touches[0] : ev;
    if (!!ev.touches) {
      this.lastDistance = this.distance = target.pageY;
      this.lastTimeStamp = this.timeStamp = ev.timeStamp;
    }
  }
  private onMaskClick(): void {
    this.props.onMaskClick && this.props.onMaskClick();
  }

  render() {
    let { show, maskZIndex, maskTransition } = this.props;
    let { hidden } = this.state;
    return (
      <Transition
        name={maskTransition} onAfterLeave={() => this.props.onHide && this.props.onHide()
        }>
        <View show={hidden}>
          <div
            onClick={() => this.onMaskClick()}
            onTouchEnd={(e) => this.onTouchEndHandle(e)}
            onTouchMove={(e) => this.onTouchMoveHandle(e)}
            onTouchStart={(e) => this.onTouchStartHandle(e)}
            style={this.style({
              'cursor': 'pointer',
              'zIndex': maskZIndex
            })}
            className="lm-mask"
          ></div>
        </View>
      </Transition>
    );
  };
};

