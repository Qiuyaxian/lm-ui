import Vue, { VNode } from 'vue';
/**
 * 直接html调用
 */
export declare class Switch extends Vue {
  label: String
  disabled?: Boolean
  value: Boolean | String | Number
  inlineDesc?: String | Number
  preventDefault?: Boolean
  valueMap?: Array<Boolean>
  $emit(eventName: 'on-click', value: Boolean): this
  $emit(eventName: 'input', value: Boolean): this
  $emit(eventName: 'on-change', value: Boolean): this
}