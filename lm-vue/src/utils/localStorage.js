/**
 * [$LocalStorage 封装 promise版本 LocalStorage ]
 * @type {Object}
 */
export default class LocalStorage {
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
      this.getSync(storageKey, (value, message) => {
        value ? resolve(value) : reject(message);
      });
    });
  }
  /**
   * [getSync 同步获取localStorage值]
   * @param  {[type]} storageKey key
   * @return {[type]}      value
   */
  static getSync(storageKey, callback) {
    if (!storageKey) return null;
    if (this.check()) {
      try {
        const value = localStorage.getItem(storageKey);
        const result = value ? /^\{.*?\}$/gi.test(value) ? JSON.parse(value) : value : null;
        if (callback) {
          callback(result, '');
        } else {
          return result;
        }
      } catch (e) {
        // 删除异常
        if (callback) {
          callback(null, e.message);
        } else {
          // 输出错误不影响后续程序运行
          console.error(e.message);
          return null;
        }
      } 
    } else {
      this.error('不支持localStorage'); 
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
      this.setSync(storageKey, value, (value, message) => {
        value ? resolve(value) : reject(message);
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
    if (!storageKey || !value) return null;
    if (this.check()) {
      try {
         typeof value === 'string'
        ? localStorage.setItem(storageKey, value)
        : localStorage.setItem(storageKey, JSON.stringify(value));
        //判断是否移除成功
        if (callback) {
          callback(true, '');
        } else {
          return true;
        }
      } catch (e) {
        // 删除异常
        if (callback) {
          callback(false, e.message);
        } else {
          // 输出错误不影响后续程序运行
          console.error(e.message);
          return false;
        }
      }
    } else {
      this.error('不支持LocalStorage')
    };
  }
  /**
   * [del 异步删除localStorage值]
   * @param  {[type]} storageKey key
   * @return {[type]}      [description]
   */
  static del(storageKey) {
    return new Promise((resolve, reject) => {
      this.delSync(storageKey, (value, message) => {
        value ? reject(value) : resolve(message);
      });
    });
  }
  /**
   * [delSync 同步删除localStorage值]
   * @param  {[type]} storageKey [description]
   * @return {[type]}      [description]
   */
  static delSync(storageKey, callback) {
    if (!storageKey) return null;
    if (this.check()) {
      try {
        localStorage.removeItem(storageKey);
        //判断是否移除成功
        if (callback) {
          callback(true, '');
        } else {
          return true;
        }
      } catch (e) {
        // 删除异常
        if (callback) {
          callback(false, e.message);
        } else {
          // 输出错误不影响后续程序运行
          console.error(e.message);
          return false;
        }
      }
    } else {
      this.error('不支持LocalStorage');
    }
  }
  /**
   * [clear 异步清除所以localStorage值]
   * @return {[type]} [description]
   */
  static clear() {
    return new Promise((resolve, reject) => {
      this.clearSync((value, message) => {
        value ? resolve(value) : reject(message)
      });
    });
  }
  /**
   * [clearSync 同步清除localStorage值]
   * @return {[type]} [description]
   */
  static clearSync(callback) {
    if (this.check()) {
      try {
        localStorage.clear();
        if (callback) {
          callback(true, '')
        } else {
          return true;
        }
      } catch (e) {
        // 删除异常
        if (callback) {
          callback(false, e.message);
        } else {
          // 输出错误不影响后续程序运行
          console.error(e.message);
          return false;
        }
      }
    } else {
      this.error('不支持LocalStorage')
    }
  }
  static error(message) {
    throw new Error(message);
  }
}
