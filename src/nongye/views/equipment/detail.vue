<template>
	<div class="equipment-detail">
		<div class="bgcolor">
			<div class="equipment-content">
				<div class="content-head">
					<div class="page-title">设备详情</div>
					<div class="clean-btn" @click="backHandle">返回</div>
					<div :class="editBtnClass()" @click="editHandle()">编辑</div>
				</div>
				<div class="page-line"></div>
				<div class="content-data">
					<div class="data-info">
						<div class="info-head">
							<div class="info-icon"></div>
							<div class="info-title">基础信息</div>
						</div>
						<div class="content">
							<div class="content-left">
								<div class="inputItem">
									<span class="data-label">设备类型：</span>
									<input v-model="deciveItem.category" placeholder="-" readonly="readonly" class="disabled" />
								</div>
								<div class="inputItem">
									<span class="data-label">设备序列号：</span>
									<input v-model="deciveItem.uuid" placeholder="-" readonly="readonly" class="disabled" />
								</div>
								<div class="inputItem">
									<span class="data-label">设备型号：</span>
									<input v-model="deciveItem.deviceModel" placeholder="-" readonly="readonly" class="disabled" />
								</div>
								<div class="inputItem">
									<span class="data-label">设备名称：</span>
									<input v-model="deciveItem.assertName" placeholder="-" readonly="readonly" class="disabled" />
								</div>
								<div class="inputItem">
									<span class="data-label">生产厂家：</span>
									<input v-model="deciveItem.manufacturer" placeholder="-" readonly="readonly" class="disabled" />
								</div>
								<div class="inputItem">
									<span class="data-label">当前值：</span>
									<input v-model="deciveItem.field" placeholder="-" readonly="readonly" class="disabled" />
								</div>
							</div>
							<div class="content-right">
								<div class="inputItem">
									<span class="data-label">检测状态：</span>
									<input v-model="deciveCurrentState" placeholder="-" readonly="readonly" class="disabled" />
								</div>
								<div class="inputItem">
									<span class="data-label">告警情况：</span>
									<input v-model="deciveItem.alarmLevelName" placeholder="-" readonly="readonly" class="disabled" />
								</div>
								<div class="inputItem">
									<span class="data-label">连接状态：</span>
									<input v-model="deciveIQuality" placeholder="-" readonly="readonly" class="disabled" />
								</div>
								<div class="inputItem">
									<span class="data-label">最后同步时间：</span>
									<input v-model="gmtTime" placeholder="-" readonly="readonly" class="disabled" />
								</div>
								<div class="inputItem">
									<span class="data-label">设备监测时长：</span>
									<input v-model="deciveItem.continuTime" placeholder="-" readonly="readonly" class="disabled" />
								</div>
								<div class="inputItem">
									<span class="data-label">处理指南：</span>
									<input v-model="deciveItem.dealIntroduct" placeholder="-" readonly="readonly" class="disabled" />
								</div>
							</div>
						</div>
					</div>
					<div class="data-param">
						<div v-if="netConfiShow">
							<div class="info-head">
								<div class="info-icon"></div>
								<div class="info-title">网络配置</div>
							</div>
							<div class="content1">
								<div class="content-left">
									<div class="inputItem">
										<span class="data-label">IP地址：</span>
										<input v-model="ip" placeholder="-" readonly="readonly" class="disabled" />
									</div>
									<div class="inputItem">
										<span class="data-label">用户名：</span>
										<input v-model="username" placeholder="-" readonly="readonly" class="disabled" />
									</div>
									<div class="inputItem">
										<span class="data-label">登录端口号：</span>
										<input v-model="deciveItem.portLogin" placeholder="-" readonly="readonly" class="disabled" />
									</div>
									<div class="inputItem">
										<span class="data-label">视频端口号：</span>
										<input v-model="deciveItem.portVideo" placeholder="-" readonly="readonly" class="disabled" />
									</div>
								</div>
								<div class="content-right">
									<div class="inputItem">
										<span class="data-label">密码：</span>
										<input v-model="password" placeholder="-" readonly="readonly" class="disabled" />
									</div>
									<div class="inputItem">
										<span class="data-label">链接路径：</span>
										<input v-model="sourceUrl" placeholder="-" readonly="readonly" class="disabled" />
									</div>
									<!--<div class="inputItem">
										<span class="data-label">链接路径：</span>
										<input v-model="sourceUrl" placeholder="链接路径" />
									</div>-->
									<div class="inputItem">
										<span class="data-label">控制端口号：</span>
										<input v-model="deciveItem.portControl" placeholder="-" readonly="readonly" class="disabled" />
									</div>
									<div class="inputItem">
										<span class="data-label">通道：</span>
										<input v-model="deciveItem.nvrChannel" placeholder="-" readonly="readonly" class="disabled" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="data-address">
						<div class="info-head">
							<div class="info-icon"></div>
							<div class="info-title">设备位置</div>
						</div>
						<div class="content">
							<div class="content-left">
								<div class="selectItem">
									<div class="inputItem">
										<span class="data-label">关联地块：</span>
										<input v-model="deciveItem.areaName" placeholder="请选择关联地块" readonly="readonly" class="disabled" />
									</div>
								</div>
								<div class="inputItem">
									<span class="data-label">所在经度：</span>
									<input v-model="maplng" placeholder="-" readonly="readonly" class="disabled" />
								</div>
							</div>
							<div class="content-right">
								<div class="inputItem lat">
									<span class="data-label">所在纬度：</span>
									<input v-model="maplat" placeholder="-" readonly="readonly" class="disabled" />
								</div>
							</div>
						</div>
					</div>
					<div class="map">
						<gaode-map ref="amap" :mapWidth="mapWidth" :mapHeight="mapHeight"></gaode-map>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BaseSelect from '../../components/base-select.vue'
	import GaodeMap from '../../components/gaode-map.vue'

	export default {
		name: "equipmentDetail",
		data() {
			return {
				deciveItem: {},
				deciveCurrentState: "-",
				netConfiShow: true,
				gmtTime: "",
				ip: "",
				username: "",
				password: "",
				sourceUrl: "",
				deciveIQuality: "-",
				mapWidth: "100%",
				mapHeight: "600px",
				maplng: "",
				maplat: ""
			}
		},
		components: {
			BaseSelect,
			GaodeMap
		},
		mounted() {
			let _this = this;
			scrollTo(0, 0);
			// 通过传入设备ID获取设备详细信息
			let deviceID = this.$route.query.id;
			this.$store.dispatch("get_equipment_devicesList").then((response) => {
				let deviceList = response;
				for(let i = 0; i < deviceList.length; i++) {
					if(deviceList[i].id == deviceID) {
						_this.deciveItem = deviceList[i];
						console.log(_this.deciveItem);
						_this.deciveIQuality = _this.qualityCheck(_this.deciveItem.quality);
						_this.deciveCurrentState = _this.deciveItem.currentState;
						_this.gmtTime = _this.filterGmtTime(_this.deciveItem.gmtTime);
						_this.ip = deviceList[i].ip;
						_this.username = deviceList[i].userName;
						_this.password = deviceList[i].passWord;
						_this.sourceUrl = deviceList[i].sourceUrl;

						if(_this.deciveItem.quality == 0) {
							_this.deciveCurrentState = "-";
						}

						//						if(_this.deciveItem.paramValue) {
						//							let netData = _this.deciveItem.paramValue.toString();
						//							netData = netData.replace(/\ +/g, ""); //去掉空格
						//							netData = netData.replace(/[\r\n]/g, ""); //去掉回车换行        
						//							_this.ip = (JSON.parse(netData)).ip;
						//							_this.username = (JSON.parse(netData)).username;
						//							_this.password = (JSON.parse(netData)).password;
						//							_this.sourceUrl = (JSON.parse(netData)).sourceUrl;
						//						}
						break;
					}
				}

				//设置地图经纬度
				_this.$store.dispatch("get_equipment_areasList").then((response) => {
					let areasList = response;
					for(let i = 0; i < areasList.length; i++) {
						if(_this.deciveItem.areaCode == areasList[i].areaCode) {
							let lng = areasList[i].x;
							let lat = areasList[i].y;
							_this.$refs.amap.mapFromLngLat(lng, lat);
							let marker = {
								id: "marker",
								lng: lng,
								lat: lat,
								visible: true,
								draggable: false
							};
							console.log("marker!!!", marker);
							_this.$refs.amap.newMarker(marker);
							_this.$refs.amap.setMapZoom(11);
							_this.maplng = lng;
							_this.maplat = lat;
							break;
						}
					}
				});
			});
		},
		filters: {
			checkNull: function(value) {
				let data = "";
				if(value) {
					data = value;
				} else {
					data = "-"
				}
				return data;
			}
		},
		methods: {
			editBtnClass() {
				let _this = this;
				let result = {};
				if(_this.deciveIQuality == "禁用") {
					result = {
						editBtnDisable: true
					}
				} else {
					result = {
						editBtn: true
					}
				}
				return result;
			},
			filterGmtTime(time) {
				let result = "";
				if(time) {
					let dateAndTime = time.split(".")[0];
					let dateValue = dateAndTime.split("T")[0] == undefined ? "" : dateAndTime.split("T")[0];
					let timeValue = dateAndTime.split("T")[1] == undefined ? "" : dateAndTime.split("T")[1];
					result = dateValue + " " + timeValue;
				} else {
					result = "-";
				}
				return result;
			},
			editHandle() {
				if(this.deciveIQuality == "禁用") {
					return;
				}
				let equiID = this.deciveItem.id;
				this.$router.push({
					path: '/equipment/edit',
					query: {
						id: equiID
					}
				})
			},
			// 取消操作
			backHandle() {
				this.$router.push({
					path: '/equipment',
					query: {}
				})
			},
			qualityCheck(val) {
				let result = "--"
				if(val == 0) {
					result = "离线"
				} else if(val == 1) {
					result = "在线"
				} else if(val == 2) {
					result = "禁用"
				}
				return result;
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
	
	input[type="number"] {}
	
	.disabled {
		background-color: #F6F9FB;
		border: 1px solid #E3E8EA;
		border-radius: 2px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	
	.equipment-detail {
		background-color: #F6F7F9;
	}
	
	.bgcolor {
		padding: 20px;
		background-color: #f6fafa;
	}
	
	.content-head {
		display: flex;
		padding: 30px;
		.page-title {
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
		.clean-btn {
			font-size: 14px;
			height: 34px;
			width: 66px;
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
		.editBtn {
			font-size: 14px;
			height: 34px;
			width: 66px;
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
		.editBtnDisable {
			font-size: 14px;
			height: 36px;
			width: 68px;
			border: solid 1px #dcdfe6;
			color: #B7B7B7;
			text-align: center;
			line-height: 38px;
			cursor: pointer;
			background-color: #E5E5E5;
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
	
	.equipment-content {
		width: 100%;
		height: 100%;
		border: solid 1px #e3e8ea;
		background-color: white;
		.info-title {
			color: #666666;
			font-size: 16px;
		}
		.content-data {
			flex: 1;
			width: 100%;
			height: 100%;
			margin-left: 10px;
			margin-right: 30px;
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
			.data-param {
				margin-top: 34px;
				.content1,
				.content2 {
					margin-left: -8px;
					width: 100%;
					display: flex;
					margin-top: 20px;
					.content-left {
						width: 50%;
						margin-left: -13px;
					}
					.content-right {
						width: 50%;
						margin-left: 0px;
						padding-right: 20px;
					}
				}
				.title2 {
					margin-top: 60px;
				}
			}
			.data-address {
				margin-top: 34px;
				.content {
					margin-left: -8px;
					width: 100%;
					margin-top: 20px;
					display: flex;
					.content-left {
						width: 50%;
						margin-left: -13px;
					}
					.content-right {
						width: 50%;
						margin-left: 0px;
						padding-right: 20px;
						.lat {
							margin-top: 72px;
						}
					}
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
			}
			.textItem {
				margin-top: 40px;
				margin-left: 24px;
				font-size: 14px;
				.textItem-row {
					display: flex;
					position: relative;
					margin-top: 20px;
					.textItem-col {
						font-size: 14px;
						width: 240px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						margin-left: 20px;
					}
					.textItem-col1 {
						margin-left: 0px;
					}
				}
				.textItem-area {
					font-size: 14px;
					margin-top: 20px;
					width: 690px;
					height: 84px;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
			.map {
				position: relative;
				padding: 30px;
				margin-right: 10px;
				.mapinputbox {
					position: absolute;
					top: 60px;
					left: 80px;
					background: #fff;
					padding-left: 15px;
					height: 36px;
					width: 300px;
				}
				.mapinput {
					float: left;
					box-sizing: border-box;
					height: 34px;
					width: 100%;
					padding-right: 35px;
					border: none;
				}
				.seach-iconfont {
					cursor: pointer;
					color: #999999;
					font-size: 17px;
					position: absolute;
					height 36px;
					width: 50px;
					line-height: 36px;
					text-align: center;
					right: 0px;
				}
			}
			.content-back {
				width: 100%;
				.content-back-btn {
					font-size: 18px;
					margin-left: 280px;
					margin-top: 250px;
					margin-bottom: 20px;
					height: 40px;
					width: 80px;
					border: solid 1px #dcdfe6;
					border-radius: 5px;
					color: #fff;
					text-align: center;
					line-height: 38px;
					background-color: #337ab7;
					cursor: pointer;
				}
			}
		}
	}
</style>