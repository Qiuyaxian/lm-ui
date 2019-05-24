import Vue, { VNode } from 'vue';
/**
 * 直接html调用
 */
export declare class Picker extends Vue {
  data: Array<Object | String | Number>
  columns: Number
  fixedColumns: Number
  value: Array<String | Number>
  itemClass: String
  columnWidth: Array<Number>

  $emit(eventName: 'on-change', value: Array<String | Number>): this
  $emit(eventName: 'input', value: Array<String | Number>): this
}