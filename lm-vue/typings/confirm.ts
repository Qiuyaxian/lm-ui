import Vue, { VNode } from 'vue';
/**
 * 直接html调用
 */
export interface ConfirmSlots {
  /** Content of the Datetime */
  default: VNode[]
  [key: string]: VNode[] | undefined
}


/**
 * 定义 弹出框可以配置数据对象
 */
export interface ConfirmPluginOptions {
  // prop 数据
  showInput: Boolean
  placeholder: String
  theme: String
  hideOnBlur: Boolean
  title: String
  confirmText: String
  cancelText: String
  maskTransition: String
  maskZIndex: Number | String
  dialogTransition: String
  content: String
  closeOnConfirm: Boolean
  inputAttrs: Object
  showContent: Boolean
  confirmType: String
  showCancelButton: Boolean
  showConfirmButton: Boolean
}

export declare class Confirm extends Vue {
  value: Boolean
  showInput: Boolean
  placeholder: String
  theme: String
  hideOnBlur: Boolean
  title: String
  confirmText: String
  cancelText: String
  maskTransition: String
  maskZIndex: Number | String
  dialogTransition: String
  content: String
  closeOnConfirm: Boolean
  inputAttrs: Object
  showContent: Boolean
  confirmType: String
  showCancelButton: Boolean
  showConfirmButton: Boolean

  $emit(eventName: 'on-confirm', value: String): this
  $emit(eventName: 'on-cancel'): this
  $emit(eventName: 'on-show'): this
  $emit(eventName: 'on-hide'): this
  $emit(eventName: 'input', value: Boolean): this

  $slots: ConfirmSlots
}

/**
 * 定义 弹出框js组件
 */
export declare class ConfirmPluginComponent extends Vue {
  show (): this;
  hide (): this;
  $emit(eventName: 'on-confirm', value: String): this
  $emit(eventName: 'on-cancel'): this
  $emit(eventName: 'on-show'): this
  $emit(eventName: 'on-hide'): this
  $emit(eventName: 'input', value: Boolean): this
}

/**
 * 导出插件
 */
export interface ConfirmPlugin {
  (options: ConfirmPlugin): void;
  show (options: ConfirmPlugin): void;
  hide (): void;
}
