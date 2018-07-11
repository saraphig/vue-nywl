import vue from 'vue';
import axios from 'axios'
import moment from 'moment';
import SetWechatTitle from '@lib/js/setWechatTitle';
import { getStore, removeStore } from '@lib/js/mUtils';

//配置Axios
export const SetAxiosConfig = function(router, store) {
	let _prefix = '';
	if(process.env.NODE_ENV == 'production') {
		_prefix = `${process.env.NONGYE_HOST}/api`
	} else {
		_prefix = '/api'
	}
	axios.defaults.baseURL = _prefix;
	axios.defaults.headers['Pragma'] = 'no-cache';
	axios.defaults.headers['Cache-Control'] = 'no-cache';
	axios.defaults.headers['If-Modified-Since'] = '0';
	axios.defaults.headers['X-XSS-Protection'] = '1; mode=block';
	/*axios.defaults.headers['API-TOKEN'] = '1.0.0';*/

	// 添加一个请求拦截器
	axios.interceptors.request.use(function(config) {
		// 判断localStorage中是否存在api_token
		let apiToken = '';
		try {
			let token = store.state.app.apiToken;
			// token in store ?
			if(token) {
				apiToken = token;
			} else if(getStore('api_token')) {
				apiToken = getStore('api_token');
				store.commit('FETCH_API_TOKEN', apiToken);
			}
		} catch(e) {}
		// check api-token
		if(apiToken) {
			//  存在将api_token写入 request header
			config.headers['API-TOKEN'] = `${apiToken}`;
		}
		return config;
	}, function(error) {
		// Do something with request error
		return Promise.reject(error);
	});

	// add interceptors response
	axios.interceptors.response.use(function(response) {
		return response;
	}, function(error) {
		// Do something with response error
		// return Promise.reject(error.http.ServerResponse(req);.data)
		if(error.response) {
			switch(error.response.status) {
				case 401:
				case 403:
					// return 401 and clear token
					removeStore('api_token', '');
					store.commit('FETCH_API_TOKEN', '');
					if(store.state.app.tokenCount < 1){
						store.commit('FETCH_TOKEN_COUNT', 1);
						// jump to login
						router.replace({
							path: 'login',
							query: {
								redirect: router.currentRoute.fullPath
							}
						});
					}
					break;
				default:
					return Promise.reject(error.response.data)
					break;
			}
		}
	});
};

// 配置路由
export const SetRouterTransition = function(router, store) {
	/* router before */
	router.beforeEach((to, from, next) => {
		// check this router need auth
		if(to.meta.requireAuth) {
			// first check token
			if(!store.state.app.checkedToken) {
				// get user info
		        store.dispatch('fetchUserInfo', {}).then(
		          data => {
		          	// change checked token
		        	store.commit('FETCH_CHECKED_TOKEN', true);
		          	next();
		          },
		          err => {
		          }
		        );

			}else if(store.state.app.apiToken || getStore('api_token')) {
				// with vuex state to get token
				next();
			}else {
				// jump to login
	            next({
					path: '/login',
					query: {
						redirect: to.fullPath
					}
				})
			}

		} else {
			next();
		}
	});

	/* change title */
	router.afterEach((transition) => {
		let title = transition.meta.pageTitle;
		SetWechatTitle(title);
	});
};

//配置moment组件
moment.defineLocale('zh-cn', {
	relativeTime: {
		future: '%s',
		past: '%s',
		s: '几秒',
		m: '1 分钟',
		mm: '%d 分钟',
		h: '1 小时',
		hh: '%d 小时',
		d: '1 天',
		dd: '%d 天',
		M: '1 个月',
		MM: '%d 个月',
		y: '1 年',
		yy: '%d 年'
	},
});
moment.locale('zh-cn'); // 切换成中文版本

//定义moment过滤器1
export const VueFilterMoment = function() {
	Vue.filter('moment', function(value) {
		//
		let dateArr = value.split('#');
		if(dateArr.length < 2) {
			return moment(dateArr[0]).startOf('minutes').fromNow();
		} else {
			return moment(dateArr[1]).startOf('minutes').from(dateArr[0]);
		}
	})
};

//定义moment过滤器2
export const VueFilterSpecKey = function() {
	Vue.filter('specKey', function(data, param) {
		//
		let value = 0;
		try {
			value = data[param];
		} catch(e) {}
		return(value || 0);
	})
};