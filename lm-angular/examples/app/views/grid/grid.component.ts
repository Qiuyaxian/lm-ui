import { Component } from '@angular/core';

@Component({
  selector: 'grid-page',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  title = 'lm-angular-grid';
  onClickMoreHandle () {
  	console.log('onClickMoreHandle')
  }
  fours: any[] = []
  items: any[] = [1, 2, 3, 4, 5]
}
