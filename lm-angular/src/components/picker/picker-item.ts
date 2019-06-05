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

import { querySelector, isObject, isArray, replaceVNodeHTMLElement } from '../../utils'

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
export class LmPickerItem extends Scroller implements OnInit {
  // props
  @Input('index') set index(value: number) {
    this._index = value;
  }
  @Input('id') id: string
  
  @Input('data') set data(value: any[]) {
    this._data = value;
  }
  get data (): any[] {
    return this._data;
  }

  @Input('defaultValue') set defaultValue(value: any[]) {
    this._defaultValue = value;
  }
  get defaultValue(): any[] {
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

  constructor(public el: ElementRef) {
    super();
  }
  
  ngOnInit() {
    let self = this;
    this.build(querySelector('.lm-picker-item', this.el.nativeElement), {
      data: self.data,
      defaultValue: self.defaultValue,
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