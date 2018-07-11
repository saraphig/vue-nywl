<template>
  <section class="page" v-if="show">
    <div class="shade" @click.stop="broke()">
      <div class="bbox" @click.stop="noBroke()">
      	 <div class="tit"><span>设备列表</span> <i class="iconfont icon-htmal5icon21"  @click="broke()"></i>
        </div>
        <v-table :datalist="subdata" :tabTitle="tabTitle"  :tabwidth="tabwidth" :tableSorting="true" :param="param" :pageTotal="subpageTotal" :pageNos="pageNo" @pageNo="pageNoss">
		</v-table>
      </div>
    </div>
  </section>
</template>

<script>
  import VTable from './mytable';
  export default {
    name: 'VmaskLayer',
 props:['subdata','id','subpageTotal'],
    data() {
      return {
      	pageNo: 1, //当前页
      	pageLen: 10, //一页展示的条数
        show: true,
        param: {}, 					// 传递参数
        lenArr: [10, 50, 100], // 每页显示长度设置
        connectSta:'',//连接状态
        tabTitle: {
          entityKey: '设备编号',
          assertName: '设备名称',
          field: '当前值',
          qualityInfo: '连接状态',
          alarmInfo:'告警级别',
          updateTime: '监测时间'
        },	//表头
         tabwidth: {
					entityKey: "",
					assertName: "",
					field: "",
					property: "",
					alarmInfo: "",
					updateTime: "250"
				}, //每列的宽度
      }
    },
    components: {
      VTable
    },
    created(){
      this.getSubData();
    },
    methods: {
      broke: function (e) {
//      console.log(this.id);
        this.show = false;
        this.$emit('status', this.show);
//      console.log(this.subdata);
      },
      noBroke: function (e) {
        this.show = true;
				console.log(this.subpageTotal);
      },
      getSubData(){
      		this.$store.dispatch('getAdminSubDatas', {
				region: this.id,
				pageNo: this.pageNo,
				pageSize: this.pageLen
			}).then((data) => {
//				console.log(data);
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
						data.data[i].field+=data.data[i].fieldInfo.value;
            data.data[i].field+=data.data[i].fieldInfo.unit;
					}
					// console.log(data.data);
					this.$emit('callback',  data.data);
//				}

			}, (error) => {
//				alert('该区域下无设备^_^^_^！')
//				this.subdata=[];
				this.$emit('callback',  []);
			})

     },
     //当分页发生改变时出行请求数据
		pageNoss(d) {
			this.pageNo = d
			this.getSubData()
		},

    },
    mounted(){

    }
  }
</script>

<style scoped>
  .shade {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
  }

  .bbox {
    position: absolute;
    border-radius: 5px;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 80%;
    height: 91%;
    min-height: 550px;
    background: white;
    overflow: auto;
    margin: auto;
    color: black;
    z-index: 3;
  }
  .bbox>.tit{
  	width: 100%;
    height: 50px;
    background: #f5faff;
    line-height: 50px;
    padding: 0 20px 0 25px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-weight: 700;
    font-size: 20px;
  }
  .icon-htmal5icon21{
  	cursor: pointer;
  	float: right;
  }
 .bbox .box{
  	margin: 0 auto;
  }

</style>
