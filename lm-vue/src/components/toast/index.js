import Toast from './toast'
Toast.install = function(Vue) {
  Vue.component(Toast.name, Toast);
};
export default Toast