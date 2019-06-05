import { Component } from '@angular/core';

@Component({
  selector: 'popup-picker-page',
  templateUrl: './popup-picker.component.html',
  styleUrls: ['./popup-picker.component.scss']
})
export class PopupPickerComponent {
  title = 'lm-angular-demo'
  title1: string = '手机机型'
  value1: any[] = ['iPhone']
  list1:any[] = [
    [
      {
        name: '小米',
        value: '小米'
      },
      {
        name: 'iPhone',
        value: 'iPhone'
      },
      {
        name: '华为',
        value: '华为'
      },
      {
        name: '情怀',
        value: '情怀'
      },
      {
        name: '其他',
        value: '其他'
      },
      {
        name: '不告诉你',
        value: '不告诉你'
      }
    ]
  ]
}
