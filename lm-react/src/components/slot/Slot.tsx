import React, { Children } from 'react';
import { Component, View, Transition, ComponentProps } from '@src/core';

interface SlotProps extends ComponentProps {
  childrens: any
};

export default class Slot extends Component<SlotProps, any> {
  state = {

  }


  constructor(props) {
    super(props);
    // 创建包裹层
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps): void {

  }
  slotHandle2(slot, newSlot) {
    let oldslotmap = {}, oldslotset = []
    let newslotmap = {}, newslotset = []
    // 优先处理默认slot 处理
    React.Children.forEach(slot, (child, index) => {
      if (child.props && child.props.children && React.isValidElement(child.props.children)) {
        console.log(child.props.children, 'slot children')
        // this.slotHandle2(child.props.children)
      } else {
        if (child.props && child.props.slot && child.props.slot !== 'default') {
          // 最后一级slot
          console.log(child.props, 'slot slot')
        } else {
          // 文字
          console.log(child, 'slot 文字')
        }
      }
    });

    React.Children.forEach(newSlot, (child, index) => {

      if (child.props && child.props.children && React.isValidElement(child.props.children)) {
        // 同时拥有下级别
        console.log(child.props.children, 'newSlot children')
      } else {
        if (child.props && child.props.slot) {
          // 最后一级slot
          console.log(child.props, 'newSlot slot')
        } else {
          // 文字
          console.log(child, 'newSlot 文字')
        }

      }
    });
  }

  slotHandle(slot, elems) {
    let slotmap = {}, slotset = [];
    // 新
    React.Children.forEach(elems, (child, index) => {
      if (child.props && child.props.slot && child.props.slot !== 'default') {
        slotmap[child.props.slot] = {
          index: index,
          elem: child
        }
      } else {
        slotset.push({
          index: index,
          elem: child
        });
      }
    });
    // 旧
    let setslotmap = {}, setdefaultmap = []

    React.Children.forEach(slot, (child, index) => {
      if (child.props && child.props.slot && slotmap[child.props.slot]) {
        // this.slotHandle(child.props.child, slotmap[child.props.slot]['elem'].props.children)
        slotmap[child.props.slot] = {
          index: index,
          elem: slotmap[child.props.slot]['elem']
        }
      } else {
        if (child.props && child.props.slot && child.props.slot !== 'default') {
          // console.log(child.props.slot, 'child.props.slot')
          slotmap[child.props.slot] = {
            index: index,
            elem: child
          }
        } else {
          setdefaultmap.push({
            index: index,
            elem: slotset
          });
        }
      }
    });
    let res = [];
    for (let key in slotmap) {
      res[slotmap[key]['index']] = slotmap[key]['elem']
    }
    setdefaultmap.forEach((item, index) => {
      if (Array.isArray(item['elem'])) {
        item['elem'].forEach((slot, i) => {
          res.splice(item['index'] + i, 0, slot['elem'])
        })
      } else {
        res.splice(item['index'], 0, item['elem'])
      }

    })
    // console.log(res, elems, 'child.props.children')
    return res;
  }
  render() {


    let res = this.slotHandle(this.props.children, this.props.childrens)
    return (
      <div>
        {
          React.Children.map(res, (child) => {
            return React.isValidElement(child) ? React.cloneElement(child) : child
          })
        }
      </div>
    );
  };
};

