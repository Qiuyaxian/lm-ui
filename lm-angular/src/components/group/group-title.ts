import {
  Input,
  OnInit,
  Component,
  ElementRef,
  TemplateRef,
  ContentChild,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import { replaceVNodeHTMLElement } from '../../core'

@Component({
  selector: 'lm-group-title',
  templateUrl: './group-title.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // providers: [{provide: LmGroupService, useExisting: LmGroup }]
})
export class LmGroupTitle implements OnInit {
  // 视图
  @ContentChild('header') header: TemplateRef<any>
  @ContentChild('headerLeft') headerLeft: TemplateRef<any>
  @ContentChild('headerRight') headerRight: TemplateRef<any>
  
  // props
  @Input('headerLabel') headerLabel: string
  @Input('headerValue') headerValue: string

  constructor(private el: ElementRef) {
  }
  
  public ngOnInit() {
    const nativeElement = this.el.nativeElement
    replaceVNodeHTMLElement(nativeElement) 
  }
}