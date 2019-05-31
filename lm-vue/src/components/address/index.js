import Address from './address'
// import AddressComponent from './address-components'
Address.install = function(Vue) {
  Vue.component(Address.name, Address);
};
export default Address