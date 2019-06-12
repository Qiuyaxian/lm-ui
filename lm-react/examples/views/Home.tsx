import React from 'react';
import ReactDom from 'react-dom';
import { Component, ComponentProps } from '@src/core'
import { Page, Header, Grid } from '@src/index'
//初始化页面

interface HomeProps extends ComponentProps {
  match: object
  location: object
  history: object
}

let grids = []
for (let i = 0; i < 9; i++) {
  grids.push({
    'link': '/demo',
    'label': 'grid',
    'icon': 'https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg'
  })
}

export default class HomePage extends Component<HomeProps, any> {
  state = {
    flag: true
  }
  constructor(props: HomeProps) {
    super(props);
  }
  public grids: any[] = grids
  private clickHandle() {
  }
  private hideHandle() {
  }
  private showHandle() {
    console.log('showHandle')
  }
  render() {
    let grids = [];
    for (let i = 0; i < this.grids.length; i++) {
      let { icon, label, link } = this.grids[i]
      grids.push(<Grid.Item key={i} link={link} icon={icon} label={label}></Grid.Item>)
    }
    return (
      <Page
        header={<Header onClickBack={() => this.showHandle()} className={'lm-header-fixed'}>头部</Header>}>
        <Grid cols={3} showBorders={true}>
          {grids}
        </Grid>
      </Page>
    );
  }
}
