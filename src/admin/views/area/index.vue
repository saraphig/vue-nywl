<template>
	<div class="areacont">
		<div class="titlebg">
			<p class="title webfont">区域列表</p>
			<div class="searchBox">
				<input type="text" class="seach_input" v-model="searchval" placeholder="输入监测区域名称" @keyup.enter="search()" />
				<i class="seach_bott iconfont icon-sousuo" @click="search()"></i>
			</div>
		</div>

		<VmaskLayer v-if="maskShow==true" @status="status" :subpageTotal="subpageTotal" :subdata="subdata" :id="id" @callback="updateSubData"></VmaskLayer>
		<v-table :datalist="datalist" :tabTitle="tabTitle" :tabwidth="tabwidth" :pageTotal="pageTotal" :ooperate="true" :param="param" @checkboxlist="boxlist" :pageNos="pageNo" @pageNo="pageNos">
			<template slot="tableSlot" slot-scope="props">
				<span class="color0b82fd" @click="datasa(props.arr)">查看 </span>
			</template>
		</v-table>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import VTable from '@com/table';
	import eventBus from '@com/event-bus';
	import VmaskLayer from '../../components/maskLayer.vue';
	export default {
		data() {
			return {
				id: 1,
				searchval: '',
				maskShow: false,
				pageLen: 10, //一页展示的条数
				subpageLen: 10, //设备页一页展示条数
				pageTotal: 1, //总页数
				subpageTotal: 1,
				pageNo: 1, //当前页
				subdata: [], //子设备数据
				//			subdataConnect:'',
				datalist: [], //区域数据列表
				checkboxlists: [], // 返回复选框选中的值
				areaInfo: {}, //获取区域信息
				param: {}, // 向服务器传递参数
				tabTitle: {
					displayOrder: '序号',
					name: '监测区域名称',
					regionStatusProp: '维修状态',
					regionType: '类型',
					gmtCreate: '添加时间'

				}, //表头
				tabwidth: {
					displayOrder: "",
					name: "260",
					regionStatusProp: "",
					regionType: "",
					gmtCreate: ""
				}, //每列的宽度
			}
		},
		components: {
			VTable,
			VmaskLayer
		},
    created:{

    },
		methods: {
			getData() {
				this.$store.dispatch('fetchAreaList', {
					name: this.searchval,
					pageNo: this.pageNo,
					rowNum: this.pageLen,
          t: new Date().getTime() //时间戳，ie兼容
				}).then((data) => {
					if(data == '无符合条件记录') {
						alert('无搜索');
						this.datalist = [];
						this.pageTotal = 0;
					} else {
						//处理数据，使其适配table组件
						for(var i = 0; i < data.data.length; i++) {
							data.data[i].regionType = data.data[i].regionTypeProp.name == null ? '--' : data.data[i].regionTypeProp.name;
							data.data[i].regionStatusProp.type = data.data[i].regionStatusProp.type - 1;
						}
						this.pageTotal = Math.ceil(data.page.total / data.page.pageSize)
						this.datalist = data.data
					}

				}, (error) => {
					alert('区域管理获取数据失败')
				});
			},
			// 点击数据列表
			datasa(arr) {
				this.id = arr.id;
				this.$store.dispatch('getAdminSubDatas', {
					region: arr.id,
					pageNo: 1,
					pageSize: this.subpageLen
				}).then((data) => {
					this.maskShow = true;
					// console.log(data);
					// alert(data)
					if(data===''){
							this.subdata = [];
					}else{
								 for (var i=0;i<data.data.length;i++) {
									data.data[i].field='';
							if(data.data[i].fieldInfo.value==null||data.data[i].fieldInfo.unit==null){
									data.data[i].fieldInfo.value=''
									data.data[i].fieldInfo.unit=''
							}
							else if(data.data[i].fieldInfo.value==null&&data.data[i].fieldInfo.unit==null){
										data.data[i].fieldInfo.value=''
										data.data[i].fieldInfo.unit=''
							}else{

							}
							// console.log(data.data[i])
						data.data[i].field+=data.data[i].fieldInfo.value;
						data.data[i].field+=data.data[i].fieldInfo.unit;
					}
					// console.log(data.data)
					this.subdata = data.data;
					this.subpageTotal = Math.ceil(data.total / data.pageSize)
				}

				}, (error) => {
					alert('该区域下无设备^_^^_^！')
					this.subdata = [];
				})
			},
			updateSubData(data) {
				this.subdata = data;
			},
			search() {
        this.pageNo=1;
				this.getData();
			},
			//当分页发生改变时出行请求数据
			pageNos(d) {
				this.pageNo = d
				this.getData()
			},
			//获取复选框的数据
			boxlist(d) {
				this.checkboxlists = d
			},
			status: function(s) {
				this.maskShow = s;
			},
		},
		mounted() {
			this.getData();
		},
		watch: {

		},
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import "index.styl";
</style>
