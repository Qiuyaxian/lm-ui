import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';


import { 
  SafeUrl, 
  DomSanitizer 
} from '@angular/platform-browser'
// 基础democument, window对象
import { 
  DocumentWrapper, 
  WindowWrapper 
} from '../shared/services'

// 动画
import { 
  DialogAnimation, 
  MaskAnimation 
} from './dialog.animation'

// 传入参数
import { DialogProps } from './dialog.props'

@Component({
  selector: 'vup-dialog',
  exportAs: 'VupDialog',
  templateUrl: './dialog.component.html',
  // styleUrls: ['./dialog.component.scss'],
  animations: [DialogAnimation, MaskAnimation],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DialogComponent extends DialogProps implements OnDestroy {
  private _config: DialogProps;
  private observer: Observer<any>;  
  /**
   * get 与 set 配对 
   */
  //输入值 限制输入
  @Input() set config(value: DialogProps) {
    this._config = value;
  }
  // 获取配置
  get config(): DialogProps {
    return this._config;
  }
  // 初始化
  constructor(
    private DEF: DialogProps, 
    private cdr: ChangeDetectorRef
  ) {
    super();
  }
  /**
   * 显示，组件载入页面后并不会显示，显示调用 `show()` 并订阅结果。
   *
   */
  showHandle(): Observable<any> {
    this.show = true;
    // 提供组件内部更改数据监听 ngOnChanges不会监听到组件内部更改数据后的
    this.cdr.detectChanges();
    // 模拟动画结束后回调
    setTimeout(() => {
      this.emitShow.emit(this);
    }, 300);
    return Observable.create((observer: Observer<any>) => {
      this.observer = observer;
    });
  }

  /**
   * 隐藏
   *
   */
  hideHandle() {
    this.show = false;
    this.cdr.detectChanges();
    this.emitHide.emit(this);
    return this;
  }
  // 销毁
  ngOnDestroy(): void {
    if (this.observer && this.observer instanceof Subscription) {
      (this.observer as Subscription).unsubscribe();
    }
  }
}