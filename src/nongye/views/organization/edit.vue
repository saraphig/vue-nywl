<template>
    <!-- <div class="organization-module"> -->
    <div class="main-container">
        <v-messagebox v-show="messageTextShow" @select-type="onSelectType" :content="messageText"></v-messagebox>
        <div class="title-container">{{ title }}
            <div class="title-right">
                <input type="button" class="btn-cancel" @click="dataCancel()" value="取消" />
                <input type="button" class="btn-save" @click="dataSave()" value="保存" />
                
            </div>
        </div>
		<div class="page-line"></div>
        <div class="input-container">
            <p class="base_title">
                <span class="label-base"></span>基础信息</p>
            <div class="input-box-left">
                <div class="input-box">
                    <div class="input-label">
                        <div class="label-mark">*</div>机构名称:</div>
                    <div class="input-input"><input name="organ_name" id="organ_name" class="input-user" placeholder="请输入机构名称" v-model="organ_name" maxlength="15"></div>
                </div>
                <div class="input-box">
                    <div class="input-label">机构简称:</div>
                    <div class="input-input"><input name="organ_short" id="organ_short" class="input-user" placeholder="请输入机构简称" v-model="organ_short" maxlength="15"></div>
                </div>
                <div class="input-box">
                    <div class="input-label">
                        <div class="label-mark">*</div>机构代码:</div>
                    <div class="input-input"><input name="organ_code" id="organ_code" class="input-user" placeholder="由服务端自动生成" readonly v-model="organ_code" maxlength="64" title="由服务端自动生成"></div>
                </div>
                <div class="input-box">
                    <div class="input-label">自定义界面:</div>
                    <div class="input-input">
                        <i class="input-checkbox iconfont icon-icon_gouxuan" @click.stop="check_using()" :style="style_using"></i>启用 &nbsp;&nbsp;
                        <i class="input-checkbox iconfont icon-icon_gouxuan" @click.stop="check_disabled()" :style="style_disabled"></i>禁用
                    </div>
                </div>
            </div>
            <div class="input-box-right">
                <div class="input-box">
                    <div class="input-label">上级机构:</div>
                    <div class="input-input">
                        <!-- <sh-tree-select ref="$tree" :data="treeList" @clickCallBack="clickRow" isTree placeholder="请输入上级机构名称" v-model="treeCode" :currentId="organ_parentId"></sh-tree-select> -->
                        <!-- <sh-tree ref="$tree" textKey="idName" childrenKey="childrens" :data="treeList"  @node-click="clickRow"></sh-tree> -->
                        <input name="organ_upper" id="organ_upper" class="input-user"  placeholder="请输入上级机构名称" v-model="organ_upper" readonly maxlength="64">
                    </div>
                </div>
                <div class="input-box">
                    <div class="input-label">二级域名:</div>
                    <div class="input-input"><input name="domain_name" id="domain_name" class="input-user disabled" placeholder="请输入机构域名" v-model="domain_name" readonly maxlength="64" title="本次迭代暂不支持"></div>
                </div>
                <div class="input-box">
                    <div class="input-label">自定义域名:</div>
                    <div class="input-input"><input name="cudtom_domain" id="cudtom_domain" class="input-user disabled" placeholder="请输入机构自定义域名" v-model="cudtom_domain" readonly maxlength="64" title="本次迭代暂不支持"></div>
                </div>
            </div>

            <p class="base_title">
                <span class="label-base"></span>系统设置</p>

            <div class="input-box">
                <div class="input-label">系统名称:</div>
                <div class="input-input"><input name="sys_name" id="sys_name" class="input-user" placeholder="请输入设备平台系统名称" v-model="sys_name" readonly maxlength="64"></div>
            </div>
            <div class="input-box">
                <div class="input-label">
                    <div class="label-mark">&nbsp;&nbsp;&nbsp;&nbsp;</div>自定义LOGO:</div>
                <div class="input-input">
                    <i class="input-checkbox iconfont icon-icon_gouxuan" @click.stop="check_logo()" :style="style_logo"></i>启用</div>
            </div>
            <div class="input-box">
                <div class="input-label">&nbsp;&nbsp;</div>
                <div class="input-input input-fix"><input name="imageUrl" id="imageUrl" class="input-user" :disabled="!organ_logo" placeholder="" v-model="imageUrl" readonly maxlength="200">
                    <sh-upload :options="uplaodOptions" @callback="callback" class="sh-upload">
                        <button type="button" class="btn-upload" :disabled="!organ_logo" :style="style_upload">上传</button>
                    </sh-upload>
                </div>
            </div>

            <p class="base_title">
                <span class="label-base"></span>地图设置</p>
            <div class="input-box-left">
                <div class="input-box">
                    <div class="input-label">
                        <div class="label-mark">*</div>所在经度:</div>
                    <div class="input-input"><input name="longitude" id="longitude" class="input-user" placeholder="请输入机构经度" v-model="longitude" readonly maxlength="64"></div>
                </div>
            </div>
            <div class="input-box-right">
                <div class="input-box">
                    <div class="input-label">
                        <div class="label-mark">*</div>所在纬度:</div>
                    <div class="input-input"><input name="latitude" id="latitude" class="input-user" placeholder="请输入机构纬度" v-model="latitude" readonly maxlength="64"></div>
                </div>
            </div>
        </div>
        <div class="map-container">
            <sh-map ref="$map" mapWidth="100%" mapHeight="600px"></sh-map>
            <div class="map-search">
                <input v-model.trim="mapQueryText" placeholder="搜地点" @keyup.enter.native="mapQuery" class="map-search-input">
                <i class="map-search-icon iconfont icon-icon_shipinjiankong_suofang" @click="mapQuery"></i>
            </div>
            <!-- <img :src="imageUrl" class="map-image" /> -->
        </div>
    </div>
    <!-- </div> -->
</template>
<script>
import ShTreeSelect from "../../components/sh-tree-select.vue";
import BaseSelect from "../../components/base-select.vue";
import BaseTable from "../../components/base-table.vue";
import ShButton from "@com/sh-ui/components/sh-button";
import ShModal from '@com/sh-ui/components/sh-modal'
import ShUpload from "../../components/sh-upload";
import ShMap from "../../components/gaode-map";
import { mapGetters } from "vuex";
import VMessagebox from "@com/alert/message-box";
import {
    setStore,
    getStore,
    documentClick,
    isArray,
    cutStr,
    strlen
} from "@lib/js/mUtils";
import eventBus from "@com/event-bus";

export default {
    name: "organization-edit",
    components: {
        BaseSelect,
        BaseTable,
        // BasePagination,
        VMessagebox,
        // ShTable,
        ShButton,
        ShModal,
        ShUpload,
        ShMap,
        ShTreeSelect
    },
    data() {
        return {
            messageTextShow: false,
            messageText: "",
            title: "",
            organ_id: "",
            areaCode:"",
            organ_name: "",
            organ_short: "",
            organ_code: "",
            organ_upper: "", //上级机构
            organ_parentId: "",
            organ_parentCode:"",
            domain_name: "",
            cudtom_domain: "",
            sys_name: "", //嗣衡智慧农业综合管理平台
            organ_using: true,
            organ_disabled: false,
            organ_logo: true,
            readonly: false, //只读
            longitude: "",
            latitude: "",
            uplaodOptions: {
                filters: {
                    mime_types: [
                        { title: "Image files", extensions: "jpg,png" }
                    ],
                    max_file_size: "2mb"
                }
            },
            imageUrl: "",
            mapQueryText: "",
            treeList: [],
            treeCode: "",
            markerList: [],
            mousemove_id: 0,
            tab_row: {},
            condition: {},
            response_status: 0
        };
    },
    computed: {
        ...mapGetters({
            getOrganizationId: "getOrganizationId"
        }),
        style_using() {
            if (this.organ_disabled) {
                //organ_using
                return {
                    color: "#ffffff",
                    border: "1px solid #999999"
                };
            } else {
                return {
                    color: "#41A259",
                    border: "1px solid #41A259"
                };
            }
        },
        style_disabled() {
            if (this.organ_disabled) {
                return {
                    color: "#41A259",
                    border: "1px solid #41A259"
                };
            } else {
                return {
                    color: "#ffffff",
                    border: "1px solid #999999"
                };
            }
        },
        style_logo() {
            if (this.organ_logo) {
                return {
                    color: "#41A259",
                    border: "1px solid #41A259"
                };
            } else {
                return {
                    color: "#ffffff",
                    border: "1px solid #999999"
                };
            }
        },
        style_upload() {
            if (this.organ_logo) {
                return {
                    color: "#41A259",
                    border: "1px solid #41A259"
                };
            } else {
                return {
                    color: "#999999",
                    border: "1px solid #999999"
                };
            }
        }
    },
    mounted() {
        //
        // console.log("this.$route.query.item");
        console.log(this.$route.query.item);
        this.title = this.$route.query.title;
        if (typeof this.$route.query.item == "object") {
            let item = this.$route.query.item;
            this.organ_id = item.id;
            this.areaCode = item.areaCode;
            console.log(this.organ_id);
            this.organ_name = item.idName;
            this.organ_short = item.idNameSimple;
            this.organ_code = item.orgCode; //item.areaCode;
            this.imageUrl = item.pictureUrl;
            //this.organ_upper = item.parentId + ""; //上级机构---
            this.organ_parentId = item.parentId + "";
            this.getParentOrganization();
            // console.log(item.parentId);
            this.treeCode = "嗣衡智慧农业综合管理平台"; //item.parentId;
            // console.log("this.treeCode=" + this.treeCode);
            //"sysName": this.sys_name,
            // this.domain_name = item.
            // this.cudtom_domain = item.
            this.sys_name = item.sysName + "";
            if (this.sys_name == "" || this.sys_name == "null") {
                this.sys_name = "嗣衡智慧农业综合管理平台"; //item.city;//嗣衡智慧农业综合管理平台
            }
            // this.organ_using = item.
            this.organ_disabled = item.areaStatus == 5; //areaStatus 区域状态 如：1 正常，2 维修中，3建设中，4启用，5禁用(禁用的话区域下所有设备暂停推送数据)
            // this.organ_logo = item.
            //this.readonly:false,//只读
            this.longitude = item.x;
            this.latitude = item.y;
            // console.log("setMapMarker");
            this.setMapMarker(
                this.organ_id,
                this.longitude,
                this.latitude,
                this.organ_name
            );
        }
        if (this.organ_parentId == "") {
            this.organ_parentId = getStore("organizationId") + "";
            this.organ_parentCode = getStore("organizationCode") + "";
            this.organ_upper = getStore("organizationName") + "";
            this.sys_name = "嗣衡智慧农业综合管理平台";
            this.treeCode = "嗣衡智慧农业综合管理平台";
            console.log(this.organ_parentId);
            console.log("this.organ_parentId");
        }
        // if (this.organ_id == "" || this.organ_id == 0) {
        //     //this.organ_parentId = this.getOrganizationId();
        //     console.log(this.organ_parentId);
        //     eventBus.$on("OrganChanged", OrganizationId => {
        //         this.organ_parentId = OrganizationId;
        //     });
        // }
        //console.log(this.$refs.map);
        //console.log(this.$refs.$tree);
        let tmpMap = this.$refs.$map;
        tmpMap.addMapListenEvent("click", e => {
            // 先移除原有的markder标记
            tmpMap.removeMarker("organMarker");
            // 追加新的标记
            let lnglat = e.lnglat;
            // let marker = {
            //     icon: "",
            //     id: "organMarker", //标记名称
            //     lng: lnglat.lng, // 经度
            //     lat: lnglat.lat, // 纬度
            //     draggable: false, // 不可拖动
            //     visible: true // 显示隐藏
            // };
            setTimeout(() => {
                // tmpMap.newMarker(marker);
                this.setMapMarker(
                    "organMarker",
                    lnglat.lng,
                    lnglat.lat,
                    "经度:" + lnglat.lng + ", 纬度:" + lnglat.lat
                );
            }, 100);
            // 表单经纬度赋值
            this.longitude = lnglat.lng.toString();
            this.latitude = lnglat.lat.toString();
        });
        this.bodyKeyup = e => {
            // console.log(e);
            if (e.keyCode === 13) {
                // && e.target === document.body
                //console.log("searchUser");
                this.mapQuery();
            }
        };
        document.addEventListener("keyup", this.bodyKeyup, false);

        //this.getOrganizationTree("first");
    },
    beforeDestroy() {
        //document.removeEventListener('keyup', this.bodyKeyup)
        // eventBus.$off("OrganChanged");
    },
    watch: {},
    methods: {
        setMapMarker(id, x, y, showStr) {
            let _this = this;
            let marker = {};
            marker.id = id;
            marker.lng = x; // 经度
            marker.lat = y; // 纬度
            marker.visible = true; // 显示隐藏
            marker.draggable = false; //是否可拖动
            let tmpMap = this.$refs.$map;
            //console.log(tmpMap);
            let tmpMak = tmpMap.newMarker(marker); //创建机构标志
            this.markerList.push(marker);
            tmpMap.mapFromLngLat(x, y);

            tmpMak.infoWindow = new AMap.InfoWindow({
                content: '<font color="#00a6ac">' + showStr + "</font>",
                closeWhenClickMap: true
                // size:new this.$refs.map.Size(300, 0),
                // autoMove:true,
                // offset:new this.$refs.map.Pixel(0,-30)
            });
            // console.log("tmpMak");
            // console.log(tmpMak);
            // var aa = function (e) {infoWindow.open(tmpMap, tmpMak.getPosition());};
            // AMap.event.addListener(tmpMak, "click", aa);

            tmpMap.addMarkerListenEvent(marker.id, "mousemove", e => {
                //为标记绑定移入事件
                if (this.mousemove_id == e.target.id) return;
                this.mousemove_id = e.target.id;
                let tmpMarker = this.$refs.$map.getMarkerFromID(
                    this.mousemove_id
                );
                if (tmpMarker != null) {
                    // console.log("mousemove");
                    // console.log(tmpMarker);
                    // console.log(tmpMarker.getPosition());
                    tmpMarker.infoWindow.open(
                        this.$refs.$map.objMap,
                        tmpMarker.getPosition()
                    );
                }
                // console.log(e.target.id);
            });
            tmpMap.addMarkerListenEvent(marker.id, "mouseover", e => {
                //为标记绑定移出事件
                //console.log("mouseover");
                let tmpMarker = this.$refs.$map.getMarkerFromID(
                    this.mousemove_id
                );
                if (tmpMarker != null) {
                    console.log(tmpMarker);
                    tmpMarker.infoWindow.close();
                    //tmpMarker.hideInfoWindow();hideInfoWindow
                }
                this.mousemove_id = "";
                //console.log(e);
            });

            tmpMap.addMarkerListenEvent(marker.id, "click", e => {
                //为标记绑定点击事件
                let lng = e.lnglat.lng;
                let lat = e.lnglat.lat;
                let id = e.target.id;
                for (let m = 0; m < _this.markerList.length; m++) {
                    if (_this.markerList[m].id == id) {
                        lng = _this.markerList[m].lng;
                        lat = _this.markerList[m].lat;
                        break;
                    }
                }

                _this.hideAllMarker(_this.markerList);
                tmpMap.showMarker(id);
                tmpMap.mapFromLngLat(lng, lat);
                tmpMap.setMapZoom(8);
            });
        },
        hideAllMarker(list) {
            // let _this = this;
            for (let i = 0; i < list.length; i++) {
                this.$refs.$map.hideMarker(list[i].id);
            }
        },
        removeAllMarker(list) {
            // let _this = this;
            for (let i = 0; i < list.length; i++) {
                this.$refs.$map.removeMarker(list[i].id);
            }
        },
        mapQuery() {
            let _this = this;
            /*if (
                this.mapQueryText != this.condition.idName ||
                (!isArray(this.tab_row.data) || this.tab_row.data.length <= 0)
            ) {
                this.condition.idName = this.mapQueryText;
                //搜索机构
                this.condition.pageNo = 1;
                this.condition.pageSize = 10;
                this.tab_row = {};
                this.getOrganizationList();
            }*/
            this.$refs.$map.placeSerachPOI(this.mapQueryText);//搜索地区名称
            //搜索机构列表并作标记绑定点击事件
            /*this.$store.dispatch("get_equipment_areasList").then((response) => {
				this.areaOpts = response;
				console.log(response);
				for(let i = 0; i < response.length; i++) {
					let marker = {};
					marker.id = response[i].id;
					marker.lng = response[i].x; // 经度
					marker.lat = response[i].y; // 纬度
					marker.visible = true; // 显示隐藏
					marker.draggable = false; //是否可拖动
					this.$refs.amap.newMarker(marker);  //创建机构标志
					markerList.push(marker);
					this.$refs.amap.addMarkerListenEvent(marker.id, "click", (e) => { //为标记绑定点击事件
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
						console.log("show:", id);
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
			});*/
        },
        callback(url) {
            this.imageUrl = url;
        },
        check_using() {
            this.organ_disabled = !this.organ_disabled;
            //this.organ_using = !this.organ_using;
        },
        check_disabled() {
            this.organ_disabled = !this.organ_disabled;
        },
        check_logo() {
            this.organ_logo = !this.organ_logo;
            if (!this.organ_logo) {
                this.imageUrl = "";
            }
        },
        onSelectType() {
            this.messageTextShow = false;
            if (this.response_status == 200) {
                this.dataCancel();
            }
        },
        dataCancel() {
            this.$router.push({
                path: "/organization",
                query: {
                    id: this.organ_id
                }
            });
        },
        dataSave() {
            // console.log("dataSave");
            if (this.validateForm()) {
                // console.log(this.organ_id);
                if (this.organ_id == "") {
                    console.log("addOrganizationInfo");
                    this.addOrganizationInfo();
                } else {
                    console.log("modiOrganizationInfo");
                    this.modiOrganizationInfo();
                }
            }
        },
        clickRow(item) {
            //得到树结点数据
            console.log("上级机构ID");
            console.log(item.id);
            this.organ_upper = item.id + ""; //上级机构
            this.organ_parentId = item.id + "";
        },
        getParentOrganization() {
            console.log("getParentOrganization");
            this.$store.dispatch("getParentOrganization", {
                areaCode:this.areaCode
            }).then(
                response => {
                    console.log("getParentOrganization");
                    console.log(response);
                    this.organ_upper = response.idName;
                },
                error => {
                    console.log(error);
                });
        },
        getOrganizationList(state) {
            if (state != undefined) {
                this.condition = {
                    //"USER-ID":1,
                    areaCode: (this.organ_parentCode ==""?2:this.organ_parentCode),//this.organ_parentCode
                    areaTag: "机构",
                    pageNo: 1,
                    pageSize: 10
                };
            }
            this.$store.dispatch("fetchMonitorAreaGet", this.condition).then(
                response => {
                    console.log("getOrganizationList");
                    console.log(this.condition);
                    console.log(response);
                    // if (typeof response == "object" && isArray(response.data)) {
                    //     this.tab_row = response;
                    //     this.removeAllMarker(this.markerList);
                    //     this.markerList = [];
                    //     for (let i = 0; i < this.tab_row.data.length; i++) {
                    //         let item = this.tab_row.data[i];
                    //         this.setMapMarker(
                    //             item.id,
                    //             item.x,
                    //             item.y,
                    //             item.idName
                    //         );
                    //     }
                    // } else {
                    // }
                },
                error => {
                    alert(error);
                    this.tab_row = [];
                }
            );
        },
        getOrganizationTree(state) {
            let condition = {
                //
                "USER-ID": 1
            };
            this.$store.dispatch("getOrganizationTree", condition).then(
                response => {
                    console.log("getOrganizationTree");
                    console.log(response);
                    if (isArray(response)) {
                        this.treeList = response;
                    } else {
                    }
                },
                error => {
                    alert(error);
                    this.treeList = [];
                }
            );
        },
        validateForm() {
            if (!this.longitude || !this.latitude) {
                alert("请点击地图选取经度和纬度");
                return false;
            }
            if (!this.organ_name) {
                alert("请输入机构名称");
                return false;
            } else if (this.test_organname(this.organ_name)) {
                alert("请输入机构名称包含非法字符！");
                return false;
            }
            if (this.test_organname(this.organ_short)) {
                alert("请输入机构简称包含非法字符！");
                return false;
            }
            if (!this.organ_parentId) {//
                alert("请选择上级机构");
                return false;
            }
            // if (!this.organ_code) { //由服务端自动生成
            //     alert("请输入机构代码");;
            //     return false;
            // };
            if (!this.organ_short) {
                this.organ_short = this.organ_name;
            }
            if (this.test_organname(this.organ_short)) {
                alert("机构名称包含非法字符！");
                return false;
            };
            if (!this.organ_parentId) {
                //this.organ_parentId = getOrganizationId(); //使用当前系统的机构ID作为其父ID
            }
            return true;
        },
        test_organname(value) {
            const regexStr = '^[\u4E00-\u9FA5A-Za-z0-9]+$';
            const Regex = new RegExp("[^a-zA-Z0-9\-\_\(\)\u4e00-\u9fa5]","i");
            return Regex.test(value); // should return Boolean
        },
        addOrganizationInfo() {
            //增加机构信息
            console.log("addOrganizationInfo");
            let condition = {
                //"USER-ID":1,
                idName: this.organ_name,
                idNameSimple: this.organ_short,
                // "isDeleted": true,
                areaBusiness: "1",
                //"userId": this.$store.state.app.userid,
                parentId: this.organ_parentId,
                pictureUrl: this.imageUrl,
                sysName: this.sys_name,
                platform: "ny", //"所属的应用系统平台，如：gy高邮，ny农业，jt金坛……",
                address: "机构",
                city: "机构",
                areaStatus: "4",//this.organ_disabled ? "5" : "4", //"区域状态 如：1 正常，2 维修中，3建设中，4启用，5禁用(禁用的话区域下所有设备暂停推送数据)",
                //"orgCode"
                // "userCreate": 0,
                // "userId": "15,28",
                // "userModified": 0,
                x: this.longitude,
                y: this.latitude
            };
            console.log(condition);

            this.$store.dispatch("addOrganizationInfo", condition).then(
                response => {
                    console.log("addOrganizationInfo");
                    console.log(response);
                    console.log(response.code);
                    this.messageText = response.msg;
                    this.messageTextShow = true;
                    this.response_status = response.code;
                },
                error => {
                    alert(error);
                    
                }
            );
        },
        modiOrganizationInfo() {
            //编辑提交机构信息
            console.log("modiOrganizationInfo");
            let item = this.$route.query.item;
            let condition = {
                //"USER-ID":1,
                areaId: item.id,//this.organ_id,
                areaCode: item.areaCode,
                idName: this.organ_name,
                idNameSimple: this.organ_short,
                // "isDeleted": true,
                areaBusiness: item.areaBusiness, //"1",
                //"userId": this.$store.state.app.userid,
                parentId: this.organ_parentId,
                pictureUrl: this.imageUrl,
                sysName: this.sys_name,
                platform: item.platform, //"ny",//"所属的应用系统平台，如：gy高邮，ny农业，jt金坛……",
                address: item.address, //"机构",
                city: item.city, //"机构",
                areaStatus: item.areaStatus,//this.organ_disabled ? "5" : "4", //"区域状态 如：1 正常，2 维修中，3建设中，4启用，5禁用(禁用的话区域下所有设备暂停推送数据)",
                //"orgCode"
                // "userCreate": 0,
                // "userId": "15,28",
                // "userModified": 0,
                x: this.longitude,
                y: this.latitude
            };
            console.log(condition);

            this.$store.dispatch("modiOrganizationInfo", condition).then(
                response => {
                    console.log("modiOrganizationInfo");
                    console.log(response);
                    if (typeof response == "object") {
                        this.messageText = response.msg;
                        this.response_status = response.code;
                    } else if (typeof response == "string") {
                        this.messageText = response;
                        if (response == "更新成功") {
                            this.response_status = 200;
                        }
                    }
                    this.messageTextShow = true;
                },
                error => {
                    alert(error);
                }
            );
        }
    }
};
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

.main-container {
    display inline-block
    box-sizing border-box
    width 97.55%
    // height 700px
    text-align center
    vertical-align middle
    background #ffffff
    border 1px solid #e1e6e9
    padding-bottom 100px
    margin-top 20px
    margin-left 20px
    .map-container {
        position relative
        display inline-block
        box-sizing border-box
        width 96.31%
        height 600px
        border 1px solid #E3E8EA
        margin-top 10px
        .map-search {
            position absolute
            display inline-block
            box-sizing border-box
            left 30px
            top 30px
            // z-index 100
            width 300px
            height 36px
            // border 1px solid #ff0000
            .map-search-input {
                display inline-block
                box-sizing border-box
                width 100%
                height 36px
                font-size 14px
                color #999999
                line-height 36px
                padding-left 16px
                border 1px solid #E3E8EA
            }
            .map-search-icon {
                color #999999
                font-size 17px
                position absolute
                height 36px
                width 50px
                line-height 36px
                text-align center
                right 0px
                top 0
                cursor pointer
                // border 1px solid #ff0000
            }
        }
        .map-image {
            display inline-block
            width 100%
            height 100%
        }
    }
    .title-container {
    	color:#444444;
    	margin-left: 30px;
    	margin-top: -5px;
        position relative
        display inline-block
        box-sizing border-box
        width 100%
        height 96px
        //border-bottom 1px solid #E3E8EA
        text-align left
        font-size 19px
        font-weight bold
        line-height 86px
        // margin-left 28px
        vertical-align middle
        white-space nowrap
        // border 1px solid #ff0000
        .title-right {
            position absolute
            box-sizing border-box
            display inline-block
            width 162px
            height 36px
            right 50px
            .btn-cancel {
                // box-sizing border-box
                // display inline-block
                // width 68px
                // height 36px
                // font-size 14px
                // // line-height 24px
                // color #41A259
                // background #ffffff
                // margin-left 10px
                // margin-top 29px
                // border 1px solid #41a259
                // border-radius 2px
                // cursor pointer

                box-sizing border-box
                display inline-block
                width 68px
                height 36px
                font-size 14px
                // line-height 24px
                color #41A259
                background #ffffff
                // margin-left 10px
                // margin-top 29px
                border-radius 2px
                border 1px solid #41a259
                cursor pointer
            }
            .btn-save {
                box-sizing border-box
                display inline-block
                width 68px
                height 36px
                font-size 14px
                // line-height 24px
                margin-left 10px
                margin-top 29px
                border 0px
                color #ffffff
                background #41A259
                border-radius 2px
                cursor pointer
            }
        }
    }
    .page-line{
    	border-bottom: solid 1px #e3e8ea;
		margin-left: 30px;
		margin-right: 30px;
    }
    .input-container {
        display inline-block
        box-sizing border-box
        width 100%
        // width 96.31%
        text-align left
        padding-right 30px
        .base_title {
            position relative
            font-size 16px
            color #444444
            text-align left
            white-space nowrap
            margin-top 30px
            margin-bottom 20px
            // left -28px
            .label-base {
                display inline-block
                height 16px
                width 4px
                color #444444
                // border-radius: 2px;
                background #41a259
                margin-left 10px
                margin-right 15px
                vertical-align middle
            }
        }
        .input-box {
            display inline-block
            white-space nowrap
            width 100%
            height 36px
            font-size 14px
            color #444444
            vertical-align middle
            margin-bottom 10px
            // border 1px solid #ff0000
            .input-label {
                float left
                box-sizing border-box
                width 110px
                height 36px
                text-align right
                font-size 14px
                line-height 36px
                color #999999
                padding-right 22px
                // border 1px solid #00ff00
                .label-mark {
                    display inline-block
                    color #ff5560
                    margin-right 10px
                }
            }
            .input-input {
                // display inline-block
                // width 100%
                box-sizing border-box
                margin-left 110px
                height 36px
                // border 1px solid #0000ff
                .input-user {
                    box-sizing border-box
                    width 100%
                    height 100%
                    font-size 14px
                    line-height 24px
                    color #444444
                    padding-left 15px
                    border 1px solid #E3E8EA
                    border-radius 2px
                }
                .input-user:hover {
                    border 1px solid #41A259
                }
                .input-checkbox {
                    width 18px
                    height 18px
                    color #41A259
                    border 1px solid #41A259
                    border-radius 2px
                    vertical-align middle
                    line-height 36px
                    margin-left 15px
                    margin-right 10px
                }
                .input-checkbox:hover {
                    border 1px solid #41A259
                }
                .sh-upload {
                    // border 1px solid #ff0000
                    width 68px
                    height 36px
                    margin-left 20px
                    // position absolute
                    // right 0px
                    // top 0px
                }
                .btn-upload {
                    // position absolute
                    // top 0px
                    // right 0px
                    box-sizing border-box
                    display inline-block
                    width 68px
                    height 36px
                    font-size 14px
                    // line-height 24px
                    color #41A259
                    background #ffffff
                    // margin-left 10px
                    // margin-top 29px
                    border-radius 2px
                    border 1px solid #41a259
                    cursor pointer
                }
            }
            .input-fix {
                // margin-right 210px
                padding-right 92px
                // border 1px solid #ff0000
            }
        }
        .input-box-left {
            position relative
            box-sizing border-box
            display inline-block
            width 50%
            text-align left
            // padding-right 30px
            // left -28px
        }
        .input-box-right {
            box-sizing border-box
            display inline-block
            width 50%
            // text-align right
            // padding-right 30px
            float right
        }
    }
}
</style>