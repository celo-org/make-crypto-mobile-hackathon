import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLoaders from 'vue-loaders';
import VueToast from 'vue-toast-notification';
import VueTimers from 'vue-timers';
import vuetify from './plugins/vuetify';
import formatter from '@/helpers/formatter';

import 'vue-loaders/dist/vue-loaders.css';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.config.productionTip = false;

Vue.use(VueLoaders);
Vue.use(VueToast);
Vue.use(VueTimers);

function setupFilters() {
  Vue.filter('price', formatter.formatPrice);

  Vue.filter('price-bn', formatter.formatPriceBN);

  Vue.filter('format-collateral', (value) => {
    if (value && !isNaN(value)) {
      return Number(value).toFixed(9);
    } else {
      return value;
    }
  });
  
  Vue.filter('tx', function (value) {
    if (!value) return '';
    return value.substr(0, 6) + "..." + value.substr(value.length - 6);
  });
}

setupFilters();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
