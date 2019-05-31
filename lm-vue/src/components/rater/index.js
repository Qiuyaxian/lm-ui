import Rater from './rater'
Rater.install = function(Vue) {
  Vue.component(Rater.name, Rater);
};
export default Rater