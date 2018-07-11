<template>
	<div class="equipment-add">
		<div class="bgcolor">
			<div class="equipment-content">
				<div class="content-head">
					<div class="page-title">设备新增</div>
					<div class="clean-btn" @click="backHandle">取消</div>
					<div class="edit-btn" @click="saveHandle">保存</div>
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
								<div class="selectItem">
									<span class="data-label"><span class="must">*</span>设备类型：</span>
									<div class="select">
										<base-select :opts="deviceTypeList" :placeholderStr="deviceTypePlaceholderStr" @disp-selectCallBack="deviceTypeSelectCallBack"></base-select>
									</div>
								</div>
								<div class="inputItem">
									<span class="data-label"><span class="must">*</span>设备序列号：</span>
									<input v-model="deviceSerial" placeholder="设备序列号" :readonly="serialDisabled" :class="[serialDisabled == true ? {disabled:true}: {disabled:false}]" />
								</div>
								<div class="inputItem">
									<span class="data-label">设备型号：</span>
									<input v-model="deviceModel" placeholder="依据类型自动获取" readonly="readonly" class="disabled" />
								</div>
							</div>
							<div class="content-right">
								<div class="inputItem">
									<span class="data-label"><span class="must">*</span>设备名称：</span>
									<input v-model="deviceAssertName" placeholder="设备名称" />
								</div>
								<div class="inputItem">
									<span class="data-label">生产厂家：</span>
									<input v-model="deviceManufacturer" placeholder="依据类型自动获取" readonly="readonly" class="disabled" />
								</div>
							</div>
						</div>
					</div>
					<div class="data-param">
						<div>
							<div class="info-head">
								<div class="info-icon"></div>
								<div class="info-title">网络配置</div>
							</div>
							<div class="content1">
								<div class="content-left">
									<div class="inputItem">
										<span class="data-label"><span class="must">*</span>IP地址：</span>
										<input v-model="ip" placeholder="IP地址" :readonly="confiDisable" :class="[confiDisable == true ? {disabled:true}: {disabled:false}]" />
									</div>
									<div class="inputItem">
										<span class="data-label"><span class="must">*</span>用户名：</span>
										<input v-model="username" placeholder="用户名" :readonly="confiDisable" :class="[confiDisable == true ? {disabled:true}: {disabled:false}]" />
									</div>
									<div class="inputItem">
										<span class="data-label"><span class="must">*</span>登录端口号：</span>
										<input v-model="portLogin" placeholder="登录端口号" :readonly="confiDisable" :class="[confiDisable == true ? {disabled:true}: {disabled:false}]" />
									</div>
									<div class="inputItem">
										<span class="data-label"><span class="must">*</span>视频端口号：</span>
										<input v-model="portVideo" placeholder="视频端口号" :readonly="confiDisable" :class="[confiDisable == true ? {disabled:true}: {disabled:false}]" />
									</div>
								</div>
								<div class="content-right">
									<div class="inputItem">
										<span class="data-label"><span class="must">*</span>密码：</span>
										<input v-model="password" placeholder="密码" :readonly="confiDisable" :class="[confiDisable == true ? {disabled:true}: {disabled:false}]" />
									</div>
									<div class="inputItem">
										<span class="data-label"><span class="must">*</span>链接路径：</span>
										<input v-model="getSourceUrl" placeholder="链接路径" readonly="readonly" class="disabled" />
									</div>
									<div class="inputItem">
										<span class="data-label"><span class="must">*</span>控制端口号：</span>
										<input v-model="portControl" placeholder="控制端口号" :readonly="confiDisable" :class="[confiDisable == true ? {disabled:true}: {disabled:false}]" />
									</div>
									<div class="inputItem">
										<span class="data-label"><span class="must">*</span>通道：</span>
										<input v-model="nvrChannel" placeholder="通道" :readonly="confiDisable" :class="[confiDisable == true ? {disabled:true}: {disabled:false}]" />
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
									<div class="selectItem">
										<span class="data-label"><span class="must">*</span>关联地块：</span>
										<div class="select">
											<base-select ref="areaSelect" :opts="areaOpts" :placeholderStr="areaPlaceholderStr" @disp-selectCallBack="areaSelectCallBack"></base-select>
										</div>
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
						<div class="mapinputbox">
							<input v-model="inputname" placeholder="请输入城市名" class="mapinput">
							<i @click="searchCity(inputname)" class="seach-iconfont iconfont icon-icon_shipinjiankong_suofang"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BaseSelect from '../../components/base-select.vue'
	import GaodeMap from '../../components/gaode-map.vue'

	let markerList = [];

	export default {
		name: "equipmentDetail",
		data() {
			return {
				areaPlaceholderStr: "请选择监测地块",
				areaOpts: [],
				areaItem: null,
				confiDisable: true,
				deviceTypeList: [],
				deviceTypePlaceholderStr: "请选择设备类型",
				deviceTypeItem: null,
				deviceManufacturer: "",
				deviceModel: "",
				deviceId: "",
				deviceAssertName: "",
				deviceSerial: "",
				serialDisabled: false,
				ip: "",
				username: "",
				password: "",
				portLogin: "",
				portControl: "",
				portVideo: "",
				nvrChannel: "",
				sourceUrl: "",
				mapWidth: "100%",
				mapHeight: "600px",
				maplng: "",
				maplat: "",
				inputname: "",
				deviceName: ""
			}
		},
		components: {
			BaseSelect,
			GaodeMap
		},
		computed: {
			getSourceUrl: function() {
				let result = "rtsp://" + this.username + ":" + this.password + "@" + this.ip + ":" + this.portVideo + "/Streaming/Channels/" + this.nvrChannel + "01";
				this.sourceUrl = result;
				if(this.confiDisable == true) {
					result = "";
					this.sourceUrl = "";
				}
				return result;
			}
		},
		mounted() {
			let _this = this;
			scrollTo(0, 0);
			this.$store.dispatch("get_equipment_areasList").then((response) => {
				this.areaOpts = response;
				console.log(response);
				for(let i = 0; i < response.length; i++) {
					let marker = {};
					marker.id = response[i].id;
					marker.lng = response[i].x; // 经度
					marker.lat = response[i].y; // 纬度
					marker.visible = true; // 显示隐藏
					marker.draggable = false; //是否可拖动
					this.$refs.amap.newMarker(marker);
					markerList.push(marker);
					this.$refs.amap.addMarkerListenEvent(marker.id, "click", function(e) {
						let lng = e.lnglat.lng;
						let lat = e.lnglat.lat;
						let id = e.target.id;
						for(let m = 0; m < markerList.length; m++) {
							if(markerList[m].id == id) {
								lng = markerList[m].lng;
								lat = markerList[m].lat;
								break;
							}
						}

						_this.hideAllMarker(markerList);
						_this.$refs.amap.showMarker(id);
						_this.$refs.amap.mapFromLngLat(lng, lat);
						_this.$refs.amap.setMapZoom(8);

						for(let k = 0; i < _this.areaOpts.length; k++) {
							if(_this.areaOpts[k].id == id) {
								_this.areaItem = _this.areaOpts[k];
								break;
							}
						}

						_this.$refs.areaSelect.setDefaultSelect(_this.areaItem.areaCode, _this.areaItem.idName);
						_this.maplng = lng;
						_this.maplat = lat;
					});
				}
			});

			let reqDeviceTypeQuery = {};
			reqDeviceTypeQuery.deviceModel = "";
			reqDeviceTypeQuery.pageSize = 1000;
			reqDeviceTypeQuery.pageNo = 1
			this.$store.dispatch("request_equipment_deviceType", reqDeviceTypeQuery).then((response) => {
				this.deviceTypeList = response;
				console.log(response);
			});
		},
		methods: {
			inputNum(evt) {
				//火狐使用evt.which获取键盘按键值，IE使用window.event.keyCode获取键盘按键值
				var ev = evt.which ? evt.which : window.event.keyCode;
				console.log(ev);
				if(ev >= 48 && ev <= 57) {
					return true;
				} else {
					return false;
				}
			},
			hideAllMarker(list) {
				let _this = this;
				for(let i = 0; i < list.length; i++) {
					_this.$refs.amap.hideMarker(list[i].id);
				}
			},
			searchCity(city) {
				let _this = this;
				_this.$refs.amap.placeSerachPOI(city, function() {
					_this.$refs.amap.setMapZoom(10);
				});
			},
			filterString(str) {
				if(Object.prototype.toString.call(str) == '[object String]') {
					str = str.replace(/\ +/g, ""); //去掉空格
					str = str.replace(/[\r\n]/g, ""); //去掉回车换行  
				}
				return str;
			},
			saveHandle() {
				let _this = this;
				let submitBo = _this.checkSubmit();
				if(!submitBo) {
					return;
				}
				let netData = {};
				netData.name = _this.deviceAssertName;
				netData.ip = _this.ip;
				netData.userName = _this.username;
				netData.passWord = _this.password;
				netData.sourceUrl = _this.sourceUrl;
				netData.nvrChannel = parseInt(_this.nvrChannel);
				netData.portVideo = parseInt(_this.portVideo);
				netData.portControl = parseInt(_this.portControl);
				netData.portLogin = parseInt(_this.portLogin);
				netData.easyChannel = "";
				_this.addDevice(netData);
				//				if(_this.deviceName.indexOf("摄像头") >= 0) {
				//					_this.$store.dispatch("request_equipment_nvrChannel", netData).then((response) => {
				//						_this.addDevice(response);
				//					}, (error) => {
				//						alert(error.toString());
				//					});
				//				} else {
				//					_this.addDevice(netData);
				//				}
			},
			addDevice(netData) {
				let _this = this;
				let deviceData = {};
				deviceData.nodeId = _this.deviceTypeItem.nodeId; //2
				deviceData.deviceType = _this.deviceTypeItem.typeID; //3
				deviceData.areaCode = _this.areaItem.areaCode;
				deviceData.areaName = _this.areaItem.idName;
				deviceData.assertName = _this.deviceAssertName; //设备名称
				deviceData.serial = _this.deviceSerial;
				deviceData.model = _this.deviceTypeItem.deviceModel;
				deviceData.manual = _this.deviceTypeItem.manufacturer;
				deviceData.portLogin = _this.portLogin;
				deviceData.portControl = _this.portControl;
				deviceData.portVideo = _this.portVideo; //视频端口
				deviceData.nvrChannel = _this.nvrChannel;
				deviceData.easyChannel = netData.easyChannel;
				deviceData.paramValue = JSON.stringify(netData);
				console.log("noNvr:",deviceData);
				this.$store.dispatch("request_equipment_add", deviceData).then((response) => {
					this.$router.push({
						path: '/equipment',
						query: {}
					})
				}, (error) => {
					//					if(deviceData.easyChannel) {
					//						let delectChannelData = {};
					//						delectChannelData.easyChannel = deviceData.easyChannel;
					//						this.$store.dispatch("request_equipment_nvrChannel_delect", delectChannelData).then((data) => {}, (error) => {
					//							console.log(error);
					//						});
					//					}
					alert(error.toString());
				});
			},
			checkSubmit() {
				let _this = this;
				if(!_this.deviceTypeItem) {
					alert("请选择设备类型");
					return false;
				}

				if(_this.filterString(_this.deviceAssertName) == "") {
					alert("请输入设备名称");
					return false;
				} else {
					if(_this.deviceAssertName.length > 32) {
						alert("设备名称字数不能超过32个！");
						return false;
					}
				}

				if(_this.filterString(_this.deviceSerial) == "") {
					alert("请填写序列号");
					return false;
				}

				if(_this.confiDisable == false) {
					if(_this.filterString(_this.ip) == "") {
						alert("请输入IP");
						return false;
					}

					if(_this.filterString(_this.username) == "") {
						alert("请输入用户名");
						return false;
					}

					if(_this.filterString(_this.password) == "") {
						alert("请输入密码");
						return false;
					}

					if(_this.filterString(_this.portLogin) == "") {
						alert("请输入登录端口号");
						return false;
					} else {
						if(_this.portLogin < 0 || _this.portLogin > 65536) {
							alert("登录端口号范围值为  0 ~ 65536");
							return false;
						}
					}

					if(_this.filterString(_this.portControl) == "") {
						alert("请输入控制端口号");
						return false;
					} else {
						if(_this.portControl < 0 || _this.portControl > 65536) {
							alert("控制端口号范围值为  0 ~ 65536");
							return false;
						}
					}

					if(_this.filterString(_this.portVideo) == "") {
						alert("请输入视频端口号");
						return false;
					} else {
						if(_this.portVideo < 0 || _this.portVideo > 65536) {
							alert("视频端口号范围值为  0 ~ 65536");
							return false;
						}
					}

					if(_this.filterString(_this.nvrChannel) == "") {
						alert("请输入通道");
						return false;
					} else {
						if(_this.nvrChannel < 0 || _this.nvrChannel > 4) {
							alert("通道范围值为  1 ~ 4");
							return false;
						}
					}
				}

				if(!_this.areaItem) {
					alert("请选择监测地块");
					return;
				}

				return true;
			},
			backHandle() {
				this.$router.push({
					path: '/equipment',
					query: {}
				})
			},
			areaSelectCallBack(itemID) {
				let _this = this;
				for(let i = 0; i < _this.areaOpts.length; i++) {
					if(_this.areaOpts[i].id == itemID) {
						_this.areaItem = _this.areaOpts[i];
						break;
					}
				}

				_this.hideAllMarker(markerList);

				// 定位地图marker点
				let lng = _this.areaItem.x;
				let lat = _this.areaItem.y;
				let id = _this.areaItem.id;
				_this.$refs.amap.showMarker(id);
				_this.$refs.amap.mapFromLngLat(lng, lat);
				_this.$refs.amap.setMapZoom(8);

				_this.maplng = lng;
				_this.maplat = lat;
			},
			deviceTypeSelectCallBack(itemID) {
				let _this = this;
				let curType = null;
				for(let i = 0; i < _this.deviceTypeList.length; i++) {
					if(_this.deviceTypeList[i].id == itemID) {
						curType = _this.deviceTypeList[i];
						break;
					}
				}

				if(curType) {
					let typeID = curType.id;
					let nodeId = curType.nodeId;
					let name = curType.name;
					let query = {};
					query.id = nodeId;
					this.$store.dispatch("request_equipment_deviceNodeList", query).then((response) => {
						let deviceDetail = response;
						_this.deviceManufacturer = deviceDetail.manufacturer; // 生产厂家
						_this.deviceModel = deviceDetail.deviceModel; // 设备型号
						_this.deviceTypeItem = deviceDetail;
						_this.deviceTypeItem.nodeId = nodeId;
						_this.deviceTypeItem.typeID = typeID;
						//如果名称包含“主机”两个字，则开放序列号输入
						let name = deviceDetail.name;
						_this.deviceName = deviceDetail.name;
						if(name.indexOf("传感器") >= 0) { //自己和摄像头
							_this.serialDisabled = true;
						} else {
							_this.serialDisabled = false;
						}

						if(name.indexOf("摄像头") >= 0) {
							_this.confiDisable = false;
						} else {
							_this.confiDisable = true;
						}
					});
				}
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
	
	.must {
		color: red;
	}
	
	.equipment-add {
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
		.edit-btn {
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
				.data-label {
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
				.data-label {
					display: block;
					width: 110px;
					line-height: 42px;
				}
				input {
					border-radius: 2px;
					flex: 1;
					width: 100%;
					position: relative;
					font-size: 16px;
					padding-left: 10px;
					height: 38px;
					border: solid 1px #dcdfe6;
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