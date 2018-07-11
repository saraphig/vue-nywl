<template>
  <label class="sh-radio" :selectValue="selectValue" @click="clickHandler">
    <span :class="['sh-radio-box',selectValue==value?'sh-radio-checked':'',disabled?'sh-radio-disabled':'']">
    </span>
    <span class="sh-radio-text">
      <slot>选项文本</slot>
    </span>
  </label>
</template>
<script>
export default {
  name: "ShRadio",
  componentName: "ShRadio",
  model: {
    prop: "selectValue",
    event: "setValue"
  },
  props: {
    value: String,
    selectValue: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      radioValue: this.value
    };
  },
  methods: {
    clickHandler() {
      if (this.disabled) return;
      this.$emit("setValue", this.value);
    }
  }
};
</script>
<style scoped>
.sh-radio {
  display: inline-block;
  height: 36px;
  line-height: 36px;
  position: relative;
  padding-left: 20px;
  font-size: 14px;
  color: #444444;
  padding-right: 20px;
}

.sh-radio-box {
  position: absolute;
  left: 1px;
  top: 50%;
  margin-top: -9px;
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #e4eaed;
  cursor: pointer;
  box-sizing: content-box;
  transition: border-color 0.1s cubic-bezier(0.71, -0.46, 0.29, 1.46),
    background-color 0.1s cubic-bezier(0.71, -0.46, 0.29, 1.46);
}

.sh-radio-text {
  padding-left: 5px;
  float: left;
  cursor: pointer;
}

.sh-radio-box:after {
  position: absolute;
  box-sizing: content-box;
  content: "";
  height: 8px;
  width: 8px;
  left: 50%;
  top: 50%;
  margin-left: -4px;
  margin-top: -4px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6) 0.05s;
}

.sh-radio-checked {
  background-color: #41a259;
  border-color: #41a259;
}

.sh-radio-disabled {
  background-color: #f5f7fa;
  border-color: #d1dbe5;
  cursor: not-allowed;
}

.sh-radio-disabled:after {
  background-color: #f5f7fa;
}

.sh-radio-disabled.sh-radio-checked:after {
  background-color: #c0c4cc;
}
</style>
