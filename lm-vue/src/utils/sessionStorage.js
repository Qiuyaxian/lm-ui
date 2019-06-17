/**
 * [$sessionStorage 封装 promise版本 sessionStorage]
 * @type {Object}
 */
function SessionStorage () {  
}
SessionStorage.error = function (message) {
  throw new Error(message);
}
/**
 * [check 检查是否支持sessionStorage]
 * @return {[type]} [description]
 */
SessionStorage.check = function () {
  return sessionStorage || (window && window.sessionStorage) ? true : false;
}
/**
 * [get 异步获取sessionStorage值]
 * @param  {[type]} storageKey [description]
 * @return {[type]}      [description]
 */
SessionStorage.get = function (storageKey) {
  return new Promise((resolve, reject) => {
    this.getSync(storageKey, (value, message) => {
      value ? resolve(value) : reject(message);
    });
  });
}
/**
 * [getSync 同步获取sessionStorage值]
 * @param  {[type]} storageKey [description]
 * @return {[type]}      [description]
 */
SessionStorage.getSync = function (storageKey) {
  if (!storageKey) return null;
  if (this.check()) {
    try {
      const value = sessionStorage.getItem(storageKey);
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
    
  }
}
/**
 * [set 异步设置sessionStorage值]
 * @param {[type]} storageKey  [description]
 * @param {[type]} value [description]
 */
SessionStorage.set = function (storageKey, value) {
  return new Promise((resolve, reject) => {
    _this.setSync(storageKey, value, (value, message) => {
      value ? resolve(value) : reject(message);
    });
  });
}
/**
 * [setSync 同步设置sessionStorage值]
 * @param {[type]}   storageKey     [description]
 * @param {[type]}   value    [description]
 * @param {Function} callback [description]
 */
SessionStorage.setSync = function (storageKey, value, callback) {
  if (!storageKey) return false;
  if (!value) return false;
  if (this.check()) {
    try {
       typeof value === 'string'
      ? sessionStorage.setItem(storageKey, value)
      : sessionStorage.setItem(storageKey, JSON.stringify(value));
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
    this.error('不支持sessionStorage')
  }
}
/**
 * [del 异步删除sessionStorage值]
 * @param  {[type]} storageKey [description]
 * @return {[type]}      [description]
 */
SessionStorage.del = function (storageKey) {
  return new Promise((resolve, reject) => {
    this.delSync(storageKey, (value, message) => {
      value ? reject(value) : resolve(message)
    });
  });
}
/**
 * [delSync 同步删除sessionStorage值]
 * @param  {[type]} storageKey [description]
 * @return {[type]}      [description]
 */
SessionStorage.delSync = function (storageKey, callback) {
  if (!storageKey) return false;
  if (this.check()) {
    try {
      sessionStorage.removeItem(storageKey);
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
    this.error('不支持sessionStorage');
  }
}
/**
 * [clear 异步清除所有sessionStorage值]
 * @return {[type]} [description]
 */
SessionStorage.clear = function () {
  let _this = this;
  return new Promise((resolve, reject) => {
    _this.clearSync((value, message) => {
      value ? resolve(value) : reject(message);
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
        callback(true, '')
      } else {
        return true;
      }
    } catch (e) {
      // 删除异常
      if (callback) {
        callback(false, e.message);
      } else {
        console.error(e.message);
        return false;
      }
    }
  } else {
    this.error('不支持sessionStorage')
  }
}
export default SessionStorage;