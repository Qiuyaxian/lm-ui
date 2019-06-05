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
import { extend, copy, isEqual, isArray } from '../../../src/core'
import { LmGroupService } from '../group'
import { value2name, array2string } from './filters'

@Component({
  selector: 'lm-popup-picker',
  templateUrl: './popup-picker.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LmPopupPicker),
      multi: true,
    },
  ]
})
export class LmPopupPicker implements ControlValueAccessor, OnDestroy {
  // slot
  
  // props
  @Input('model') set model(val: any[]) {
    if (!isEqual(val, this.tempValue)) {
      this.tempValue = copy(val)
    }
    this.currentValue = val;
    this.controlChange(val);
    // this.$emit('input', getObject(val))
    // this.$emit('on-change', getObject(val))
  }
  get model(): any[] {
    return this.currentValue;
  }
   
  @Input('label') label: string = ''

  @Input('valueTextAlign') valueTextAlign: string = 'right'

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
  
  // data
  private currentValue: any[] = []
  private onShowProcess: boolean = false
  private tempValue: any[] = []
  private closeType: boolean = false
  private currentData: any = JSON.stringify(this.data) // used for detecting if it is after data change
  private showValue: boolean = false

  // computed 
  labelStyles () {
    return {
      display: 'block',
      width: (this.parent && (this.parent.labelWidth)) || 'auto',
      textAlign: this.parent && (this.parent.labelAlign)
      // marginRight: this.parent && (this.parent.labelMarginRight)
    }
  }
  labelClass () {
    return {
      'lm-cell-justify': this.parent && (this.parent.labelAlign === 'justify')
    }
  }
  getBorderIntent () {
    return (this.parent && this.parent.borderIntent) || this.borderIntent;
  } 
  // methods 
  
  getNameValues () {
    return value2name(this.currentValue, this.data)
  }
  clickHandle(event) {
    if (!this.disabled) {
      this.showValue = true
    }
  }
  
  value2name(value: any[]): any[] {
    return value2name(value);
  }
  onHide (type) {
    this.showValue = false
    if (type) {
      this.closeType = true
      this.currentValue = copy(this.tempValue)
    }
    if (!type) {
      this.closeType = false
      if (this.model.length > 0) {
        this.tempValue = copy(this.currentValue)
      }
    }
  }
  
  onPopupShow () {
    // reset close type to false
    this.closeType = false
    console.log('on-show')
    // this.$emit('on-show')
  }
  /**
   * [onPopupHide 弹出层隐藏]
   * @param  {[type]} val [description]
   * @return {[type]}     [description]
   */
  onPopupHide (val) {
    if (this.model.length > 0) {
      this.tempValue = copy(this.currentValue)
    }
    console.log('on-hide')
    // this.$emit('on-hide', this.closeType)
  }
  
  onPickerChange (val) {
    if (JSON.stringify(this.currentValue) !== JSON.stringify(val)) {
      // if has value, replace it
      if (this.model.length) {
        const nowData = JSON.stringify(this.data)
        if (nowData !== this.currentData && this.currentData !== '[]') {
          this.tempValue = copy(val)
        }
        this.currentData = nowData
      } else { // if no value, stay quiet
        // if set to auto update, do update the value
      }
    }
    const _val = copy(val)
    console.log(val, 'on-shadow-change')
    // this.$emit('on-shadow-change', _val, value2name(_val, this.data).split(' '))
  }
  
  // 关闭弹窗 => 插件调用
  
  constructor(private cdr: ChangeDetectorRef, public parent: LmGroupService) {
  }
  // 下面是数据双向绑定
  writeValue(value: any[]): void {
    if(isArray(value)) this.model = value;
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