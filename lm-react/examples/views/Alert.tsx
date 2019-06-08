import React from 'react';
import { TransferDom, Dialog, Alert } from '@src/index'
import { Component } from '@src/core'
//初始化页面
interface State {
  flag: boolean
}
export default class AlertPage extends Component<any, any> {
  state: State = {
    flag: true
  }
  constructor(props) {
    super(props);
    console.log('dsfsdf')
  }
  render() {
     
    return (
      <div>
         AlertPage
      </div>
    );
  }
}