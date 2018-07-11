<template>

  <div class="area">
    <div class="area-box">
      <div class="area-header">
        <div class="area-header-box">
          <div class="area-header-title">设备详细视图</div>
        </div>
      </div>

      <div class="area-content">
        <div class="area-group-title">基础信息:</div>
        <sh-row class="sh-form sh-from-font5 area-form" :gutter="20">
           <sh-table :columns="columns" :data="tdatas" @pageChange="pageChange">
            </sh-table>
        </sh-row>
        <div class="area-group-title">位置信息</div>
        <sh-row class="sh-form sh-from-font5 area-form" :gutter="20">
          <sh-col :span="12" class="sh-from-font8">
            <label class="sh-form-label ">所在机构名称:</label>
            <div class="sh-form-text">
              <sh-textbox></sh-textbox>
            </div>
          </sh-col>
          <sh-col :span="12" class="sh-from-font8">
            <label class="sh-form-label">所在地块编号:</label>
            <div class="sh-form-text">
              <sh-textbox></sh-textbox>
            </div>
          </sh-col>
          <sh-col :span="12" class="sh-from-font8">
            <label class="sh-form-label">所在地块名称:</label>
            <div class="sh-form-text">
              <sh-textbox></sh-textbox>
            </div>
          </sh-col>
          <sh-col :span="24" class="sh-from-font10">
            <label class="sh-form-label">二维平面位置信息图</label>
          </sh-col>
          <sh-col :span="24" class="sh-from-font8">
            <div class="img-show">
              <img src="#">
            </div>
          </sh-col>
        </sh-row>
      </div>

    </div>
  </div>


</template>

<script>
import ShButton from "@com/sh-ui/components/sh-button";
import ShRow from "@com/sh-ui/components/sh-row";
import ShCol from "@com/sh-ui/components/sh-col";
import ShTextbox from "../../components/sh-textbox";
import ShSelect from "../../components/sh-select";
import ShRadio from "../../components/sh-radio";
import ShDistpcker from "../../components/sh-distpicker/sh-distpicker";
import ShTable from "../../components/sh-table";

export default {
  name: "areaAdd",
  components: {
    ShButton,
    ShRow,
    ShCol,
    ShTextbox,
    ShSelect,
    ShRadio,
    ShDistpcker,
    ShTable
  },
  data() {
    return {
      columns: [
                { field: "userName", title: "设备类型", width: 1 },
                {
                  field: "mobile",
                  title: "设备编号",
                  width: 1
                },
                {
                  field: "weChatMaName",
                  title: "设备型号",
                  width: 1
                },
                {
                  field: "weChatMpName",
                  title: "微信公众号名称",
                  width: 1,
                  formatter(row) {
                    return "-";
                  }
                },
                { field: "weChatMpName", title: "设备名称", width: 1 },
                {
                  field: "weChatMaBindingDateTime",
                  title: "设备状态",
                  width: 1
                },
                {
                  field: "weChatMaBindingDateTime",
                  title: "设备运行时长",
                  width: 1
                },
                {
                  field: "weChatMaBindingDateTime",
                  title: "当前监测值",
                  width: 1
                },
                {
                  field: "weChatMaBindingDateTime",
                  title: "设备告警规则",
                  width: 1
                }, 
                {
                  field: "weChatMaBindingDateTime",
                  title: "设备告警策略",
                  width: 1
                },
     
       ],
      tdatas: {},
      dataNull:false,
      totalPage: 0, // 记录总条数
      pageSize: 10, // 每页显示条数
      currentPage: 1, // 当前的页数
      pageNo: 1, // 当前的页数
    }
  },
  created() {
  
  },
  methods: {
datasblist(pageNo) {
   //debugger
            this.$store.dispatch('getsbview',{
              areaCode:"2.1",
              deviceType:1,
              pageNo: pageNo || this.data.pageNo,
              rowNum:10 || this.data.pageSize
            }).then((data) => {

                this.tdatas=data;
              
            }, (error) => {
              //alert('地块管理获取数据失败')
                  this.dataNull=true;
                this.tdatas=data;
            });
          },
          // 分页事件
       pageChange(pageNumber) {
          this.datasblist(pageNumber);
        }
  },
 mounted() {
      this.datasblist(1);

      }
};
</script>

<style lang="stylus" scoped>
@import '../../../lib/css/form.styl';

.area {
  padding: 20px;
  background-color: #f6fafa;
}

.area-box {
  border: solid 1px #e3e8ea;
  background-color: #ffffff;
}

.area-header {
  padding: 30px 30px 0 30px;
}

.area-header-box {
  height: 36px;
  padding-bottom: 20px;
  font-size: 0;
  border-bottom: 1px solid #e3e8ea;
}

.area-header-title {
  float: left;
  font-size: 20px;
  line-height: 36px;
  padding-right: 16px;

  font-weight: bold;
}

.area-header-toolbar {
  padding-left: 120px;
  height: 100%;
  text-align: right;
}

.area-header-toolbar .sh-button {
  margin-left: 20px;
}

.area-content {
  display: block;
  box-sizing: border-box;
  padding-top: 20px;
  padding-bottom: 70px;
}

.area-group-title {
  margin: 10px 0 10px 11px;
  padding-left: 15px;
  border-left: 4px solid #41a259;
  font-size: 16px;
  color: #444444;
}

.area-form {
  padding: 0 30px 0 30px;
}
</style>