import Group from './group'
Group.install = function(Vue) {
  Vue.component(Group.name, Group);
};
export default Group