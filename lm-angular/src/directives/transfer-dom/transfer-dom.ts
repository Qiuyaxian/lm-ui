// Thanks to: https://github.com/calebroseland/vue-dom-portal

import objectAssign from 'object-assign';
/**
 * Get target DOM Node
 * @param {(Node|string|Boolean)} [node=document.body] DOM Node, CSS selector, or Boolean
 * @return {Node} The target that the el will be appended to
 */
function getTarget (node) {
  if (node === void 0) {
    return document.body;
  }

  if (typeof node === 'string' && node.indexOf('?') === 0) {
    return document.body;
  } else if (typeof node === 'string' && node.indexOf('?') > 0) {
    node = node.split('?')[0];
  }

  if (node === 'body' || node === true) {
    return document.body;
  }

  return node instanceof (window as any).Node ? node : document.querySelector(node);
}

function getShouldUpdate (node) {
  // do not updated by default
  if (!node) {
    return false;
  }
  if (typeof node === 'string' && node.indexOf('?') > 0) {
    try {
      const config = JSON.parse(node.split('?')[1]);
      return config.autoUpdate || false;
    } catch (e) {
      return false;
    }
  }
  return false;
}

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
  selector: '[transfer-dom]'
})
export class TransferDomDirective {
  private elem: any
  private state: boolean
  // 指令的输入值
  // 用法 <div transfer-dom [condition]="true" [className]="'test'">指令</div>
  // @Input('condition') condition: boolean
  // @Input('className') className: string
  @Input('transfer-dom') set condition(condition: boolean) {
    this.state = condition;
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
    
  }
  // 在Angular首次显示数据绑定属性及设置输入
  // 属性时初始化指令或组件，
  // 只会在ngOnChanges初次响应时被调用一次。
  // 对应vue 的bind
  ngOnInit(): void {
    let ref = this.viewContainer.createEmbeddedView(this.templateRef);
    this.elem = ref.rootNodes[0];
    this.elem.className = this.elem.className ? this.elem.className + ' v-transfer-dom' : 'v-transfer-dom'
    const parentNode = this.elem.parentNode
    var home = document.createComment('')
    var hasMovedOut = false

    if (this.state !== false) {
      parentNode.replaceChild(home, this.elem) // moving out, this.elem is no longer in the document
      getTarget(this.state).appendChild(this.elem) // moving into new place
      hasMovedOut = true
    }
    if (!this.elem.__transferDomData) {
      this.elem.__transferDomData = {
        parentNode: parentNode,
        home: home,
        target: getTarget(this.state),
        hasMovedOut: hasMovedOut
      }
    }
  }

  // 检测Angular本身无法捕获的变化并执行操作。
  ngDoCheck(): void {
    // 顺序 2 => 触发1
  }
  
  // 在Angular投射外部内容进入组件的视图或
  // 指令所在的视图后响应，
  // 只会在首次ngDoCheck后被调用。
  // 对应vue 的 inserted
  ngAfterContentInit(): void {
    // 顺序 3 =>
    
  }
  
  // 在Angular检查被投射到指令或组件的内容后响应。
  // 对应vue 的 componentUpdated
  ngAfterContentChecked(): void {
    // 顺序 4 => 触发2
    const shouldUpdate = getShouldUpdate(this.state)
    if (!shouldUpdate) {
      return;
    }
    let el = this.elem;
    // need to make sure children are done updating (vs. `update`)
    var ref$1 = el.__transferDomData
    // homes.get(el)
    var parentNode = ref$1.parentNode
    var home = ref$1.home
    var hasMovedOut = ref$1.hasMovedOut // recall where home is

    if (!hasMovedOut && this.state) {
      // remove from document and leave placeholder
      parentNode.replaceChild(home, el)
      // append to target
      getTarget(this.state).appendChild(el)
      el.__transferDomData = objectAssign({}, el.__transferDomData, { hasMovedOut: true, target: getTarget(this.state) })
    } else if (hasMovedOut && this.state === false) {
      // previously moved, coming back home
      parentNode.replaceChild(el, home)
      el.__transferDomData = objectAssign({}, el.__transferDomData, { hasMovedOut: false, target: getTarget(this.state) })
    } else if (this.state) {
      // already moved, going somewhere else
      getTarget(this.state).appendChild(el)
    }
  }
  
  // 在Angular初始化组件视图及子视图或指令所在的视图后响应，
  // 只会在首次ngAfterContentChecked后被调用。
  // 
  ngAfterViewInit(): void {
    // 顺序 5 =>
  }

  // 在Angular检查视图及子视图或指令所在的视图后响应。
  // 对应vue 的 updated
  ngAfterViewChecked(): void {
    // 顺序 6 => => 触发3
  }
  
  // 在Angular销毁指令或组件前进行清除工作，
  // 取消订阅和解除事件处理以避免内存泄漏。
  // 对应 vue 的 unbind
  ngOnDestroy(): void {
    // 销毁
    let el = this.elem;
    el.className = el.className.replace('v-transfer-dom', '')
    if (el.__transferDomData && el.__transferDomData.hasMovedOut === true) {
      el.__transferDomData.parentNode && el.__transferDomData.parentNode.appendChild(el)
    }
    el.__transferDomData = null
  }
}

