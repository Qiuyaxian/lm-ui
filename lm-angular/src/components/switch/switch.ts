import {
  Input,
  Output,
  ElementRef,
  forwardRef,
  TemplateRef,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  ContentChild,
  OnInit,
  OnChanges,
  OnDestroy,
  SimpleChange,
  SimpleChanges,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
// 双响绑定
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SafeStyle } from '@angular/platform-browser';
import { cleanStyle, replaceVNodeHTMLElement } from '../../core';
import { LmGroupService } from '../group';

interface SwitchProps {
  newVal: any
  oldVal: any	
}

@Component({
  selector: 'lm-switch',
  templateUrl: './switch.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LmSwitch),
      multi: true,
    },
  ],
})
export class LmSwitch implements ControlValueAccessor, OnInit, OnChanges  {
  // slot
  @ContentChild('inlineDesc') inlineDescView: TemplateRef<any>
  
  // props
  @Input('name') name: string
  @Input('label') label: string
  @Input('disabled') disabled: boolean
  @Input('borderIntent') borderIntent: boolean
  @Input('inlineDesc') inlineDesc: any
  @Input('preventDefault') preventDefault: boolean
  @Input('valueMap') valueMap: any[]  = [false, true]
  @Input('model') set model(val: boolean | number){
  	this.currentValue = val;
    this.onChange(val);
  }

  // emit
  @Output('on-switch-click') readonly onSwitchClick: EventEmitter<SwitchProps> = new EventEmitter<SwitchProps>(); 
  @Output('input') readonly input: EventEmitter<any> = new EventEmitter<any>(); 
  @Output('on-switch-change') readonly onSwitchChange: EventEmitter<any> = new EventEmitter<any>(); 
  
  // data
  private currentValue: boolean | number
  
  // computed 
  private labelStyle (): SafeStyle {
    // let isHTML: string = /<\/?[^>]*>/.test(this.label)
    // let width = Math.min(isHTML ? 5 : (this.label.length + 1), 14) + 'em'
    return cleanStyle({
      display: 'block',
      // width: this.parent.labelWidth || width,
      width: this.parent.labelWidth,
      textAlign: this.parent.labelAlign
    })
  }
  private labelClass (): object {
    return {
      'lm-cell-justify': this.parent.labelAlign === 'justify'
    }
  }
  private get getBorderIntent (): boolean {
    return (this.parent && this.parent.borderIntent) || this.borderIntent;
  }
  // methods 
  /**
   * [onSwitchClick 点击事件]
   * @return {[type]} [description]
   */
  private onClick(): void {
  	let switchVal: SwitchProps = { 
  	  newVal: !this.currentValue, 
  	  oldVal: this.currentValue 
  	}
    this.onSwitchClick.emit(switchVal)
  }
  /**
   * [toBoolean 转化为布尔值]
   * @param  {[type]} val [description]
   * @return {[type]}     [description]
   */
  private toBoolean (val: any): any {
    if (!this.valueMap) {
      return val
    } else {
      const index = this.valueMap.indexOf(val)
      return index === 1
    }
  }
  /**
   * [toRaw description]
   * @param  {[type]} val [description]
   * @return {[type]}     [description]
   */
  private toRaw (val: any): any {
    if (!this.valueMap) {
      return val
    } else {
      return this.valueMap[val ? 1 : 0]
    }
  }
  // watch
  private changeHandle(value: boolean | number): void {
    this.model = value;
    const rawValue = this.toRaw(value)
    this.input.emit(value)
    this.onSwitchChange.emit(value);
  }

  constructor(
    private el: ElementRef,
  	public parent: LmGroupService, 
  	private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    const nativeElement = this.el.nativeElement
    replaceVNodeHTMLElement(nativeElement)
  }

  writeValue(value: boolean | number): void {
    this.model = value;
  }
  // 监听外部更新
  ngOnChanges(changes: SimpleChanges): void {
    
  }
 
  private onChange: Function = () => {}
  private onTouched: Function = () => {}
  // private onTouched: any = Function.prototype;

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }
}