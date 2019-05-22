import Vue  from  'vue';
import { isString } from './tools';
let loading = (function(){
  let isVisibility = false;
  function loading(){ }
  /**
   * [show 显示loading]
   * @param  {String} option [description]
   * @return {[type]}        [description]
   */
  loading.show = function (option = '正在加载...') {
    if(isString(option)){
      let text = option;
      option = { 
        'text': text
      };
    }
    isVisibility = true;
    Vue.$lm.loading.show(option);
  }
  /**
   * [hide 关闭loading]
   * @return {[type]} [description]
   */
  loading.hide = async function (callback) {
    isVisibility = false;
    await Vue.$lm.loading.hide();
    callback && callback();
  }
  /**
   * [isVisible 获取loading状态 ]
   * @return {Boolean} [description]
   */
  loading.isVisible = function(){
    return Vue.$lm.loading.isVisible() ? Vue.$lm.loading.isVisible() : isVisibility;
  }
  return loading;
})();

export default loading;