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
  forwardRef
} from '@angular/core';
import {ControlValueAccessor,NG_VALUE_ACCESSOR} from '@angular/forms';

import { Observable, Observer, Subscription } from 'rxjs';

import { 
  SafeUrl, 
  DomSanitizer 
} from '@angular/platform-browser'
import { 
  DocumentWrapper, 
  WindowWrapper 
} from '../shared/services'
import { AlertProps } from './alert.props'
// 定义ACCESSOR类
export const PAGER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AlertComponent),
  multi: true
};
// :mask-transition="maskTransition"
// :dialog-transition="dialogTransition"
@Component({
  selector: 'vup-alert',
  exportAs: 'VupAlert',
  templateUrl: `./alert.component.html`,
  // 依赖注入
  // providers:[PAGER_CONTROL_VALUE_ACCESSOR]
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
  // animations: [DialogAnimation, MaskAnimation]
})// ControlValueAccessor
export class AlertComponent extends AlertProps implements OnDestroy{
  
  
  //输入值 限制输入
  @Input() set config(value: AlertProps) {
    this._config = value;
  }
  
  // 获取配置
  get config(): AlertProps {
    return this._config;
  }

  private _config: AlertProps;
  private observer: Observer<any>;  

  // 初始化
  constructor(
    private DEF: AlertProps, 
    private cdr: ChangeDetectorRef
  ) {
    super();
  }
  // // writeValue - 写入值，data从model流向view
  // writeValue(val: boolean): void {
  //   this.config.value = val;
  // }
  // // registerOnChange - 注册值改变后的回调
  // registerOnChange(fn: any): void {
  //   this.onShow. = fn;
  // }
  // // registerOnTouched - 注册失去焦点事件后的回调
  // registerOnTouched(fn: any): void {
  //   this._onTouched = fn;
  // }
  // setDisabledState - angular会在control的disabled状态改变时调用此方法
  setDisabledState?(isDisabled: boolean): void {
  }
  
  showHandle (): void {
    this.show = true;
  } 
  hideHandle (): void {
    this.show = false;
  }
  ngOnDestroy(): void {

  }
}