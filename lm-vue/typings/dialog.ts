import Vue, { VNode } from 'vue';
/**
 * 直接html调用
 */
export interface DialogSlots {
  /** Content of the Datetime */
  default: VNode[]
  [key: string]: VNode[] | undefined
}


/**
 * 定义 弹出框可以配置数据对象
 */
export interface DialogPluginOptions {
  // prop 数据
  maskTransition: String
  maskZIndex: String | Number
  dialogTransition: String
  dialogClass: String
  hideOnBlur: Boolean
  dialogStyle: Object
  scroll: Boolean
}

export declare class Dialog extends Vue {
  show: Boolean
  maskTransition: String
  maskZIndex: String | Number
  dialogTransition: String
  dialogClass: String
  hideOnBlur: Boolean
  dialogStyle: Object
  scroll: Boolean

  $emit(eventName: 'on-click-mask'): this
  $emit(eventName: 'on-show'): this
  $emit(eventName: 'on-hide'): this
  $emit(eventName: 'change', value: Boolean): this

  $slots: DialogSlots
}

/**
 * 定义 弹出框js组件
 */
export declare class DialogPluginComponent extends Vue {
  show (): this;
  hide (): this;
  $emit(eventName: 'on-click-mask'): this
  $emit(eventName: 'on-show'): this
  $emit(eventName: 'on-hide'): this
  $emit(eventName: 'change', value: Boolean): this
}

/**
 * 导出插件
 */
export interface DialogPlugin {
  (options: DialogPluginOptions): void;
  show (options: DialogPluginOptions): void;
  hide (): void;
}
