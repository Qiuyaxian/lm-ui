import { isObject, isFunction, isArray, isString, extend } from './index.js';
/**
 * [checkPhone 校验手机号码]
 * @param  {[type]} value [description]
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
function checkPhone(value, param){
  var length = value.length;
  var mobile = /(?:0|86|\+86)?1[3456789]\d{9}/;
  return this.optional(value) || (length == 11 && mobile.test(value));  
}
let addMethods = {
  "mobile":{
     "method": checkPhone,
     "message":"请填写正确的电话号码"
   },
   "phone":{
     "method": checkPhone,
     "message":"请填写正确的电话号码"
   },
   "username":{
     "method": function (value, param) {
     var length = value.length;
     var reg = /\s+/g;
     return this.optional(value) || (length >= 6 && !reg.test(value)); 
   },
   "message":"用户名长度不对"
   },
   "postCode":{
     "method": function (value, param) {
   var length = value.length;
     var reg = /^[0-9]{6}$/g;
     return this.optional(value) || (length >= 6 && reg.test(value)); 
   },
   "message":"用户名长度不对"
   },
},
addMethodMap = {};
for(let key in addMethods){
  if(addMethods[key] && isFunction(addMethods[key].method) && addMethods[key].message){
    addMethodMap[key] = {
      "name":key,
      "method":addMethods[key].method,
      "message":addMethods[key].message
    };   
  }
}
export default addMethodMap;