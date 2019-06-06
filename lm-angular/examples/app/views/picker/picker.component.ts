import { Component } from '@angular/core';

let years = []
for (var i = 2000; i <= 2030; i++) {
  years.push({
    name: i + '年',
    value: i + ''
  })
}

@Component({
  selector: 'picker-page',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss']
})
export class PickerComponent {
  title = 'lm-angular-demo'
  years: any[] = [years]
  year1: any[] = ['2018']
  year2: any[] = ['2018']
  year7Value: any[] = ['USA','usa002']
  year7: any[] = [
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
    },{
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
  onChange(value) {
    console.log(value, 'value')
  }
}
