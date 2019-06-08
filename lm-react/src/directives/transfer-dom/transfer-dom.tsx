// Thanks to: https://github.com/calebroseland/vue-dom-portal
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class TransferDom extends Component<any, any>{
  
  static state = { }

  container: any
  
  constructor(props) {
    super(props);
  }

  // 向document 进行dom 移动操作
  appendComponentView () {
    const { children } = (this.props as any);
    if (children) {
      ReactDOM.unstable_renderSubtreeIntoContainer(this, children,
      this.container);
    }
  }
  
  componentWillMount () { 
  }
  
  componentDidMount () {
    let { 'v-transfer-dom': value } = this.props;
    if (value !== false) {
      let hasMovedOut = false;
      let container = document.createElement('div');
      container.className = container.className ? container.className + ' v-transfer-dom' : 'v-transfer-dom'
      this.container = container;
      document.body.appendChild(this.container);
      this.appendComponentView(); 
    }    
  }

  // 重新渲染dom
  // shouldComponentUpdate (nextProps, nextState) { 
  //   if(nextProps.someThings === this.props.someThings){
  //     return false
  //   }
  // }

  componentWillReceiveProps () { 
  }
  componentWillUpdate () { 
  }
  
  componentDidUpdate () {
    this.appendComponentView(); 
  }
   
  componentWillUnmount () {
    // 移除
    document.body.removeChild(this.container); 
  }

  // 16版本新增 getDerivedStateFromProps无论是Mounting还是Updating，也无论是因为什么引起的Updating，全部都会被调用
  // 返回一个对象来更新状态，或者返回null来不更新任何内容。
  // getDerivedStateFromProps () {}
  // 16版本新增
  // 调用于render之后，可以读取但无法使用DOM的时候。它使您的组件可以在可能更改之前从DOM捕获一些信息（例如滚动位置）。
  // 此生命周期返回的任何值都将作为参数传递给componentDidUpdate（）
  // getSnapshotBeforeUpdate () { }
  render (): React.ReactElement<any> {
    //此处返回null 避免报错
    return null; 
  }
}