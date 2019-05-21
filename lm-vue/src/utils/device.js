'use strict'
/**
 * [ua 用户设备]
 * @type {[type]}
 */
export const ua = navigator.userAgent;
export const isAndroid = /(Android);?[\s/]+([\d.]+)?/.test(ua);
export const isIpad = /(iPad).*OS\s([\d_]+)/.test(ua);
export const isIpod = /(iPod)(.*OS\s([\d_]+))?/.test(ua);
export const isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/.test(ua);
export const isWechat = /micromessenger/i.test(ua);
export const isAlipay = /alipayclient/i.test(ua);
