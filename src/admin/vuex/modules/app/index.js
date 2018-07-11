import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  userInfo: null,
  loading: true,
  apiToken: '',
};

export default{
  state,
  actions,
  getters,
  mutations
}
