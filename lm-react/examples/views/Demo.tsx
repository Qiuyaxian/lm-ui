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
        header={<Header leftOptions={leftOptions} className={'lm-header-fixed'}>头部</Header>}>
        <Scroll>
          <Flexbox>
            <Flexbox.Item><div className="flex-demo">1</div></Flexbox.Item>
            <Flexbox.Item><div className="flex-demo">2</div></Flexbox.Item>
            <Flexbox.Item><div className="flex-demo">3</div></Flexbox.Item>
            <Flexbox.Item><div className="flex-demo">4</div></Flexbox.Item>
          </Flexbox>

          <Group header={<Group.Title>头部</Group.Title>}>
            <Group.Cell label={'测试'}>wrw</Group.Cell>
            <Group.Cell label={'测试'}>wrw</Group.Cell>
            <Group.Switch valueMap={['假', '真']} value={value} onChange={(e) => this.onChange(e)} switchLabel={'测试'}>wrw</Group.Switch>
          </Group>
          <div style={this.style(buttton)} onClick={() => this.clickhandle()}>点击</div>
          <TransferDom>
            <Alert visible={value} onHide={() => this.onChangeHandle()}></Alert>
          </TransferDom>

        </Scroll>
      </Page>
    );
  }
}
