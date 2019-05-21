import { stateHandle, isString, isFunction } from './tools.js'
/**
 * [$sessionStorage 封装 promise版本 sessionStorage]
 * @type {Object}
 */
function SessionStorage(options = { method:'get', name:'', value:'', callback: null  }) {
  if(SessionStorage.check()){
    if(options['method'] == 'getSync'){
      if(options['callback']) options['callback'](SessionStorage[options['method']](options['name']))
      else return SessionStorage[options['method']](options['name'])
    }else{
       return SessionStorage[options['method']](options['name'])	
    }
  }
}
/**
 * [check 检查是否支持sessionStorage]
 * @return {[type]} [description]
 */
SessionStorage.check = function() {
  if(sessionStorage || (window && window.sessionStorage)) return true;
  else return false;
}
/**
 * [get 异步获取sessionStorage值]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
SessionStorage.get = function(name){
  let _this = this; 
  return new Promise( (resolve, reject) => {
    if(_this.getSync(name)){
      resolve(_this.getSync(name))
    }else{
      reject(null);
    }
  }).catch( err => err); 
}
/**
 * [getSync 同步获取sessionStorage值]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
SessionStorage.getSync = function(name) {
  if(!name) return false;
  if(this.check()){
    if(sessionStorage.getItem(name)){
      if( /^\{.*?\}$/gi.test(sessionStorage.getItem(name)) )
        return JSON.parse(sessionStorage.getItem(name));
      else 
        return sessionStorage.getItem(name);
    }else return null;
  }else stateHandle('不支持sessionStorage')
}
/**
 * [set 异步设置sessionStorage值]
 * @param {[type]} name  [description]
 * @param {[type]} value [description]
 */
SessionStorage.set = function(name, value){  
  let _this = this; 
  return new Promise( ( resolve, reject ) => {
    _this.setSync(name, value, (data)=>{
      if(data){
        resolve(value)
      }else{
        reject(null);
      } 
    }); 
  }).catch( err => err); 
}
/**
 * [setSync 同步设置sessionStorage值]
 * @param {[type]}   name     [description]
 * @param {[type]}   value    [description]
 * @param {Function} callback [description]
 */
SessionStorage.setSync = function(name, value, callback) {
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
      if (this.getSync(name) != null) {
      	return new Promise( ( resolve, reject ) => {
    		  if (!this.getSync(name)) {
    		    reject()
    		  } else {
    		    resolve(this.getSync(name));
    		  }
    		}).catch( err => stateHandle(err)); 
      } else return null;
    }
  }else stateHandle('不支持sessionStorage');
}
/**
 * [del 同步删除sessionStorage值]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
SessionStorage.del = function(name){
  let _this = this;
  return new Promise( ( resolve, reject ) => {
    _this.delSync(name);
    if(_this.getSync(name)){
      reject('删除失败')
    }else{
      resolve(null);
    }
  }).catch( err => err); 
}
/**
 * [delSync 同步删除sessionStorage值]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
SessionStorage.delSync = function(name){
  if(!name) return false;
  if(this.check()){ 
    sessionStorage.removeItem(name);
    //判断是否存储成功
    if(this.getSync(name)){
       return false;
    }else{
       return true;
    }
  }else stateHandle('不支持sessionStorage');
}
/**
 * [clear 异步清除所有sessionStorage值]
 * @return {[type]} [description]
 */
SessionStorage.clear = function(){
  let _this = this;
  return new Promise( ( resolve, reject ) => {
    _this.clearSync();
    resolve();
  }).catch( err => err); 
}
/**
 * [clearSync 同步清除所有sessionStorage值]
 * @return {[type]} [description]
 */
SessionStorage.clearSync = function() {
  if(this.check()) sessionStorage.clear();
  else stateHandle('不支持sessionStorage');
}
export default SessionStorage;