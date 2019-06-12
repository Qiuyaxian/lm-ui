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
  constructor(
    public cdr: ChangeDetectorRef
    ) {
    let list = [];
    for (let i = 0; i < 3; i++) {
      list.push({
        link: '/home',
        img: 'http://img1.shikee.com/try/2016/06/21/10172020923917672923.jpg_220x220.jpg',
        title: '上课时间',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
      })
    }
    this.list = list;
  }
  list: any[] = []
  total: number = 5
  page: number = 1
  pullingUpHandle (finish) {
    if (this.page > this.total) {
      finish && finish();
      return;
    }
    let timer = setTimeout(() => {
      // let list = [];
      // for (let i = 0; i < 10; i++) {
      //   list.push({
      //     link: '/home',
      //     img: 'http://img1.shikee.com/try/2016/06/21/10172020923917672923.jpg_220x220.jpg',
      //     title: '上课时间',
      //     desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
      //   })
      // }
      // this.list = this.list.concat(list);
      // event.finish && event.finish();
      // ++this.page;
      finish && finish();
    }, 5000)
  }
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
    },
    {
      link: 'popup-picker',
      label: 'popup-picker'
    }
  ]
}
