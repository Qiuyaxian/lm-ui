import Grid from './grid'
Grid.install = function(Vue) {
  Vue.component(Grid.name, Grid);
};
export default Grid