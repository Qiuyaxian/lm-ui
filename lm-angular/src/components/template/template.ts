import {
  Component,
  ElementRef,
  Renderer2,
  TemplateRef,
  EventEmitter,
  ContentChild,
  Input,
  OnInit,
  AfterContentInit,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { 
  extend,
  querySelector,
  getStyle,
  getRect,
  isEqual,
  pxTorem,
  replaceVNodeHTMLElement 
} from '../../core'

@Component({
  selector: 'lm-template',
  templateUrl: './template.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LmTemplate implements OnInit, AfterContentInit {
  // slot
  @ContentChild('header') header: TemplateRef<any>
  @ContentChild('footer') footer: TemplateRef<any>

  // props
  @Input() bodyPaddingTop: number
  @Input() bodyPaddingBottom: number

  // data
  private _paddingTop: number = 46
  private _paddingBottom: number = 53
  private styles: object = {}

  constructor(
    private el: ElementRef,
    private renderer: Renderer2) {
  }

  ngOnInit () {
    const nativeElement = this.el.nativeElement
    replaceVNodeHTMLElement(nativeElement)
  }

  ngAfterContentInit() {
    if (this.bodyPaddingTop) {
      this.styles['padding-top'] = pxTorem(this.bodyPaddingTop);
    } else if (this.header) {
      this.styles['padding-top'] = pxTorem(this._paddingTop, 2);
    }
    if (this.bodyPaddingBottom) {
      this.styles['padding-bottom'] = pxTorem(this.bodyPaddingBottom, 2);
    } else if (this.footer) {
      this.styles['padding-bottom'] = pxTorem(this._paddingTop, 2);
    }
  }
}