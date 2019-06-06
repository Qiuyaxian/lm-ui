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
import { extend, isEqual } from '../../core'
import { name2value, value2name } from './filters'
import { LmGroupService } from '../group'
@Component({
  selector: 'lm-address',
  templateUrl: './address.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LmAddress),
      multi: true,
    },
  ],
})
export class LmAddress implements ControlValueAccessor, OnInit, OnChanges {
  // slot 插槽视图
  
  @Input('label') label: string
  
  @Input('model') set model(value: any[]) {
    if (value && !isEqual(value, this.currentValue)) {
      this.setCurrentValue(value)
    }
  }
  get model(): any[] {
    return this.currentValue;
  }
  @Input('rawValue') rawValue: boolean
  
  @Input('data') data: any[] = []
  
  @Input('label-width') labelWidth: string

  @Input('inline-desc') inlineDesc: string
  
  @Input('placeholder') placeholder: string 
  
  @Input('hide-district') hideDistrict: boolean  
  
  @Input('value-text-align') valueTextAlign: string 
  
  @Input('confirm-text') confirmText: string = '完成'
  
  @Input('cancel-text') cancelText: string = '取消'
  
  @Input('display-format') displayFormat: Function = (val, names) => names
  
  @Input('popup-style') popupStyle: object
  
  @Input('popup-title') popupTitle: string

  @Input('show') set show(value: boolean) {
    if (value && !isEqual(value, this.showValue)) {
      this.showValue = value;
    } 
  } 
  get show(): boolean {
    return this.showValue;
  }

  @Input('disabled') disabled: boolean  
  
  // emit
  @Output('input') input: EventEmitter<any> = new EventEmitter<any>(); 
  @Output('on-change') onChange: EventEmitter<any> = new EventEmitter<any>(); 
  @Output('on-show') onShow: EventEmitter<any> = new EventEmitter<any>(); 
  @Output('on-hide') onHide: EventEmitter<any> = new EventEmitter<any>(); 
  @Output('on-shadow-change') onShadowChange: EventEmitter<any> = new EventEmitter<any>(); 
  
  private currentValue: any[] = []
  private showValue: boolean = false

  nameValue () {
    return value2name(this.currentValue, this.data)
  }

  labelClass () {
    return {
      'lm-cell-justify': this.parent && this.parent.labelAlign === 'justify'
    }
  }
  
  _onHide ($event) {
    this.onHide.emit($event)
  }
   
  _onShow ($event) {
    this.onShow.emit($event);
  }
   
  getAddressName () {
    console.log(this.currentValue, 'this.currentValue')
    return value2name(this.currentValue, this.data)
  }
   
  onShadowChangeHandle ($event) {
    this.onShadowChange.emit($event)
  }
  
  constructor(
    private cdr: ChangeDetectorRef,
    private parent: LmGroupService) {
  }

  ngOnInit () {
    if (this.currentValue.length && this.rawValue) {
      const parsedVal = name2value(this.currentValue, this.data)
      if (/__/.test(parsedVal)) {
        this.currentValue = [];
      } else {
        this.currentValue = parsedVal.split(' ')
      }
    }
  }
  // 设置绑定数据
  setCurrentValue(val): void {
    if (val.length && !/\d+/.test(val[0])) {
      const id = name2value(val, this.data).split(' ')
      if (id[0] !== '__' && id[1] !== '__') {
        this.currentValue = id;
      }
    } else {
      this.currentValue = val || [];
    }
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }
  // 下面是数据双向绑定
  writeValue(value: any): void {
    this.currentValue = value;
    if (value && !isEqual(value, this.currentValue)) {
      this.setCurrentValue(value)
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    let { model, show } = changes;
    if (typeof model !== 'undefined' && !isEqual(model.currentValue, this.model)) {
      this.setCurrentValue(model.currentValue)
    }
    if (typeof show !== 'undefined' && !isEqual(show.currentValue, this.show)) {
      this.showValue = show.currentValue
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
    
  }
}