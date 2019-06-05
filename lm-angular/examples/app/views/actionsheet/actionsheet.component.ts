import { Component } from '@angular/core';
import { LmActionsheetService, LmActionsheetProps } from '../../../../src/lm.module'
@Component({
  selector: 'actionsheet-page',
  templateUrl: './actionsheet.component.html',
  styleUrls: ['./actionsheet.component.scss']
})
export class ActionsheetComponent {
  title = 'lm-angular-demo';
  switchState: Boolean = false
  constructor(private actionsheet: LmActionsheetService) {}

  onClickMoreHandle () {
  	console.log('onClickMoreHandle')
  }
  onSwitchChangeHandle (value) {
    this.switchState = value;
  }
  showSyncHandle () {
    this.switchState = !this.switchState;
  }
  showHandle() {
    let data: LmActionsheetProps = {
      menus: this.menus,
      onAfterShow() {
        console.log('js ---- onAfterShowHandle')
      } 
    }
    this.actionsheet.showSync(data)
  }
  onClickMenuHandle(value) {
    console.log(value, 'onClickMenuHandle')
  }
  observableHandle() {
    let data: LmActionsheetProps = {
      menus: this.menus,
      // header: '头部'
    }
    this.actionsheet.show(data).subscribe((res: any) => {
      console.log(res, 'observable -- ShowHandle')
    });
  }
  onAfterShowHandle() {
    console.log('onAfterShowHandle', 'onAfterShowHandle')
  } 
  fours: any[] = []
  menus: Object = {
    menu1: 'Take Photo',
    menu2: 'Choose from photos'
  }
}
