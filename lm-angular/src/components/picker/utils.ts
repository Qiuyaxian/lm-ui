
// Easing Equations (c) 2003 Robert Penner, all rights reserved.
// Open source under the BSD License.
/**
 * [easeOutCubic 弹性运动]
 * @param  {[type]} pos [description]
 * @return {[type]}     [description]
 */
export function easeOutCubic (pos: Number): number{
  return (Math.pow((Number(pos) - 1), 3) + 1)
}
/**
 * [easeInOutCubic 弹性运动]
 * @param  {[type]} pos [description]
 * @return {[type]}     [description]
 */
export function easeInOutCubic (pos: Number): number {
  pos = Number(pos) / 0.5
  if (pos < 1) {
    return 0.5 * Math.pow(Number(pos), 3)
  }
  return 0.5 * (Math.pow((Number(pos) - 2), 3) + 2)
}

/**
 * [getStyle 获取的css样式]
 * @param  {[type]} obj  [description]
 * @param  {[type]} attr [description]
 * @return {[type]}      [description]
 */
export function getStyle (el: any, attr: any): any {
  let computedStyle = el['currentStyle'] ? el['currentStyle'] : window['getComputedStyle'](el);
  if(!attr){
    return computedStyle;
  }else{
    return computedStyle[attr];
  }    
}

/**
 * [querySelector 选择dom节点]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
export function querySelector (name: any, elem: HTMLElement | Document = document): any { 
  return (typeof name === 'string') ? elem['querySelector'](name) : name;
}