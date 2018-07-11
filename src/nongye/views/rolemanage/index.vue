<template>
	<div class="areacont">
		<div class="area-content">
			<div class="area-content-top">
				<div class="area-content-title">角色管理</div>
				<input class="content-input" v-model='username' v-on:keyup.enter="areaSearch(username)" placeholder="请输入角色名称" />
				<sh-button  class=' btn-search' @click='areaSearch(username)'>查询</sh-button>
				<sh-button class='btn-add' @click="addHandle">新增</sh-button>
			</div>
			<div class="content-table">
				<sh-table :columns="columns" :data="tdatas" @pageChange="pageChange" :operate="true">
					<template slot="operate" slot-scope="data">
						<div class="edit-tab" v-if='data.row.type!==1'>
							<i class="iconfont icon-icon_list_gengduo" @click="showDetail(data.row.userGroupId)"></i>
							<ul class="edit-show" v-show='editShow==data.row.userGroupId'>
								<li @click='edit(data.row.userGroupId,data.row.userGroupName,data.row.description)'>
									<i class="iconfont icon-icon_list_edit"></i>
									<span>编辑</span>
								</li>
								<li @click='delectHandle(data.row.userGroupId)'>
									<i class="iconfont icon-icon_list_delete"></i>
									<span>删除</span>
								</li>
								<li @click="showDetailmask()">
									<i class="iconfont icon-icon_close"></i>
								</li>
							</ul>

						</div>
					</template>
				</sh-table>
				<div class="showDetailmask" @click="showDetailmask()" v-show='editShow!==null'></div>
			</div>
			<v-messagebox v-show="showDelect" @select-type="onDelectType" :nobtnShow="true" :content="contentMsg" @sureHandel="sureHandel"></v-messagebox>
		</div>
	</div>
</template>
<script>
	import ShButton from "@com/sh-ui/components/sh-button";
	import BaseSelect from '../../components/base-select.vue'
	import BaseTable from '../../components/base-table.vue'
	import BasePagination from '../../components/base-pagination.vue'
	import ShTable from "../../components/sh-table";
	import { mapGetters } from "vuex";
	import VMessagebox from '@com/alert/message-box';
	import moment from 'moment'
	export default {
		data() {

			return {
				username: '',
				contentMsg: "是否确定删除？",
				showDelect: false,
				editShow: null,
				columns: [{
						field: "userGroupName",
						title: "角色名称",
						width: 1
					},
					{
						field: "gmtModified",
						title: "更新时间",
						width: 1,
						formatter(row) {
							return moment(row.gmtModified).format("YYYY-MM-DD HH:mm:ss");
						}
					},
				],
				tdatas: {},
				dataNull: false,
				totalPage: 0, // 记录总条数
				pageSize: 10, // 每页显示条数
				currentPage: 1, // 当前的页数
				pageNo: 1, // 当前的页数
				areaName: '',
				username: '',
				munCb: []
			}
		},
		components: {
			BaseSelect,
			BaseTable,
			BasePagination,
			VMessagebox,
			ShTable,
			ShButton
		},
		computed: {
			...mapGetters({
				organId: "getOrganId",
				organData: "getOrganData"
			})
		},
		methods: {
			//操作选择
			showDetail(id) {
				this.editShow = id;
			},
			showDetailmask() {
				this.editShow = null;
			},
			// 新增
			addHandle() {
				this.$router.push({
					path: '/rolemanage/roleadd'
				})
			},
			convertArray(array) {
				for(var i = 0; i < array.length; i++) {
					let item = array[i];
					this.munCb.push(item);
					if(item.childrens) {
						this.convertArray(item.childrens);
					}

				}
			},
			// 编辑
			edit(id, name, info) {
				let that = this;
				this.$router.push({
					path: '/rolemanage/roleedit',
					query: {
						id: id,
						name: name,
						info: info
					}
				});
				localStorage.setItem('userGroupId', id);
			},
			//查询
			areaSearch(val) {
				this.username = val;
				this.getroleList(1);
			},

			//删除地块弹出窗
			onDelectType: function(type) {
				this.showDelect = type;
			},
			sureHandel() {
				this.showDelect = false;
				this.$store.dispatch('deleteRole', {
					userGroupId: this.idCode
				}).then((data) => {

					if(data.code !== -1) {
						alert("删除成功")
						this.getroleList(1);
					} else {
						alert(data.msg)
					}
				}, (error) => {

				});
			},
			getroleList(pageNumber) {
				this.tdatas = {};
				this.$store.dispatch('getRoleList', {
					userGroupName: this.username,
					pageNo: pageNumber || this.data.pageNo,
					pageSize: 10,
				}).then((data) => {
					this.tdatas = data;
				}, (error) => {

				});
			},
			pageChange(pageNumber) {
				this.getroleList(pageNumber);
			},
			delectHandle(id) {
				this.idCode = id;
				//确认删除
				this.$shConfirm("是否确认删除？", "提示信息", {
					callback: type => {
						if(type === "confirm") {
							this.$store.dispatch('deleteRole', {
								userGroupId: this.idCode
							}).then((data) => {
								if(data.code !== -1) {
									alert("删除成功")
									this.getroleList(1);
								} else {
									alert(data.msg)
								}
							}, (error) => {

							});
						}
					}
				})

			}
		},
		mounted() {
			//console.log(this.organId);
			//console.log(this.organData);
			//this.organtype();
			this.getroleList(1);

		},
		watch: {
			// 监测当前页变化

		},
		filters: {
			address(address) {
				return address.split("-").join("");
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import 'index.styl';
	.area-head {
		width: 100%;
		height: 64px;
		background-color: white;
		position: relative;
		.cur-org {
			position: absolute;
			left: 45px;
			top: 24px;
		}
		.select {
			position: absolute;
			left: 140px;
			top: 12px;
		}
		.last-update-time {
			position: absolute;
			left: 400px;
			top: 24px;
			color: #CCCCCC;
		}
	}
	
	.select {
		position: absolute;
		left: 140px;
		top: 12px;
	}
	
	.last-update-time {
		position: absolute;
		left: 400px;
		top: 24px;
		color: #CCCCCC;
	}
	
	.area-tab {
		width: 100%;
		height: 50px;
		background-color: #F9F9F9;
		position: relative;
		.tab-url {
			position: absolute;
			left: 30px;
			top: 18px;
			padding-left: 5px;
			border-left: 5px solid #1abc9c;
			color: #999999;
			font-size: 14px;
		}
	}
	
	.area-content {
		border: 1px solid #e1e6e9;
		padding: 30px;
		margin: 20px;
		background-color: #fff;
		position: relative;
		border: 1px solid #e1e6e9;
		.area-content-top {
			margin-top: -7px;
			height: 48px;
		}
		.area-content-title {
			color: #444444;
			height: 34px;
			margin-right: 40px;
			line-height: 34px;
			float: left;
			font-size: 20px;
			font-weight: 800;
		}
		.content-select {
			float: left;
			height: 34px;
			margin-right: 10px;
		}
		.content-input {
			float: left;
			padding-left: 10px;
			margin-right: 20px;
			font-size: 14px;
			height: 32px;
			width: 200px;
			border: solid 1px #dcdfe6;
			border-radius: 0px;
		}
		.content-input::placeholder {
			color: #999999;
		}
		.content-input:focus {
			border: solid 1px #41a259;
		}
		.content-btn {
			float: left;
			font-size: 14px;
			height: 34px;
			width: 68px;
			border-radius: 2px;
			border: solid 1px #41a259;
			color: #fff;
			text-align: center;
			line-height: 34px;
			background-color: #41a259;
			cursor: pointer;
		}
		.btn-search {}
		.btn-add {
			float: right;
			margin-right: 0px;
		}
		.content-table {
			position: relative;
			margin-top: 20px;
			.text-center {
				text-align: center;
				font-size: 14px;
				div {
					padding-left: 0px;
				}
			}
		}
		.area-content {
			padding: 30px;
			margin: 20px;
			background-color: #fff;
			position: relative;
			border: 1px solid #e1e6e9;
			.area-content-top {
				margin-top: -9px;
				height: 48px;
			}
			.area-content-title {
				color: #444444;
				height: 34px;
				margin-right: 40px;
				line-height: 34px;
				float: left;
				font-size: 20px;
				font-weight: 800;
			}
			.content-select {
				float: left;
				height: 34px;
				margin-right: 10px;
			}
			.content-input {
				float: left;
				padding-left: 10px;
				margin-right: 20px;
				font-size: 14px;
				height: 32px;
				width: 200px;
				border: solid 1px #dcdfe6;
				border-radius: 5px;
				color: #fff;
				text-align: center;
				line-height: 38px;
				background-color: #1abc9c;
				cursor: pointer;
			}
		}
		.data-null {
			height: 150px;
			line-height: 150px;
			font-size: 24px;
			color: #888;
			text-align: center;
		}
		.edit-tab {
			position: relative;
			height: 100%;
		}
		.edit-show {
			margin: 0px;
			position: absolute;
			width: 150px;
			height: 30px;
			padding: 10px;
			background: #fff;
			right: 0px;
			top: -17px;
			z-index: 999;
			-moz-box-shadow: 0px 1px 16px #ccc;
			-webkit-box-shadow: 0px 1px 16px #ccc;
			box-shadow: 0px 1px 16px #ccc;
			box-shadow: 0px 1px 16px #ccc;
			-webkit-box-shadow: 0px 1px 16px #ccc;
			box-shadow: 0px 1px 16px #ccc;
			li {
				float: left;
				width: 33%;
				text-align: center;
				list-style: none;
				i {
					font-size: 24px;
					display: block;
				}
				span {
					margin-top: 3px;
					font-size: 12px;
					display: block;
					color: #999999;
				}
			}
			li:hover i {
				color: #41a259;
			}
			li:hover span {
				color: #41a259;
			}
			li:last-child {
				line-height: 36px;
				border-left: 1px solid #e5e6e7;
			}
		}
		.showDetailmask {
			position: fixed;
			top: 0px;
			left: 0px;
			width: 100%;
			height: 100%;
			z-index: 998;
		}
	}
</style>