import {
  CHANGE_HOME_INFO,
  GET_ORGAN_ID,
  GET_ORGAN_DATA,
  GET_ORGAN_DATE
} from './mutation-type'

const mutations = {
  // 改变loading状态
  [CHANGE_HOME_INFO](state, info) {
    state.homeInfo.msg = info;
  },
  [GET_ORGAN_ID](state, info) {
    state.organId = info;
  },
  [GET_ORGAN_DATA](state, info) {
    state.organData = info;
  },
  [GET_ORGAN_DATE](state, info) {
    state.organDate = info;
  }
};
export default mutations;
