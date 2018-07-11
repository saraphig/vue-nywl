<template>
  <section class="page" v-if="show">
    <div class="shade" @click.stop="broke()">
      <div class="bbox" @click.stop="noBroke()">
      	 <div class="tit"><span>设备列表</span> <i class="iconfont icon-htmal5icon21"  @click="broke()"></i>
        </div>
        <v-table :datalist="subdata" :tabTitle="tabTitle" :tabwidth="tabwidth" :tableSorting="true"  :sort="true" :param="param"  :pageTotal="subpageTotal" :pageNos="pageNo" @pageNo="pageNos"></v-table>
      </div>
    </div>
  </section>
</template>

<script>
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
    methods: {
      broke: function (e) {
//      console.log(this.id);
        this.show = false;
        this.$emit('status', this.show);
      },
      noBroke: function (e) {
        this.show = true;

      },
       getSubData(){
      		this.$store.dispatch('getSubDatas', {
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
					this.$emit('callback',  data.data);
			}, (error) => {
				alert('该区域下无设备^_^！')
				this.subdata=[];
			})

     },
     //当分页发生改变时出行请求数据
		pageNos(d) {
			this.pageNo = d
			this.getSubData()
		},


    },

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
    height: 90%;
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
