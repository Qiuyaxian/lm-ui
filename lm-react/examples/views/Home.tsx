import React from 'react';
import ReactDom from 'react-dom';
import { Component, ComponentProps } from '@src/core'
import { Page, Header, Grid, Group } from '@src/index'
//初始化页面

interface HomeProps extends ComponentProps {
  match: object
  location: object
  history: object
}

let cellLists = [
  {
    label: 'header',
    link: '/header'
  },
  {
    label: 'cell',
    link: '/cell'
  },
  {
    label: 'grid',
    link: '/grid'
  },
  {
    label: 'flexbox',
    link: '/flexbox'
  },
  {
    label: 'switch',
    link: '/switch'
  },
  {
    label: 'alert',
    link: '/alert'
  },
  {
    label: 'dialog',
    link: '/dialog'
  },
  {
    label: 'popup',
    link: '/popup'
  },
  {
    label: 'picker',
    link: '/picker'
  },
  {
    label: 'popup-picker',
    link: '/popup-picker'
  },
  {
    label: 'address',
    link: '/address'
  },
  {
    label: 'actionsheet',
    link: '/actionsheet'
  }

]


export default class HomePage extends Component<HomeProps, any> {

  constructor(props: HomeProps) {
    super(props);
  }

  render() {
    let cells = [];
    for (let i = 0; i < cellLists.length; i++) {
      let { label, link } = cellLists[i]
      cells.push(<Group.Cell key={i} link={link} label={label}></Group.Cell>)
    }
    return (
      <Page header={<Header className={'lm-header-fixed'}>React demo</Header>}>
        <Group>
          {cells}
        </Group>
      </Page>
    );
  }
}
