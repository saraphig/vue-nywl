<template>
	<div class="warnnotice-module">
		<div class="bgcolor">
			<div class="warnnotice-content">
				<div class="content-select">
					<div class="title">告警通知</div>
					<!-- 模糊查询 -->
					<div class="search-input-box">
						<input v-model="searchInput" placeholder="请输入手机号" type="number" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" class="search-input" @keyup.enter="searchHandle">
						<!--<i class="seach-iconfont iconfont icon-icon_shipinjiankong_suofang" @click="searchHandle"></i>-->
					</div>
					<!-- 操作按钮 -->
					<div class="content-btn btn-search" @click="searchHandle">
						<div class="btn-search-txt">查询</div>
					</div>
					<div class="content-btn btn-add" @click="addHandle">
						<div class="btn-txt">新增</div>
					</div>
				</div>
				<div class="content-table">
					<base-table>
						<!--定义每列比例-->
						<colgroup slot="slotColgroup">
							<col v-for="col in tcols" :width="col" />
						</colgroup>
						<!--定义表格标题-->
						<thead slot="slotThead">
							<tr v-for="item in thead" class="text-first-left">
								<th v-for="ichild in item" :colspan="ichild.colspan ? ichild.colspan : 1" :rowspan="ichild.rowspan ? ichild.rowspan : 1" class="text-center">
									<div>{{ichild.title}}</div>
								</th>
							</tr>
						</thead>
						<!--展示表格数据-->
						<tr slot="slotContent" v-for="(item,index) in tdatas" :id="item.id" class="text-center">
							<td>
								<div>{{(currentPage-1)*10 + index+1}}</div>
							</td>
							<td>
								<div>{{item.areaName|nullCheck}}</div>
							</td>
							<td>
								<div :class="colorComputed(item)">{{item.almLevel|checkAlarmLevel|nullCheck}}</div>
							</td>
							<td>
								<div>{{item.isSendSms|checkIsSendSms|nullCheck}}</div>
							</td>
							<td>
								<div>{{item.isSendEmail|checkIsSendEmail|nullCheck}}</div>
							</td>
							<td>
								<div>{{item.notificationName|nullCheck}}</div>
							</td>
							<td>
								<div>{{item.phoneNum|nullCheck}}</div>
							</td>
							<td>
								<div>{{item.email|nullCheck}}</div>
							</td>
							<td>
								<div>{{item.remark|nullCheck|nameLengthLimit}}</div>
							</td>
							<td>
								<div>
									<i class="iconfont icon-icon_list_gengduo detail-mask" @click="showMore(item.id)"></i>
									<ul class="edit-show-ul" v-show='moreAction==item.id'>
										<li @click="editHandle(item.id)">
											<i class="iconfont icon-icon_list_edit"></i>
											<span>编辑</span>
										</li>
										<li @click="delectHandle(item.id)">
											<i class="iconfont icon-icon_list_delete"></i>
											<span>删除</span>
										</li>
										<li @click="hideMore()">
											<i class="iconfont icon-icon_close"></i>
										</li>
									</ul>
								</div>
							</td>
						</tr>
						<!--没有数据时-->
						<div slot="slotNoData" class="tableNoData" v-if="tdatas.length == 0">
							<div class="tableNoData-layer"></div>
							<div class="tableNoData-text">暂无数据</div>
						</div>
					</base-table>
					<div class="fixedLayer" @click="hideMore()" v-show='moreAction!==null'></div>
				</div>
				<div class="table-pageBox" v-if="tdatas.length != 0">
					<div class="table-pageination">
						<base-pagination ref="pageComp" :total="total" :currentPage='currentPage' :pageSize='pageSize' @pagechange="pagechange"></base-pagination>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BaseTable from '../../components/base-table.vue'
	import BasePagination from '../../components/base-pagination.vue'

	export default {
		name: "warnnotice",
		data() {
			return {
				tcols: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
				thead: [
					[{
						title: "序号",
					}, {
						title: "监测地块",
					}, {
						title: "告警级别",
					}, {
						title: "发送短信",
					}, {
						title: "发送邮件",
					}, {
						title: "通知人",
					}, {
						title: "手机号码",
					}, {
						title: "邮箱",
					}, {
						title: "备注",
					}, {
						title: "操作",
					}]
				],
				tdatas: [],
				moreAction: null, // 更多操作
				total: 0, // 记录总条数
				pageSize: 10, // 每页显示条数
				currentPage: 1, // 当前的页数
				searchInput: "" // 搜索输入框
			}
		},
		components: {
			BaseTable,
			BasePagination
		},
		filters: {
			// 过滤告警等级显示名称
			checkAlarmLevel: function(value) {
				let result = ""
				if(value == 1) {
					result = "紧急告警";
				} else if(value == 2) {
					result = "重要告警";
				} else if(value == 3) {
					result = "一般告警";
				} else {
					result = value;
				}
				return result;
			},
			// 过滤是否发送短信显示名称
			checkIsSendSms: function(value) {
				let result = ""
				if(value == 1) {
					result = "是";
				} else {
					result = "否";
				}
				return result;
			},
			// 过滤是否发送邮件显示名称
			checkIsSendEmail: function(value) {
				let result = ""
				if(value == 1) {
					result = "是";
				} else {
					result = "否";
				}
				return result;
			},
			// 检测是否为空值
			nullCheck: function(value) {
				let result = "--";
				if(value) {
					result = value;
				}
				return result;
			},
			// 备注文字限制
			nameLengthLimit: function(value) {
				let introduct = "";
				if(value.length > 9) {
					introduct = value.substring(0, 10) + "...";
				} else {
					introduct = value;
				}
				return introduct;
			}
		},
		mounted() {
			//获取告警通知列表  
			this.requestAlarmsNoticeList("", "", "1"); //搜索条件、搜索地块、当前页码
		},
		methods: {
			// 搜索
			searchHandle: function() {
				this.requestAlarmsNoticeList(this.searchInput, "", 1); //搜索条件、搜索地块、当前页码
			},
			// 分页
			pagechange: function(currentPage) {
				this.requestAlarmsNoticeList(this.searchInput, "", currentPage); //搜索条件、搜索地块、当前页码
			},
			// 告警级别颜色显示自适应
			colorComputed: function(value) {
				let result = {};
				let almLevel = value.almLevel;
				if(almLevel == 2) {
					result = {
						important: true
					}
				} else if(almLevel == 1) {
					result = {
						warning: true
					}
				} else {
					result = {
						normal: true
					}
				}
				return result;
			},
			// 关闭更多操作项
			hideMore: function() {
				this.moreAction = null;
			},
			// 显示更多操作项
			showMore: function(id) {
				this.moreAction = id;
			},
			// 新增操作
			addHandle() {
				this.$router.push({
					path: '/page_warnnotice/add'
				})
			},
			// 编辑操作
			editHandle(eid) {
				let noticeID = eid;
				this.$router.push({
					path: '/page_warnnotice/edit',
					query: {
						id: noticeID
					}
				})
			},
			// 删除操作
			delectHandle($noticeId) {
				let _this = this;
				this.$globalConfirm("提示", "您是否确定删除该告警通知？", () => {
					let param = {};
					param.id = $noticeId;
					this.$store.dispatch("request_alarms_notice_delect", param).then((resp) => {
						this.requestAlarmsNoticeList(this.searchInput, "", 1); //搜索条件、搜索地块、当前页码
					}, (error) => {
						console.log(error);
					});
				}, () => {
					console.log("取消");
				});
			},
			// 获取告警通知列表
			requestAlarmsNoticeList($searchPhase, $areaCode, $pageNo) {
				let _this = this;
				let param = {};
				param.pageNo = $pageNo;
				param.pageSize = "10";
				if($areaCode) {
					param.areaCode = $areaCode;
				}
				param.phoneNum = $searchPhase;
				_this.$store.dispatch("request_alarms_notice_list", param).then((resp) => {
					console.log(resp);
					_this.tdatas = resp.data;
					_this.total = resp.total;
					_this.pageSize = resp.pageSize;
					_this.currentPage = resp.pageNo;
					this.$store.dispatch("save_alarms_notice_list", _this.tdatas);
					if(_this.$refs.pageComp) {
						_this.$refs.pageComp.setCurrent(_this.currentPage); // 当前页显示到相应数字
					}
				}, (error) => {
					console.log(error);
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
	
	.warnnotice-module {
		background-color: #F6F9FB;
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
		position: relative;
		.content-select {
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
				margin-top: 10px;
				font-weight: bold;
			}
			.search-input-box {
				margin-top: -6px;
				margin-left: 40px;
				font-size: 14px;
				height: 34px;
				width: 250px;
				border: solid 1px #dcdfe6;
				border-radius: 2px;W
				.search-input {
					position: absolute;
					border: 0px;
					width: 232px;
					height: 30px;
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
					line-height: 34px;
					left: 372px;
				}
			}
			.content-btn {
				font-size: 16px;
				height: 36px;
				width: 68px;
				text-align: center;
				line-height: 36px;
				cursor: pointer;
				border-radius: 2px;
			}
			.btn-search {
				position: relative;
				margin-top: -6px;
				margin-left: 20px;
				background-color: #41a259;
				.btn-search-txt {
					color: #fff;
				}
				/*.btn-search-txt:hover {
					opacity: 0.6;
				}*/
			}
			.btn-add {
				box-sizing: border-box;
				position: absolute;
				right: 30px;
				top: 24px;
				border: solid 1px #41a259;
				background-color: #ffffff;
				.btn-txt {
					color: #41a259;
				}
				/*.btn-txt:hover {
					opacity: 0.6;
				}*/
			}
			/*.btn-add:hover {
				border: solid 1px rgba(65, 162, 89, .6);
			}*/
		}
	}
	
	.content-table {
		position: relative;
		margin-left: 20px;
		margin-right: 20px;
		min-height: 500px;
		.detail-mask {
			cursor: pointer;
		}
		.normal {
			color: #444444;
		}
		.important {
			color: #FF921D;
		}
		.warning {
			color: #FF5560;
		}
		.edit-show-ul {
			margin: 0px;
			list-style: none;
			cursor: pointer;
			position: absolute;
			width: 160px;
			height: 30px;
			padding: 10px;
			padding-right: 0px;
			background: #fff;
			right: 0px;
			top: 2px;
			z-index: 9999;
			box-shadow: 0px 1px 16px #ccc;
			li {
				margin-top: -4px;
				float: left;
				width: 32%;
				text-align: center;
				i {
					font-size: 24px;
					display: block;
				}
				span {
					font-size: 12px;
					display: block;
					color: #999999;
				}
			}
			li:last-child {
				line-height: 36px;
				border-left: 1px solid #e5e6e7;
			}
			li:hover {
				color: #41a259;
				span {
					color: #41a259;
				}
			}
		}
		.text-center {
			text-align: center;
			font-size: 14px;
			height: 55px;
			div {
				padding-left: 0px;
			}
		}
		.text-first-left:first-child {
			th:first-child {
				text-align: center;
				padding-left: 10px;
			}
		}
		.btnNotAllow {
			cursor: not-allowed;
			color: #666666;
		}
		.btnNotAllow:hover {
			color: #CCCCCC;
			span {
				color: #CCCCCC;
			}
		}
		.popover {
			width: 270px;
			height: 144px;
			z-index: 2038;
			position: fixed;
			font-size: 14px;
			color: black;
			top: -90px;
			left: 60px;
			border-radius: 2px;
			box-shadow: 0px 1px 16px #000;
			.layer {
				width: 270px;
				height: 144px;
				position: fixed;
				background-color: white;
				border-radius: 2px;
			}
			.row1 {
				position: fixed;
				margin-top: 20px;
				display: flex;
				margin-left: 20px;
				.span1 {
					margin-left: 0px;
					display: block;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					width: 238px;
					text-align: left;
					color: #999999;
				}
			}
			.row2 {
				position: fixed;
				margin-top: 45px;
				margin-left: 20px;
				width: 348px;
				text-align: left;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				.span2 {
					margin-left: 0px;
					display: block;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					width: 238px;
					text-align: left;
					color: #999999;
				}
			}
			.row3 {
				position: fixed;
				margin-top: 72px;
				margin-left: 20px;
				width: 348px;
				text-align: left;
				height: 48px;
				overflow: hidden;
				.span3 {
					margin-left: 0px;
					display: block;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					width: 238px;
					text-align: left;
					color: #999999;
				}
			}
			.row4 {
				position: fixed;
				margin-top: 100px;
				margin-left: 20px;
				width: 348px;
				text-align: left;
				height: 48px;
				overflow: hidden;
				.span4 {
					margin-left: 0px;
					display: block;
					width: 238px;
					text-align: left;
					color: #999999;
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
				margin-top: -105px;
				margin-left: -18px;
			}
		}
	}
	
	.fixedLayer {
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		z-index: 998;
	}
	
	.table-pageBox {
		width: 100%;
		height: 100px;
		.table-pageination {
			position: absolute;
			right: 30px;
			margin-top: 30px;
			margin-bottom: 30px;
		}
	}
</style>