import { 
  Component, 
  ContentChild, 
  Input, 
  OnChanges, 
  OnDestroy,
  OnInit, 
  Renderer2, 
  SimpleChanges, 
  TemplateRef, 
  ElementRef 
} from '@angular/core'
import { SafeUrl, DomSanitizer } from '@angular/platform-browser'
import { DocumentWrapper, WindowWrapper } from '../shared/services'
import { DialogAnimation, MaskAnimation } from './dialog.animation'
import { DialogProps } from './dialog.props'
@Component({
  selector: 'vup-dialog',
  template: './dialog.html',
  animations: [DialogAnimation, MaskAnimation]
})
export class VupDialog extends DialogProps implements OnInit, OnChanges, OnDestroy{

  elem: Element
  layout: String

  constructor(
    private el: ElementRef,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private window: WindowWrapper,
    private document: DocumentWrapper) {
    super();
  }
  // 初始化 钩子函数
  ngOnInit(): void {
    // if (typeof window !== 'undefined') {
    //   if (window.VUP_CONFIG && window.VUP_CONFIG.$layout === 'PAGE_VIEW') {
    //     this.layout = 'PAGE_VIEW'
    //   }
    // }
    // 与组件 tamplate 无关
    this.elem = this.renderer.createElement('div')
    //this.renderer.setAttribute(this.elem, 'class', 'v-modal')
    this.renderer.setStyle(this.elem, 'z-index', this.maskZIndex)
    this.renderer.setStyle(this.elem, 'display', this.show ? 'block' : 'none')
    this.document.body.appendChild(this.elem)
  }
  // 监听改变的时候 钩子函数
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes || !changes.show) return
    this.show = changes.show.currentValue
    this.updateWithVisibleChange() 
    this.show ? this.emitShow.emit(this.show) : this.emitHide.emit(this.show);
    // if (val) {
    //   this.addModalClassName();
    // } else {
    //   this.removeModalClassName();
    // }
  }
  // 销毁时 钩子函数
  ngOnDestroy(): void {
    this.elem.parentElement.removeChild(this.elem);
  }
  // 更新视图
  updateWithVisibleChange(): void {
    // update modal
    if (this.elem) {
      // this.elem.innerHTML = this.makeModalTmp(this.visible)
      this.renderer.setStyle(this.elem, 'display', this.show ? 'block' : 'none')
    }
  }

  hide(): void {
    if (this.hideOnBlur) {
      this.show = false;
      this.emitHide.emit(this.show);
      this.emitChange.emit(this.show);
      this.emitClickMask.emit(this.show);
      // this.$emit('update:show', false)
      // this.$emit('change', false)
      // this.$emit('on-click-mask')
    }
  }


  // 计算属性计算样式  
  maskStyle(): object {
    if (typeof this.maskZIndex !== 'undefined') {
      return {
        zIndex: this.maskZIndex
      }
    }
  }
  addModalClassName () {
    console.log(this.el, 'module.ts');
    // if (typeof this.shouldPreventScroll === 'function' && this.shouldPreventScroll()) {
    //   return
    // }
    // if (this.getLayout() === 'VIEW_BOX') {
    //   dom.addClass(document.body, BODY_CLASS_NAME)
    //   dom.addClass(document.querySelector(VUX_VIEW_BOX_ELEMENT), CONTAINER_CLASS_NAME)
    // }
  }
  removeModalClassName () {
    // if (this.getLayout() === 'VIEW_BOX') {
    //   dom.removeClass(document.body, BODY_CLASS_NAME)
    //   dom.removeClass(document.querySelector(VUX_VIEW_BOX_ELEMENT), CONTAINER_CLASS_NAME)
    // }
  }

  shouldPreventScroll () {
    // hard to get focus on iOS device with fixed position, so just ignore it
    // const iOS = /iPad|iPhone|iPod/i.test(window.navigator.userAgent)
    // const hasInput = this.$el.querySelector('input') || this.$el.querySelector('textarea')
    // if (iOS && hasInput) {
    //   return true
    // }
  }
    // scroll: {
    //   type: Boolean,
    //   default: true,
    //   validator (val) {
    //     /* istanbul ignore if */
    //     if (process.env.NODE_ENV === 'development' && val === false) {
    //       console.warn('[VUX warn] x-dialog:scroll 已经废弃。如果你是 100% 布局，请参照文档配置 $layout 以实现阻止滚动')
    //     }
    //     return true
    //   }
    // }
  
  
}