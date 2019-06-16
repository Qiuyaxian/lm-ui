import React from 'react';
import ReactDom from 'react-dom';
import { Component, ComponentProps } from '@src/core'
import { Page, Header, Group, Scroll, Dialog, TransferDom } from '@src/index'
//初始化页面

interface DialogProps extends ComponentProps {
  match: object
  location: object
  history: object
}

export default class DialogPage extends Component<DialogProps, any> {
  constructor(props: DialogProps) {
    super(props);
  }
  onChange(value) {
    this.setState({
      value: value
    })
  }
  state = {
    value: false
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
        header={<Header leftOptions={leftOptions} className={'lm-header-fixed'}>Dialog</Header>}>
        <Scroll>

          <Group header={<Group.Title>Dialog</Group.Title>}>
            <Group.Switch value={value} onChange={(e) => this.onChange(e)} switchLabel={'Dialog'}></Group.Switch>
          </Group>
          <TransferDom>
            <Dialog visible={value}>
              <div className="img-box">
                <img src="https://ws1.sinaimg.cn/large/663d3650gy1fq6824ur1dj20ia0pydlm.jpg"
                  style={{
                    'maxWidth': '100%'
                  }} alt="" />
              </div>
              <div onClick={() => this.onChange(false)}>
                <span className="lm-close"></span>
              </div>
            </Dialog>
          </TransferDom>
        </Scroll>
      </Page>
    );
  }
}
