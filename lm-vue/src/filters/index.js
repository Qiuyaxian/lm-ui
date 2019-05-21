import Vue from 'vue'

Vue.filter('removeNum', function (value) {
  return value.replace(/[^0-9]/g, '');
})
Vue.filter('genre', function (value,type) {
  console.log(value, type,"detail.vue")
  return value;
});