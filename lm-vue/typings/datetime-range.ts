import Vue, { VNode } from 'vue';
/**
 * 直接html调用
 */
export declare class DatetimeRange extends Vue {
  label: String
  value: Array<String | Number>
  startDate: String
  endDate: String
  format: String
  rawValue: Boolean
  inlineDesc: String
  placeholder: String
  hideDistrict: Boolean
  valueTextAlign: String
  
  $emit(eventName: 'in-show'): this
  $emit(eventName: 'in-hide', value: String): this
  $emit(eventName: 'in-change', value: String): this
  $emit(eventName: 'input', value: String): this
}