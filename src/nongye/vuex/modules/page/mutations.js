import {
  CHANGE_PAGE_INFO,
} from './mutation-type'

const mutations = {
  // 改变loading状态
  [CHANGE_PAGE_INFO](state, info) {
    state.pageInfo = info;
  },
};
export default mutations;
