import {
  FETCH_USER_INFO,
  FETCH_API_TOKEN,
  FINISH_LOADING,
  START_LOADING,
} from './mutation-type'

const mutations = {
  // 结束loading状态
  [FINISH_LOADING](state) {
    state.loading = false;
  },
  // 开始loading状态
  [START_LOADING](state) {
    state.loading = true;
  },
  [FETCH_USER_INFO](state, info) {
    state.userInfo = info;
  },
  [FETCH_API_TOKEN](state, token) {
    state.apiToken = token;
  },
};
export default mutations;
