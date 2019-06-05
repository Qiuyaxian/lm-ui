import { 
  Component,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('scroll') scroll: any
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
  pullingUpHandle () {
    setTimeout(() => {
      if (this.page > this.total) {
        this.scroll.forceUpdate(false);
        return;
      }
      let items = this.items;
      let newItems = JSON.parse(JSON.stringify(items.concat(items.splice(0, 10))))
      newItems.forEach((item, index) => { 
        if (!items[index]) {
          this.items[index] = item
        } else if (JSON.parse(JSON.stringify(item)) !== JSON.parse(JSON.stringify(items[index]))) {
          this.items[index] = item
        }
      })
      this.items = items.concat(items)
      this.total = 3;
      ++this.page;
      this.scroll.forceUpdate(false);
    }, 2000);
  }
  constructor(
    public cdr: ChangeDetectorRef
    ) {
  }
  total: number = 1
  page: number = 1
  fours: any[] = []
  items: any[] = [
    {
      link: 'grid',
      label: 'grid'
    },
    {
      link: 'cell',
      label: 'cell'
    },
    {
      link: 'switch',
      label: 'switch'
    },
    {
      link: 'dialog',
      label: 'dialog'
    },
    {
      link: 'alert',
      label: 'alert'
    },
    {
      link: 'actionsheet',
      label: 'actionsheet'
    },
    {
      link: 'popup',
      label: 'popup'
    },
    {
      link: 'flexbox',
      label: 'flexbox'
    },
    {
      link: 'picker',
      label: 'picker'
    }
  ]
}
