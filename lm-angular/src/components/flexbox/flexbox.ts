import {
  Input,
  Renderer2,
  Component,
  ElementRef,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { extend, replaceVNodeHTMLElement } from '../../core'
import { LmFlexboxService } from './flexbox.service';
@Component({
  selector: 'lm-flexbox',
  templateUrl: './flexbox.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{provide: LmFlexboxService, useExisting: LmFlexbox }]
})
export class LmFlexbox implements LmFlexboxService, OnInit {
  // 视图插槽

  // props 传递参数
  /**
   * [gutter 间距]
   * @type {Object}
   */
  @Input('gutter') gutter: number = 16
  /**
   * [orient 排列方式]
   * @type {Object}
   */
  @Input('orient') orient: string = 'horizontal'
  /**
   * [justify 左右对齐方式]
   * @type {[type]}
   */
  @Input('justify') justify: string
  /**
   * [align 水平对齐方式]
   * @type {[type]}
   */
  @Input('align') align: string
  /**
   * [wrap 换行]
   * @type {[type]}
   */
  @Input('wrap') wrap: string
  /**
   * [direction description]
   * @type {[type]}
   */
  @Input('direction') direction: string
  
  // 计算属性
  styles () {
    return {
      'justify-content': this.justify,
      '-webkit-justify-content': this.justify,
      'align-items': this.align,
      '-webkit-align-items': this.align,
      'flex-wrap': this.wrap,
      '-webkit-flex-wrap': this.wrap,
      'flex-direction': this.direction,
      '-webkit-flex-direction': this.direction
    };
  } 

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    const nativeElement = this.el.nativeElement
    replaceVNodeHTMLElement(nativeElement)
  }  
}