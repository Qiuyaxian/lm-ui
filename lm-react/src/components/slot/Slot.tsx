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
  slotHandle(slot, elems) {
    // console.log(this.props.childrens, 'childrens')
    // console.log(this.props.name, 'name')
    // console.log(this.props.children, 'this.props.children')
    // 第一步 首先拿出旧数据中存在的 具名 slot ,直接直接返回后面 默认 插槽
    // 第二步 分离出具名插槽，判断是否与默认的插槽相匹配，不匹配则返回 为默认插槽
    // 第三部，合并处理后的插槽数据， 并输出
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
        console.log(child.props.child, slotmap[child.props.slot]['elem'])
        this.slotHandle(child.props.child, slotmap[child.props.slot]['elem'].props.children)
        slotmap[child.props.slot] = {
          index: index,
          elem: slotmap[child.props.slot]['elem']
        }
      } else {
        if (child.props && child.props.slot && child.props.slot !== 'default') {
          console.log(child.props.slot, 'child.props.slot')
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

