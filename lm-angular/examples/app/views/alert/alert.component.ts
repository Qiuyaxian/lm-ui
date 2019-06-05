import { Component } from '@angular/core';
import { LmAlertService, LmAlertProps } from '../../../../src/lm.module'
@Component({
  selector: 'alert-page',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  title = 'lm-angular-demo';
  switchState: Boolean = false
  constructor(private alert: LmAlertService) {}

  onClickMoreHandle () {
  	console.log('onClickMoreHandle')
  }
  onSwitchChangeHandle (value) {
    this.switchState = value;
  }
  showSyncHandle () {
    let config: LmAlertProps = {
      title:'消息',
      content: '回调调用',
      onHide: () => {
        console.log('取消');
      },
      onShow: () => {
        console.log('打开')
      }
    }
    this.alert.showSync(config);
  }
  showHandle() {
    let config: LmAlertProps = {
      title:'消息',
      content: 'Observable调用',
      onHide: () => {
        console.log('取消');
      },
      onShow: () => {
        console.log('打开')
      }
    }
    this.alert.show(config).subscribe((res: any) => {
      console.log(res);
    });
  }
  fours: any[] = []
  items: any[] = [
    {
      link: 'grid',
      label: 'grid'
    }
  ]
}
