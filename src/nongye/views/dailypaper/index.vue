<template>
	<div class="dailypaper-module">
		<div class="bgcolor">
			<div class="dailypaper-content">
				<div class="content-filter">
					<div class="title">工作日报</div>
					<!--日期选择：结束日期要大于开始日期-->
					<div class="date-pick">
						<div class="fdate">
							<sh-date-pciker v-model="preTime" :show-icon="false" type="date" placeholder="开始时间"></sh-date-pciker>
						</div>
						<div class="sign">-</div>
						<div class="edate">
							<sh-date-pciker v-model="endTime" :show-icon="false" type="date" placeholder="结束时间"></sh-date-pciker>
						</div>
					</div>
					<!-- 模糊查询 -->
					<!--<div class="search-input-box">
						<input v-model="searchInput" placeholder="请输入撰写人" class="search-input" @keyup.enter="searchHandle">
					</div>-->
					<!-- 操作按钮 -->
					<div class="content-btn btn-search" @click="searchHandle">
						<div class="btn-search-txt">查询</div>
					</div>
					<div class="content-btn btn-add" @click="addHandle">
						<div class="btn-txt">新增</div>
					</div>
				</div>
				<div class="page-line"></div>
				<div class="content-list">
					<ul class="list-ul">
						<li class="list-li" v-for="(item,index) in tdatas" :id="item.id" @click="dailyDetail(item.id)">
							<div class="per-daily">
								<div class="daily-head">
									<div :class="imgBgColor()">{{item.userName|fieldImgName}}</div>
									<div class="name">{{item.userName}}</div>
									<div class="date">{{item.time|fieldDate}}</div>
									<div class="day">{{item.time|fieldDay}}</div>
								</div>
								<div class="daily-line"></div>
								<div class="daily-content">
									<div class="workvalue">
										<div :class="attendanceBgColor(item.isAttendanceCondition)">{{item.isAttendanceCondition|fieldAttendance}}</div>
										<div :class="materialBgColor(item.isMaterialCondition)">{{item.isMaterialCondition|fieldMaterial}}</div>
										<div :class="goodsBgColor(item.isGoodsCondition)">{{item.isGoodsCondition|fieldGoods}}</div>
									</div>
									<div v-html="fieldContent(item.content)" :ref="item.id" class="workdetail"></div>
									<div class="ellipsis" v-if="item.ellipsisVisible">...</div>
									<div class="workerror">工作失误：{{item|fieldErrorDetail}}</div>
								</div>
							</div>
						</li>
					</ul>
					<!--没有数据时-->
					<div class="tableNoData" v-if="tdatas.length == 0">
						<div class="tableNoData-layer"></div>
						<div class="tableNoData-text">暂无数据</div>
					</div>
				</div>
				<!-- 分页组件 -->
				<div class="equipment-table-pageBox" v-if="tdatas.length != 0">
					<div class="equipment-table-pageination">
						<base-pagination ref="pageComp" :total="total" :currentPage='currentPage' :pageSize='pageSize' @pagechange="pagechange"></base-pagination>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BasePagination from '../../components/base-pagination.vue'
	import ShDatePciker from '@com/sh-ui/components/sh-date-time/sh-date-picker'

	export default {
		name: "dailypaper",
		data() {
			return {
				tdatas: [],
				searchInput: "", // 搜索输入框
				total: 0, // 记录总条数
				pageSize: 12, // 每页显示条数
				currentPage: 1, // 当前的页数
				preTime: "", // 开始时间
				endTime: "" // 结束时间
			}
		},
		components: {
			BasePagination,
			ShDatePciker
		},
		filters: {
			fieldImgName: function(val) {
				let result = "";
				if(val.length >= 2) {
					let len = val.length;
					result = val.substring(len - 2, len);
				} else {
					result = val
				}
				return result;
			},
			fieldErrorDetail: function(val) {
				let result = "";
				if(val.isErrorDetail == 0) {
					result = "无";
				} else {
					if(!val.errorDetail) {
						result = "无";
					} else {
						result = val.errorDetail;
					}
				}
				return result;
			},
			fieldGoods: function(val) {
				let result = "";
				if(val == 0) {
					result = "无进出货";
				} else {
					result = "有进出货";
				}
				return result;
			},
			fieldMaterial: function(val) {
				let result = "";
				if(val == 0) {
					result = "无物料使用";
				} else {
					result = "有物料使用";
				}
				return result;
			},
			fieldAttendance: function(val) {
				let result = "";
				if(val == 0) {
					result = "未满勤";
				} else {
					result = "满勤";
				}
				return result;
			},
			fieldDate: function(val) {
				let result = val;
				if(result) {
					let month = result.substring(5, 7);
					let dateTime = result.substring(8, 10);
					result = month.toString() + "/" + dateTime.toString();
				}
				return result;
			},
			fieldDay: function(val) {
				let result = val;
				if(result) {
					let _year = parseInt(result.substring(0, 4));
					let _month = parseInt(result.substring(5, 7)) - 1;
					let _date = parseInt(result.substring(8, 10));
					let dateTime = new Date(_year, _month, _date);
					let day = dateTime.getDay();
					if(day == 0) {
						result = "星期天";
					} else if(day == 1) {
						result = "星期一";
					} else if(day == 2) {
						result = "星期二";
					} else if(day == 3) {
						result = "星期三";
					} else if(day == 4) {
						result = "星期四";
					} else if(day == 5) {
						result = "星期五";
					} else if(day == 6) {
						result = "星期六";
					}
				}
				return result;
			},
		},
		mounted() {
			let param = {};
			param.pageNo = 1;
			param.pageSize = 12;
			this.dailyListRequest(param);
		},
		methods: {
			fieldContent: function(val) {
				let content = val;
				content = content.replace(/\n/g, '<br/>');
				return content;
			},
			// 请求日报列表
			dailyListRequest(param) {
				let _this = this;
				_this.$store.dispatch("request_daily_list", param).then((resp) => {
					console.log(resp);
					// 是否显示省略号
					for(let i = 0; i < resp.data.length; i++) {
						resp.data[i].ellipsisVisible = false;
					}
					_this.tdatas = resp.data;
					_this.total = resp.total;
					_this.pageSize = resp.pageSize;
					_this.currentPage = resp.pageNo;
					_this.$nextTick(function() {
						let list = this.$refs;
						for(let prop in list) {
							let ele = list[prop];
							if(ele[0] && ele[0].scrollHeight > 80) {
								let dailtItem = _this.getDailyItem(prop);
								dailtItem.ellipsisVisible = true;
							}
						}
					})
				}, (error) => {
					console.log(error);
				});
			},
			// 根据ID获取当前日报
			getDailyItem($id) {
				let result = {};
				for(let i = 0; i < this.tdatas.length; i++) {
					if(this.tdatas[i].id == $id) {
						result = this.tdatas[i];
						break;
					}
				}
				return result;
			},
			// 是否有进出货
			goodsBgColor(isGoods) {
				let result = {};
				if(isGoods == 0) {
					result = {
						wv: true,
						val3: true
					}
				} else {
					result = {
						wv: true,
						val3: true,
						val3color: true
					}
				}
				return result;
			},
			// 是否有物料使用
			materialBgColor(isMaterial) {
				let result = {};
				if(isMaterial == 0) {
					result = {
						wv: true,
						val2: true
					}
				} else {
					result = {
						wv: true,
						val2: true,
						val2color: true
					}
				}
				return result;
			},
			// 是否满勤背景色
			attendanceBgColor: function(isAttendance) {
				let result = {};
				if(isAttendance == 0) {
					result = {
						wv: true,
						val1: true
					}
				} else {
					result = {
						wv: true,
						val1: true,
						val1color: true
					}
				}
				return result;
			},
			// 头像随机背景色
			imgBgColor: function() {
				let result = {};
				let randomColorIndex = 0;
				randomColorIndex = Math.floor(Math.random() * 10 + 1) % 3;
				console.log("randomColorIndex", randomColorIndex);
				if(randomColorIndex == 0) {
					result = {
						img: true,
						imgBgColor1: true
					}
				} else if(randomColorIndex == 1) {
					result = {
						img: true,
						imgBgColor2: true
					}
				} else {
					result = {
						img: true,
						imgBgColor3: true
					}
				}
				return result;
			},
			// 搜索操作
			searchHandle: function() {
				let _this = this;
				let reg = new RegExp("-", "g")
				let preTimeInt = this.preTime.replace(reg, "");
				preTimeInt = parseInt(preTimeInt);
				let endTimeInt = this.endTime.replace(reg, "");
				endTimeInt = parseInt(endTimeInt);
				if(preTimeInt > endTimeInt) {
					alert("开始时间不能大于结束时间");
					return;
				}

				let param = {};
				param.pageNo = 1;
				param.pageSize = 12;
				if(this.preTime == "" && this.endTime != "") {
					alert("请输入开始时间");
					return;
				} else if(this.preTime != "" && this.endTime == "") {
					alert("请输入结束时间");
					return;
				}
				param.startTime = this.preTime;
				param.endTime = this.endTime;
				this.dailyListRequest(param);
			},
			// 新增操作
			addHandle() {
				this.$router.push({
					path: '/dailypaper/add'
				})
			},
			// 详情操作
			dailyDetail(id) {
				let detailID = id;
				this.$router.push({
					path: '/dailypaper/detail',
					query: {
						id: detailID
					}
				})
			},
			// 分页事件
			pagechange: function(currentPage) {
				let param = {};
				param.pageNo = currentPage;
				param.pageSize = 12;
				if(this.preTime && this.endTime) {
					param.startTime = this.preTime;
					param.endTime = this.endTime;
				}
				let reg = new RegExp("-", "g")
				let preTimeInt = this.preTime.replace(reg, "");
				preTimeInt = parseInt(preTimeInt);
				let endTimeInt = this.endTime.replace(reg, "");
				endTimeInt = parseInt(endTimeInt);
				if(preTimeInt > endTimeInt) {
					param.startTime = "";
					param.endTime = "";
				}
				this.dailyListRequest(param);
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.dailypaper-module {
		background-color: #F6F9FB;
	}
	
	.bgcolor {
		padding: 20px;
		background-color: #f6fafa;
	}
	
	.dailypaper-content {
		min-width: 960px;
		width: 100%;
		height: 100%;
		border: solid 1px #e3e8ea;
		background-color: white;
		position: relative;
		.content-filter {
			margin-top: -3px;
			display: flex;
			padding: 30px;
			.title {
				width: 80px;
				height: 20px;
				font-size: 20px;
				font-weight: normal;
				font-stretch: normal;
				line-height: 0px;
				letter-spacing: 0px;
				color: #444444;
				margin-top: 14px;
				font-weight: bold;
			}
			.date-pick {
				margin-top: -4px;
				display: flex;
				margin-left: 40px;
				.fdate {
					width: 120px;
				}
				.edate {
					margin-left: 10px;
					width: 120px;
				}
				.sign {
					margin-left: 10px;
					line-height: 32px;
				}
			}
			.search-input-box {
				margin-top: -4px;
				margin-left: 40px;
				font-size: 14px;
				height: 34px;
				width: 200px;
				border: solid 1px #dcdfe6;
				border-radius: 2px;
				.search-input {
					position: absolute;
					border: 0px;
					width: 182px;
					height: 28px;
					margin-left: 12px;
					margin-top: 3px;
					font-size: 14px;
				}
				.seach-iconfont {
					cursor: pointer;
					color: #999999;
					font-size: 17px;
					position: absolute;
					width: 28px;
					line-height: 36px;
					left: 372px;
				}
			}
			.content-btn {
				box-sizing: border-box;
				font-size: 16px;
				height: 36px;
				width: 68px;
				text-align: center;
				line-height: 34px;
				cursor: pointer;
				border-radius: 2px;
			}
			.btn-search {
				position: relative;
				margin-top: -4px;
				margin-left: 20px;
				background-color: #41a259;
				.btn-search-txt {
					color: #fff;
				}
			}
			.btn-add {
				position: absolute;
				right: 30px;
				top: 27px;
				border: solid 1px #41a259;
				background-color: #fff;
				.btn-txt {
					color: #41a259;
				}
			}
		}
		.page-line {
			border-bottom: solid 1px #e3e8ea;
			margin-left: 30px;
			margin-right: 30px;
		}
		.content-list {
			position: relative;
			margin-left: 20px;
			margin-right: 20px;
			min-height: 500px;
			.list-ul {
				width: 100%;
				margin-left: -8px;
				margin-top: 10px;
			}
			.list-li {
				width: 25%;
				height: 234px;
				vertical-align: top;
				display: inline-block;
				margin-left: 0px;
				margin-top: 20px;
				cursor: pointer;
			}
			.per-daily:hover {
				border-color: #8FC89D;
				box-shadow: 0px 0px 10px #DEF8E5;
			}
			.per-daily {
				margin-left: 20px;
				height: 100%;
				background: #FFFFFF;
				border: 1px solid #E3E8EA;
				border-radius: 2px;
				overflow: hidden;
				.daily-head {
					position: relative;
					margin-top: 15px;
					padding-left: 20px;
					.img {
						position: absolute;
						border: 1px solid #E3E8EA;
						border-radius: 31px;
						color: white;
						width: 32px;
						height: 32px;
						line-height: 30px;
						text-align: center;
					}
					.imgBgColor1 {
						background: #F0A04A;
					}
					.imgBgColor2 {
						background: #61B776;
					}
					.imgBgColor3 {
						background: #51BDE6;
					}
					.name {
						position: absolute;
						left: 55px;
						font-size: 14px;
						margin-left: 10px;
						margin-top: 8px;
						font-weight: bold;
					}
					.date {
						position: absolute;
						right: 66px;
						font-size: 13px;
						color: #666666;
						text-align: right;
						margin-top: 9px;
					}
					.day {
						position: absolute;
						right: 20px;
						font-size: 13px;
						color: #666666;
						margin-top: 9px;
					}
				}
				.daily-line {
					margin-top: 60px;
					border-bottom: solid 1px #e3e8ea;
					margin-left: 20px;
					margin-right: 20px;
				}
				.daily-content {
					width: 100%;
					.workvalue {
						position: relative;
						margin-top: 12px;
						padding-left: 20px;
						padding-right: 4px;
						display: flex;
						width: 100%;
						.wv {
							font-size: 12px;
							color: #999999;
							border: solid 1px #999999;
							position: absolute;
							height: 20px;
							line-height: 20px;
							padding-left: 5px;
							padding-right: 5px;
							border-radius: 2px;
						}
						.val1 {
							width: 36px;
							text-align: center;
							color: #F36A6A;
							border-color: #F36A6A;
						}
						.val1color {
							color: #4FA664;
							border-color: #4FA664;
						}
						.val2 {
							left: 75px;
						}
						.val2color {
							color: #51BDE6;
							border-color: #51BDE6;
						}
						.val3 {
							left: 155px;
						}
						.val3color {
							color: #F0A04A;
							border-color: #F0A04A;
						}
					}
					.workdetail {
						margin-top: 29px;
						top: 0px;
						position: relative;
						font-size: 14px;
						line-height: 20px;
						height: 80px;
						overflow: hidden;
						padding-left: 20px;
						padding-right: 15px;
						color: #444444;
						word-break: break-all;
					}
					.ellipsis {
						padding-left: 20px;
						font-size: 18px;
						line-height: 8px;
					}
					.workerror {
						margin-top: 20px;
						font-size: 14px;
						padding-left: 20px;
						padding-right: 4px;
						color: #999999;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}
			.tableNoData {
				.tableNoData-layer {
					height: 300px;
				}
				.tableNoData-text {
					position: absolute;
					width: 100%;
					text-align: center;
					color: #888;
					font-size: 24px;
					margin-top: -120px;
					margin-left: -20px;
				}
			}
		}
		.equipment-table-pageBox {
			width: 100%;
			height: 100px;
			.equipment-table-pageination {
				position: absolute;
				right: 30px;
				margin-top: 30px;
				margin-bottom: 30px;
			}
		}
	}
</style>