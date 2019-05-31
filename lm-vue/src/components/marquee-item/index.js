import MarqueeItem from './marquee-item'
MarqueeItem.install = function(Vue) {
  Vue.component(MarqueeItem.name, MarqueeItem);
};
export default MarqueeItem