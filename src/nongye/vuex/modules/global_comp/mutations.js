import * as types from './mutation-types'

const mutations = {
	[types.SET_CONFIRM_VISIBLE](state, data) {
		state.confirmVisible = data;
	},
	[types.SET_CONFIRM_TITLE](state, data) {
		state.confirmTitle = data;
	},
	[types.SET_CONFIRM_TEXT](state, data) {
		state.confirmText = data;
	},
	[types.SET_CONFIRM_CLEAN](state, data) {
		state.confirmCleanHandle = data;
	},
	[types.SET_CONFIRM_OK](state, data) {
		state.confirmOKHandle = data;
	},
	[types.SET_MESSAGE_TEXT](state, data) {
		state.messageText = data;
	}
}
export default mutations