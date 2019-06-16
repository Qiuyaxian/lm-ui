import React from 'react';
import ReactDom from 'react-dom';
import { Component, ComponentProps } from '@src/core'
import { Page, Header, TransferDom, Group, PopupPicker, Popup, PopupHeader } from '@src/index'
//初始化页面
import china_address from './china_address_v4'

interface PopupPickerProps extends ComponentProps {

}

export default class PopupPickerPage extends Component<PopupPickerProps, any> {
  constructor(props: PopupPickerProps) {
    super(props);
  }

  state = {
    value: false,
    value1: ['iPhone'],
    addressData: china_address,
    address: ['150000', '150100', '150102'],
    list1: [
      ['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你'],
      ['小米1', 'iPhone2', '华为3', '情怀4', '三星5', '其他6', '不告诉你7']
    ]
  }
  clickHandle() {

  }
  onClickRight() {
    this.setState({
      value: false
    })
  }
  render() {
    let { value, list1, value1, addressData, address } = this.state;
    let leftOptions = {
      showBack: false
    }
    return (
      <Page header={<Header leftOptions={leftOptions} className={'lm-header-fixed'}>popup-picker</Header>}>
        <Group>
          <PopupPicker data={list1} value={value1} label={'popup-picker'}></PopupPicker>
        </Group>
      </Page>
    );
  }
}
