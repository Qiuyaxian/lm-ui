import {
  Component,
  ElementRef,
  Renderer2,
  TemplateRef,
  EventEmitter,
  ContentChild,
  Input,
  Output,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { Router } from '@angular/router';
import { SafeStyle } from '@angular/platform-browser';
import { 
  extend,
  querySelector,
  cleanStyle,
  LmRouter,
  replaceVNodeHTMLElement } from '../../core'
import { LmGroupService } from '../group'
@Component({
  selector: 'lm-cell',
  templateUrl: './cell.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LmCell implements OnInit {
   // slot 插槽
  @ContentChild('icon') icon: TemplateRef<any>
  @ContentChild('labelView') labelView: TemplateRef<any>
  @ContentChild('inlineDescView') inlineDescView: TemplateRef<any>
  
  // props
  /**
   * [label 左侧文字内容]
   * @type {Array}
   */
  @Input('label') label: any
  /**
   * [content 右侧文字内容]
   * @type {Array}
   */
  @Input('content') content: any
  /**
   * [isLink 是否是链接]
   * @type {boolean}
   */
  @Input('is-link') isLink: boolean
  /**
   * [inlineDesc 小文字说明]
   * @type {Array}
   */
  @Input('inline-desc') inlineDesc: string | number
  /**
   * [link 链接地址]
   * @type {Array}
   */
  @Input('link') link: Array<string | number>
  /**
   * [Input 附带的路由参数]
   */
  @Input('param') param: Object

  @Input('cell-width') cellWidth: string
  /**
   * [valueAlign 左边对齐方式]
   * @type {Array}
   */
  @Input('value-align') valueAlign: string
  /**
   * [borderIntent 是否开启边框]
   * @type {Object}
   */
  @Input('borderIntent') borderIntent: boolean
  /**
   * [primary description]
   * @type {Object}
   */
  @Input('primary') primary: string = 'title'
  /**
   * [disabled 是否禁用]
   * @type {[type]}
   */
  @Input('disabled') disabled: boolean
  /**
   * [alignItems 右侧文字对齐]
   * @type {[type]}
   */
  @Input('alignItems') alignItems: string
  /**
   * [placeholder 没有选中值的时候显示的提示语]
   * @type {[type]}
   */
  @Input('placeholder') placeholder: string 

  @Output('on-cell-click') onCellClick: EventEmitter<any> = new EventEmitter<any>()
  
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    public router: Router,
    public parent: LmGroupService) {
  }

  ngOnInit () {
    const nativeElement = this.el.nativeElement
    replaceVNodeHTMLElement(nativeElement) 
  }

  // computed

  get getBorderIntent () {
    return (this.parent && this.parent.borderIntent) || this.borderIntent;
  }

  /**
   * [cellStyles 计算左侧cell的宽度]
   * @return {[type]} [description]
   */
  cellStyles(): SafeStyle {
    return cleanStyle({
      width: (this.parent && this.parent.cellWidth) || this.cellWidth
    });
  }

  /**
   * [labelStyles 计算label 样式]
   * @return {[type]} [description]
   */
  get labelStyles (): SafeStyle {
    return cleanStyle({
      width: (this.parent && this.parent.labelWidth),
      textAlign: (this.parent && this.parent.labelAlign)
    });
  }

  /**
   * [labelClass 计算label label class ]
   * @return {[type]} [description]
   */
  get labelClass (): any {
    return {
      // 'lm-cell-justify': this.parent && (this.parent.labelAlign === 'justify' || this.parent.parent.labelAlign === 'justify')
    }
  }

  /**
   * [style 子项的样式]
   * @return {[type]} [description]
   */
  get styles (): any {
    if (this.alignItems) {
      return {
        alignItems: this.alignItems
      }
    }
  }
  
  // /**
  //  * [valueClass 计算右侧文字样式]
  //  * @return {[type]} [description]
  //  */
  // valueClass () {
  //   return {
  //     'lm-cell-primary': this.primary === 'content' || this.valueAlign === 'left'
  //   }
  // }

  // methods
  private onClick () {
    // 跳转
    if (!this.disabled && this.link) {
      LmRouter && LmRouter.go(this.link, this.param || {}, this.router);
    } else {
      this.onCellClick.emit();
    }
  }
  
}