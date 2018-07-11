<template>
	<div class="areacont">
		<div class="area-content">
			<div class="area-content-top">
				<div class="area-content-title">小程序用户管理</div>
				<input class="content-input"
				    v-model='weChatName'
				    v-on:keyup.enter="areaSearch()"
				    placeholder="请输入微信昵称" />
				<input class="content-input"
				    v-model='mobile'
				    v-on:keyup.enter="areaSearch()"
				    placeholder="请输入手机号码" />
				<!-- <div class="content-select">
					<base-select :opts="areaTypeList" ref="organTypeSelect" :placeholderStr="placeholderStr2" @disp-selectCallBack="selectTypeBack"></base-select>
					<base-select :opts="areaTypeList"  :placeholderStr="placeholderStr2" @disp-selectCallBack="selectTypeBack"></base-select> 
				</div> -->
			 <sh-button plain class=' btn-search'
               @click='areaSearch()'>查询</sh-button>
				    <sh-button class='btn-add' @click="addHandle">新增</sh-button>
			</div>
			<div class="content-table">
				<sh-table :columns="columns"
				    :data="tdatas"
				    @pageChange="pageChange"
				    :operate="false">
				</sh-table>
			</div>
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
export default {
	data() {
		let filterGetDateTime = this.$options.filters.filterGetDateTime
		return {
			searchName: '',
			searchPhone: '',
			placeholderStr2: '',
			contentMsg: "是否确定删除？",
			showDelect: false,
			areaTypeList: "",
			editShow: null,
			columns: [
				{ field: "userName", title: "用户名", width: 1 },
				{
					field: "mobile",
					title: "手机号",
					width: 1
				},
				{
					field: "weChatName",
					title: "微信昵称",
					width: 1
				},
				{
					field: "weChatMpName",
					title: "公众号昵称",
					width: 1
				},
				{ field: "weChatMaName", title: "小程序名称", width: 1 },
				{
					field: "weChatMaBindingDateTime",
					title: "绑定时间",
					width: 1,
					formatter(row) {
						return filterGetDateTime(row.weChatMaBindingDateTime);
					}
				},
				/*{
				  field: "areaStatusName",
				  title: "签到次数",
				  width: 1
				},
				{
				  field: "",
				  title: "最近签到时间",
				  width: 1,
				  formatter(row) {
					return filterGetDateTime(row.gmtModified);
				  }
				}*/
			],
			tdatas: {},
			dataNull: false,
			totalPage: 0, // 记录总条数
			pageSize: 10, // 每页显示条数
			currentPage: 1, // 当前的页数
			pageNo: 1, // 当前的页数
			weChatName: '',
			mobile: '',
			orgKey: 'org_92aa13c5c779'
		}
	},
	components: {
		BaseSelect,
		BaseTable,
		BasePagination,
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

		addHandle() {
			this.$router.push({
				path: '/smallprogram/smalladd'
			})

		},
		//查询
		areaSearch() {
			this.dataArealist(1);
		},
		dataArealist(pageNo) {
			this.tdatas = {};
			let areacode = localStorage.getItem("organizationCode")
			this.$store.dispatch('getsmallprogram', {
				weChatName: this.weChatName,
				mobile: this.mobile,
				areaCode: areacode,
				orgKey: this.orgKey,
				pageNo: pageNo || this.data.pageNo,
				rowNum: 10 || this.data.pageSize,

			}).then((data) => {
				this.tdatas = data;

			}, (error) => {
				//alert('地块管理获取数据失败')
				this.dataNull = true;
				this.tdatas = data;
			});
		},
		// 分页事件
		pageChange(pageNumber) {
			this.dataArealist(pageNumber);
		},

	},
	mounted() {
		//console.log(this.organId);
		//console.log(this.organData);
		//this.organtype();
		this.dataArealist(1);

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
	padding: 30px 20px;
	margin: 30px;
	background-color: #fff;
	position: relative;
	border: 1px solid #e1e6e9;

	.area-content-top {
		height: 40px;
	}

	.area-content-title {
		height: 36px;
		margin-left: 10px;
		margin-right: 40px;
		line-height: 36px;
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
		border: solid 1px #41a259;
		color: #fff;
		text-align: center;
		line-height: 34px;
		border-radius: 2px;
		background-color: #41a259;
		cursor: pointer;
	}

	.btn-search {
	}

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

	.content-pageination {
		position: absolute;
		right: 10px;
		margin-top: 10px;
	}

	.content-back {
		opacity: 0;
		width: 100%;

		.content-back-btn {
			margin: auto;
			margin-top: 100px;
			margin-bottom: 20px;
			height: 40px;
			width: 80px;
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
		position: absolute;
		width: 262px;
		height: 30px;
		padding: 10px;
		background: #fff;
		right: 0px;
		top: -17px;
		z-index: 9999;
		-moz-box-shadow: 0px 1px 16px #ccc;
		-webkit-box-shadow: 0px 1px 16px #ccc;
		box-shadow: 0px 1px 16px #ccc;
		box-shadow: 0px 1px 16px #ccc;
		-webkit-box-shadow: 0px 1px 16px #ccc;
		box-shadow: 0px 1px 16px #ccc;

		li {
			float: left;
			width: 19.8%;
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
		z-index: 999;
	}
}

@media screen and (max-width: 1440px) {
	.area-content {
		padding: 30px 20px;
		margin: 30px;
		background-color: #fff;
		position: relative;

		.area-content-top {
			height: 40px;
		}

		.area-content-title {
			height: 36px;
			margin-left: 10px;
			margin-right: 40px;
			line-height: 34px;
			float: left;
			font-size: 20px;
		}

		.content-select {
			width: 120px;
			float: left;
			margin-right: 10px;
		}

		.content-input {
			float: left;
			padding-left: 10px;
			margin-right: 20px;
			font-size: 14px;
			height: 34px;
			width: 120px;
			border: solid 1px #dcdfe6;
			border-radius: 5px;
		}
	}
}
</style>
