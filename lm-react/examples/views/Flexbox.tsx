import React from 'react';
import ReactDom from 'react-dom';
import { Component, ComponentProps } from '@src/core'
import { Page, Header, Flexbox, Group, Scroll, Alert, TransferDom, AlertPlugins } from '@src/index'
//初始化页面

interface FlexboxProps extends ComponentProps {
  match: object
  location: object
  history: object
}

export default class FlexboxPage extends Component<FlexboxProps, any> {
  constructor(props: FlexboxProps) {
    super(props);
  }
  render() {
    let leftOptions = {
      showBack: false
    }
    return (
      <Page
        header={<Header leftOptions={leftOptions} className={'lm-header-fixed'}>Flexbox</Header>}>
        <Scroll>
          <Flexbox>
            <Flexbox.Item><div className="flex-demo">1</div></Flexbox.Item>
            <Flexbox.Item><div className="flex-demo">2</div></Flexbox.Item>
            <Flexbox.Item><div className="flex-demo">3</div></Flexbox.Item>
            <Flexbox.Item><div className="flex-demo">4</div></Flexbox.Item>
          </Flexbox>
          <Flexbox gutter={0}>
            <Flexbox.Item><div className="flex-demo">1</div></Flexbox.Item>
            <Flexbox.Item><div className="flex-demo">2</div></Flexbox.Item>
            <Flexbox.Item><div className="flex-demo">3</div></Flexbox.Item>
            <Flexbox.Item><div className="flex-demo">4</div></Flexbox.Item>
          </Flexbox>
        </Scroll>
      </Page>
    );
  }
}
