import React from 'react';
import ReactDom from 'react-dom';
import { Component, ComponentProps } from '@src/core'
import { Page, Header, Flexbox, Group, Scroll, Picker } from '@src/index'
//初始化页面

interface PickerProps extends ComponentProps {

}
let years = []
for (var i = 2000; i <= 2030; i++) {
  years.push({
    name: i + '年',
    value: i + ''
  })
}

export default class PickerPage extends Component<PickerProps, any> {
  constructor(props: PickerProps) {
    super(props);
  }

  state = {
    years: [years],
    year1: ['2018'],
    year7Value: ['USA', 'usa002'],
    year7: [
      {
        name: '中国',
        value: 'china',
        parent: 0
      }, {
        name: '美国',
        value: 'USA',
        parent: 0
      }, {
        name: '广东',
        value: 'china001',
        parent: 'china'
      }, {
        name: '广西',
        value: 'china002',
        parent: 'china'
      }, {
        name: '美国001',
        value: 'usa001',
        parent: 'USA'
      }, {
        name: '美国002',
        value: 'usa002',
        parent: 'USA'
      }, {
        name: '美国003',
        value: 'usa003',
        parent: 'USA'
      }, {
        name: '广州',
        value: 'gz',
        parent: 'china001'
      }, {
        name: '深圳',
        value: 'sz',
        parent: 'china001'
      }, {
        name: '广西001',
        value: 'gx',
        parent: 'china002'
      }, {
        name: '广西002',
        value: 'sx',
        parent: 'china002'
      }, {
        name: '美国001_001',
        value: '0003',
        parent: 'usa001'
      }, {
        name: '美国001_002',
        value: '0004',
        parent: 'usa001'
      }, {
        name: '美国002_001',
        value: '0005',
        parent: 'usa002'
      }, {
        name: '美国002_002',
        value: '0006',
        parent: 'usa002'
      },
      {
        name: '美国003_001',
        value: '0007',
        parent: 'usa003'
      }
    ]
  }
  onChange(value) {
    this.setState({
      year1: value
    })
  }
  onChange2(value) {
    this.setState({
      year7Value: value
    })
  }
  render() {
    let leftOptions = {
      showBack: false
    }
    let { year1, years, year7, year7Value } = this.state

    return (
      <Page
        header={<Header leftOptions={leftOptions} className={'lm-header-fixed'}>Picker</Header>}>
        {year1}
        <Picker onChange={(e) => this.onChange(e)} data={years} model={year1}></Picker>
        {year7Value}
        <Picker onChange={(e) => this.onChange2(e)} columns={3} data={year7} model={year7Value}></Picker>
      </Page>
    );
  }
}
