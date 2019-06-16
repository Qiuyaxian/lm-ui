import React from 'react';
import ReactDom from 'react-dom';
import { Component, ComponentProps } from '@src/core'
import { Page, Header, Group, Scroll } from '@src/index'
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
    console.log(event, 'event')
    this.setState({
      value: event
    })
  }
  state = {
    value: false
  }

  render() {
    let leftOptions = {
      showBack: false
    }
    let { value } = this.state;
    return (
      <Page
        header={<Header leftOptions={leftOptions} className={'lm-header-fixed'}>Switch</Header>}>
        <Scroll>
          <Group header={<Group.Title>Switch</Group.Title>}>
            <Group.Switch value={value} onChange={(e) => this.onChange(e)} switchLabel={'测试'}>wrw</Group.Switch>
            <Group.Switch valueMap={['假', '真']} value={value} onChange={(e) => this.onChange(e)} switchLabel={'测试'}>wrw</Group.Switch>
          </Group>
        </Scroll>
      </Page>
    );
  }
}
