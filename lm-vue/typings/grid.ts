import Vue, { VNode } from 'vue';
/**
 * 直接html调用
 */

export interface GridSlots {
  /** Content of the Datetime */
  default: VNode[]
  [key: string]: VNode[] | undefined
}
export interface GridItemSlots {
  default: VNode[]
  icon: VNode[]
  label: VNode[]
  [key: string]: VNode[] | undefined;
}
export declare class Grid extends Vue {
  $slots: GridSlots
}

export declare class GridItem extends Vue {
  icon: String
  label: String
  link: String

  $emit(eventName: 'on-item-click'): this

  $slots: GridItemSlots
}

