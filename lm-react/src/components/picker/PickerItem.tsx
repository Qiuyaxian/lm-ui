import React from 'react';
import { Component, View, isObject, Transition, ComponentProps, isEqual, querySelector, addEventHandle, removeEventHandle } from '@src/core';
import { PickerItemComponentProps, PickerItemState } from './PropsType'
import Scroller from './scroller'

interface PickerItemProps extends PickerItemComponentProps {

}

export class PickerItem extends Component<PickerItemProps, PickerItemState> {
  // 页面状态
  state: PickerItemState = {
    value: '',
    data: []
  }
  scroll: any

  wrap: any
  // 初始化 props 数据
  static defaultProps: PickerItemProps = {
    index: 0,
    value: '',
    data: []
  }

  constructor(props: PickerItemProps) {
    super(props);
  }
  componentDidMount() {
    let { data, value } = this.props;
    if (this.scroll) this.scroll = null;
    this.scroll = new Scroller();
    this.scroll.build(this.refs.container, {
      defaultValue: value,
      data: data
    })
    this.scroll.onChange((value, index) => {
      let { index: row } = this.props;
      this.props.onChange && this.props.onChange(value, row, index);
    })
  }

  componentWillReceiveProps(nextProps: PickerItemProps) {
    let { data: newData, value: newValue } = this.props;
    let { data: oldData, value: oldValue } = this.state;
    if (!isEqual(newData, oldData)) {
      this.scroll.build(this.refs.container, {
        defaultValue: newValue,
        data: newData
      })
    }
    if (!isEqual(newValue, oldValue)) {
      this.scroll.build(this.refs.container, {
        defaultValue: newValue,
        data: newData
      })
    }
  }
  componentWillMount() {
    this.scroll = null;
  }

  onTouchEndHandle(event) {
    this.scroll && this.scroll.touchEndHandler(event);
  }
  onTouchMoveHandle(event) {
    this.scroll && this.scroll.touchMoveHandler(event);
  }
  onTouchStartHandle(event) {
    this.scroll && this.scroll.touchStartHandler(event);
  }

  render() {
    let { data, value } = this.props;
    return (
      <div className="lm-picker-item" ref="container">
        <div
          onTouchStart={(e) => this.onTouchStartHandle(e)}
          onMouseDown={(e) => this.onTouchStartHandle(e)}

          onTouchEnd={(e) => this.onTouchEndHandle(e)}
          onMouseUp={(e) => this.onTouchEndHandle(e)}

          onTouchMove={(e) => this.onTouchMoveHandle(e)}
          onMouseMove={(e) => this.onTouchMoveHandle(e)}

          className="scroller-component" data-role="component">
          <div className="scroller-mask" data-role="mask"></div>
          <div className="scroller-indicator" data-role="indicator"></div>
          <div
            className="scroller-content" data-role="content">

            {
              isObject(data[0]) ? (
                (data as any[]).map((item, index) => {
                  return (
                    <div className="scroller-item"
                      key={index}
                      data-value={JSON.stringify({ 'value': encodeURI(item.value) })}>
                      {(item as any).name}
                    </div>
                  )
                })
              ) : (
                  (data as any[]).map((item, index) => {
                    return (<div key={index}
                      className="scroller-item"
                      data-value={JSON.stringify({ 'value': encodeURI(item) })}>{item}</div>)
                  })
                )
            }
          </div>
        </div>
      </div>
    );
  };
};

