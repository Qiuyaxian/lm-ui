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
  DoCheck,
  OnChanges,
  OnDestroy,
  SimpleChange,
  SimpleChanges,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Observer, Subscription } from 'rxjs';
import { SafeStyle } from '@angular/platform-browser';
import { extend, copy, isEqual, isArray } from '../../../src/core';
import { value2name, array2string, name2value } from '../../filters';
import { LmGroupService } from '../group';

@Component({
  selector: 'lm-popup-picker',
  templateUrl: './popup-picker.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LmPopupPicker),
      multi: true,
    },
  ]
})
export class LmPopupPicker implements ControlValueAccessor, OnInit, DoCheck, OnDestroy {
  // slot

  // props
  @Input('model') set model(val: any[]) {
    if (val && !isEqual(val, this.tempValue)) {
      this.tempValue = copy(val)
    }
    this.setCurrentValue(val)
  }
  get model(): any[] {
    return this.currentValue;
  }
   
  @Input('label') label: string = ''

  @Input('value-text-align') valueTextAlign: string = 'right'

  @Input('cancel-text') cancelText: string = '取消'

  @Input('confirm-text') confirmText: string = '完成'
  
  @Input('data') data: any[] = []
  
  @Input('placeholder') placeholder: string
  
  @Input('columns') columns: number = 0
   
  @Input('fixed-columns') fixedColumns: number = 0
  
  @Input('show-name') showName: boolean
  
  @Input('inline-desc') inlineDesc: string | number
  
  @Input('show-cell') showCell: boolean = true
  // 内部控制显示
  @Input('show') set show(value: boolean) {
    this.showValue = value
  }
  // 使用作用域模版实现 
  @Input('display-format') displayFormat: Function
  
  @Input('is-transfer-dom') isTransferDom: boolean = true
  
  @Input('column-width') columnWidth: number | string
  
  @Input('popup-style') popupStyle: object = {}

  @Input('popup-title') popupTitle: string
  
  @Input('disabled') disabled: boolean
   
  @Input('borderIntent') borderIntent: boolean = false
  
  // emit
  @Output('input') input: EventEmitter<any> = new EventEmitter<any>(); 
  @Output('on-change') onChange: EventEmitter<any> = new EventEmitter<any>(); 
  @Output('on-show') onShow: EventEmitter<any> = new EventEmitter<any>(); 
  @Output('on-hide') onHide: EventEmitter<any> = new EventEmitter<any>(); 
  @Output('on-shadow-change') onShadowChange: EventEmitter<any> = new EventEmitter<any>(); 
  
  // data
  private currentValue: any[] = []
  private onShowProcess: boolean = false
  private tempValue: any[] = []
  private closeType: boolean = false
  private currentData: any = JSON.stringify(this.data) // used for detecting if it is after data change
  private showValue: boolean = false

  // computed 
  private labelStyles(): any {
    return {
      display: 'block',
      width: (this.parent && (this.parent.labelWidth)) || 'auto',
      textAlign: this.parent && (this.parent.labelAlign)
    }
  }
  private labelClass(): any {
    return {
      'lm-cell-justify': this.parent && (this.parent.labelAlign === 'justify')
    }
  }
  private getBorderIntent(): any {
    return (this.parent && this.parent.borderIntent) || this.borderIntent;
  } 

  // methods 
  private privategetNameValues(): void {
    return value2name(this.currentValue, this.data)
  }

  private clickHandle(event): void {
    if (!this.disabled) {
      this.showValue = true
    }
  }
  
  private value2name(value: any[], data: any[]): any[] {
    return value2name(value, data);
  }

  private onHideHandle(type): void {
    this.showValue = false
    if (type) {
      this.closeType = true
      this.currentValue = copy(this.tempValue);
      this.input.emit(this.currentValue)
      this.onChange.emit(this.currentValue)
    }
    if (!type) {
      this.closeType = false
      if (this.currentValue.length > 0) {
        this.tempValue = copy(this.currentValue)
      }
    }
  }
  
  private onPopupShow(): void {
    // reset close type to false
    this.closeType = false

    this.onShow.emit(this.closeType);
  }
  /**
   * [onPopupHide 弹出层隐藏]
   * @param  {[type]} val [description]
   * @return {[type]}     [description]
   */
  private onPopupHide(val): void {
    if (this.currentData.length > 0) {
      this.tempValue = copy(this.currentValue)
    }
    this.onHide.emit(this.closeType)
  }
  
  private onPickerChange(val): void {
    if (!isEqual(val, this.currentValue)) {
      // if has value, replace it
      if (this.currentData.length) {
        const nowData = JSON.stringify(this.data)
        if (nowData !== this.currentData && this.currentData !== '[]') {
          this.tempValue = copy(val)
        }
        this.currentData = nowData
      } else { // if no value, stay quiet
        // if set to auto update, do update the value
      }
    }
    const _val = copy(val);
    this.writeValue(_val);
    this.onShadowChange.emit({
      'ids': _val,
      'names': value2name(_val, this.data).split(' ')
    });
    this.controlChange(_val);
  }
  
  // 关闭弹窗 => 插件调用
  constructor(
    private cdr: ChangeDetectorRef,
    public parent: LmGroupService) {
  }

  ngOnInit() {
    
  }
  
  ngDoCheck() {
     
  }
  setCurrentValue(val: any): void {
    if (!isEqual(val, this.currentValue)) {
      if (val && val.length && !/\d+/.test(val[0])) {
        const id = name2value(val, this.data).split(' ')
        if (id[0] !== '__' && id[1] !== '__') {
          this.currentValue = id
          return
        }
      }
      this.currentValue = val;
    }
  }
  // 下面是数据双向绑定
  writeValue(value: any) {
    this.setCurrentValue(value)
    if (value && !isEqual(value, this.tempValue)) {
      this.tempValue = copy(value)
    }
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
    // if (this.observer && this.observer instanceof Subscription) {
    //   (this.observer as Subscription).unsubscribe();
    // }
  }
}