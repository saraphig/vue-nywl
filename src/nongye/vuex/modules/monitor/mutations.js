import {
    CHANGE_MONITOR_INFO,
    ORGAN_CHANGED
} from './mutation-type'

const mutations = {
  // 改变loading状态
  [CHANGE_MONITOR_INFO](state, info) {
    state.MonitorInfo.msg = info;
  },
  [ORGAN_CHANGED](state, OrganizationId) {
    state.OrganizationId = OrganizationId;
  },
};
export default mutations;
