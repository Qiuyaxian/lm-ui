import Vue, { VNode } from 'vue';
/**
 * 直接html调用
 */

export interface DatetimeSlots {
  /** Content of the Datetime */
  default: VNode[]
  /** Content of the Datetime title */
  title: VNode[]

  [key: string]: VNode[]
}

export declare class Datetime extends Vue {
  format: String
  label: String
  value: String
  inlineDesc: String
  placeholder: String
  minYear: Number
  maxYear: Number
  confirmText: String
  cancelText: String
  clearText: String
  yearRow: String
  monthRow: String
  dayRow: String
  hourRow: String
  minuteRow: String
  secondRow: String
  required: Boolean
  minHour: Number
  maxHour: Number
  startDate: String
  endDate: String
  valueTextAlign: String
  displayFormat: Function
  readonly: Boolean
  hourList: Array<String | Number>
  minuteList: Array<String | Number>
  show: Boolean
  defaultSelectedValue: String
  computeHoursFunction: Function
  computeDaysFunction: Function
  orderMap: Object
  
  $emit(eventName: 'input', value: String): this
  $emit(eventName: 'on-change', value: String): this
  $emit(eventName: 'on-clear', value: String): this
  $emit(eventName: 'in-cancel'): this
  $emit(eventName: 'in-confirm', value: String): this
  $emit(eventName: 'in-show'): this

  $slots: DatetimeSlots
}