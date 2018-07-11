<template>
	<div class="areacont">
		<div class="area-content">
			<div class="area-content-top">
				<div class="area-content-title">地块管理</div>
				<div class="content-select">
					<!-- <base-select :opts="areaTypeList" ref="organTypeSelect" :placeholderStr="placeholderStr2" @disp-selectCallBack="selectTypeBack"></base-select> -->
					<sh-select v-model="areaType"
					    :opts="areaTypeList"
					    :placeholder="placeholderStr2"></sh-select>
				</div>
				<input class="content-input"
				    v-model='searchValue'
				    v-on:keyup.enter="areaSearch(searchValue)"
				    placeholder="请输入监测地块名称" />

				<sh-button @click='areaSearch(searchValue)'>查询</sh-button>
				<sh-button class='btn-add'
				    @click="addHandle">新增</sh-button>
			</div>
			<div class="content-table">
				<sh-table :columns="columns"
				    :data="tdatas"
				    @pageChange="pageChange"
				    @click-cell="clickCell"
				    :operate="true">
					<template slot="operate"
					    slot-scope="data">
						<div class="edit-tab">
							<i class="iconfont icon-icon_list_gengduo"
							    @click="showDetail(data.row.id)"></i>
							<ul class="edit-show"
							    v-show='editShow==data.row.id'>
								<li @click='detailHandle(data.row.id)'>
									<i class="iconfont icon-icon_list_shujufenxi"></i>
									<span>详情</span>
								</li>
								<li @click='editHandle(data.row.id)'>
									<i class="iconfont icon-icon_list_edit"></i>
									<span>编辑</span>
								</li>
								<li @click='noticeHandle(data.row.areaCode)'>
									<i class="iconfont icon-icon_daohang_shebeiguanli"></i>
									<span>设备</span>
								</li>
								<li @click='delectHandle(data.row.areaCode)'>
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
				<div class="showDetailmask"
				    @click="showDetailmask()"
				    v-show='editShow!==null'></div>
			</div>
			<v-messagebox v-show="showDelect"
			    @select-type="onDelectType"
			    :nobtnShow="true"
			    :content="contentMsg"
			    @sureHandel="sureHandel"></v-messagebox>
		</div>
		<sh-modal v-model="dialogVisible"
		    title="地块二维图">
			<div class="area-image-box">
				<img :src="imageUrl">
			</div>
		</sh-modal>
	</div>
</template>
<script>
import BaseSelect from '../../components/base-select.vue'
import BaseTable from '../../components/base-table.vue'
import BasePagination from '../../components/base-pagination.vue'
import ShTable from "../../components/sh-table";
import { mapGetters } from "vuex";
import ShSelect from "../../components/sh-select";
import VMessagebox from '@com/alert/message-box'
import ShModal from '@com/sh-ui/components/sh-modal'
import ShButton from "@com/sh-ui/components/sh-button";
export default {
	data() {
		let filterGetDateTime = this.$options.filters.filterGetDateTime
		return {
			dialogVisible: false,
			imageUrl: null,
			placeholderStr2: "请选择农业类型",
			searchValue: '',
			contentMsg: "是否确定删除？",
			showDelect: false,
			areadefaultype: "1",
			idCode: '',//暂存当前areacode
			areaType: '', //地块类型
			areaName: '',//地块名称
			areaList: [],
			organList: [],
			areaTypeList: [{ id: null, value: '所有农业类型' }],
			editShow: null,
			columns: [
				{ field: "id", title: "地块编号", width: 1 },
				{
					field: "idName",
					title: "地块名称",
					width: 1
				},
				{
					field: "address",
					title: "地块位置",
					width: 1,
					formatter(row) {
						return row.address.split("_").join("")
					}
				},
				{
					field: "qyert",
					title: "地块所在二维图",
					width: 1,
					formatter(row) {
						if (row.pictureUrl) {
							return "<span style='color:#39a3f4;cursor:pointer;'>查看二维图</span>";
						} else {
							return "<span style='color:#999999;cursor:pointer;'>暂未上传二维图</span>";
						}

					}
				},
				{ field: "areaTypeName", title: "农业类型", width: 1 },
				{
					field: "areaBusiness",
					title: "种植|养殖描述",
					width: 1
				},
				{
					field: "areaStatusName",
					title: "地块状态",
					width: 1
				},
				{
					field: "gmtModified",
					title: "状态更新时间",
					width: 1,
					formatter(row) {
						return filterGetDateTime(row.gmtModified);
					}
				}
			],
			tdatas: {},
			dataNull: false,
			totalPage: 0, // 记录总条数
			pageSize: 10, // 每页显示条数
			currentPage: 1, // 当前的页数
			pageNo: 1, // 当前的页数
			areaName: ''
		}
	},
	components: {
		BaseSelect,
		BaseTable,
		BasePagination,
		VMessagebox,
		ShTable,
		ShSelect,
		ShModal,
		ShButton
	},
	computed: {
		...mapGetters({
			organId: "getOrganId",
			organData: "getOrganData"
		})
	},
	methods: {
		clickCell(field, row, event) {
			if (field === "qyert") {
				if (row.pictureUrl) {
					this.dialogVisible = true;
					this.imageUrl = row.pictureUrl;
				}
			}
		},
		//操作选择
		showDetail(id) {
			this.editShow = id;
		},
		showDetailmask() {
			//debugger;
			this.editShow = null;
		},
		//选择农业类型

		organtype() {
			this.$store.dispatch('getTypeList').then((data) => {
				for (let i = 0; i < data.length; i++) {
					data[i].id = data[i].dictCode;
					data[i].value = data[i].dictCodeName;
				}
				data.unshift({ id: null, value: '所有农业类型' })
				this.areaTypeList = data;
			}, (error) => {
				console.log(error);
			});
		},
		//选择项目类型
		selectTypeBack(itemID) {

			this.dataArealist(1);
		},
		// 新增
		addHandle() {
			this.$router.push({
				path: '/area/add'
			})
		},
		// 查看
		detailHandle(code) {
			this.$router.push({
				path: '/area/detail',
				query: { id: code }
			})

		},
		// 编辑
		editHandle(code) {
			this.$router.push({
				path: '/area/edit',
				query: { id: code }
			})
		},
		//删除地块弹出窗
		onDelectType: function (type) {
			this.showDelect = type;
		},
		sureHandel() {
			this.$store.dispatch('deleteArea', {
				areaCode: this.idCode
			}).then((data) => {
				this.showDelect = false;
				this.editShow = null;
				this.dataArealist(1);
			}, (error) => {
				//alert('地块管理获取数据失败')
			});
		},
		delectHandle(id) {
			this.idCode = id;
			//确认删除
			this.$shConfirm("是否确认删除？", "提示信息", {
				callback: type => {
					if (type === "confirm") {
						this.$store.dispatch('deleteArea', {
							areaCode: this.idCode
						}).then((data) => {
							this.showDelect = false;
							this.editShow = null;
							this.dataArealist(1);
						}, (error) => {
							//alert('地块管理获取数据失败')
						});
					}
				}
			})

			//确认删除
		},
		//查询
		areaSearch(val) {
			this.areaName = val;
			this.dataArealist(1);
		},
		dataArealist(pageNo) {
			this.$store.dispatch('getAreaList', {
				idName: this.areaName,
				areaType: this.areaType,
				pageNo: pageNo || this.data.pageNo,
				rowNum: 10 || this.data.pageSize
			}).then((data) => {

				this.tdatas = data;


			}, (error) => {
				//alert('地块管理获取数据失败')
				this.tdatas = {};
			});
		},
		// 分页事件
		// 分页查询
		pageChange(pageNumber, pageSize) {

			this.dataArealist(pageNumber);
		},
		//设备列表
		noticeHandle(id) {
			this.$router.push({
				path: '/area/list',
				query: {
					id: id
				}
			})
		},
	},
	mounted() {
		//console.log(this.organId);
		//console.log(this.organData);
		//this.organtype();
		this.organtype()
		this.dataArealist(1);

	},
	watch: {
		// 监测当前页变化
		areaType() {
			this.areaName = '';
			this.searchValue = '';
			this.dataArealist(1);
		}

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

.areacont {
	padding: 20px;
}

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
	border: 1px solid #e1e6e9;
	padding: 30px;
	background-color: #fff;
	position: relative;

	.area-content-top {
		margin-top: -8px;
		margin-left: -10px;
		height: 36px;
		margin-bottom: 20px;
	}

	.area-content-title {
		color: #444;
		margin-top: 2px;
		margin-left: 10px;
		margin-right: 40px;
		line-height: 36px;
		float: left;
		font-size: 20px;
		font-weight: 800;
	}

	.content-select {
		float: left;
		height: 36px;
		margin-right: 10px;
	}

	.content-input {
		float: left;
		padding-left: 10px;
		margin-right: 20px;
		font-size: 14px;
		height: 32px;
		width: 200px;
		line-height: 32px;
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
		border-radius: 2px;
		text-align: center;
		line-height: 34px;
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
		margin-top: 28px;

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
		margin: 0px;
		position: absolute;
		width: 262px;
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
				cursor: pointer;
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

@media screen and (max-width: 1440px) {
	.area-content {
		padding: 30px;
		background-color: #fff;
		position: relative;

		.area-content-top {
			height: 40px;
		}

		.area-content-title {
			margin-top: 2px;
			color: #444;
			height: 36px;
			margin-left: 10px;
			margin-right: 40px;
			line-height: 34px;
			float: left;
			font-size: 20px;
		}

		.content-select {
			width: 150px;
			float: left;
			margin-right: 10px;
		}

		.content-input {
			float: left;
			padding-left: 10px;
			margin-right: 20px;
			font-size: 14px;
			height: 34px;
			width: 150px;
			border: solid 1px #dcdfe6;
			border-radius: 2px;
		}
	}
}

.area-image-box {
	width: 800px;
	height: 500px;
	overflow: auto;
}

.area-image-box img {
	border: none;
	margin: 0;
	padding: 0;
}
</style>
