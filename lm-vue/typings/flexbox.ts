import Vue, { VNode } from 'vue';
/**
 * 直接html调用
 */
export interface FlexboxSlots {
  /** Content of the Datetime */
  default: VNode[]
  [key: string]: VNode[] | undefined
}
export interface FlexboxItemSlots {
  /** Content of the Datetime */
  default: VNode[]
  [key: string]: VNode[] | undefined
}

export declare class Flexbox extends Vue {
  gutter: Number
  orient: String
  justify: String
  align: String
  wrap: String
  direction: String
  $slots: FlexboxSlots
}

export declare class FlexboxItem extends Vue {
  span: Number | String
  order: Number | String
  $slots: FlexboxItemSlots
}

