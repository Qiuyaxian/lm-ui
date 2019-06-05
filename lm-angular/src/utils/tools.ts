import objectAssign from 'object-assign'

// is 是
export type IsType<T> = (val: any) => val is T;
// extends 继承
// export type Extends<T,U> = T extends U;
// readonly 只读
export type Readonly<T> = { readonly [P in keyof T]: T[P] };
// 利用K extends keyof WindowEventMap将参数type:K限制在WindowEventMap的键值列表，listener中的参数ev限定为WindowEventMap对应K相应的值
declare function addEventListener<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;

/**
 * [noop 通用默认方法]
 * @return {[type]} [description]
 */
const _prototype = Object.prototype,
      _hasOwnProperty = _prototype.hasOwnProperty,
      _toString = data => _prototype.toString.call(data);
      
export function noop (): void { }; 
/**
 * [isProduction 是否是生产环境]
 * process.env.NODE_ENV === 'production'  正式环境
   process.env.NODE_ENV === 'development' 正式环境
 * @return {Boolean} [description]
 */
export function isProduction (): boolean {
  return process.env.NODE_ENV === 'production';
} 
/**
 * [isWechat 判断是否是微信浏览器]
 * @param  {[type]}  userAgent [description]
 * @return {Boolean}           [description]
 */
export function isWechat (userAgent: string = (window && window.navigator.userAgent) || ''): boolean {
  return /micromessenger/gi.test(userAgent);
}
/**
 * [遍历]
 * @param  {[type]}   data     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
export function each(data: any[], callback: Function): void {
  if(data.forEach){ 
    data.forEach( (item, index) => { 
      callback.call(null, item, index);
    });
  }else{
    for (let i = 0; i <= data.length; i++) { 
      callback.call(null, data[i], i);
    }
  }
}

/**
 * [hasOwn 判定是否拥有某一个key, 可以减少调用的麻烦]
 * @param  {[type]}  obj [description]
 * @param  {[type]}  key [description]
 * @return {Boolean}     [description]
 */
export function hasOwn(obj: object, key: string): boolean {
  return _hasOwnProperty.call(obj, key);
}
/**
 * [isEqual 判断两个对象是否相等，必须类型与值都一致]
 * @param  {[type]}  obj1 [description]
 * @param  {[type]}  obj2 [description]
 * @return {Boolean}      [description]
 */
export function isEqual (obj1: any, obj2: any, type: boolean = false): boolean {
  if (type) {
    if(!isNaN(+obj1) && isNumber(+obj1)) obj1 = +obj1;
    if(!isNaN(+obj2) && isNumber(+obj2)) obj2 = +obj2;
  } 
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
/**
 * [trim 去除前后空格]
 * @param  {[type]} string [description]
 * @return {[type]}        [description]
 */
export function trim (string: string): any {
  if (isString(string)) return string.replace(/(^\s*)|(\s*$)/g,'');
}
/**
 * [classTypeMap 存储类型错误key-value]
 * @type {Object}
 */
let classTypeMap = {};
/**
 * [判断类型]
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
export function classType(obj: any): string {
  return obj === null ? String( obj ) : classTypeMap[ toString.call(obj) ] || "object";
}
/**
 * [生成类型map]
 * @param  {[type]} _       [description]
 * @param  {[type]} name){                 classTypeMap["[object " + name + "]"] [description]
 * @return {[type]}         [description]
 */
each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(name, index){  
  classTypeMap["[object " + String(name) + "]"] = name.toLowerCase();    
});   
/**
 * [isArray 判断是否是数组值]
 * @param  {[type]}  arr [description]
 * @return {Boolean}     [description]
 */
export function isArray (obj: any): boolean {
   return classType(obj) === 'array' 
} 
/**
 * [isFunction 判断是否是函数值]
 * @param  {Function} fn [description]
 * @return {Boolean}     [description]
 */
export function isFunction (obj: any): boolean {
  return classType(obj) === 'function';
}
/**
 * [isNumber 判断是否是数值]
 * @param  {[type]}  num [description]
 * @return {Boolean}     [description]
 */
export function isNumber (obj: any): boolean {
  return classType(obj) === 'number';
}
/**
 * [isObject 判断是否是一个object值]
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
export function isObject (obj: any): boolean { 
  return classType(obj) === 'object';
}
/**
 * [isTypeError 判断是否是Error类型]
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
export function isTypeError (obj: any): boolean { 
  return classType(obj) === 'error';
}
/**
 * [isBoolean 判断是否是Boolean类型]
 * @param  {[type]}  boolean [description]
 * @return {Boolean}         [description]
 */
export function isBoolean (obj: any): boolean {
  return classType(obj) === 'boolean';
}

/**
 * [isString 判断是否是字符串类型]
 * @param  {[type]}  string [description]
 * @return {Boolean}        [description]
 */
export function isString (obj: any): boolean {
  return classType(obj) === 'string';
}
/**
 * [isNull 判断是否是null类型]
 * @param  {[type]}  type [description]
 * @return {Boolean}      [description]
 */
export function isNull (obj: any): boolean {
  return classType(obj) === 'null';
}
/**
 * [isUndefined 判断是否是undefined类型]
 * @param  {[type]}  type [description]
 * @return {Boolean}      [description]
 */
export function isUndefined (obj: any): boolean {
  return classType(obj) === 'undefined';
} 
/**
 * [isEmptyObject 是否是空对象]
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
export function isEmptyObject (obj: object): boolean {
  for (let key in obj) {
    return false;
  }
  return true;
}
/**
 * [toArray 将类数组转换为真正的数组]
 * @param  {[type]} array [description]
 * @return {[type]}       [description]
 */
export function toArray (array) {
  return Array.prototype.slice.call(array);
}
/**
 * [inObject 检查是否存在某一个key值]
 * @param  {[type]} obj [description]
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
export function inObject (obj: object, key: string): boolean {
  if (hasOwn(obj, key)) return true;
  else {
    for(let name in obj){ 
      if(isObject(obj[name])) return inObject(obj[name], key);
    }
    return false;
  }
}
/**
 * [extend 合并函数]
 * @param  {[type]} des [description]
 * @param  {[type]} src [description]
 * @return {[type]}     [description]
 */
export function extend (...argument: any[]): any { 
  let args = toArray(arguments),
      arg = args.shift();
  if (objectAssign) { 
    return objectAssign.call(null, arg, ...args);
  } else { 
    if (Object.assign) { 
      for (let i = 0; i < args.length; i++ ) {
        arg = Object.assign(arg, args[i]);
      }
      return arg; 
    } else {
      for (let i = 0; i < args.length; i++ ) { 
        prop (args[i], function (p) {
          arg[p] = args[i][p];
        });
      } 
      return arg;
    }
  }  
}
/**
 * [prop 合并函数]
 * @param  {[type]} obj [description]
 * @param  {[type]} fun [description]
 * @return {[type]}     [description]
 */
function prop (obj: object, fun: Function): void {
  for (var p in obj) {
    hasOwn(obj, p) && fun(p);
  }
}
/* -------- 基础方法 start ---------- */
/**
 * [deep 深浅拷贝]
 * @return {[type]} [description]
 */
export function copy (obj: object): object {
  return JSON.parse(JSON.stringify(obj));
}

