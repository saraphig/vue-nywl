// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import store from './vuex/store';
import routes from './router';
import { SetAxiosConfig, SetRouterTransition } from '@nongye/assets/js/middleware';
import * as filters from './filters' // global filters
import '@lib/css/font.styl';
import 'normalize.css/normalize.css';

/* register compoent */
Vue.use(VueRouter);

/* bind router */
const router = new VueRouter({
  'linkActiveClass': 'active',
  //mode:'history',
  routes,
});

/* set axios default setting */
SetAxiosConfig(router, store);
/*SetRouterTransition(router, store);*/

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* el app */5
new Vue({
  router,
  store,
  template: '<App/>',
  components: { App },
}).$mount('#app');
