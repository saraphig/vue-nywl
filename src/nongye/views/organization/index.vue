<template>
    <!-- <div class="organization-module"> @input="searchOrgan()"-->
    <div class="main-container">
        <v-messagebox v-show="messageTextShow" @select-type="onSelectType" :content="messageText" :nobtnShow="true" :okbtn="isUsedText"></v-messagebox>
        <div class="title-container">机构管理
            <!-- <div class="search-box"><input name="searchInput" id="searchInput"  @click.stop="searchOrgan()" class="search-input" v-model="showOrganText" placeholder="请输入机构名称" />
                <i class="seach-iconfont iconfont icon-icon_shipinjiankong_suofang" @click.stop="searchOrgan()"></i>
            </div> -->
            <div class="search-box"><input name="searchInput" id="searchInput" class="search-input" placeholder="请输入机构名称" v-model="showOrganText" maxlength="10"></div>
            <input type="button" class="btn-search"  @click="searchOrgan" @keyup.enter="searchOrgan" value="查询" />
            
            <!-- <button type="button" class="btn-adduser" ></button> -->
            <sh-button @click="addUser" class="org-button-top">新增</sh-button>
        </div>
        <div class="table-container">
            <sh-table id="table-list-container" :columns="tab_columns" :data="tab_row" @pageChange="pageChange" :operate="true">
                <template slot="operate" slot-scope="data">
                    <div class="edit-tab">
                        <i class="iconfont icon-icon_list_gengduo" @click="showDetail(data.row.id)"></i>
                        <ul class="edit-show" v-show='editShow==data.row.id'>
                            <li @click='DisableHandle(data.row.id)' @mouseenter="mouseAct(true)" @mouseleave="mouseAct(false)">
                                <i v-if='data.row.areaStatus == 5' class="iconfont icon-icons_list_qiyong" :style="showGreen"></i>
                                <i v-else class="iconfont icon-icon_list_jinyong" :style="showGreen"></i>
                                <span v-if='data.row.areaStatus == 5' :style="showGreen">启用</span>
                                <span v-else :style="showGreen">禁用</span>
                            </li>
                            <li @click='DetailHandle(data.row.id)' @mouseenter="mouseAct1(true)" @mouseleave="mouseAct1(false)">
                                <i class="iconfont icon-icon_daohang_gongdanguanli" :style="showGreen1"></i>
                                <span :style="showGreen1">详情</span>
                            </li>
                            <li @click="showDetailmask()">
                                <i class="iconfont icon-icon_close"></i>
                            </li>
                        </ul>

                    </div>
                </template>
            </sh-table>
        </div>
    </div>
</template>
<script>
//import AreaSelect from "./area_select";
import BaseSelect from "../../components/base-select.vue";
import BaseTable from "../../components/base-table.vue";
import ShButton from "@com/sh-ui/components/sh-button";
import ShModal from '@com/sh-ui/components/sh-modal'
import BasePagination from "../../components/base-pagination.vue";
import ShTable from "../../components/sh-table";
import { mapGetters } from "vuex";
import VMessagebox from "@com/alert/message-box";
import {
    getStore,
    documentClick,
    isArray,
    cutStr,
    strlen
} from "@lib/js/mUtils";
import eventBus from "@com/event-bus";

export default {
    name: "organization-list",
    components: {
        BaseSelect,
        BaseTable,
        BasePagination,
        VMessagebox,
        ShTable,
        ShButton,
        ShModal
    },
    data() {
        return {
            Organ_Id: "2",
            areaCode:"2",
            showOrganText: "",
            messageTextShow: false,
            messageText: "",
            isUsedText: "禁用",
            CurrentIndex: -1,
            editShow: 0,
            detailShow: false,
            isusedShow: false,
            condition: {},
            tab_columns: [
                { field: "idName", title: "机构名称", width: 1 },
                { field: "idNameSimple", title: "机构简称", width: 1 },
                { field: "orgCode", title: "机构代码", width: 1 },
                { field: "domain_name", title: "自定义域名", width: 1 },
                {
                    field: "areaStatus",
                    title: "机构状态",
                    width: 1,
                    formatter(row) {
                        return row.areaStatus == "5"
                            ? "<span style='color:#ff5560' title=''>禁用</span>"
                            : "<span style='color:#5db7ff' title='' >启用</span>";
                    }
                }
            ],
            tab_row: {
                pageNo: 1, //页号
                pageSize: 10, //pageSize 每页记录条数
                pageTotal: 2, //total 总页数
                total: 2, //total     记录总数
                data: [
                    // {
                    //     id: 1,
                    //     full_name: "苏州金坛智慧农业基地",
                    //     short_nemw: "金坛农业",
                    //     inst_code: "JT8806",
                    //     domain_name: "www.itny.com"
                    // },
                    // {
                    //     id: 2,
                    //     full_name: "苏州金坛智慧农业基地",
                    //     short_nemw: "金坛农业",
                    //     inst_code: "JT8806",
                    //     domain_name: "www.itny.com"
                    // }
                ]
            }
        };
    },
    computed: {
        showGreen() {
            // console.log("showGreen:" + this.isusedShow );
            if (this.isusedShow) {
                return { color: "#41a259" };
            } else {
                return { color: "#999999" };
            }
        },
        showGreen1() {
            // console.log("showGreen:" + this.detailShow );
            if (this.detailShow) {
                return { color: "#41a259" };
            } else {
                return { color: "#999999" };
            }
        },
        // GetOrgan_Id() {
        //     //{{ GetOrgan_Id }}
        //     this.Organ_Id = this.$store.getters.getOrganizationId;
        //     return this.Organ_Id;
        // }
    },
    mounted() {
        this.Organ_Id = getStore("organizationId") + "";
        this.areaCode = getStore("organizationCode") + "";
        documentClick((e) => {
            let selfdiv = document.getElementById("table-list-container");
            if (selfdiv) {
                if (!selfdiv.contains(event.target)) {//判断点击到了id以外的区域
                    this.editShow = 0;
                };
            };
        });
        this.bodyKeyup = e => {
            // console.log(e);
            if (e.keyCode === 13) {
                // && e.target === document.body
                //console.log("searchUser");
                this.searchOrgan();
            }
        };
        document.addEventListener("keyup", this.bodyKeyup, false);
        //this.Organ_Id = this.$store.getters.getOrganizationId; //getStore("OrganizationId") + "";
        // eventBus.$on("OrganChanged", OrganizationId => {
        //     this.Organ_Id = OrganizationId;
        // });
        this.getOrganizationList("first");
        //
    },
    beforeDestroy() {
        //document.removeEventListener('keyup', this.bodyKeyup)
        // eventBus.$off("OrganChanged");
    },
    watch: {
        // Organ_Id(val) {
        //     //console.log("Organ_Id=" + val);
        //     this.condition.areaCode = val;
        //     this.getOrganizationList();
        // }
    },
    methods: {
        onSelectType(type) {
            this.messageTextShow = false;
            if (type) {
                this.updateisUsed(false);
            }
        },
        searchOrgan() {
            if (
                this.showOrganText != this.condition.idName ||
                this.tab_row.data.length <= 0
            ) {
                this.condition.idName = this.showOrganText;
                //搜索机构
                this.condition.pageNo = 1;
                this.condition.pageSize = 10;
                this.tab_row = {};
                this.getOrganizationList();
            }
        },
        addUser() {
            this.$router.push({
                path: "/organization/edit",
                query: {
                    id: "",
                    title: "新增机构"
                }
            });
        },
        pageChange(pageNumber, pageSize) {
            this.condition.pageNo = pageNumber;
            this.condition.pageSize = pageSize;
            //this.condition["API-TOKEN"] = this.$store.state.app.apiToken;
            this.tab_row = {};
            this.getOrganizationList();
            // this.getUserList(this.condition);
        },
        showDetail(id) {
            this.editShow = id;
        },
        DisableHandle(id) {
            let item = {},
                isFound = false;
            for (let i = 0; i < this.tab_row.data.length; i++) {
                if (this.tab_row.data[i].id == id) {
                    isFound = true;
                    this.CurrentIndex = i;
                    break;
                }
            }
            if (this.tab_row.data[this.CurrentIndex].areaStatus == "5") {
                //isUsed "areaStatus": "区域状态 如：1 正常，2 维修中，3建设中，4启用，5禁用(禁用的话区域下所有设备暂停推送数据)",
                this.messageText = "是否启用？";
                this.isUsedText = "启用";
            } else {
                this.messageText = "是否禁用？";
                this.isUsedText = "禁用";
            }
            this.messageTextShow = true;
            this.showDetailmask(id);
        },
        showDetailmask(id) {
            this.editShow = 0;
        },
        DetailHandle(id) {
            let item = {},
                isFound = false;
            for (let i = 0; i < this.tab_row.data.length; i++) {
                if (this.tab_row.data[i].id == id) {
                    isFound = true;
                    item = this.tab_row.data[i];
                    console.log(item);
                    break;
                }
            }
            console.log("DetailHandle");
            // console.log(item);
            if (isFound) {
                console.log(item);
                this.$router.push({
                    path: "/organization/edit",
                    query: {
                        id: id,
                        title: "机构详情",
                        item: item
                    }
                });
            }
        },
        mouseAct(value) {
            this.isusedShow = value;
            // console.log("mouseAct:" + this.isusedShow );
        },
        mouseAct1(value) {
            this.detailShow = value;
            // console.log("mouseAct:" + this.isusedShow );
        },
        getOrganizationList(state) {
            if (state != undefined) {
                if (this.Organ_Id == 0) {
                    //this.Organ_Id = this.$store.getters.getOrganizationId;
                    this.Organ_Id = getStore("organizationId") + "";
                    this.areaCode = getStore("organizationCode") + "";
                }
                this.condition = {
                    //"USER-ID":1,
                    areaCode: this.areaCode, //2,
                    areaTag: "机构",
                    pageNo: 1,
                    pageSize: 10
                };
            }
                    console.log("getOrganizationList");
            this.$store.dispatch("fetchMonitorAreaGet", this.condition).then(
                response => {
                    console.log("getOrganizationList");
                    console.log(this.condition);
                    console.log(response);
                    if (typeof response == "object" && isArray(response.data)) {
                        //去掉父级不符的机构数据
                        this.tab_row = response;
                        // for (let i = 0; i < this.tab_row.data.length; i++) {
                        //     //this.Organ_Id
                        //     // console.log(this.tab_row.data[i]);
                        //     let tmpId = this.tab_row.data[i].areaCode;
                        //     if (tmpId.indexOf(this.Organ_Id) != 0) {
                        //         //tmpId = tmpId.substr(0, tmpId.indexOf(this.Organ_Id) + this.Organ_Id.length);
                        //         console.log(this.tab_row.data[i]);
                        //         this.tab_row.data.splice(i, 1);
                        //     }
                        // }
                    } else {
                    }
                },
                error => {
                    console.log(error);
                    this.tab_row ={ data:[], };
                }
            );
        },
        updateisUsed(in_isUsed) {
            console.log("updateisUsed");
            let item = this.tab_row.data[this.CurrentIndex];
            let condition = {
                //"USER-ID":1,
                areaId: item.id,
                areaCode: item.areaCode,
                idName: item.idName,
                idNameSimple: item.idNameSimple,
                // // "isDeleted": true,
                areaBusiness: item.areaBusiness, //"1",
                // //"userId": this.$store.state.app.userid,
                parentId: item.parentId,
                // "pictureUrl": this.imageUrl,
                // "sysName": this.sys_name,
                platform: item.platform, //"ny",//"所属的应用系统平台，如：gy高邮，ny农业，jt金坛……",
                address: item.address, //"机构",
                city: item.city, //"机构",
                areaStatus: item.areaStatus == "4" ? "5" : "4" //"区域状态 如：1 正常，2 维修中，3建设中，4启用，5禁用(禁用的话区域下所有设备暂停推送数据)",
                //"orgCode"
                // "userCreate": 0,
                // "userId": "15,28",
                // // "userModified": 0,
                // "x": this.longitude,
                // "y": this.latitude
            };
            console.log(condition);

            this.$store.dispatch("modiOrganizationInfo", condition).then(
                response => {
                    this.tab_row = {};
                    this.getOrganizationList();
                },
                error => {
                    console.log("----");
                    console.log(error);
                }
            );
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import './index.styl';
    .org-button-top{
        position absolute;
        right :60px ;
        top: 30px;
    }
</style>