import Vue from 'vue'
import { VupComponent } from './component'

/** The version of vup-ui */
export const version: string;

import { Alert, AlertPlugin } from './alert';
import { ColorDirective } from './color-directive';
import { TransferDom } from './transfer-dom';
export interface InstallationOptions {
};
/**
 * Install all vup-ui components into Vue.
 * Please do not invoke this method directly.
 * Call `Vue.use(vup-ui)` to install.
 */
export function install (vue: typeof Vue, opts: InstallationOptions): void;
/** Vup-ui component common definition */
export type Component = VupComponent;
/** Alert Component */
export class VupAlert extends Alert {};
export const AlertModule: AlertPlugin;
/**
 * 注册指令
 */
export class ColorDirectiveDom extends ColorDirective {};
export class VTransferDom extends TransferDom {};

/**
 * 对外提供访问对象
 */
declare const Vup: {
  install: (
    Vue: Vue,
    opts: InstallationOptions
  ) => void;
};
/**
 * 挂载配置
 */
// declare module 'vue/types/vue' {
//   interface Vue {
//     VUP_CONFIG: InstallationOptions;
//   }
// }
export default Vup;

/**
 * 注册插件
 */
// interface VupPlugins {
//   alert: VupAlert
// }

// declare module 'vue/types/vue' {
//   interface Vue {
//     $vup: VupPlugins;
//   }
// }
