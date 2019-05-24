import Vue, { VNode } from 'vue';
/**
 * 直接html调用
 */
export declare class Search extends Vue {
  searchBar: String
  searchForm: String
  required: Boolean
  placeholder: String
  cancelText: String
  value: String
  isShowCancel: Boolean
  radius: Boolean
  type: String
  url: String

  $emit(eventName: 'on-touch'): this
  $emit(eventName: 'on-focus'): this
  $emit(eventName: 'on-blur'): this
  $emit(eventName: 'on-cancel'): this
  $emit(eventName: 'on-clear'): this
  $emit(eventName: 'on-change', value: String): this
  $emit(eventName: 'on-submit', value: String): this
  $emit(eventName: 'input', value: String): this
}
