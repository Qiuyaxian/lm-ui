import Marquee from './marquee'
Marquee.install = function(Vue) {
  Vue.component(Marquee.name, Marquee);
};
export default Marquee