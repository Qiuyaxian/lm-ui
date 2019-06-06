import {
  NgZone,
  Input,
  Output,
  forwardRef,
  TemplateRef,
  HostListener,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Renderer2,
  EventEmitter,
  ViewChildren,
  QueryList,
  AfterViewChecked,
  OnInit,
  OnChanges,
  Inject,
  DoCheck,
  OnDestroy,
  SimpleChange,
  SimpleChanges,
  AfterContentInit,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
// 双向绑定
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Observable, Observer, Subscription } from 'rxjs';
import { SafeStyle } from '@angular/platform-browser';
import filter from 'array-filter'
declare var Object: any
import { 
  extend, 
  isArray, 
  isObject,
  addClass, 
  isBoolean, 
  isNull,
  isEqual,
  removeClass,
  copy
} from '../../../src/core'

import Scroller from './scroller'
import value2name from './filters'
import { LmPickerItem } from './picker-item'
interface dataProps {
  name: string
  value: string | number
  parent?: string | number
}
@Component({
  selector: 'lm-picker',
  templateUrl: './picker.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LmPicker),
      multi: true,
    },
  ]
})
export class LmPicker implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
  // dom
  @ViewChildren(LmPickerItem) PickerItems: QueryList<LmPickerItem>

  //
  @Input('columns') columns: number = 0
  
  @Input('data') set data(value: any[]) {
    if (value && !isEqual(value, this._oldData)) {
      this._oldData = copy(value);
    }
  }
  @Input('model') set model(value: any[]) {
    if (value && !isEqual(value, this._model)) {
      this._model = value;
    }
  }
  get model(): any[] {
    return this._model
  }
  @Input('fixed-columns') fixedColumns: number = 0
 
  @Input('item-class') itemClass: String = 'scroller-item'
  @Input('column-width') columnWidth: Array<number | string>
  
  // emit
  @Output('input') input: EventEmitter<any> = new EventEmitter<any>(); 
  @Output('on-change') onChange: EventEmitter<any> = new EventEmitter<any>(); 
  
  // data
  private uuid: string
  private _model: any[] = []
  private _data: any[] = []
  private _oldData: any[] = []

  constructor(
    private cdr: ChangeDetectorRef
    ) {
  }
  // 
  ngOnInit() {
    this.uuid = Math.random().toString(36).substring(3, 8);
    setTimeout(() => {
      this.updateData(this._oldData);
      this.updateModel(this._model);
      this.render();
    }, 10)
  }
  // 监听数据变化
  ngOnChanges(changes: SimpleChanges): void {
    let { columns, model, data } = changes;
    // 如果外面传入值与内部绑定值不一致
    if(model && model.currentValue && !isEqual(model.currentValue, this._model)) {
      // 重新渲染视图
      this.updateData(this._oldData);
      this.updateModel(model.currentValue);
      this.render();
    }
    if (data && data.currentValue && !isEqual(data.currentValue, this._oldData)) {
      // 更新内部数据
      this._oldData = copy(data.currentValue);
      this.updateData(data.currentValue);
      this.updateModel(this._model);
      this.render();
    }
  }
  
  private updateData(value): void {
    if (this.columns !== 0) {
      this._data = this.dataCheck(this._model);
    } else {
      if (this.columns === 0 && value.length > 1) {
        value = [value[0]]
      }
      this._data = copy(value);
    }
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }
  
  updateModel(value) {
    if (value.length) {
      let _data = this._data;
      if (this.columns !== 0) {
        if (_data.length && value.length < _data.length) {
          for (let i = 0; i < _data.length; i++) {
            let item = _data[i][0].value || _data[i][0]
            value[i] = value[i] ? value[i] : item;
          }
        } 
      }
      this._model = value;
    }
  }
  // 渲染视图
  private render(): void {
    let PickerItems = this.PickerItems && this.PickerItems['_results'] ? this.PickerItems['_results'] : [];
    let _model = this._model;
    for (let i = 0; i < _model.length; i++) {
      PickerItems[i] && PickerItems[i].select(_model[i], false, false)
    }
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }
  // 获取当前值
  private getValue (): any[] {
    return this._model.filter(item => item);
  }
  // 通过关联的parent遍历获取下一个子项数据
  private getChildren (value: any): any {
    // 通过循环遍历得出与当前相符的数据
    return filter(this._oldData, one => {
      return one.parent === value
    })
  }
  // 获取多列第一个项的数据
  private getFirstColumn (): any {
    return filter(this._oldData, one => {
      return !one.parent || one.parent === 0 || one.parent === '0'
    })
  }
  // 
  private onSelectHandle(val): void  {
    let _model = this._model;
    _model[val.row] = val.value;
    this.updateView(val.row + 1, val.value);
  }
  // 检查数据，并处理
  private dataCheck (value): any {
    console.log(value, 'list')
    // check is data contains the values
    if (value.length > 0) {
      // 查找是否有绑定值与相等
      const matchCount = (copy(this._oldData) as any).filter((item) => {
        return (copy(value) as any).indexOf(item.value) > -1
      }).length
      if (matchCount < (copy(value) as any).length) {
        value = []
      }
    }
    var datas = [];
    const max = this.fixedColumns || 8
    for (var i = 0; i < max; i++) {
      if (i === 0) {
        // 设置第一列数据,为后面数据提供初始数据
        datas.push(this.getFirstColumn())
      } else {
        // 没有数据时,取得上一级的第一个
        if (!value[i]) {
          if (typeof datas[i - 1][0] === 'undefined') {
            break
          } else {
            // 取得上一个
            const topValue = datas[i - 1][0].value
            datas.push(this.getChildren(topValue))
          }
        } else {
          datas.push(this.getChildren(value[i - 1]))
        }
      }
    }
    const list = datas.filter((item) => {
      return item.length > 0
    })
    return list;
  }
  // 更新视图
  private updateView(i, val) {
     let _data = this._oldData;
     let _model = this._model;
     let PickerItems = this.PickerItems && this.PickerItems['_results'] ? this.PickerItems['_results'] : [];
     let res = _data.filter(item => {
       return item.parent === val
     });
     if(res.length !== 0) {
       res.forEach((item, index) => {
         this._data[i][index] = item
       })
       let item = res[0].value || res[0];
       _model[i] && (_model[i] = item)
       // PickerItems[i] &&.clear();
       PickerItems[i] && PickerItems[i].select(item, false, false)
       this.updateView(i + 1, item);
     } else {
       let _model = this.getValue();
       this.writeValue(_model);
       this.onChange.emit(_model);
       this.controlChange(_model);
       // this.cdr.markForCheck();
       // this.cdr.detectChanges();
     }
  }
  // 下面是数据双向绑定
  writeValue(value: any): void {
    if (isArray(value)) this.updateModel(value);
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