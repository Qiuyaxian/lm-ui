import { Component } from '@angular/core';

@Component({
  selector: 'cell-page',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {
  title = 'lm-angular-demo';
  switchState: Boolean = false
  onClickMoreHandle () {
  	console.log('onClickMoreHandle')
  }
  onSwitchChangeHandle (value) {
    this.switchState = value
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
