import {
  Component,
  ElementRef,
  TemplateRef,
  ContentChild,
  Input,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  extend,
  querySelector,
  getStyle,
  getRect,
  isEqual,
  replaceVNodeHTMLElement 
 } from '../../core'
import { LmGroupService } from './group.service'
@Component({
  selector: 'lm-group',
  templateUrl: './group.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{provide: LmGroupService, useExisting: LmGroup }]
})
export class LmGroup implements LmGroupService, OnInit {
  // 视图
  @ContentChild('groupTitle') groupTitle: TemplateRef<any>
  /**
   * [cellWidth cell 的宽度]
   * @type {[type]}
   */
  @Input() cellWidth: string
  /**
   * [labelWidth 左边label 的宽度]
   * @type {[type]}
   */
  @Input() labelWidth: string 
  /**
   * [labelAlign 左边label 的对齐方式]
   * @type {[type]}
   */
  @Input() labelAlign: string 
  /**
   * [itemsLeft 左边label 的距离左边的宽度]
   * @type {Object}
   */
  @Input() borderIntent: boolean = true
  /**
   * [gutter 间距]
   * @type {Array}
   */
  @Input() gutter: string | number
  /**
   * [gutter 是否需要显示边框]
   * @type {Array}
   */
  @Input() showBorders: boolean = true

  // 初始化
  constructor(private el: ElementRef) {
  }
  
  ngOnInit () {
    const nativeElement = this.el.nativeElement
    replaceVNodeHTMLElement(nativeElement) 
  }
}