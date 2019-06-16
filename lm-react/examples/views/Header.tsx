import React from 'react';
import ReactDom from 'react-dom';
import { Component, ComponentProps } from '@src/core'
import { Page, Header, Scroll, AlertPlugins } from '@src/index'
//初始化页面

interface HeaderProps extends ComponentProps {
  match: object
  location: object
  history: object
}

export default class DemoPage extends Component<HeaderProps, any> {
  constructor(props: HeaderProps) {
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
      <Page>
        <Header leftOptions={leftOptions}>Header</Header>
        <br />
        <Header left={'左边'} right={'右边'} leftOptions={{
          showBack: true
        }}>头部</Header>
      </Page>
    );
  }
}
