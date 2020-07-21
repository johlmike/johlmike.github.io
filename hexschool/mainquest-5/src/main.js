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
  faPlusSquare,
  faMinusSquare,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { ValidationProvider, extend, configure } from 'vee-validate';
import { required, min_value as minValue } from 'vee-validate/dist/rules';
import VueLodash from 'vue-lodash';
import lodash from 'lodash';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
// Axios 設定
Vue.use(VueAxios, axios);
// Loading 畫面設定
Vue.use(Loading);
// VeeValidate 設定
Vue.component('ValidationProvider', ValidationProvider);
extend('required', {
  ...required,
  message: '數量為必填',
});
extend('min_value', {
  ...minValue,
  message: '數量最少為{min}',
});
configure({
  classes: {
    valid: 'is-valid', // 驗證通過回傳 is-valid
    invalid: 'is-invalid', // 驗證失敗回傳 is-invalid
  },
});
// lodash 設定
Vue.use(VueLodash, { lodash });
// FontAwesome 設定
library.add(
  faCartPlus,
  faHome,
  faNewspaper,
  faShoppingCart,
  faUser,
  faCarrot,
  faBook,
  faPlusSquare,
  faMinusSquare,
  faChevronDown,
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
