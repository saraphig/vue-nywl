<template>

  <div class="area">
    <div class="area-box">
      <div class="area-header">
        <div class="area-header-box">
          <div class="area-header-title">地块详情</div>
          <div class="area-header-toolbar">
            <sh-button plain
              @click="cancel">返回</sh-button>
          </div>
        </div>
      </div>

      <div class="area-content">
        <div class="area-group-title">地块信息</div>
        <sh-row class="sh-form area-detail-form sh-from-font7"
          :gutter="20">
          <sh-col :span="12">
            <label class="sh-form-label">地块编号:</label>
            <div class="sh-form-text">
              <sh-input v-model="areaCode"
                :disabled="true"></sh-input>
            </div>
          </sh-col>
          <sh-col :span="12"
            class="sh-from-font6">
            <label class="sh-form-label ">
              <span class="require">*</span>地块名称:</label>
            <div class="sh-form-text">
              <sh-input v-model="areaName"
                :disabled="true"></sh-input>
            </div>
          </sh-col>
          <sh-col :span="12">
            <label class="sh-form-label ">
              <span class="require">*</span>农业类型:</label>
            <div class="sh-form-text">
              <sh-select v-model="farmType"
                :opts="farmTypeList"
                :disabled="true"></sh-select>
            </div>
          </sh-col>
          <sh-col :span="12"
            class="sh-from-font6">
            <label class="sh-form-label ">
              <span class="require">*</span>种/养殖描述:</label>
            <div class="sh-form-text">
              <sh-input v-model="typeDescription"
                :disabled="true"></sh-input>
            </div>
          </sh-col>
          <sh-col :span="12">
            <label class="sh-form-label">添加时间:</label>
            <div class="sh-form-text">
              <sh-input v-model="gmtModified"
                :disabled="true"></sh-input>
            </div>
          </sh-col>
          <sh-col :span="12"
            class="sh-from-font6">
            <label class="sh-form-label">备注:</label>
            <div class="sh-form-text">
              <sh-input v-model="remark"
                :disabled="true"></sh-input>
            </div>
          </sh-col>
          <sh-col :span="24">
            <label class="sh-form-label"></label>
            <div class="sh-form-text">
              <sh-radio v-model="areaStatus"
                value="4"
                :disabled="true">启用</sh-radio>
              <sh-radio v-model="areaStatus"
                value="5"
                :disabled="true">禁用</sh-radio>
            </div>
          </sh-col>
        </sh-row>

        <div class="area-group-title">地块位置</div>
        <sh-row class="sh-form sh-from-font7 area-detail-form"
          :gutter="20">
          <sh-col :span="24">
            <label class="sh-form-label ">
              <span class="require">*</span>地块地址:</label>
            <div class="sh-form-text">
              <sh-distpcker v-model="areaAddress"
                :disabled="true"></sh-distpcker>
            </div>
          </sh-col>
          <sh-col :span="24">
            <label class="sh-form-label"></label>
            <div class="sh-form-text">
              <sh-input v-model="detailAddress"
                :disabled="true"></sh-input>
            </div>
          </sh-col>
          <sh-col :span="12">
            <label class="sh-form-label ">
              <span class="require">*</span>所在经度:</label>
            <div class="sh-form-text">
              <sh-input v-model="areaLng"
                :disabled="true"></sh-input>
            </div>
          </sh-col>
          <sh-col :span="12">
            <label class="sh-form-label ">
              <span class="require">*</span>所在纬度:</label>
            <div class="sh-form-text">
              <sh-input v-model="areaLat"
                :disabled="true"></sh-input>
            </div>
          </sh-col>
        </sh-row>
        <sh-row class="area-form">
          <sh-col>
            <div class="area-map-box">
              <sh-map ref="map"
                mapWidth="100%"
                mapHeight="600px"></sh-map>
            </div>
          </sh-col>
        </sh-row>
        <div class="area-group-title">地块所在二维平面图</div>
        <sh-row class="sh-form area-form"
          :gutter="20">
          <sh-col :span="24">
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
import ShInput from "@com/sh-ui/components/sh-input";
import ShSelect from "../../components/sh-select";
import ShRadio from "../../components/sh-radio";
import ShDistpcker from "../../components/sh-distpicker/sh-distpicker";
import ShMap from "../../components/gaode-map";

export default {
  name: "areaDetail",
  components: {
    ShButton,
    ShRow,
    ShCol,
    ShInput,
    ShSelect,
    ShRadio,
    ShDistpcker,
    ShMap
  },
  data() {
    return {
      // 农业类型下拉数据
      farmTypeList: [],
      // 表单-地块编码
      areaCode: null,
      // 表单-地块名称
      areaName: null,
      // 表单-农业类型
      farmType: null,
      // 表单-种养殖描述
      typeDescription: null,
      // 表单-备注
      remark: null,
      // 表单-地块状态
      areaStatus: "4",
      // 表单-地块地址
      areaAddress: null,
      // 表单-详细地址
      detailAddress: null,
      // 表单-添加时间
      gmtModified: null,
      // 地图查询参数
      mapQueryText: "",
      //表单-经度
      areaLng: null,
      //表单-纬度
      areaLat: null,
      imageUrl: ""
    };
  },
  created() {
    this.getFarmTypeList();
  },
  mounted() {
    this.loadDetailInfo();
  },
  methods: {
    //下拉框-农业类型数据
    getFarmTypeList() {
      this.$store.dispatch("getTypeList").then(
        data => {
          for (let i = 0; i < data.length; i++) {
            data[i].id = data[i].dictCode;
            data[i].value = data[i].dictCodeName;
          }
          this.farmTypeList = data;
        },
        error => {
          alert("获取信息失败，后台系统错误！");
        }
      );
    },
    // 取消操作
    cancel() {
      this.$router.push({ path: "/area" });
    },
    // 根据id加载明细信息
    loadDetailInfo() {
      let sendModel = { id: this.$route.query.id };
      let filterGetDateTime = this.$options.filters.filterGetDateTime;
      this.$store.dispatch("getAreaById", sendModel).then(
        model => {
          this.areaCode = model.id.toString(); //地块编号
          this.areaName = model.idName; //地块名称
          this.farmType = model.areaType.toString(); // 农业类型
          this.typeDescription = model.areaBusiness; //种养殖描述
          this.areaStatus = model.areaStatus.toString(); //地块状态
          this.gmtModified = filterGetDateTime(model.gmtModified); //添加时间
          this.remark = model.description;
          this.areaAddress = model.address;
          this.detailAddress = model.address.split("_")[3];
          this.areaLng = model.x.toString(); //经度
          this.areaLat = model.y.toString(); //纬度
          this.imageUrl = model.pictureUrl;
          this.$refs.map.mapFromLngLat(this.areaLng, this.areaLat);
          let marker = {
            icon: "",
            id: "areaMarker", //标记名称
            lng: this.areaLng, // 经度
            lat: this.areaLat, // 纬度
            draggable: false, // 不可拖动
            visible: true // 显示隐藏
          };
          setTimeout(() => {
            this.$refs.map.newMarker(marker);
          }, 100);
        },
        error => { }
      );
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../../lib/css/form.styl';

ul, li {
  list-style: none;
  padding: 0;
  margin: 0;
}

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
  margin-top: -8px;
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
  width: 100px;
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

.area-detail-form {
  padding: 0 30px 0 0;
  margin-left: -20px !important;
}

.area-form {
  padding: 0 30px 0 30px;
}

.area-map-box {
  position: relative;
  padding: 15px 0 20px 0;
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