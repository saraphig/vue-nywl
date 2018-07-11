<template>
	<div class="dailypaper-detail-page">
		<div class="bgcolor">
			<div class="dailypaper-content">
				<div class="content-head">
					<div class="page-title">日报详情</div>
					<div class="date-comp">
						<sh-date-pciker v-model="datePicker" type="date" placeholder="选择时间" class="date-pciker" disabled="disabled"></sh-date-pciker>
						<span>*</span>
					</div>
					<div class="clean-btn" @click="backHandle">返回</div>
					<div class="edit-btn" @click="editHandle">编辑</div>
				</div>
				<div class="page-line"></div>
				<div class="content-data">
					<div class="data-todayjobs">
						<div class="info-head">
							<div class="info-icon"></div>
							<div class="info-title">今日完成工作<span>*</span></div>
						</div>
						<div>
							<div class="area todayjobs-area">
								<textarea v-model="todayJobsInfo" class="textarea disabled" placeholder="" readonly="readonly" />
							</div>
						</div>
					</div>
					<div class="data-jobs">
						<div class="info-head">
							<div class="info-icon"></div>
							<div class="info-title">工作失误/事故发生及处理</div>
						</div>
						<div>
							<div class="selectItem">
								<input v-model="isError" class="disabled" readonly="readonly" />
							</div>
							<div class="area jobs-area" v-show="errorState == 1">
								<textarea v-model="errorInfo" class="textarea disabled" placeholder="" readonly="readonly" />
							</div>
						</div>
					</div>
					<div class="data-jobs">
						<div class="info-head">
							<div class="info-icon"></div>
							<div class="info-title">部门出勤</div>
						</div>
						<div>
							<div class="selectItem">
								<input v-model="isAttendance" class="disabled" readonly="readonly" />
							</div>
							<div class="area jobs-area" v-show="attendanceState == 0">
								<textarea v-model="attendanceInfo" class="textarea disabled" placeholder="" readonly="readonly"/>
							</div>
						</div>
					</div>
					<div class="data-jobs">
						<div class="info-head">
							<div class="info-icon"></div>
							<div class="info-title">申购及物资情况</div>
						</div>
						<div>
							<div class="selectItem">
								<input v-model="isMaterial" class="disabled" readonly="readonly" />
							</div>
							<div class="area jobs-area" v-show="materialState == 1">
								<textarea v-model="materialInfo" class="textarea disabled" placeholder="" readonly="readonly"/>
							</div>
						</div>
					</div>
					<div class="data-jobs">
						<div class="info-head">
							<div class="info-icon"></div>
							<div class="info-title">进货/供货情况</div>
						</div>
						<div>
							<div class="selectItem">
								<input v-model="isGoods" class="disabled" readonly="readonly" />
							</div>
							<div class="area jobs-area" v-show="goodsState == 1">
								<textarea v-model="goodsInfo" class="textarea disabled" placeholder="" readonly="readonly" />
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
		name: "dailypaperDetail",
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
				datePicker: "",
				todayJobsInfo: "",
				detailID: ""
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
				this.datePicker = data.time.substring(0, 10);
				this.todayJobsInfo = data.content;
				this.errorState = data.isErrorDetail;
				this.isError = data.isErrorDetail == 0 ? "无工作失误/事故" : "有工作失误/事故";
				this.errorInfo = data.errorDetail;
				this.attendanceState = data.isAttendanceCondition;
				this.isAttendance = data.isAttendanceCondition == 0 ? "未满勤" : "满勤";
				this.attendanceInfo = data.attendanceCondition;
				this.materialState = data.isMaterialCondition;
				this.isMaterial = data.isMaterialCondition == 0 ? "无物料使用" : "有物料使用";
				this.materialInfo = data.materialCondition;
				this.goodsState = data.isGoodsCondition;
				this.isGoods = data.isGoodsCondition == 0 ? "无进出货" : "有进出货";
				this.goodsInfo = data.goodsCondition;
			},
			// 点击【取消按钮】
			backHandle() {
				this.$router.push({
					path: '/dailypaper',
					query: {}
				})
			},
			// 点击【编辑按钮】
			editHandle() {
				this.$router.push({
					path: '/dailypaper/edit',
					query: {
						id: this.detailID
					}
				})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.disabled {
		background-color: #F6F9FB;
		border: 1px solid #E3E8EA;
		border-radius: 2px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	
	.dailypaper-detail-page {
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
				padding-left: 5px;
				padding-top: 5px;
				border-radius: 2px;
				line-height: 18px;
			}
			.area {
				height: 100px;
				margin-right: 23px;
				background: #fff;
				padding-right: 15px;
				padding: 20px;
			}
			.selectItem {
				margin-top: 22px;
				padding-left: 20px;
				padding-right: 48px;
				.select {
					padding-right: 32px;
					padding-right: 12px;
				}
				input {
					width: 100%;
					position: relative;
					font-size: 14px;
					padding-left: 10px;
					height: 38px;
					border: solid 1px #dcdfe6;
					border-radius: 2px;
				}
			}
			.data-todayjobs {
				margin-top: 30px;
				width: 100%;
				.todayjobs-area {}
			}
			.data-jobs {
				margin-top: 20px;
				width: 100%;
				.jobs-area {
					margin-top: -10px;
				}
			}
		}
	}
</style>