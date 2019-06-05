import { Component } from '@angular/core';

@Component({
  selector: 'switch-page',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent {
  title = 'lm-angular-demo';
  switchState: Boolean = false
  onClickMoreHandle () {
  	console.log('onClickMoreHandle')
  }
  onSwitchChangeHandle (value) {
    // this.switchState = value
  }
  clickHandle () {
    console.log(this.switchState, 'switchState')
  }
  fours: any[] = []
  items: any[] = [
    {
      link: 'grid',
      label: 'grid'
    }
  ]
}
