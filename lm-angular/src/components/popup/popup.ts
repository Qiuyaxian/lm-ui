import {
  Input,
  Output,
  forwardRef,
  TemplateRef,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Renderer2,
  EventEmitter,
  ContentChild,
  ViewChild,
  AfterViewChecked,
  OnInit,
  OnChanges,
  Inject,
  DoCheck,
  OnDestroy,
  SimpleChange,
  SimpleChanges,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
// 双向绑定
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Observer, Subscription } from 'rxjs';
import { SafeStyle } from '@angular/platform-browser';
import {
  extend,
  addClass,
  isBoolean,
  isNull,
  removeClass,
  PopupAnimation,
  PopupMaskAnimation 
} from '../../../src/core'
import { Popuper } from './popuper'
// import { LmAlertProps } from './alert.props'
@Component({
  selector: 'lm-popup',
  templateUrl: './popup.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [PopupMaskAnimation, PopupAnimation],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LmPopup),
      multi: true,
    },
  ]
})
export class LmPopup extends Popuper implements ControlValueAccessor, OnInit, OnDestroy {
  // slot
  @ContentChild('body') body: TemplateRef<any>
  
  // dom
  @ViewChild('zmask') zmask: ElementRef
  @ViewChild('wrapper') wrapper: ElementRef
  // props
  @Input('model') set model(val: boolean){
  	this.currentValue = val;
    this.input.emit(val);
    this.controlChange(val);
    // 是否重新滚动到顶部
    if (this.shouldRerenderOnShow) {
      this.shouldRenderBody = false;
      let timer = setTimeout(() => {
        this.scrollTop()
        this.shouldRenderBody = true;
        clearTimeout(timer);
      }, 10);
    } else {
      if (this.shouldScrollTopOnShow) {
        this.scrollTop()
      }
    }
  }
  
  get model(): boolean {
    return this.currentValue;
  }
  
  @Input('height') height: string = 'auto'
  @Input('width') width: string = 'auto'
  @Input('showMask') showMask: boolean = true
  @Input('isTransparent') isTransparent: boolean
  @Input('hideOnBlur') hideOnBlur: boolean = false
  @Input('position') position: string = 'bottom'
  @Input('maxHeight') maxHeight: string
  @Input('popupStyle') popupStyle: object
  @Input('hideOnDeactivated') hideOnDeactivated: boolean = true
  @Input('shouldRerenderOnShow') shouldRerenderOnShow: boolean = false
  @Input('shouldScrollTopOnShow') shouldScrollTopOnShow: boolean = false

  // emit
  @Output('input') input: EventEmitter<boolean> = new EventEmitter<boolean>(); 
  @Output('on-first-show') onFirstShow: EventEmitter<boolean> = new EventEmitter<boolean>(); 
  @Output('on-show') onShow: EventEmitter<any> = new EventEmitter<any>(); 
  @Output('on-hide') onHide: EventEmitter<any> = new EventEmitter<any>(); 
  // data
  private currentValue: boolean = false
  private observer: Observer<any>
  private popup: any
  private layout: string = ''
  private initialShow: boolean = true
  private hasFirstShow: boolean = false
  private shouldRenderBody: boolean = true
  private overflowScrollingList: NodeListOf<Element> 
  private toState: boolean = false
  private fromState: boolean = false
  private isFirst: boolean = false

   
  // computed
  private styles (): any {
    const styles = {}
    if (!this.position || this.position === 'bottom' || this.position === 'top') {
      (styles as any).height = this.height
    } else {
      (styles as any).width = this.width
    }
    if (this.maxHeight) {
      (styles as any)['max-height'] = this.maxHeight
    }
    this.isTransparent && ((styles as any)['background'] = 'transparent')
    if (this.popupStyle) {
      for (let i in this.popupStyle) {
        (styles as any)[i] = this.popupStyle[i]
      }
    }
    return styles
  }

  // methods
  // 滚动到顶部
  private scrollTop() {
    this.wrapper && this.wrapper.nativeElement && (this.wrapper.nativeElement.scrollTop = 0)
  }

  // 点击遮罩层
  private maskHandle(event) {
    this.model = false
  }

  // 禁止触摸
  private touchmoveHandle(event) {
    if (this.hideOnBlur) {
      this.maskHandle(event);
    }
    event.preventDefault();
  }

  // 开启滚动
  private fixSafariOverflowScrolling(type: string = 'touch'): void {
    let { nativeElement } = this.zmask;
    nativeElement && (nativeElement.style.webkitOverflowScrolling = type)
  }

  // 监听动画并触发show 与 hide
  private onAnimationHandle($event): void {
    let { totalTime, fromState, toState } = $event
    if(totalTime !== 0) {
      if (!this.toState && toState) {
        this.toState = toState;
        this.fromState = false;
        this.fixSafariOverflowScrolling('auto')
        this.onShow.emit();
        if (!this.isFirst) {
          this.isFirst = true;
          this.onFirstShow.emit();
        }
      }
      if (fromState && !this.fromState) {
        this.fromState = fromState;
        this.toState = false;
        this.onHide.emit();
        this.fixSafariOverflowScrolling('touch')
      }
    }
  }
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  	private cdr: ChangeDetectorRef) {
    super();
  }
  ngOnInit() {
     
  }
  
  // 下面是数据双向绑定
  writeValue(value: any): void {
    if (isBoolean(value)) this.model = value;
  }

  private controlChange: Function = () => {}
  private controlTouch: Function = () => {}
  // private onTouched: any = Function.prototype;
  
  registerOnChange(fn: Function): void {
    this.controlChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.controlTouch = fn;
  }

  ngOnDestroy(): void {
    if (this.observer && this.observer instanceof Subscription) {
      (this.observer as Subscription).unsubscribe();
    }
  }
}