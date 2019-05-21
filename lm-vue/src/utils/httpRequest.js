import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import merge from 'lodash/merge'
import store from '../vuex'

import { 
  _sessionStorage,
  _localStorage ,
  urlParse,
  isWechat, 
  isCodeAuth, 
  loading, 
  isProduction,
  errorHandle 
} from '@/utils'
 
var config = require('../../config/blc.config.js');
const baseURL = isProduction() ? config.prod['axios_url'] : config.dev['axios_url']; 


const http = axios.create({
  baseURL: baseURL,
  timeout: 1000 * 60,
  async:true,
  crossDomain:true,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

/**
 * [CancelToken 取消网络请求，通过一个CancelToken 取消多个重复请求]
 * @type {[type]}
 */
let CancelToken = axios.CancelToken;
let source = CancelToken.source();

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  // 请求头带上token
  if(_localStorage.getSync('token')){
    config.headers['token'] = _localStorage.getSync('token')
  } 
  // 附加取消网络请求属性
  config.cancelToken = source.token;
  return config;
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {  
  let { status, data, config: responseConfig } = response, 
      { method: methodType } = responseConfig; 
  if(status == 200 && data){
    let { code, message: msg } = data;  
    switch(code){  
      case '0':
      //操作成功 -> 显示页面数据
         
      break; 
      case '401':
      case '20401':
        /**
         * 未授权
         * 首先先记录当前的访问的页面，存储到本地localStroage，然后进行页面跳转，
         * 在auth页面上发送code给后端，成功则从本地存储读取要访问的指定页面，失败则跳转错误页面
        */
        if(_localStorage.getSync('token')){
          //存在就清除缓存
          _localStorage.delSync('token');
        }   
        throw new Error(`${code}:${ methodType }:未授权的`);
      break;
      // 业务性性错误 -> 
      // 弹出错误信息窗
      // 通过请求方法类型判断
      // get  获取数据问题错误 -> 显示错误页面 
      // post 提交数据问题错误 -> 弹窗
      case '20500':
        throw new Error(`${code}:${ methodType }:${msg}`);
      break;
      // 系统性错误 -> 显示错误页面
      case '10500': 
        throw new Error(`${code}:${ methodType }:${msg}`);
      break;
      // 未知错误
      default:
        throw new Error(`${code}:${ methodType }:${msg}`);
      break; 
    }  
  }else{ 
    switch(status){
      case '401':
        //未登录
        if(_localStorage.getSync('token')){
          //存在就清除缓存
          _localStorage.delSync('token');
        } 
      break;
      default:  
         // 未知错误
        throw new Error(`unknown:${ methodType }:未知错误`)
      break; 
    } 
  } 
  return response; 
}, error => {
  let message = '';
  if(axios.isCancel(error)) {
    source.cancel('取消网络请求')
  }  
  // 抛出错误
  if(error && error.response){  
    let { response } = error,
        { status, data, config: responseConfig } = response,
        { method: methodType } = responseConfig;
    switch(status){
      //错误的请求
      case '400':
        message = `400:${ methodType }:服务器不理解请求的语法`;
      break;
      case '403':
        message = `403:${ methodType }:服务器拒绝请求`;
      break;
      //页面丢失
      case '404':
        message = `404:${ methodType }:页面不见了`;
      break;
      // 方法不被允许
      case '405':
        message = `405:${ methodType }:方法不被允许`;
      break;
      // 系统错误
      case '500':
        message = `500:${ methodType }:服务器遇到错误，无法完成请求`;
      break;
      //未实现
      case '501':
        message = `501:${ methodType }:未实现`;
      break;
      // 网关错误 (Bad gateway)
      case '502':
        message = `501:${ methodType }:网关错误`;
      break;
      // 服务不可用 (Service unavailable)
      case '503':
        message = `501:${ methodType }:服务不可用`;
      break;
      // 未知错误
      default: 
        message = `unknown:${ methodType }:未知错误`; 
      break;
    } 
  }else{ 
    if(/Network/i.test(error.message)){ 
      message = `Network:${ methodType }:无法连接网络，请刷新重试~`;
    }else{ 
      message = `unknown:${ methodType }:未知错误`;
    }
  }  
  //error.message = message;   
  /**
   * 等待完善
   */
  return Promise.reject(new Error(message));
  //return Promise.resolve(error);
  //return Promise.reject(error);
})

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  return actionName;
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
  var defaults = {
    't': new Date().getTime()
  }
  return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
  var defaults = {
    't': new Date().getTime()
  }
  data = openDefultdata ? merge(defaults, data) : data
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}
/**
 * [axios all使用 处理同级并发]
 * @param  {[type]} array 传入要并发处理的数据
 * @return {[Promise]} Promise  返回一个Promise   
 */
http.all = (array) => {
  //加载loading
  loading.show('加载中...');
  return axios.all(array);
}
/**
 * [处理 axios all 的结果 ]
 * @param  {Function} callback 传入一个处理函数
 * @return {Function}            返回一个工厂函数
 */
http.spread = (callback) => {
  return function (args) { 
    // let responseCode = [], 
    //     responseMsg, 
    //     responseData = [];
    // args.forEach(arg => { 
    //   let { data } = arg; 
    //   responseCode = data.code;
    //   responseMsg = data.msg;  
    // }); 
    loading.hide();
    callback.call(null, ...args);
  }
} 

export default http
