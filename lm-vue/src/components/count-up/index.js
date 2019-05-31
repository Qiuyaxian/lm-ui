import CountUp from './count-up'
CountUp.install = function(Vue) {
  Vue.component(CountUp.name, CountUp);
};
export default CountUp