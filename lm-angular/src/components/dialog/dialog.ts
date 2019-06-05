import {
  Input,
  Output,
  forwardRef,
  TemplateRef,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  ContentChild,
  ElementRef,
  OnInit,
  OnDestroy,
  SimpleChange,
  SimpleChanges,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
// 双响绑定
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SafeStyle } from '@angular/platform-browser';
import { 
  cleanStyle,
  querySelector,
  DialogAnimation,
  MaskAnimation 
} from '../../core';

@Component({
  selector: 'lm-dialog',
  templateUrl: './dialog.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [DialogAnimation, MaskAnimation],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LmDialog),
      multi: true,
    },
  ],
})
export class LmDialog implements ControlValueAccessor {
  // slot

  // props
  @Input('model') set model(val: boolean){
  	this.currentValue = val;
    this.controlChange(val);
  }
  @Input('mask-transition') maskTransition: string = 'lm-mask'
  @Input('mask-z-index') maskZIndex: string | number
  @Input('dialog-transition') dialogTransition: string = 'lm-dialog'
  @Input('dialog-class') dialogClass: string = 'lm-dialog'
  @Input('hide-on-blur') hideOnBlur: boolean
  @Input('dialog-style') dialogStyle: object
  @Input('is-scroll') isScroll: boolean = true


  // emit
  @Output('on-click-mask') readonly onClickMask: EventEmitter<any> = new EventEmitter<any>(); 
  @Output('on-change') readonly onChange: EventEmitter<boolean> = new EventEmitter<boolean>(); 
  @Output('on-show') readonly onShow: EventEmitter<boolean> = new EventEmitter<boolean>(); 
  @Output('on-hide') readonly onHide: EventEmitter<boolean> = new EventEmitter<boolean>(); 
  
  // data
  private currentValue: boolean = false
  private layout: string = '' 

  // methods
  // 关闭弹窗
  public hideHandle () {
    if (this.hideOnBlur) {
      this.changeHandle(false);
      this.onClickMask.emit();
    }
  }

  private shouldPreventScroll (): boolean {
    // hard to get focus on iOS device with fixed position, so just ignore it
    const iOS = /iPad|iPhone|iPod/i.test(window.navigator.userAgent)
    // const hasInput = querySelector('input', this.el) || querySelector('textarea', this.el);
    if (iOS) {
      return true
    }
    return false;
  }

  //
  private changeHandle(value: boolean): void {
    this.model = value;
    value ? this.onShow.emit(value) : this.onHide.emit(value)
  }

  // computed
  private maskStyle (): any {
    if (typeof this.maskZIndex !== 'undefined') {
      return {
        zIndex: this.maskZIndex
      }
    }
  }

  constructor(
    private el: ElementRef, 
  	private cdr: ChangeDetectorRef) {
  }
  
  // 下面是数据双向绑定
  writeValue(value: boolean): void {
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
}