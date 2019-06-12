import {
  Input,
  Output,
  forwardRef,
  TemplateRef,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  ContentChild,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit,
  ViewContainerRef,
  ViewRef
} from '@angular/core';
// 双向绑定
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lm-demo',
  templateUrl: './demo.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LmDemo),
      multi: true,
    },
  ],
})
export class LmDemo implements ControlValueAccessor, AfterViewInit, OnInit, OnChanges {
  // slot
  @ContentChild('body') body: TemplateRef<any>
  @ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef;
  @ViewChild('tpl') tpl: TemplateRef<any>;

  ngAfterViewInit() {

  }
  clickHandle() {
    this.vc.clear()
  }
  createHandle() {
    // 创建一个插入式视图， 一般插入式视图都对应的是模版视图
    const tplView: ViewRef = this.tpl.createEmbeddedView(null);

    // 插入到容器当中 使用视图容器操作视图的方法insert
    this.vc.insert(tplView);
  }
  // props
  @Input('model') set model(value: any[]) {
    console.log(value, 'set model')
    this._model = value
  }
  get model(): any[] {
    return this._model
  }

  constructor(
    private cdr: ChangeDetectorRef) {
  }
  private _model: any[] = []
  // 下面是数据双向绑定
  writeValue(value: any): void {
    console.log(value, 'writeValue');
    this._model = value;
  }
  ngOnInit() {
    console.log(this._model, 'ngOnInit')
  }
  ngOnChanges(changes: SimpleChanges) {
    let { model } = changes
    console.log(changes, 'ngOnChanges')
    if (model && model.currentValue) {
      this._model = model.currentValue
    }

  }
  private controlChange: Function = () => { }
  private controlTouch: Function = () => { }
  // private onTouched: any = Function.prototype;

  registerOnChange(fn: Function): void {
    this.controlChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.controlTouch = fn;
  }

  ngOnDestroy(): void {

  }
}