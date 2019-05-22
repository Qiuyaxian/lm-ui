import Vue from 'vue'
import VueRouter from 'vue-router'
import { _sessionStorage, addEventHandle, hasOwn, isFunction } from '@/utils'

Vue.use(VueRouter)

// import { sync } from 'vuex-router-sync'
// 动态加载路由
let _import = file => () => import(`@examples/views/${file}.vue`)

const globalRoutes = []
const LazyRoutes = [
  { url: '/home', name: 'home', title: 'home', keepAlive: false, path: 'home' },
  { url: '/grid', name: 'grid', title: 'grid', keepAlive: false, path: 'grid' },
  { url: '/button', name: 'button', title: 'button', keepAlive: false, path: 'button' },
  { url: '/cell', name: 'cell', title: 'cell', keepAlive: false, path: 'cell' },
  { url: '/badge', name: 'badge', title: 'badge', keepAlive: false, path: 'badge' },
  { url: '/tab', name: 'tab', title: 'tab', keepAlive: false, path: 'tab' },
  { url: '/switch', name: 'switch', title: 'switch', keepAlive: false, path: 'switch' },
  { url: '/toast', name: 'toast', title: 'toast', keepAlive: false, path: 'toast' },
  { url: '/flexbox', name: 'flexbox', title: 'flexbox', keepAlive: false, path: 'flexbox' },
  { url: '/divider', name: 'divider', title: 'divider', keepAlive: false, path: 'divider' },
  { url: '/marquee', name: 'marquee', title: 'marquee', keepAlive: false, path: 'marquee' },
  { url: '/count-up', name: 'count-up', title: 'count-up', keepAlive: false, path: 'count-up' },
  { url: '/count-down', name: 'count-down', title: 'count-down', keepAlive: false, path: 'count-down' },
  { url: '/panel', name: 'panel', title: 'panel', keepAlive: false, path: 'panel' },
  { url: '/textarea', name: 'textarea', title: 'textarea', keepAlive: false, path: 'textarea' },
  { url: '/cell-preview', name: 'cell-preview', title: 'cell-preview', keepAlive: false, path: 'cell-preview' },
  { url: '/form-preview', name: 'form-preview', title: 'form-preview', keepAlive: false, path: 'form-preview' },
  { url: '/rater', name: 'rater', title: 'rater', keepAlive: false, path: 'rater' },
  { url: '/search', name: 'search', title: 'search', keepAlive: false, path: 'search' },
  { url: '/spinner', name: 'spinner', title: 'spinner', keepAlive: false, path: 'spinner' },
  { url: '/tabbar', name: 'tabbar', title: 'tabbar', keepAlive: false, path: 'tabbar' },
  { url: '/clock', name: 'clock', title: 'clock', keepAlive: false, path: 'clock' },
  { url: '/dialog', name: 'dialog', title: 'dialog', keepAlive: false, path: 'dialog' },
  { url: '/icon', name: 'icon', title: 'icon', keepAlive: false, path: 'icon' },
  { url: '/confirm', name: 'confirm', title: 'confirm', keepAlive: false, path: 'confirm' },
  { url: '/alert', name: 'alert', title: 'alert', keepAlive: false, path: 'alert' },
  { url: '/actionsheet', name: 'actionsheet', title: 'actionsheet', keepAlive: false, path: 'actionsheet' },
  { url: '/picker', name: 'picker', title: 'picker', keepAlive: false, path: 'picker' },
  { url: '/popup-picker', name: 'popup-picker', title: 'popup-picker', keepAlive: false, path: 'popup-picker' },
  { url: '/address', name: 'address', title: 'address', keepAlive: false, path: 'address' },
  { url: '/datetime', name: 'datetime', title: 'datetime', keepAlive: false, path: 'datetime' },
  { url: '/datetime-range', name: 'datetime-range', title: 'datetime-range', keepAlive: false, path: 'datetime-range' }
]
/**
 * [mainRoutes 路由主入口]
 * @type {Object}
 */
let mainRoutes = {
  path: '/',
  component: _import('App'),
  name: 'main',
  redirect: to => '/home',
  beforeEnter (to, from, next) {
    next()
  }
}
// 处理器ios问题
// const history = window.sessionStorage;
// history.clear();
if (_sessionStorage.getSync('count')) {
  _sessionStorage.delSync('count')
}
// let historyCount = history.getItem('count') * 1 || 0;
let historyCount = _sessionStorage.getSync ? _sessionStorage.getSync('count') * 1 : 0
// history.setItem('/', 0);
_sessionStorage.setSync('/', 0)
let isPush = false
let endTime = Date.now()
let methods = ['push', 'go', 'replace', 'forward', 'back']
/**
 * [绑定事件]
 * @param  {[type]} document   [description]
 * @param  {[type]} 'touchend' [description]
 * @param  {[type]} (          [description]
 * @return {[type]}            [description]
 */
addEventHandle(document, 'touchend', () => {
  endTime = Date.now()
}, { passive: true })

let router = new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: globalRoutes.concat(mainRoutes)
})

/**
 * [description]
 * @param  {...[type]} args) {               isPush [description]
 * @return {[type]}          [description]
 */
methods.forEach(key => {
  let method = router[key].bind(router)
  router[key] = function (...args) {
    isPush = true;
    method.apply(null, args);
  }
})

/**
 * [进入路由前]
 * @param  {[type]} (to, from,         next [description]
 * @return {[type]}      [description]
 */
router.beforeEach((to, from, next) => {
  // 添加动态(菜单)路由
  // 1. 已经添加 or 全局路由, 直接访问
  // 2. 获取菜单列表,添加并保存本地存储 向服务器请求菜单栏,用于初次访问以及刷新页面
  if (router.options.isAddDynamicMenuRoutes) {
    // 每次进入新的页面重置状态
    // Store.dispatch('system/updateMessage', '');
    // 加载完成，更新加载loading状态
    // Store.commit('updateLoadingStatus', { isLoading: true });
    // 记录to进入页面的路由数
    // const toIndex = history.getItem(to.path);
    const toIndex = _sessionStorage.getSync(to.path);
    // 记录form离开页面的路由数
    // const fromIndex = history.getItem(from.path);
    const fromIndex = _sessionStorage.getSync(from.path);

    if (toIndex) {
      if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
        // Store.commit('updateDirection', { direction: 'forward' })
      } else {
        // 判断是否是ios左滑返回
        // if (!isPush && (Date.now() - endTime) < 377) {
        //   Store.commit('updateDirection', { direction: '' })
        // } else {
        //   Store.commit('updateDirection', { direction: 'reverse' })
        // }
      }
    } else {
      ++historyCount
      _sessionStorage.setSync('count', historyCount)
      to.path !== '/' && _sessionStorage.setSync(to.path, historyCount)
      // to.path !== '/' && history.setItem(to.path, historyCount)
      // Store.commit('updateDirection', {direction: 'forward'})
    }
    // 匹配传递过来的是否是http外部链接,如果是则跳转
    if (/\/(http)|(https)/.test(to.path)) {
      let url = to.path.split('http')[1]
      let httpProtocol = /\/(http)/.test(to.path) ? `http` : `https`
      window.location.href = `${httpProtocol}${url}`
    } else {
      next()
    }
  } else {
    fnAddDynamicMenuRoutes(LazyRoutes).then(() => {
      router.options.isAddDynamicMenuRoutes = true
      // 传入页面路径并释放页面
      next({ ...to, replace: true })
    }).catch(_ => {
      // 定向错误页面禁止刷新操作
      next()
    })
  }
})
/**
 * [fnAddDynamicMenuRoutes 动态添加路径]
 * @param  {Array}  menuList [description]
 * @param  {Array}  routes   [description]
 * @return {[type]}          [description]
 */
function fnAddDynamicMenuRoutes (menuList = [], routes = []) {
  let routesResult = []
  return new Promise((resolve, reject) => {
    let routesResult = fnAddDynamicMenuRoutesHandle(menuList, routes)
    mainRoutes.name = 'views-dynamic'
    mainRoutes.children = routesResult
    router.addRoutes([
      mainRoutes,
      { path: '*', redirect: { name: '404' } }
    ]);
    resolve()
  }).catch(err => {
    console.log(err)
  })
}
/**
 * [fnAddDynamicMenuRoutesHandle 处理路径，返回结果]
 * @param  {Array}  menuList [description]
 * @param  {Array}  routes   [description]
 * @return {[type]}          [description]
 */
function fnAddDynamicMenuRoutesHandle (menuList = [], routes = []) {
  if (menuList && menuList.length !== 0) {
    for (let i = 0; i < menuList.length; i++) {
      // 生成路由信息对象
      if (menuList[i].path && menuList[i].path.length !== '') {
        let route = {
          path: menuList[i].url,
          component: _import(menuList[i].path),
          // 路由元信息
          meta: menuList[i].meta || {},
          children: [],
          icon: ''
        }
        if (menuList[i].name) route.name = menuList[i].name
        route.meta['title'] = menuList[i].meta && menuList[i].meta['title'] ? menuList[i].meta['title'] : menuList[i].title && menuList[i].title.length !== 0 ? menuList[i].title : '百丽春商城'
        route.meta['keepAlive'] = menuList[i].meta && hasOwn(menuList[i].meta, 'keepAlive') ? menuList[i].meta['keepAlive'] : hasOwn(menuList[i], 'keepAlive') ? menuList[i]['keepAlive'] : false
        route.meta['icon'] = hasOwn(menuList[i], 'icon') ? menuList[i]['icon'] : ''
        // 是否需要权限
        if (menuList[i].isAuth && !menuList[i]['beforeEnter']) {
          route.beforeEnter = (to, from, next) => {
            // 进入前检验是否登陆过,做权限校验
            let token = Vue.cookie.get('token');
            if (!token || !/\S/.test(token)) {
              // clearLoginInfo()清楚权限跳转
              next({ name: 'login', replace: true })
            }
            next()
          }
        } else if (hasOwn(menuList[i], 'beforeEnter') && isFunction(menuList[i]['beforeEnter'])) {
          route['beforeEnter'] = menuList[i]['beforeEnter']
        }
        // 是否允许微信分享
        if (menuList[i] && hasOwn(menuList[i], 'isShare')) {
          route['meta']['isShare'] = menuList[i].isShare
        }
        if (hasOwn(menuList[i], 'children') && menuList[i].children.length !== 0) {
          route['children'] = fnAddDynamicMenuRoutesHandle(menuList[i].children)
        }
        routes.push(route)
      } else {
        throw new Error('path is not null')
      }
    }
  }
  return routes
}
// sync(Store, router);
export default router
