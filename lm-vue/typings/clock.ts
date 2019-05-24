import Vue, { VNode } from 'vue';
/**
 * 直接html调用
 */
export interface ClockSlots {
  /** Content of the Spinner */
  default: VNode[]
  [key: string]: VNode[] | undefined
}

export declare class Clock extends Vue {
  time: String | Number
  format: String
  $slots: ClockSlots
}

