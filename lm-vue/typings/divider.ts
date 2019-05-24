import Vue, { VNode } from 'vue';
/**
 * 直接html调用
 */
export interface DividerSlots {
  /** Content of the Datetime */
  default: VNode[]
  [key: string]: VNode[] | undefined
}

export declare class Divider extends Vue {
  $slots: DividerSlots
}
