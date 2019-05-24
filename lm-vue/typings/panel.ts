import Vue, { VNode } from 'vue';
/**
 * 直接html调用
 */
export interface PanelSlots {
  /** Content of the Datetime */
  default: VNode[]
  groupTitle: VNode[]
  [key: string]: VNode[] | undefined
}

export interface PanelItemSlots {
  /** Content of the Datetime */
  default: VNode[]
  panelItemHeader: VNode[]
  panelItemImage: VNode[]
  panelItemTitle: VNode[]
  panelItemDesc: VNode[]
  [key: string]: VNode[] | undefined
}

export declare class Panel extends Vue {
  header: String
  footer: Object
  borderIntent: Boolean
  $emit(eventName: 'on-click-footer'): this
  $emit(eventName: 'on-click-header'): this
  $slots: PanelSlots
}

export interface PanelLink {
  /** Content of the Datetime */
  path: String
  name: String
  params: Object
  query: Object,
  callback: Function
}

export declare class PanelItem extends Vue {
  type: String
  src: String
  title: String
  desc: String
  link: String | PanelLink
  notAllowLink: String
  $emit(eventName: 'on-item-click'): this
  $slots: PanelItemSlots
}
