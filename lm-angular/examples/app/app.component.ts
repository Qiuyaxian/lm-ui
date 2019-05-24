import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vup-angular';
  show: boolean = false
  clickHandle(): void {
  	this.show = true;
  	console.log('app.component.html')
  }
  hideHandle() {
  	console.log('nnnnnnnnnn')
  	this.show = false;
  }
}
