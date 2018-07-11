import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
    userInfo: null,
    userKey: null,
    loading: true,
    apiToken: '',
    tokenCount: 0,
    checkedToken: false,
    organizationEntity: {}
};

export default {
    state,
    actions,
    getters,
    mutations
}
