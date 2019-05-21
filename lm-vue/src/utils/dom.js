/**
 * [cleanStyle 样式过滤]
 * @param  {Object} styles [description]
 * @return {[type]}        [description]
 */
export function cleanStyle (styles = {}) {
  for (let i in styles) {
    if (typeof styles[i] === 'undefined') delete styles[i];
  }
  return styles;
}
/**
 * [获取父级的 props]
 * @param  {[type]} self [description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
export function getParentProp (self, name) {
  if (self.$parent && typeof self.$parent[name] !== 'undefined') return self.$parent[name];
  if (self.$parent && self.$parent.$parent && typeof self.$parent.$parent[name] !== 'undefined') return self.$parent.$parent[name];
}
/**
 * [getParentNode 通过class类查找父级]
 * @param  {[type]} elem      [description]
 * @param  {[type]} className [description]
 * @param  {[type]} context   [description]
 * @return {[type]}           [description]
 */
export function getParentNode (elem, className, context = document) {
  while (!hasClass(elem, className)) {
    elem = elem.parentNode;
    if(hasClass(elem, className)){ 
      break;
    }
    if (elem === context) { 
      break;
    }
  }
  return elem;
}

export function resetScrollIntoView (elem, state = true, time = 10) {
  if (/iphone/i.test(navigator.userAgent)) { 
  } 
  if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {  
    let timer = setTimeout(() => { 
      if(timer) clearTimeout(timer);  
      elem && elem.scrollIntoViewIfNeeded && elem.scrollIntoViewIfNeeded(state);
    }, time);
  }
}
/* ------- dom start -------- */
/**
 * [querySelector 选择dom节点]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
export function querySelector (name, elem = document) { 
  return (typeof name === 'string') ? elem.querySelector(name) : name;
}

/**
 * [querySelectorAll 选择所有dom]
 * @return {[type]} [description]
 */
export function querySelectorAll (name, elem = document) {
  return (typeof name === 'string') ? elem.querySelectorAll(name) : name;
}
/**
 * [getById 通过ID查找dom]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
export function getById (id, elem = document) {
  return (typeof id === 'string') ? elem.getElementById(id) : id; 
}
/**
 * [getByName 通过name 查找input]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
export function getByName (name, elem = document) {
  return (typeof name === 'string') ? elem.getElementsByName(name) : name;
}
/**
 * [getByTagName 通过dom标签 查找html节点]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
export function getByTagName (name, elem = document) { 
  return (typeof name === 'string') ? elem.getElementsByTagName(name) : name;
}
/**
 * [getByClassName 通过class名寻找html节点]
 * @param  {[type]} name [description]
 * @param  {[type]} elem [description]
 * @return {[type]}      [description]
 */
export function getByClassName (name, elem = document) {  
  return (typeof name === 'string') ? elem.getElementsByClassName(name) : name;
}

/**
 * [px2rem 动态计算rem适配]
 * @param  {[type]} val [description]
 * @return {[type]}     [description]
 * demo
 * <div :style="{ 'font-size': $px2rem(28) }">订单商品信息</div>
 */
var dpr = 1;
const Layout = 75;
/**
 * [pxTorem px 转换 rem]
 * @param  {[type]} val [description]
 * @return {[type]}     [description]
 */
export function pxTorem (val) {
  return `${( ( val / Layout ) / dpr ) * 1}rem`;
}   
/**
 * [viewTransform 倍数转换]
 * @param  {[type]} val [description]
 * @return {[type]}     [description]
 */
export function viewTransform (val) {
  return `${ val }` * 2;
} 
/**
 * [hasClass 判断是否存在class样式类]
 * @param  {[type]}  el        [description]
 * @param  {[type]}  className [description]
 * @return {Boolean}           [description]
 */
export function hasClass (el, className) { 
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className);
}
/**
 * [addClass 添加class样式类]
 * @param {[type]} el        [description]
 * @param {[type]} className [description]
 */
export function addClass (el, className) {
  if (hasClass(el, className)) return;
  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
}
/**
 * [removeClass 移除指定class样式]
 * @param  {[type]} el        [description]
 * @param  {[type]} className [description]
 * @return {[type]}           [description]
 */
export function removeClass (el, className) {
  if (!hasClass(el, className)) return;
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
  el.className = el.className.replace(reg, ' ')
}
/**
 * [getData 获取dom上绑定的data-数据]
 * @param  {[type]} el   [description]
 * @param  {[type]} name [description]
 * @param  {[type]} val  [description]
 * @return {[type]}      [description]
 */
export function getData (el, name, val) {
  let prefix = 'data-';
  if (val) return el.setAttribute(prefix + name, val);
  return el.getAttribute(prefix + name);
}
/**
 * [getRect 获取dom节点的基本信息]
 * @param  {[type]} el [description]
 * @return {[type]}    [description]
 */

export function getRect (el) {
  if (window && el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    };
  }
}

/**
 * [getStyle 获取的css样式]
 * @param  {[type]} obj  [description]
 * @param  {[type]} attr [description]
 * @return {[type]}      [description]
 */
export function getStyle (el, attr) {
  let computedStyle = el.currentStyle ? el.currentStyle : window.getComputedStyle(el);
  if(!attr){
    return computedStyle;
    // if(el.currentStyle) return el.currentStyle;     
    // else return document.defaultView.getComputedStyle(el, null);  
  }else{
    return computedStyle[attr];
     // if(el.currentStyle) return el.currentStyle[attr];   
     // else return document.defaultView.getComputedStyle(el, null)[attr]; 
  }    
}
/* ------- dom end -------- */