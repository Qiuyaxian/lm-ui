import { Component } from '@angular/core';

@Component({
  selector: 'dialog-page',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  title = 'lm-angular-demo';
  switchState: Boolean = false
  onClickMoreHandle () {
  	console.log('onClickMoreHandle')
  }
  onSwitchChangeHandle (value) {
    this.switchState = value;
  }
  closeHandle () {
    this.switchState = false;
  }
  fours: any[] = []
  items: any[] = [
    {
      link: 'grid',
      label: 'grid'
    }
  ]
}
