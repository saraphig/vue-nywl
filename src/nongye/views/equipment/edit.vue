<template>
	<div class="equipment-edit">
		<div class="bgcolor">
			<div class="equipment-content">
				<div class="content-head">
					<div class="page-title">设备编辑</div>
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
							</div>
							<div class="content-right">
								<div class="inputItem">
									<span class="data-label">设备名称：</span>
									<input v-model="assertName" placeholder="设备名称" />
								</div>
								<div class="inputItem">
									<span class="data-label">生产厂家：</span>
									<input v-model="deciveItem.manufacturer" placeholder="-" readonly="readonly" class="disabled" />
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
										<input v-model="ip" placeholder="IP地址" readonly="readonly" class="disabled" />
									</div>
									<div class="inputItem">
										<span class="data-label">用户名：</span>
										<input v-model="username" placeholder="用户名" readonly="readonly" class="disabled" />
									</div>
									<div class="inputItem">
										<span class="data-label">登录端口号：</span>
										<!--type="number" @keyup="inputNum($event)"-->
										<input v-model="portLogin" placeholder="登录端口号" readonly="readonly" class="disabled" />
									</div>
									<div class="inputItem">
										<span class="data-label">视频端口号：</span>
										<input v-model="portVideo" placeholder="视频端口号" readonly="readonly" class="disabled" />
									</div>
								</div>
								<div class="content-right">
									<div class="inputItem">
										<span class="data-label">密码：</span>
										<input v-model="password" placeholder="密码" readonly="readonly" class="disabled" />
									</div>
									<div class="inputItem">
										<span class="data-label">链接路径：</span>
										<input v-model="getSourceUrl" placeholder="链接路径" readonly="readonly" class="disabled" />
									</div>
									<div class="inputItem">
										<span class="data-label">控制端口号：</span>
										<input v-model="portControl" placeholder="控制端口号" readonly="readonly" class="disabled" />
									</div>
									<div class="inputItem">
										<span class="data-label">通道：</span>
										<input v-model="nvrChannel" placeholder="通道" readonly="readonly" class="disabled" />
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
										<div class="select">
											<base-select ref="areaSelect" :opts="areaOpts" :placeholderStr="areaPlaceholderStr" @disp-selectCallBack="areaSelectCallBack"></base-select>
										</div>
									</div>
								</div>
								<div class="inputItem">
									<span class="data-label">所在经度：</span>
									<input v-model="maplng" placeholder="-" disabled="disabled" />
								</div>
							</div>
							<div class="content-right">
								<div class="inputItem lat">
									<span class="data-label">所在纬度：</span>
									<input v-model="maplat" placeholder="-" disabled="disabled" />
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

	export default {
		name: "equipmentDetail",
		data() {
			return {
				cityPlaceholderStr: "请选择机构",
				cityDefault: "1",
				cityOpts: [{
					id: '1',
					value: '金诚集团'
				}],
				areaPlaceholderStr: "请选择监测地块",
				areaOpts: [],
				areaItem: "",
				deciveItem: "",
				netConfiShow: true,
				ip: "",
				username: "",
				password: "",
				portLogin: "",
				portControl: "",
				portVideo: "",
				nvrChannel: "",
				easyChannel: "",
				sourceUrl: "",
				assertName: "",
				mapWidth: "100%",
				mapHeight: "600px",
				maplng: "",
				maplat: "",
				inputname: "",
				confiDisable: "",
				offline: ""
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
			let deviceID = _this.$route.query.id;
			_this.$store.dispatch("get_equipment_devicesList").then((response) => {
				let deviceList = response;
				for(let i = 0; i < deviceList.length; i++) {
					if(deviceList[i].id == deviceID) {
						_this.deciveItem = deviceList[i];
						_this.assertName = deviceList[i].assertName;
						_this.ip = deviceList[i].ip;
						_this.username = deviceList[i].userName;
						_this.password = deviceList[i].passWord;
						_this.sourceUrl = deviceList[i].sourceUrl;
						_this.nvrChannel = deviceList[i].nvrChannel;
						_this.portVideo = deviceList[i].portVideo;
						_this.portControl = deviceList[i].portControl;
						_this.portLogin = deviceList[i].portLogin;
						_this.easyChannel = deviceList[i].easyChannel;
						_this.offline = deviceList[i].offline;
						let name = _this.deciveItem.category.toString();
						if(name.indexOf("摄像头") >= 0) {
							_this.confiDisable = false;
						} else {
							_this.confiDisable = true;
						}
						break;
						//						if(_this.deciveItem.paramValue) {
						//							let netData = _this.deciveItem.paramValue.toString();
						//							netData = netData.replace(/\ +/g, ""); //去掉空格
						//							netData = netData.replace(/[\r\n]/g, ""); //去掉回车换行        
						//							_this.ip = (JSON.parse(netData)).ip;
						//							_this.username = (JSON.parse(netData)).username;
						//							_this.password = (JSON.parse(netData)).password;
						//							_this.sourceUrl = (JSON.parse(netData)).sourceUrl;
						//						}
					}
				}

				_this.$store.dispatch("get_equipment_areasList").then((response) => {
					_this.areaOpts = response;
					let areaList = response;
					for(let i = 0; i < areaList.length; i++) {
						if(areaList[i].areaCode == _this.deciveItem.areaCode) {
							_this.areaItem = areaList[i];
							break;
						}
					}

					if(_this.areaItem != "" && _this.areaOpts.length > 0) {
						// 设置默认地块
						_this.$refs.areaSelect.setDefaultSelect(_this.deciveItem.areaCode, _this.deciveItem.areaName);
						// 定位地图marker点
						let lng = _this.areaItem.x;
						let lat = _this.areaItem.y;
						_this.$refs.amap.mapFromLngLat(lng, lat);
						_this.$refs.amap.removeMarker("marker");
						_this.$refs.amap.newMarker({
							id: "marker",
							lng: lng,
							lat: lat,
							visible: true,
							draggable: false
						});
						_this.$refs.amap.setMapZoom(8);
						_this.maplng = lng;
						_this.maplat = lat;
					}
				});
			});
		},
		methods: {
			searchCity(city) {
				let _this = this;
				_this.$refs.amap.placeSerachPOI(city, function() {
					_this.$refs.amap.setMapZoom(8);
				});
			},
			checkSubmit() {
				let _this = this;
				if(_this.filterString(_this.assertName) == "") {
					alert("请输入设备名称");
					return false;
				} else {
					if(_this.assertName.length > 32) {
						alert("设备名称字数不能超过32个！");
						return false;
					}
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
			saveHandle() {
				let _this = this;
				let submitBo = _this.checkSubmit();
				if(!submitBo) {
					return;
				}
				let netData = {};
				netData.name = _this.assertName;
				netData.ip = _this.ip;
				netData.userName = _this.username;
				netData.passWord = _this.password;
				netData.sourceUrl = _this.sourceUrl;
				netData.nvrChannel = parseInt(_this.nvrChannel);
				netData.portVideo = parseInt(_this.portVideo);
				netData.portControl = parseInt(_this.portControl);
				netData.portLogin = parseInt(_this.portLogin);
				netData.easyChannel = parseInt(_this.easyChannel);
				if(_this.deciveItem.category.indexOf("摄像头") >= 0) {
					_this.$store.dispatch("request_equipment_nvrChannel", netData).then((response) => {
						console.log(response);
						_this.updateDevice(response);
					}, (error) => {
						alert(error.toString());
					});
				} else {
					_this.updateDevice(netData);
				}
			},
			updateDevice(netData) {
				let _this = this;
				let editData = {}
				editData.id = _this.deciveItem.deviceId;
				editData.areaName = _this.areaItem.idName;
				editData.areaCode = _this.areaItem.areaCode;
				editData.assertName = _this.assertName;
				editData.portLogin = _this.portLogin;
				editData.portControl = _this.portControl;
				editData.portVideo = _this.portVideo; //视频端口
				editData.nvrChannel = _this.nvrChannel;
				editData.deviceParam = JSON.stringify(netData);
				editData.easyChannel = netData.easyChannel;
				editData.offline = parseInt(_this.offline);
				this.$store.dispatch("request_equipment_edit", editData).then((response) => {
					this.$router.push({
						path: '/equipment',
						query: {}
					})
				}, (error) => {
					console.log(error);
				});
			},
			backHandle() {
				this.$router.push({
					path: '/equipment',
					query: {}
				})
			},
			filterString(str) {
				if(Object.prototype.toString.call(str) == '[object String]') {
					str = str.replace(/\ +/g, ""); //去掉空格
					str = str.replace(/[\r\n]/g, ""); //去掉回车换行  
				}
				return str;
			},
			areaSelectCallBack(itemID) {
				let _this = this;
				let areaList = _this.areaOpts;
				for(let i = 0; i < areaList.length; i++) {
					if(areaList[i].areaCode == itemID) {
						_this.areaItem = areaList[i];
						break;
					}
				}

				// 定位地图marker点
				let lng = _this.areaItem.x;
				let lat = _this.areaItem.y;
				_this.$refs.amap.mapFromLngLat(lng, lat);
				_this.$refs.amap.removeMarker("marker");
				_this.$refs.amap.newMarker({
					id: "marker",
					lng: lng,
					lat: lat,
					visible: true,
					draggable: false
				});
				_this.$refs.amap.setMapZoom(8);
				_this.maplng = lng;
				_this.maplat = lat;
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
	
	.equipment-edit {
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
			height: 36px;
			width: 68px;
			border: solid 1px #41a259;
			color: #41a259;
			text-align: center;
			line-height: 38px;
			cursor: pointer;
			background-color: #ffffff;
			border-radius: 2px;
			position: absolute;
			right: 135px;
			margin-top: -6px;
		}
		.edit-btn {
			font-size: 14px;
			height: 36px;
			width: 68px;
			border: solid 1px #dcdfe6;
			color: #fff;
			text-align: center;
			line-height: 38px;
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