import Vue, { VNode } from 'vue';
/**
 * 直接html调用
 */
export interface CountDownSlots {
  /** Content of the MarqueeItemSlots */
  default: VNode[]
  [key: string]: VNode[] | undefined
}

export interface CountUpOptions {}

export declare class CountUp extends Vue {
  tag: String
  start: Boolean
  startVal: Number
  endVal: Number
  decimals: Number
  duration: Number
  options: CountUpOptions
}

export declare class CountDown extends Vue {
  value: Number
  message: String
  start: Boolean
  $slots: CountDownSlots
}
