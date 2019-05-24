import Vue, { VNode } from 'vue';
/**
 * 直接html调用
 */
export interface TabSlots {
  /** Content of the Datetime */
  default: VNode[]
  [key: string]: VNode[] | undefined
}

export interface TabItemSlots {
  /** Content of the Datetime */
  default: VNode[]
  [key: string]: VNode[] | undefined
}

export declare class Tab extends Vue {
  // prop 数据
  lineWidth: Number
  activeColor: String
  barActiveColor: String
  defaultColor: String
  disabledColor: String
  animate: Boolean
  customBarWidth: Function | String
  preventDefault: Boolean
  scrollThreshold: Number
  barPosition: String
  $emit(eventName: 'on-index-change', newIndex: Number, oldIndex: Number): this
  $slots: TabSlots
}

export declare class TabItem extends Vue {
  activeClass: String
  disabled: Boolean
  badgeBackground: String
  badgeColor: String
  badgeLabel: String
  $emit(eventName: 'on-before-index-change', currentIndex: Number): this
  $emit(eventName: 'on-item-click', currentIndex: Number): this
  $slots: TabItemSlots
}
