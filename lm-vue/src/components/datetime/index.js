import Datetime from './datetime'

Datetime.install = function(Vue) {
  Vue.component(Datetime.name, Datetime);
};
export default Datetime