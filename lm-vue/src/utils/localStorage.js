import { stateHandle } from './tools.js'
/**
 * [$LocalStorage 封装 promise版本 LocalStorage ]
 * @type {Object}
 */
export default class LocalStorage {
  constructor(options = { method:'get', name:'', value:'', callback: null  }) { 
  	if(LocalStorage.check()){
	  if(options['method'] == 'getSync'){
	    if(options['callback']) options['callback'](LocalStorage[options['method']](options['name']))
	    else return LocalStorage[options['method']](options['name'])
	  }else{
	    return LocalStorage[options['method']](options['name'])	
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
   * @param  {[type]} name [description]
   * @return {[type]}      [description]
   */
  static get(name){
	let _this = this;
	return new Promise((resolve,reject)=>{
      if(_this.getSync(name)){
        resolve(_this.getSync(name));
      }else{
        reject(null);
      }
	}).catch( err => err); 
  }
  /**
   * [getSync 同步获取localStorage值]
   * @param  {[type]} name [description]
   * @return {[type]}      [description]
   */
  static getSync(name) {
    if(!name) return false;
    if(LocalStorage.check()){
      if( localStorage.getItem(name) ){
        if( /^\{.*?\}$/gi.test( localStorage.getItem(name) ) )
          return JSON.parse(localStorage.getItem(name));
        else
          return localStorage.getItem(name); 
      }else return null;
    }else stateHandle('不支持localStorage');
   }
   /**
    * [set 异步设置localStorage值]
    * @param {[type]} name  [description]
    * @param {[type]} value [description]
    */
   static set(name,value){
	 let _this = this;
	 return new Promise( ( resolve, reject) => {
	   _this.setSync(name,value,(value)=>{
	     resolve(value);
	   });
	 }).catch( err => err); 
   }
   /**
    * [setSync 同步获取localStorage值]
    * @param {[type]}   name     [description]
    * @param {[type]}   value    [description]
    * @param {Function} callback [description]
    */
   static setSync(name,value, callback) {
	 if(!name) return false;
	 if(!value) return false;
	 if(LocalStorage.check()){  
	   if(typeof(value) == 'string')
	     localStorage.setItem( name, value );
	   else
	     localStorage.setItem( name, JSON.stringify(value) );
	   if(callback) {
	     if(this.getSync(name) != null){
	       callback && callback(value);
	     }else{
	       stateHandle('null指针异常');
	     }
	   }else{
	   	 if(this.getSync(name) != null){
   	 	   return new Promise( (resolve,reject) => {
		     if(!this.getSync(name)){
		       reject()
		     }else{
		       resolve(this.getSync(name));
		     }
		   }).catch( err => err);
	   	 } 
	     else return null;
	   }
	 }else{
	   stateHandle('不支持LocalStorage')
	 };
   }
   /**
    * [del 异步删除localStorage值]
    * @param  {[type]} name [description]
    * @return {[type]}      [description]
    */
   static del(name){
	 let _this = this;
	 return new Promise( (resolve,reject) => {
	   _this.delSync(name);
	   if(_this.getSync(name)){
	     reject()
	   }else{
	     resolve(null);
	   }
	 }).catch( err => err); 
   }
   /**
    * [delSync 同步获取localStorage值]
    * @param  {[type]} name [description]
    * @return {[type]}      [description]
    */
   static delSync(name){
	 if( !name ) return false;
	 if(LocalStorage.check()) 
	   localStorage.removeItem(name);
	 else 
	   stateHandle('不支持LocalStorage');
   }
   /**
    * [clear 异步清除所以localStorage值]
    * @return {[type]} [description]
    */
   static clear(){
	 let _this = this;
	 return new Promise( ( resolve, reject) => {
	   _this.clearSync();
	   resolve(null);
	 }).catch( err => err); 
   } 
   /**
    * [clearSync 同步清除localStorage值]
    * @return {[type]} [description]
    */
   static clearSync() {
	 if(LocalStorage.check())
	   localStorage.clear(); 
	 else 
	   stateHandle('不支持LocalStorage');
   }
} 
  
  
  
  
