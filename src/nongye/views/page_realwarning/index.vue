<template>
  <div class="alarm">
    <div class="alarm-box">
      <div class="alarm-header">
        <div class="alarm-header-title">实时告警</div>
        <div class="alarm-header-seach">
          <sh-row :gutter="18">
            <sh-col :span="4">
              <sh-date-pciker v-model="startDateTime"
                placeholder="请选择开始时间"
                :show-icon="false"
                type="datetime"></sh-date-pciker>
            </sh-col>
            <sh-col :span="1"
              class="alarm-header-separator">
              <span></span>
            </sh-col>
            <sh-col :span="4">
              <sh-date-pciker v-model="endDateTime"
                placeholder="请选择结束时间"
                :show-icon="false"
                type="datetime"></sh-date-pciker>
            </sh-col>
            <sh-col :span="4">
              <sh-select v-model="alarmStatus"
                :opts="alarmStatusList"
                placeholder="请选择告警级别"></sh-select>
            </sh-col>
            <sh-col :span="4">
              <sh-select v-model="alartmType"
                :opts="alarmTypeList"
                placeholder="请选择告警状态"></sh-select>
            </sh-col>
            <sh-col :span="4">
              <sh-button @click="searchData">查询</sh-button>
            </sh-col>
          </sh-row>
        </div>
      </div>
      <div class="alarm-content">
        <sh-table :columns="columns"
          :data="data"
          @pageChange="pageChange"
          :operate="true">
          <template slot="operate"
            slot-scope="data">
            <i class="iconfont icon-icon_daohang_gongdanguanli"
              @click="showDetailInfo(data.row)"></i>
          </template>
        </sh-table>
      </div>
    </div>
    <sh-modal v-model="dialogVisible"
      title="告警详情">
      <div class="alarm-detail-box">
        <ul>
          <li>
            <label class="alarm-detail-title">告警编号:</label>
            <div class="alarm-detail-field">{{convertDetailInfo("id",model)}}</div>
          </li>
          <li>
            <label class="alarm-detail-title">告警设备:</label>
            <div class="alarm-detail-field">{{convertDetailInfo("entityName",model)}}</div>
          </li>
          <li>
            <label class="alarm-detail-title">告警级别:</label>
            <div class="alarm-detail-field"
              v-html="convertDetailInfo('alarmLevel',model)"></div>
          </li>
          <li>
            <label class="alarm-detail-title">告警描述:</label>
            <div class="alarm-detail-field">{{convertDetailInfo("description",model)}}</div>
          </li>
          <li>
            <label class="alarm-detail-title">告警状态:</label>
            <div class="alarm-detail-field"
              v-html="convertDetailInfo('alarmStatus',model)"></div>
          </li>
          <li>
            <label class="alarm-detail-title">监测地块:</label>
            <div class="alarm-detail-field">{{convertDetailInfo("areaName",model)}}</div>
          </li>
          <li>
            <label class="alarm-detail-title">监测状态:</label>
            <div class="alarm-detail-field">{{convertDetailInfo("deviceStatus",model)}}</div>
          </li>
          <li>
            <label class="alarm-detail-title">当前值:</label>
            <div class="alarm-detail-field">{{convertDetailInfo("curValue",model)}}</div>
          </li>
          <li>
            <label class="alarm-detail-title">告警时间:</label>
            <div class="alarm-detail-field">{{convertDetailInfo("systemTime",model)}}</div>
          </li>
          <li>
            <label class="alarm-detail-title">告警时长:</label>
            <div class="alarm-detail-field">{{convertDetailInfo("alarmTime",model)}}</div>
          </li>
          <li v-show="isShowProcess(model)">
            <label class="alarm-detail-title">处理结果:</label>
            <div class="alarm-detail-process">
              <sh-row>
                <sh-col :span="24">
                  <sh-select ref="processType"
                    :opts="processTypeList"
                    placeholder="选择告警级别"
                    @selectCallBack="selectProcessBack"></sh-select>
                </sh-col>
              </sh-row>
            </div>
          </li>
          <li v-show="isShowProcess(model)">
            <label class="alarm-detail-title">处理说明:</label>
            <div class="alarm-detail-process">
              <sh-row>
                <sh-col :span="24">
                  <sh-textbox v-model="processText"
                    placeholder="处理|忽略说明"></sh-textbox>
                </sh-col>
              </sh-row>
            </div>
          </li>
        </ul>
        <div class="alarm-image-box">
          <p class="alarm-image-title">告警画面</p>
          <div class="alarm-image-content">
            <p>
              <i class="iconfont icon-icon_logo"></i>
            </p>
            <div>暂无告警画面</div>
          </div>
        </div>
      </div>
      <template slot="footer">
        <sh-button plain
          @click="dialogVisible = false">关闭</sh-button>
        <sh-button v-show="isShowProcess(model)"
          @click="processAlarm(model)">处理</sh-button>
      </template>
    </sh-modal>
  </div>
</template>

<script>
import ShRow from "@com/sh-ui/components/sh-row";
import ShCol from "@com/sh-ui/components/sh-col";
import ShDatePciker from '@com/sh-ui/components/sh-date-time/sh-date-picker'
import ShSelect from "../../components/sh-select";
import ShButton from "@com/sh-ui/components/sh-button";
import ShTable from "../../components/sh-table";
import ShModal from '@com/sh-ui/components/sh-modal'
import ShTextbox from "../../components/sh-textbox";
import filter from "./filter.js";
import moment from "moment";

export default {
  name: "page-realwarning",
  components: {
    ShRow,
    ShCol,
    ShDatePciker,
    ShSelect,
    ShButton,
    ShTable,
    ShModal,
    ShTextbox
  },
  data() {
    let filterGetDateTime = this.$options.filters.filterGetDateTime;
    return {
      alarmTypeList: [{ id: null, value: "所有告警级别" }],
      alarmStatusList: [{ id: null, value: "所有告警状态" }],
      processTypeList: [{ id: 4, value: "已处理" }, { id: 5, value: "已忽略" }],
      columns: [
        { field: "id", title: "告警编号", width: 1 },
        {
          field: "entityName",
          title: "监测类别",
          align: "left",
          width: 1
        },
        {
          field: "curValue",
          title: "当前值",
          width: 1,
          formatter(row) {
            if (row.params && row.params.curParam) {
              let value = row.params.curParam;
              return value == "-" ? "--" : value;
            }
            return "";
          }
        },
        {
          field: "deviceStatus",
          title: "监测状态",
          width: 1,
          formatter(row) {
            return row.deviceStatus.name;
          }
        },
        { field: "areaName", title: "监测地块", width: 1 },
        {
          field: "alarmLevel",
          title: "告警级别",
          width: 1,
          formatter(row) {
            return filter.alarmLevel(row);
          }
        },
        {
          field: "description",
          title: "告警描述",
          width: 1,
          formatter(row) {
            return filter.alarmDescription(row);
          }
        },
        {
          field: "systemTime",
          title: "告警时间",
          width: 1,
          formatter(row) {
            return filterGetDateTime(row.systemTime);
          }
        },
        {
          field: "alarmStatus",
          title: "告警状态",
          width: 1,
          formatter(row) {
            return filter.alarmStatusText(row.status.name);
          }
        }
      ],
      // 表格数据源
      data: {},
      // 开始时间
      startDateTime: null,
      // 结束时间
      endDateTime: null,
      // 告警类别
      alartmType: "",
      // 告警状态
      alarmStatus: "",
      // 明细处理类别
      processType: "null",
      // 处理内容
      processText: null,
      // 弹窗显示
      dialogVisible: false,
      // 明细信息对象
      model: null
    };
  },
  created() {
    this.getAlarmType();
    this.getAlarmStatus();
  },
  mounted() {
    this.searchData();
  },
  methods: {
    // 获取所有告警级别
    getAlarmType() {
      this.$store.dispatch("getAlarmType", {}).then(
        data => {
          for (let i = 0; i < data.length; i++) {
            const { id, name } = data[i];
            this.alarmTypeList.push({ id: id, value: name });
          }
        },
        error => {
          alert("获取信息失败，后台系统错误！");
        }
      );
    },
    // 获取所有告警状态
    getAlarmStatus() {
      this.$store.dispatch("getAlarmLevel", {}).then(
        data => {
          for (let i = 0; i < data.length; i++) {
            const { id, name } = data[i];
            this.alarmStatusList.push({ id: id, value: name });
          }
        },
        error => {
          alert("获取信息失败，后台系统错误！");
        }
      );
    },
    // 查询验证
    validateForm() {
      let notStartTime = !this.startDateTime && this.endDateTime;
      let notEndTime = this.startDateTime && !this.endDateTime;
      if (notStartTime || notEndTime) {
        alert("请选择时间段");
        return false;
      }
      let isBefore = moment(this.endDateTime).isBefore(
        this.startDateTime,
        "second"
      );
      if (isBefore) {
        alert("结束日期要大于开始日期");
        return false;
      }
      let days = moment(this.endDateTime).diff(
        moment(this.startDateTime),
        "days"
      );
      if (days > 30) {
        alert("请选择一个月内的范围");
        return false;
      }
      return true;
    },

    // 获取告警数据包含分页
    getAlarmData(pageNumber, pageSize) {
      this.$store
        .dispatch("getAlarmData", {
          statusIds: "0,1,4,5",
          pageNo: pageNumber || this.data.pageNo,
          rowNum: pageSize || this.data.pageSize,
          levelId: this.alarmStatus,
          statusId: this.alartmType,
          systemStartTime: this.startDateTime,
          systemEndTime: this.endDateTime,
          t: new Date().getTime()
        })
        .then(
          data => {
            this.data = data;
          },
          error => {
            alert("获取信息失败，后台系统错误！");
          }
        );
    },
    // 分页查询
    pageChange(pageNumber, pageSize) {
      if (!this.validateForm()) {
        return;
      }
      this.getAlarmData(pageNumber, pageSize);
    },
    // 搜索按钮
    searchData() {
      this.pageChange(1);
    },
    // 处理类别选择
    selectProcessBack(processType) {
      this.processType = processType;
    },
    // 表格明细显示按钮
    showDetailInfo(row) {
      this.$store.dispatch("getAlarmById", { id: row.id }).then(
        data => {
          if (this.dialogVisible == false) {
            this.dialogVisible = true;
          }
          this.model = data;

          this.processText = null;
          this.processType = "4";
          this.$refs.processType.setDefaultSelect("4", "已处理");
        },
        error => {
          alert("获取信息失败，后台系统错误！");
        }
      );
    },
    convertDetailInfo(field, model) {
      if (model === null) {
        return "";
      }
      // 监测状态单独处理
      if (field == "deviceStatus") {
        return model.deviceStatus.name;
      }
      let value = model[field];
      // 时间单独处理
      if (field == "systemTime") {
        return this.$options.filters.filterGetDateTime(value);
      }
      if (value) {
        return value;
      }
      let columns = this.columns;
      for (let i = 0; i < columns.length; i++) {
        const col = columns[i];
        let colField = col["field"];
        if (field != colField) continue;
        return col.formatter(model);
      }
    },
    // 判断当前行数据是否已经处理
    isShowProcess(row) {
      if (!row) {
        return true;
      }
      if (Number(row.statusId) === 4 || Number(row.statusId) === 5) {
        return false;
      }
      return true;
    },
    // 处理告警数据
    processAlarm(model) {
      this.$store
        .dispatch("processAlarm", {
          id: model.id,
          updateRemark: this.processText,
          statusId: this.processType,
          confirmType: 1
        })
        .then(
          data => {
            this.dialogVisible = false;
            this.getAlarmData(1);
          },
          error => {
            alert("获取信息失败，后台系统错误！");
          }
        );
    }
  },
  watch: {
    alartmType() {
      this.getAlarmData(1);
    },
    alarmStatus() {
      this.getAlarmData(1);
    }
  }
};
</script>

<style scoped>
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.alarm {
  padding: 20px;
  background-color: #f6fafa;
}
.alarm-box {
  border: solid 1px #e3e8ea;
  background-color: #ffffff;
  padding: 30px;
}
.alarm-header {
	margin-top: -8px;
  height: 36px;
  margin-bottom: 32px;
}
.alarm-header-title {
	color: #444444;
  float: left;
  font-size: 20px;
  line-height: 36px;
  padding-right: 8px;
  width: 98px;
  font-weight: bold;
}
.alarm-header-seach {
  padding-left: 118px;
  height: 100%;
  max-width: 1164px;
}

.alarm-content {
  display: block;
  box-sizing: border-box;
}

.alarm-header-separator {
  width: 8px !important;
  text-align: center;
  padding: 0 !important;
}
.alarm-header-separator span {
  display: inline-block;
  margin-top: 18px;
  width: 6px;
  height: 1px;
  background-color: #999999;
}

.alarm-detail-box {
  position: relative;
  width: 480px;
}

/* .alarm-detail-box ul li {
  margin-bottom: 3px;
} */

.alarm-detail-title {
  font-size: 14px;
  color: #999999;
  float: left;
  height: 36px;
  text-align: right;
  line-height: 36px;
  text-align: right;
  width: 60px;
  padding-right: 20px;
}

.alarm-detail-field {
  width: 200px;
  font-size: 14px;
  color: #444444;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 36px;
  line-height: 36px;
}

.alarm-detail-process {
  padding-left: 80px;
  width: 400px;
  height: 36px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.alarm-image-box {
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  text-align: left;
}

.alarm-image-title {
  font-size: 14px;
  color: #999999;
  margin: 0;
  padding: 0;
  height: 36px;
  line-height: 36px;
}

.alarm-image-content {
  height: 112px;
  text-align: center;
  background-color: #f1f7fa;
}

.alarm-image-content p {
  font-size: 12px;
  color: #bbbbbb;
  margin: 0;
  padding: 29px 0 15px 0;
}
.alarm-image-content i {
  font-size: 26px;
  color: #bbbbbb;
}

.alarm-image-content div {
  font-size: 12px;
  color: #bbbbbb;
}
</style>
