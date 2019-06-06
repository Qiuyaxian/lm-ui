import {
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
  ContentChild,
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

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Observer, Subscription } from 'rxjs';
import { SafeStyle } from '@angular/platform-browser';

declare var window: any;

import { 
  querySelector, 
  isObject, 
  isArray,
  isEqual,
  replaceVNodeHTMLElement 
} from '../../core'

import Scroller from './scroller'

interface dataProps {
  name: string,
  value: any
}

@Component({
  selector: 'lm-picker-item',
  templateUrl: './picker-item.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class LmPickerItem extends Scroller implements OnInit, OnDestroy {
  // props
  @Input('index') set index(value: number) {
    this._index = value;
  }
  @Input('id') id: string
  
  @Input('data') set data(value: any[]) {
    if (value && !isEqual(this._data, value)) {
      this._data = value;
      this.refresh({
        data: this._data,
        defaultValue: this._defaultValue
      })
    }
  }
  get data (): any[] {
    return this._data;
  }

  @Input('defaultValue') set defaultValue(value: any) {
    if (value && !isEqual(this._defaultValue, value)) {
      this._defaultValue = value;
      this.refresh({
        data: this._data,
        defaultValue: this._defaultValue
      })
    }
  }
  get defaultValue(): any {
    return this._defaultValue;
  }

  @Input('itemClass') itemClass: string
  
  // emit  
  @Output('on-select') onSelect: EventEmitter<any> = new EventEmitter<any>()
  
  // data
  private _defaultValue: any[] = []
  private _index: number;
  private _data: any[] = []
  
  // methods
  private getKeys(item){
    return Object.keys(item);
  }
  
  private isObject(obj): boolean {
    return isObject(obj);
  }
  
  private isArray(arr): boolean {
    return isArray(arr);
  }

  private stringify(str): string {
    return JSON.stringify({ 'value': encodeURI(str) })
  }

  constructor(
    public el: ElementRef,
    private cdr: ChangeDetectorRef) {
    super();
  }
  
  ngOnInit() {
    let self = this;
    console.log(self, 'self')
    this.build(querySelector('.lm-picker-item', this.el.nativeElement), {
      data: self._data,
      defaultValue: self._defaultValue,
      onSelect(value, index) {
        let item = {
          'value': value,
          'row': self._index,
          'col': index
        };
        self.onSelect.emit(item);
      },
      callback: null
    })
  }
  ngOnDestroy() {

  }
   

  // 触摸开始
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.touchStartHandler(event);
  }
  @HostListener('mousedown', ['$event'])
  onMousedown(event: TouchEvent): void {
    this.touchStartHandler(event);
  }
  // 触摸移动中
  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    this.touchMoveHandler(event)
  }
  @HostListener('mousemove', ['$event'])
  onMousemove(event: TouchEvent): void {
    this.touchMoveHandler(event)
  }
  // 触摸结束
  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    this.touchEndHandler(event)
  }
  @HostListener('mouseup', ['$event'])
  onMouseup(event: TouchEvent): void {
    this.touchEndHandler(event);
  }

  
}