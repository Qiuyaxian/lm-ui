import * as Tools from './tools'
import RouterClass from './router'
import * as Dom from './dom'
import * as Event  from './event'

import LocalStorage from './localStorage'
import SessionStorage from './sessionStorage'
import * as DateTime from './date'
//'wxec4a20154ad6b89e' 测试号APPID
//'wx6c9796fbc96c7e47' 企业号APPID
/**
 * [getUUID 产生随机UUID]
 * @return {[type]} [description]
 */
export function getUUID () {
  return Math.random().toString(36).substring(3, 8);
};

export const isProduction = Tools.isProduction;

/* -------- 基础方法 start ---------- */
export const trim = Tools.trim;

export const isArray = Tools.isArray;

export const isFunction = Tools.isFunction;

export const isNumber = Tools.isNumber;
  
export const isObject = Tools.isObject;

export const isTypeError = Tools.isTypeError;

export const isBoolean = Tools.isBoolean;

export const isString = Tools.isString;

export const isNull = Tools.isNull;

export const isUndefined = Tools.isUndefined;

export const extend = Tools.extend;
 
export const getPropByPath = Tools.getPropByPath;

export const hasOwn = Tools.hasOwn;

export const copy = Tools.copy;

export const isEqual = Tools.isEqual;

export const inArray = Tools.inArray;

export const inObject = Tools.inObject;

export const errorHandle = Tools.errorHandle;

export const stateHandle = Tools.stateHandle;

export const isWechat = Tools.isWechat;

export const setTitle = Tools.setTitle;

/* -------- 基础方法 end ---------- */

/* -------- 路由 start ---------- */

export const Router = RouterClass;

export const go = RouterClass.go;

/* -------- 路由 end ---------- */

/* ------- dom start -------- */

export const cleanStyle = Dom.cleanStyle;

export const getParentProp = Dom.getParentProp;

export const querySelector = Dom.querySelector;

export const querySelectorAll = Dom.querySelectorAll;

export const getById = Dom.getById;

export const getByName = Dom.getByName;

export const getByClassName = Dom.getByClassName;

export const getParentNode = Dom.getParentNode;

export const pxTorem = Dom.pxTorem; 

export const viewTransform = Dom.viewTransform;

export const resetScrollIntoView = Dom.resetScrollIntoView;

export const hasClass = Dom.hasClass;

export const addClass = Dom.addClass;

export const removeClass = Dom.removeClass;

export const getData = Dom.getData;

export const getRect = Dom.getRect;

export const getStyle = Dom.getStyle;
/* ------- dom end -------- */

/* ------- event start -------- */

export const addEventHandle = Event.addEventHandle;

export const removeEventHandle = Event.removeEventHandle;

export const registerEventHandle = Event.registerEventHandle;

export const triggerEventHandle = Event.triggerEventHandle;
/* ------- event start -------- */

export const _localStorage = LocalStorage;

export const _sessionStorage = SessionStorage;

export const format = DateTime.format;

export const formatRange = DateTime.formatRange;

export const formatNumber = DateTime.formatNumber;

export const formatTime = DateTime.formatTime;

export const isEndTime = DateTime.isEndTime;

export const endTime = DateTime.endTime;

/**
 * [isShareUrl 是否是分享url]
 * @param  {[type]}  url [description]
 * @return {Boolean}     [description]
 */
export function isShareUrl (url = (window && window.location.href) || '') {
  if(/shareType/i.test(url)) return true;
  else return false;
}

/**
 * [urlParse 处理url地址栏上的参数]
 * https://f.jzmt168.com/?code=001ocPs50wJ8HK1Dbkt503LVs50ocPsz&state=STATE#/classify/1942/1
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
export function urlParse (url) {
  url = url ? url : (window && window.location.href)?window.location.href:'';
  let router = {};
  if(url.indexOf('#') != -1){
    let protocol = /(https|http):\/\//, //匹配协议
        //domain = /([a-zA-Z0-9]+\.[a-zA-Z0-9]+\.+[a-zA-Z0-9]+\.*[a-zA-Z0-9]*|localhost)/,//域名
        domain = /([a-zA-Z0-9]+\.[a-zA-Z0-9]+\.*[a-zA-Z0-9]*\.*[a-zA-Z0-9]*|localhost)/,
        port = /:([0-9]{4})/, //端口号
        route = url.indexOf('#') != -1?url.split('#'):[url],
        code = /code=([0-9a-zA-Z]{32})&state=(STATE|state)/i;//code值
    if(route && route.length != 0){
      router['protocol'] = route[0].match(protocol)[1];
      router['domain'] = route[0].match(domain)[1];
      if(port.test(route[0])){
        router['port'] = route[0].match(port)[1];
      }
      if(code.test(route[0])){
         router['code'] = route[0].match(code)[1];
         router['state'] = route[0].match(code)[2];
      }
      if(route[1] && route[1].indexOf('?') != -1){
        if(code.test(route[1])){
          router['code'] = route[1].match(code)[1];
          router['state'] = route[1].match(code)[2];
        }
        //参数
        router['path'] = route[1].substring(0,route[1].indexOf('?'));
        route[1] = route[1].substring(route[1].indexOf('?')+1);
        let queryArray = route[1].split('&');
        let query = {};
        queryArray.forEach( queryItem => {
           let item = queryItem.split('=');
           query[item[0]] = item[1];
        });
        router['query'] = query;
      }else{
        router['path'] = route[1];
      }
    }
  }else{
    let urlReg = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
        domain = /(https|http:\/\/)*([a-zA-Z0-9]+\.[a-zA-Z0-9]+\.*[a-zA-Z0-9]*\.*[a-zA-Z0-9]*|localhost)/,
        route = url.match(urlReg),
        protocol = /(https|http):\/\//;
    if(!route && route.length == 0) return null; 
    if(url.match(protocol) && url.match(protocol).length != 0 && url.match(protocol)[1]){
      router['protocol'] = url.match(protocol)[1];
    }
    if(url.match(domain) && url.match(domain).length != 0 && url.match(domain)[2]){
      router['domain'] = url.match(domain)[2]; 
    }
    if(route[4]){ 
      if(url.indexOf('?') != -1){
        let path = route[4].substring(0,route[4].indexOf('?'));
        router['path'] = path;
        path = route[4].substring(route[4].indexOf('?') + 1);
        let queryArray = path.split('&');
        let query = {};
        queryArray.forEach( queryItem => {
           let item = queryItem.split('=');
           query[item[0]] = item[1];
        });
        router['query'] = query;
      }else{
        router['path'] = route[4];
      } 
    }
  }
  return router;
}


