<!-- 表格分页组件 -->
<template>

	<div class="box">
		<table class="table table-hover table-bordered" cellpadding="0" cellspacing="0">
			<thead>
				<tr>
					<th width="70" v-if="check">
						<span class="checkcont"><input type="checkbox" name="" class="checkboxall" id="checkboxall" value="" @click="checkboxAll()" /><label for="checkboxall" :class="checkStatus=='radio'?'disabled':'' "></label></span>
					</th>
					<th width="100" v-if="tableSorting">序号</th>
					<th v-for="(val,key) in tabTitle" v-text="val" :width="tabwidth[key]"></th>
					<th v-if="operate">操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(data, index) in datalist" :key="data.id">
					<td v-if="check">
						<span class="checkcont"><input type="checkbox" name="" :id="'as'+data.id" class="checkbox" :value="data.id" @click="checkboxa(data.id,index)" /><label :for="'as'+data.id"></label></span>
					</td>
					<td v-if="tableSorting" v-text="((pageNo-1)*pageLen)+index+1"></td>
					<td v-for="(val,key) in tabTitle">
						<span v-if="key=='regionStatusProp' || key=='regionDeviceProp' || key=='property' || key=='alarmInfo'">
							<span style="color: #000;" v-if="data[key].type==0" v-text="data[key].name"></span>
	            <span style="color: #ff4955;" v-if="data[key].type==1" v-text="data[key].name"></span>
							<span style="color: #feb600;" v-if="data[key].type==2" v-text="data[key].name"></span>
							<span style="color: #66d202;" v-if="data[key].type==3" v-text="data[key].name"></span>
						</span>

						<span v-if=" key=='regionTypeProp'" v-text="data[key].name"></span>

						<span v-if="key=='qualityInfo'">
							<span style="color: #000;" v-if="data[key].status==1" v-text="data[key].name"></span>
							<span style="color: #ff4955;" v-if="data[key].status==0" v-text="data[key].name==null?'断开':data[key].name"></span>
						</span>

						<!--<span v-if="key!='regionStatus'" v-text="data[key]"></span>-->
						<div v-if="key!='regionStatusProp' && key!='regionDeviceProp' && key!='regionTypeProp' && key!='property' && key!='alarmInfo'&&key!='qualityInfo'" v-text="data[key]" :style="{width:tabwidth[key] + 'px'}"></div>
					</td>

					<td v-if="operate">
						<slot name="tableSlot" :arr="data"></slot>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="nodata" v-if="datalist.length==0">
			暂无数据！
		</div>
		<div class="v-page" v-if="datalist.length>0">
			<div class="page-total">
				共 <span v-text="pageTotal"></span> 页
			</div>
			<div class="boot-page" v-if="pageTotal>1">
				<a class="page-butt iconfont icon-jiantou2" href="javascript:void(0)" @click="onPrevClick()"></a>
				<a v-if="pageNo>1" attr-action="setWhat" href="javascript:void(0)" @click="onPageClick(1)">1</a>
				<span v-if="pageNo-4>1">...</span>
				<a href="javascript:void(0)" v-for="val in arrb" v-if="pageNo-val>1" @click="onPageClick(pageNo-val)">{{pageNo-val}}</a>
				<a class="active" href="javascript:void(0)">{{pageNo}}</a>
				<a href="javascript:void(0)" v-for="val in arra" v-if="pageNo+val<pageTotal" @click="onPageClick(pageNo+val)">{{pageNo+val}}</a>
				<span v-if="pageNo+4<pageTotal">...</span>
				<a v-if="pageNo<pageTotal" attr-action="setWhat" href="javascript:void(0)" @click="onPageClick(pageTotal)">{{pageTotal}}</a>
				<a class="page-butt iconfont icon-jiantou" href="javascript:void(0)" @click="onNextClick()"></a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'v-table',
		props: {
			// 表头
			tabTitle: {
				type: Object,
				default: {},
				required: true
			},
			// 每列的宽度
			tabwidth: {
				type: Object,
				default: {},
				required: true
			},
			// 总页数
			pageTotal: {
				type: Number,
				default: 1,
				required: true
			},
			// 一页显示多少条记录
			pageLen: {
				type: Number,
				default: 10
			},
			// 数据列表
			datalist: {
				type: Array,
				default: [],
				required: true
			},
			// 是否要显示checkbox控件列
			check: {
				type: Boolean,
				default: false
			},
			// 是否要显示序列号
			tableSorting: {
				type: Boolean,
				default: false
			},
			// 是否要显示操作列
			operate: {
				type: Boolean,
				default: false
			},
			// 复选框是否单选和多选(check：复选，radio：单选)
			checkStatus: {
				type: String,
				default: "check"
			},
			// 参数内容
			param: {
				type: Object,
				default: function() {
					return {}
				}
			},
			// 当前页码
			pageNos: {
				type: Number,
				default: 1,
				required: true
			}
		},
		data() {
			return {
				pageNo:this.pageNos,
				checkboxs: [], //存储选中多选框的值
				arra: [1, 2, 3], //分页循环（右边）
				arrb: [3, 2, 1], //分页循环（左边）
			}
		},
		methods: {
			// 点击全选复选框
			checkboxAll() {
				var all = document.getElementsByClassName('checkboxall');
				var one = document.getElementsByClassName('checkbox');
				if(all[0].checked == true) {
					this.checkboxs = [];
					for(var i = 0; i < one.length; i++) {
						one[i].checked = true;
						this.checkboxs.push(parseInt(one[i].value));
					}
				} else {
					this.checkboxs = [];
					for(var j = 0; j < one.length; j++) {
						one[j].checked = false;
					}
				}
				this.$emit('checkboxlist', this.checkboxs);
				//console.log(this.checkboxs)
			},
			// 点击单个复选框
      checkboxa (i,index) {
      	if(this.checkStatus=="check"){	//复选模式
	        if(this.checkboxs.indexOf(i)==-1){
	        	this.checkboxs.push(parseInt(i));
	        }else{
	        	this.checkboxs.splice(this.checkboxs.indexOf(i),1);
	        }
        }else if(this.checkStatus=="radio"){
        	var one = document.getElementsByClassName("checkbox");
					this.checkboxs=[]
					if(this.checkboxs.indexOf(i) == -1) {
						if(one[index].checked){
							for(var s = 0; s < one.length; s++) {
								one[s].checked = false;
							}
							one[index].checked = true;
							this.checkboxs.push(parseInt(i));
						}
					} else {
						this.checkboxs=[]
					}
        }
        if(this.checkboxs.length==0){
        	document.getElementsByClassName("checkboxall")[0].checked=false;
       	}
       // console.log(this.checkboxs)
        this.$emit("checkboxlist", this.checkboxs);
      },
			// 点击页码刷新数据
			onPageClick(p) {
				this.pageNo = p
			},
			// 上一页
			onPrevClick() {
				if(this.pageNo > 1) {
					this.pageNo = --this.pageNo
				}
			},
			// 下一页
			onNextClick() {
				if(this.pageNo < this.pageTotal) {
					this.pageNo = ++this.pageNo
				}
			},
		},
		mounted() {
			if(this.checkStatus=="radio"){
				document.getElementById('checkboxall').disabled=true
			}
		},
		watch: {
			pageNos (){
				this.pageNo=this.pageNos
			},
			// 监测当前页变化
			pageNo (val) {
				this.$emit('pageNo', this.pageNo);
			},
			datalist (){
				var one = document.getElementsByClassName('checkbox');
				for(var s = 0; s < one.length; s++) {
					one[s].checked = false;
				}
				this.checkboxs.length=0
			}
		},
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
a
	text-decoration: none;
.color0b82fd
	color: #0b82fd;
	cursor: pointer;
.colorff4955
	color: #ff4955;
.box
	margin: 30px auto;
	min-height: 690px;
	.table
		border: none;
		background: #fff;
		width: 100%;
		color: #313131;
		font-size: 18px;
		text-align: center;
 	tr:nth-of-type(odd)
		background: #f5faff;
	th
		height: 68px;
		border-bottom: 2px solid #f0f0f0;
		background: #fff;
	tr:hover
		background: #f0f0f0;
	td
		padding: 0 6px;
		height: 62px;
		div{
			line-height: 60px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
.nodata
	height: 600px;
	line-height: 600px;
	text-align: center;
	color: #999;
	background: #fff;
	font-size: 24px;
.v-page
	height: 90px;
	line-height: 90px;
	text-align: right;
	background: #fff;
	border-top: 2px solid #f0f0f0;
	overflow: hidden;
	color: #313131;
	font-size: 14px;
	padding-right: 60px;
	.page-total,.boot-page
		display: inline-block;
	.page-total
		margin-right: 10px;
	.boot-page
		top: 8px;
		position: relative;
		a
			display: inline-block;
			width: 30px;
			height: 30px;
			margin-left: 5px;
			text-align: center;
			line-height: 30px;
			border: 1px solid #b1b4b6;
			color: #333;
			float: left;
		span
			float: left;
			line-height: 32px;
			margin-left: 5px;
		a.active
			background: #0b82fd;
			border-color: #0b82fd;
			color: #fff;
		a.page-butt
			font-size: 26px;
			font-weight: bold;

span.checkcont
	position: relative;
	input
		display: none;
	input[type=checkbox]:checked+label:after
		border: none;
		background: url(icoch.png) no-repeat;
		background-size:100% 100%;
	label
		cursor: pointer;
		position: relative;
		top: 3px;
		width: 25px;
		height: 25px;
	label::after
		content: '';
		width: 22px;
		height: 22px;
		display: inline-block;
		border: 2px solid #000;
		border-radius: 3px;
		box-sizing: border-box;
	label.disabled
		cursor: not-allowed;
	label.disabled::after
		border: 2px solid #ddd;

</style>
