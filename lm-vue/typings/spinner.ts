import Vue, { VNode } from 'vue';
/**
 * 直接html调用
 */
export interface SpinnerSlots {
  /** Content of the Spinner */
  default: VNode[]
  [key: string]: VNode[] | undefined
}

export declare class Spinner extends Vue {
  type: String
  size: String
  $slots: SpinnerSlots
}

