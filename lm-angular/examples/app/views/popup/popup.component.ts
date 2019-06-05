import { Component } from '@angular/core';

let items = [];
for (let i = 0; i < 20; i++) {
  items.push({
    label: `测试${ i }`
  })
}

@Component({
  selector: 'popup-page',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  title = 'lm-angular-popup';
  switchState: Boolean = false
  switchState2: Boolean = false
  onClickMoreHandle () {
  	console.log('onClickMoreHandle')
  }
  onSwitchChangeHandle (value) {
    // this.switchState = value
  }
  clickHandle () {
    console.log(this.switchState, 'switchState')
  }
  showHandle() {
    console.log('show');
  }
  hideHandle() {
    console.log('hide');
  }
  fours: any[] = []
  items: any[] = items
}
