import Cell from './cell'
Cell.install = function(Vue) {
  Vue.component(Cell.name, Cell);
};
export default Cell