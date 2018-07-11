<template>

  <div class="area">
    <div class="area-box">
      <div class="area-header">
        <div class="area-header-box">
          <div class="area-header-title">设备视图详情</div>
        </div>
      </div>

      <div class="area-content">
        <div class="area-group-title">基础信息:</div>
        <sh-row class="sh-form sh-from-font5 area-form"
          :gutter="0">
          <sh-table :columns="columns"
            :data="tdatas"
            @pageChange="pageChange"
            :operate="false">
          </sh-table>
        </sh-row>
        <div class="area-group-title">位置信息</div>
        <sh-row class="sh-form sh-from-font5 view-left"
          :gutter="20">
          <sh-col :span="12"
            class="sh-from-font7">
            <label class="sh-form-label ">所在机构名称:</label>
            <div class="sh-form-text">
              <sh-textbox v-model="institutionsname"
                :disabled='true'></sh-textbox>
            </div>
          </sh-col>
          <sh-col :span="12"
            class="sh-from-font7">
            <label class="sh-form-label">所在地块编号:</label>
            <div class="sh-form-text">
              <sh-textbox v-model="aeraId"
                :disabled='true'></sh-textbox>
            </div>
          </sh-col>
          <sh-col :span="12"
            class="sh-from-font7">
            <label class="sh-form-label">所在地块名称:</label>
            <div class="sh-form-text">
              <sh-textbox v-model="areaname"
                :disabled='true'></sh-textbox>
            </div>
          </sh-col>
          <sh-col :span="24"
            class="sh-from-font8 view-img-title">
            <label class="sh-form-label ">二维平面位置信息</label>
          </sh-col>
          <sh-col :span="24"
            class="sh-from-font7 view-img-left">
            <div :class="['area-img-box',{'area-img-bg':!imageUrl}]">
              <div class="alarm-image-content"
                v-show="!imageUrl">
                <p>
                  <i class="iconfont icon-icon_logo"></i>
                </p>
                <div>暂无二维平面图</div>
              </div>
              <img v-if="imageUrl"
                :src="imageUrl" />
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
import ShTable from "../../components/sh-table";

export default {
  components: {
    ShButton,
    ShRow,
    ShCol,
    ShTextbox,
    ShSelect,
    ShRadio,
    ShTable
  },
  data() {
    return {
      columns: [
        { field: "category", title: "设备类型", width: 1 },
        {
          field: "uuid",
          title: "设备序列号",
          width: 1,
          formatter(row) {

            if (row.uuid == '' || row.uuid == null) {
              return "--";
            } else {
              return row.uuid
            }
          }
        },
        {
          field: "deviceModel",
          title: "设备型号",
          width: 1,
          formatter(row) {
            return "--";
          }
        },
        { field: "assertName", title: "设备名称", width: 1 },
        {
          field: "quality",
          title: "设备状态",
          width: 1,
          formatter(row) {
            if (row.quality == 1) {
              return "在线"
            } else if (row.quality == 0) {
              return "离线"
            } else if (row.quality == 2) {
              return "禁用"
            } else if (row.quality == null) {
              return "--"
            }
          }
        },
        {
          field: "continuTime",
          title: "设备运行时长",
          width: 1
        },
        {
          field: "field",
          title: "当前监测值",
          width: 1,
          formatter(row) {

            if (row.field == '' || row.field == null) {
              return "--";
            } else {
              let field = row.field;
              return field = Number(field).toFixed(2);
            }
          }
        },
        {
          field: "ddc",
          title: "设备告警规则",
          width: 1,
          formatter(row) {
            return "--";
          }
        },
        {
          field: "ddc",
          title: "设备告警策略",
          width: 1,
          formatter(row) {
            return "--";
          }
        },

      ],
      dataNull: false,
      institutionsname: "",
      aeraId: '',
      areanum: "",
      areaname: "",
      areaCode: '',
      imageUrl: '',
      tdatas: {

      },
      areatype: ''

    }
  },
  created() {

  },
  methods: {
    datasblist(pageNo) {
      let that = this;
      that.$store.dispatch('getsbview', {
        areaCode: that.areaCode,
        deviceType: that.areatype,
        pageNo: pageNo || that.data.pageNo,
        pageSize: 10 || that.data.pageSize
      }).then((data) => {
        that.tdatas = data.infoPage;
      }, (error) => {

        //alert('地块管理获取数据失败')

      });
    },
    // 分页事件
    pageChange(pageNumber) {
      this.datasblist(pageNumber)
    }
  },
  mounted() {
    let strorageData = sessionStorage.getItem("mapEquipmentList");
    let strorageObj = JSON.parse(strorageData);
    this.institutionsname = strorageObj.agentName;
    this.areaCode = strorageObj.areaCode;
    this.aeraId = strorageObj.aeraId;
    this.areaname = strorageObj.areaName;
    this.areatype = sessionStorage.getItem("equipmentType");
    this.imageUrl = strorageObj.areaImgUrl;
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

.sh-form-text input:disabled {
  color: #999;
}

.area-header-title {
  float: left;
  font-size: 20px;
  line-height: 36px;
  padding-right: 16px;
  width: auto;
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

.img-show {
  padding: 0px 10px;

  p {
    border: solid 1px #e3e8ea;
    height: 300px;
    text-align: center;
    line-height: 300px;
    font-size: 20px;
    color: #888;
  }
}

.view-left {
  padding: 0px 20px;
}

.view-img-left {
}

.view-img-title {
  margin-left: 12px;
}

.area-img-box {
  height: 600px;
  border-radius: 2px;
  border: solid 1px #e3e8ea;
  margin: 15px 0 20px 0;
  overflow: auto;
  width: 100%;
}

.area-img-bg {
  background-color: #f1f7fa;
}

.area-img-box img {
  border: none;
  margin: 0;
  paddding: 0;
}

.alarm-image-content {
  height: 112px;
  text-align: center;
}

.alarm-image-content p {
  text-align: center;
  padding-top: 200px;
}

.alarm-image-content i {
  font-size: 100px;
  color: #bbbbbb;
}

.alarm-image-content div {
  font-size: 30px;
  color: #bbbbbb;
}
</style>