import Vue, { VNode } from 'vue';
/**
 * 直接html调用
 */

export interface CellSlots {
  /** Content of the Datetime */
  default: VNode[]
  icon: VNode[]
  label: VNode[]
  inlineDesc: VNode[]
  [key: string]: VNode[] | undefined
}

export declare class Cell extends Vue {
  label: String | Number
  content: String | Number
  isLink: Boolean
  inlineDesc: String | Number
  link: String | Object
  valueAlign: String
  borderIntent: Boolean
  primary: String
  disabled: Boolean
  alignItems: String
  placeholder: String
  $emit(eventName: 'on-cell-click'): this
  $slots: CellSlots
}
