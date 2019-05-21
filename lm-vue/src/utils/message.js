import Vue  from  'vue';
import { isString } from './tools';
let message = (function(){
  let isVisibility = false;
  function message(option){ 
    message.show(option);
  }
  /**
   * [show 调研message错误提示]
   * @param  {String} option [description]
   * @return {[type]}        [description]
   */
  message.show = function(option = '正在加载...'){
    if(isString(option)){
      let text = option;
      option = { 
        value:false,
        text: text,   
        width:`${ text.length * 2 }em`,
        type: 'text',
        isShowMask: false,
        position: 'middle'
      };
    }  
    isVisibility = true;
    Vue.$vux.toast.show(option);
  }
  /**
   * [hide 隐藏提示]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  message.hide = function(callback){
    isVisibility = false;
    Vue.$vux.toast.hide();
    callback && callback();
  }
  /**
   * [isVisible 提示错误值]
   * @return {Boolean} [description]
   */
  message.isVisible = function(){
    return Vue.$vux.toast.isVisible() ? Vue.$vux.toast.isVisible() : isVisibility;
  }
  return message;
})();

export default message;