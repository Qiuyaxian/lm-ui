import Vue  from  'vue'
import { isString } from './tools'

let alert = (function(){
  let isVisibility = false;
  function alert () { }
  /**
   * [show 调用弹窗]
   * @param  {Object} option [description]
   * @return {[type]}        [description]
   */
  alert.show = function (option = { 
    'title' : '客服电话',
    'content': '请拨打0755-27883988',
    'onShow' : null,
    'onHide' : null,
  }) {
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
    Vue.$vux.alert.show(option);
  }
  /**
   * [关闭弹窗]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  alert.hide = async function (callback) {
    isVisibility = false;
    await Vue.$vux.alert.hide();
    callback && callback();
  }
  alert.isVisible = function(){
    return Vue.$vux.alert.isVisible() ? Vue.$vux.alert.isVisible() : isVisibility;
  }
  return alert;
})()

export default alert