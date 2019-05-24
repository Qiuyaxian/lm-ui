import Vue, { VNode } from 'vue';
/**
 * 直接html调用
 */
export interface TabbarSlots {
  /** Content of the Datetime */
  default: VNode[]
  [key: string]: VNode[] | undefined
}

export interface TabbarItemSlots {
  /** Content of the Datetime */
  default: VNode[]
  icon: VNode[]
  iconActive: VNode[]
  label: VNode[]
  [key: string]: VNode[] | undefined
}

export interface TabbarItemLink {
  /** Content of the Datetime */
  path: String
  name: String
  params: Object
  query: Object
  callback: Function
}

export declare class Tabbar extends Vue {
  // prop 数据
  iconClass: String
  value: Number
  $emit(eventName: 'input', value: Number): this
  $emit(eventName: 'on-index-change', val: Number, oldVal: Number): this
  $slots: TabbarSlots
}

export declare class TabbarItem extends Vue {
  showDot: Boolean
  selected: Boolean
  badge: String
  link: String | TabbarItemLink
  iconClass: String

  $emit(eventName: 'on-before-index-change', currentIndex: Number): this
  $emit(eventName: 'on-item-click', currentIndex: Number): this
  $slots: TabbarItemSlots
}
