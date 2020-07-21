import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'jquery';
import 'popper.js';
import 'bootstrap'; // Import js file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import css file
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCartPlus,
  faHome,
  faNewspaper,
  faShoppingCart,
  faUser,
  faCarrot,
  faBook,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

library.add(
  faCartPlus,
  faHome,
  faNewspaper,
  faShoppingCart,
  faUser,
  faCarrot,
  faBook,
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
