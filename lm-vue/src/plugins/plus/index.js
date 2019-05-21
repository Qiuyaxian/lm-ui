export default {
  install (Vue, store) {

    /**
     * [registerModule 动态注册 plus 方便H5调用]
     * @param  {[type]} 'plus'         [description]
     * @param  {[type]} options.state: {                   deviceready:            false   [description]
     * @param  {[type]} mutations:     {                   updateDiviceReadyStatus (state, payload       [description]
     * @return {[type]}                [description]
     */
    store.registerModule('plus', {
      state: {
        deviceready: false
      },
      mutations: {
        updateDiviceReadyStatus (state, payload) {
          state.deviceready = payload.isReady
        }
      }
    })

    const fns = [];
    Vue.prototype.$plus = {}
    window.plusReady = function () { 
      store.commit('updateDiviceReadyStatus', {
        isReady: true
      });
      Vue.prototype.$plus = window.plus;
      while (fns.length) {
        let fn = fns.shift()
        fn()
      }
    }

    Vue.prototype.$deviceReady = function (fn) {
      if (!fn || typeof fn !== 'function') {
        return;
      }
      if (!store.state.plus.deviceready) { 
        fns.push(fn);
      } else {
        fn()
      }
    }

    /** for reloading page **/
    let count = 0,timer;
    document.addEventListener('click', () => {
      count++
      if (count === 3) {
        document.location.reload();
      }
      timer = setTimeout(() => {
        count = 0;
        if(count === 0) clearTimeout(timer);
      }, 500)
    })
  }
}