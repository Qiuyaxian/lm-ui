import Vue, { VNode } from 'vue';

/**
 * 直接html调用
 */
export declare class Popup extends Vue {
  value: Boolean
  height: String
  width: String
  showMask: Boolean
  isTransparent: Boolean
  hideOnBlur: Boolean
  position: String
  maxHeight: String
  popupStyle: Object
  hideOnDeactivated: Boolean
  shouldRerenderOnShow: Boolean
  shouldScrollTopOnShow: Boolean

  $emit(eventName: 'on-show'): this
  $emit(eventName: 'on-hide'): this
  $emit(eventName: 'on-first-show'): this
  $emit(eventName: 'input', value: Boolean): this
}