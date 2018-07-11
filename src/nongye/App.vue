<template>
	<div class="app">
		<!--全局加载组件-->
		<v-loading :show="loading"></v-loading>
		<!--全局confirm组件-->
		<global-confirm v-if="confirmVisible"
		    :title="confirmTitle"
		    :text="confirmText"
		    @disp-cleanCallBack="confirmCleanHandle"
		    @disp-okCallBack="confirmOKHandle"></global-confirm>
		<!--全局消息状态组件-->
		<global-message ref="globalMessageRef"
		    :text="messageText"></global-message>
		<!--主界面-->
		<div class="app-wrapper">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import VLoading from "./components/loading";
import { setResizeCallback } from "@lib/js/mUtils";
import EventBus from "@lib/js/event-bus"; //事件总线
import Vue from 'vue';
import GlobalConfirm from './components/global-confirm.vue'
import GlobalMessage from './components/global-message.vue'
import ShMessageBox from '@com/sh-ui/components/sh-message-box/sh-message-box'

Vue.prototype.$shAlert = ShMessageBox.alert;
Vue.prototype.$shConfirm = ShMessageBox.confirm;

//配置全局confirm组件
Vue.prototype.$globalConfirm = function ($title, $msg, $successCallback, $cleanCallback) {
	let _this = this;
	_this.$store.commit("SET_CONFIRM_VISIBLE", true);
	_this.$store.commit("SET_CONFIRM_TITLE", $title);
	_this.$store.commit("SET_CONFIRM_TEXT", $msg);
	_this.$store.commit("SET_CONFIRM_CLEAN", function () {
		_this.$store.commit("SET_CONFIRM_VISIBLE", false);
		$cleanCallback();
	});
	_this.$store.commit("SET_CONFIRM_OK", function () {
		_this.$store.commit("SET_CONFIRM_VISIBLE", false);
		$successCallback();
	});
};

Vue.prototype.$globalMessage = function ($text, $time) {
	let _this = this;
	_this.$store.commit("SET_MESSAGE_TEXT", $text);
	Vue.prototype.$refs.globalMessageRef.message($time);
}

export default {
	components: {
		VLoading,
		GlobalConfirm,
		GlobalMessage
	},
	computed: {
		...mapGetters({
			loading: 'getLoading',
			confirmVisible: "getConfirmVisible",
			confirmTitle: "getConfirmTitle",
			confirmText: "getConfirmText",
			confirmCleanHandle: "getConfirmCleanHandle",
			confirmOKHandle: "getConfirmOKHandle",
			messageText: "getMessageText"
		})
	},
	mounted() {
		Vue.prototype.$refs = this.$refs;
		this.$nextTick(function () {
			//共用 resize 事件列表
			setResizeCallback((fontSize, clientWidth) => {
				//console.log(fontSize + "," + clientWidth);
			});
		});
	},
	methods: {}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
html, body {
	height: 100%;
}

body {
	margin: 0;
	background: #EFEFF4;
	font-family: 'pingfang SC', 'Microsoft YaHei', '微软雅黑', 'helvetica', 'arial', 'verdana', 'tahoma', 'sans-serif';

	.clearfix:after {
		content: '.';
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}

	input, select, textarea {
		outline: none;
	}
}
</style>