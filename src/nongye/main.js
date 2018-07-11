import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router';
import App from './App';
import store from './vuex/store';
import * as filters from './filters'
import { SetAxiosConfig, SetRouterTransition } from '@nongye/assets/js/middleware';
import '@lib/css/font.styl';
import 'normalize.css/normalize.css';
import '@lib/css/base.styl';
import 'babel-polyfill';

//设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false;

//设置路由
Vue.use(VueRouter);
const router = new VueRouter({
	'linkActiveClass': 'active',
	//mode:'history',
	routes,
});

//配置中间件，包括Axios及路由等
SetAxiosConfig(router, store);
SetRouterTransition(router, store);

//向Vue添加全局过滤器
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

new Vue({
	router,
	store,
	template: '<App/>',
	components: {
		App
	},
}).$mount('#app');