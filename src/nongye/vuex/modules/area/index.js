import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  areaList: [],
  organData: [],
  organDate: '',
  organId: null
};

export default{
  state,
  actions,
  getters,
  mutations
}
