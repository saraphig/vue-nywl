import vue from 'vue';
import axios from 'axios'
import moment from 'moment';
import SetWechatTitle from '@lib/js/setWechatTitle';
import { getStore, removeStore } from '@lib/js/mUtils';

moment.defineLocale('zh-cn', {
  relativeTime : {
    future : '%s',
    past : '%s',
    s : '几秒',
    m : '1 分钟',
    mm : '%d 分钟',
    h : '1 小时',
    hh : '%d 小时',
    d : '1 天',
    dd : '%d 天',
    M : '1 个月',
    MM : '%d 个月',
    y : '1 年',
    yy : '%d 年'
  },
});

// 切换成中文版本
moment.locale('zh-cn');

export const SetAxiosConfig = function (router, store) {
  let _prefix = '';
  if(process.env.NODE_ENV == 'production') {
      _prefix = `${process.env.NONGYE_HOST}/api`
  } else {
      _prefix = '/api'
  }
  //
  axios.defaults.baseURL = _prefix;
  /*axios.defaults.headers['API-TOKEN'] = '1.0.0';*/

// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
    // 判断localStorage中是否存在api_token
    let apiToken = '';
    try{
      let token = store.state.app.apiToken || 'admin-test';
      // token in store ?
      if(token){
        apiToken = token;
      }else if(getStore('api_token')){
        apiToken = getStore('api_token');
        store.commit('FETCH_API_TOKEN', apiToken);
      }
    }catch(e){}
    // check api-token
    if (apiToken) {
      //  存在将api_token写入 request header
      config.headers['API-TOKEN'] = `${apiToken}`;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

  // add interceptors response
  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    // Do something with response error
    // return Promise.reject(error.response.data)
    if (error.response) {
      switch (error.response.status) {
        case 401:
        case 403:
          // return 401 and clear token
          store.commit('FETCH_API_TOKEN', '');
          router.replace({
              path: 'login',
              query: {redirect: router.currentRoute.fullPath}
          });
          break;
        default:
          return Promise.reject(error.response.data)
          break;
      }
    }
  });
};

// setting router
export const SetRouterTransition = function (router, store) {
  /* router before */
  router.beforeEach((to, from, next) => {
    // check this router need auth
    if (to.meta.requireAuth) {
      // with vuex state to get token
      if (store.state.app.apiToken || getStore('api_token')) {
        next();
      } else {
        next({
          path: '/login',
          query: {redirect: to.fullPath}
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

// filter moment
export const VueFilterMoment = function () {
  Vue.filter('moment', function (value) {
    //
    let dateArr = value.split('#');
    if(dateArr.length < 2){
      return moment(dateArr[0]).startOf('minutes').fromNow();
    }else{
      return moment(dateArr[1]).startOf('minutes').from(dateArr[0]);
    }
  })
};

// filter moment
export const VueFilterSpecKey = function () {
  Vue.filter('specKey', function (data, param) {
    //
    let value = 0;
    try{
      value = data[param];
    }catch(e){}
    return (value || 0);
  })
};
