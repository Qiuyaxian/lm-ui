import {
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ContentChild,
  ContentChildren,
  Input,
  Output,
  QueryList,
  OnDestroy,
  ViewEncapsulation,
  OnInit,
  AfterViewInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { extend, replaceVNodeHTMLElement } from '../../core'
import { LmGridItem } from './grid-item'
import { LmGridService } from './grid.service';
@Component({
  selector: 'lm-grid',
  templateUrl: './grid.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{provide: LmGridService, useExisting: LmGrid }]
})
export class LmGrid implements LmGridService, OnInit, AfterViewInit {
  // 视图插槽
  @ContentChildren(LmGridItem) children: QueryList<LmGridItem>
  // props 传递参数
  /**
   * [cols 列数]
   * @type {Object}
   */
  @Input('cols') cols: number = 3
  /**
   * [showLrBorders 是否显示左右边框  ]
   * @type {Object}
   */
  @Input() showLrBorders: boolean = true
  /**
   * [showVerticalDividers 是否显示垂直分割线]
   * @type {Object}
   */
  @Input() showVerticalDividers: boolean = true;
  /**
   * [showBorders 是否显示所有边框]
   * @type {Object}
   */
  @Input() showBorders: boolean = true

  // data
  private childrenSize: number = 3
  
  // computed
  get column(): number {
    return this.cols || this.childrenSize
  }

  // methods
  public countColumn (): void {
    this.childrenSize = this.children.length;
    this.children['_results'] && this.children['_results'].forEach((c, index) => c.index = index)
  }

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    const nativeElement = this.el.nativeElement
    replaceVNodeHTMLElement(nativeElement)
  }

  ngAfterViewInit(): void {
    this.countColumn();
  }
  
}