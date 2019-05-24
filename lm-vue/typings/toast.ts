import Vue, { VNode } from 'vue';
/**
 * 直接html调用
 */
export interface ToastSlots {
  /** Content of the Datetime */
  default: VNode[]
  [key: string]: VNode[] | undefined
}


/**
 * 定义 弹出框可以配置数据对象
 */
export interface ToastPluginOptions {
  // prop 数据
  visible: Boolean
  time: Number
  type: String
  transition: String
  width: Number | String
  isShowMask: Boolean
  text: String
  position: String
  onShow: Function;
  onHide: Function;
}

export declare class Toast extends Vue {
  visible: Boolean
  time: Number
  type: String
  transition: String
  width: Number | String
  isShowMask: Boolean
  text: String
  position: String

  $emit(eventName: 'on-show'): this
  $emit(eventName: 'on-hide'): this
  $emit(eventName: 'input', value: Boolean): this

  $slots: ToastSlots
}

/**
 * 定义 弹出框js组件
 */
export declare class ToastPluginComponent extends Vue {
  show (): this;
  hide (): this;
  $emit(eventName: 'on-show'): this;
  $emit(eventName: 'on-hide'): this;
}

/**
 * 导出插件
 */
export interface ToastPlugin {
  (options: ToastPluginOptions): void;
  show (options: ToastPluginOptions): void;
  hide (): void;
  success (options: ToastPluginOptions): void;
  error (options: ToastPluginOptions): void;
  cancel (options: ToastPluginOptions): void;
  warn (options: ToastPluginOptions): void;
}
