import Vue, { VNode } from 'vue';
/**
 * 直接html调用
 */
export declare class Textarea extends Vue {
  id: String
  height: Number
  showCounter: Boolean
  name: String
  max: Number
  autocomplete: String
  autocapitalize: String
  autocorrect: String
  spellcheck: Boolean
  rows: Number
  cols: Number
  readonly: Boolean
  disabled: Boolean
  placeholder: String

  $emit(eventName: 'on-change', value: String): this
  $emit(eventName: 'on-focus', value: String, event: Event): this
  $emit(eventName: 'on-blur', value: String, event: Event): this
  $emit(eventName: 'input', value: String): this
}