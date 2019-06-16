import { stateHandle } from './tools.js'
/**
 * [$LocalStorage 封装 promise版本 LocalStorage ]
 * @type {Object}
 */
export default class LocalStorage {
  // constructor(options = { method: 'get', name: '', value: '', callback: null }) {
  //   if (LocalStorage.check()) {
  //     if (options['method'] == 'getSync') {
  //       if (options['callback']) options['callback'](LocalStorage[options['method']](options['name']))
  //       else return LocalStorage[options['method']](options['name'])
  //     } else {
  //       return LocalStorage[options['method']](options['name'])
  //     }
  //   }
  // }
  // 使用es6的解构赋值
  constructor({ method = 'get', storageKey = '', callback }) {
    if (this.check()) {
      // 应该使用全等符号，采用严格模式的写法
      if (method === 'getSync') { // 同步执行
        if (callback) {
          callback(this[method](storageKey))
        } else {
          return this[method](storageKey)
        }
      } else { // 异步执行
        return this[method](storageKey)
      }
    }
  }
  /**
   * [check 是否支持localStorage]
   * @return {[type]} [description]
   */
  static check() {
    return window && window.localStorage ? true : false;
  }
  /**
   * [get 异步获取localStorage值]
   * @param  {[type]} storageKey key
   * @return {[type]}      value
   */
  static get(storageKey) {
    return new Promise((resolve, reject) => {
      const value = this.getSync(storageKey);
      value ? resolve(value) : reject(null);
    });
  }
  /**
   * [getSync 同步获取localStorage值]
   * @param  {[type]} storageKey key
   * @return {[type]}      value
   */
  static getSync(storageKey) {
    if (!storageKey) return null; // 应该返回的是null
    if (this.check()) { // this 指向 LocatStorate
      const value = localStorage.getItem(storageKey);
      // 利用三元运算符解决单行的内容块代码会较为简洁方便
      return value ? /^\{.*?\}$/gi.test(value) ? JSON.parse(value) : value : null;
    } else {
      stateHandle('不支持localStorage'); // 这里采用new Error返回一个错误较为合适，又或者在check时便提示
      return null;
    }
  }
  /**
   * [set 异步设置localStorage值]
   * @param {[type]} storageKey  [description]
   * @param {[type]} value [description]
   */
  static set(storageKey, value) {
    return new Promise((resolve, reject) => {
      this.setSync(storageKey, value, (value) => {
        resolve(value);
      });
    });
  }
  /**
   * [setSync 同步设置localStorage值]
   * @param {[type]}   storageKey     [description]
   * @param {[type]}   value    [description]
   * @param {Function} callback [description]
   */
  static setSync(storageKey, value, callback) {
    if (!storageKey || !value) return false;

    if (this.check()) {
      typeof value === 'string'
        ? localStorage.setItem(storageKey, value)
        : localStorage.setItem(storageKey, JSON.stringify(value))

      // 直接判断是否存在回调函数，存在则回调传入当前设置的value
      callback && callback(value);
      // if (callback) {
      //   if (this.getSync(name) != null) {
      //     callback && callback(value);
      //   } else {
      //     stateHandle('null指针异常');
      //   }
      // } else {
      //   if (this.getSync(name) != null) {
      //     return new Promise((resolve, reject) => {
      //       if (!this.getSync(name)) {
      //         reject()
      //       } else {
      //         resolve(this.getSync(name));
      //       }
      //     }).catch(err => err);
      //   } else return null;
      // }
    } else {
      stateHandle('不支持LocalStorage')
    };
  }
  /**
   * [del 异步删除localStorage值]
   * @param  {[type]} storageKey key
   * @return {[type]}      [description]
   */
  static del(storageKey) {
    return new Promise((resolve, reject) => {
      this.delSync(storageKey);
      if (this.getSync(storageKey)) {
        reject()
      } else {
        resolve(null);
      }
    });
  }
  /**
   * [delSync 同步删除localStorage值]
   * @param  {[type]} storageKey [description]
   * @return {[type]}      [description]
   */
  static delSync(storageKey) {
    if (!storageKey) return false;
    this.check() ? localStorage.removeItem(storageKey) : stateHandle('不支持LocalStorage');
  }
  /**
   * [clear 异步清除所以localStorage值]
   * @return {[type]} [description]
   */
  static clear() {
    return new Promise((resolve, reject) => {
      this.clearSync();
      resolve(null);
    });
  }
  /**
   * [clearSync 同步清除localStorage值]
   * @return {[type]} [description]
   */
  static clearSync() {
    this.check() ? localStorage.clear() : stateHandle('不支持LocalStorage');
  }
}
