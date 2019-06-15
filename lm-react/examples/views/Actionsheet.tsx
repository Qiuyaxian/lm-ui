import React from 'react';
import ReactDom from 'react-dom';
import { Component, ComponentProps } from '@src/core'
import { Page, Header, TransferDom, Group, Actionsheet, ActionsheetPlugins } from '@src/index'
//初始化页面

interface ActionsheetProps extends ComponentProps {

}

export default class ActionsheetPage extends Component<ActionsheetProps, any> {
  constructor(props: ActionsheetProps) {
    super(props);
  }

  state = {
    value: false,
    show1: false,
    menus1: {
      menu1: 'Share to friends',
      menu2: 'Share to timeline'
    },
  }
  clickHandle2() {

    let { value, show1, menus1 } = this.state

    ActionsheetPlugins({
      menus: menus1
    })
  }
  clickHandle() {
    this.setState({
      show1: true
    });
  }
  onAfterLeave() {
    console.log('onAfterLeave', 'onAfterLeave')
  }
  onAfterEnter() {
    console.log('onAfterEnter')
  }
  render() {
    let leftOptions = {
      showBack: false
    }
    let { value, show1, menus1 } = this.state
    let buttton = {
      width: '1rem',
      height: '1rem',
      background: 'red'
    }

    return (
      <Page header={<Header leftOptions={leftOptions} className={'lm-header-fixed'}>头部</Header>}>

        <Group>
          <Group.Cell onCellClick={() => this.clickHandle()} label={'测试'}>html调用</Group.Cell>
          <Group.Cell onCellClick={() => this.clickHandle2()} label={'测试'}>js调用</Group.Cell>
        </Group>

        <TransferDom>
          <Actionsheet onAfterEnter={() => this.onAfterEnter()} onAfterLeave={() => this.onAfterLeave()} showCancel={true} value={show1} menus={menus1}></Actionsheet>
        </TransferDom>
      </Page>
    );
  }
}
