import Vue, { VNode } from 'vue';
/**
 * 直接html调用
 */

export interface ButtonSlots {
  /** Content of the Datetime */
  default: VNode[]
  [key: string]: VNode[] | undefined;
}

export declare class Button extends Vue {
  // $emit(eventName: 'on-item-click'): this
  $slots: ButtonSlots
}
