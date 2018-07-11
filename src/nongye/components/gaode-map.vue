<template>
	<div class="gaode-map">
		<div id="mapContainer" class="mapContainer" :style="{width:mapWidth,height:mapHeight }"></div>
		<slot name="slotDiv" class="slotDiv"></slot>
		<div class="district-search" v-show="districtShowBo" :style="{top:districtTop,left:districtLeft }">
			<div class="currentCity">
				<span class="district-curCityLable">当前城市:</span>
				<span class="district-curCityName">{{curCity}}</span>
				<span class="district-close" @click="districtCloseHandle()">×</span>
			</div>
			<div class="district-line"></div>
			<div class="mainCity">
				<div @click="toCity(108.14633,35.8783,'全国',4)">全国</div>
				<div @click="toCity(116.322062,39.894914,'北京',10)">北京</div>
				<div @click="toCity(117.246256,39.101748,'天津',10)">天津</div>
				<div @click="toCity(123.462742,41.676357,'沈阳',10)">沈阳</div>
				<div @click="toCity(121.615071,38.919536,'大连',10)">大连</div>
				<div @click="toCity(121.470584,31.231119,'上海',10)">上海</div>
				<div @click="toCity(118.792819,32.061913,'南京',10)">南京</div>
				<div @click="toCity(120.614778,31.302313,'苏州',10)">苏州</div>
				<div @click="toCity(120.206448,30.244166,'杭州',10)">杭州</div>
				<div @click="toCity(120.378483,36.067214,'青岛',10)">青岛</div>
				<div @click="toCity(113.622153,34.748384,'郑州',10)">郑州</div>
				<div @click="toCity(114.304752,30.59795,'武汉',10)">武汉</div>
				<div @click="toCity(112.926661,28.195906,'长沙',10)">长沙</div>
				<div @click="toCity(113.259351,23.13465,'广州',10)">广州</div>
				<div @click="toCity(114.08114,22.553976,'深圳',10)">深圳</div>
				<div @click="toCity(106.546847,29.56123,'重庆',10)">重庆</div>
				<div @click="toCity(104.062302,30.578508,'成都',10)">成都</div>
				<div @click="toCity(108.933604,34.343138,'西安',10)">西安</div>
				<div @click="toCity(114.168548,22.281295,'香港',10)">香港</div>
				<div @click="toCity(113.53879,22.190686,'澳门',10)">澳门</div>
			</div>
			<div class="inputItem">
				<input v-model="placeSerachPOIModel" placeholder="请输入城市名称" />
				<i class="seach-iconfont" @click="searchFromCityName(placeSerachPOIModel)">
					<svg t="1527581757364" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6396" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20">
						<path d="M472.064 177.664a252.928 252.928 0 0 1 180.736 75.264 256 256 0 0 1 24.064 333.824l-22.528 29.696-29.696 22.016a249.344 249.344 0 0 1-153.6 51.2 256 256 0 0 1 0-512m0-102.4a358.4 358.4 0 0 0-256 614.4 354.816 354.816 0 0 0 252.928 104.96 358.4 358.4 0 0 0 214.528-71.168L870.4 904.704a51.2 51.2 0 0 0 35.84 14.848 51.2 51.2 0 0 0 36.352-14.848 51.2 51.2 0 0 0 0-72.704l-183.808-183.808a358.4 358.4 0 0 0-286.72-572.928z" p-id="6397" fill="#cdcdcd"></path>
					</svg>
				</i>
			</div>
		</div>
	</div>
</template>

<script>
	import BaseSelect from './base-select.vue';
	//	import eventBus from '@com/event-bus';
	let map;
	let markerList = [];
	let mapEvent = "";
	let mapMoveGetCityEvent = "";

	export default {
		name: "GaodeMap",
		data() {
			return {
				objMap:null,
				districtShowBo: false,
				districtTop: "0px",
				districtLeft: "0px",
				placeSerachPOIModel: "",
				districtCallBack: "",
				curCity: "",
				opts: [{
					id: 'ID1',
					value: 'a'
				}, {
					id: 'ID2',
					value: 'b'
				}, {
					id: 'ID3',
					value: 'c'
				}, {
					id: 'ID4',
					value: 'd'
				}, {
					id: 'ID5',
					value: 'e'
				}, {
					id: 'ID6',
					value: 'f'
				}, {
					id: 'ID7',
					value: 'g'
				}, {
					id: 'ID8',
					value: 'h'
				}, {
					id: 'ID9',
					value: 'i'
				}, {
					id: 'ID10',
					value: 'j'
				}, {
					id: 'ID11',
					value: 'k'
				}, {
					id: 'ID12',
					value: 'l'
				}],
			}
		},
		props: {
			mapWidth: {
				type: String,
				default: "800px"
			},
			mapHeight: {
				type: String,
				default: "550px"
			}
		},
		methods: {
			// 通过地址模糊查询位置 
			// address 地址名称
			placeSerachPOI(address, callback) {
				AMap.service('AMap.PlaceSearch', function() {
					//构造地点查询类
					var placeSearch = new AMap.PlaceSearch({
						pageSize: 1,
						pageIndex: 1,
						city: ""
					});
					//关键字查询
					placeSearch.search(address, function(status, result) {
						if(status === 'complete' && result.info === 'OK') {
							let lng = result.poiList.pois[0].location.lng;
							let lat = result.poiList.pois[0].location.lat;
							map.setZoomAndCenter(13, [lng, lat]);
							if(callback) {
								callback();
							}
						}
					});
				});
			},
			// 新增一个marker标记
			// marker 新建参数
			newMarker(marker) {
				let resMaker = {};
				if(marker.lng == 0 || marker.lat == 0) {
					return;
				}
				if(marker.lng == "" && marker.lat == "") {
					marker.lng = map.getCenter().lng;
					marker.lat = map.getCenter().lat;
				}
				let haveMarker = false;
				for(let i = 0; i < markerList.length; i++) {
					if(markerList[i].id == marker.id) {
						haveMarker = true;
						break;
					}
				}
				if(!haveMarker) {
					let markerItem = new AMap.Marker({
						visible: marker.visible,
						draggable: marker.draggable,
						icon: marker.icon,
						offset: new AMap.Pixel(-8, -34),
						topWhenMouseOver: "true",
						position: [marker.lng, marker.lat], //marker所在的位置
						map: map
					});
					markerItem.id = marker.id;
					markerList.push(markerItem);
					resMaker = markerItem;
				} else {
					let curmarker = this.getMarkerFromID(marker.id);
					if(curmarker) {
						let lngLat = new AMap.LngLat(marker.lng, marker.lat);
						curmarker.setPosition(lngLat);
						curmarker.show();
						resMaker = curmarker;
					}
				}
				return resMaker;
			},
			// 移除Marker
			removeMarker(markerID) {
				let marker = this.getMarkerFromID(markerID);
				if(marker) {
					marker.setMap(null);
				}
				for(let i = 0; i < markerList.length; i++) {
					if(markerID == markerList[i].id) {
						markerList.splice(i, 1);
						break;
					}
				}
			},
			// 通过ID获取Marker对象
			getMarkerFromID(markerID) {
				let marker = null;
				for(let i = 0; i < markerList.length; i++) {
					if(markerID == markerList[i].id) {
						marker = markerList[i];
						break;
					}
				}
				return marker;
			},
			// 添加marker监听事件
			// type 仅支持click和mouseup
			addMarkerListenEvent(markerID, type, callback) {
				let marker = this.getMarkerFromID(markerID);
				if(marker) {
					if(marker[type]) {
						AMap.event.removeListener(marker[type]);
					}
					let markerEvent = AMap.event.addListener(marker, type, function(e) {
						callback(e);
					});
					marker[type] = markerEvent; // 存储该事件对象
				}
			},
			// 移除marker监听事件
			// type 仅支持click和mouseup
			removeMarkerListenEvent(markerID, type) {
				let marker = this.getMarkerFromID(markerID);
				if(marker) {
					let eventListener = marker[type];
					AMap.event.removeListener(eventListener);
				}
			},
			// 依据ID获取Marker信息
			getMarkerInfo(markerID) {
				let info = {};
				let marker = this.getMarkerFromID(markerID);
				if(marker) {
					info.position = marker.getPosition();
				}
				return info;
			},
			// 依据ID显示Marker
			showMarker(markerID) {
				let marker = this.getMarkerFromID(markerID);
				if(marker) {
					marker.show();
				}
			},
			// 依据ID隐藏Marker
			hideMarker(markerID) {
				let marker = this.getMarkerFromID(markerID);
				if(marker) {
					marker.hide();
				}
			},
			// 返回全国省市区信息
			getDistrictData(callBack) {
				AMap.service('AMap.DistrictSearch', function() { //回调函数
					var districtSearch = new AMap.DistrictSearch({
						level: 'country',
						subdistrict: 3,
						extensions: 'all', //返回行政区边界坐标组等具体信息
					});

					// 获取全国区域信息
					districtSearch.search('中国', function(status, result) {
						callBack(result);
					})
				});
			},
			// 根据经纬度获取详细信息
			geocoder(lng, lat, callback) {
				AMap.plugin('AMap.Geocoder', function() {
					let lngLat = new AMap.LngLat(lng, lat);
					var geocoder = new AMap.Geocoder({
						city: ""
					});
					geocoder.getAddress(lngLat, function(status, result) {
						callback(result);
					})
				});
			},
			// 根据adcode跳转到相应地图位置,每一个位置都有一个唯一的adcode
			mapFromAdcode(adcode) {
				map.setCity(adcode);
			},
			// 根据经纬度跳转到相应地图位置
			mapFromLngLat(lng, lat) {
				map.setCenter([lng, lat]);
			},
			// 设置map远近层级
			setMapZoom(zoom) {
				map.setZoom(zoom);
			},
			// 添加map监听事件
			// type 仅支持click
			addMapListenEvent(type, callback) {
				AMap.event.removeListener(mapEvent);
				mapEvent = AMap.event.addListener(map, type, function(e) {
					callback(e);
				});
			},
			// 移除map监听事件
			// type 仅支持click
			removeMapListenEvent() {
				AMap.event.removeListener(mapEvent);
			},
			// 移动地图结束，返回地图中心点城市信息
			mapMoveEndGetCityEvent(callback) {
				AMap.event.removeListener(mapMoveGetCityEvent);
				mapMoveGetCityEvent = AMap.event.addListener(map, "moveend", function(e) {
					map.getCity(function(data) {
						if(data['province'] && typeof data['province'] === 'string') {
							callback(data);
						}
					});
				});
			},
			// 初始化行政区域搜索组件
			initDistrict(x, y, callBack) {
				let _this = this;
				this.districtShowBo = true;
				this.districtTop = y + "px";
				this.districtLeft = x + "px";
				this.districtCallBack = callBack;
				this.getCurCity(function(e) {
					_this.curCity = e.regeocode.addressComponent.city;
				});
			},
			// 显示行政区域搜索框
			districtShow() {
				this.districtShowBo = true;
			},
			// 隐藏行政区域搜索框
			districtHide() {
				this.districtShowBo = false;
			},
			// 获取当前地图中心点的城市信息
			getCurCity(callback) {
				let lngLat = map.getCenter();
				AMap.plugin('AMap.Geocoder', function() {
					var geocoder = new AMap.Geocoder({
						city: ""
					});
					geocoder.getAddress(lngLat, function(status, result) {
						callback(result);
					})
				});
			},
			// 行政区域组件 依据经纬度跳转至某个城市
			toCity(lng, lat, city, zoon) {
				this.mapFromLngLat(lng, lat);
				this.setMapZoom(zoon);
				this.curCity = city;
				if(this.districtCallBack) {
					let resp = {};
					resp.type = "city";
					resp.data = city;
					this.districtCallBack(resp);
				}
			},
			// 依据城市名称某个城市
			searchFromCityName(city) {
				map.setCity(city);
				this.setMapZoom(10);
				if(this.districtCallBack) {
					let resp = {};
					resp.type = "city";
					resp.data = city;
					this.districtCallBack(resp);
				}
			},
			// 关闭行政区域组件
			districtCloseHandle() {
				this.districtHide();
				let resp = {};
				resp.type = "close";
				resp.data = "";
				this.districtCallBack(resp);
				//				eventBus.$emit('closemapbox', false);
			},
			// 自动更新更新行政区域当前城市标签
			districtUpdate(cityLabel, callback) {
				let _this = this;
				if(cityLabel) {
					_this.curCity = cityLabel;
					if(callback) {
						callback(_this.curCity);
					}
				} else {
					_this.curCity = "识别中...";
					setTimeout(function() {
						map.getCity(function(data) {
							if(data['province'] && typeof data['province'] === 'string') {
								_this.curCity = data.city;
								if(data.city == "") {
									_this.curCity = data.province;
								}
								if(callback) {
									callback(_this.curCity);
								}
							} else {
								_this.curCity = "无法识别";
								if(callback) {
									callback("无法识别");
								}
							}
						});
					}, 2000);
				}
			}
		},
		mounted() {
			let _this = this;
			map = new AMap.Map('mapContainer', {
				resizeEnable: true, //自适应大小
				zoom: 11
			});
			this.objMap = map;
			markerList = [];
			return;
			// 精确定位
			//			map.plugin(['AMap.Geolocation'], function() {
			//				let geolocation = new AMap.Geolocation({
			//					enableHighAccuracy: true, //  是否使用高精度定位，默认:true
			//					timeout: 10000, //  超过10秒后停止定位，默认：无穷大
			//					maximumAge: 0, // 定位结果缓存0毫秒，默认：0
			//					convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
			//					showButton: false, //  显示定位按钮，默认：true
			//					buttonPosition: 'LB', // 定位按钮停靠位置，默认：'LB'，左下角
			//					buttonOffset: new AMap.Pixel(0, 0), //  定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
			//					showMarker: false, //  定位成功后在定位到的位置显示点标记，默认：true
			//					showCircle: true, //  定位成功后用圆圈表示定位精度范围，默认：true
			//					panToLocation: true, //  定位成功后将定位到的位置作为地图中心点，默认：true
			//					zoomToAccuracy: true //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
			//				})
			//				map.addControl(geolocation);
			//				geolocation.getCurrentPosition();
			//				AMap.event.addListener(geolocation, 'complete', (result) => {
			//					map.setCenter(result.position);
			//					console.log(map.getCenter());
			//				});
			//			});
		},
		components: {
			BaseSelect
		},
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.gaode-map {
		display: flex;
		position: relative;
	}
	
	.district-search {
		top: 10px;
		left: 422px;
		background-color: #fff;
		width: 368px;
		height: 186px;
		z-index: 95;
		position: absolute;
		font-size: 14px;
		color: #fff;
		border: solid 1px #bfbfbf;
		box-shadow: 0px 0px 20px 0px rgba(204, 204, 204, 0.4);
		border-radius: 2px;
	}
	
	.district-line {
		margin: 10px;
		height: 1px;
		border-bottom: solid 1px #e3e8ea;
	}
	
	.currentCity {
		width: 100%;
		height: 15px;
		padding: 10px;
		color: #606266;
		font-size: 14px;
		.district-curCityLable {
			position: absolute;
			line-height: 35px;
		}
		.district-curCityName {
			position: absolute;
			margin-left: 66px;
			line-height: 35px;
		}
		.district-close {
			font-size: 22px;
			margin-left: 328px;
			cursor: pointer;
			position: absolute;
		}
	}
	
	.mainCity {
		width: 95%;
		height: 50px;
		padding: 6px;
		font-size: 14px;
		div {
			display: inline-block;
			margin: 2px;
			cursor: pointer;
			color: #9A9A9A;
		}
		div:hover {
			color: #41a259;
		}
	}
	
	.city-title {}
	
	.inputItem {
		display: flex;
		margin-left: 10px;
		margin-top: 20px;
		input {
			width: 336px;
			position: relative;
			font-size: 14px;
			padding-left: 10px;
			border: solid 1px #dcdfe6;
			border-radius: 5px;
			height: 30px;
		}
	}
	
	.seach-iconfont {
		cursor: pointer;
		color: #999;
		font-size: 17px;
		position: absolute;
		height: 34px;
		width: 30px;
		line-height: 44px;
		text-align: center;
		right: 11px;
	}
	
	.slotDiv {
		position: absolute;
	}
</style>