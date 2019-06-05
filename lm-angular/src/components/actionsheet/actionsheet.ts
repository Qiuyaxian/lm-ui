import {
  Input,
  Output,
  forwardRef,
  TemplateRef,
  ElementRef,
  ChangeDetectorRef,
  Component,
  ViewChild,
  EventEmitter,
  ContentChild,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
// 双向绑定
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Observer, Subscription } from 'rxjs';
import { SafeStyle } from '@angular/platform-browser';
import { 
  copy,
  extend, 
  isObject, 
  isArray, 
  ActionsheetAnimation, 
  removeEventHandle, 
  addEventHandle, 
  ActionsheetMaskAnimation } from '../../../src/core'
import { LmActionsheetProps } from './actionsheet.props'
@Component({
  selector: 'lm-actionsheet',
  templateUrl: './actionsheet.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [ActionsheetAnimation, ActionsheetMaskAnimation],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LmActionsheet),
      multi: true,
    },
  ],
})
export class LmActionsheet implements ControlValueAccessor, OnInit, OnDestroy {
  // slot
  @ContentChild('menuHeader') menuHeader: TemplateRef<any>

  // 获取dom
  @ViewChild('iOSMenu') iOSMenu: ElementRef
  @ViewChild('actionsheet') actionsheet: ElementRef

  // props
  @Input('model') set model(val: boolean){
    this.currentValue = val;
    this.controlChange(val);
    if (val) {
      this.fixIos(-1);
    } else {
      let timer = setTimeout(() => {
        this.fixIos(100);
        this.hideHandle();
        clearTimeout(timer);
      }, 200)
    }
  }

  @Input('showCancel') showCancel: boolean
  @Input('cancelText') cancelText: string
  @Input('theme') theme: string = 'ios'
  @Input('menus') menus: object | any[]
  @Input('closeOnClickingMask') closeOnClickingMask: boolean = true
  @Input('closeOnClickingMenu') closeOnClickingMenu: boolean = true

  // emit
  @Output('input') input: EventEmitter<any> = new EventEmitter<any>(); 
  @Output('on-click-mask') onClickMask: EventEmitter<any> = new EventEmitter<any>(); 
  @Output('on-click-menu') onClickMenu: EventEmitter<any> = new EventEmitter<any>(); 
  @Output('on-after-show') onAfterShow: EventEmitter<any> = new EventEmitter<any>(); 
  @Output('on-after-hide') onAfterHide: EventEmitter<any> = new EventEmitter<any>(); 
  
  // data
  private slotHeader: any = ''
  private hasHeaderSlot: boolean = false
  private tabbar: any
  private currentValue: boolean = false
  private menued: any = null
  private observer: Observer<any>
  private isObject(obj: any): boolean {
    return isObject(obj)
  }
  private isArray(arr: any): boolean {
    return isArray(arr);
  }
  private getKeys(item){
    return Object.keys(item);
  }

  constructor(private cdr: ChangeDetectorRef) {
  }

  // methods 外部
  public showHandle(data: LmActionsheetProps): Observable<any> {
    this.showSync(data);
    return Observable.create((observer: Observer<any>) => {
      this.observer = observer;
    });
  }

  public hideHandle(): void {
    if(this.observer){
      this.observer.next(this.menued);
      this.observer.complete();
    }
    this.cdr.detectChanges();
  } 
  // 同步
  public showSync(data: LmActionsheetProps): void {
    this.slotHeader = data.header || ''
    this.showCancel = data.showCancel;
    this.cancelText = data.cancelText;
    this.theme = data.theme;
    this.menus = data.menus;
    this.closeOnClickingMask = data.closeOnClickingMask || true
    if(data.header) this.hasHeaderSlot = true;
    // 模拟动画结束后回调
    let timer = setTimeout(() => {
      this.model = true;
      this.cdr.detectChanges();
    }, 0);
  }

  // methods 内部
  private onTransitionEnd(): void {
    if (this.currentValue) {
      this.onAfterShow.emit()
    } else {
      this.onAfterHide.emit();
    }
  }
  // menu菜单点击事件
  private onMenuClick (text, key): void {
    if (typeof text === 'string') {
      this.emitEvent('on-click-menu', key, text)
    } else {
      if (text.type !== 'disabled' && text.type !== 'info') {
        if (text.value || text.value === 0) {
          this.emitEvent('on-click-menu', text.value, text)
        } else {
          this.emitEvent('on-click-menu', '', text)
          this.model = false
        }
      }
    }
  }

  // 遮罩层
  private onClickingMask(): void {
    this.onClickMask.emit();
    this.closeOnClickingMask && (this.model = false);
  }

  // 绑定事件缘
  private emitEvent (event, menu, item) {
    if (event === 'on-click-menu' && !/.noop/.test(menu)) {
      let _item = item
      if (typeof _item === 'object') {
        _item = copy(_item);
      }
      this.menued = {
        'event': event, 
        'menu': menu, 
        'item': _item
      }
      this.onClickMenu.emit(this.menued);
      this.closeOnClickingMenu && (this.model = false);
    }
  }

  private fixIos(zIndex): void {
    let node = this.actionsheet;
    if(node.nativeElement && node.nativeElement.parentNode && node.nativeElement.parentNode.parentNode && node.nativeElement.parentNode.parentNode.className.indexOf('v-transfer-dom') !== -1){
       return
    }
    if (this.tabbar && /iphone/i.test(navigator.userAgent)) {
      this.tabbar['style']['zIndex'] = zIndex; 
    }
  }

  // computed

  // watch => show 和 hide 都调用
  ngOnInit(): void {
    let timer = setTimeout(() => {
      if (this.menuHeader) {
        this.hasHeaderSlot = true;
      }
      let iOSMenu = this.iOSMenu.nativeElement;
      this.tabbar = document.querySelector('.lm-tabbar')
      iOSMenu && addEventHandle(iOSMenu, 'transitionend', ($event) => {
        this.onTransitionEnd()
      });
      clearTimeout(timer)
    })
  }

  // 下面是数据双向绑定
  writeValue(value: any): void {
    this.model = value;
  }

  private controlChange: Function = () => {}
  private controlTouch: Function = () => {}
  
  registerOnChange(fn: Function): void {
    this.controlChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.controlTouch = fn;
  }
  
  ngOnDestroy(): void {
    this.fixIos(100);
    let iOSMenu = this.iOSMenu.nativeElement;
    iOSMenu && removeEventHandle(iOSMenu, 'transitionend', () => {
      this.onTransitionEnd()
    })
    if (this.observer && this.observer instanceof Subscription) {
      (this.observer as Subscription).unsubscribe();
    }
  }
}