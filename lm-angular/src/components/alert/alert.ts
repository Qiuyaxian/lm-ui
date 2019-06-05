import {
  Input,
  Output,
  forwardRef,
  TemplateRef,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  ContentChild,
  OnInit,
  OnDestroy,
  SimpleChange,
  SimpleChanges,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
// 双向绑定
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Observer, Subscription } from 'rxjs';
import { SafeStyle } from '@angular/platform-browser';
import { extend } from '../../../src/core'
import { LmAlertProps } from './alert.props'
@Component({
  selector: 'lm-alert',
  templateUrl: './alert.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LmAlert),
      multi: true,
    },
  ],
})
export class LmAlert implements ControlValueAccessor, OnDestroy {
  // slot
  @ContentChild('body') body: TemplateRef<any>

  // props
  @Input('model') set model(val: boolean){
  	this.currentValue = val;
    this.controlChange(val);
    this.input.emit(val);
  }
  @Input('title') title: string
  @Input('content') content: string
  @Input('buttonText') buttonText: string
  @Input('mask-transition') maskTransition: string = 'lm-mask'
  @Input('mask-z-index') maskZIndex: string | number
  @Input('dialog-transition') dialogTransition: string = 'lm-dialog'
  @Input('hide-on-blur') hideOnBlur: boolean
  
  // emit
  @Output('input') input: EventEmitter<boolean> = new EventEmitter<boolean>(); 
  @Output('on-show') onShow: EventEmitter<any> = new EventEmitter<any>(); 
  @Output('on-hide') onHide: EventEmitter<any> = new EventEmitter<any>(); 
  
  // data
  private currentValue: boolean = false
  private observer: Observer<any>
  private layout: string = ''
  // methods 
  
  // shouldPreventScroll () {
  //   // hard to get focus on iOS device with fixed position, so just ignore it
  //   const iOS = /iPad|iPhone|iPod/i.test(window.navigator.userAgent)
  //   const hasInput = this.$el.querySelector('input') || this.$el.querySelector('textarea')
  //   if (iOS && hasInput) {
  //     return true
  //   }
  // }
  // 关闭弹窗 => 插件调用
  public showHandle(data: LmAlertProps): Observable<any> {
    this.showSync(data);
    return Observable.create((observer: Observer<any>) => {
      this.observer = observer;
    });
  }
  public hideHandle(): void {
    if(this.observer){
      this.observer.next(false);
      this.observer.complete();
    }
    this.model = false;
    this.cdr.detectChanges();
    this.onHide.emit();
  }
  // 同步
  public showSync(data: LmAlertProps): void {
    this.title = data.title;
    this.content = data.content;
    // 模拟动画结束后回调
    let timer = setTimeout(() => {
      this.model = true;
      this.onShow.emit();
      this.cdr.detectChanges();
    }, 0);
  }
  // computed
  private maskStyle (): any {
    if (typeof this.maskZIndex !== 'undefined') {
      return {
        zIndex: this.maskZIndex
      }
    }
  }
  // watch => show 和 hide 都调用
  private changeHandle(value: boolean): void {
    this.model = value;
    value ? this.onShow.emit() : this.onHide.emit()
  }

  constructor(
  	private cdr: ChangeDetectorRef) {
  }
  // 下面是数据双向绑定
  writeValue(value: any): void {
    this.model = value;
  }
 
  private controlChange: Function = () => {}
  private controlTouch: Function = () => {}
  // private onTouched: any = Function.prototype;
  
  registerOnChange(fn: Function): void {
    this.controlChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.controlTouch = fn;
  }

  ngOnDestroy(): void {
    if (this.observer && this.observer instanceof Subscription) {
      (this.observer as Subscription).unsubscribe();
    }
  }
}