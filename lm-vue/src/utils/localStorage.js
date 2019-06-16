import { stateHandle } from './tools.js'
/**
 * [$LocalStorage 封装 promise版本 LocalStorage ]
 * @type {Object}
 */
export default class LocalStorage {
  constructor(options = { method: 'get', name: '', value: '', callback: null }) {
    if (LocalStorage.check()) {
      if (options['method'] === 'getSync') {
        if (options['callback']) options['callback'](LocalStorage[options['method']](options['name']))
        else return LocalStorage[options['method']](options['name'])
      } else {
        return LocalStorage[options['method']](options['name'])
      }
    }
  }
  /**
   * [check 是否支持localStorage]
   * @return {[type]} [description]
   */
  static check () {
    if (window && window.localStorage) return true;
    else return false;
  }
  /**
   * [get 异步获取localStorage值]
   * @param  {[type]} name [description]
   * @return {[type]}      [description]
   */
  static get (name) {
    let _this = this;
    return new Promise((resolve, reject) => {
      let value = _this.getSync(name);
      value ? resolve(value) : reject(null);
    });
  }
  /**
   * [getSync 同步获取localStorage值]
   * @param  {[type]} name [description]
   * @return {[type]}      [description]
   */
  static getSync (name) {
    if (!name) return false;
    if (LocalStorage.check()) {
      let value = localStorage.getItem(name)
      if (value) {
        if (/^\{.*?\}$/gi.test(value))
          return JSON.parse(value);
        else
          return value;
      } else return null;
    } else stateHandle('不支持localStorage');
  }
  /**
   * [set 异步设置localStorage值]
   * @param {[type]} name  [description]
   * @param {[type]} value [description]
   */
  static set (name, value) {
    let _this = this;
    return new Promise((resolve, reject) => {
      _this.setSync(name, value, (value) => {
        resolve(value);
      });
    });
  }
  /**
   * [setSync 同步设置localStorage值]
   * @param {[type]}   name     [description]
   * @param {[type]}   value    [description]
   * @param {Function} callback [description]
   */
  static setSync (name, value, callback) {
    if (!name) return false;
    if (!value) return false;
    let _this = this;
    if (LocalStorage.check()) {
      if (typeof (value) === 'string') {
        localStorage.setItem(name, value);
      } else {
        localStorage.setItem(name, JSON.stringify(value));
      }
      let result = _this.getSync(name);
      if (callback) {
        callback && callback(result);
      } else {
        return result;
      }
    } else {
      stateHandle('不支持LocalStorage')
    };
  }
  /**
   * [del 异步删除localStorage值]
   * @param  {[type]} name [description]
   * @return {[type]}      [description]
   */
  static del (name) {
    let _this = this;
    return new Promise((resolve, reject) => {
      _this.delSync(name, (value) => {
        value ? reject(value) : resolve(value);
      });
    });
  }
  /**
   * [delSync 同步删除localStorage值]
   * @param  {[type]} name [description]
   * @return {[type]}      [description]
   */
  static delSync (name, callback) {
    if (!name) return false;
    if (LocalStorage.check()) {
      try {
        localStorage.removeItem(name);
        //判断是否移除成功 返回null
        if (callback) {
          callback(true);
        } else {
          return true;
        }
      } catch (e) {
        // 删除异常
        if (callback) {
          callback(e.message);
        } else {
          return e.message;
        }
      }
    } else {
      stateHandle('不支持LocalStorage');
    }
  }
  /**
   * [clear 异步清除所以localStorage值]
   * @return {[type]} [description]
   */
  static clear () {
    let _this = this;
    return new Promise((resolve, reject) => {
      _this.clearSync(value => {
        value ? resolve(value) : reject(value)
      });
    });
  }
  /**
   * [clearSync 同步清除localStorage值]
   * @return {[type]} [description]
   */
  static clearSync (callback) {
    if (LocalStorage.check()) {
      try {
        localStorage.clear();
        if (callback) {
          callback(true)
        } else {
          return true;
        }
      } catch (e) {
        // 删除异常
        if (callback) {
          callback(e.message);
        } else {
          return e.message;
        }
      }
    } else {
      stateHandle('不支持LocalStorage');
    }
  }
}



