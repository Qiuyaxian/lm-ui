import Vue, { VNode } from 'vue';
/**
 * 直接html调用
 */
export interface GroupSlots {
  /** Content of the Datetime */
  default: VNode[]
  groupTitle: VNode[]
  [key: string]: VNode[] | undefined
}

export interface GroupTitleSlots {
  /** Content of the Datetime */
  default: VNode[]
  headerLeft: VNode[]
  headerRight: VNode[]
  [key: string]: VNode[] | undefined
}

export declare class Group extends Vue {
  cellWidth: String
  labelWidth: String
  labelAlign: String
  borderIntent: Boolean
  gutter: String | Number
  showBorders: Boolean
  $slots: GroupSlots
}

export declare class GroupTitle extends Vue {
  headerLabel: String
  headerValue: String
  $slots: GroupTitleSlots
}
