import {
  Input,
  Output,
  Component,
  ElementRef,
  TemplateRef,
  ContentChild,
  EventEmitter,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnInit,
  OnChanges,
  OnDestroy,
  ViewEncapsulation,
  AfterContentChecked
} from '@angular/core';
import { Router } from '@angular/router';
import {
  extend,
  querySelector,
  addClass,
  LmRouter,
  replaceVNodeHTMLElement 
} from '../../core'
import { LmGridService } from './grid.service'

@Component({
  selector: 'lm-grid-item',
  templateUrl: './grid-item.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class LmGridItem implements OnInit, OnDestroy {
  // slot 插槽
  @ContentChild('gridIcon') gridIcon: TemplateRef<any>
  @ContentChild('gridLabel') gridLabel: TemplateRef<any>
  
  // props 传递参数
  /**
   * [icon 图标]
   * @type {[type]}
   */
  @Input() icon: string
  /**
   * [label 文字]
   * @type {[type]}
   */
  @Input() label: string
  /**
   * [link 链接地址]
   * @type {[type]}
   */
  @Input() link: string[] | number[]
  /**
   * [Input 附带的路由参数]
   */
  @Input() param: object
  
  @Output() onItemClick: EventEmitter<any> = new EventEmitter<any>()
  // data
  private _index: number = 0

  public set index (val: number) {
    this._index = val;
    let timer = setTimeout(() => {
      // 更新内部值
      this.cdr.markForCheck();
      clearTimeout(timer);
    }, 0)
  }

  public get index (): number {
    return this._index;
  }
  
  // computed
  /**
   * [isLast 获取列数]
   * @return {Boolean} [description]
   */
  public get isLast (): boolean {
    return !((this._index + 1) % this.parent.column)
  }
  
  public getStyle (): any {
    let style: any = {};
    let column = this.parent.column;
    if (column) {
      style['width'] = `${100 / column}%`;
    }
    return style;
  }

  /**
   * [onClick 点击跳转]
   * @return {[type]} [description]
   */
  public onClick () {
    this.onItemClick.emit();
    this.link && LmRouter && LmRouter.go(this.link, this.param || {}, this.router);
  }

  constructor(
    private el: ElementRef,
    public parent: LmGridService,
    public cdr: ChangeDetectorRef,
    public router: Router
    ) {
  }
  ngOnInit(): void {
    const nativeElement = this.el.nativeElement
    replaceVNodeHTMLElement(nativeElement)
  }

  ngOnDestroy(): void {
    this.parent && this.parent.countColumn();
  }
}