import {
  ElementRef,
  Renderer2,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { extend, replaceVNodeHTMLElement } from '../../core'

export interface LeftOptionProps {
  showBack: boolean
  preventGoBack: boolean
  backText: string
};

export interface RightOptionProps {
  showMore: boolean
}; 

@Component({
  selector: 'lm-header',
  templateUrl: './header.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LmHeader implements OnInit {
  // slot 插槽视图
  @ContentChild('overwriteLeft') overwriteLeft: TemplateRef<any>
  @ContentChild('navbarLeft') navbarLeft: TemplateRef<any>
  @ContentChild('navbarTitle') navbarTitle: TemplateRef<any>
  @ContentChild('overwriteTitle') overwriteTitle: TemplateRef<any>
  @ContentChild('navbarRight') navbarRight: TemplateRef<any>
  
  // props 传递参数
  @Input('left-options') set leftOptions(options: LeftOptionProps) {
    this._leftOptions = extend(this._leftOptions, options);
  }
  get leftOptions() {
    return this._leftOptions;
  }

  @Input('right-options') set rightOptions(options: RightOptionProps) {
    this._rightOptions = extend(this._rightOptions, options);
  }
  get rightOptions() {
    return this._rightOptions;
  }

  @Input('title') title: string
  @Input('transition') transition: string  
  @Input('position') position: string

  // emit
  @Output() readonly onClickBack = new EventEmitter()
  @Output() readonly onClickTitle = new EventEmitter()
  @Output() readonly onClickMore = new EventEmitter()
  
  // data
  private _leftOptions: LeftOptionProps = {
    showBack: false,
    preventGoBack: false,
    backText: ''
  }
  private _rightOptions: RightOptionProps = {
    showMore: false
  }
  private shouldOverWriteTitle: boolean = false
  
  // methods
  private goBack(): void {
    if (this._leftOptions.preventGoBack) {
      this.onClickBack.emit();
    } else {
      this.location.back();
    }
  }

  constructor(
    private router: Router, 
    private location: Location,
    private el: ElementRef,
    private renderer: Renderer2) {
  }
  ngOnInit () {
     
  }

}