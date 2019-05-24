import Vue, { VNode } from 'vue';
/**
 * 直接html调用
 */
export interface BadgeSlots {
  /** Content of the Datetime */
  default: VNode[]
  [key: string]: VNode[] | undefined
}

export declare class Badge extends Vue {
  text: String | Number
  type: String
  $slots: BadgeSlots
}

