import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'jquery';
import 'popper.js';
import 'bootstrap'; // Import js file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import css file
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
