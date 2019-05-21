import Vue  from  'vue';
let toast = (function(){
  let isVisibility = false;
  function toast(option){
    toast.show(option);
  }
  toast.show = function(option = '正在加载...'){
    if(typeof(option) == 'string'){
      let text = option;
      option = { 
        value: false,
        text: text, 
        type: 'success',   
        isShowMask: false,
        position: 'middle'
      };
    }
    isVisibility = true;
    Vue.$vup.toast.show(option);
  }
  toast.error = function(text = '系统错误'){
    toast.show({
      text: text,
      type: 'warn'
    });
  }
  toast.success = function(text = '操作成功'){
    toast.show({
      text: text,
      type: 'success'
    });
  }
  toast.cancel = function(text = '取消成功'){
    toast.show({
      text: text,
      type: 'cancel'
    });
  } 
  toast.hide = function(){
    isVisibility = false;
    Vue.$vup.toast.hide();
  }
  toast.isVisible = function(){
    return Vue.$vup.toast.isVisible() ? Vue.$vup.toast.isVisible() : isVisibility;
  }
  return toast;
})();

export default toast;