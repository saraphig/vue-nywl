<template>

  <div class="area">
    <div class="area-box">
      <div class="area-header">
        <div class="area-header-box">
          <div class="area-header-title">地块编辑</div>
          <div class="area-header-toolbar">
            <sh-button plain
              @click="cancel">取消</sh-button>
            <sh-button @click="save">保存</sh-button>
          </div>
        </div>
      </div>

      <div class="area-content">
        <div class="area-group-title">地块信息</div>
        <sh-row class="sh-form area-edit-form sh-from-font7"
          :gutter="20">
          <sh-col :span="12">
            <label class="sh-form-label">地块编号:</label>
            <div class="sh-form-text">
              <sh-input v-model="areaCode"
                :disabled="true"></sh-input>
            </div>
          </sh-col>
          <sh-col :span="12">
            <label class="sh-form-label">
              <span class="require">*</span>地块名称:</label>
            <div class="sh-form-text">
              <sh-input v-model="areaName"></sh-input>
            </div>
          </sh-col>
          <sh-col :span="12">
            <label class="sh-form-label">
              <span class="require">*</span>农业类型:</label>
            <div class="sh-form-text">
              <sh-select v-model="farmType"
                :opts="farmTypeList"></sh-select>
            </div>
          </sh-col>
          <sh-col :span="12">
            <label class="sh-form-label">
              <span class="require">*</span>种/养殖描述:</label>
            <div class="sh-form-text">
              <sh-input v-model="typeDescription"></sh-input>
            </div>
          </sh-col>
          <sh-col :span="12">
            <label class="sh-form-label">添加时间:</label>
            <div class="sh-form-text">
              <sh-input v-model="gmtModified"
                :disabled="true"></sh-input>
            </div>
          </sh-col>
          <sh-col :span="12">
            <label class="sh-form-label">备注:</label>
            <div class="sh-form-text">
              <sh-input v-model="remark"></sh-input>
            </div>
          </sh-col>
          <sh-col :span="24">
            <label class="sh-form-label"></label>
            <div class="sh-form-text">
              <sh-radio v-model="areaStatus"
                value="4">启用</sh-radio>
              <sh-radio v-model="areaStatus"
                value="5">禁用</sh-radio>
            </div>
          </sh-col>
        </sh-row>

        <div class="area-group-title">地块位置</div>
        <sh-row class="sh-form sh-from-font7 area-edit-form"
          :gutter="20">
          <sh-col :span="24">
            <label class="sh-form-label">
              <span class="require">*</span>地块地址:</label>
            <div class="sh-form-text">
              <sh-distpcker v-model="areaAddress"></sh-distpcker>
            </div>
          </sh-col>
          <sh-col :span="24">
            <label class="sh-form-label"></label>
            <div class="sh-form-text">
              <sh-input v-model="detailAddress"></sh-input>
            </div>
          </sh-col>
          <sh-col :span="12"
            class="sh-from-font5">
            <label class="sh-form-label">
              <span class="require">*</span>所在经度:</label>
            <div class="sh-form-text">
              <sh-input v-model="areaLng"
                :disabled="true"></sh-input>
            </div>
          </sh-col>
          <sh-col :span="12">
            <label class="sh-form-label">
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
              <div class="area-map-search">
                <sh-input v-model.trim="mapQueryText"
                  placeholder="搜地点"
                  @keyup.enter.native="mapQuery"
                  class="area-map-search-imput"></sh-input>
                <i class="area-map-search-icon iconfont icon-icon_shipinjiankong_suofang"
                  @click="mapQuery"></i>
              </div>
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
            <sh-upload :options="uplaodOptions"
              @callback="callback">
              <sh-button>二维平面图上传</sh-button>
            </sh-upload>
          </sh-col>
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
import ShMap from "../../components/gaode-map";
import ShUpload from "../../components/sh-upload";
import ShDistpcker from "../../components/sh-distpicker/sh-distpicker";
import { mapGetters } from "vuex";

export default {
  name: "areaEdit",
  components: {
    ShButton,
    ShRow,
    ShCol,
    ShInput,
    ShSelect,
    ShRadio,
    ShMap,
    ShUpload,
    ShDistpcker
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
      // 保存实体模型
      model: {},
      //表单-经度
      areaLng: null,
      //表单-纬度
      areaLat: null,
      mapQueryText: "",
      imageUrl: "",
      // 表单-上传图片的参数
      uplaodOptions: {
        filters: {
          mime_types: [{ title: "Image files", extensions: "jpg,png" }],
          max_file_size: "1mb"
        }
      }
    };
  },
  created() {
    this.getFarmTypeList();
  },
  mounted() {
    this.loadDetailInfo();

    let that = this;
    // 地图单击事件条件marker标记
    let map = this.$refs.map;
    map.addMapListenEvent("click", function (e) {
      // 先移除原有的markder标记
      map.removeMarker("areaMarker");
      // 追加新的标记
      let lnglat = e.lnglat;
      let marker = {
        icon: "",
        id: "areaMarker", //标记名称
        lng: lnglat.lng, // 经度
        lat: lnglat.lat, // 纬度
        draggable: false, // 不可拖动
        visible: true // 显示隐藏
      };
      setTimeout(() => {
        map.newMarker(marker);
      }, 100);
      // 表单经纬度赋值
      that.areaLng = lnglat.lng.toString();
      that.areaLat = lnglat.lat.toString();
    });
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
          let addressList = model.address.split("_");

          this.areaCode = model.id.toString(); //地块编号
          this.areaName = model.idName; //地块名称
          this.farmType = model.areaType.toString(); // 农业类型
          this.typeDescription = model.areaBusiness; //种养殖描述
          this.areaStatus = model.areaStatus.toString(); //地块状态
          this.gmtModified = filterGetDateTime(model.gmtModified); //添加时间
          this.remark = model.description;
          this.areaAddress = `${addressList[0]}_${addressList[1]}_${
            addressList[2]
            }`;
          this.detailAddress = addressList[3];
          this.imageUrl = model.pictureUrl;
          this.model.pictureUrl;
          this.areaLng = model.x.toString(); //经度
          this.areaLat = model.y.toString(); //纬度
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
          }, 0);
          this.model = model;
        },
        error => { }
      );
    },
    // 保存操作
    save() {
      if (!this.validateForm()) return;
      let addressList = this.areaAddress.split("_");
      let sendModel = {
        areaCode: this.model.areaCode, //地块编码调整code
        parentId: this.model.parentId,
        idName: this.areaName, //地块名称
        areaName: this.areaName, //地块名称与idName相同
        areaType: this.farmType, //农业类型
        areaStatus: this.areaStatus, //地块状态
        areaBusiness: this.typeDescription, //种养殖描述
        description: this.remark, //备注
        address: `${this.areaAddress}_${this.detailAddress}`, //地址明细,
        city: `${addressList[1]}${addressList[2]}`,
        pictureUrl: this.imageUrl, //图片
        x: this.areaLng, //经度,
        y: this.areaLat //纬度
      };

      Object.assign(this.model, sendModel);

      delete this.model["areaOrder"];
      this.$store.dispatch("updateAreaInfo", this.model).then(
        data => {
          if (data && data.code === -1 && data.msg) {
            alert(data.msg);
          } else {
            this.$router.push({
              path: "/area"
            });
          }
        },
        error => {
          if (error) {
            alert(error);
          } else {
            alert("获取信息失败，后台系统错误！");
          }

        }
      );
    }, // 保存前数据验证
    // 保存前数据验证
    validateForm() {
      if (!this.areaName) {
        alert("请输入地块名称");
        return false;
      }
      if (!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(this.areaName)) {
        alert("地块名称不能包含特殊字符");
        return false;
      }
      if (this.areaName.length > 10) {
        alert("地块名称只能输入10个字符");
        return false;
      }
      if (!this.farmType) {
        alert("请选择农业类型");
        return false;
      }
      if (!this.typeDescription) {
        alert("请输入种植|养殖描述");
        return false;
      }
      if (this.typeDescription.length > 50) {
        alert("种植|养殖描述只能输入50个字符");
        return false;
      }
      if (this.remark && this.remark.length > 50) {
        alert("备注只能输入50个字符");
        return false;
      }
      if (!this.areaAddress) {
        alert("请选择完整地址");
        return false;
      }

      if (!this.detailAddress) {
        alert("请输入详细地址");
        return false;
      }
      if (!this.detailAddress.length > 50) {
        alert("详细地址只能输入50个字符");
        return false;
      }

      if (!this.areaLng || !this.areaLat) {
        alert("请单击地图自动设置经纬度");
        return false;
      }
      return true;
    },
    // 地图查询
    mapQuery() {
      this.$refs.map.placeSerachPOI(this.mapQueryText);
    },
    callback(url) {
      this.imageUrl = url;
    }
  },
  computed: {
    ...mapGetters({
      organizationEntity: 'getOrganizationEntity'
    })
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

.area-edit-form {
  padding: 0 30px 0 0;
  margin-left: -20px !important;
}

.area-form {
  padding: 0 30px 0 30px;
}

.area-map-search {
  position: absolute;
  left: 80px;
  top: 50px;
  z-index: 999999996;
  width: 250px;
}

.area-map-box {
  position: relative;
  padding: 15px 0 20px 0;
}

.area-map-search-imput {
  padding-right: 50px !important;
}

.area-map-search-icon {
  color: #999999;
  font-size: 17px;
  position: absolute;
  height: 36px;
  width: 50px;
  line-height: 36px;
  text-align: center;
  right: 0px;
  top: 0;
  cursor: pointer;
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
