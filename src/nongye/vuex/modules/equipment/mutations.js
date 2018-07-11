import * as types from './mutation-types'

const mutations = {
	[types.SET_AREAS_LIST](state, data) {
		state.areasList = data;
	},
	[types.SET_DEVICES_LIST](state, data) {
		state.devicesList = data;
	}
}
export default mutations