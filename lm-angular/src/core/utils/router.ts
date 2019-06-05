/**
 * 路由处理
 */
import { isObject, isArray, isString } from './tools';
import { Router } from '@angular/router';
export class LmRouter {
  /**
   * [go 路由跳转]
   * @param  {[type]} url     [description]
   * @param  {[type]} $router [description]
   * @return {[type]}         [description]
   */
  static go (url: any, params: Object, $router: Router) {
    if (/^javas/.test(url) || !url) return;
    if (isArray(url)) {
      $router.navigate(url, params);
    } else {
      if ($router && isString(url) && !/http/.test(url)) {
        $router.navigate([url], params);
      } else {
        window.location.href = url;
      }
    }
  }
  static getUrl (url, $router) {
    // Make sure the href is right in hash mode
    if ($router && !$router._history && isString(url) && !/http/.test(url)) {
      return '#!' + url;
    }
    return url && !isObject(url) ? url : 'javascript:void(0);';
  }
}