import Vue, { VNode } from 'vue';
/**
 * 直接html调用
 */
export declare class Address extends Vue {
  label: String
  value: Array<Object>
  rawValue: Boolean
  list: Array<String | Number>
  labelWidth: String
  inlineDesc: String
  placeholder: String
  hideDistrict: Boolean
  valueTextAlign: String
  confirmText: String
  cancelText: String
  displayFormat: Function
  popupStyle: Object
  popupTitle: String
  show: Boolean
  disabled: Boolean
  
  $emit(eventName: 'on-show'): this
  $emit(eventName: 'on-hide', value: Array<String | Number>): this
  $emit(eventName: 'on-shadow-change', ids: Array<String | Number>, names: Array<String | Number>): this
  $emit(eventName: 'input', ids: Array<String | Number>): this
}

/**
 * 定义 弹出框可以配置数据对象
 */
export interface AddressPluginDataFormat{
  name: String
  value: String | Number
  parent: String | Number
}
export interface PopupStyleFormat{
}

export interface AddressPluginOptions {
  // prop 数据
  cancelText: String
  confirmText: String
  data: Array<AddressPluginDataFormat>
  columns: Number
  fixedColumns: Number
  value: Array<String | Number>
  showName: Boolean
  show: Boolean
  displayFormat: Function
  isTransferDom: Boolean
  hideDistrict: Boolean
  columnWidth: Array<Number>
  popupStyle: PopupStyleFormat
  popupTitle: String
  disabled: Boolean
}


/**
 * 定义 弹出框js组件
 */
export declare class AddressPluginComponent extends Vue {
  show (): this;
  hide (): this;
  $emit(eventName: 'on-shadow-change', ids: Array<String | Number>, names: Array<String | Number>): this
  $emit(eventName: 'on-hide', value: Array<String | Number>): this
  $emit(eventName: 'input', value: Array<String | Number>): this
  $emit(eventName: 'on-show'): this   
}

/**
 * 导出插件
 */
export interface AddressPlugin {
  (options: AddressPluginOptions): void;
  show (options: AddressPluginOptions): void;
  hide (): void;
}
