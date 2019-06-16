import { stateHandle, isString, isFunction } from './tools.js'
/**
 * [$sessionStorage 封装 promise版本 sessionStorage]
 * @type {Object}
 */
function SessionStorage (options = { method: 'get', name: '', value: '', callback: null }) {
  if (SessionStorage.check()) {
    if (options['method'] === 'getSync') {
      if (options['callback']) options['callback'](SessionStorage[options['method']](options['name']))
      else return SessionStorage[options['method']](options['name'])
    } else {
      return SessionStorage[options['method']](options['name'])
    }
  }
}
/**
 * [check 检查是否支持sessionStorage]
 * @return {[type]} [description]
 */
SessionStorage.check = function () {
  if (sessionStorage || (window && window.sessionStorage)) return true;
  else return false;
}
/**
 * [get 异步获取sessionStorage值]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
SessionStorage.get = function (name) {
  let _this = this;
  return new Promise((resolve, reject) => {
    let value = _this.getSync(name);
    value ? resolve(value) : reject(null);
  });
}
/**
 * [getSync 同步获取sessionStorage值]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
SessionStorage.getSync = function (name) {
  if (!name) return false;
  if (this.check()) {
    let value = value;
    if (value) {
      if (/^\{.*?\}$/gi.test())
        return JSON.parse(value);
      else
        return value;
    } else return null;
  } else stateHandle('不支持sessionStorage')
}
/**
 * [set 异步设置sessionStorage值]
 * @param {[type]} name  [description]
 * @param {[type]} value [description]
 */
SessionStorage.set = function (name, value) {
  let _this = this;
  return new Promise((resolve, reject) => {
    _this.setSync(name, value, data => {
      data ? resolve(value) : reject(null);
    });
  });
}
/**
 * [setSync 同步设置sessionStorage值]
 * @param {[type]}   name     [description]
 * @param {[type]}   value    [description]
 * @param {Function} callback [description]
 */
SessionStorage.setSync = function (name, value, callback) {
  if (!name) return false;
  if (!value) return false;
  if (this.check()) {
    if (isString(value)) {
      sessionStorage.setItem(name, value);
    } else {
      sessionStorage.setItem(name, JSON.stringify(value));
    }
    //判断是否存储成功
    if (callback && isFunction(callback)) {
      callback && callback(this.getSync(name));
    } else {
      return this.getSync(name);
    }
  } else stateHandle('不支持sessionStorage');
}
/**
 * [del 异步删除sessionStorage值]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
SessionStorage.del = function (name) {
  let _this = this;
  return new Promise((resolve, reject) => {
    _this.delSync(name, (value) => {
      value ? reject(value) : resolve(value)
    });
  });
}
/**
 * [delSync 同步删除sessionStorage值]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
SessionStorage.delSync = function (name, callback) {
  if (!name) return false;
  if (this.check()) {
    try {
      sessionStorage.removeItem(name);
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
  } else stateHandle('不支持sessionStorage');
}
/**
 * [clear 异步清除所有sessionStorage值]
 * @return {[type]} [description]
 */
SessionStorage.clear = function () {
  let _this = this;
  return new Promise((resolve, reject) => {
    _this.clearSync((value) => {
      value ? resolve(value) : reject(value);
    })
  });
}
/**
 * [clearSync 同步清除所有sessionStorage值]
 * @return {[type]} [description]
 */
SessionStorage.clearSync = function (callback) {
  if (this.check()) {
    try {
      sessionStorage.clear();
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
  }
  else stateHandle('不支持sessionStorage');
}
export default SessionStorage;