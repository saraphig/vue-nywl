<template>
	<div class="dailypaper-edit-page">
		<div class="bgcolor">
			<div class="dailypaper-content">
				<div class="content-head">
					<div class="page-title">编辑日报</div>
					<div class="date-comp">
						<sh-date-pciker v-model="datePicker" type="date" placeholder="选择时间" class="date-pciker" :disabled-date="calendarDisabledDate"></sh-date-pciker>
						<span>*</span>
					</div>
					<div class="clean-btn" @click="backHandle">取消</div>
					<div class="edit-btn" @click="saveHandle">保存</div>
				</div>
				<div class="page-line"></div>
				<div class="content-data">
					<div class="data-todayjobs">
						<div class="info-head">
							<div class="info-icon"></div>
							<div class="info-title">今日完成工作<span>*</span></div>
						</div>
						<div class="info-content">
							<div class="area todayjobs-area">
								<textarea v-model="todayJobsInfo" class="textarea" placeholder="请输入工作内容" />
								<div class="count-txt">{{todayjobsTxtCount}}</div>
							</div>
						</div>
					</div>
					<div class="data-jobs">
						<div class="info-head">
							<div class="info-icon"></div>
							<div class="info-title">工作失误/事故发生及处理</div>
						</div>
						<div class="info-content">
							<div class="selectItem">
								<div class="select">
									<base-select ref="errorRef" :opts="errorOpts" @disp-selectCallBack="errorSelectCompCallBack"></base-select>
								</div>
							</div>
							<div class="area jobs-area" v-show="errorState == 1">
								<textarea v-model="errorInfo" class="textarea" placeholder="请输入工作失误/事故发生情况" />
								<div class="count-txt">{{errorTxtCount}}</div>
							</div>
						</div>
					</div>
					<div class="data-jobs">
						<div class="info-head">
							<div class="info-icon"></div>
							<div class="info-title">部门出勤</div>
						</div>
						<div class="info-content">
							<div class="selectItem">
								<div class="select">
									<base-select ref="attendanceRef" :opts="attendanceOpts" @disp-selectCallBack="attendanceSelectCompCallBack"></base-select>
								</div>
							</div>
							<div class="area jobs-area" v-show="attendanceState == 0">
								<textarea v-model="attendanceInfo" class="textarea" placeholder="请输入部门出勤情况" />
								<div class="count-txt">{{attendanceTxtCount}}</div>
							</div>
						</div>
					</div>
					<div class="data-jobs">
						<div class="info-head">
							<div class="info-icon"></div>
							<div class="info-title">申购及物资情况</div>
						</div>
						<div class="info-content">
							<div class="selectItem">
								<div class="select">
									<base-select ref="materialRef" :opts="materialOpts" @disp-selectCallBack="materialSelectCompCallBack"></base-select>
								</div>
							</div>
							<div class="area jobs-area" v-show="materialState == 1">
								<textarea v-model="materialInfo" class="textarea" placeholder="请输入申购及物资使用情况" />
								<div class="count-txt">{{materialTxtCount}}</div>
							</div>
						</div>
					</div>
					<div class="data-jobs">
						<div class="info-head">
							<div class="info-icon"></div>
							<div class="info-title">进货/供货情况</div>
						</div>
						<div class="info-content">
							<div class="selectItem">
								<div class="select">
									<base-select ref="goodsRef" :opts="goodsOpts" @disp-selectCallBack="goodsSelectCompCallBack"></base-select>
								</div>
							</div>
							<div class="area jobs-area" v-show="goodsState == 1">
								<textarea v-model="goodsInfo" class="textarea" placeholder="请输入进货及供货情况" />
								<div class="count-txt">{{goodsTxtCount}}</div>
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
	import ShDatePciker from '@com/sh-ui/components/sh-date-time/sh-date-picker'
	import { getStore } from '@lib/js/mUtils';
	import moment from 'moment'

	export default {
		name: "dailypaperEdit",
		data() {
			return {
				errorOpts: [{
					id: 0,
					value: "无工作失误/事故"
				}, {
					id: 1,
					value: "有工作失误/事故"
				}],
				isError: "",
				errorState: 0,
				errorInfo: "",
				errorTxtCount: "0/200",
				attendanceOpts: [{
					id: 1,
					value: "满勤"
				}, {
					id: 0,
					value: "未满勤"
				}],
				isAttendance: "",
				attendanceState: 1,
				attendanceInfo: "",
				attendanceTxtCount: "0/200",
				materialOpts: [{
					id: 0,
					value: "无物料使用"
				}, {
					id: 1,
					value: "有物料使用"
				}],
				isMaterial: "",
				materialState: 0,
				materialInfo: "",
				materialTxtCount: "0/200",
				goodsOpts: [{
					id: 0,
					value: "无进出货"
				}, {
					id: 1,
					value: "有进出货"
				}],
				isGoods: "",
				goodsState: 0,
				goodsInfo: "",
				goodsTxtCount: "0/200",
				datePicker: "",
				todayJobsInfo: "",
				todayjobsTxtCount: "0/200",
				detailID: "",
				time: ""
			}
		},
		watch: {
			todayJobsInfo: function(value) {
				if(value.length >= 200) {
					this.todayJobsInfo = value.substring(0, 200);
				}
				this.todayjobsTxtCount = value.length + "/200";
			},
			errorInfo: function(value) {
				if(value.length >= 200) {
					this.errorInfo = value.substring(0, 200);
				}
				this.errorTxtCount = value.length + "/200";
			},
			attendanceInfo: function(value) {
				if(value.length >= 200) {
					this.attendanceInfo = value.substring(0, 200);
				}
				this.attendanceTxtCount = value.length + "/200";
			},
			materialInfo: function(value) {
				if(value.length >= 200) {
					this.materialInfo = value.substring(0, 200);
				}
				this.materialTxtCount = value.length + "/200";
			},
			goodsInfo: function(value) {
				if(value.length >= 200) {
					this.goodsInfo = value.substring(0, 200);
				}
				this.goodsTxtCount = value.length + "/200";
			}
		},
		components: {
			BaseSelect,
			ShDatePciker
		},
		mounted() {
			let _this = this;
			scrollTo(0, 0);
			// 通过传入设备ID获取设备详细信息
			this.detailID = _this.$route.query.id;
			let param = {};
			param.id = this.detailID;
			_this.$store.dispatch("request_daily_detail", param).then((resp) => {
				_this.$nextTick(function() {
					_this.init(resp); // 初始化数据
				});
			}, (error) => {
				console.log(error);
			});
		},
		methods: {
			//初始化数据
			init(data) {
				console.log(data);
				this.time = data.time.substring(0, 10);
				this.datePicker = data.time.substring(0, 10);
				if(data.content) {
					this.todayJobsInfo = data.content;
					this.todayjobsTxtCount = data.content.length + "/200";
				} else {
					this.todayJobsInfo = "";
					this.todayjobsTxtCount = "0/200";
				}
				this.errorState = data.isErrorDetail;
				this.isError = data.isErrorDetail == 0 ? "无工作失误/事故" : "有工作失误/事故";
				if(data.errorDetail) {
					this.errorInfo = data.errorDetail;
					this.errorTxtCount = data.errorDetail.length + "/200";
				} else {
					this.errorInfo = "";
					this.errorTxtCount = "0/200";
				}
				this.attendanceState = data.isAttendanceCondition;
				this.isAttendance = data.isAttendanceCondition == 0 ? "未满勤" : "满勤";
				if(data.attendanceCondition) {
					this.attendanceInfo = data.attendanceCondition;
					this.attendanceTxtCount = data.attendanceCondition.length + "/200";
				} else {
					this.attendanceInfo = "";
					this.attendanceTxtCount = "0/200";
				}
				this.materialState = data.isMaterialCondition;
				this.isMaterial = data.isMaterialCondition == 0 ? "无物料使用" : "有物料使用";
				if(data.materialCondition) {
					this.materialInfo = data.materialCondition;
					this.materialTxtCount = data.materialCondition.length + "/200";
				} else {
					this.materialInfo = "";
					this.materialTxtCount = "0/200";
				}
				this.goodsState = data.isGoodsCondition;
				this.isGoods = data.isGoodsCondition == 0 ? "无进出货" : "有进出货";
				if(data.goodsCondition) {
					this.goodsInfo = data.goodsCondition;
					this.goodsTxtCount = data.goodsCondition.length + "/200";
				} else {
					this.goodsInfo = "";
					this.goodsTxtCount = "0/200";
				}
				this.$refs.errorRef.setDefaultSelect(this.errorState, this.isError); //默认值：没有工作失误
				this.$refs.attendanceRef.setDefaultSelect(this.attendanceState, this.isAttendance); //默认值：满勤
				this.$refs.materialRef.setDefaultSelect(this.materialState, this.isMaterial); //默认值：无物料使用
				this.$refs.goodsRef.setDefaultSelect(this.goodsState, this.isGoods); //默认值：无进出货
			},
			//下拉列选择【是否有工作失误】
			errorSelectCompCallBack(sid) {
				this.errorState = sid;
			},
			//下拉列选择【是否满勤】
			attendanceSelectCompCallBack(sid) {
				this.attendanceState = sid;
			},
			//下拉列选择【是否有物料使用】
			materialSelectCompCallBack(sid) {
				this.materialState = sid;
			},
			//下拉列选择【是否有进出货】
			goodsSelectCompCallBack(sid) {
				this.goodsState = sid;
			},
			// 日期只能选择之前的
			calendarDisabledDate(current) {
				return current.isAfter(moment().endOf('day')); // 小于当前日期的禁用
			},
			// 点击【取消按钮】
			backHandle() {
				this.$router.push({
					path: '/dailypaper',
					query: {}
				})
			},
			// 编辑接口调用
			doInter(response) {
				let _this = this;
				let timeState = response;
				if(timeState == 0) {
					let year = parseInt(_this.datePicker.split("-")[0]);
					let month = parseInt(_this.datePicker.split("-")[1]) - 1;
					let day = parseInt(_this.datePicker.split("-")[2]);
					let dateTime = new Date(year, month, day);
					let time = dateTime.getTime();
					let dailyData = {};
					dailyData.time = time;
					dailyData.content = _this.todayJobsInfo;
					dailyData.isErrorDetail = _this.errorState;
					dailyData.errorDetail = _this.errorState == 1 ? _this.errorInfo : "";
					dailyData.isAttendanceCondition = _this.attendanceState;
					dailyData.attendanceCondition = _this.attendanceState == 0 ? _this.attendanceInfo : "";
					dailyData.isMaterialCondition = _this.materialState;
					dailyData.materialCondition = _this.materialState == 1 ? _this.materialInfo : "";
					dailyData.isGoodsCondition = _this.goodsState;
					dailyData.goodsCondition = _this.goodsState == 1 ? _this.goodsInfo : "";
					dailyData.id = _this.detailID;
					// 编辑日报请求 
					_this.$store.dispatch("request_daily_edit", dailyData).then((response) => {
						_this.$router.push({
							path: '/dailypaper',
							query: {}
						})
					}, (error) => {
						alert(error.toString());
					});
				} else {
					alert("该日已存在日报，请勿重复添加");
				}
			},
			// 点击【保存按钮】
			saveHandle() {
				let _this = this;
				if(!_this.datePicker) {
					alert("请选择时间");
					return;
				}
				if(!_this.todayJobsInfo) {
					alert("请输入工作内容");
					return;
				} else if(_this.todayJobsInfo.length > 200) {
					alert("工作内容不能超过200字符");
					return;
				}
				if(_this.errorState == 1 && _this.errorInfo.length > 200) {
					alert("工作失误/事故发生情况不能超过200字符");
					return;
				}
				if(_this.attendanceState == 0 && _this.attendanceInfo.length > 200) {
					alert("部门出勤情况不能超过200字符");
					return;
				}
				if(_this.materialState == 1 && _this.materialInfo.length > 200) {
					alert("申购及物资使用情况不能超过200字符");
					return;
				}
				if(_this.goodsState == 1 && _this.goodsInfo.length > 200) {
					alert("进货及供货情况不能超过200字符");
					return;
				}
				// 检查当前日期是否已经存在日报
				if(_this.datePicker == _this.time) {
					this.doInter(0);
				} else {
					_this.$store.dispatch("request_daily_checkTime", {
						time: _this.datePicker
					}).then((response) => {
						this.doInter(response);
					}, (error) => {
						alert(error.toString());
					});
				}
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.dailypaper-edit-page {
		background-color: #F6F7F9;
	}
	
	.bgcolor {
		padding: 20px;
		background-color: #f6fafa;
	}
	
	.dailypaper-content {
		width: 100%;
		height: 100%;
		border: solid 1px #e3e8ea;
		background-color: white;
		padding-bottom: 60px;
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
			.date-comp {
				width: 250px;
				height: 36px;
				margin-top: -6px;
				.date-pciker {}
				span {
					color: #f00;
					margin-left: 264px;
					position: absolute;
					margin-top: -24px;
				}
			}
			.date-iconfont {
				position: absolute;
				margin-top: -28px;
				margin-left: 15px;
				color: #41A259;
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
			width: 60%;
			height: 100%;
			margin-left: 10px;
			margin-right: 30px;
			.info-title {
				font-size: 16px;
				color: #999999;
				line-height: 16px;
				span {
					color: red;
					margin-left: 12px;
					position: absolute;
					margin-top: 4px;
				}
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
			.info-content {
				margin-left: 20px;
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
			.textarea:focus {
				border-color: #41A259;
			}
			.textarea {
				width: 100%;
				height: 100%;
				font-size: 14px;
				border: 1px solid #e3e8ea;
				resize: none;
				padding-top: 5px;
				border-radius: 2px;
				line-height: 18px;
				text-indent: 10px;
			}
			.area {
				padding: 0px;
				height: 100px;
				background: #fff;
			}
			.count-txt {
				float: right;
				margin-right: 20px;
				user-select: none;
				pointer-events: none;
				position: relative;
				width: 100%;
				font-size: 12px;
				color: #999;
				text-align: right;
				margin-top: -20px;
				-webkit-user-select: none;
				-moz-user-select: none;
				-ms-user-select: none;
				user-select: none;
			}
			.selectItem {
				margin-top: 22px;
				.select {}
			}
			.data-todayjobs {
				margin-top: 30px;
				width: 80%;
				.todayjobs-area {
					margin-top: 10px;
				}
			}
			.data-jobs {
				margin-top: 20px;
				width: 80%;
				.jobs-area {
					margin-top: 10px;
				}
			}
		}
	}
</style>