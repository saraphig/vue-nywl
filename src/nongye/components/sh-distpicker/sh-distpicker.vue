<template>
  <sh-row>
    <sh-col :span="8">
      <div class="sh-distpickr-province">
        <sh-select v-model="provinceCode"
          @selectCallBack="setProvinceCode"
          :disabled="disabled"
          :opts="provinceList"
          placeholder="请选择省份"></sh-select>
      </div>
    </sh-col>
    <sh-col :span="8">
      <div class="sh-distpickr-city">
        <sh-select v-model="cityCode"
          @selectCallBack="setCityCode"
          :disabled="disabled"
          :opts="cityList"
          placeholder="请选择城市"></sh-select>
      </div>
    </sh-col>
    <sh-col :span="8">
      <div class="sh-distpickr-area">
        <sh-select v-model="areaCode"
          @selectCallBack="setAreaCode"
          :disabled="disabled"
          :opts="areaList"
          placeholder="请选择区域"></sh-select>
      </div>
    </sh-col>
  </sh-row>
</template>
<script>
import ShRow from "@com/sh-ui/components/sh-row";
import ShCol from "@com/sh-ui/components/sh-col";
import ShSelect from "../sh-select";
import districts from "./districts";
export default {
  name: "ShDistpicker",
  componentName: "ShDistpicker",
  components: { ShRow, ShCol, ShSelect },
  model: {
    prop: "value",
    event: "setAddressValue"
  },
  data() {
    return {
      // 省份数据
      provinceList: [],
      // 城市数据
      cityList: [],
      // 区域数据
      areaList: [],
      // 默认获取省的编码数据
      defaultCode: 100000,
      // 选中省份的编码
      provinceCode: null,
      // 选中城市的编码
      cityCode: null,
      //选中区域编码
      areaCode: null
    };
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 获取map地区数据
    getDistricts(code) {
      return this.toSelectList(districts[code] || {});
    },
    // 数据转换为下拉框可以获取数据
    toSelectList(map) {
      let selectList = [];
      for (const key in map) {
        selectList.push({ id: key, value: map[key] });
      }
      return selectList;
    },
    getProvinceList() {
      let selectList = this.getDistricts(this.defaultCode);
      selectList.unshift({ id: "-1", value: "请选择省份" });
      return selectList;
    },
    getCityList(code) {
      let selectList = this.getDistricts(code);
      selectList.unshift({ id: "-1", value: "请选择城市" });
      return selectList;
    },
    getAreaList(code) {
      let selectList = this.getDistricts(code);
      selectList.unshift({ id: "-1", value: "请选择区域" });
      return selectList;
    },
    setModelValue() {
      let provienceText = districts[this.defaultCode][this.provinceCode];
      let cityMap = districts[this.provinceCode] || {};
      let cityText = cityMap[this.cityCode];
      let areaMap = districts[this.cityCode] || {};
      let areaText = areaMap[this.areaCode];
      if (provienceText && cityText && areaText) {
        this.$emit(
          "setAddressValue",
          `${provienceText}_${cityText}_${areaText}`
        );
      } else {
        this.$emit("setAddressValue", "");
      }
    },
    setProvinceCode(code) {
      this.cityList = this.getCityList(code);
      this.areaList = this.getAreaList();
      this.cityCode = "-1";
      this.areaCode = "-1";
      this.setModelValue();
    },
    setCityCode(code) {
      this.areaList = this.getAreaList(code);
      this.areaCode = "-1";
      this.setModelValue();
    },
    setAreaCode(code) {
      this.areaCode = code;
      this.setModelValue();
    }
  },
  mounted() {
    this.provinceList = this.getProvinceList();
    this.cityList = this.getCityList();
    this.areaList = this.getAreaList();
  },
  watch: {
    value() {
      let addressArray = this.value.split("_");
      // 省匹配赋值
      let provinceMap = districts[this.defaultCode];
      for (const key in provinceMap) {
        if (provinceMap[key] != addressArray[0]) continue;
        this.provinceCode = key;
        this.cityList = this.getCityList(key);
        break;
      }
      // 城市匹配
      let cityMap = districts[this.provinceCode] || {};
      for (const key in cityMap) {
        if (cityMap[key] != addressArray[1]) continue;
        this.cityCode = key;
        this.areaList = this.getAreaList(key);
        break;
      }
      // 区域匹配
      let ararMap = districts[this.cityCode] || {};
      for (const key in ararMap) {
        if (ararMap[key] != addressArray[2]) continue;
        this.areaCode = key;
        break;
      }
    }
  }
};
</script>
<style scoped>
.sh-distpickr-province {
  padding-right: 5px;
}
.sh-distpickr-city {
  padding-left: 5px;
  padding-right: 5px;
}
.sh-distpickr-area {
  padding-left: 5px;
}
</style>
