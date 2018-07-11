<template>
	<!-- <div class="user-module"> -->
	<div class="main-container">
		<v-messagebox v-show="messageTextShow" @select-type="onSelectType" :content="messageText" :nobtnShow="true" :okbtn="isUsedText"></v-messagebox>
		<sh-modal v-model="dialogVisible" title="告警详情">
			<template slot="footer">
				<sh-button plain @click="dialogVisible = false">关闭</sh-button>
			</template>
		</sh-modal>
		<div class="title-container">
			用户管理
			<input name="user_name" id="user_name" class="input-search input-first" placeholder="请输入用户姓名" v-model="user_name" maxlength="64">
			<input name="mobile" id="mobile" class="input-search input-fix" placeholder="请输入手机号" v-model="mobile" maxlength="24">
			<div id="searchUserState" class="input-box" @mouseenter="statMouse = true" @mouseleave="statMouse = false" :style="statlst_border">
				<input @click.stop="showStatlst" name="user_state" id="user_state" class="input-ins" placeholder="请选择人员状态" v-model="user_state" readonly>
				<i class="iconfont icon-icon_jiantou_xiazhankai" @click.stop="showStatlst"></i>
				<ul v-show='statlstShow' class="statlst-ul">
					<li v-for='(item,index) in user_state_list' @click="select_user_state(item)">{{ item.name }}</li>
				</ul>
			</div>
			<div id="searchUserRole" class="input-box" @mouseenter="roleMouse = true" @mouseleave="roleMouse = false" :style="rolelst_border">
				<input @click.stop="showRolelst" name="user_role" id="user_role" class="input-ins" placeholder="请选择所属角色" v-model="user_role" readonly>
				<i class="iconfont icon-icon_jiantou_xiazhankai" @click.stop="showRolelst"></i>
				<ul v-show='rolelstShow' class="statlst-ul">
					<li v-for='(item,index) in user_role_list' @click="select_user_role(item)" :title="item.title">{{ item.name }}</li>
				</ul>
			</div>
            <sh-button  class="btn-search" @click="searchUser" @keyup.enter="searchUser">查询</sh-button>
            <sh-button class="btn-adduser" @click="addUser">新增</sh-button>
			
		</div>
		<div class="table-container">
			<sh-table id="table-list-container" :columns="tab_columns" :data="tab_row" @pageChange="pageChange" :operate="true">
				<template slot="operate" slot-scope="data">
					<div class="edit-tab">
						<i class="iconfont icon-icon_list_gengduo" @click="showDetail(data.row.id)"></i>
						<ul class="edit-show" v-show='editShow==data.row.id'>
							<li @click='DisableHandle(data.row.id,data.row.groupIds)' @mouseenter="mouseAct(true)" @mouseleave="mouseAct(false)">
								<i v-if='data.row.used' class="iconfont icon-icon_list_jinyong" :style="showGreen"></i>
								<i v-else class="iconfont icon-icons_list_qiyong" :style="showGreen"></i>
								<span v-if='data.row.used' :style="showGreen">禁用</span>
								<span v-else :style="showGreen">启用</span>
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

			<!-- <div class="table-container">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <thead>
                <tr class="table-header">
                    <th class="table-column" v-for="(item,index) in tab_columns" :style="tab_width(index)">{{ item.name }}</th>
                </tr>
                </thead>
                <tr class="table-body" v-for="(item,index) in tab_row">
                    <td class="table-row" v-for="(row,idx) in item" :style="tab_width(idx,index)" @click="rowClick(idx,index)">
                        {{ row.value }}
                    </td> 
                    <td class="handle-row" :style="tab_width(tab_columns.length - 1)">
                        <i class="iconfont icon-icon_list_gengduo" @click="showDetail(row)"></i>
                        <ul class="edit-show">
		            	<li @click='disabledHandle(row)'> 
		            		<i class="iconfont icon-icon_tianqi_wushuju" ></i>
		            		<span>禁用</span>
		            	</li>
		            	<li  @click='detailsHandle(row)'>
		            		<i class="iconfont icon-icon_daohang_gongdanguanli"></i>
		            		<span>详情</span>
		            	</li>
		            	<li @click="showDetailmask()">
		            		<i class="iconfont icon-icon_close"></i>
		            	</li>
		            </ul>
                    </td>                
                </tr>
            </table> -->
			<!-- <div class="page-info-container">
                <div class="page-info-box">
                    <div class="page-info">
                        共14页/156条数据
                    </div>
                    <i class="page-iconfont iconfont icon-icon_jiantou_zuoqiehuan"></i>
                    <div class="page-number">
                        1
                    </div>
                    <div class="page-number">
                        2
                    </div>
                    <div class="page-number">
                        3
                    </div>
                    <i class="page-iconfont iconfont icon-icon_list_gengduo"></i>
                    <div class="page-number">
                        10
                    </div>
                    <i class="page-iconfont iconfont icon-icon_jiantou_youqiehuan"></i>
                </div>
            </div> -->
		</div>

	</div>
	<!-- </div> -->
</template>
<script>
	import BaseSelect from '../../components/base-select.vue'
	import BaseTable from '../../components/base-table.vue'
	import ShButton from "@com/sh-ui/components/sh-button";
	import ShModal from '@com/sh-ui/components/sh-modal'
	import BasePagination from '../../components/base-pagination.vue'
	import ShTable from "../../components/sh-table";
	import { mapGetters } from "vuex";
	import VMessagebox from '@com/alert/message-box'
	import { documentClick, isArray, cutStr, strlen } from "@lib/js/mUtils";

	export default {
		name: "user-list",
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
				dialogVisible: false,
				messageTextShow: false,
				messageText: "",
				totalPage: 0, // 记录总条数 total
				pageSize: 10, // 每页显示条数 pageSize
				currentPage: 1, // 当前的页数
				pageNo: 1, // 当前的页数 pageNo
				editShow: 0,
				isUsedText: "禁用",
				isusedShow: false,
				detailShow: false,

				user_name: "", //用户姓名
				user_state: "", //人员状态
				user_role: "", //所属角色
				user_role_id: 0,
				mobile: "", //手机号
				statlstShow: false,
				statMouse: false,
				condition: {
					// userName:"",
					// isUsed:1,
					// pageNo
					// pageSize
					// telephone
					// roleNames
				},
				user_state_list: [{
						name: "所有人员状态",
						value: ""
					},
					{
						name: "启用",
						value: "1"
					},
					{
						name: "禁用",
						value: "0"
					},
				],
				rolelstShow: false,
				roleMouse: false,
				user_role_list: [
					// { name:"技术", value:"0" },
					// { name:"管理", value:"1" },
					// { name:"销售", value:"2" },
				],
				tab_columns: [

					{
						field: "userName",
						title: "用户姓名",
						width: 1,
						formatter(row) {
							if(row.userName && row.userName.length > 8) {
								//return row.userName.substr(0,8) + "...";
								return "<span title='" + row.userName + "'>" + row.userName.substr(0, 8) + "...</span>";
							} else {
								if(row.userName == undefined) row.userName = "";
								return "<span title='" + row.userName + "'>" + row.userName + "</span>"
								//return row.userName
							}
						}
					},
					{
						field: "telephone",
						title: "手机号码",
						width: 1,
						formatter(row) {
							if(row.telephone && row.telephone.length > 24) {
								return row.telephone.substr(0, 12) + "...";
							} else {
								if(row.telephone == undefined) row.telephone = "";
								return row.telephone
							}
						}
					},
					{
						field: "wxUser.weChatName",
						title: "微信昵称",
						width: 1,
						formatter(row) {
							if(row.wxUser == null) {
								return '--'
							} else {
								return row.wxUser.weChatName
							}
						}
					},
					{
						field: "wxUser.weChatMpName",
						title: "公众号昵称",
						width: 1,
						formatter(row) {
							if(row.wxUser == null) {
								return '--'
							} else {
								return row.wxUser.weChatMpName
							}
						}
					},
					{
						field: "wxUser.weChatMaName",
						title: "小程序名称",
						width: 1,
						formatter(row) {
							if(row.wxUser == null) {
								return '--'
							} else {
								return row.wxUser.weChatMaName
							}
						}
					},
					{
						field: "roleNames",
						title: "所属角色",
						width: 1,
						formatter(row) {
							if(row.roleNames && row.roleNames.length > 24) {
								return "<span title='" + row.roleNames + "'>" + row.roleNames.substr(0, 24) + "...</span>";
							} else {
								if(row.roleNames == undefined) row.roleNames = "";
								return "<span title='" + row.roleNames + "'>" + row.roleNames + "</span>"
							}
						}
					},
					{
						field: "used",
						title: "人员状态",
						width: 1,
						formatter(row) {
							return(row.used ? "<span style='color:#5db7ff' title='' >启用</span>" : "<span style='color:#ff5560' title=''>禁用</span>");
						}
					},
					// {
					//   field: "gmtModified",
					//   title: "更新时间",
					//   width: 1,
					//   formatter(row) {
					//     return filterGetDateTime(row.gmtModified);
					//   }
					// },
				],
				tab_row: {
					pageNo: 1,
					pageSize: 10, //pageSize
					pageTotal: 2, //total
					total: 20, //total
					data: [{
							id: 1,
							mobile: "13656007719",
							name: "智慧农业",
							role: "技术",
							logincount: "29",
							state: "启用",
							option: "...",
						},
						{
							id: 2,
							mobile: "13656007719",
							name: "智慧农业",
							role: "技术",
							logincount: "29",
							state: "启用",
							option: "...",
						},
					]
				},
			}
		},
		computed: {
			statlst_border() {
				return {
					border: (this.statMouse ? '1px solid #41a259' : (this.statlstShow ? '1px solid #41a259' : '1px solid #e3e8ea'))
				}
			},
			rolelst_border() {
				return {
					border: (this.roleMouse ? '1px solid #41a259' : (this.rolelstShow ? '1px solid #41a259' : '1px solid #e3e8ea'))
				}
			},
			showGreen() {
				// console.log("showGreen:" + this.isusedShow );
				if(this.isusedShow) {
					return {
						color: "#41a259"
					}
				} else {
					return {
						color: "#999999"
					}
				}
			},
			showGreen1() {
				// console.log("showGreen:" + this.detailShow );
				if(this.detailShow) {
					return {
						color: "#41a259"
					}
				} else {
					return {
						color: "#999999"
					}
				}
			},
		},
		mounted() { //
			documentClick((event) => {
				let selfdiv = document.getElementById("searchUserRole");
				if(selfdiv) {
					if(!selfdiv.contains(event.target)) { //判断点击到了id以外的区域
						this.rolelstShow = false;
					};
				};
				selfdiv = document.getElementById("searchUserState");
				if(selfdiv) {
					if(!selfdiv.contains(event.target)) { //判断点击到了id以外的区域
						this.statlstShow = false;
					};
				};

				selfdiv = document.getElementById("table-list-container");
				console.log(selfdiv);
				console.log("table-list-container");
				if(selfdiv) {
					console.log("table-list-container");
					console.log(selfdiv);
					if(!selfdiv.contains(event.target)) { //判断点击到了id以外的区域
						this.editShow = 0;
					};
				};
				// let selfarr = document.getElementsByClassName("edit-show");
				// if (selfarr.length > 0) {
				//     console.log(selfarr);
				//     let count = 0;
				//     for (let i  = 0; i < selfarr.length; i++) {
				//         if (!selfarr[i].contains(event.target)) {//判断点击到了id以外的区域
				//             count ++;
				//         };
				//     };
				//     console.log(count);
				//     //if (count >= selfdiv.length) this.editShow = 0;

				// };
			});
			this.bodyKeyup = (e) => {
				// console.log(e);
				if(e.keyCode === 13) { // && e.target === document.body
					console.log("searchUser");
					this.searchUser();
				}
			}
			document.addEventListener('keyup', this.bodyKeyup, false);

			this.tab_row = {};
			this.getUserList();
			this.getRoleList();
		},
		beforeDestroy() {
			document.removeEventListener('keyup', this.bodyKeyup)
		},
		watch: {},
		methods: {
			mouseAct(value) {
				this.isusedShow = value;
				// console.log("mouseAct:" + this.isusedShow );
			},
			mouseAct1(value) {
				this.detailShow = value;
				// console.log("mouseAct:" + this.isusedShow );
			},
			showStatlst() {
				this.statlstShow = !this.statlstShow;
				if(this.statlstShow) {
					this.rolelstShow = false;
				};
			},
			showRolelst() {
				this.rolelstShow = !this.rolelstShow;
				if(this.rolelstShow) {
					this.statlstShow = false;
				};
			},
			onSelectType(type) {
				console.log(type);
				this.messageTextShow = false;
				if(type) {
					this.updateisUsed(false);
				};
			},
			pageChange(pageNumber, pageSize) {
				this.condition.pageNo = pageNumber;
				this.condition.pageSize = pageSize;
				//this.condition["API-TOKEN"] = this.$store.state.app.apiToken;
				this.tab_row = {};
				this.getUserList(this.condition);
			},
			showDetail(id) {
				this.editShow = id;
			},
			DisableHandle(id,groupid) {
               this.editShow = id;
				let item = {},
					isFound = false;
				for(let i = 0; i < this.tab_row.data.length; i++) {
					if(this.tab_row.data[i].id == id) {
						isFound = true;
						this.CurrentIndex = i;
						break;
					}
				}
				if(this.tab_row.data[this.CurrentIndex].used) {
					this.messageText = "是否禁用？";
					this.isUsedText = "禁用";
				} else {
					this.messageText = "是否启用？";
					this.isUsedText = "启用";
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
				for(let i = 0; i < this.tab_row.data.length; i++) {
					if(this.tab_row.data[i].id == id) {
						isFound = true;
						item = this.tab_row.data[i];
						console.log(item);
						break;
					}
				}
				console.log("DetailHandle");
				console.log(item);
				if(isFound) {
					console.log(item);
					this.$router.push({
						path: '/user/add',
						query: {
							id: id,
							title: "用户详情",
							item: item
						}
					});
				};
			},
			select_user_state(item) {
				this.statlstShow = false;
				this.user_state = item.name;
				if(item.value != "") {
					this.condition.isUsed = item.value;
				} else {
					delete this.condition.isUsed;
					console.log(this.condition);
				};
				this.searchUser();
			},
			select_user_role(item) {
				this.rolelstShow = false;
				this.user_role = item.name;
				if(item.value != "") {
					this.condition.roleNames = item.title;
				} else {
					delete this.condition.roleNames;
					console.log(this.condition);
				};
				this.searchUser();
				//this.condition.userGroupId = item.value;
			},
			tab_width(index, index_1) {
				//console.log(index + "," + index_1)
				if(index_1 != undefined && index_1 === this.tab_row.length - 1) {
					let reswidth = this.tab_columns[index].width;
					//if (reswidth != ""){
					return {
						width: reswidth,
						"border-bottom": "1px solid #e3e8ea"
					}
					//};
				} else {
					let reswidth = this.tab_columns[index].width;
					//if (reswidth != ""){
					return {
						width: reswidth
					}
					//};
				}
			},

			searchUser() {
				if(this.user_name != "") {
					this.condition.userName = this.user_name;
				} else {
					delete this.condition.userName;
				};
				if(this.mobile != "") {
					this.condition.telephone = this.mobile;
				} else {
					delete this.condition.telephone;
				};
				// if (this.user_state != "") { this.condition.isUsed = this.user_state; };
				// if (this.user_role != "") { this.condition.userGroupId = this.user_role; };
				this.condition.pageNo = 1;
				this.condition.pageSize = 10;
				//this.condition["API-TOKEN"] = this.$store.state.app.apiToken;
				this.tab_row = {};
				this.getUserList(this.condition);
			},
			addUser() {
				this.$router.push({
					path: '/user/add',
					query: {
						id: "",
						title: "新增用户",
					}
				})
			},
			getRoleList(condition) {
				if(condition == undefined) { //user_role_list name value
					console.log(this.$store.state.app);
					condition = {
						"USER-ID": 1, //this.$store.state.app.userid,
						//userGroupName:"",
						pageNo: 1,
						pageSize: 100
					}
				};
				console.log("getRoleList");
				console.log(condition);
				this.$store.dispatch("getRoleList", condition).then(
					response => {
						console.log("getRoleList response");
						console.log(response);
						if(isArray(response.data)) { //userGroupId: 10, userGroupName: "苏南管理员",
							this.user_role_list = response.data.map(function(item) {
								//console.log(item);
								let userGroupName = item.userGroupName;
								if(strlen(userGroupName) > 16) {
									//console.log(strlen(item.userGroupName));
									userGroupName = cutStr(userGroupName, 16) + " ...";
									//console.log(item.userGroupName);
								};
								return {
									name: userGroupName,
									value: item.userGroupId,
									title: item.userGroupName
								}
							});
							this.user_role_list.unshift({
								name: "所有人员角色",
								value: "",
								title: "所有人员角色"
							});

						}
					},
					error => {
						console.log(
							"[getRoleList] error:%c" + error,
							"color:red"
						);
					});
			},
			getUserList(condition) {
				if(condition == undefined) {
					this.condition = {
						//"API-TOKEN": this.$store.state.app.apiToken,
						pageNo: 1,
						pageSize: 10,
						// telephone:"",
						// isUsed:1, //状态 启用1 禁用 0
						// userName:"",
						// roleNames:"",//角色
						//plat:1,
					}
					condition = this.condition;
				};
				console.log("getUserList");
				console.log(condition);
				this.$store.dispatch("getuserall", condition).then(
					response => {
						console.log("getUserList response");
						console.log(response);
						this.tab_row = response;
					},
					error => {
						console.log(
							"[getUserList] error:%c" + error,
							"color:red"
						);
					});
			},
			updateisUsed(in_isUsed) {
				let item = this.tab_row.data[this.CurrentIndex];
      
				let condition = {
					//"API-TOKEN": this.$store.state.app.apiToken,
					email: this.email,
					groupIds: item.groupIds, //"1,2",
					id: item.id,
					isUsed: !item.used, //in_isUsed, //取反
					remark: item.remark,
					sexName: item.sexName,
					telephone: item.telephone,
					userName: item.userName
				}
				console.log(condition);
				this.$store.dispatch("updateUserInfo", condition).then(
					response => {
						console.log("updateUserInfo response");
						console.log(response);
						this.tab_row = {};
						this.getUserList(this.condition);
					},
					error => {
						console.log(
							"[updateUserInfo] error:%c" + error,
							"color:red"
						);
					});
			},
		}

	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import './index.styl';
</style>