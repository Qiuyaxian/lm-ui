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
} from '../../../src/utils'

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
  encapsulation: ViewEncapsulation.None
})
export class LmPicker implements DoCheck, AfterViewChecked, OnInit, OnChanges, OnDestroy, AfterContentInit {
  // slot
  @ViewChildren(LmPickerItem) PickerItems: QueryList<LmPickerItem>
  // props
  @Input('columns') columns: number = 0
  @Input('fixed-columns') fixedColumns: number = 0
 
  @Input('item-class') itemClass: String = 'scroller-item'
  @Input('column-width') columnWidth: Array<number | string>
  
  // emit
  @Output('input') input: EventEmitter<any> = new EventEmitter<any>(); 
  @Output('on-change') onChange: EventEmitter<any> = new EventEmitter<any>(); 
  
  // 外部传入值
  @Input('model') set model(value: any[]){
    this.currentValue = value;
    // 强制刷新
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }
  get model(): any[] {
    return this.currentValue;
  }
  // 外部绑定值
  @Input('data') set data(value: any[]) {
    let old = this._oldData;
    // 判断数据是否有更改 => 重新渲染页面
    if (!isEqual(value, old)) {
      this._oldData = value;
      // 强制刷新
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    }
  }
  get data(): any[] {
    return this._oldData;
  }
  // data 
  private set currentData(value: any[]) {
    this._currentData = value;
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }
  private get currentData(): any[] {
    return this._currentData;
  }
  
  private _currentData: any[] = [];
  private currentValue: any[] = [];
  private _oldData: any;
  private observer: Observer<any>
  private store: any
  private uuid: String
  private count: Number = 0
  private flag: boolean = false
  getValue () {
    return this.model.filter(item => item);
  }
  // 通过关联的parent遍历获取下一个子项数据
  getChildren (value: any): any {
    // 通过循环遍历得出与当前相符的数据
    return filter(this.data, one => {
      return one.parent === value
    })
  }
  // 获取多列第一个项的数据
  getFirstColumn (): any {
    return filter(this.data, one => {
      return !one.parent || one.parent === 0 || one.parent === '0'
    })
  }
  // 检查数据，并处理
  dataCheck (value): any {
    // check is data contains the values
    if (value.length > 0) {
      // 查找是否有绑定值与相等
      const matchCount = (copy(this.data) as any).filter((item) => {
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
    return list
  }
  /**
   * [onSelectHandle 选中后触发回调]
   * @param {[type]} val [description]
   */
  onSelectHandle(val) {
    let model = this.model;
    this.model[val.row] = val.value;
    if (this.columns !== 0) {
      this.render(val.row + 1, val.value)
    } else {
      this.onChange.emit(this.getValue())
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    }
  }
  /**
   * [render 渲染界面]
   * @param {[type]} i   [description]
   * @param {[type]} val [description]
   */
  render(i, val) {
     // 设定绑定值
     let oldData = this.data;
     let PickerItems = this.PickerItems && this.PickerItems['_results'] ? this.PickerItems['_results'] : [];
     let res = oldData.filter(item => {
       return item.parent === val
     });
     if(res.length !== 0) {
       res.forEach((item, index) => {
         this.currentData[i][index] = item
       })
       let item = res[0].value || res[0];
       this.model[i] && (this.model[i] = item)
       PickerItems[i] && PickerItems[i].select(item, false, false)
       this.render(i + 1, item)
     } else {
       // this.model[i] && (this.model[i] = null);
       // PickerItems[i] && PickerItems[i].select(res[0].value || res[0], false)
       this.onChange.emit(this.getValue())
       this.cdr.markForCheck();
       this.cdr.detectChanges();
     }
  }
  // 关闭弹窗 => 插件调用
  // computed
  
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  	private cdr: ChangeDetectorRef) {
    // 动态生成标记
    this.uuid = Math.random().toString(36).substring(3, 8)
  }
  ngOnInit() {
    if (this.columns !== 0) {
      // 多列
      let _data = this.dataCheck(this.model);
      this.currentData = _data;
      let PickerItems = this.PickerItems && this.PickerItems['_results'] ? this.PickerItems['_results'] : [];
      let value = this.model;
      let timer = setTimeout(() => {  
        if (value.length < _data.length) {
          for (let i = 0; i < _data.length; i++) {
            let item = (_data[i][0].value || _data[i][0])
            this.model[i] = this.model[i] ? this.model[i] : item;
            PickerItems[i] && PickerItems[i].select(this.model[i], false, false)
          }
        } else {
          for(let i = 0; i < value.length; i++) {
            PickerItems[i] && PickerItems[i].select(value[i], false, false)
          } 
        }
        clearTimeout(timer);
      })
    } else {
      // 单列
      let _data = this.data;
      this.currentData = _data;
      let PickerItems = this.PickerItems && this.PickerItems['_results'] ? this.PickerItems['_results'] : [];
      let value = this.model;
      let timer = setTimeout(() => {
        if (this.model.length) {
          for(let i = 0; i < value.length; i++) {
            PickerItems[i] && PickerItems[i].select(value[i], false, false)
          }
        } else {
          for (let i = 0; i < _data.length; i++) {
            this.model[i] = _data[i][0].value || _data[i][0];
            PickerItems[i] && PickerItems[i].select(this.model[i], false, false)
          }
        }
        clearTimeout(timer);
      })
    }
  }
  updateViewHandle (): void {
    if(this.cdr) {
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    }
  }
  ngAfterContentInit() {
    
  }
  ngDoCheck() {
    
  }
  ngAfterViewChecked(){
  }
  // 监听外部更新
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes,'picker-item.html')  
  }

  ngOnDestroy(): void {
    
  }
}