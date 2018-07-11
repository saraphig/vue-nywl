<!--
	组件名称：表格组件(本组件仅统一了表格的基础样式，对表格结构并无定义)
	作者：hzp
	
	参数格式：
	@props
		无
	@events
		无	
	@ref
		无
	
	用法：通过slot引入子模块，可开放式的制定表格的格式，基础格式与table原生组件相同，可参考本例中的注释代码。
-->
<template>
	<div class="base-table">
		<!--外部嵌套-->
		<table cellpadding="0" cellspacing="0" border="0">
			<!--定义每列比例-->
			<slot name="slotColgroup"></slot>
			<!--定义表格标题-->
			<slot name="slotThead"></slot>
			<!--展示表格数据-->
			<tbody>
				<slot name="slotContent"></slot>
				<slot name="slotNoData"></slot>
			</tbody>
		</table>
		<!--内部源码-->
		<!--<table cellpadding="0" cellspacing="0" border="0">
			<colgroup>
				<col width="1" />
				<col width="1" />
				<col width="1" />
				<col width="1" />
				<col width="1" />
				<col width="1" />
				<col width="3" />
			</colgroup>
			<thead>
				<tr>
					<th colspan="1" rowspan="3">
						<div>日期</div>
					</th>
					<th colspan="6" rowspan="1">
						<div>配送信息</div>
					</th>
				</tr>
				<tr>
					<th colspan="1" rowspan="2">
						<div>姓名</div>
					</th>
					<th colspan="5" rowspan="1">
						<div>位置</div>
					</th>
				</tr>
				<tr>
					<th colspan="1" rowspan="1">
						<div>省份</div>
					</th>
					<th colspan="1" rowspan="1">
						<div>市区</div>
					</th>
					<th colspan="1" rowspan="1">
						<div>地址</div>
					</th>
					<th colspan="1" rowspan="1">
						<div>邮编</div>
					</th>
					<th colspan="1" rowspan="1">
						<div>操作</div>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<div>2016-05-03</div>
					</td>
					<td>
						<div>王小虎</div>
					</td>
					<td>
						<div>上海</div>
					</td>
					<td>
						<div>普陀区</div>
					</td>
					<td>
						<div>上海市普陀区金沙江路 1518 弄</div>
					</td>
					<td>
						<div>200333</div>
					</td>
					<td>
						<div>
							<button type="button" class="tbtn">
								<span>查看</span>
							</button>
							<button type="button" class="tbtn">
								<span>编辑</span>
							</button>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div>2016-05-03</div>
					</td>
					<td>
						<div>王小虎</div>
					</td>
					<td>
						<div>上海</div>
					</td>
					<td>
						<div>普陀区</div>
					</td>
					<td>
						<div>上海市普陀区金沙江路 1518 弄</div>
					</td>
					<td>
						<div>200333</div>
					</td>
					<td>
						<div>
							<button type="button" class="tbtn">
								<span>查看</span>
							</button>
							<button type="button" class="tbtn">
								<span>编辑</span>
							</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>-->
	</div>
</template>

<script>
	export default {
		name: "BaseTable",
		props: {
			twidth: {
				type: Number,
				default: 0
			}
		},
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.base-table {
		width: 100%;
		overflow: auto;
		padding-bottom: 10px;
		table {
			width: 100%;
			padding-left: 10px;
			padding-right: 10px;
			table-layout: fixed;
			border-collapse: separate;
			colgroup {
				col {
					display: table-column;
				}
			}
			thead {
				color: #909399;
				font-weight: 500;
				text-align: left;
				tr {
					display: table-row;
					vertical-align: inherit;
					border-color: inherit;
					th {
						background-color: #f1f7fa;
						border-bottom: 1px solid rgba(209, 216, 220, 0.6);
						div {
							padding-top: 10px;
							padding-bottom: 10px;
							padding-left: 10px;
							font-size: 14px;
							color: #666666;
						}
					}
				}
			}
			tbody {
				font-size: 14px;
				color: #444444;
				display: table-row-group;
				vertical-align: middle;
				border-color: inherit;
				border-collapse: separate;
				tr {
					background-color: white;
					display: table-row;
					vertical-align: inherit;
					border-color: inherit;
					td {
						border-bottom: 1px solid #ebeef5;
						padding: 5px 0;
						min-width: 0;
						box-sizing: border-box;
						text-overflow: ellipsis;
						vertical-align: middle;
						position: relative;
						div {
							padding-left: 10px;
							box-sizing: border-box;
							white-space: normal;
							word-break: break-all;
							line-height: 23px;
							padding-right: 10px;
							overflow: hidden;
							text-overflow: ellipsis;
							display: block;
						}
					}
				}
				tr:hover {
					background-color: #fafcfd;
				}
			}
		}
		.tbtn {
			margin-left: 10px;
			padding-left: 0;
			padding-right: 0;
			border-color: transparent;
			display: inline-block;
			line-height: 1;
			white-space: nowrap;
			cursor: pointer;
			background: transparent;
			color: #409EFF;
			text-align: center;
			box-sizing: border-box;
			outline: 0;
			-webkit-transition: .1s;
			transition: .1s;
			font-size: 16px;
		}
		.tbtn:hover {
			color: #72B8FF;
		}
	}
</style>