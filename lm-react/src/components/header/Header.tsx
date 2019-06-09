import React, { Children } from 'react';
import { Component, View, Transition, ComponentProps } from '@src/core';

import HeaderLeft from './HeaderLeft'
import HeaderRight from './HeaderRight'
import HeaderTitle from './HeaderTitle'
import { Slot } from '../slot'
// header 组件
interface HeaderProps extends ComponentProps {

};

// {
//   React.Children.map(this.props.children, (children) => {
//     console.log(children, 'children')
//     if (children.type) {
//       let { componentName } = children.type;

//       if (SlotMap[componentName]) {
//         return React.cloneElement(children)
//       } else {

//         return SlotMap[componentName]
//       }

//     } else {
//       return React.cloneElement(children)
//     }
//   })
// }
export default class Header extends Component<HeaderProps, any> {
  static componentName = 'Header'
  static left: any = HeaderLeft
  static right: any = HeaderRight
  static title: any = HeaderTitle

  state = {}

  wrap: any

  static defaultProps: HeaderProps = {

  }

  constructor(props: HeaderProps) {
    super(props);
  }


  render(): React.ReactElement<any> {


    let SlotMap = {
      'HeaderLeft': <HeaderLeft></HeaderLeft>,
      'HeaderTitle': <HeaderTitle></HeaderTitle>,
      'HeaderRight': <HeaderRight></HeaderRight>,
    }
    // let ChildrenMap = {};

    // React.Children.forEach(this.props.children, (Children) => {
    //   if (Children.type.componentName) {
    //     ChildrenMap[Children.type.componentName] = Children;
    //   }
    // })
    // for (let key in SlotMap) {
    //   if (ChildrenMap[key]) {
    //     SlotMap[key] = ChildrenMap[key];
    //   }
    // }
    // let values = Array.from([...Object.values(SlotMap)])

    // const { visible, title, size, top, modal, customClass, showClose, children } = this.props;
    return (
      <div>
        <Slot childrens={this.props.children}>
          <div slot="left">
            <Slot childrens={this.props.children}>
              <div slot="left-nav">具名</div>
              <div slot="left-mene">menu</div>
            </Slot>
          </div>
          <div slot="default">布局吗</div>
          <div slot="right">测试</div>
        </Slot>
      </div>
    );
  };
};

