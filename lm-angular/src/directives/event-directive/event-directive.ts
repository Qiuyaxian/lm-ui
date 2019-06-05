/**
 * 阻止冒泡执行后续事件
 */
import { Directive, Renderer2, ElementRef, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
@Directive({
  selector: '[click.stop]'
})
export class EventStopPropagationDirective implements OnInit, OnDestroy {
  @Output("click.stop") stopPropEvent = new EventEmitter();
  unsubscribe: () => void;
  constructor(
    private renderer: Renderer2,
    private element: ElementRef) {
  }
  ngOnInit() {
    this.unsubscribe = this.renderer.listen(this.element.nativeElement, 'click', event => {
      event.stopPropagation();
      this.stopPropEvent.emit(event);
    });
  }
  ngOnDestroy() {
    this.unsubscribe();
  }
}

/**
 * 阻止默认事件执行后续事件
 */
@Directive({
  selector: '[click.prevent]'
})
export class EventPreventDefaultDirective implements OnInit, OnDestroy{
  @Output("click.prevent") preventPropEvent = new EventEmitter();
  unsubscribe: () => void;
  constructor(
    private renderer: Renderer2,
    private element: ElementRef) {
  }
  ngOnInit() {
    this.unsubscribe = this.renderer.listen(this.element.nativeElement, 'click', event => {
      if ( event && event.preventDefault ) {
        event.preventDefault();
      } else {
        window.event.returnValue = false;
      }
      this.preventPropEvent.emit(event);
    });
  }
  ngOnDestroy() {
    this.unsubscribe();
  }
}
