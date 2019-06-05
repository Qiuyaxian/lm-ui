import {
  Input,
  Output,
  Component,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'lm-popup-header',
  templateUrl: './popup-header.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LmPopupHeader {
  // props
  /**
   * [leftText 左侧文字]
   * @type {[type]}
   */
  @Input('left-text') leftText: string
  /**
   * [rightText 右侧文字]
   * @type {[type]}
   */
  @Input('right-text') rightText: string
  /**
   * [title 标题]
   * @type {[type]}
   */
  @Input('title') title: string
  /**
   * [showBottomBorder 是否显示底部边框]
   * @type {Object}
   */
  @Input('showBottomBorder') showBottomBorder: Boolean = true

  @Output('on-click-left') onClickLeft: EventEmitter<any> = new EventEmitter<any>(); 
  
  @Output('on-click-right') onClickRight: EventEmitter<any> = new EventEmitter<any>(); 
  
}