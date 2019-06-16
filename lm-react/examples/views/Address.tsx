import React from 'react';
import ReactDom from 'react-dom';
import { Component, ComponentProps } from '@src/core'
import { Page, Header, TransferDom, Group, PopupPicker, Popup, PopupHeader } from '@src/index'
//初始化页面
import china_address from './china_address_v4'

interface AddressProps extends ComponentProps {

}

export default class AddressPage extends Component<AddressProps, any> {
  constructor(props: AddressProps) {
    super(props);
  }

  state = {
    value: false,
    addressData: china_address,
    address: ['150000', '150100', '150102']
  }
  clickHandle() {

  }
  onClickRight() {
    this.setState({
      value: false
    })
  }
  render() {
    let { value, addressData, address } = this.state;
    let leftOptions = {
      showBack: false
    }
    return (
      <Page header={<Header leftOptions={leftOptions} className={'lm-header-fixed'}>Address</Header>}>
        <Group>
          <PopupPicker label={'省市区'} showName={true} columns={3} data={addressData} value={address}></PopupPicker>
        </Group>

      </Page>
    );
  }
}
