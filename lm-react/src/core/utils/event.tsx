import { isFunction } from './tools';
/**
 * [addEventHandle 绑定事件]
 * @param {[type]}   dom     [description]
 * @param {String}   event   [description]
 * @param {Function} fn      [description]
 * @param {[type]}   passive [description]
 */
export function addEventHandle(dom: HTMLElement, event: string = 'WeixinJSBridgeReady', fn, passive: any = ({ passive: false } || false)): void {
  if (document['addEventListener']) {
    dom['addEventListener'](event, fn, passive);
  } else if (document['attachEvent']) {
    dom['attachEvent'](`on${event}`, fn);
  }
}
/**
 * [removeEventHandle 移除绑定事件]
 * @param  {[type]}   dom     [description]
 * @param  {String}   event   [description]
 * @param  {Function} fn      [description]
 * @param  {[type]}   passive [description]
 * @return {[type]}           [description]
 */
export function removeEventHandle(dom: HTMLElement, event: string = 'WeixinJSBridgeReady', fn, passive: any = ({ passive: false } || false)): void {
  if (document['removeEventListener']) {
    dom['removeEventListener'](event, fn, passive);
  } else if (document['detachEvent']) {
    dom['detachEvent'](`on${event}`, fn);
  }
}
/**
 * [registerEventHandle 注册自定义事件]
 * @param  {[type]} dom   [description]
 * @param  {String} event [description]
 * @return {[type]}       [description]
 */
export function registerEventHandle(dom: HTMLElement, event: string = 'upload') {
  let events;
  if (document['createEvent']) {
    //创建event的对象实例。  
    events = document.createEvent('HTMLEvents');
    // 3个参数：事件类型，是否冒泡，是否阻止浏览器的默认行为  
    events.initEvent(event, true, true);
    // event.message = '自定义属性';   
    dom['dispatchEvent'](events);
  } else if (document['createEventObject']) {
    //创建event的对象实例。
    events = document['createEventObject']();
    // event.message = '自定义属性';
    dom['fireEvent'](event, events);
  }
}
/**
 * [triggerEventHandle 触发自定义事件]
 * @param  {[type]}   dom   [description]
 * @param  {String}   event [description]
 * @param  {Function} fn    [description]
 * @return {[type]}         [description]
 */
export function triggerEventHandle(dom: HTMLElement, event: string = 'upload', fn): void {
  addEventHandle(dom, event, (e) => {
    fn.apply(dom, e);
  });
}
