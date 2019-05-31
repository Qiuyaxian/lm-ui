import Clock from './clock'
Clock.install = function(Vue) {
  Vue.component(Clock.name, Clock);
};
export default Clock