// Type definitions for iview 3.3.1
// Project: https://github.com/iview/iview
// Definitions by: yangdan
// Definitions: https://github.com/yangdan8/iview.git
import Vue, { VNode, DirectiveOptions } from 'vue';

/**
 * 直接html调用
 */
export declare class TransferDom extends Vue {
  inserted(el: String, value: Any, vnode: VNode): void;
  componentUpdated(el: String, value: Any): void;
  inserted(el: String, value: Any): void;
  $slots: {
  };
};
//export const TransferDomDirective: DirectiveOptions
/**
 * 挂载全局
 */
declare module 'vue/types/vue' {
  interface Vue {
    directives: {
      TransferDom
    }
  }
}
