import {
  Input,
  Renderer2,
  Component,
  ElementRef,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { 
  extend,
  pxTorem,
  replaceVNodeHTMLElement } from '../../core'
import { LmFlexboxService } from './flexbox.service'

@Component({
  selector: 'lm-flexbox-item',
  templateUrl: './flexbox-item.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class LmFlexboxItem implements OnInit {
  // slot 插槽 
  
  // props 传递参数
  @Input('span') span: number | string
  @Input('order') order: number | string
  
  // 计算属性
  private styles(): any {
    let styles = {}
    let prefixList = this.prefixList;
    let marginName = this.parent.orient === 'horizontal' ? 'marginLeft' : 'marginTop'
    if ((this.parent.gutter * 1) !== 0) {
      styles[marginName] = pxTorem(this.parent.gutter);
    }
    if (this.span) {
      for (let i = 0; i < prefixList.length; i++) {
        styles[`${prefixList[i]}flex`] = `0 0 ${this.buildWidth(this.span) * 100}%`
      }
    }
    if (typeof this.order !== 'undefined') {
      (styles as any).order = this.order
    }
    return styles;
  }

  private prefixList: string[] = ['-moz-box-', '-webkit-box-', ''] 
  private bodyWidth: number

  constructor(
    private el: ElementRef,
    public parent: LmFlexboxService,
    ) {
    this.bodyWidth = document.documentElement.offsetWidth
  }
 
  ngOnInit() {
    const nativeElement = this.el.nativeElement
    replaceVNodeHTMLElement(nativeElement)
  }

  private buildWidth (width: number | string): number {
    if (typeof width === 'number') {
      if (width < 1) {
        return width
      } else {
        return width / 12
      }
    } else if (typeof width === 'string') {
      return (width as any).replace('px', '') / this.bodyWidth
    }
  }
}