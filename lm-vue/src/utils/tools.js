import objectAssign from 'object-assign'
import Store from '@/vuex'
import { getByTagName, querySelector } from './dom'
/**
 * [noop 通用默认方法]
 * @return {[type]} [description]
 */
export function noop () { }; 
/**
 * [isProduction 是否是生产环境]
 * process.env.NODE_ENV === 'production'  正式环境
   process.env.NODE_ENV === 'development' 正式环境
 * @return {Boolean} [description]
 */
export function isProduction () {
  return process.env.NODE_ENV === 'production';
} 
/**
 * [isWechat 判断是否是微信浏览器]
 * @param  {[type]}  userAgent [description]
 * @return {Boolean}           [description]
 */
export function isWechat (userAgent = (window && window.navigator.userAgent) || '') {
  return /micromessenger/gi.test(userAgent);
}
/**
 * [stateHandle 抛出错误异常]
 * @param  {[type]} args [description]
 * @return {[type]}      [description]
 */
export function stateHandle (args) {
  throw new Error(args);
}
/**
 * [遍历]
 * @param  {[type]}   data     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
export const each = (data, callback) => {
  if(data.forEach){ 
    data.forEach( (item, index) => { 
      callback.call(null, item, index);
    });
  }else{
    for (let i = 0; i <= data.length; i++) { 
      callback.call(null, data[i], i);
    }
  }
};
const _prototype = Object.prototype,
      _hasOwnProperty = _prototype.hasOwnProperty,
      _toString = data => _prototype.toString.call(data);
/**
 * [hasOwn 判定是否拥有某一个key, 可以减少调用的麻烦]
 * @param  {[type]}  obj [description]
 * @param  {[type]}  key [description]
 * @return {Boolean}     [description]
 */
export const hasOwn = (obj, key) => _hasOwnProperty.call(obj, key);
/**
 * [isEqual 判断两个对象是否相等，必须类型与值都一致]
 * @param  {[type]}  obj1 [description]
 * @param  {[type]}  obj2 [description]
 * @return {Boolean}      [description]
 */
export function isEqual (obj1, obj2, type = false) {
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
export function trim (string) {
  if (isString(string)) return string.replace(/(^\s*)|(\s*$)/g,''); 
  else stateHandle('js错误:string是不是一个字符串');
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
export const classType = (obj) => { return obj == null ? String( obj ) : classTypeMap[ toString.call(obj) ] || "object"; };
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
export function isArray (obj) {
   return classType(obj) === 'array' 
} 
/**
 * [isFunction 判断是否是函数值]
 * @param  {Function} fn [description]
 * @return {Boolean}     [description]
 */
export function isFunction (obj) {
  return classType(obj) === 'function';
}
/**
 * [isNumber 判断是否是数值]
 * @param  {[type]}  num [description]
 * @return {Boolean}     [description]
 */
export function isNumber (obj) {
  return classType(obj) === 'number';
}
/**
 * [isObject 判断是否是一个object值]
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
export function isObject (obj) { 
  return classType(obj) === 'object';
}
/**
 * [isTypeError 判断是否是Error类型]
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
export function isTypeError (obj) { 
  return classType(obj) === 'error';
}
/**
 * [isBoolean 判断是否是Boolean类型]
 * @param  {[type]}  boolean [description]
 * @return {Boolean}         [description]
 */
export function isBoolean (obj) {
  return classType(obj) === 'boolean';
}

/**
 * [isString 判断是否是字符串类型]
 * @param  {[type]}  string [description]
 * @return {Boolean}        [description]
 */
export function isString (obj) {
  return classType(obj) === 'string';
}
/**
 * [isNull 判断是否是null类型]
 * @param  {[type]}  type [description]
 * @return {Boolean}      [description]
 */
export function isNull (obj) {
  return classType(obj) === 'null';
}
/**
 * [isUndefined 判断是否是undefined类型]
 * @param  {[type]}  type [description]
 * @return {Boolean}      [description]
 */
export function isUndefined (obj) {
  return classType(obj) === 'undefined';
} 
/**
 * [isEmptyObject 是否是空对象]
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
export function isEmptyObject (obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}
/**
 * [inArray 某一个数组中是否存在某一个对象]
 * @param  {[type]} obj [description]
 * @param  {[type]} arr [description]
 * @param  {[type]} i   [description]
 * @return {[type]}     [description]
 */
export function inArray (obj, arr, i) {
  let len;
  if ( arr ) {
    if ( indexOf ) { return indexOf.call( arr, elem, i ); }
    len = arr.length;  
    i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;
    for ( ; i < len; i++ ) {
      if ( i in arr && arr[ i ] === elem ) { return i; }
    }
  }
  return -1;
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
export function inObject (obj, key) {
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
export function extend () { 
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
function prop (obj, fun) {
  for (var p in obj) {
    hasOwn(obj, p) && fun(p);
  }
}

/* -------- 基础方法 start ---------- */

/**
 * [deep 深浅拷贝]
 * @return {[type]} [description]
 */
export function copy (obj, isDeep = false) {
  if (isBoolean(isDeep) && isDeep) return JSON.parse(JSON.stringify(obj));
  else return Object.assign({},obj);
}

/**
 * [getPropByPath 获取路径]
 * @param  {[type]} obj    [description]
 * @param  {[type]} path   [description]
 * @param  {[type]} strict [description]
 * @return {[type]}        [description]
 */
export function getPropByPath (obj, path, strict) {
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');
  let keyArr = path.split('.'),
      i = 0;
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    let key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        stateHandle('js错误:please transfer a valid prop path to form item!');
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  };
};

/**
 * [errorHandler 统一全局错误函数处理]
 * @param  {[type]} error [description]
 * @return {[type]}       [description]
 */ 
export function errorHandle (error, context) {
  loading.hide(); 
  let message;
  if (isTypeError(error)) {  
    if (error.reason) {
      message = `${ error.reason.name }:${ error.reason.message }`;
    } else if (error.name) {
      message = `${ error.name }:${ error.message }`;
    } else { 
      message = 'unknown:未知错误';
    }
  } else if (isString(error)) {
    message = error;
  } else { 
    message = 'unknown:未知错误';
  } 
  /**
   *  1.可以根据状态不一样处理不一样的错误
   *    根据不同状态是否进行页面跳转，
   *    1 get方式加载  20500 -> 显示错误页面 
   *    2 post方式操作 20500 -> 提示错误信息
   */  
  context && context.updateMessageHandle(message);
  //Store.dispatch('system/updateMessage', message);
  //可以接入错误上报日志
}
/**
 * [setTitle 设置头部]
 * @param {String} title [description]
 */
export function setTitle (title = '百丽春微商城') {
  document.title = title;
  // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新 (容易导致路由被执行两次)
  if (getByTagName('title') && getByTagName('title').length !== 0) {
    getByTagName('title')[0].innerHTML = title;
  } else if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    //hack写法
    const hackIframe = document.createElement('iframe')
    hackIframe.style.display = 'none'
    hackIframe.src = '/robots.txt?r=' + Math.random();
    document.body.appendChild(hackIframe);
    let timer = setTimeout( _ => {
      document.body.removeChild(hackIframe);
      clearTimeout(timer);
    }, 30 );
  }
}

/**
 * demo
 */
// function getItems(name,callback) {
//   if(localStorage.getItem(name)){
//   callback(null, localStorage.getItem(name));
//   }else{ 
//   callback(null);
//   }
// }
// var tests = promisify(getItems); 
// tests('token').then((value)=>{
//   console.log(value,"------")
// })
/**
 * [promisify promise 工厂函数,专门处理promise的使用，捕获相对于的错误异常]
 * @param  {[type]} argument [传入一个函数]
 * @return {[type]}          [返回一个promise调用函数,以及error-first错误风格]
 * function test (key, callback){  
      try{
        let result = sessionStorage.getItem(key);
        callback && callback(null, result);
      }catch(e){
        callback && callback(e)
      }
    }
    let promisifyTest = promisify(test);
    promisifyTest('name2').then((error, value) => {
      console.log(error, value, 'assets/')
    });
 */
export function promisify (fn) {
  return function() {
    var args = [].slice.call( arguments );
    return new Promise( function(resolve, reject){  
      fn.apply( null, args.concat(function(err, val){ 
        if (err) {
          return reject( err );
        } else {
          return resolve( val );
        }
      }));
    }); 
  };
}; 


// Easing Equations (c) 2003 Robert Penner, all rights reserved.
// Open source under the BSD License.
/**
 * [easeOutCubic 弹性运动]
 * @param  {[type]} pos [description]
 * @return {[type]}     [description]
 */
export function easeOutCubic (pos) {
  return (Math.pow((pos - 1), 3) + 1)
}
/**
 * [easeInOutCubic 弹性运动]
 * @param  {[type]} pos [description]
 * @return {[type]}     [description]
 */
export function easeInOutCubic (pos) {
  if ((pos /= 0.5) < 1) {
    return 0.5 * Math.pow(pos, 3)
  }
  return 0.5 * (Math.pow((pos - 2), 3) + 2)
}

//生成器 +Promise 协同运作模式(序列)。
function run (gen) {
  var args = [].slice.call(arguments, 1),
      it;
  it = gen.apply(this, args);
  return Promise.resolve().then( function handleNext(value){
  var next = it.next(value);
    return ( function handleResult(next){
      if (next.done) {
        return next.value;
      } else if(typeof next.value == 'function'){
        return new Promise( function(resolve,reject){
          next.value( function(err,msg) {
            if (err) {
              reject(err);
            }else{ 
              resolve(msg);
            }
          })
        }).then( handleNext, function handleErr(err){
          return Promise.resolve( it.throw(err) ).then( handleResult );
        });
      } else {
        return Promise.resolve( next.value ).then( handleNext,function handleErr(err){
          return Promise.resolve(it.throw(err)).then( handleResult )
        })
      }
    })(next);
  })
}
