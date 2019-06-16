import React from 'react';
import ReactDom from 'react-dom';
import { Component, ComponentProps } from '@src/core'
import { Page, Header, Scroll, Grid } from '@src/index'
//初始化页面

interface GridProps extends ComponentProps {
  match: object
  location: object
  history: object
}
let grids = []
for (let i = 0; i < 9; i++) {
  grids.push({
    'label': 'grid',
    'icon': 'https://www.jzmt168.com/static/images/goods/3fded81b-c84c-463b-92b7-16765fa0b362.jpg'
  })
}
export default class GridPage extends Component<GridProps, any> {
  constructor(props: GridProps) {
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

  render() {
    let leftOptions = {
      showBack: false
    }
    let gridLists = [];
    let gridLists2 = [];
    for (let i = 0; i < grids.length; i++) {
      let { label, icon } = grids[i]
      gridLists.push(<Grid.Item key={i} icon={icon} label={label}></Grid.Item>)
      gridLists2.push(<Grid.Item key={i} label={label} iconSlot={<img src={icon} alt="" />}>
      </Grid.Item>)
    }
    return (
      <Page
        header={<Header leftOptions={leftOptions} className={'lm-header-fixed'}>Grid</Header>}>
        <Scroll>
          <Grid>
            {gridLists}
          </Grid>
          <Grid>
            {gridLists2}
          </Grid>
        </Scroll>
      </Page>
    );
  }
}
