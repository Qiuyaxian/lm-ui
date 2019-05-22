// Type definitions for iview 3.3.1
// Project: https://github.com/iview/iview
// Definitions by: yangdan
// Definitions: https://github.com/yangdan8/iview.git
import Vue, { VNode } from 'vue';

/**
 * 直接html调用
 */
export declare class Alert extends Vue {
  // prop 数据
  value?: Boolean;

  title?: String;

  content?: String;

  buttonText?: String;

  hideOnBlur?: Boolean;
  
  maskTransition?: 'vup-mask';

  maskZIndex?: String | Number;
  
  dialogTransition?: 'vup-dialog';
  
  dialogClass?: 'vup-dialog';
  
  hideOnBlur?: Boolean;
  
  dialogStyle?: Object;
  /**
   * 关闭时触发
   */
  $emit(eventName: 'on-hide', event: HTMLElement): this;
  $emit(eventName: 'on-show', event: HTMLElement): this;
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

  $emit(eventName: 'on-show', event: HTMLElement): void;

  $emit(eventName: 'on-hide', event: HTMLElement): void;
}

/**
 * 定义 弹出框可以配置数据对象
 */
export interface AlertPluginOptions {
  // prop 数据
  value?: Boolean;

  title?: String;

  content?: String;

  buttonText?: String;

  hideOnBlur?: Boolean;
  
  maskTransition?: 'vup-mask';

  maskZIndex?: String | Number;
  
  dialogTransition?: 'vup-dialog';
  
  dialogClass?: 'vup-dialog';
  
  hideOnBlur?: Boolean;
  
  dialogStyle?: Object;

  onShow?: Function;

  onHide?: Function;
}
/**
 * 导出插件
 */
export interface AlertPlugin {

  (options: AlertPluginOptions): AlertPluginOptions;

  show (options: AlertPluginOptions): void;

  hide (): void;
}

/**
 * 挂载全局
 */
declare module 'vue/types/vue' {
  interface Vue {
    $vup: {
      'alert': AlertPlugin
    }
  }
}
