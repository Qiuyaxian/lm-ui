import { Component,ChangeDetectorRef } from '@angular/core';

import china_address from '../../../../src/components/address/china_address_v4'

@Component({
  selector: 'popup-picker-page',
  templateUrl: './popup-picker.component.html',
  styleUrls: ['./popup-picker.component.scss']
})
export class PopupPickerComponent {
  title = 'lm-angular-demo'
  title1: string = '手机机型'
  value1: any[] = ['iPhone']
  test1: any[] = ['双向绑定1','双向绑定2']
  test2: any[] = ['单向绑定1','单向绑定2' ]
  test3: any[] = [{value: '单双向绑定1'},{value: '单双向绑定2'}]
  
  value: any[] = ['150000','150100','150102']
  addressData: any = china_address
  showAddress: boolean = false
  index: number = 1
  clickHandle() {
    this.index = this.index+1;
    let test1 = this.test1;
    let test2 = this.test2;
    test1[0] = `双向绑定${ this.index }`
    this.test1 = JSON.parse(JSON.stringify(test1));
    test2[0] = `单向绑定${ this.index }`
    this.test2 = JSON.parse(JSON.stringify(test2));
    this.test3[0].value = `单双向绑定${ this.index }`
    this.cdr.detectChanges();
    this.cdr.markForCheck();
  }
  show() {
    console.log('show')
  }
  hide() {
    console.log('hide')
  }
   constructor(
    private cdr: ChangeDetectorRef) {
  } 
  shadowChange(value) {
    console.log(value, 'shadowChange')
  }
  logHide (str) {
    console.log('on-hide', str)
  }
  logShow (str) {
    console.log('on-show')
  }
  onShadowChange2 (ids, names) {
    console.log(ids, names)
  }
 
  change (value) {
    console.log('change', value)
  }
  onChange (val) {
    console.log('change', val)
  }
  log (str1, str2 = '') {
    console.log(str1, str2)
  }
  
  list1:any[] = [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你'], ['小米1', 'iPhone2', '华为3', '情怀4', '三星5', '其他6', '不告诉你7']]
}
