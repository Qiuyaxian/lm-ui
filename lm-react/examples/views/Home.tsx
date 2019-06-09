import React from 'react';
import ReactDom from 'react-dom';

import { Component, ComponentProps } from '@src/core'
import { Page } from '@src/index'

//初始化页面

interface HomeProps extends ComponentProps {

}

export default class HomePage extends Component<HomeProps, any> {
  state = {
    flag: true
  }
  constructor(props: HomeProps) {
    super(props);
  }

  private clickHandle() {
  }
  private hideHandle() {
  }
  private showHandle() {
  }
  render() {

    return (
      <Page>
        <Page.Header>
          默认fsfsdsdsf
          <div slot="right">右边自定义</div>

          <div>默认fsfsdsdsf</div>

          <div slot="left">
            <div slot="left-nav">
              左边
            </div>
          </div>
        </Page.Header>
        首页
        <Page.Footer></Page.Footer>
      </Page>
    );
  }
}