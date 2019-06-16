import React from 'react';
import ReactDom from 'react-dom';
import { Component, ComponentProps } from '@src/core'
import { Page, Header, Flexbox, Group, Scroll, Alert, TransferDom, AlertPlugins } from '@src/index'
//初始化页面

interface DemoProps extends ComponentProps {
  match: object
  location: object
  history: object
}

export default class DemoPage extends Component<DemoProps, any> {
  constructor(props: DemoProps) {
    super(props);
  }
  onChange(event) {

    this.setState({
      value: event
    })
  }
  state = {
    value: false
  }
  clickhandle() {
    // this.setState({
    //   value: true
    // })
    AlertPlugins({
      title: 'js调用',
      content: 'banana',
      onHide() {
        console.log('Demo')
      }
    })
  }
  onChangeHandle() {
    this.setState({
      value: false
    })
  }
  render() {
    let leftOptions = {
      showBack: false
    }
    let { value } = this.state
    let buttton = {
      width: '1rem',
      height: '1rem',
      background: 'red'
    }
    return (
      <Page
        header={<Header leftOptions={leftOptions}
          className={'lm-header-fixed'}>Alert</Header>}>
        <Scroll>

          <Group>
            <Group.Cell onCellClick={() => this.clickhandle()} label={'js方式调用'}></Group.Cell>
            <Group.Switch value={value} onChange={(e) => this.onChange(e)} switchLabel={'html方式调用'}></Group.Switch>
          </Group>
          <TransferDom>
            <Alert visible={value} onHide={() => this.onChangeHandle()}></Alert>
          </TransferDom>

        </Scroll>
      </Page>
    );
  }
}
