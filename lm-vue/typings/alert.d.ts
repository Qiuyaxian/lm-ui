import Vue, { VNode } from 'vue';
/**
 * 直接html调用
 */
export declare class Alert extends Vue {
  // prop 数据
  value: Boolean;

  title: String;

  content: String;

  buttonText: String;

  hideOnBlur: Boolean;
  
  maskTransition: 'lm-mask';

  maskZIndex: String | Number;
  
  dialogTransition: 'lm-dialog';
  
  dialogClass: 'lm-dialog';
  
  hideOnBlur: Boolean;
  
  dialogStyle: Object;
  /**
   * 关闭时触发
   */
  $emit(eventName: 'on-hide'): this;
  $emit(eventName: 'on-show'): this;
  /**
   * slot插槽对象
   */
  $slots: {
  };
}

/**
 * 定义 弹出框js组件
 */
export declare class AlertPluginComponent extends Vue {
  show (): void;
  hide (): void;
  $emit(eventName: 'on-show'): void;
  $emit(eventName: 'on-hide'): void;
}

/**
 * 定义 弹出框可以配置数据对象
 */
export interface AlertPluginOptions {
  // prop 数据
  value: Boolean;
  title: String;
  content: String;
  buttonText: String;
  hideOnBlur: Boolean;
  maskTransition: 'lm-mask';
  maskZIndex: String | Number;
  dialogTransition: 'lm-dialog';
  dialogClass: 'lm-dialog';
  hideOnBlur: Boolean;
  dialogStyle: Object;
  onShow: Function;
  onHide: Function;
}
/**
 * 导出插件
 */
export interface AlertPlugin {
  (options: AlertPluginOptions): void;
  show (options: AlertPluginOptions): void;
  hide (): void;
}
