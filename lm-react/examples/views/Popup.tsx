import React from 'react';
import ReactDom from 'react-dom';
import { Component, ComponentProps } from '@src/core'
import { Page, Header, TransferDom, Group, PopupPicker, Popup, PopupHeader } from '@src/index'
//初始化页面
import china_address from './china_address_v4'

interface PopupProps extends ComponentProps {

}

export default class PopupPage extends Component<PopupProps, any> {
  constructor(props: PopupProps) {
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
      <Page header={<Header leftOptions={leftOptions} className={'lm-header-fixed'}>头部</Header>}>
        <Group>
          <PopupPicker data={list1} value={value1} label={'sds'}></PopupPicker>
          <PopupPicker showName={true} columns={3} data={addressData} value={address}></PopupPicker>
          <Group.Cell onCellClick={() => this.clickHandle()} label={'测试'}>调用Popup</Group.Cell>
        </Group>
        {/* <TransferDom>
          <Popup value={value}>
            <PopupHeader onClickRight={() => this.onClickRight()}></PopupHeader>
            <Group>
              <Group.Cell label={'测试'}>html调用</Group.Cell>
              <Group.Cell label={'测试'}>js调用</Group.Cell>
            </Group>
          </Popup>
        </TransferDom> */}
      </Page>
    );
  }
}
