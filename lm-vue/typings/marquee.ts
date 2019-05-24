import Vue, { VNode } from 'vue';
/**
 * 直接html调用
 */

export interface MarqueeSlots {
  /** Content of the MarqueeSlots */
  default: VNode[]
  [key: string]: VNode[] | undefined
}
export interface MarqueeItemSlots {
  /** Content of the MarqueeItemSlots */
  default: VNode[]
  [key: string]: VNode[] | undefined
}

export declare class Marquee extends Vue {
  interval: Number
  duration: Number
  direction: String
  itemHeight: Number
  $slots: MarqueeSlots
}

export declare class MarqueeItem extends Vue {
  $slots: MarqueeItemSlots
}
