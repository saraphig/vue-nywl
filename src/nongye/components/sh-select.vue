<template>
  <div class="sh-select"
    @mouseenter="mouseOverHandle"
    @mouseleave="mouseOutHandle">
    <div :class="{'sh-select-box':true,'sh-select-focus':inFocus}">
      <div class="sh-select-input"
        @click="selectClickHandle">
        <input v-model="inputModel"
          v-focus="setFocus"
          type="text"
          :disabled="disabled"
          autocomplete="off"
          @blur="selectBlurHandle"
          :placeholder="placeholder"
          readonly="readonly"
          value="" />
        <div class="sh-select-icon">
          <i class="iconfont icon-icon_jiantou_xiazhankai"></i>
        </div>
      </div>
    </div>
    <div v-if="contentDisplay"
      :class="[{'sh-select-content':true} , contentVisible ? {'sh-select-show':true} : {'sh-select-hide':true}]">
      <ul>
        <li :class="{'sh-select-selected' : itemSelectedClass(item.id)}"
          v-for="item in opts"
          :id="item.id"
          @click="itemSelectedHandle">{{item.value}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShSelect",
  componentName: "ShSelect",
  model: {
    prop: "value",
    event: "setSelectValue"
  },
  data() {
    return {
      id: null,
      inputModel: "",
      contentVisible: false,
      inFocus: false,
      contentDisplay: false,
      setFocus: false,
      ieFocus: false
    };
  },
  props: {
    opts: {
      type: Array,
      default: []
    },
    placeholder: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  directives: {
    focus: {
      update: function (el, { value }) {
        if (value) {
          el.focus();
        }
      }
    }
  },
  methods: {
    mouseOverHandle(e) {
      this.ieFocus = true;
      this.setFocus = false;
      this.setFocus = true;
    },
    mouseOutHandle(e) {
      this.ieFocus = false;
      this.setFocus = false;
      this.setFocus = true;
    },
    selectClickHandle() {
      if (this.disabled) return;
      if (this.contentVisible) {
        this.contentVisible = false;
      } else {
        this.contentVisible = true;
      }
    },
    selectBlurHandle(e) {
      let _this = this;
      if (this.ieFocus == false) {
        _this.contentVisible = false;
      }
    },
    itemSelectedHandle(el) {
      this.contentVisible = false;
      this.inputModel = el.target.innerText;
      this.id = el.target.id;
      this.$emit("selectCallBack", this.id);
      // 双向绑定赋值
      this.$emit("setSelectValue", this.id);
    },
    itemSelectedClass(itemID) {
      let selected = false;
      if (itemID !== null && itemID === this.id) {
        selected = true;
      }
      return selected;
    },
    setDefaultSelect(selectItemID, selectItemValue) {
      let _this = this;
      _this.inputModel = selectItemValue;
      _this.id = selectItemID;
      // this.$emit("selectCallBack", _this.id);
    }
  },
  watch: {
    contentVisible(val) {
      let _this = this;
      if (val) {
        this.inFocus = true;
        _this.contentDisplay = true;
      } else {
        this.inFocus = false;
        setTimeout(function () {
          _this.contentDisplay = false;
        }, 300);
      }
    },
    opts() {
      for (let i = 0; i < this.opts.length; i++) {
        const selectItem = this.opts[i];
        if (selectItem.id !== this.value) continue;
        this.setDefaultSelect(selectItem.id, selectItem.value);
        break;
      }
    },
    value() {
      for (let i = 0; i < this.opts.length; i++) {
        const opt = this.opts[i];
        if (opt.id !== this.value) continue;
        this.setDefaultSelect(opt.id, opt.value);
        break;
      }
    }
  },
  mounted() {
    let _this = this;
    if (_this.defaultSelect) {
      let index = _this.defaultSelect - 1;
      if (_this.opts.length > 0 && index >= 0) {
        _this.inputModel = _this.opts[index].value;
        _this.id = _this.opts[index].id;
        this.$emit("selectCallBack", _this.id);
      }
    }
  }
};
</script>

<style scoped>
input::-ms-clear,
input::-ms-reveal {
  display: none !important;
}

::-ms-clear,
::-ms-reveal {
  display: none;
}

.sh-select {
  position: relative;
}
.sh-select-box {
  width: 100%;
  height: 36px;
  border-radius: 5px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.sh-select-box .sh-select-input {
  display: block;
  position: relative;
  width: 100%;
  font-size: 14px;
  cursor: pointer;
}

.sh-select-box .sh-select-input input {
  display: block;
  width: 100%;
  background-color: #fff;
  background-image: none;
  border-radius: 2px;
  border: 1px solid #e4eaed;
  box-sizing: border-box;
  color: #444444;
  font-size: 14px;
  height: 36px;
  line-height: 1;
  outline: 0;
  padding: 3px 30px 3px 10px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;
}
.sh-select-box .sh-select-input input::placeholder {
  color: #999999;
}
.sh-select-box .sh-select-input input[disabled] {
  background-color: #f6f9fb;
  border-color: #e3e8ea;
  color: #c0c4cc;
  cursor: not-allowed;
}

.sh-select-box .sh-select-input .sh-select-icon {
  position: absolute;
  top: 9px;
  right: 7px;
  color: #444444;
  width: 16px;
  height: 18px;
}
.sh-select-box .sh-select-input .sh-select-icon i {
  color: #999999;
}

.sh-select-focus .sh-select-input input {
  border-color: #41a259;
}

.sh-select-content {
  z-index: 999999999;
  position: absolute;
  background-color: #fff;
  min-width: 100%;
  max-height: 230px;
  border-radius: 2px;
  box-shadow: 0px 0px 2px #808080;
  overflow-y: auto;
  transition: opacity 0.3s linear;
}

.sh-select-content ul {
  list-style: none;
  padding: 6px 0;
  margin: 0;
  box-sizing: border-box;
}

.sh-select-content ul li {
  font-size: 16px;
  padding: 0 15px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #606266;
  height: 36px;
  line-height: 36px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 14px;
}

.sh-select-content ul li:hover {
  background-color: #f1f7fa;
  color: #41a259;
}

.sh-select-selected {
  color: #41a259 !important;
}

.sh-select-show {
  opacity: 1;
}

.sh-select-hide {
  opacity: 0;
}
</style>
