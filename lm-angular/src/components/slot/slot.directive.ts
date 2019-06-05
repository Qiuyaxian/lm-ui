import { 
  Directive, 
  ElementRef, 
  Input, 
  OnInit, 
  Renderer2,
  TemplateRef, 
  ViewContainerRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core'
import { DOCUMENT } from '@angular/common';
@Directive({
  selector: '[slot]'
})
export class LmSlotDirective {
  private elem
  private name: Object
  // 指令的输入值
  // 用法 <div transfer-dom [condition]="true" [className]="'test'">指令</div>
  // @Input('condition') condition: boolean
  // @Input('className') className: string
  @Input('slot') set slotName(name: Object) {
    this.name = name;
  }
  get slotName() {
    return this.name
  }
  // 指令或组件的构造器，在创建组件时会被调用。
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {

  }

  // 会在Angular设置数据绑定输入属性时作出响应。
  ngOnChanges(): void {
    console.log('ngOnChanges');
  }
  // 在Angular首次显示数据绑定属性及设置输入
  // 属性时初始化指令或组件，
  // 只会在ngOnChanges初次响应时被调用一次。
  // 对应vue 的bind
  ngOnInit(): void {
    let ref = this.viewContainer.createEmbeddedView(this.templateRef);
    this.elem = ref.rootNodes[0];
  }

  // 检测Angular本身无法捕获的变化并执行操作。
  ngDoCheck(): void {
    // 顺序 2 => 触发1
    console.log('ngDoCheck');
  }
  
  // 在Angular投射外部内容进入组件的视图或
  // 指令所在的视图后响应，
  // 只会在首次ngDoCheck后被调用。
  // 对应vue 的 inserted
  ngAfterContentInit(): void {
    // 顺序 3 => 
    console.log('ngAfterContentInit');
    
  }
  
  // 在Angular检查被投射到指令或组件的内容后响应。
  // 对应vue 的 componentUpdated
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
    // 顺序 4 => 触发2
    
  }
  
  // 在Angular初始化组件视图及子视图或指令所在的视图后响应，
  // 只会在首次ngAfterContentChecked后被调用。
  // 
  ngAfterViewInit(): void {
    // 顺序 5 => 
    console.log('ngAfterViewInit');
  }

  // 在Angular检查视图及子视图或指令所在的视图后响应。
  // 对应vue 的 updated
  ngAfterViewChecked(): void {
    // 顺序 6 => => 触发3
    console.log('ngAfterViewChecked');
  }
  
  // 在Angular销毁指令或组件前进行清除工作，
  // 取消订阅和解除事件处理以避免内存泄漏。
  // 对应 vue 的 unbind
  ngOnDestroy(): void {
    // 销毁 
  }
}