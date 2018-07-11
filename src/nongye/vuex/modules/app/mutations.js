import {
    FETCH_CHECKED_TOKEN,
    FETCH_TOKEN_COUNT,
    FETCH_USER_INFO,
    FETCH_USER_KEY,
    FETCH_API_TOKEN,
    FINISH_LOADING,
    START_LOADING,
    FETCH_ORGANIZATION_ENTITY
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
    [FETCH_USER_KEY](state, info) {
        state.userKey = info;
    },
    [FETCH_API_TOKEN](state, token) {
        state.apiToken = token;
    },
    [FETCH_TOKEN_COUNT](state, count) {
        state.tokenCount = count;
    },
    [FETCH_CHECKED_TOKEN](state, check) {
        state.checkedToken = check;
    },
    [FETCH_ORGANIZATION_ENTITY](state, entity) {
        state.organizationEntity = entity;
    }
};
export default mutations;
