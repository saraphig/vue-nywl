<template>
	<div class="warnnotice">
		<div class="bgcolor">
			<div class="warnnotice-content">
				<div class="content-head">
					<div class="page-title">新增告警通知</div>
					<div class="clean-btn" @click="backHandle">取消</div>
					<div class="edit-btn" @click="saveHandle">保存</div>
				</div>
				<div class="page-line"></div>
				<div class="content-data">
					<div class="data-info">
						<div class="info-head">
							<div class="info-icon"></div>
							<div class="info-title">信息设置</div>
						</div>
						<div class="content">
							<div class="content-left">
								<div class="selectItem">
									<span class="data-label">监测地块：</span>
									<div class="select">
										<base-select :opts="areaOpts" :placeholderStr="areaPlaceholderStr" @disp-selectCallBack="areaSelectCallBack"></base-select>
									</div>
								</div>
								<div class="selectItem">
									<span class="data-label">告警级别：</span>
									<div class="select">
										<base-select :opts="alarmOpts" :placeholderStr="alarmPlaceholderStr" @disp-selectCallBack="alarmSelectCallBack"></base-select>
									</div>
								</div>
								<div class="selectItem">
									<span class="data-label">通知人：</span>
									<div class="select">
										<base-select :opts="noticeUserOpts" :placeholderStr="noticeUserPlaceholderStr" @disp-selectCallBack="noticeUserSelectCallBack"></base-select>
									</div>
								</div>
								<div class="checkBoxWidth inputItem">
									<span class="data-label">通知方式：</span>
									<div class="checkDiv check1" @click="telNoticeHandle">
										<div class="checkBox"></div>
										<i class="check-iconfont iconfont icon-icon_gouxuan" v-if="telNoticeChecked"></i>
										<div class="check-info">手机短信通知</div>
									</div>
									<div class="checkDiv check2" @click="emailNoticeHandle">
										<div class="checkBox"></div>
										<i class="check-iconfont iconfont icon-icon_gouxuan" v-if="emailNoticeChecked"></i>
										<div class="check-info">邮件通知</div>
									</div>
									<div class="checkDiv check3" @click="wechatNoticeHandle">
										<div class="checkBox"></div>
										<i class="check-iconfont iconfont icon-icon_gouxuan" v-if="wechatNoticeChecked"></i>
										<div class="check-info">微信通知</div>
									</div>
								</div>
							</div>
							<div class="content-right">
								<div class="inputItem">
									<span class="data-label">手机号码：</span>
									<input v-model="telephone" placeholder="选择通知人后自动获取" type="number" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" readonly="readonly" class="disabled" />
								</div>
								<div class="inputItem">
									<span class="data-label">邮箱地址：</span>
									<input v-model="email" placeholder="选择通知人后自动获取" readonly="readonly" class="disabled" />
								</div>
							</div>
						</div>
					</div>
					<div class="data-postscript">
						<div class="info-head">
							<div class="info-icon"></div>
							<div class="info-title">备注</div>
						</div>
						<div class="ps-area">
							<div class="area-box">
								<textarea v-model="ps" class="textarea" placeholder="长度限制在20个字以内" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BaseSelect from '../../components/base-select.vue'
	import { getStore } from '@lib/js/mUtils';

	export default {
		name: "warnnoticeAdd",
		data() {
			return {
				areaOpts: [],
				areaPlaceholderStr: "监测地块选择",
				areaData: null,
				alarmOpts: [],
				alarmPlaceholderStr: "告警级别选择",
				alarmLevel: null,
				noticeUserOpts: [],
				noticeUserPlaceholderStr: "通知人",
				noticeUserData: null,
				telephone: "", // 电话
				email: "", // 邮件
				ps: "", // 备注
				telNoticeChecked: true,
				emailNoticeChecked: true,
				wechatNoticeChecked: true
			}
		},
		components: {
			BaseSelect
		},
		mounted() {
			let _this = this;
			//获取当前机构的所有子地块
			let areaParam = {};
			areaParam.areaCode = getStore('organizationCode');
			_this.$store.dispatch("request_areaDetail", areaParam).then((data) => {
				// 格式化
				for(let i = 0; i < data.length; i++) {
					data[i].id = data[i].areaCode;
					data[i].value = data[i].idName;
				}
				_this.areaOpts = data;
			}, (error) => {
				console.log(error);
			});

			//获取告警级别种类
			let param = {};
			_this.$store.dispatch("request_alarms_level", param).then((data) => {
				// 格式化
				for(let i = 0; i < data.length; i++) {
					data[i].value = data[i].name;
				}
				_this.alarmOpts = data;
			}, (error) => {
				console.log(error);
			});

			//获取系统用户列表
			let userParam = {};
			userParam.pageNo = 1;
			userParam.pageSize = 10000;
			userParam.areaCode = "";
			_this.$store.dispatch("getUserList", userParam).then((resp) => {
				// 格式化
				let userList = resp.data;
				for(let i = 0; i < userList.length; i++) {
					userList[i].value = userList[i].userName;
				}
				_this.noticeUserOpts = userList;
			}, (error) => {
				console.log(error);
			});
		},
		methods: {
			// 检测【告警级别】
			checkAlarmLevel() {
				if(this.alarmLevel) {
					return true;
				} else {
					alert("请选择告警级别!");
					return false;
				}
			},
			// 检测【通知人】的有效性
			checkNoticeUser() {
				if(this.noticeUserData) {
					return true;
				} else {
					alert("通知人输入不能为空!");
					return false;
				}
			},
			// 检测【邮箱】的有效性
			checkEmail(emailValue) {
				return true;
				let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
				if(emailValue === "") {
					alert("邮箱输入不能为空!");
					return false;
				} else if(!reg.test(emailValue)) { //正则验证不通过，格式不对
					alert("邮箱验证不通过!");
					return false;
				} else {
					return true;
				}
			},
			// 检测【电话】的有效性
			checkTelephone(telephoneValue) {
				return true;
				if(telephoneValue === "") {
					alert("手机号码输入不能为空!");
					return false;
				} else if(telephoneValue.length != 11) {
					alert("请输入11位数字的手机号码!");
					return false;
				} else {
					return true;
				}
			},
			// 检测【备注】字数
			checkPS(psValue) {
				if(psValue.length > 20) {
					alert("备注的字数不能超过20个字符!");
					return false;
				} else {
					return true;
				}
			},
			// 选择【检测地块】
			areaSelectCallBack(sid) {
				let areaList = this.areaOpts;
				for(let i = 0; i < areaList.length; i++) {
					if(areaList[i].areaCode == sid) {
						this.areaData = areaList[i];
						break;
					}
				}
			},
			// 选择【告警级别】
			alarmSelectCallBack(sid) {
				let alarmList = this.alarmOpts;
				for(let i = 0; i < alarmList.length; i++) {
					if(alarmList[i].id == sid) {
						this.alarmLevel = alarmList[i];
						break;
					}
				}
			},
			// 选择【通知人】
			noticeUserSelectCallBack(sid) {
				let userList = this.noticeUserOpts;
				for(let i = 0; i < userList.length; i++) {
					if(userList[i].id == sid) {
						this.noticeUserData = userList[i];
						break;
					}
				}
				this.email = this.noticeUserData.email == "" ? "--" : this.noticeUserData.email;
				this.telephone = this.noticeUserData.telephone == "" ? "--" : this.noticeUserData.telephone;
			},
			// 点击【电话通知复选框】
			telNoticeHandle() {
				if(this.telNoticeChecked) {
					this.telNoticeChecked = false;
				} else {
					this.telNoticeChecked = true;
				}
			},
			// 点击【邮件通知复选框】
			emailNoticeHandle() {
				if(this.emailNoticeChecked) {
					this.emailNoticeChecked = false;
				} else {
					this.emailNoticeChecked = true;
				}
			},
			// 点击【微信通知复选框】
			wechatNoticeHandle() {
				if(this.wechatNoticeChecked) {
					this.wechatNoticeChecked = false;
				} else {
					this.wechatNoticeChecked = true;
				}
			},
			// 点击【取消按钮】
			backHandle() {
				this.$router.push({
					path: '/page_warnnotice',
					query: {}
				})
			},
			// 点击【保存按钮】
			saveHandle() {
				let _this = this;
				// 验证输入数据的有效性
				if(!(_this.checkAlarmLevel() && _this.checkTelephone(_this.telephone) && _this.checkNoticeUser() && _this.checkEmail(_this.email) && _this.checkPS(_this.ps))) {
					return;
				}
				// 邮件通知和电话通知至少选择一项
				if(_this.telNoticeChecked == false && _this.emailNoticeChecked == false && _this.wechatNoticeChecked == false) {
					alert("通知方式请至少选择一项!");
					return;
				}
				// 保存实现
				let noticeData = {};
				noticeData.almLevel = _this.alarmLevel.id;
				noticeData.areaCode = _this.areaData.areaCode;
				noticeData.areaName = _this.areaData.idName;
				noticeData.email = _this.email;
				noticeData.notificationName = _this.noticeUserData.userName;
				noticeData.phoneNum = _this.telephone;
				noticeData.remark = _this.ps;
				noticeData.isSendEmail = _this.emailNoticeChecked ? "1" : "0";
				noticeData.isSendSms = _this.telNoticeChecked ? "1" : "0";
				noticeData.isSendWechat = _this.wechatNoticeChecked ? "1" : "0";
				noticeData.userId = _this.noticeUserData.id;
				_this.$store.dispatch("request_alarms_notice_add", noticeData).then((response) => {
					this.$router.push({
						path: '/page_warnnotice',
						query: {}
					})
				}, (error) => {
					alert(error.toString());
				});
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	input::-ms-clear {
		display: none;
	}
	
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none !important;
	}
	
	input[type="number"] {
		-moz-appearance: textfield;
	}
	
	.disabled {
		background-color: #F6F9FB;
		border: 1px solid #E3E8EA;
		border-radius: 2px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	
	.warnnotice {
		background-color: #F6F7F9;
	}
	
	.bgcolor {
		padding: 20px;
		background-color: #f6fafa;
	}
	
	.warnnotice-content {
		width: 100%;
		height: 100%;
		border: solid 1px #e3e8ea;
		background-color: white;
		.content-head {
			display: flex;
			padding: 30px;
			.page-title {
				width: 130px;
				height: 20px;
				font-size: 20px;
				font-weight: normal;
				font-stretch: normal;
				line-height: 0px;
				letter-spacing: 0px;
				color: #444444;
				margin-top: 10px;
				font-weight: bold;
			}
			.clean-btn {
				box-sizing: border-box;
				font-size: 14px;
				height: 36px;
				width: 68px;
				border: solid 1px #41a259;
				color: #41a259;
				text-align: center;
				line-height: 34px;
				cursor: pointer;
				background-color: #ffffff;
				border-radius: 2px;
				position: absolute;
				right: 135px;
				margin-top: -6px;
			}
			.edit-btn {
				box-sizing: border-box;
				font-size: 14px;
				height: 36px;
				width: 68px;
				border: solid 1px #dcdfe6;
				color: #fff;
				text-align: center;
				line-height: 34px;
				cursor: pointer;
				background-color: #41a259;
				border-radius: 2px;
				position: absolute;
				right: 50px;
				margin-top: -6px;
			}
		}
		.page-line {
			border-bottom: solid 1px #e3e8ea;
			margin-left: 30px;
			margin-right: 30px;
		}
		.content-data {
			flex: 1;
			width: 100%;
			height: 100%;
			margin-left: 10px;
			margin-right: 30px;
			.info-title {
				color: #666666;
				font-size: 16px;
			}
			.info-head {
				margin-left: 0px;
				display: flex;
				.info-icon {
					border-left: solid 5px #41a259;
				}
				.info-title {
					margin-left: 14px;
				}
			}
			.data-info {
				margin-top: 30px;
				width: 100%;
				.content {
					margin-top: 20px;
					margin-left: -8px;
					display: flex;
					.content-left {
						width: 50%;
						margin-left: -13px;
					}
					.content-right {
						width: 50%;
						margin-left: 0px;
						padding-right: 30px;
					}
				}
			}
			.data-postscript {
				margin-top: 30px;
				width: 100%;
				.area-box {
					margin-bottom: 60px;
					margin-left: 19px;
					margin-right: 32px;
					margin-top: 30px;
					background: #FFFFFF;
					border: 1px solid #E3E8EA;
					border-radius: 2px;
					height: 100px;
					padding: 5px;
				}
				.textarea {
					width: 100%;
					height: 100%;
					font-size: 14px;
					border: 0px;
					resize: none;
				}
			}
			.data-label {
				text-align: right;
				font-size: 14px;
				color: #999999;
			}
			.selectItem {
				width: 100%;
				display: flex;
				margin-top: 10px;
				span {
					display: block;
					width: 110px;
					line-height: 42px;
				}
				.select {
					flex: 1;
					width: 100%;
				}
			}
			.checkBoxWidth {
				min-width: 600px;
			}
			.inputItem {
				width: 100%;
				display: flex;
				margin-top: 10px;
				span {
					display: block;
					width: 110px;
					line-height: 42px;
				}
				input {
					flex: 1;
					width: 100%;
					position: relative;
					font-size: 16px;
					padding-left: 10px;
					height: 38px;
					border: solid 1px #dcdfe6;
					border-radius: 2px;
				}
				/*复选框*/
				.checkDiv {
					margin-left: 10px;
					margin-top: 10px;
					.checkBox {
						width: 18px;
						height: 18px;
						border: solid 1px #41A259;
						position: absolute;
					}
					.check-iconfont {
						position: absolute;
						color: #41A259;
						margin-left: 3px;
						margin-top: 1px;
					}
					.check-info {
						position: absolute;
						margin-left: 30px;
						margin-top: 3px;
						color: #444444;
						font-size: 14px;
						user-select: none;
					}
				}
				.check1 {
					cursor: pointer;
				}
				.check2 {
					cursor: pointer;
					margin-left: 146px;
				}
				.check3 {
					cursor: pointer;
					margin-left: 122px;
				}
			}
		}
	}
</style>