import Vue  from  'vue'
let confirm = (function(){
  let isVisibility = false;
  function confirm(){ }
  /**
   * [show 显示确认框]
   * @param  {[type]} option [description]
   * @return {[type]}        [description]
   */
   confirm.show = function (option) {
    let options = {
      show: option.show || false,
      showInput: option.showInput || false,                  //是否显示输入框，如果为true，slot会失效
      placeholder: option.placeholder || '请输入',             // 输入框的提示（仅在showInput为true的情况下有效）
      theme: option.theme || 'ios',                      //弹窗风格，可以是ios或android 
      hideOnBlur: option.hideOnBlur || false,
      title: option.title || '提示',
      content: option.content || '未登录，是否前往登录？', //弹窗内容，作为slot默认内容，可以是html片段，如果使用slot该字段会失效
      confirmText: option.confirmText || '确定',               //确认按钮的显示文字
      cancelText: option.cancelText || '取消',                //取消按钮的显示文字
      maskTransition: option.maskTransition || 'vux-fade',
      dialogTransition: option.dialogTransition || 'vux-dialog',
      closeOnConfirm: option.closeOnConfirm || true,              //是否在点击确认按钮时自动关闭
      inputAttrs: option.inputAttrs || {},                    //input 属性
      maskZIndex: option.maskZIndex || 1000,                  //遮罩层 z-index 值 
      onShow () {
        _this.isVisibility = true;
        option.onShow && option.onShow()
      },
      onHide () {
        _this.isVisibility = false;
        option.onHide && option.onHide()
      },
      onCancel () {
        _this.isVisibility = false;
        option.onCancel && option.onCancel()
      },
      onConfirm (msg) {
        _this.isVisibility = false;
        option.onConfirm && option.onConfirm(msg)
      }
    }; 
    isVisibility = true;
    Vue.$vux.confirm.show(options);
  }
  /**
   * [hide 关闭确认框]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
   confirm.hide = async function (callback) { 
    isVisibility = false;
    await Vue.$vux.confirm.hide();
    callback && callback();
  }
  /**
   * [isVisible 是否已经关闭]
   * @return {Boolean} [description]
   */
   confirm.isVisible = function(){
    return Vue.$vux.confirm.isVisible() ? Vue.$vux.confirm.isVisible() : isVisibility;
  }
  return confirm;
})()
export default confirm