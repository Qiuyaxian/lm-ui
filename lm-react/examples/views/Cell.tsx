import React from 'react';
import ReactDom from 'react-dom';
import { Component, ComponentProps } from '@src/core'
import { Page, Header, Flexbox, Group, Scroll, Alert, TransferDom, AlertPlugins } from '@src/index'
//初始化页面

interface CellProps extends ComponentProps {
  match: object
  location: object
  history: object
}

export default class CellPage extends Component<CellProps, any> {
  constructor(props: CellProps) {
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
    return (
      <Page
        header={<Header leftOptions={leftOptions} className={'lm-header-fixed'}>Cell</Header>}>
        <Scroll>
          <Group header={<Group.Title>Cell</Group.Title>}>
            <Group.Cell label={'左侧'}>内容</Group.Cell>
            <Group.Cell label={'左侧'}>内容</Group.Cell>
            <Group.Cell isLink label={'左侧'}>isLink</Group.Cell>
            <Group.Cell link={'/home'} label={'左侧'}>前往home</Group.Cell>
          </Group>
        </Scroll>
      </Page>
    );
  }
}
