<template>
	<div class="equipment-module">
		<div class="bgcolor">
			<div class="equipment-content">
				<div class="equipment-select">
					<div class="equipment-title">设备列表</div>
					<!-- 设备地块选择 -->
					<div class="content-select">
						<base-select ref="areaSelectComp" :opts="areaSelectCompItems" :placeholderStr="areaSelectCompPlaceholder" @disp-selectCallBack="areaSelectCompCallBack"></base-select>
					</div>
					<!-- 设备模糊查询 -->
					<input v-model="areaSearchInput" class="content-input" placeholder="请输入设备名称或监测地块" @keyup.enter="searchFromInputHandle" />
					<!-- 操作按钮 -->
					<div class="content-btn btn-search" @click="searchFromInputHandle">
						<div class="btn-search-txt">查询</div>
					</div>
					<div class="content-btn btn-add" @click="addHandle">
						<div class="btn-search-txt">新增</div>
					</div>
				</div>
				<!-- 设备表格 -->
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
								<div :title="item.manufacturer">{{item.manufacturer|nullCheck}}</div>
							</td>
							<td>
								<div :title="item.category">{{item.category|nullCheck}}</div>
							</td>
							<td>
								<div :title="item.uuid">{{item.uuid|nullCheck}}</div>
							</td>
							<td>
								<div :title="item.deviceModel">{{item.deviceModel|nullCheck}}</div>
							</td>
							<td>
								<div :title="item.assertName">{{item.assertName|nullCheck}}</div>
							</td>
							<td>
								<div :title="item.areaName">{{item.areaName|nullCheck|areaNameLength}}</div>
							</td>
							<td @mouseenter="tdMouseOverHandle($event,item)" @mouseleave="tdMouseOutHandle">
								<div>{{item.field|fieldCheck|nullCheck}}</div>
							</td>
							<td>
								<div :class="alarmColorComputed(item)">{{item.alarmLevelName|nullCheck}}</div>
							</td>
							<td>
								<div :class="onlineColorComputed(item)">{{item.quality|qualityCheck}}</div>
							</td>
							<td>
								<div>{{item.deviceSource|nullCheck}}</div>
							</td>
							<td>
								<div>{{item.gmtTime|filterGetDate}} {{item.gmtTime|filterGetTime}}</div>
							</td>
							<td>
								<div>
									<i class="iconfont icon-icon_list_gengduo detail-mask" @click="showMore(item.id)"></i>
									<ul class="edit-show-ul" v-show='moreAction==item.id'>
										<li @click="detailHandle(item.id)">
											<i class="iconfont icon-icon_daohang_gongdanguanli"></i>
											<span>详情</span>
										</li>
										<li @click="editHandle(item.id,item.quality)">
											<i class="iconfont icon-icon_list_edit"></i>
											<span>编辑</span>
										</li>
										<li :class="[item.category == notAllowCategory ? {btnNotAllow:false}: {btnNotAllow:true}]" :disabled="item.category != notAllowCategory" @click="noticeHandle(item.id,item.category,item.quality)">
											<i class="iconfont icon-icon_daohang_xitongguanli"></i>
											<span>告警设置</span>
										</li>
										<li @click="delectHandle(item.deviceId,item.quality)">
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
						<!--没有数据时提示语 -->
						<div slot="slotNoData" class="tableNoData" v-if="tdatas.length == 0">
							<div class="tableNoData-layer"></div>
							<div class="tableNoData-text">暂无数据</div>
						</div>
					</base-table>
					<div class="fixedLayer" @click="hideMore()" v-show='moreAction!==null'></div>
					<div class="popover" v-show="popoverShow" :style="{top:popoverTop,left:popoverLeft }">
						<div class="layer"></div>
						<div class="row1"><span class="span1">告警级别：<span :class="popoverTxtColorComputed(popover_alarmLevelName)">{{popover_alarmLevelName}}</span></span>
						</div>
						<div class="row2"><span class="span2">监测状态：<span :class="popoverTxtColorComputed(popover_alarmLevelName)">{{popover_currentState}}</span></span>
						</div>
						<div class="row3"><span class="span3">当前值：<span :class="popoverTxtColorComputed(popover_alarmLevelName)">{{popover_field}}</span></span>
						</div>
						<div class="row4"><span class="span4">处理指南：<span class="normal" style="line-height: 20px;">{{popover_dealIntroduct}}</span></span>
						</div>
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
	import BaseSelect from '../../components/base-select.vue'
	import BaseTable from '../../components/base-table.vue'
	import BasePagination from '../../components/base-pagination.vue'

	export default {
		name: "equipment",
		data() {
			return {
				areaSelectCompPlaceholder: "请选择监测地块",
				areaSelectCompItems: [],
				areaSearchInput: "",
				areaItem: "", //当前选中的地块对象
				tcols: [2, 2, 2, 4, 4, 3, 3, 2, 2, 2, 3, 4, 2],
				thead: [
					[{
						title: "序号",
					}, {
						title: "生产厂家",
					}, {
						title: "设备类型",
					}, {
						title: "设备序列号",
					}, {
						title: "设备型号",
					}, {
						title: "设备名称",
					}, {
						title: "监测地块",
					}, {
						title: "当前值",
					}, {
						title: "告警状态",
					}, {
						title: "设备状态",
					}, {
						title: "方式",
					}, {
						title: "最后同步时间",
					}, {
						title: "操作",
					}, ]
				],
				tdatas: [],
				popoverShow: false, // 当前值浮框是否显示
				popoverLeft: "0px", // 当前值浮框X轴坐标
				popoverTop: "0px", // 当前值浮框Y轴坐标
				popover_field: "", // 当前值浮框参数
				popover_alarmLevelName: "",
				popover_dealIntroduct: "",
				popover_currentState: "",
				total: 0, // 记录总条数
				pageSize: 10, // 每页显示条数
				currentPage: 1, // 当前的页数
				notAllowCategory: "传感器", // 规则设置，只有传感器可以设置告警
				query_areaID: "", // 外部传参，当本页面请求地址带有地块ID时，直接显示该地块数据
				moreAction: null //设备操作项
			}
		},
		components: {
			BaseSelect,
			BaseTable,
			BasePagination
		},
		filters: {
			fieldCheck: function(val) {
				let result = val;
				if(val) {
					result = parseFloat(val);
					result = result.toFixed(2);
				}
				return result;
			},
			qualityCheck: function(val) {
				let result = "--"
				if(val == 0) {
					result = "离线"
				} else if(val == 1) {
					result = "在线"
				} else if(val == 2) {
					result = "禁用"
				}
				return result;
			},
			nullCheck: function(val) {
				let result = "--";
				if(val) {
					result = val;
				}
				return result;
			},
			areaNameLength: function(value) {
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
			this.query_areaID = this.$route.query.id; //外部参数
			let param = {};
			param.pageNo = 1;
			param.pageSize = 100000;
			// 获取地块列表
			this.$store.dispatch("request_equipment_areasList", param).then((data) => {
				console.log("地块列表", data)
				this.areaSelectCompItems = data;
				// 保存地块列表
				this.$store.dispatch("save_equipment_areasList", data);
			}, (error) => {
				console.log(error);
			});
		},
		watch: {
			areaSelectCompItems: function(value) {
				let _this = this;
				let all = {};
				let list = value;
				if((list.length > 0 && list[0].id != "all") || (list.length == 0)) {
					all.id = "all";
					all.value = "所有监测地块";
					list.unshift(all);
				}

				// 当有入参指定地块，显示该地块，没有则显示全部地块
				let queryAreaItem = null;
				if(_this.query_areaID) {
					for(let i = 0; i < list.length; i++) {
						if(list[i].id == _this.query_areaID) {
							queryAreaItem = list[i];
							break;
						}
					}
				}
				if(queryAreaItem) {
					_this.$refs.areaSelectComp.setDefaultSelect(queryAreaItem.id, queryAreaItem.value);
				} else {
					_this.$refs.areaSelectComp.initDefaultSelect(_this.areaSelectCompItems[0].id, _this.areaSelectCompItems[0].value);
				}
			}
		},
		methods: {
			onlineColorComputed(value) {
				let result = {};
				let quality = value.quality;
				if(quality == 0) {
					result = {
						important: true
					}
				} else if(quality == "2") {
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
			popoverTxtColorComputed: function(value) {
				let result = {};
				let alarmName = value;
				if(alarmName == "重要告警") {
					result = {
						important: true
					}
				} else if(alarmName == "紧急告警") {
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
			alarmColorComputed: function(value) {
				let result = {};
				let alarmName = value.alarmLevelName;
				if(alarmName == "重要告警") {
					result = {
						important: true
					}
				} else if(alarmName == "紧急告警") {
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
			hideMore: function(id) {
				this.moreAction = null;
			},
			// 显示更多操作项
			showMore: function(id) {
				this.moreAction = id;
			},
			// 鼠标经过"当前值"显示浮框
			tdMouseOverHandle(e, target) {
				if(!target.field) {
					return;
				}
				let info = "-";
				this.popover_field = target.field ? target.field : info;
				this.popover_alarmLevelName = target.alarmLevelName ? target.alarmLevelName : info;
				let introduct = "";
				let value = target.dealIntroduct ? target.dealIntroduct : info;
				if(value.length > 27) {
					introduct = value.substring(0, 28) + "...";
				} else {
					introduct = value;
				}
				this.popover_dealIntroduct = introduct;
				this.popover_currentState = target.currentState ? target.currentState : info;
				this.popoverShow = true;
				this.popoverLeft = (e.clientX - e.offsetX) + "px";
				this.popoverTop = (e.clientY - e.offsetY + e.target.offsetHeight) + "px";
			},
			// 鼠标移开"当前值"解释框隐藏
			tdMouseOutHandle(e) {
				this.popoverShow = false;
			},
			// 查询操作
			searchFromInputHandle() {
				let _this = this;
				let areaItem = _this.areaItem;
				if(areaItem && areaItem != "") {
					let info = _this.areaSearchInput;
					let areaCode = areaItem.areaCode;
					let pageNo = "1";
					_this.getDevicesDatas(info, areaCode, pageNo);
				}
			},
			// 地块下拉列选择
			areaSelectCompCallBack(itemID) {
				//根据地块ID获取地块信息
				let _this = this;
				let areaItem = "";
				for(let i = 0; i < _this.areaSelectCompItems.length; i++) {
					if(_this.areaSelectCompItems[i].id == itemID) {
						areaItem = _this.areaSelectCompItems[i];
						break;
					}
				}
				//记录当前地块
				_this.areaItem = areaItem;
				//根据地块信息获取设备列表
				if(areaItem && areaItem != "") {
					let info = _this.areaSearchInput;
					let areaCode = areaItem.areaCode;
					let pageNo = "1";
					_this.getDevicesDatas(info, areaCode, pageNo);
				}
			},
			// 分页事件
			pagechange: function(currentPage) {
				let _this = this;
				let areaItem = _this.areaItem;
				if(areaItem && areaItem != "") {
					let info = _this.areaSearchInput;
					let areaCode = areaItem.areaCode;
					let pageNo = currentPage;
					_this.getDevicesDatas(info, areaCode, pageNo);
				}
			},
			// 新增操作
			addHandle(e) {
				this.$router.push({
					path: '/equipment/add'
				})
			},
			// 查看操作
			detailHandle(eid) {
				let equiID = eid;
				this.$router.push({
					path: '/equipment/detail',
					query: {
						id: equiID
					}
				})
			},
			// 编辑操作
			editHandle(eid, quality) {
				if(quality == "2") {
					alert("该设备处于禁用状态，无法操作！");
					return;
				}
				let equiID = eid;
				this.$router.push({
					path: '/equipment/edit',
					query: {
						id: equiID
					}
				})
			},
			// 告警操作
			noticeHandle(eid, category, quality) {
				if(quality == "2") {
					alert("该设备处于禁用状态，无法操作！");
					return;
				}
				let equiID = eid;
				if(category == this.notAllowCategory) {
					this.$router.push({
						path: '/alarm_setup',
						query: {
							id: equiID
						}
					});
				}
			},
			// 删除操作
			delectHandle($deviceId, quality) {
				if(quality == "2") {
					alert("该设备处于禁用状态，无法操作！");
					return;
				}
				let _this = this;
				this.$globalConfirm("提示", "您是否确定删除设备？", () => {
					let deviceData = {};
					deviceData.id = $deviceId;
					// 删除设备
					this.$store.dispatch("request_equipment_delect", deviceData).then((data) => {
						//记录当前地块
						let areaItem = _this.areaItem;
						//根据地块信息获取设备列表
						if(areaItem && areaItem != "") {
							let info = _this.areaSearchInput;
							let areaCode = areaItem.areaCode;
							let pageNo = "1";
							_this.getDevicesDatas(info, areaCode, pageNo);
						}
						// 删除视频通道
						let channelData = null;
						for(let i = 0; i < _this.tdatas.length; i++) {
							if(_this.tdatas[i].id == $deviceId) {
								if(_this.tdatas[i].category.indexOf("摄像头") >= 0) {
									channelData = _this.tdatas[i];
									break;
								}
							}
						}
						if(channelData) {
							let delectChannelData = {};
							delectChannelData.easyChannel = channelData.easyChannel;
							_this.$store.dispatch("request_equipment_nvrChannel_delect", delectChannelData).then((data) => {
								alert("删除成功！");
							}, (error) => {
								console.log(error);
							});
						}
					}, (error) => {
						console.log(error);
					});
				}, () => {
					console.log("取消");
				});
			},
			// 获取设备数据列表
			getDevicesDatas($searchPhase, $areaCode, $pageNo) {
				let _this = this;
				//根据地块信息获取设备列表
				let deviceItem = {};
				deviceItem.searchPhase = $searchPhase;
				if($areaCode) {
					deviceItem.areaCode = $areaCode;
				}
				deviceItem.pageNo = $pageNo;
				deviceItem.pageSize = 10;
				_this.$store.dispatch("request_equipment_deviceList", deviceItem).then((response) => {
					console.log("设备列表", response.data);
					if(response.data) {
						_this.tdatas = response.data;
					} else {
						_this.tdatas = [];
					}
					_this.total = response.total;
					_this.pageSize = response.pageSize;
					_this.currentPage = response.pageNo;
					_this.$store.dispatch("save_equipment_devicesList", _this.tdatas);
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
	
	.equipment-module {
		background-color: #F6F9FB;
	}
	
	.bgcolor {
		padding: 20px;
		background-color: #f6fafa;
	}
	
	.equipment-content {
		width: 100%;
		height: 100%;
		border: solid 1px #e3e8ea;
		background-color: white;
		position: relative;
		.equipment-select {
			display: flex;
			padding: 30px;
			.equipment-title {
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
			.content-select {
				margin-left: 40px;
				width: 200px;
				margin-top: -8px;
			}
			.content-input {
				margin-top: -8px;
				margin-left: 10px;
				padding-left: 10px;
				font-size: 14px;
				height: 36px;
				width: 188px;
				border: solid 1px #dcdfe6;
				border-radius: 2px;
			}
			.content-btn {
				font-size: 14px;
				height: 36px;
				width: 68px;
				text-align: center;
				line-height: 36px;
				cursor: pointer;
				border-radius: 2px;
			}
			.btn-search {
				position: relative;
				margin-top: -7px;
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
				position: absolute;
				right: 30px;
				top: 22px;
				border: solid 1px #41a259;
				background-color: #ffffff;
				.btn-search-txt {
					color: #41a259;
				}
				/*.btn-search-txt:hover {
					opacity: 0.6;
				}*/
			}
			/*.btn-add:hover {
				border: solid 1px rgba(65, 162, 89, .6);
			}*/
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
				width: 262px;
				height: 30px;
				padding: 10px;
				background: #fff;
				right: 0px;
				top: 2px;
				z-index: 9999;
				box-shadow: 0px 1px 16px #ccc;
				li {
					margin-top: -4px;
					float: left;
					width: 19.8%;
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