/**
 * 路由处理
 */
import { isObject, isString } from './tools';
export class Router {
  /**
   * [go 路由跳转]
   * @param  {[type]} url     [description]
   * @param  {[type]} $router [description]
   * @return {[type]}         [description]
   */
  static go(url, $router) {
    if (/^javas/.test(url) || !url) return;
    const useRouter = isObject(url) || ($router && isString(url) && !/http/.test(url))
    if (useRouter) {
      if (isObject(url) && url.replace === true) {
        $router.replace(url);
      } else {
        url.toLowerCase() === 'back' ? $router.go(-1) : $router.push(url);
      }
    } else {
      window.location.href = url;
    }
  }
  static getUrl(url, $router) {
    // Make sure the href is right in hash mode
    if ($router && !$router._history && isString(url) && !/http/.test(url)) {
      return '#!' + url;
    }
    return url && !isObject(url) ? url : 'javascript:void(0);';
  }
}